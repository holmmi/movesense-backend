import 'jest'
import { StartedTestContainer } from 'testcontainers'
import { getDatabaseContainer } from '../utils/databaseContainerUtil'

describe('Account model tests', () => {
  let container: StartedTestContainer

  beforeAll(async () => {
    container = await getDatabaseContainer()
  }, 30 * 1000)

  it('Account is added', async () => {
    const { getAccount, addAccount } = await import('../../models/accountModel')
    const { addOrganization } = await import('../../models/organizationModel')

    await addOrganization({
      name: 'Test organization',
    })

    await addAccount({
      name: 'John Doe',
      username: 'john.doe',
      password: 'JohnDoe!?123',
      organization_id: 1,
    })

    const account = await getAccount('john.doe')

    expect(account).not.toBeNull()
    expect(account?.id).toBe(1)
    expect(account?.name).toBe('John Doe')
    expect(account?.username).toBe('john.doe')
    expect(account?.organization_id).toBe(1)
  })

  it('Account is found by identifier', async () => {
    const { getAccountById } = await import('../../models/accountModel')

    const account = await getAccountById(1)

    expect(account).not.toBeNull()
    expect(account?.id).toBe(1)
    expect(account?.name).toBe('John Doe')
    expect(account?.username).toBe('john.doe')
    expect(account?.organization_id).toBe(1)
    expect(account?.organization_name).toBe('Test organization')
  })

  afterAll(async () => {
    await container.stop()
  })
})
