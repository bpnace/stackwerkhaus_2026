import { describe, expect, it } from "vitest";
import {
  getPortfolioProjectBySlug,
  getPortfolioProjects,
} from "./projects";

describe("projects data helpers", () => {
  it("returns a non-empty list of portfolio projects", async () => {
    const projects = await getPortfolioProjects();
    expect(projects.length).toBeGreaterThan(0);
  });

  it("finds a project by slug case-insensitively", async () => {
    const project = await getPortfolioProjectBySlug("Immo-Pal");
    expect(project?.slug).toBe("immo-pal");
  });
});
