import { OrganizationDetails } from './organizationModel'
import bcrypt from 'bcrypt'
import { Pool } from 'pg'
import { getDefaultPool } from '../database/pool'

interface AccountDetails {
  id?: number
  username: string
  password: string
  name: string
  organization_id: number
}

interface FullAccountDetails extends AccountDetails {
  organization_name?: string
}

interface LoginDetails {
  username: string
}

class AccountModel {
  private pool: Pool

  constructor(pool: Pool = getDefaultPool()) {
    this.pool = pool
  }

  async addAccount(account: AccountDetails) {
    const password = await bcrypt.hash(account.password, 10)
    await this.pool.query(
      'INSERT INTO account (username, password, name, organization_id) VALUES ($1, $2, $3, $4)',
      [account.username, password, account.name, account.organization_id]
    )
  }

  async getAccount(loginDetails: LoginDetails): Promise<AccountDetails | null> {
    const { rows } = await this.pool.query(
      'SELECT * FROM account WHERE username = $1',
      [loginDetails.username]
    )
    return rows[0] as AccountDetails
  }

  async getAccountById(id: number): Promise<FullAccountDetails> {
    const { rows } = await this.pool.query(
      'SELECT a.*, o.name as organization_name FROM account a LEFT JOIN organization o ON o.id = a.organization_id WHERE a.id = $1',
      [id]
    )
    return rows[0] as FullAccountDetails
  }
}

export { AccountModel }
