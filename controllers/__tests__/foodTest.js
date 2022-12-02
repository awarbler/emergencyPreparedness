const foodController = require('../food');
const mongoose = require('mongoose');
const mockingoose = require('mockingoose');

let req, res, send;

beforeEach(() => {
  send = jest.fn();
  req = {};
  res = {
    status: jest.fn(() => ({ send })),
    json: jest.fn()
  };
});

describe('getAllFood()', () => {
  describe('when there is no user', () => {
    beforeEach(() => (req.user = undefined));

    it('responds with 401', () => {
      foodController.index(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
      foodController.index(req, res);

      expect(send).toHaveBeenCalledWith('Not Authenticated');
    });
  });

  describe('when there is a user present', () => {
    beforeEach(() => {
      req.user = {
        identifer: 'testUser'
      };
    });

    describe('when food array is empty', () => {
      beforeEach(() => {
        data = [];
      });

      it('responds with 200', () => {
        foodController.getAllFood(req, res);

        expect(res.status).toHaveBeenCalledWith([]);
      });
      describe('when food items exists', () => {
        beforeEach(() => {
          data = [
            {
              foodName: 'pasta',
              brandName: 'Great Value',
              quanitity: '10',
              purchaseDate: '12/25/2000',
              expirationDate: '12/25/2010',
              orderNextByDate: '12/25/2009',
              description: 'It is pasta'
            }
          ];
        });

        it('responds with 200', () => {
          foodController.getAllFood(req, res);
          expect(res.status).toHaveBeenCalledWith(200);
        });

        it('responds with food items', () => {
          foodController.getAllFood(req, res);

          expect(send).toHaveBeenCalledWith([
            {
              foodName: 'pasta',
              brandName: 'Great Value',
              quanitity: '10',
              purchaseDate: '12/25/2000',
              expirationDate: '12/25/2010',
              orderNextByDate: '12/25/2009',
              description: 'It is pasta'
            }
          ]);
        });
      });
    });
  });
});
