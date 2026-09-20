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
  location: "Kosovo",
  tagline: "Backend Systems, Automation & Python",
  summary:
    "Software engineer focused on backend systems, APIs, web scraping, data pipelines, automation, and practical AI integration. I enjoy turning messy real-world workflows into reliable, maintainable software while continuing to deepen my Python expertise.",
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineer I",
    company: "Radix Inc.",
    period: "September 2025 - Present",
    achievements: [
      "Develop and deploy web scrapers that extract, clean, and integrate large-scale data from diverse sources.",
      "Engineer data pipelines that automate internal ingestion workflows and accelerate data refresh cycles.",
      "Build AI-assisted categorization and clustering workflows with OpenAI models.",
      "Develop APIs and maintainable backend features with Node.js and TypeScript.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Radix Inc.",
    period: "April 2025 - August 2025",
    achievements: [
      "Developed REST and GraphQL APIs with Node.js and MongoDB.",
      "Implemented unit tests for services, mappers, and controllers.",
      "Worked in an eight-person cross-functional team using Scrum, Kanban, and Jira.",
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    name: "Backend & automation",
    skills: [
      "Python",
      "Node.js",
      "TypeScript",
      "Express",
      "Java",
      "Spring Boot",
      "REST",
      "GraphQL",
      "Web scraping",
      "Data pipelines",
    ],
  },
  {
    name: "Data & infrastructure",
    skills: ["MongoDB", "MySQL", "RabbitMQ", "Docker", "Azure", "Git", "GitHub"],
  },
  {
    name: "Frontend",
    skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind", "Bootstrap"],
  },
  {
    name: "Quality & workflow",
    skills: ["Unit testing", "Jest", "Jira", "Scrum", "Kanban"],
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
