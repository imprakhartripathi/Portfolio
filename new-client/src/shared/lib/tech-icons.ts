import type { IconType } from 'react-icons'
import { FaCodeBranch, FaDatabase, FaLinux, FaServer } from 'react-icons/fa'
import { FaArrowsRotate, FaCircleNodes, FaCloud, FaHardDrive, FaRobot, FaShieldHalved } from 'react-icons/fa6'
import {
  SiAngular,
  SiDocker,
  SiDotnet,
  SiExpress,
  SiFastapi,
  SiLangchain,
  SiLanggraph,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiOpenai,
  SiOpenjdk,
  SiPostgresql,
  SiPydantic,
  SiPython,
  SiRaspberrypi,
  SiReact,
  SiSpringboot,
} from 'react-icons/si'
import { TbActivity, TbDatabaseSearch, TbNetwork } from 'react-icons/tb'

const iconMap: Record<string, IconType> = {
  'node.js': SiNodedotjs,
  nodejs: SiNodedotjs,
  express: SiExpress,
  'express.js': SiExpress,
  mongodb: SiMongodb,
  mysql: SiMysql,
  react: SiReact,
  angular: SiAngular,
  'asp.net core': SiDotnet,
  docker: SiDocker,
  'raspberry pi': SiRaspberrypi,
  jwt: FaShieldHalved,
  rbac: FaServer,
  transactional: FaCodeBranch,
  'cloud sync': FaCloud,
  'offline queueing': FaHardDrive,
  synchronization: FaArrowsRotate,
  database: FaDatabase,
  linux: FaLinux,
  python: SiPython,
  fastapi: SiFastapi,
  pydantic: SiPydantic,
  langchain: SiLangchain,
  langgraph: SiLanggraph,
  langsmith: TbActivity,
  'knowledge graph': FaCircleNodes,
  'knowledge graphs': FaCircleNodes,
  'multi-agent orchestration': TbNetwork,
  'multi agent orchestration': TbNetwork,
  'agentic ai': FaRobot,
  rag: TbDatabaseSearch,
  rags: TbDatabaseSearch,
  'retrieval-augmented generation': TbDatabaseSearch,
  'retrieval-augmented generation (rag)': TbDatabaseSearch,
  'vector databases': FaDatabase,
  openai: SiOpenai,
  postgresql: SiPostgresql,
  'spring boot': SiSpringboot,
  java: SiOpenjdk,
}

export function getTechIcon(label: string): IconType {
  const normalized = label.trim().toLowerCase()

  return (
    iconMap[normalized] ??
    (normalized.includes('fastapi') ? SiFastapi : undefined) ??
    (normalized.includes('pydantic') ? SiPydantic : undefined) ??
    (normalized.includes('langgraph') ? SiLanggraph : undefined) ??
    (normalized.includes('langchain') ? SiLangchain : undefined) ??
    (normalized.includes('langsmith') ? TbActivity : undefined) ??
    (normalized.includes('python') ? SiPython : undefined) ??
    (normalized.includes('graph') ? FaCircleNodes : undefined) ??
    (normalized.includes('agent') ? TbNetwork : undefined) ??
    (normalized.includes('rag') ? TbDatabaseSearch : undefined) ??
    (normalized.includes('openai') ? SiOpenai : undefined) ??
    (normalized.includes('node') ? SiNodedotjs : undefined) ??
    (normalized.includes('express') ? SiExpress : undefined) ??
    (normalized.includes('mongo') ? SiMongodb : undefined) ??
    (normalized.includes('mysql') ? SiMysql : undefined) ??
    (normalized.includes('react') ? SiReact : undefined) ??
    (normalized.includes('angular') ? SiAngular : undefined) ??
    (normalized.includes('docker') ? SiDocker : undefined) ??
    (normalized.includes('jwt') ? FaShieldHalved : undefined) ??
    (normalized.includes('rbac') ? FaServer : undefined) ??
    (normalized.includes('sync') ? FaArrowsRotate : undefined) ??
    (normalized.includes('database') ? FaDatabase : undefined) ??
    FaServer
  )
}
