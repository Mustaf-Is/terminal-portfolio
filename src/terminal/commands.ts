import { findProject, findSocial, projectSlugs } from "../data/portfolio";

export type OutputKind =
  | "welcome"
  | "help"
  | "whoami"
  | "about"
  | "experience"
  | "skills"
  | "education"
  | "projects"
  | "uni-projects"
  | "contact"
  | "socials"
  | "history"
  | "external"
  | "error"
  | "candidates"
  | "clear";

export interface CommandResult {
  kind: OutputKind;
  message?: string;
  url?: string;
  label?: string;
  items?: string[];
}

export interface CommandContext {
  history: string[];
}

export interface CommandDefinition {
  name: string;
  usage: string;
  description: string;
  aliases?: string[];
  execute: (args: string[], context: CommandContext) => CommandResult;
}

function projectRedirect(kind: "demo" | "source", args: string[]): CommandResult {
  const slug = args[0];
  if (!slug) {
    return {
      kind: "error",
      message: `Usage: ${kind === "demo" ? "open" : "source"} <project-slug>\nValid slugs: ${projectSlugs.join(", ")}`,
    };
  }

  const project = findProject(slug);
  if (!project) {
    return {
      kind: "error",
      message: `Unknown project "${slug}". Valid slugs: ${projectSlugs.join(", ")}`,
    };
  }

  return {
    kind: "external",
    url: kind === "demo" ? project.demoUrl : project.repoUrl,
    label: `${kind === "demo" ? "Opening" : "Opening source for"} ${project.title}`,
  };
}

function socialRedirect(slug: "github" | "linkedin" | "email" | "resume"): CommandResult {
  const social = findSocial(slug);
  return social
    ? { kind: "external", url: social.url, label: `Opening ${social.label}` }
    : { kind: "error", message: `The ${slug} link is unavailable.` };
}

export const commands: CommandDefinition[] = [
  { name: "help", usage: "help", description: "List available commands", execute: () => ({ kind: "help" }) },
  { name: "welcome", usage: "welcome", description: "Show the opening banner", execute: () => ({ kind: "welcome" }) },
  { name: "whoami", usage: "whoami", description: "Show the short introduction", execute: () => ({ kind: "whoami" }) },
  { name: "about", usage: "about", description: "Read the full profile", execute: () => ({ kind: "about" }) },
  { name: "experience", usage: "experience", description: "View professional experience", aliases: ["work"], execute: () => ({ kind: "experience" }) },
  { name: "skills", usage: "skills", description: "Explore technical skills", execute: () => ({ kind: "skills" }) },
  { name: "education", usage: "education", description: "View education and continued learning", aliases: ["learning"], execute: () => ({ kind: "education" }) },
  { name: "projects", usage: "projects", description: "List featured and university projects", execute: () => ({ kind: "projects" }) },
  { name: "uni-projects", usage: "uni-projects", description: "List university projects", aliases: ["university-projects"], execute: () => ({ kind: "uni-projects" }) },
  { name: "open", usage: "open <project-slug>", description: "Open a live project demo", execute: (args) => projectRedirect("demo", args) },
  { name: "source", usage: "source <project-slug>", description: "Open a project's source code", execute: (args) => projectRedirect("source", args) },
  { name: "contact", usage: "contact", description: "Show contact details", execute: () => ({ kind: "contact" }) },
  { name: "socials", usage: "socials", description: "Show social profiles", execute: () => ({ kind: "socials" }) },
  { name: "github", usage: "github", description: "Open GitHub", execute: () => socialRedirect("github") },
  { name: "linkedin", usage: "linkedin", description: "Open LinkedIn", execute: () => socialRedirect("linkedin") },
  { name: "email", usage: "email", description: "Write an email", execute: () => socialRedirect("email") },
  { name: "resume", usage: "resume", description: "Open the résumé PDF", aliases: ["cv"], execute: () => socialRedirect("resume") },
  { name: "history", usage: "history", description: "Show command history", execute: (_args, context) => ({ kind: "history", items: context.history }) },
  { name: "clear", usage: "clear", description: "Clear the terminal output", aliases: ["cls"], execute: () => ({ kind: "clear" }) },
];

const commandLookup = new Map<string, CommandDefinition>();
commands.forEach((command) => {
  commandLookup.set(command.name, command);
  command.aliases?.forEach((alias) => commandLookup.set(alias, command));
});

export function normalizeInput(input: string) {
  return input.trim().replace(/\s+/g, " ").toLowerCase();
}

export function executeCommand(input: string, context: CommandContext): CommandResult {
  const normalized = normalizeInput(input);
  const [name, ...args] = normalized.split(" ");
  const command = commandLookup.get(name);

  if (!command) {
    return {
      kind: "error",
      message: `command not found: ${name}. Type "help" to see the available commands.`,
    };
  }

  return command.execute(args, context);
}

export function getCompletions(input: string): string[] {
  const normalized = input.toLowerCase().replace(/^\s+/, "");
  const parts = normalized.split(/\s+/);

  if (parts.length === 1) {
    const query = parts[0];
    return commands.map((command) => command.name).filter((name) => name.startsWith(query));
  }

  const [command, partial = ""] = parts;
  if ((command === "open" || command === "source") && parts.length === 2) {
    return projectSlugs
      .filter((slug) => slug.startsWith(partial))
      .map((slug) => `${command} ${slug}`);
  }

  return [];
}
