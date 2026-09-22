import { describe, expect, it } from "vitest";
import { executeCommand, getCompletions, normalizeInput } from "../terminal/commands";

describe("command engine", () => {
  it("normalizes case and whitespace", () => {
    expect(normalizeInput("  OPEN   ProWeb  ")).toBe("open proweb");
  });

  it("resolves aliases", () => {
    expect(executeCommand("work", { history: [] }).kind).toBe("experience");
    expect(executeCommand("cv", { history: [] }).url).toBe("/mustafe-ismajli-resume.pdf");
  });

  it("returns useful errors for unknown commands and slugs", () => {
    expect(executeCommand("wat", { history: [] }).message).toContain("command not found");
    expect(executeCommand("open", { history: [] }).message).toContain("Valid slugs");
    expect(executeCommand("source missing", { history: [] }).message).toContain("Unknown project");
  });

  it("returns allowlisted project URLs", () => {
    expect(executeCommand("open mansory-mobilje", { history: [] }).url).toBe("https://mansory-mobilje.netlify.app/");
    expect(executeCommand("source proweb", { history: [] }).url).toBe("https://github.com/Mustaf-Is/S9_Mustaf-Ismajli_Final_Project");
  });

  it("completes commands and project slugs", () => {
    expect(getCompletions("wel")).toEqual(["welcome"]);
    expect(getCompletions("the")).toEqual(["theme"]);
    expect(getCompletions("open man")).toEqual(["open mansory-mobilje"]);
  });

  it("opens the theme picker", () => {
    expect(executeCommand("theme", { history: [] }).kind).toBe("theme");
  });
});
