import type { IconType } from 'react-icons'
import { FaCodeBranch, FaDatabase, FaLinux, FaServer } from 'react-icons/fa'
import { FaArrowsRotate, FaCloud, FaHardDrive, FaShieldHalved } from 'react-icons/fa6'
import {
  SiAngular,
  SiDocker,
  SiDotnet,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiRaspberrypi,
  SiReact,
} from 'react-icons/si'

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
}

export function getTechIcon(label: string): IconType {
  const normalized = label.trim().toLowerCase()

  return (
    iconMap[normalized] ??
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
