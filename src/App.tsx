import { useEffect, useReducer, useRef, useState } from "react";
import {
  coursework,
  education,
  experience,
  hackathons,
  profile,
  projects,
  skills,
  socials,
  type Project,
} from "./data/portfolio";
import {
  commands,
  executeCommand,
  getCompletions,
  type CommandResult,
} from "./terminal/commands";

interface TranscriptEntry {
  id: number;
  command?: string;
  result: CommandResult;
}

interface TerminalState {
  input: string;
  entries: TranscriptEntry[];
  history: string[];
  historyIndex: number;
  historyDraft: string;
  nextId: number;
}

type ThemeId = "articta" | "github" | "classic";

const themeOptions: Array<{
  id: ThemeId;
  label: string;
  description: string;
  colors: [string, string, string];
}> = [
  {
    id: "articta",
    label: "Articta",
    description: "Teal, amber and violet",
    colors: ["#2dd4bf", "#fbbf24", "#a78bfa"],
  },
  {
    id: "github",
    label: "GitHub",
    description: "Coral, lilac and sky blue",
    colors: ["#f37067", "#d9bbf8", "#88d0ff"],
  },
  {
    id: "classic",
    label: "Classic Terminal",
    description: "Monochrome green accents",
    colors: ["#39ff14", "#7cff6b", "#86efac"],
  },
];

type Action =
  | { type: "SET_INPUT"; value: string }
  | { type: "EXECUTE"; command: string; result: CommandResult }
  | { type: "NAVIGATE_HISTORY"; direction: "up" | "down" }
  | { type: "COMPLETE"; value: string }
  | { type: "SHOW_CANDIDATES"; candidates: string[] };

const initialState: TerminalState = {
  input: "",
  entries: [{ id: 0, result: { kind: "welcome" } }],
  history: [],
  historyIndex: -1,
  historyDraft: "",
  nextId: 1,
};

const ASCII_BANNER_INNER_WIDTH = 46;
const ASCII_BANNER_LABEL = "MUSTAFË ISMAJLI  //  SOFTWARE ENGINEER";
const ASCII_BANNER = [
  `┌${"─".repeat(ASCII_BANNER_INNER_WIDTH)}┐`,
  `│  ${ASCII_BANNER_LABEL.padEnd(ASCII_BANNER_INNER_WIDTH - 2)}│`,
  `└${"─".repeat(ASCII_BANNER_INNER_WIDTH)}┘`,
].join("\n");

function reducer(state: TerminalState, action: Action): TerminalState {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, input: action.value };
    case "EXECUTE": {
      const history = [...state.history, action.command];
      const entries =
        action.result.kind === "clear"
          ? []
          : [...state.entries, { id: state.nextId, command: action.command, result: action.result }];
      return {
        ...state,
        entries,
        history,
        input: "",
        historyIndex: -1,
        historyDraft: "",
        nextId: state.nextId + 1,
      };
    }
    case "NAVIGATE_HISTORY": {
      if (state.history.length === 0) return state;

      if (action.direction === "up") {
        const nextIndex =
          state.historyIndex === -1
            ? state.history.length - 1
            : Math.max(0, state.historyIndex - 1);
        return {
          ...state,
          historyDraft: state.historyIndex === -1 ? state.input : state.historyDraft,
          historyIndex: nextIndex,
          input: state.history[nextIndex],
        };
      }

      if (state.historyIndex === -1) return state;
      if (state.historyIndex === state.history.length - 1) {
        return { ...state, historyIndex: -1, input: state.historyDraft };
      }
      const nextIndex = state.historyIndex + 1;
      return { ...state, historyIndex: nextIndex, input: state.history[nextIndex] };
    }
    case "COMPLETE":
      return { ...state, input: action.value, historyIndex: -1 };
    case "SHOW_CANDIDATES":
      return {
        ...state,
        entries: [
          ...state.entries,
          {
            id: state.nextId,
            command: `${state.input}<TAB>`,
            result: { kind: "candidates", items: action.candidates },
          },
        ],
        nextId: state.nextId + 1,
      };
  }
}

function Prompt({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "prompt prompt--compact" : "prompt"} aria-hidden="true">
      <span className="prompt__user">mustafe</span>
      <span className="prompt__muted">@</span>
      <span className="prompt__host">portfolio</span>
      <span className="prompt__muted">:</span>
      <span className="prompt__path">~</span>
      <span className="prompt__symbol">$</span>
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="output-title">// {children}</h2>;
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function ProjectItem({ project }: { project: Project }) {
  return (
    <article className="project-item">
      <div className="project-item__header">
        <h3>{project.title}</h3>
        <code>{project.slug}</code>
      </div>
      <p>{project.summary}</p>
      <p className="tech-list">{project.technologies.join(" / ")}</p>
      <div className="project-actions">
        <span className="project-action"><code>open {project.slug}</code><span className="info">for live demo</span></span>
        <span className="project-action"><code>source {project.slug}</code><span className="info">for source code</span></span>
      </div>
    </article>
  );
}

function ProjectGroup({ category }: { category: Project["category"] }) {
  const group = projects.filter((project) => project.category === category);
  return (
    <section className="project-group">
      <h3 className="group-label">
        {category === "featured" ? "featured-builds/" : "uni-projects/"}
      </h3>
      {group.map((project) => (
        <ProjectItem key={project.slug} project={project} />
      ))}
    </section>
  );
}

function ThemePicker({
  theme,
  selection,
  isOpen,
}: {
  theme: ThemeId;
  selection: ThemeId;
  isOpen: boolean;
}) {
  return (
    <div>
      <SectionTitle>choose a theme</SectionTitle>
      <p className="muted-copy">Use ↑/↓ or ←/→ to move, then press Enter to apply. Esc cancels.</p>
      <div className="theme-picker" role="listbox" aria-label="Terminal themes">
        {themeOptions.map((option) => (
          <div
            className={`theme-option${selection === option.id ? " theme-option--selected" : ""}`}
            key={option.id}
            role="option"
            aria-selected={selection === option.id}
          >
            <span className="theme-option__cursor" aria-hidden="true">
              {isOpen && selection === option.id ? ">" : " "}
            </span>
            <span className="theme-option__swatches" aria-hidden="true">
              {option.colors.map((color) => <i key={color} style={{ backgroundColor: color }} />)}
            </span>
            <span className="theme-option__copy">
              <strong>{option.label}</strong>
              <small>{option.description}</small>
            </span>
            <span className="theme-option__status">
              {isOpen ? (theme === option.id ? "active" : "") : (selection === option.id ? "applied" : "")}
            </span>
          </div>
        ))}
      </div>
      {!isOpen && <p className="theme-picker__result">Theme applied: {themeOptions.find((option) => option.id === selection)?.label}</p>}
    </div>
  );
}

function Output({
  result,
  theme,
  themeSelection,
  themePickerOpen,
}: {
  result: CommandResult;
  theme: ThemeId;
  themeSelection: ThemeId;
  themePickerOpen: boolean;
}) {
  switch (result.kind) {
    case "welcome":
      return (
        <div className="welcome-output">
          <pre className="ascii-banner" aria-label="Mustafë Ismajli">{ASCII_BANNER}</pre>
          <p className="welcome-role">Software Engineer | Backend Systems, Data Pipelines & AI Automation</p>
          <p className="muted-copy">Building production-ready software for complex data and real-world workflows, from robust APIs to AI-powered automation. Passionate about the evolving world of AI, I'm driven to keep learning, take on new challenges, and grow as a software engineer.</p>
          <p className="help-commands">Type <code>help</code> to explore or <code>projects</code> to see selected work.</p>
        </div>
      );
    case "help":
      return (
        <div>
          <SectionTitle>available commands</SectionTitle>
          <div className="command-list">
            {commands.map((command) => (
              <div className="command-list__item" key={command.name}>
                <code>{command.usage}</code>
                <span>{command.description}</span>
              </div>
            ))}
          </div>
          <p className="muted-copy">Use ↑/↓ for history and Tab for completion.</p>
        </div>
      );
    case "whoami":
      return (
        <div className="whoami-output">
          <p>
            Hi, I'm {profile.name}, a software engineer based in {profile.location}. I have experience building backend systems, data pipelines, and AI-powered automation with Python, FastAPI, TypeScript, and Node.js. I'm especially interested in the evolving world of AI and in continuing to learn and grow as an engineer.
          </p>
          <p className="muted-copy">
            Outside of tech, I enjoy reading and hiking. Football is another big passion of mine—I love both playing and watching the game.
          </p>
        </div>
      );
    case "about":
      return (
        <div>
          <SectionTitle>about</SectionTitle>
          <p>{profile.summary}</p>
          <p className="muted-copy">Current focus: production-ready, AI-powered applications built on dependable backend architecture and scalable data workflows.</p>
        </div>
      );
    case "experience":
      return (
        <div>
          <SectionTitle>experience</SectionTitle>
          <div className="timeline">
            {experience.map((item) => (
              <article className="timeline__item" key={`${item.role}-${item.period}`}>
                <div className="timeline__heading">
                  <h3>{item.role} · {item.company}</h3>
                  <span>{item.period}</span>
                </div>
                <ul>{item.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      );
    case "skills":
      return (
        <div>
          <SectionTitle>technical skills</SectionTitle>
          <div className="skill-grid">
            {skills.map((group) => (
              <section key={group.name}>
                <h3>{group.name}</h3>
                <p>{group.skills.join(" · ")}</p>
              </section>
            ))}
          </div>
        </div>
      );
    case "education":
      return (
        <div>
          <SectionTitle>education & growth</SectionTitle>
          {education.map((item) => (
            <article className="education-item" key={item.institution}>
              <div><h3>{item.institution}</h3><p>{item.qualification}</p></div>
              <span>{item.period}{item.detail ? ` · ${item.detail}` : ""}</span>
            </article>
          ))}
          <h3 className="subheading">coursework</h3>
          <ul>{coursework.map((item) => <li key={item}>{item}</li>)}</ul>
          <h3 className="subheading">hackathons</h3>
          <ul>{hackathons.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      );
    case "projects":
      return (
        <div>
          <SectionTitle>selected projects</SectionTitle>
          <ProjectGroup category="featured" />
          <ProjectGroup category="university" />
        </div>
      );
    case "uni-projects":
      return (
        <div>
          <SectionTitle>university projects</SectionTitle>
          <ProjectGroup category="university" />
        </div>
      );
    case "contact":
      return (
        <div>
          <SectionTitle>contact</SectionTitle>
          <p>Open to thoughtful engineering conversations and opportunities.</p>
          <p><ExternalLink href="mailto:ismajlim26@gmail.com">ismajlim26@gmail.com</ExternalLink></p>
          <p className="muted-copy">Email is the best way to reach me.</p>
        </div>
      );
    case "socials":
      return (
        <div>
          <SectionTitle>socials</SectionTitle>
          <div className="social-list">
            {socials.map((social) => <ExternalLink key={social.slug} href={social.url}>{social.label} ↗</ExternalLink>)}
          </div>
        </div>
      );
    case "theme":
      return <ThemePicker theme={theme} selection={themeSelection} isOpen={themePickerOpen} />;
    case "history":
      return (
        <div>
          <SectionTitle>command history</SectionTitle>
          {result.items?.length ? (
            <ol className="history-list">{result.items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ol>
          ) : <p className="muted-copy">No previous commands in this session.</p>}
        </div>
      );
    case "external":
      return <p>{result.label}...</p>;
    case "candidates":
      return <p>Matches: <span className="candidate-list">{result.items?.join("  ·  ")}</span></p>;
    case "error":
      return <pre className="error-output">{result.message}</pre>;
    default:
      return null;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [theme, setTheme] = useState<ThemeId>("github");
  const [themeSelections, setThemeSelections] = useState<Record<number, ThemeId>>({});
  const [activeThemePickerId, setActiveThemePickerId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const themePickerOpen = activeThemePickerId !== null;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => () => {
    delete document.documentElement.dataset.theme;
  }, []);

  useEffect(() => {
    const transcript = transcriptRef.current;
    if (!transcript) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    transcript.scrollTo({ top: transcript.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [state.entries]);

  function runCommand() {
    const command = state.input.trim();
    if (!command) return;
    const result = executeCommand(command, { history: state.history });
    if (result.kind === "external" && result.url) {
      const popup = window.open(result.url, "_blank", "noopener,noreferrer");
      if (popup) popup.opener = null;
    }
    if (result.kind === "theme") {
      const pickerId = state.nextId;
      setThemeSelections((selections) => ({ ...selections, [pickerId]: theme }));
      setActiveThemePickerId(pickerId);
    }
    dispatch({ type: "EXECUTE", command, result });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (activeThemePickerId !== null) {
      const themeSelection = themeSelections[activeThemePickerId] ?? theme;
      const currentIndex = themeOptions.findIndex((option) => option.id === themeSelection);

      if (["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
        const direction = event.key === "ArrowUp" || event.key === "ArrowLeft" ? -1 : 1;
        const nextIndex = (currentIndex + direction + themeOptions.length) % themeOptions.length;
        setThemeSelections((selections) => ({
          ...selections,
          [activeThemePickerId]: themeOptions[nextIndex].id,
        }));
      } else if (event.key === "Enter") {
        event.preventDefault();
        setTheme(themeSelection);
        setActiveThemePickerId(null);
      } else if (event.key === "Escape") {
        event.preventDefault();
        setThemeSelections((selections) => ({ ...selections, [activeThemePickerId]: theme }));
        setActiveThemePickerId(null);
      }
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      runCommand();
    } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      dispatch({ type: "NAVIGATE_HISTORY", direction: event.key === "ArrowUp" ? "up" : "down" });
    } else if (event.key === "Tab") {
      event.preventDefault();
      const completions = getCompletions(state.input);
      if (completions.length === 1) {
        const completion = completions[0];
        const expectsSlug = completion === "open" || completion === "source";
        dispatch({ type: "COMPLETE", value: `${completion}${expectsSlug ? " " : ""}` });
      } else if (completions.length > 1) {
        dispatch({ type: "SHOW_CANDIDATES", candidates: completions });
      }
    }
  }

  return (
    <main className="portfolio-shell" onClick={() => inputRef.current?.focus()}>
      <section className="terminal" aria-label="Mustafë Ismajli terminal portfolio">
        <header className="terminal-bar">
          <div className="window-controls" aria-hidden="true">
            <span className="window-dot window-dot--violet" />
            <span className="window-dot window-dot--amber" />
            <span className="window-dot window-dot--teal" />
          </div>
          <p>mustafe@portfolio — ~/career</p>
          <span className="online-status"><i /> ONLINE</span>
        </header>

        <div className="terminal-body">
          <div className="transcript" ref={transcriptRef} aria-live="polite" aria-label="Terminal output">
            {state.entries.map((entry) => (
              <section className="transcript-entry" key={entry.id}>
                {entry.command && <div className="executed-command"><Prompt compact /><span>{entry.command}</span></div>}
                <div className="command-output">
                  <Output
                    result={entry.result}
                    theme={theme}
                    themeSelection={themeSelections[entry.id] ?? theme}
                    themePickerOpen={activeThemePickerId === entry.id}
                  />
                </div>
              </section>
            ))}
          </div>

          <div className="input-row">
            <Prompt />
            <label className="sr-only" htmlFor="terminal-input">Enter a portfolio command</label>
            <input
              ref={inputRef}
              id="terminal-input"
              aria-describedby="terminal-hint"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              readOnly={themePickerOpen}
              value={state.input}
              onChange={(event) => dispatch({ type: "SET_INPUT", value: event.target.value })}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>
          <p id="terminal-hint" className="terminal-hint">
            {themePickerOpen ? "↑↓←→ to choose · Enter to apply · Esc to cancel" : "Enter to run · Tab to complete · ↑↓ for history"}
          </p>
        </div>
      </section>
    </main>
  );
}
