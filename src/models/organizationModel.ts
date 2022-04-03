import pool from '../database/pool'

interface OrganizationDetails {
  id?: number
  name?: string
}

const addOrganization = async (organizationDetails: OrganizationDetails) => {
  await pool.query('INSERT INTO organization (name) VALUES ($1)', [
    organizationDetails.name,
  ])
}

const getOrganizations = async (): Promise<OrganizationDetails[]> => {
  const { rows } = await pool.query('SELECT * FROM organization')
  return rows as OrganizationDetails[]
}

export { addOrganization, getOrganizations }
