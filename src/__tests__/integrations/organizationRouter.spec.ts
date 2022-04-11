import 'jest'
import { StartedTestContainer } from 'testcontainers'
import { OrganizationDetails } from '../../models/organizationModel'
import { getDatabaseContainer } from '../utils/databaseContainerUtil'
import request from 'supertest'

describe('Organization router tests', () => {
  let container: StartedTestContainer

  beforeAll(async () => {
    container = await getDatabaseContainer()

    const { addOrganization } = await import('../../models/organizationModel')
    await addOrganization({ name: 'Test A' })
    await addOrganization({ name: 'Test B' })
  }, 30 * 1000)

  it('Organizations are returned', async () => {
    const app = (await import('../../app')).default
    const response = await request(app)
      .get('/organization/details')
      .accept('application/json')

    expect(response.statusCode).toBe(200)
    expect(response.header['content-type']).toMatch(/json/)

    const organizations = response.body as OrganizationDetails[]
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
