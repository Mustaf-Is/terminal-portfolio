export type ProjectCategory = "featured" | "university";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  technologies: string[];
  demoUrl: string;
  repoUrl: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  achievements: string[];
}

export interface EducationItem {
  institution: string;
  qualification: string;
  period: string;
  detail?: string;
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

export interface SocialLink {
  slug: "github" | "linkedin" | "email" | "resume";
  label: string;
  url: string;
}

export const profile = {
  name: "Mustafë Ismajli",
  role: "Software Engineer",
  location: "Prishtinë, Kosovo",
  tagline: "Backend Systems, Data Pipelines & AI Automation",
  summary:
    "Software engineer experienced in building backend systems, scalable web-scraping and ETL pipelines, and AI-driven automation. I work with Python, FastAPI, Node.js, TypeScript, OpenAI models, and cloud services across AWS and Azure to turn complex data workflows into reliable, production-ready software.",
};

export const experience: ExperienceItem[] = [
  {
    role: "Junior Software Engineer",
    company: "Radix Software Inc.",
    period: "Sep 2025 - Present",
    achievements: [
      "Helped scale platform coverage toward 14M+ integrated multifamily housing units by building and deploying web scrapers, data pipelines, and third-party property API integrations across diverse U.S. sources.",
      "Contributed to an internal mapping platform that streamlined scraped-data processing through AI-driven data matching and mapping, automated scraper generation, and reduced reliance on external engineering teams.",
      "Implemented AI-driven data classification and clustering workflows using OpenAI models and prompt engineering, improving the consistency and throughput of data-processing workflows.",
      "Contributed to the design and development of an internal FastAPI service that exposes data stored in Amazon S3 to downstream services within the scraping platform.",
      "Designed and developed backend services and REST APIs using Node.js and TypeScript, supporting core platform functionality and scalable data workflows.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Radix Software Inc.",
    period: "Apr 2025 - Aug 2025",
    achievements: [
      "Developed RESTful and GraphQL APIs using Node.js and MongoDB to support scalable web applications.",
      "Implemented unit tests for services, mappers, and controllers to improve code reliability, maintainability, and overall quality.",
      "Collaborated within an eight-member cross-functional Agile team following Scrum with Kanban practices, managing work in Jira while contributing to feature development and bug resolution.",
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    name: "Back-end development",
    skills: ["FastAPI", "TypeScript", "Node.js"],
  },
  {
    name: "Front-end development",
    skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "Tailwind", "ReactJS"],
  },
  {
    name: "AI & data",
    skills: [
      "Python",
      "Databricks",
      "LLMs",
      "OpenAI",
      "Prompt engineering",
      "Data pipelines",
      "ETL",
      "Web scraping",
    ],
  },
  {
    name: "Tools & engineering",
    skills: [
      "Git",
      "GitHub",
      "CI/CD",
      "GitHub Actions",
      "Docker",
      "AWS",
      "Azure",
      "MongoDB",
      "MySQL",
      "DuckDB",
      "Agile",
      "Scrum",
    ],
  },
  {
    name: "Soft skills",
    skills: ["Teamwork", "Critical thinking", "Adaptability", "Time management", "Creativity"],
  },
];

export const education: EducationItem[] = [
  {
    institution: "University of Pristina",
    qualification: "B.S. Computer Science",
    period: "2022 - 2025",
    detail: "GPA: 9.11/10",
  },
  {
    institution: "Skënderbeu High School",
    qualification: "High School Diploma",
    period: "2019 - 2022",
    detail: "GPA: 5.0/5.0",
  },
];

export const coursework = [
  "Front-End Development - Cacttus Education (May 2022 - July 2022)",
  "Web Development Professional - ICT for Kosovo's Growth (October 2024 - January 2025)",
];

export const hackathons = [
  "Raiffeisen Bank Data Hackathon - Built a real-time weather-data ingestion and ETL pipeline (November 2024).",
  "JunctionX ITP Prizren AI Hackathon - Co-developed CivicPulse for citizen-led public-service improvement (May 2025).",
];

export const projects: Project[] = [
  {
    slug: "mansory-mobilje",
    title: "Mansory Mobilje",
    category: "featured",
    summary:
      "A multilingual custom-furniture showcase with project galleries, detailed portfolio views, and an interactive product customizer.",
    technologies: ["React", "TypeScript", "Vite", "React Router"],
    demoUrl: "https://mansory-mobilje.netlify.app/",
    repoUrl: "https://github.com/Mustaf-Is/mansory-mobilje",
  },
  {
    slug: "elb-construction",
    title: "ELB Construction",
    category: "featured",
    summary:
      "A responsive French-language site for a Paris construction and renovation company, with services, completed work, testimonials, and direct WhatsApp/call paths.",
    technologies: ["React", "TypeScript", "Vite", "Responsive CSS"],
    demoUrl: "https://elb-construction.netlify.app/#accueil",
    repoUrl: "https://github.com/Mustaf-Is/elb-construction",
  },
  {
    slug: "illyrian-books",
    title: "Illyrian Books",
    category: "university",
    summary:
      "A responsive bookstore experience with search, genre discovery, Google Books data, detailed book views, authentication UI, and shopping-cart flows.",
    technologies: ["HTML", "CSS", "JavaScript", "jQuery", "Google Books API"],
    demoUrl: "https://illyrian-books.netlify.app/",
    repoUrl: "https://github.com/Mustaf-Is/ProgWWW_24_Gr7",
  },
  {
    slug: "proweb",
    title: "ProWeb",
    category: "university",
    summary:
      "A responsive web-agency concept presenting development, hosting, responsive design, and SEO services alongside team, FAQ, portfolio, and contact sections.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    demoUrl: "https://mustaf-is.github.io/S9_Mustaf-Ismajli_Final_Project/",
    repoUrl: "https://github.com/Mustaf-Is/S9_Mustaf-Ismajli_Final_Project",
  },
];

export const socials: SocialLink[] = [
  { slug: "github", label: "GitHub", url: "https://github.com/Mustaf-Is" },
  {
    slug: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/mustaf%C3%AB-ismajli-99b54b318/",
  },
  { slug: "email", label: "Email", url: "mailto:ismajlim26@gmail.com" },
  { slug: "resume", label: "Résumé", url: "/mustafe-ismajli-resume.pdf" },
];

export const projectSlugs = projects.map((project) => project.slug);

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function findSocial(slug: SocialLink["slug"]) {
  return socials.find((social) => social.slug === slug);
}
