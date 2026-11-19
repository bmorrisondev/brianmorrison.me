import assert from "node:assert/strict";
import test from "node:test";
import {
  featuredCaseStudySlugs,
  jobs,
  portfolioItems,
} from "../app/content/portfolio";
import { advanceDemo, initialState } from "../app/demos/waystone";

test("each selected case study is published and associated with a company", () => {
  for (const slug of featuredCaseStudySlugs) {
    const item = portfolioItems.find((item) => item.slug === slug);
    assert.ok(
      item?.job?.length,
      `Missing published case study or company for ${slug}`,
    );
  }
});

test("the Homerun job links to the release case study", () => {
  const job = jobs.find((job) => job.slug === "homerun-presales");
  assert.ok(
    job?.notableProjects.some(
      (item) => item.slug === "reliable-releases-at-homerun-presales",
    ),
  );
});

test("retrying an interrupted Waystone import skips the row already saved", () => {
  const ready = advanceDemo(initialState);
  assert.equal(ready.phase, "ready");
  assert.equal(ready.savedRows.length, 0);

  const interrupted = advanceDemo(ready);
  assert.equal(interrupted.phase, "interrupted");
  assert.deepEqual(
    interrupted.savedRows.map(({ sourceId }) => sourceId),
    ["TX-1042"],
  );

  const completed = advanceDemo(interrupted);
  assert.equal(completed.phase, "complete");
  assert.deepEqual(
    completed.savedRows.map(({ sourceId }) => sourceId),
    ["TX-1042", "TX-1043"],
  );
  assert.equal(completed.skippedRows, 1);
  assert.deepEqual(advanceDemo(completed), initialState);
});
