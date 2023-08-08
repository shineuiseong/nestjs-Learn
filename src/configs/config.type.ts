export type AppConfig = {
  nodeEnv: string
  appName: string
  workingDir: string
  frontDomain: string
  backDomain: string
  port: number
  apiPrefix: string
  language: string
}

export type DatabaseConfig = {
  url?: string
  type?: string
  host?: string
  port?: number
  password?: string
  name?: string
  username?: string
  synchronize?: boolean
  maxConnections: number
}

export type AllConfigType = {
  app: AppConfig
  database: DatabaseConfig
}
