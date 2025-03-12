import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import axios from 'axios';

jest.mock('axios');

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        data: [
          {
            id: 15,
            name: 'Team A',
            short_name: 'TEAMA',
            abbr: 'TEA',
            city: 'City A',
            stadium: 'Stadium A',
          },
          {
            id: 8,
            name: 'Team B',
            short_name: 'TEAMB',
            abbr: 'TEB',
            city: 'City B',
            stadium: 'Stadium B',
          },
          {
            id: 9,
            name: 'Team C',
            short_name: 'TEAMC',
            abbr: 'TEC',
            city: 'City C',
            stadium: 'Stadium C',
          },
          {
            id: 2,
            name: 'Team D',
            short_name: 'TEAMD',
            abbr: 'TED',
            city: 'City D',
            stadium: 'Stadium D',
          },
          {
            id: 20,
            name: 'Team E',
            short_name: 'TEAME',
            abbr: 'TEE',
            city: 'City E',
            stadium: 'Stadium E',
          },
          {
            id: 7,
            name: 'Team F',
            short_name: 'TEAMF',
            abbr: 'TEF',
            city: 'City F',
            stadium: 'Stadium F',
          },
        ],
      },
    });
    await app.init();
  });

  it('api/teams (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/teams')
      .expect(200)
      .expect([
        {
          id: 1,
          name: 'Team A',
          abbr: 'TEA',
          city: 'City A',
          stadium: 'Stadium A',
        },
        {
          id: 2,
          name: 'Team B',
          abbr: 'TEB',
          city: 'City B',
          stadium: 'Stadium B',
        },
        {
          id: 3,
          name: 'Team C',
          abbr: 'TEC',
          city: 'City C',
          stadium: 'Stadium C',
        },
        {
          id: 4,
          name: 'Team D',
          abbr: 'TED',
          city: 'City D',
          stadium: 'Stadium D',
        },
        {
          id: 5,
          name: 'Team E',
          abbr: 'TEE',
          city: 'City E',
          stadium: 'Stadium E',
        },
      ]);
  });

  it('api/teams (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/teams')
      .send({
        name: 'New Team',
        abbr: 'NTT',
        city: 'Some city',
        stadium: 'stadium',
      })
      .expect(201)
      .expect({
        id: 6,
        name: 'New Team',
        abbr: 'NTT',
        city: 'Some city',
        stadium: 'stadium',
      });
  });
});
