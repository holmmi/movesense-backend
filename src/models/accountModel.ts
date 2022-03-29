import pool from '../database/pool'
import { OrganizationDetails } from './organizationModel'
import bcrypt from 'bcrypt'

interface AccountDetails {
  id?: number
  username: string
  password: string
  name: string
  organizationId: number
}

type FullAccountDetails = AccountDetails & OrganizationDetails

interface LoginDetails {
  username: string
  password: string
}

const addAccount = async (account: AccountDetails) => {
  const password = await bcrypt.hash(account.password, 10)
  await pool.query(
    'INSERT INTO account (username, password, name, organization_id) VALUES ($1, $2, $3, $4)',
    [account.username, password, account.name, account.organizationId]
  )
}

const getAccount = async (
  loginDetails: LoginDetails
): Promise<AccountDetails | null> => {
  const { rows } = await pool.query(
    'SELECT * FROM account WHERE username = $1',
    [loginDetails.username, loginDetails.password]
  )
  return rows[0] as AccountDetails
}

const getAccountById = async (id: number): Promise<FullAccountDetails> => {
  const { rows } = await pool.query(
    'SELECT a.*, o.* FROM account a LEFT JOIN organization o ON o.id = a.organization_id WHERE a.id = $1',
    [id]
  )
  return rows[0] as FullAccountDetails
}
