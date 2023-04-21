import supertest from 'supertest'
import app from '../app'

describe('status endpoint get', () => {
  test('get aum returns 200 and status', async () => {
    const result = await supertest(app).get('/')
    expect(result.statusCode).toEqual(200)
    expect(result.body.name).toBeTruthy()
  })

  test('404 & json returned from nonexistent route', async () => {
    const result = await supertest(app).get('/badPath')
    expect(result.statusCode).toEqual(404)
  })
})
