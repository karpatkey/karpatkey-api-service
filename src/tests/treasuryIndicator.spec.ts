import supertest from 'supertest'
import app from '../app'

describe('treasury indicator value endpoint get', () => {
  test('get treasury indicator value returns 200 and data', async () => {
    const result = await supertest(app).get('/treasury_indicator')
    expect(result.statusCode).toEqual(200)
    expect(result.body.value).toBeTruthy()
  })
})
