const test = require('supertest');

const server = require('./server.js');
const db = require('../data/db-config.js');

describe('server', function() {
    beforeEach(async() => {
        await db('users').truncate();
        await db('tickets').truncate();
    })
    describe('post /register', function() {
        it('should return status 201', function() {
            return test(server)
                .post('/register')
                .send({
                    username: "jim",
                    password: "gotham",
                    email: 'gpd@jgorden.gov'
                })
                .then(res => {
                    expect(res.status).toBe(201)
                })
        });
        it('should return status 201', function() {
            return test(server)
                .post('/register')
                .send({
                    username: "bruce",
                    password: "iamthebatman",
                    email: "batman@secret.wayne.ent",
                    account_type: "admin"
                })
                .then(res => {
                    expect(res.status).toBe(201)
                })
        })
    })
    describe('post /login', function() {
        it('should return status 401', function() {
            return test(server)
                .post('/login')
                .send({
                    username: 'joker',
                    password: 'funny'
                })
                .then(res => {
                    expect(res.status).toBe(401)
                })
        })
        it('should return message invalid credentials', function() {
            return test(server)
                .post('/login')
                .send({
                    username: 'joker',
                    password: 'funny'
                })
                .then(res => {
                    expect(res.body.message).toBe("invalid credentials")
                })
        })
    })
    describe('get tickets', function() {
        it('should return error', function() {
            return test(server)
                .get('/ticket')
                .then(res => {
                    expect(res.status).toBe(400)
                })
        })
        it('should return status 200', function() {
            return test(server)
                .get('/ticket')
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
    })
})