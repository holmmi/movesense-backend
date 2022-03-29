import { Pool, PoolConfig } from 'pg'

const poolConfig: PoolConfig = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  database: process.env.DATABASE_NAME,
}
const pool = new Pool(poolConfig)

export default pool
