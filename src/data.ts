export const profile = {
  name: "Nuttapat K",
  alias: "hackinteach",
  title: "Senior Software Engineer",
  tagline: "Backend, cloud infrastructure, and the occasional pixel.",
  blurb:
    "Computer Science grad from Mahidol University International College, now shipping production systems in Go on Google Cloud. I enjoy strong types, declarative infra, and making deploys boring.",
  // email is intentionally not stored in plain text — see src/lib/email.ts
  github: "https://github.com/hackinteach",
  linkedin: "https://www.linkedin.com/in/nuttapat-koo/",
  site: "https://nuttapatk.dev",
  location: "Bangkok, Thailand",
};

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Go", "Python", "TypeScript", "Scala", "Bash"],
  },
  {
    group: "Cloud & Infra",
    items: ["GCP", "Kubernetes", "Terraform", "Terragrunt", "Docker", "Ansible"],
  },
  {
    group: "CI/CD & Observability",
    items: ["Jenkins", "GitLab CI", "GitOps", "DataDog", "Grafana", "Prometheus", "ELK", "Loki"],
  },
  {
    group: "AI Ops & Agents",
    items: ["MCP Servers", "LLM Gateway", "Prompt Observability", "Agent Orchestration", "Cost Guardrails"],
  },
  {
    group: "Security & Compliance",
    items: ["OWASP Top 10", "Pentesting", "SOC 2", "ISO 27001", "PDPA", "IAM"],
  },
  {
    group: "Frontend",
    items: ["React", "Vue", "Vite", "Tailwind"],
  },
  {
    group: "Data & ML",
    items: ["TensorFlow", "SciPy", "MongoDB", "Firebase"],
  },
];

export const certifications: { title: string; org: string }[] = [
  { title: "Certified GitOps Associate (CGOA)", org: "The Linux Foundation" },
  { title: "Certified Kubernetes Application Developer", org: "The Linux Foundation" },
  { title: "Deep Learning Specialization", org: "Coursera" },
  { title: "Google Cloud Fundamentals: Core Infrastructure", org: "Coursera" },
];

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  stack?: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Enterprise SaaS Company",
    role: "Senior Software Engineer",
    period: "Aug 2022 — Present",
    location: "Thailand · name withheld",
    bullets: [
      "Building backend services in Go.",
      "Managing GCP services with Terragrunt and Terraform.",
      "Designing and running Jenkins build/deploy pipelines.",
      "Setting up monitoring dashboards for app status and resource usage.",
    ],
    stack: ["Go", "GCP", "Terraform", "Jenkins"],
  },
  {
    company: "TheGang Technology",
    role: "Senior Backend Developer",
    period: "May 2020 — Jul 2022",
    location: "Thailand",
    bullets: [
      "Built web application backends in Go and Python.",
      "Maintained and optimized GitLab CI pipelines and Kubernetes deployments.",
      "Led a Central Chatbot platform for clients using Dialogflow + Python.",
      "Led the dev team, ran weekly sprint reviews, owned feasibility studies.",
    ],
    stack: ["Go", "Python", "Kubernetes", "GitLab CI", "Dialogflow"],
  },
  {
    company: "AXA Thailand",
    role: "Frontend Developer",
    period: "Jul 2021 — Dec 2021",
    location: "Thailand",
    bullets: [
      "Shipped a React web app with real-time location tracking.",
      "Managed the dev team and kept stakeholders updated.",
    ],
    stack: ["React"],
  },
  {
    company: "Diamond Building Products",
    role: "Web Developer",
    period: "Jun 2021 — Aug 2021",
    location: "dbp.co.th",
    bullets: ["Implemented the company web app in Vue.js."],
    stack: ["Vue"],
  },
  {
    company: "CMKL University",
    role: "Software Developer",
    period: "Sep 2018 — May 2019",
    location: "Thailand",
    bullets: [
      "Assisted Dr. Sunsern Cheamanunkul on a data forensic system.",
      "Built the forensic engine in Python with SleuthKit.",
      "Owned DSL implementation and earlier front-end work.",
    ],
    stack: ["Python", "SleuthKit"],
  },
];

export type Project = {
  title: string;
  stack: string[];
  url?: string;
  summary: string;
  bullets: string[];
};

export const projects: Project[] = [
  {
    title: "Apigee API Gateway — Implementation & Load Testing",
    stack: ["Apigee", "GCP", "k6", "Jenkins"],
    summary: "Production API gateway rollout with capacity validation.",
    bullets: [
      "Designed and deployed Apigee proxy/target configurations (auth, rate-limit, traffic shaping).",
      "Built k6 load-test scenarios to validate RPS and latency budgets before go-live.",
      "Reported capacity ceilings and tuned policies to clear them.",
    ],
  },
  {
    title: "On-prem Kubernetes for Public Health Sector",
    stack: ["Kubernetes", "Ansible", "Linux", "On-prem networking"],
    summary: "Air-gapped K8s cluster for a national public-health initiative.",
    bullets: [
      "Bootstrapped and hardened a production K8s cluster on bare-metal in a restricted-network environment.",
      "Wrote Ansible playbooks for repeatable setup and disaster recovery.",
      "Documented runbooks and trained the in-house team to own it post-handoff.",
    ],
  },
  {
    title: "Security Audits & Compliance Hardening",
    stack: ["OWASP Top 10", "Pentesting", "SOC 2", "ISO 27001", "PDPA", "IAM"],
    summary: "Application + infra security reviews with prioritized remediation.",
    bullets: [
      "Conducted application and infrastructure pentests covering OWASP Top 10, IAM, and network exposure.",
      "Gap analysis and remediation plans for SOC 2 / ISO 27001 / PDPA readiness.",
      "Translated findings into engineering tickets ranked by exploitability and business risk — not by CVSS alone.",
    ],
  },
  {
    title: "MCP Servers & AI Agent Gateway",
    stack: ["MCP", "Python", "OpenAI / Anthropic APIs", "Envoy", "Redis"],
    summary: "Production LLM traffic in front of internal tooling and third-party models.",
    bullets: [
      "Built Model Context Protocol servers wrapping internal APIs so LLM agents can call them safely.",
      "Deployed a gateway in front of OpenAI / Anthropic / self-hosted models — central auth, per-team budget caps, prompt+response logging.",
      "Wired LLM-specific observability: token spend by product, tail-latency alerts, prompt-injection detection.",
    ],
  },
  {
    title: "Full Observability Stack — Metrics, Logs, Traces, Profiles",
    stack: ["Prometheus", "DataDog", "ELK", "Loki", "OpenSearch", "Tempo", "Pyroscope", "Grafana"],
    summary: "End-to-end o11y for a multi-service production environment.",
    bullets: [
      "Prometheus and DataDog with custom exporters and scrape configs for non-instrumented systems.",
      "Loki for hot operational logs, ELK/OpenSearch for long-term retention and ad-hoc search.",
      "Distributed tracing for cross-service latency and continuous profiling for CPU/memory hotspots.",
      "Grafana dashboards and alerting rules tuned to SLOs — not to noise.",
    ],
  },
  {
    title: "Smart Home Controller Model",
    stack: ["Spring Boot", "ReactJS", "Docker", "Arduino"],
    url: "https://github.com/hackinteach/layzliving",
    summary: "MQTT-controlled smart home over a web UI.",
    bullets: [
      "Built a model house controllable via the web on MQTT.",
      "Containerized with Docker and a CI/CD flow.",
    ],
  },
  {
    title: "Noise Reduction with Fourier Transform",
    stack: ["Python", "SciPy"],
    url: "https://github.com/hackinteach/nosie-reduction-ft",
    summary: "Removed fixed-pattern noise via frequency-domain filtering.",
    bullets: [
      "Reduced fixed-pattern noise with FFT.",
      "Built in Python with SciPy for the domain transforms.",
    ],
  },
  {
    title: "Real-time Makeup Scheduler",
    stack: ["Firebase", "VueJS"],
    url: "https://github.com/hackinteach/makeup-scheduler",
    summary: "Realtime class make-up scheduling tool.",
    bullets: [
      "Realtime DB via Google Cloud Functions + Firestore.",
      "Vue.js front-end with live state.",
    ],
  },
  {
    title: "Simple Object Storage",
    stack: ["Golang", "Docker", "MongoDB"],
    url: "https://github.com/hackinteach/simplestorage",
    summary: "S3-style object store with a clean REST surface.",
    bullets: [
      "Implemented an S3-like service with RESTful APIs.",
      "Built in Go, shipped via Docker.",
    ],
  },
  {
    title: "PDF2TEXT Microservice",
    stack: ["Scala", "Python", "Kubernetes", "VueJS", "MongoDB"],
    url: "https://bitbucket.org/muicpanteparak/p2-submodule/src/master/",
    summary: "Parallel PDF-to-text microservice on Kubernetes.",
    bullets: [
      "Microservice converting PDFs to text in parallel.",
      "Made it scale-out friendly on Kubernetes.",
    ],
  },
  {
    title: "Bare Metal Kubernetes Clusters",
    stack: ["Ansible", "Kubernetes", "Bash"],
    summary: "Six clusters, one playbook.",
    bullets: [
      "Manually set up six K8s clusters end-to-end.",
      "Used Ansible to drive all of them at once.",
    ],
  },
  {
    title: "Pokemon & Face GANs",
    stack: ["Python", "TensorFlow", "Colab"],
    summary: "GAN experiments for the Deep Learning final project.",
    bullets: [
      "Trained GANs to generate Pokémon and faces.",
      "Hit vanishing gradients past 50k steps — honest learnings here.",
    ],
  },
];

export type Competition = {
  title: string;
  role: string;
  date: string;
  host: string;
  bullets: string[];
  highlight?: string;
};

export const competitions: Competition[] = [
  {
    title: "Second Runner Up — LINE HACK 2019",
    role: "Full Stack Developer",
    date: "Sep 2019",
    host: "LINE",
    highlight: "🥉 2nd Runner Up",
    bullets: [
      "Built Sis — a chatbot assistant for menstrual cycle tracking.",
      "Integrated LINE Messaging API with GCP.",
      "Owned the serverless infra.",
    ],
  },
  {
    title: "First Runner Up — 'Hack Your Tech' Hackathon",
    role: "Backend Developer",
    date: "Aug 2018",
    host: "Faculty of ICT",
    highlight: "🥈 1st Runner Up",
    bullets: [
      "Built an app encouraging elderly users to adopt fintech.",
    ],
  },
  {
    title: "Data Science Hackathon 2018",
    role: "Data Analyst",
    date: "Dec 2018",
    host: "RISE Accelerator",
    bullets: [
      "Analyzed and built a support system for oil drilling operations.",
    ],
  },
  {
    title: "Digital Platform Economy Hackathon",
    role: "Backend Developer",
    date: "Mar 2018",
    host: "Faculty of ICT",
    bullets: [
      "Shipped an on-shelf app on the 'Digital Platform Economy' theme.",
    ],
  },
];

export const education = {
  school: "Mahidol University International College",
  degree: "B.Sc. — Computer Science, Minor in Applied Mathematics & Physics",
  period: "May 2016 — May 2020",
  honors: "Second-class Honors · Ajinomoto Talent Scholarship",
  coursework: [
    "Machine Learning & Deep Learning",
    "Data Warehouse & Data Mining",
    "Rapid Software Development",
    "Blockchain Technology",
    "Back-end Techniques",
    "Internet of Things",
  ],
};
