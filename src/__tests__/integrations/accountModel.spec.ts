import 'jest'
import { Pool } from 'pg'
import { StartedTestContainer } from 'testcontainers'
import { getTestPool } from '../../database/pool'
import { AccountModel } from '../../models/accountModel'
import { OrganizationModel } from '../../models/organizationModel'
import { getDatabaseContainer } from '../utils/databaseContainerUtil'

describe('Account model tests', () => {
  let container: StartedTestContainer
  let testPool: Pool

  beforeAll(async () => {
    container = await getDatabaseContainer()
    testPool = getTestPool(container.getHost(), container.getMappedPort(5432))
  }, 30 * 1000)

  it('Account is added', async () => {
    const organizationModel = new OrganizationModel(testPool)
    await organizationModel.addOrganization({
      name: 'Test organization',
    })

    const accoutModel = new AccountModel(testPool)
    await accoutModel.addAccount({
      name: 'John Doe',
      username: 'john.doe',
      password: 'JohnDoe!?123',
      organization_id: 1,
    })

    const account = await accoutModel.getAccount({ username: 'john.doe' })

    expect(account).not.toBeNull()
    expect(account?.id).toBe(1)
    expect(account?.name).toBe('John Doe')
    expect(account?.username).toBe('john.doe')
    expect(account?.organization_id).toBe(1)
  })

  it('Account is found by identifier', async () => {
    const accountModel = new AccountModel(testPool)
    const account = await accountModel.getAccountById(1)

    expect(account).not.toBeNull()
    expect(account?.id).toBe(1)
    expect(account?.name).toBe('John Doe')
    expect(account?.username).toBe('john.doe')
    expect(account?.organization_id).toBe(1)
    expect(account.organization_name).toBe('Test organization')
  })

  afterAll(async () => {
    await testPool.end()
    await container.stop()
  })
})
