import 'jest'
import app from '../../app'
import request from 'supertest'

describe('/test route', () => {
  it('hello returns 200 and a message', async () => {
    const response = await request(app)
      .get('/test/hello')
      .set('Accept', 'application/json')
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.status).toEqual(200)
    expect(response.body.message).toEqual('Hello World!')
  })
})
