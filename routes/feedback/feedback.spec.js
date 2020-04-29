const request = require('supertest');
const db = require('../../data/db-config');
const server = require('../../api/server')

describe('biskoi tests', () => {

   let token;
   let newFbId;

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
      expect(res.status).toBe(200);
      expect(res.body.data[0]).toHaveProperty('feedback_id');
   });

   it('get to /feedback/1 will return messages associated with ticket id 1', async () => {
      const res = await request(server)
      .get('/feedback/1')
      .set('authorization', token);
      // console.log('res.body', res.body)
      // console.log('asd')
      expect(res.status).toBe(200);
      res.body.data.forEach(item => {
         expect(item).toHaveProperty('ticket_id', 1)
      });
   });

   it('post to /feedback/id adds a new message to the correct ticket', async() => {
      await db('feedback').where({message: 'hey this is a test feedback post'}).del();

      const noFb = await db('feedback').where({message: 'hey this is a test feedback post'});
      expect(noFb).toHaveLength(0);

      await request(server)
      .post('/feedback/1')
      .set('authorization', token)
      .send({
         author_id: 1,
         message: 'hey this is a test feedback post'
      });

      const newFb = await db('feedback').where({message: 'hey this is a test feedback post'});
      expect(newFb[0]).toHaveProperty('message', 'hey this is a test feedback post')
      newFbId = newFb[0].id;
   });

   it('get to /feedback/id/:id returns the correct feedback resource id', async() => {
      const res = await request(server)
      .get(`/feedback/id/${newFbId}`)
      .set('authorization', token);

      // console.log(res.body)
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0]).toHaveProperty('feedback_id', newFbId)
   });

   it('delete to /feedback/id/:id deletes the correct feedback resource', async() => {
      await request(server)
      .del(`/feedback/id/${newFbId}`)
      .set('authorization', token);

      const res = await request(server)
      .get(`/feedback/id/${newFbId}`)
      .set('authorization', token);

      // console.log(res.body)
      expect(res.body.data).toHaveLength(0);
      
   });

});