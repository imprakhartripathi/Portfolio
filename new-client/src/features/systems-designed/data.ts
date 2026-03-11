import type { SystemCaseStudy } from './types'

export const systemsDesignedCases: SystemCaseStudy[] = [
  {
    id: "pharmetrix",
    name: "Pharmetrix",
    period: "Sept 2025 - Present",
    icon: "/projects/pharmetrix.png",
    bgcolor: null,
    shortSummary:
      "Smart pharmaceutical inventory and POS platform with edge-cloud synchronization.",
    domain:
      "Pharmaceutical inventory, cold-chain monitoring, edge-cloud POS systems",
    problem:
      "Batch-wise medicine tracking, expiry-first dispensing (FEFO), and stable operation under intermittent connectivity.",
    architectureDecisions: [
      "Batch-level stock modeling",
      "Expiry-first stock rule engine",
      "Dual-mode POS (quick/proper)",
      "Edge-cloud synchronization model",
      "Raspberry Pi integration",
      "Dockerized backend services",
    ],
    techStack: [
      "Node.js",
      "Express",
      "MongoDB",
      "React",
      "Raspberry Pi",
      "Docker",
    ],
    skillTags: [
      "FEFO",
      "Cold-chain logic",
      "Offline-first flow",
      "System-aware backend services",
    ],
    outcome: "Actively building production-ready architecture (Repository is private due to ongoing development of proprietary features).",
    // githubUrl: "https://github.com/imprakhartripathi/Pharmetrix",
    liveUrl: "https://pharmetrix.imprakhartripathi.in",
  },
  {
    id: "spendly",
    name: "Spendly",
    period: "May 2024 - Jul 2024",
    icon: "/projects/spendly.png",
    bgcolor: "#FFFFFF",
    shortSummary:
      "Financial tracking backend with access controls and transactional safety.",
    domain: "Personal finance tracking",
    problem:
      "Manual logging inefficiency and weak role boundaries across finance records.",
    architectureDecisions: [
      "RBAC across 3 tiers",
      "Transactional schema modeling",
      "JWT-protected APIs",
      "Dockerized deployment",
    ],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Docker"],
    skillTags: ["RBAC", "JWT", "Transactional integrity"],
    outcome: "Reduced manual logging by ~80%",
    githubUrl: "https://github.com/imprakhartripathi/Spendly",
    liveUrl: "https://ispendly.netlify.app",
  },
  {
    id: "sahyogi",
    name: "Sahyogi",
    period: "Jan 2024 - Apr 2024",
    icon: "/projects/sahyogi.png",
    bgcolor: "#FFFFFF",
    shortSummary:
      "AI-assisted collaborative task management with role-aware prioritization.",
    domain: "Collaborative task management",
    problem:
      "Poor task prioritization in shared environments with role-specific responsibilities.",
    architectureDecisions: [
      "JWT-based auth context",
      "Priority scoring engine",
      "Role-based access boundaries",
    ],
    techStack: ["Angular", "Node.js", "Express", "MongoDB"],
    skillTags: ["Priority modeling", "Auth context", "Role-based workflow"],
    outcome: "~30% prioritization improvement in testing",
    githubUrl: "https://github.com/imprakhartripathi/Sahyogi",
    liveUrl: "https://imsahyogi.netlify.app",
  },
  {
    id: "riwayat",
    name: "Riwayat",
    period: "Sept 2024 - Dec 2024",
    icon: "/projects/riwayat.png",
    bgcolor: null,
    shortSummary:
      "Frontend-driven event planning application exploring structured event workflows and Razorpay payment integration.",
    domain: "Event planning & booking workflows",
    problem:
      "Planning events often involves scattered coordination across vendors, payments, and scheduling. Riwayat explored how a structured UI workflow could simplify event organization.",
    architectureDecisions: [
      "Angular-based single-page application for structured workflow interfaces",
      "Lightweight Express layer for basic API simulation",
      "Razorpay integration for payment flow experimentation",
    ],
    techStack: ["Angular", "Express.js", "Razorpay"],
    skillTags: [
      "Frontend architecture",
      "Workflow modeling",
      "Payment integration",
    ],
    outcome:
      "Prototype demonstrating structured event planning flows with integrated payment experience.",
    githubUrl: "https://github.com/imprakhartripathi/Riwayat",
  },
];
