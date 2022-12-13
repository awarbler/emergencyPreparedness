const app = require("../app");
const db = require("../initializers/db");

const mockingoose = require("mockingoose");

import request from 'supertest';
import { mocked } from 'ts-jest/utils';
import getDbConnection from '..initializers/db';

jest.mock('..intitalizers/db');

const mGetDbConnection = mocked(getDbConnection);

describe('68825658', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('should retrieve all', async () => {
    const mDB = {
      query: jest.fn().mockResolvedValueOnce('data'),
    };
    mGetDbConnection.mockReturnValueOnce(mDB);

    const { app } = require('./controller');
    await request(app)
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual('data');
      });
  });
});


// describe('connection to the database', function(){
//   it('succesfully connections', function(){
//     const myDatabaseConnection = mocked(getDbConnection);

//   })
// });