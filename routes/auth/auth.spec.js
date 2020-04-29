const test = require('supertest');
const request = require('supertest')
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
    describe('post /auth/login', function() {
        it('should return status 201', function() {
            let token;
            beforeEach(async() => {
                const response = await test(server).post('/auth/login').send({username: "jim", password: "gotham"})
                token = response.body.token
            })
            return test(server)
                .post('/auth/login')
                .send({
                    username: "jim",
                    password: "gotham"
                })
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.body.message).toBe("welcome")
                    // expect(res.body).toContain(token)
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
            const response = await test(server).post('/auth/login').send({username: "wildcard", password: "wildcard"})
            token = response.body.token
        }) 
        it('should return error', function() {
            return test(server)
                .get('/ticket')
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.message).toBe('invalid creds')
                })
        })
        it('should return message invalid creds', function() {
            return test(server)
                .get('/ticket')
                .set('Authorization', `Bearer ${token}`)
                .then(res => {
                    console.log(token)
                    expect(res.status).toBe(401)
                })
        })
    })
    describe('tickets endpoint', function() {     
        it('should post a ticket', function() {
            let token;
            beforeEach(async() => {
                const response = await test(server).post('/auth/login').send({username: "wildcard2", password: "wildcard"})
                token = response.body.token
            }) 
            return test(server)
            .post('/ticket')
            .send({
                title: "flex",
                description: "I need to flex this unit",
                user_id: 1
            })
            .then(res => {
                expect(res.body.message).toBe("invalid creds")
            })
        })

    })

})

describe('biskoi tests', () => {

    let token;

    it('Can register', async() => {
        await db('users').where({username: 'biskoiTest'}).del();
        await request(server)
        .post('/auth/register')
        .send({
            username: 'biskoiTest',
            password: 'password',
            email: 'bis@email.com'
        }).then(res => {
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
        })
    })

    it('Login returns token', async() => {
        const res = await request(server)
        .post('/auth/login')
        .send({
            username: 'biskoiTest',
            password: 'password'
        });

        token = res.body.token
        expect(token).toBeTruthy();

        // console.log(res.body)
    });

    it('get to /feedback will return feedback data', async() => {
        const res = await request(server)
        .get('/feedback')
        .set('authorization', token);
        // console.log('res.body', res.body)
        // console.log('asd')
        expect(res.body.data[0]).toHaveProperty('feedback_id');
    });

    // it('can post feedback to a ticket', async() => {

    // })

});