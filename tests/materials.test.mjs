import assert from "node:assert/strict";
import { test } from "node:test";
import { collectMaterials } from "../app/materials.ts";
import { exercises } from "../data/exercises.ts";
import { parcours } from "../data/parcours.ts";

test("cone variants and marking lines share one required row and retain every source", () => {
  const result = collectMaterials([
    { title: "Parcours", material: ["6–10 kegeltjes", "10 kegels"], optionalMaterial: [] },
    { title: "Touwtrekken", material: ["3 markeringslijnen"], optionalMaterial: [] },
    { title: "Spel", material: [], optionalMaterial: ["Kegels", "2 markeringspotjes"] },
  ]);
  assert.deepEqual(result, {
    necessary: [{ name: "Kegeltjes", sources: ["Parcours", "Touwtrekken", "Spel"] }],
    optional: [],
  });
});

test("common variants merge while special equipment and alternatives remain distinct", () => {
  const result = collectMaterials([{
    title: "Spel",
    material: ["1 lichte mat per team", "Mat aan het uiteinde", "1 lange of 2 korte matten", "Dikke landingsmat", "1–3 turnbanken", "Bank", "Schuine bank", "Loopladder of platte hoepels"],
    optionalMaterial: ["Kersepitzakje", "Gekleurde kersepitzakjes", "Knuffels", "Knuffel als mascotte", "Zachte bal", "1–6 zachte balletjes", "1 zachte bal per kind of duo"],
  }]);
  assert.deepEqual(result.necessary.map(({ name }) => name), ["Matten", "Dikke landingsmat", "Turnbanken", "Schuine bank", "Loopladder of platte hoepels"]);
  assert.deepEqual(result.optional.map(({ name }) => name), ["Kersepitzakjes", "Knuffels", "Zachte ballen"]);
});

test("the full catalogue lists tug-of-war ribbon with its rope and has no duplicate categories", () => {
  const result = collectMaterials([
    ...exercises.map(item => ({ ...item, optionalMaterial: item.optionalMaterial ?? [] })),
    ...parcours.stations.map(item => ({ ...item, title: item.name, optionalMaterial: item.optionalMaterial ?? [] })),
  ]);
  const all = [...result.necessary, ...result.optional];
  assert.equal(all.filter(({ name }) => /kegel/i.test(name)).length, 1);
  assert.deepEqual(all.filter(({ name }) => /middenlint/i.test(name)).map(({ name }) => name), ["Lang, stevig touw met middenlint"]);
  assert.ok(result.necessary.find(({ name }) => name === "Kegeltjes").sources.includes("Touwtrekken"));
  assert.equal(new Set(all.map(({ name }) => name)).size, all.length);
});
