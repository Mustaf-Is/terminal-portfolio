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

- `about`
- `clear`
- `contact`
- `education`
- `experience`
- `help`
- `history`
- `open <project-slug>`
- `projects`
- `resume`
- `skills`
- `socials`
- `source <project-slug>`
- `theme`
- `uni-projects`
- `welcome`

Use the Up/Down arrows for command history and Tab for command or project completion.
Run `theme`, use the arrow keys to choose a palette, and press Enter to apply it.

## Updating content

Portfolio content and external URLs live in `src/data/portfolio.ts`. The command registry and parsing behavior live in `src/terminal/commands.ts`.

The public résumé is the latest supplied PDF, stored at `public/mustafe-ismajli-resume.pdf`. Replace that file to update the résumé opened by `resume` and linked from `socials`.

## Netlify

`netlify.toml` configures the production build with `npm run build`, the `dist` publish directory, and Node.js 22. Connect this repository to Netlify and deploy the `main` branch. No environment variables are required.

## Projects

- [Mansory Mobilje](https://mansory-mobilje.netlify.app/)
- [ELB Construction](https://elb-construction.netlify.app/#accueil)
- [Illyrian Books](https://illyrian-books.netlify.app/)
- [ProWeb](https://mustaf-is.github.io/S9_Mustaf-Ismajli_Final_Project/)

## Inspiration

The interaction style was inspired by [Sat Naing's terminal portfolio](https://terminal.satnaing.dev/). This repository uses original code, copy, components, and visual design.
