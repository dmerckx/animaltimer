import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { upcomingEvents } from "../lib/multimove-events.ts";

test("season excludes Flemish holidays and closes at Brussels start time", () => {
  const dates = upcomingEvents(new Date("2026-09-05T10:00:00Z"));
  assert.equal(dates.length, 32);
  assert.equal(dates[0], "2026-09-07");
  assert.equal(dates.at(-1), "2027-05-31");
  for (const date of ["2026-11-02", "2026-12-21", "2026-12-28", "2027-02-08", "2027-03-29", "2027-04-05", "2027-05-17"]) assert.ok(!dates.includes(date));
  assert.ok(upcomingEvents(new Date("2026-09-07T15:19:00Z")).includes("2026-09-07"));
  assert.ok(!upcomingEvents(new Date("2026-09-07T15:20:00Z")).includes("2026-09-07"));
  assert.ok(upcomingEvents(new Date("2027-01-04T16:19:00Z")).includes("2027-01-04"));
  assert.ok(!upcomingEvents(new Date("2027-01-04T16:20:00Z")).includes("2027-01-04"));
  assert.deepEqual(upcomingEvents(new Date("2027-06-01T00:00:00Z")), []);
});

test("storage preserves concurrent writes, cancellation and GitHub conflict retries", async () => {
  const originalDirectory = process.cwd();
  const directory = await mkdtemp(path.join(tmpdir(), "multimove-test-"));
  const originalFetch = globalThis.fetch;
  const originalEnv = { ...process.env };
  try {
    process.chdir(directory);
    await mkdir("data");
    await writeFile("data/registrations.json", "[]\n");
    process.env.NODE_ENV = "test";
    delete process.env.GITHUB_TOKEN;
    const { readRegistrations, updateRegistrations } = await import("../lib/registrations.ts");
    const a = { id: "a", date: "2026-09-07", name: "Zoë", owner: "hash-a" };
    const b = { id: "b", date: "2026-09-14", name: "Tom", owner: "hash-b" };
    await Promise.all([updateRegistrations(r => [...r, a]), updateRegistrations(r => [...r, b])]);
    assert.deepEqual(await readRegistrations(), [a, b]);
    await updateRegistrations(r => r.filter(item => item.id !== "a"));
    assert.deepEqual(JSON.parse(await readFile("data/registrations.json", "utf8")), [b]);
    process.env.NODE_ENV = "production";
    await assert.rejects(readRegistrations, /nog niet ingesteld/);
    process.env.GITHUB_TOKEN = "test-token";
    process.env.GITHUB_REPOSITORY = "test/repository";
    process.env.GITHUB_BRANCH = "helpers";
    let remote = [a];
    let writes = 0;
    globalThis.fetch = async (url, options) => {
      assert.ok(String(url).startsWith("https://api.github.com/repos/test/repository/contents/data/registrations.json"));
      if (options.method !== "PUT") return Response.json({ sha: `sha-${writes}`, content: Buffer.from(JSON.stringify(remote)).toString("base64") });
      writes++;
      if (writes === 1) { remote = [a, b]; return new Response("", { status: 409 }); }
      const body = JSON.parse(options.body);
      assert.equal(body.sha, "sha-1");
      assert.equal(body.branch, "helpers");
      remote = JSON.parse(Buffer.from(body.content, "base64").toString("utf8"));
      return Response.json({});
    };
    const c = { ...a, id: "c", date: "2026-09-21" };
    await updateRegistrations(r => [...r, c]);
    assert.equal(writes, 2);
    assert.deepEqual(remote, [a, b, c]);
  } finally {
    globalThis.fetch = originalFetch;
    process.env = originalEnv;
    process.chdir(originalDirectory);
    await rm(directory, { recursive: true, force: true });
  }
});
