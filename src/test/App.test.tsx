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
    expect(screen.getByText(/Backend Systems, Automation & Python/)).toBeInTheDocument();
    await run("help");
    expect(screen.getByRole("heading", { name: /available commands/i })).toBeInTheDocument();
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
    expect(screen.queryByText(/Backend Systems, Automation & Python/)).not.toBeInTheDocument();
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
});
