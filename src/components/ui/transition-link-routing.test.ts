import { describe, expect, it } from "vitest";
import {
  getTransitionNavigationDecision,
  isBypassHref,
} from "./transition-link-routing";

const currentOrigin = "https://stackwerkhaus.de";

describe("transition link routing", () => {
  it("triggers a transition for standard page changes", () => {
    expect(
      getTransitionNavigationDecision({
        href: "/leistungen",
        currentOrigin,
        currentPathname: "/work",
        currentSearch: "",
      })
    ).toEqual({
      kind: "transition",
      href: "/leistungen",
    });
  });

  it("triggers a transition for cross-page hash links", () => {
    expect(
      getTransitionNavigationDecision({
        href: "/#top",
        currentOrigin,
        currentPathname: "/work",
        currentSearch: "",
      })
    ).toEqual({
      kind: "transition",
      href: "/#top",
    });
  });

  it("keeps same-page hash links direct", () => {
    expect(
      getTransitionNavigationDecision({
        href: "/#contact",
        currentOrigin,
        currentPathname: "/",
        currentSearch: "",
      })
    ).toEqual({
      kind: "same-page-hash",
      href: "/#contact",
    });
  });

  it("keeps same-page hash links direct when the path is explicit", () => {
    expect(
      getTransitionNavigationDecision({
        href: "/leistungen#foo",
        currentOrigin,
        currentPathname: "/leistungen",
        currentSearch: "",
      })
    ).toEqual({
      kind: "same-page-hash",
      href: "/leistungen#foo",
    });
  });

  it("bypasses transition handling for modified clicks", () => {
    expect(
      getTransitionNavigationDecision({
        href: "/leistungen",
        currentOrigin,
        currentPathname: "/work",
        currentSearch: "",
        isModifiedEvent: true,
      })
    ).toEqual({
      kind: "bypass",
    });
  });

  it("bypasses transition handling for external and mailto links", () => {
    expect(isBypassHref("https://example.com")).toBe(true);
    expect(isBypassHref("mailto:info@stackwerkhaus.de")).toBe(true);
    expect(isBypassHref("/leistungen")).toBe(false);
  });
});
