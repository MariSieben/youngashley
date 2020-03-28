const request = require('supertest');
const app = require('../../src/app');
const connection = require ('../../src/database/connection');

describe ('USER', () => {
   beforeEach(async () => {
      await connection.migrate.latest();
    });

    afterAll(async () => {
       await  connection.destroy();
    });

 it('should be able to create a new USER', async () => {
     const response = await request(app)
            .post('/users')
            .send({
                name: "Ashley",
                email: "ashleyfrangipane@gmail.com",
                whatsapp: "+155332556789",
                city: "New Jersey",
                uf: "NY",
            });

            expect(response.body).toHaveProperty('id');
            expect(response.body.id).toHaveLength(8);
    });
});