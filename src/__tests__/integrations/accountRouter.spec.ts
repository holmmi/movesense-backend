import 'jest'
import { StartedTestContainer } from 'testcontainers'
import { getDatabaseContainer } from '../utils/databaseContainerUtil'
import request from 'supertest'
import { FullAccountDetails } from '../../models/accountModel'

jest.mock('firebase-admin', () => {
  return {
    auth: jest.fn().mockReturnThis(),
    createCustomToken: jest.fn().mockReturnValue('ABCD'),
    verifyIdToken: jest.fn().mockReturnValue({ uid: '1' }),
  }
})

describe('Account router tests', () => {
  let container: StartedTestContainer

  beforeAll(async () => {
    container = await getDatabaseContainer()

    const { addOrganization } = await import('../../models/organizationModel')
    await addOrganization({ name: 'Test A' })
  }, 30 * 1000)

  it('Account is created', async () => {
    const app = (await import('../../app')).default
    const response = await request(app)
      .post('/account/register')
      .accept('application/json')
      .send({
        username: 'john.doe',
        name: 'John Doe',
        password: 'JohnDoe12345!',
        passwordConfirmation: 'JohnDoe12345!',
        organizationId: 1,
      })

    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.statusCode).toBe(200)
    expect(response.body.msg).toBe('Account has been created.')
  })

  it('Account is not created', async () => {
    const app = (await import('../../app')).default
    const response = await request(app)
      .post('/account/register')
      .accept('application/json')
      .send({})

    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.statusCode).toBe(400)
    expect(response.body).toBeDefined()
  })

  it('Login succeeds', async () => {
    const app = (await import('../../app')).default
    const response = await request(app)
      .post('/account/login')
      .accept('application/json')
      .send({ username: 'john.doe', password: 'JohnDoe12345!' })

    expect(response.header['content-type']).toMatch(/json/)
    expect(response.statusCode).toBe(200)
    expect(response.body.token).toBe('ABCD')
  })

  it('Login does not succeed', async () => {
    const app = (await import('../../app')).default
    const response = await request(app)
      .post('/account/login')
      .accept('application/json')
      .send({ username: 'john.doe', password: 'JohnDoe12345' })

    expect(response.statusCode).toBe(401)
  })

  it('User details are obtained', async () => {
    const app = (await import('../../app')).default
    const response = await request(app)
      .get('/account/details')
      .set('Authorization', 'Bearer ' + '123456789')
      .accept('application/json')

    expect(response.header['content-type']).toMatch(/json/)
    expect(response.statusCode).toBe(200)

    const details = response.body as FullAccountDetails
    expect(details).toBeDefined()
    expect(details.id).toBe(1)
    expect(details.name).toBe('John Doe')
    expect(details.organization_name).toBe('Test A')
    expect(details.username).toBe('john.doe')
    expect(details.password).toBeUndefined()
    expect(details.organization_id).toBe(1)
  })

  afterAll(async () => {
    await container.stop()
  })
})
