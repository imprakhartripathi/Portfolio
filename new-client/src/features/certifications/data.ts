import type { CertificationRecord } from './types'

function courseraVerifyUrl(credentialId: string) {
  return `https://www.coursera.org/account/accomplishments/verify/${credentialId}`
}

function certPdfPath(pdfFileName?: string) {
  if (!pdfFileName) {
    return undefined
  }

  return `/certifications/${pdfFileName}`
}

export const certifications: CertificationRecord[] = [
  {
    id: "google-ai-professional-certificate",
    slug: "google-ai-professional-certificate",
    title: "Google AI Professional Certificate",
    provider: "Google",
    issued: "Mar 2026",
    credentialId: "A202SHDGUL8F",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/professional-cert/certificate/A202SHDGUL8F",
    pdfFileName: "Google-AI-Professional-Certificate-PrakharTripathi.pdf",
    skills: ["Generative AI", "Prompt Engineering", "AI Workflow Design"],
  },
  {
    id: "google-ai-for-app-building",
    slug: "google-ai-for-app-building",
    title: "AI for App Building",
    provider: "Google",
    issued: "Mar 2026",
    credentialId: "EPBHN19KHQEH",
    credentialUrl: courseraVerifyUrl("EPBHN19KHQEH"),
    pdfFileName: "Google-AI-for-App-Building-Certification-PrakharTripathi.pdf",
    skills: ["AI App Prototyping", "Rapid MVP Development", "Prompt-to-Product Flow"],
  },
  {
    id: "google-ai-for-data-analysis",
    slug: "google-ai-for-data-analysis",
    title: "AI for Data Analysis",
    provider: "Google",
    issued: "Mar 2026",
    credentialId: "YXCFNQKK629A",
    credentialUrl: courseraVerifyUrl("YXCFNQKK629A"),
    pdfFileName:
      "Google-AI-for-Data-Analysis-Certification-PrakharTripathi.pdf",
    skills: ["Data Analysis", "AI-assisted Insights", "Structured Reporting"],
  },
  {
    id: "google-ai-for-content-creation",
    slug: "google-ai-for-content-creation",
    title: "AI for Content Creation",
    provider: "Google",
    issued: "Mar 2026",
    credentialId: "C81U33RDD965",
    credentialUrl: courseraVerifyUrl("C81U33RDD965"),
    pdfFileName:
      "Google-AI-for-Content-Creation-Certification-PrakharTripathi.pdf",
    skills: ["Content Strategy", "Generative Content Workflows", "Creative Iteration"],
  },
  {
    id: "google-ai-for-writing-and-communicating",
    slug: "google-ai-for-writing-and-communicating",
    title: "AI for Writing and Communicating",
    provider: "Google",
    issued: "Mar 2026",
    credentialId: "GPATJEX0EOYA",
    credentialUrl: courseraVerifyUrl("GPATJEX0EOYA"),
    pdfFileName:
      "Google-AI-for-Writing-and-Communicating-Certification-PrakharTripathi.pdf",
    skills: ["Professional Writing", "Communication Clarity", "AI Editing"],
  },
  {
    id: "google-ai-for-research-and-insights",
    slug: "google-ai-for-research-and-insights",
    title: "AI for Research and Insights",
    provider: "Google",
    issued: "Mar 2026",
    credentialId: "MLUB50XS94MG",
    credentialUrl: courseraVerifyUrl("MLUB50XS94MG"),
    pdfFileName:
      "Google-AI-for-Research-and-Insights-Certification-PrakharTripathi.pdf",
    skills: ["Research Synthesis", "Insight Generation", "Evidence-backed Decisions"],
  },
  {
    id: "google-ai-for-brainstorming-and-planning",
    slug: "google-ai-for-brainstorming-and-planning",
    title: "AI for Brainstorming and Planning",
    provider: "Google",
    issued: "Mar 2026",
    credentialId: "X7CK9YIYTLUH",
    credentialUrl: courseraVerifyUrl("X7CK9YIYTLUH"),
    pdfFileName:
      "Google-AI-for-Brainstorming-and-Planning-Certification-PrakharTripathi.pdf",
    skills: ["Ideation", "Planning Frameworks", "AI-assisted Roadmapping"],
  },
  {
    id: "google-ai-fundamentals",
    slug: "google-ai-fundamentals",
    title: "AI Fundamentals",
    provider: "Google",
    issued: "Mar 2026",
    credentialId: "YJSB9G2421JI",
    credentialUrl: courseraVerifyUrl("YJSB9G2421JI"),
    pdfFileName: "Google-AI-Fundamentals-Certification-PrakharTripathi.pdf",
    skills: ["AI Fundamentals", "Responsible AI", "Prompt Basics"],
  },
  {
    id: "datacamp-introduction-to-r",
    slug: "introduction-to-r",
    title: "Introduction to R",
    provider: "DataCamp",
    issued: "Nov 2024",
    credentialUrl:
      "https://www.datacamp.com/completed/statement-of-accomplishment/course/ed23aa40c631969aaccdcd22b7cea8e33d678641",
    skills: ["R", "Data Wrangling", "Statistical Thinking"],
  },
  {
    id: "six-sigma-white-belt",
    slug: "six-sigma-white-belt-certification",
    title: "Six Sigma White Belt Certification",
    provider: "Six Sigma Certification Online in India",
    issued: "Apr 2025",
    credentialId: "djQxNDkxNy0yOTg",
    skills: ["Six Sigma", "Process Improvement", "Agile Methodologies"],
  },
  {
    id: "great-learning-software-testing",
    slug: "software-testing",
    title: "Software Testing",
    provider: "Great Learning",
    issued: "Nov 2024",
    credentialId: "BETOFEXH",
    credentialUrl: "https://www.mygreatlearning.com/certificate/BETOFEXH",
    skills: ["Software Testing", "Quality Assurance", "Test Planning"],
  },
];

export function getCertificationPdfPath(certification: CertificationRecord) {
  return certPdfPath(certification.pdfFileName)
}

export function getCertificationBySlug(slug: string) {
  return certifications.find((certification) => certification.slug === slug) ?? null
}
