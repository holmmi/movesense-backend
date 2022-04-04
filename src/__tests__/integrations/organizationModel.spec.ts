import 'jest'
import { StartedTestContainer } from 'testcontainers'
import { getDatabaseContainer } from '../utils/databaseContainerUtil'

describe('Organization model tests', () => {
  let container: StartedTestContainer

  beforeAll(async () => {
    container = await getDatabaseContainer()
  }, 30 * 1000)

  it('Organizations are added', async () => {
    const { addOrganization, getOrganizations } = await import(
      '../../models/organizationModel'
    )

    await addOrganization({ name: 'Test A' })
    await addOrganization({ name: 'Test B' })

    const organizations = await getOrganizations()

    expect(organizations.length).toBe(2)
    expect(organizations[0].id).toBe(1)
    expect(organizations[0].name).toBe('Test A')
    expect(organizations[1].id).toBe(2)
    expect(organizations[1].name).toBe('Test B')
  })

  afterAll(async () => {
    await container.stop()
  })
})
