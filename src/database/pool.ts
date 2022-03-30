import { Pool } from 'pg'

const getDefaultPool = (): Pool => {
  return new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    database: process.env.DATABASE_NAME,
  })
}

const getTestPool = (host: string, port: number): Pool => {
  return new Pool({
    user: 'test',
    password: 'test',
    host: host,
    port: port,
    database: 'test',
  })
}

export { getDefaultPool, getTestPool }
