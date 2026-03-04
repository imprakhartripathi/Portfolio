import {
  FaCloud,
  FaCodeBranch,
  FaDatabase,
  FaMobileAlt,
  FaSatelliteDish,
  FaUserShield,
} from "react-icons/fa";
import {
  FaArrowsRotate,
  FaBolt,
  FaBoxesStacked,
  FaCubesStacked,
  FaHardDrive,
  FaLayerGroup,
} from "react-icons/fa6";
import {
  SiAngular,
  SiDeno,
  SiDocker,
  SiDotnet,
  SiExpress,
  SiGithubactions,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOpenapiinitiative,
  SiPostgresql,
  SiPython,
  SiRaspberrypi,
  SiReact,
  SiRust,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { TbSql } from "react-icons/tb";

import type { CapabilityMatrixItem } from "./types";

export const capabilityMatrixRows: CapabilityMatrixItem[] = [
  // ==============================
  // PROGRAMMING LANGUAGES
  // ==============================
  { id: "javascript", label: "JavaScript", icon: SiJavascript },
  { id: "typescript", label: "TypeScript", icon: SiTypescript },
  { id: "python", label: "Python", icon: SiPython },
  { id: "rust", label: "Rust", icon: SiRust },
  { id: "sql", label: "SQL", icon: TbSql },

  // ==============================
  // FRAMEWORKS & RUNTIMES
  // ==============================
  { id: "nodejs", label: "Node.js", icon: SiNodedotjs },
  { id: "express", label: "Express.js", icon: SiExpress },
  { id: "aspnet", label: "ASP.NET Core", icon: SiDotnet },
  { id: "deno", label: "Deno", icon: SiDeno },
  { id: "react", label: "React", icon: SiReact },
  { id: "angular", label: "Angular", icon: SiAngular },
  { id: "nextjs", label: "Next.js", icon: SiNextdotjs },

  // ==============================
  // COMPUTER SCIENCE CORE
  // ==============================
  { id: "dsa", label: "Data Structures & Algorithms", icon: FaBolt },
  { id: "oop", label: "Object-Oriented Programming", icon: FaBoxesStacked },

  // ==============================
  // BACKEND ARCHITECTURE & SECURITY
  // ==============================
  { id: "rest", label: "REST Architecture", icon: SiOpenapiinitiative },
  { id: "jwt", label: "JWT Authentication", icon: FaUserShield },
  { id: "rbac", label: "RBAC Policy Systems", icon: FaLayerGroup },

  // ==============================
  // FRONTEND ARCHITECTURE
  // ==============================
  { id: "responsive-ui", label: "Responsive UI Design", icon: FaMobileAlt },
  { id: "state-driven-ui", label: "State-driven UI", icon: FaCubesStacked },

  // ==============================
  // DATABASE SYSTEMS
  // ==============================
  { id: "mongodb", label: "MongoDB", icon: SiMongodb },
  { id: "postgresql", label: "PostgreSQL", icon: SiPostgresql },
  { id: "mysql", label: "MySQL", icon: SiMysql },
  { id: "databases", label: "Database Systems", icon: FaDatabase },

  // ==============================
  // INFRASTRUCTURE & DEVOPS
  // ==============================
  { id: "docker", label: "Docker", icon: SiDocker },
  { id: "nginx", label: "Nginx", icon: SiNginx },
  { id: "linux", label: "Linux", icon: SiLinux },
  { id: "github-actions", label: "GitHub Actions", icon: SiGithubactions },
  { id: "netlify", label: "Netlify", icon: SiNetlify },
  { id: "vercel", label: "Vercel", icon: SiVercel },

  // ==============================
  // SYSTEM DESIGN (LONG LABELS → LOWER)
  // ==============================
  {
    id: "transactional",
    label: "Transactional Service Design",
    icon: FaCodeBranch,
  },
  {
    id: "sync-models",
    label: "System-aware Backend Services",
    icon: FaArrowsRotate,
  },

  // ==============================
  // EDGE / IoT (LONGEST → BOTTOM)
  // ==============================
  { id: "raspberry-pi", label: "Raspberry Pi", icon: SiRaspberrypi },
  {
    id: "edge-sync",
    label: "Edge-first synchronization",
    icon: FaSatelliteDish,
  },
  {
    id: "offline-queue",
    label: "Offline queueing patterns",
    icon: FaHardDrive,
  },
  { id: "cloud-sync", label: "Cloud sync architecture", icon: FaCloud },
];