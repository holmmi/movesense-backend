import { Pool } from 'pg'

const pool = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  database: process.env.DATABASE_NAME,
})

pool.on('error', (err) => {
  console.error('Postgres connection error: ', err)
})

export default pool
