// Edit these to tune the freelance landing page. Booking URL and pricing
// hints are the two things you'll iterate on most.

export const hire = {
  bookingUrl: "https://cal.com/nuttapatk", // TODO: replace with your real Cal.com / Calendly link
  capacity: "Booking 2 engagements for Q3 2026",
};

export type Service = {
  title: string;
  tagline: string;
  bullets: string[];
  scope: string;
  timeline: string;
};

export const services: Service[] = [
  {
    title: "Kubernetes Migrations & Hardening",
    tagline: "Lift, shift, and stop fighting kubectl at 2am.",
    bullets: [
      "Production K8s cluster setup on GKE / EKS / bare metal",
      "Workload migration from VMs / Docker Compose with zero downtime",
      "RBAC, network policies, secret management, and pod security",
      "Helm charts and GitOps with Argo CD or Flux",
    ],
    scope: "Single workload or multi-cluster fleet",
    timeline: "4–8 weeks typical",
  },
  {
    title: "GCP Infrastructure with Terraform",
    tagline: "Click-Ops to declarative infra you can read in a diff.",
    bullets: [
      "Greenfield GCP project setup: IAM, networking, GKE, Cloud SQL",
      "Refactor Terraform monoliths into Terragrunt-organized modules",
      "Multi-environment promotion (dev → staging → prod) with sane state",
      "Cost audits and rightsizing on existing GCP footprints",
    ],
    scope: "Single project or multi-org landing zone",
    timeline: "3–6 weeks typical",
  },
  {
    title: "Solution & Infrastructure Architecture",
    tagline: "Designs your team can build, not just slides.",
    bullets: [
      "System design reviews for backend services (Go, Python, Node)",
      "CI/CD pipeline architecture with Jenkins, GitLab CI, GitHub Actions",
      "Observability stack: Grafana, Prometheus, structured logging",
      "Migration plans with risk, rollback, and cutover steps written down",
    ],
    scope: "Audit + written design + implementation handoff",
    timeline: "2–4 weeks audit, optional execution after",
  },
];

export const credentials = [
  { label: "Years in production", value: "5+" },
  { label: "Backend services shipped", value: "Dozens" },
  { label: "Certifications", value: "CKAD · CGOA · GCP" },
  { label: "Time zone overlap", value: "Bangkok (ICT, UTC+7)" },
];

export const trustedBy = [
  "CertuSystems",
  "TheGang Technology",
  "AXA Thailand",
  "Diamond Building Products",
  "CMKL University",
];

export type ProcessStep = {
  step: string;
  title: string;
  body: string;
};

export const process: ProcessStep[] = [
  {
    step: "01",
    title: "Free 20-min intro call",
    body: "We talk through what you're building, what's stuck, and whether I'm the right person. No deck, no pitch — just a focused conversation.",
  },
  {
    step: "02",
    title: "Paid audit & scoped plan",
    body: "Fixed-fee diagnostic (1–2 weeks). You get a written assessment, a prioritized plan with risks and effort, and a no-surprises quote for execution.",
  },
  {
    step: "03",
    title: "Execution",
    body: "I work async with your team, push code daily, demo weekly. Documented as I go so your team owns it after I leave.",
  },
  {
    step: "04",
    title: "Handoff with docs",
    body: "Runbooks, architecture diagrams, and a 30-min knowledge-transfer session. Optional retainer for ongoing support.",
  },
];

export type FAQ = { q: string; a: string };

export const faqs: FAQ[] = [
  {
    q: "How do you charge?",
    a: "Fixed-fee for the audit phase so you know the cost up front. Execution is either fixed-scope (most common) or weekly retainer for open-ended platform work. Hourly only for sub-20-hour engagements.",
  },
  {
    q: "What's a typical engagement size?",
    a: "Audits run 1–2 weeks. Execution work is usually 4–8 weeks for a single workload migration or infra rebuild. I take 2–3 concurrent clients max to stay focused.",
  },
  {
    q: "Do you work across time zones?",
    a: "Yes. I'm in Bangkok (UTC+7) and used to async work with teams in the US, EU, and APAC. I overlap 2–4 hours with US Pacific in the early morning and US Eastern late evening.",
  },
  {
    q: "What if I don't have a clear scope yet?",
    a: "That's most engagements. The audit phase exists exactly to turn 'something is wrong with our infra' into a concrete plan. We start there.",
  },
  {
    q: "Can you join my team as a fractional engineer?",
    a: "Yes — common for early-stage startups that need senior DevOps muscle without a full hire. Usually 2–3 days/week on a monthly retainer.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Standard mutual NDAs, yes. Send yours over before our intro call or use mine.",
  },
];
