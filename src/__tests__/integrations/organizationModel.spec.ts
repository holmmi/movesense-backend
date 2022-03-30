import 'jest'
import { Pool } from 'pg'
import { StartedTestContainer } from 'testcontainers'
import { getTestPool } from '../../database/pool'
import { OrganizationModel } from '../../models/organizationModel'
import { getDatabaseContainer } from '../utils/databaseContainerUtil'

describe('Organization model tests', () => {
  let container: StartedTestContainer
  let testPool: Pool

  beforeAll(async () => {
    container = await getDatabaseContainer()
    testPool = getTestPool(container.getHost(), container.getMappedPort(5432))
  }, 30 * 1000)

  it('Organizations are added', async () => {
    const organizationModel = new OrganizationModel(testPool)
    await organizationModel.addOrganization({ name: 'Test A' })
    await organizationModel.addOrganization({ name: 'Test B' })

    const organizations = await organizationModel.getOrganizations()

    expect(organizations.length).toBe(2)
    expect(organizations[0].id).toBe(1)
    expect(organizations[0].name).toBe('Test A')
    expect(organizations[1].id).toBe(2)
    expect(organizations[1].name).toBe('Test B')
  })

  afterAll(async () => {
    await testPool.end()
    await container.stop()
  })
})
