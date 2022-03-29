import pool from '../database/pool'

interface OrganizationDetails {
  id?: number
  name?: string
}

const getOrganizations = async (): Promise<OrganizationDetails[]> => {
  const { rows } = await pool.query('SELECT * FROM organization')
  return rows as OrganizationDetails[]
}

export { OrganizationDetails, getOrganizations }
