import { describe, expect, it } from "vitest";
import { getServiceBySlug, getServices } from "./services";

describe("services data helpers", () => {
  it("returns the configured service pages", async () => {
    const services = await getServices();
    expect(services).toHaveLength(3);
  });

  it("finds a service by slug case-insensitively", async () => {
    const service = await getServiceBySlug("Website-Relaunch-KMU");
    expect(service?.slug).toBe("website-relaunch-kmu");
  });
});
