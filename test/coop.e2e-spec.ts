import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('CoopController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  let testCoopCreate: request.Response;

  it('create test coop', async () => {
    return testCoopCreate = await request(app.getHttpServer())
      .post('/coop')
      .send({
        "name": "Chicken Mart.",
      })
      .expect(201);
  });

  describe('/coop (POST)', () => {
    it('create coop if with new name', async () => {
      const coopCreate = await request(app.getHttpServer())
        .post('/coop')
        .send({
          "name": "new coop",
        })
        .expect(201);

      expect(coopCreate.body.name).toBe("new coop");

      return request(app.getHttpServer())
        .delete('/coop/' + coopCreate.body.id)
        .expect(200);
    });

    it('create coop if this name already exists', () => {
      return request(app.getHttpServer())
        .post('/coop')
        .send({
          "name": testCoopCreate.body.name,
        })
        .expect(409);
    });

    it('create unnamed coop', () => {
      return request(app.getHttpServer())
        .post('/coop')
        .send({})
        .expect(400);
    });

    it('create coop with empty name', () => {
      return request(app.getHttpServer())
        .post('/coop')
        .send({
          "name": "",
        })
        .expect(400);
    });
  });

  describe('/coop (GET)', () => {
    it('get all coop', () => {
      return request(app.getHttpServer())
        .get('/coop')
        .expect(200);
    });
  });

  describe('/coop/:id (GET)', () => {
    it('get one coop with valid id', () => {
      return request(app.getHttpServer())
        .get('/coop/' + testCoopCreate.body.id)
        .expect(200);
    });

    it('get one coop with invalid id', () => {
      return request(app.getHttpServer())
        .get('/coop/42')
        .expect(404);
    });
  });

  describe('/coop/:id (PATCH)', () => {
    it('update one coop with valid id', async () => {
      await request(app.getHttpServer())
        .patch('/coop/' + testCoopCreate.body.id)
        .send({
          "name": "sdfsdf",
        })
        .expect(200);

      const testCoopUpdate = await request(app.getHttpServer())
      .get('/coop/' + testCoopCreate.body.id)
      .expect(200);

      expect(testCoopUpdate.body.name).toBe("sdfsdf");
    });

    it('update one coop with invalid id', () => {
      return request(app.getHttpServer())
        .patch('/coop/42')
        .send({
          "name": "asdasd",
        })
        .expect(404);
    });
  });

  describe('/coop/:id (DELETE)', () => {
    it('delete one coop with valid id', () => {
    });

    it('delete one coop with invalid id', () => {
      return request(app.getHttpServer())
        .delete('/coop/42')
        .expect(200);
    });
  });

  it('delete test coop', async () => {
    return await request(app.getHttpServer())
      .delete('/coop/' + testCoopCreate.body.id)
      .expect(200);
  });
});
