import supertest from 'supertest'
import app from '../app'

describe('aum endpoint get', () => {
    test('get aum returns 200 and data', async () => {
        const result = await supertest(app).get('/aum')
        expect(result.statusCode).toEqual(200)
        expect(result.body.value).toBeTruthy()
    })
})
