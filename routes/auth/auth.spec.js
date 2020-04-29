const test = require('supertest');

const server = require('../../api/server.js');
const db = require('../../data/db-config.js');

describe('server', function() {
    describe('get /', function() {
        it('should return 200', function() {
            return test(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.message).toBe('server is running')
            })
        })
    })
    describe('post /auth/register', function() {
        beforeEach(async() => {
            await db('users').where({username: 'jim'}).del() 
        })
        it('should return status 201', function() {
            return test(server)
                .post('/auth/register')
                .send({
                    username: "jim",
                    password: "gotham",
                    email: 'gpd@jgordon.gov'
                })
                .then(res => {
                    expect(res.status).toBe(201)
                    expect(res.body.message).toBe(undefined)
                })
        });
    })
    describe('post /auth/register', function() {
        it('should return status 201', function() {
            return test(server)
                .post('/auth/login')
                .send({
                    username: "jim",
                    password: "gotham"
                })
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.body.message).toBe("welcome")
                })
        });
    })
    describe('post /auth/login', function() {
        it('should return status 401', function() {
            return test(server)
                .post('/auth/login')
                .send({
                    username: 'joker',
                    password: 'funny'
                })
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body.message).toBe('invalid credentials')
                })
        })
    })

    describe('get tickets', function() {
        let token;
            beforeEach(async() => {
                const response = await test(server).post('/auth/login').send({username: "jim", password: "gotham"})
                token = response.body.token
        test(server)
            .post('/auth/login')
            .send({
                username: "jim",
                password: "gotham"
            })
            
    })
        it('should return error', function() {
            return test(server)
                .get('/ticket')
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.message).toBe('invalid creds')
                })
        })
        it('should return status 200', function() {
            return test(server)
                .get('/ticket')
                .set({Authorization: token})
                .then(res => {
                    console.log(token)
                    expect(res.status).toBe(200)
                })
        })
    
    it('it should create a new ticket', function() {
        return test(server)
            .post('/ticket')
            .set({Authorization: token})
            .send({
                title: "flex",
                description: "I need to flex this unit",
                user_id: 1
            })
            .then(res => {
                expect(res.status).toBe(201)
            })
    })
    it('it should return an error', function() {
        return test(server)
            .post('/ticket')
            .set({Authorization: token})
            .send({
                title: "flex",
                user_id: 1
            })
            .then(res => {
                expect(res.status).toBe(500)
            })
    })
    it('should view a ticket', function() {
        return test(server)
            .get('/ticket/7')
            .set({Authorization: token})
            .then(res => {
                expect(res.status).toBe(200)
            })
    })
    it('it should edit existing ticket', function() {
        return test(server)
            .put('/ticket/12')
            .set({Authorization: token})
            .send({
                title: "flex",
                description: "I don't need to flex this unit",
                user_id: 1
            })
            .then(res => {
                expect(res.status).toBe(200)
            })
    })
    it('it should return 404', function() {
        return test(server)
            .delete('/ticket/1200')
            .set({Authorization: token})
            .then(res => {
                expect(res.status).toBe(404)
                expect(res.body.message).toBe('ticket not found')
            })
    })
    it('should return status 200', function() {
        return test(server)
            .get('/users')
            .set({Authorization: token})
            .then(res => {
                console.log(token)
                expect(res.status).toBe(200)
            })
    })

        it('it should create a new user', function() {
            beforeEach(async() => {
                await db('users').where({username: 'fred'}).del()
            })
            return test(server)
                .post('/users')
                .set({Authorization: token})
                .send({
                    username: "fred",
                    password: "bedrock",
                    email: "fflintstone@gmail.com"
                })
                .then(res => {
                    expect(res.status).toBe(201)
                })
        })
        it('should view a user', function() {
            return test(server)
                .get('/users/1')
                .set({Authorization: token})
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
        it('it should edit existing user', function() {
            return test(server)
                .put('/users/1')
                .set({Authorization: token})
                .send({
                    username: 'admin',
                    password: 'admin',
                    email: 'posted@gmail.com'
                })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
        it('it should return 404', function() {
            return test(server)
                .delete('/users/1200')
                .set({Authorization: token})
                .then(res => {
                    expect(res.status).toBe(404)
                })
        })
        it('should return 200', function() {
            return test(server)
                .get('/feedback')
                .set({Authorization: token})
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
        it('should return 200', function() {
            return test(server)
                .get('/feedback/1')
                .set({Authorization: token})
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
    })
})