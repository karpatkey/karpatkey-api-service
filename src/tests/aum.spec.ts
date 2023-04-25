import supertest from 'supertest'
import app from '../app'
import config from '../config'

describe('aum endpoint get', () => {
  test('get aum returns 200 and data', async () => {
    console.log('config email' + config.googleCredentials.client_email)
    const result = await supertest(app).get('/aum')
    expect(result.statusCode).toEqual(200)
    expect(result.body.value).toBeTruthy()
  })
})
