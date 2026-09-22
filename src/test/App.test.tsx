import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "../App";

async function run(command: string) {
  const input = screen.getByLabelText("Enter a portfolio command");
  await userEvent.clear(input);
  await userEvent.type(input, `${command}{Enter}`);
}

describe("terminal portfolio", () => {
  afterEach(() => vi.restoreAllMocks());

  it("shows the welcome output and executes help", async () => {
    render(<App />);
    expect(screen.getByText(/Backend Systems, Data Pipelines & AI Automation/)).toBeInTheDocument();
    await run("help");
    expect(screen.getByRole("heading", { name: /available commands/i })).toBeInTheDocument();
  });

  it("presents both the professional and personal sides of the profile", async () => {
    render(<App />);
    await run("whoami");
    expect(screen.getByText(/experience building backend systems/i)).toBeInTheDocument();
    expect(screen.getByText(/reading and hiking/i)).toBeInTheDocument();
    expect(screen.getByText(/playing and watching the game/i)).toBeInTheDocument();
  });

  it("renders an ASCII banner with equally sized rows", () => {
    render(<App />);
    const rows = screen.getByLabelText("Mustafë Ismajli").textContent?.split("\n") ?? [];
    expect(rows).toHaveLength(3);
    expect(rows.map((row) => row.length)).toEqual([48, 48, 48]);
  });

  it("renders both project groups and all four projects", async () => {
    render(<App />);
    await run("projects");
    expect(screen.getByText("featured-builds/")).toBeInTheDocument();
    expect(screen.getByText("uni-projects/")).toBeInTheDocument();
    for (const title of ["Mansory Mobilje", "ELB Construction", "Illyrian Books", "ProWeb"]) {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    }
  });

  it("opens allowlisted destinations and keeps a fallback link", async () => {
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    render(<App />);
    await run("open illyrian-books");
    expect(open).toHaveBeenCalledWith("https://illyrian-books.netlify.app/", "_blank", "noopener,noreferrer");
    expect(screen.getByRole("link", { name: /continue manually/i })).toHaveAttribute("href", "https://illyrian-books.netlify.app/");
  });

  it("supports history navigation, tab completion, and clear", async () => {
    render(<App />);
    const input = screen.getByLabelText("Enter a portfolio command");
    await run("about");
    await userEvent.type(input, "ski{Tab}");
    expect(input).toHaveValue("skills");
    await userEvent.clear(input);
    await userEvent.keyboard("{ArrowUp}");
    expect(input).toHaveValue("about");
    await run("clear");
    expect(screen.queryByText(/Backend Systems, Data Pipelines & AI Automation/)).not.toBeInTheDocument();
  });

  it("shows previous commands in chronological order", async () => {
    render(<App />);
    await run("about");
    await run("skills");
    await run("history");
    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem").map((item) => item.textContent);
    expect(items).toEqual(["about", "skills"]);
  });

  it("uses the GitHub theme by default and supports keyboard theme selection", async () => {
    render(<App />);
    expect(document.documentElement).toHaveAttribute("data-theme", "github");

    await run("theme");
    const artictaTheme = screen.getByRole("option", { name: /articta/i });
    expect(screen.getByRole("option", { name: /github/i })).toHaveAttribute("aria-selected", "true");

    await userEvent.keyboard("{ArrowUp}{Enter}");
    expect(document.documentElement).toHaveAttribute("data-theme", "articta");
    expect(artictaTheme).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Theme applied: Articta")).toBeInTheDocument();

    await run("theme");
    await userEvent.keyboard("{ArrowDown}");

    const artictaOptions = screen.getAllByRole("option", { name: /articta/i });
    const githubOptions = screen.getAllByRole("option", { name: /github/i });
    expect(artictaOptions[0]).toHaveAttribute("aria-selected", "true");
    expect(artictaOptions[1]).toHaveAttribute("aria-selected", "false");
    expect(githubOptions[0]).toHaveAttribute("aria-selected", "false");
    expect(githubOptions[1]).toHaveAttribute("aria-selected", "true");

    await userEvent.keyboard("{Enter}");
    expect(document.documentElement).toHaveAttribute("data-theme", "github");
  });
});
