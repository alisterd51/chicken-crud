import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ChickenController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({}));

    await app.init();
  });

  let testChickenCreate: request.Response;

  it('create test chicken', async () => {
    return testChickenCreate = await request(app.getHttpServer())
      .post('/chicken')
      .send({
        "name": "Mr. Anderson",
        "birthday": new Date(),
        "weight": 42,
      })
      .expect(201);
  });

  describe('/chicken (GET)', () => {
    it('get all chickens', () => {
      return request(app.getHttpServer())
        .get('/chicken')
        .expect(200);
    });
  });

  describe('/chicken/:id (GET)', () => {
    it('get one chickens with invalid id', async () => {
      return await request(app.getHttpServer())
        .get('/chicken/42')
        .expect(404);
    });

    it('get one chickens with valid id', async () => {
      return await request(app.getHttpServer())
        .get('/chicken/' + testChickenCreate.body.id)
        .expect(200);
    });
  });

  describe('/chicken (POST)', () => {
    it('create one chicken if it already exists', () => {
      return request(app.getHttpServer())
        .post('/chicken')
        .send({
          "name": testChickenCreate.body.name,
          "birthday": testChickenCreate.body.birthday,
          "weight": testChickenCreate.body.weight,
        })
        .expect(201);
    });

    it('create chicken without parameter', () => {
      return request(app.getHttpServer())
        .post('/chicken')
        .send({})
        .expect(400);
    });

    it('create chicken with negative weight', () => {
      return request(app.getHttpServer())
        .post('/chicken')
        .send({
          "name": "name0",
          "birthday": "2023-06-14T20:39:17.394Z",
          "weight": -42,
        })
        .expect(400);
    });

    it('create chicken with not number weight', () => {
      return request(app.getHttpServer())
        .post('/chicken')
        .send({
          "name": "name0",
          "birthday": "2023-06-14T20:39:17.394Z",
          "weight": "pouet",
        })
        .expect(400);
    });

    it('create chicken with null weight', () => {
      return request(app.getHttpServer())
        .post('/chicken')
        .send({
          "name": "name0",
          "birthday": "2023-06-14T20:39:17.394Z",
          "weight": "",
        })
        .expect(400);
    });

    it('create chicken with null name', () => {
      return request(app.getHttpServer())
        .post('/chicken')
        .send({
          "name": "",
          "birthday": "2023-06-14T20:39:17.394Z",
          "weight": "1",
        })
        .expect(400);
    });

    it('create chicken with invalid birthday', () => {
      return request(app.getHttpServer())
        .post('/chicken')
        .send({
          "name": "name0",
          "birthday": "pouet",
          "weight": "1",
        })
        .expect(400);
    });

    it('create chicken with null birthday', () => {
      return request(app.getHttpServer())
        .post('/chicken')
        .send({
          "name": "name0",
          "birthday": "",
          "weight": "1",
        })
        .expect(400);
    });

    it('create chicken with: name, birthday, weight', async () => {
      const chicken = await request(app.getHttpServer())
        .post('/chicken')
        .send({
          "name": "name1",
          "birthday": "2023-06-14T20:39:17.394Z",
          "weight": 1,
        })
        .expect(201);

      await request(app.getHttpServer())
        .delete('/chicken/' + chicken.body.id);
      return chicken;
    });

    it('create chicken with: name, birthday', async () => {
      const chicken = await request(app.getHttpServer())
        .post('/chicken')
        .send({
          "name": "name2",
          "birthday": "2023-06-14T20:39:17.394Z",
        })
        .expect(400);
      return chicken;
    });

    it('create chicken with: name, weight', async () => {
      const chicken = await request(app.getHttpServer())
        .post('/chicken')
        .send({
          "name": "name3",
          "weight": 1,
        })
        .expect(201);

      await request(app.getHttpServer())
        .delete('/chicken/' + chicken.body.id);
      return chicken;
    });

    it('create chicken with: birthday, weight', async () => {
      const chicken = await request(app.getHttpServer())
        .post('/chicken')
        .send({
          "birthday": "2023-06-14T20:39:17.394Z",
          "weight": 1,
        })
        .expect(400);
      return chicken;
    });

    it('create chicken with: name', async () => {
      const chicken = await request(app.getHttpServer())
        .post('/chicken')
        .send({
          "name": "name5",
        })
        .expect(400);
      return chicken;
    });

    it('create chicken with: birthday', async () => {
      const chicken = await request(app.getHttpServer())
        .post('/chicken')
        .send({
          "birthday": "2023-06-14T20:39:17.394Z",
        })
        .expect(400);
      return chicken;
    });

    it('create chicken with: weight', async () => {
      const chicken = await request(app.getHttpServer())
        .post('/chicken')
        .send({
          "weight": 1,
        })
        .expect(400);
      return chicken;
    });

    it('create chicken with: name, birthday, weight, other', async () => {
      const chicken = await request(app.getHttpServer())
        .post('/chicken')
        .send({
          "name": "name7",
          "birthday": "2023-06-14T20:39:17.394Z",
          "weight": 1,
          "other": "pouet"
        })
        .expect(201);
      await request(app.getHttpServer())
        .delete('/chicken/' + chicken.body.id);
      return chicken;
    });
  });

  describe('/chicken/:id (PUT)', () => {
    it('replace chicken whith invalid id', () => {
      return request(app.getHttpServer())
        .put('/chicken/42')
        .send({
          "name": "newName",
          "birthday": "2023-06-14T20:39:17.394Z",
          "weight": 2,
        })
        .expect(404);
    });

    it('replace chicken whith: name, birthday, weight', async () => {
      await request(app.getHttpServer())
        .put('/chicken/' + testChickenCreate.body.id)
        .send({
          "name": "newName1",
          "birthday": "2001-01-01",
          "weight": 1,
        })
        .expect(200);

      const response = await request(app.getHttpServer())
        .get('/chicken/' + testChickenCreate.body.id)
        .expect(200);

      expect(response.body.name).toBe("newName1");
      expect(response.body.birthday).toBe("2001-01-01");
      expect(response.body.weight).toBe(1);
      expect(response.body.steps).toBe(0);
      expect(response.body.isRunning).toBe(false);

      return response;
    });

    it('replace chicken whith: name, weight', async () => {
      await request(app.getHttpServer())
        .put('/chicken/' + testChickenCreate.body.id)
        .send({
          "name": "newName2",
          "weight": 2,
        })
        .expect(200);

      const response = await request(app.getHttpServer())
        .get('/chicken/' + testChickenCreate.body.id)
        .expect(200);

      expect(response.body.name).toBe("newName2");
      expect(response.body.birthday).toBe(null);
      expect(response.body.weight).toBe(2);
      expect(response.body.steps).toBe(0);
      expect(response.body.isRunning).toBe(false);

      return response;
    });

    it('replace chicken whith: name', async () => {
      await request(app.getHttpServer())
        .put('/chicken/' + testChickenCreate.body.id)
        .send({
          "name": "newName3",
        })
        .expect(400);

      const response = await request(app.getHttpServer())
        .get('/chicken/' + testChickenCreate.body.id)
        .expect(200);

      return response;
    });

    it('replace chicken whith: weight', async () => {
      await request(app.getHttpServer())
        .put('/chicken/' + testChickenCreate.body.id)
        .send({
          "weight": "4",
        })
        .expect(400);

      const response = await request(app.getHttpServer())
        .get('/chicken/' + testChickenCreate.body.id)
        .expect(200);

      return response;
    });

    it('replace chicken whith: name, weight, steps, isRunning', async () => {
      await request(app.getHttpServer())
        .put('/chicken/' + testChickenCreate.body.id)
        .send({
          "name": "newName5",
          "birthday": "2005-05-05",
          "weight": 5,
          "steps": 5,
          "isRunning": true,
        })
        .expect(200);

      const response = await request(app.getHttpServer())
        .get('/chicken/' + testChickenCreate.body.id)
        .expect(200);

      expect(response.body.name).toBe("newName5");
      expect(response.body.birthday).toBe("2005-05-05");
      expect(response.body.weight).toBe(5);
      expect(response.body.steps).toBe(5);
      expect(response.body.isRunning).toBe(true);

      return response;
    });
  });

  describe('/chicken/:id (PATCH)', () => {
    it('update chicken whith invalid id', () => {
      return request(app.getHttpServer())
        .patch('/chicken/42')
        .send({
          "name": "newName",
          "birthday": "2023-06-14T20:39:17.394Z",
          "weight": 2,
        })
        .expect(404);
    });

    it('replace chicken whith: name, birthday, weight', async () => {
      const prevResponse = await request(app.getHttpServer())
        .get('/chicken/' + testChickenCreate.body.id)
        .expect(200);
      await request(app.getHttpServer())
        .patch('/chicken/' + testChickenCreate.body.id)
        .send({
          "name": "newName6",
          "birthday": "2006-06-06",
          "weight": 6,
        })
        .expect(200);

      const response = await request(app.getHttpServer())
        .get('/chicken/' + testChickenCreate.body.id)
        .expect(200);

      expect(response.body.name).toBe("newName6");
      expect(response.body.birthday).toBe("2006-06-06");
      expect(response.body.weight).toBe(6);
      expect(response.body.steps).toBe(prevResponse.body.steps);
      expect(response.body.isRunning).toBe(prevResponse.body.isRunning);

      return response;
    });

    it('replace chicken whith: name, weight', async () => {
      const prevResponse = await request(app.getHttpServer())
        .get('/chicken/' + testChickenCreate.body.id)
        .expect(200);
      await request(app.getHttpServer())
        .patch('/chicken/' + testChickenCreate.body.id)
        .send({
          "name": "newName7",
          "weight": 7,
        })
        .expect(200);

      const response = await request(app.getHttpServer())
        .get('/chicken/' + testChickenCreate.body.id)
        .expect(200);

      expect(response.body.name).toBe("newName7");
      expect(response.body.birthday).toBe(prevResponse.body.birthday);
      expect(response.body.weight).toBe(7);
      expect(response.body.steps).toBe(prevResponse.body.steps);
      expect(response.body.isRunning).toBe(prevResponse.body.isRunning);

      return response;
    });

    it('replace chicken whith: name', async () => {
      const prevResponse = await request(app.getHttpServer())
        .get('/chicken/' + testChickenCreate.body.id)
        .expect(200);
      await request(app.getHttpServer())
        .patch('/chicken/' + testChickenCreate.body.id)
        .send({
          "name": "newName8",
        })
        .expect(200);

      const response = await request(app.getHttpServer())
        .get('/chicken/' + testChickenCreate.body.id)
        .expect(200);

      expect(response.body.name).toBe("newName8");
      expect(response.body.birthday).toBe(prevResponse.body.birthday);
      expect(response.body.weight).toBe(prevResponse.body.weight);
      expect(response.body.steps).toBe(prevResponse.body.steps);
      expect(response.body.isRunning).toBe(prevResponse.body.isRunning);

      return response;
    });

    it('replace chicken whith: weight', async () => {
      const prevResponse = await request(app.getHttpServer())
        .get('/chicken/' + testChickenCreate.body.id)
        .expect(200);
      await request(app.getHttpServer())
        .patch('/chicken/' + testChickenCreate.body.id)
        .send({
          "weight": 9,
        })
        .expect(200);

      const response = await request(app.getHttpServer())
        .get('/chicken/' + testChickenCreate.body.id)
        .expect(200);

      expect(response.body.name).toBe(prevResponse.body.name);
      expect(response.body.birthday).toBe(prevResponse.body.birthday);
      expect(response.body.weight).toBe(9);
      expect(response.body.steps).toBe(prevResponse.body.steps);
      expect(response.body.isRunning).toBe(prevResponse.body.isRunning);

      return response;
    });

    it('replace chicken whith: name, weight, steps, isRunning', async () => {
      await request(app.getHttpServer())
        .patch('/chicken/' + testChickenCreate.body.id)
        .send({
          "name": "newName10",
          "birthday": "2010-10-10",
          "weight": 10,
          "steps": 10,
          "isRunning": false,
        })
        .expect(200);

      const response = await request(app.getHttpServer())
        .get('/chicken/' + testChickenCreate.body.id)
        .expect(200);

      expect(response.body.name).toBe("newName10");
      expect(response.body.birthday).toBe("2010-10-10");
      expect(response.body.weight).toBe(10);
      expect(response.body.steps).toBe(10);
      expect(response.body.isRunning).toBe(false);

      return response;
    });
  });

  describe('/chicken/:id (DELETE)', () => {
    it('delete chicken whith invalid id', () => {
      return request(app.getHttpServer())
        .delete('/chicken/42')
        .expect(200);
    });

    it('delete chicken whith valid id', async () => {
      const newChicken = await request(app.getHttpServer())
        .post('/chicken')
        .send({
          "name": "new Mr. Anderson",
          "birthday": new Date(),
          "weight": 42,
        })
        .expect(201);
      await request(app.getHttpServer())
        .delete('/chicken/' + newChicken.body.id)
        .expect(200);
      return await request(app.getHttpServer())
        .get('/chicken/' + newChicken.body.id)
        .expect(404);
    });
  });

  describe('/chicken/run/:id (GET)', () => {
    it('run chicken whith invalid id', () => {
      return request(app.getHttpServer())
        .delete('/chicken/run/42')
        .expect(404);
    });

    it('run chicken whith valid id', async () => {
      const prevResponse = await request(app.getHttpServer())
        .get('/chicken/' + testChickenCreate.body.id)
        .expect(200);

      const prevSteps = +prevResponse.body.steps;

      await request(app.getHttpServer())
        .get('/chicken/run/' + testChickenCreate.body.id)
        .expect(200);

      const response = await request(app.getHttpServer())
        .get('/chicken/' + testChickenCreate.body.id)
        .expect(200);

      expect(response.body.isRunning).toBe(true);
      expect(response.body.steps).toBe(prevSteps + 1);
    });
  });

  it('delete test chicken', async () => {
    return await request(app.getHttpServer())
      .delete('/chicken/' + testChickenCreate.body.id)
      .expect(200);
  });
});
