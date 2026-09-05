import { createHash, randomUUID } from "node:crypto";
import { readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export type Registration = { id: string; date: string; name: string; owner: string };
export class RegistrationError extends Error {
  constructor(message: string, public status = 500) { super(message); }
}
export const ownerHash = (token: string) => createHash("sha256").update(token).digest("hex");
const file = path.join(process.cwd(), "data/registrations.json");

function parse(content: string): Registration[] {
  const data: unknown = JSON.parse(content);
  if (!Array.isArray(data) || !data.every(r => r && [r.id, r.date, r.name, r.owner].every(v => typeof v === "string"))) {
    throw new Error("Invalid registrations file");
  }
  return data;
}

function github() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    if (process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "test") {
      throw new RegistrationError("Inschrijven is nog niet ingesteld. Probeer later opnieuw.", 503);
    }
    return null;
  }
  // Defaults captured from this project's origin/main; also work on hosts without .git.
  const repo = process.env.GITHUB_REPOSITORY || "dmerckx/animaltimer";
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!repo || !/^[\w.-]+\/[\w.-]+$/.test(repo) || !branch) throw new Error("Missing GitHub repository or branch");
  return {
    url: `https://api.github.com/repos/${repo}/contents/data/registrations.json`, branch,
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
  };
}

async function snapshot() {
  const config = github();
  if (!config) return { records: parse(await readFile(file, "utf8")), sha: "", config };
  const response = await fetch(`${config.url}?ref=${encodeURIComponent(config.branch)}`, {
    headers: config.headers, cache: "no-store", signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`GitHub read failed: ${response.status}`);
  const result = await response.json();
  return { records: parse(Buffer.from(result.content, "base64").toString("utf8")), sha: result.sha as string, config };
}

export async function readRegistrations() { return (await snapshot()).records; }

// Serialize local writes, and use GitHub's SHA compare-and-swap across instances.
let queue: Promise<unknown> = Promise.resolve();
export function updateRegistrations(change: (records: Registration[]) => Registration[]) {
  const operation = queue.then(async () => {
    for (let attempt = 0; attempt < 4; attempt++) {
      const { records, sha, config } = await snapshot();
      const updated = change(records);
      const content = `${JSON.stringify(updated, null, 2)}\n`;
      if (!config) {
        const temporary = `${file}.${randomUUID()}.tmp`;
        await writeFile(temporary, content, "utf8");
        await rename(temporary, file);
        return updated;
      }
      const response = await fetch(config.url, {
        method: "PUT", headers: { ...config.headers, "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Update Multimove helper registrations [skip ci]", content: Buffer.from(content).toString("base64"), sha, branch: config.branch }),
        signal: AbortSignal.timeout(15000),
      });
      if (response.ok) return updated;
      if (response.status !== 409 && response.status !== 422) throw new Error(`GitHub write failed: ${response.status}`);
    }
    throw new RegistrationError("Er werd net iets gewijzigd. Probeer nog eens.", 409);
  });
  queue = operation.catch(() => undefined);
  return operation;
}
