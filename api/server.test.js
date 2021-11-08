const server = require("./server.js")
const db = require('../data/dbConfig')
const Users = require('./users/users-model')
const supertest = require("supertest")

beforeAll(async ()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async ()=>{
    await db('users').truncate()
})
afterAll(async ()=>{
    await db.destroy()
})
it('correct env var', ()=>{
    expect(process.env.NODE_ENV).toBe("testing")
})
test('sanity', () => {
    expect(true).toBe(true)
  })

describe('newUser tests', () => {
    it('adds newUser to the db when registering', async ()=>{
        const res = await supertest(server).post("/api/auth/register").send({ username: 'newUser', password: 'newPassword' })
      expect(res.statusCode).toBe(201)
    })

    it("checks that the username is unique before registering", async () => {
        const res = await supertest(server).post("/api/auth/register").send({ username: 'uniqueUsername', password: 'password' })
        expect(res.statusCode).toBe(201)
        expect(res.body.id).toBe(1)
        expect(res.body.username).toBe("uniqueUsername")
    
        //registering user again
        const res2 = await supertest(server).post("/api/auth/register").send({ username: 'uniqueUsername', password: 'password' })
        expect(res2.statusCode).toBe(400)
        expect(res2.body.message).toBe("Username is already taken. Please use another username.")
      })

})