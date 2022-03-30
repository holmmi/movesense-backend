import { Pool } from 'pg'
import { getDefaultPool } from '../database/pool'

interface OrganizationDetails {
  id?: number
  name?: string
}

class OrganizationModel {
  private pool: Pool

  constructor(pool: Pool = getDefaultPool()) {
    this.pool = pool
  }

  async addOrganization(organizationDetails: OrganizationDetails) {
    await this.pool.query('INSERT INTO organization (name) VALUES ($1)', [
      organizationDetails.name,
    ])
  }

  async getOrganizations(): Promise<OrganizationDetails[]> {
    const { rows } = await this.pool.query('SELECT * FROM organization')
    return rows as OrganizationDetails[]
  }
}

export { OrganizationDetails, OrganizationModel }
