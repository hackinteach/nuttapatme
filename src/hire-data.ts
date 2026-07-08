// Edit these to tune the freelance landing page. Booking URL and pricing
// hints are the two things you'll iterate on most.

export const hire = {
  bookingUrl: "https://cal.com/nuttapatk", // TODO: replace with your real Cal.com / Calendly link
  capacity: "Available for new projects",
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
      "Observability stack: DataDog, Grafana, Prometheus, ELK — SLO-driven alerts, not dashboards nobody reads",
      "AI ops: MCP servers, LLM gateways with auth + budget caps, prompt observability",
      "Migration plans with risk, rollback, and cutover steps written down",
    ],
    scope: "Audit + written design + implementation handoff",
    timeline: "2–4 weeks audit, optional execution after",
  },
];

export type AdvisoryService = {
  title: string;
  tagline: string;
  bullets: string[];
  format: string;
};

export const advisory: AdvisoryService[] = [
  {
    title: "Training & Workshops",
    tagline: "Level up your team in days, not quarters.",
    bullets: [
      "Kubernetes fundamentals through CKAD-level operations",
      "GCP + Terraform onboarding for new platform teams",
      "CI/CD pipeline design with Jenkins or GitLab CI",
      "Custom curriculum built from your real codebase, not generic slides",
    ],
    format: "On-site (Bangkok / SEA) or remote · 1–3 day workshops or longer cohorts",
  },
  {
    title: "Advisory & Consulting",
    tagline: "A senior brain on demand — no long contract required.",
    bullets: [
      "Architecture reviews and second opinions before you commit to a direction",
      "Security audits and compliance gap analysis (SOC 2 / ISO 27001 / PDPA readiness, OWASP-aligned app + infra reviews)",
      "AI ops readiness: MCP server design, LLM gateway architecture, prompt observability + cost guardrails",
      "Technical due diligence for acquisitions or vendor selection",
      "Hiring support: technical screens, take-home review, panel interviews",
      "Async advisory retainer — async messages and weekly office hours",
    ],
    format: "Hourly calls, fixed-fee audits, or monthly async retainer",
  },
];

export const credentials = [
  { label: "Years in production", value: "5+" },
  { label: "Backend services shipped", value: "Dozens" },
  { label: "Certifications", value: "CKAD · CGOA · GCP" },
  { label: "Time zone overlap", value: "Bangkok (ICT, UTC+7)" },
];

// Names redacted while I sort out approvals to publish client logos.
// Industry tags still convey breadth without disclosing specifics.
export const trustedBy = [
  "Enterprise SaaS",
  "Fortune 500 Insurance",
  "Government / Public Health",
  "Software Consultancy",
  "Industrial / Manufacturing",
  "Higher Education & Research",
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
    body: "Async-first execution outside business hours. Code lands in PRs as it's ready, plus a weekly demo and written status. Documented as I go so your team owns it after I leave.",
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
    a: "Whatever fits how you buy. Common shapes: fixed-fee for defined scope (audits, small migrations), lump sum with milestones for larger deliverables, man-days (MD) if you're used to buying engineering time in day-blocks, weekly retainer for open-ended platform work, hourly for sub-20-hour advisory. Tell me how your procurement usually works and I'll match the invoice shape — the underlying rate stays consistent.",
  },
  {
    q: "What's a typical engagement size?",
    a: "Audits run 2–3 weeks at part-time pace. Execution work is usually 6–10 weeks for a single workload migration or infra rebuild — calendar weeks, not effort weeks. I take 1–2 concurrent clients max so each one gets real focus.",
  },
  {
    q: "Do you work across time zones?",
    a: "Yes. I'm in Bangkok (UTC+7) and async-first. Weekday work happens in evenings, which is actually convenient overlap for US Pacific mornings and US Eastern late mornings. Weekend days are wide open for synchronous work or workshops.",
  },
  {
    q: "What if I don't have a clear scope yet?",
    a: "That's most engagements. The audit phase exists exactly to turn \"something is wrong with our infra\" into a concrete plan. If you'd rather not commit to a full audit up front, we can start on man-days — buy a small block (typically 3–5 MD), I diagnose and produce a written plan, and then we decide whether to convert into a fixed-scope execution or continue on MD.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Standard mutual NDAs, yes. Send yours over before our intro call or use mine.",
  },
];
