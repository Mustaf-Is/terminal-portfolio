# Mustafë Ismajli — Terminal Portfolio

An original terminal-style portfolio built with React, TypeScript, Vite, and plain CSS. It presents Mustafë's backend engineering experience, technical skills, education, projects, and contact links through a keyboard-friendly command interface.

## Local development

```bash
npm install
npm run dev
```

Production checks:

```bash
npm test
npm run build
npm run preview
```

## Commands

- `help`, `welcome`, `whoami`, `about`
- `experience`, `skills`, `education`
- `projects`, `uni-projects`
- `open <project-slug>`, `source <project-slug>`
- `contact`, `socials`, `github`, `linkedin`, `email`, `resume`
- `history`, `clear`

Use the Up/Down arrows for command history and Tab for command or project completion.

## Updating content

Portfolio content and external URLs live in `src/data/portfolio.ts`. The command registry and parsing behavior live in `src/terminal/commands.ts`.

The public résumé is generated from `scripts/build_resume.py` and deployed as `/mustafe-ismajli-resume.pdf`. It intentionally omits a phone number.

## Netlify

`netlify.toml` configures the production build with `npm run build`, the `dist` publish directory, and Node.js 22. Connect this repository to Netlify and deploy the `main` branch. No environment variables are required.

## Projects

- [Mansory Mobilje](https://mansory-mobilje.netlify.app/)
- [ELB Construction](https://elb-construction.netlify.app/#accueil)
- [Illyrian Books](https://illyrian-books.netlify.app/)
- [ProWeb](https://mustaf-is.github.io/S9_Mustaf-Ismajli_Final_Project/)

## Inspiration

The interaction style was inspired by [Sat Naing's terminal portfolio](https://terminal.satnaing.dev/). This repository uses original code, copy, components, and visual design.
