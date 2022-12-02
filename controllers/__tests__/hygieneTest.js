const hygieneController = require('../firstAid');
const mongoose = require('mongoose');

let req, res, send;

beforeEach(() => {
  send = jest.fn();

  req = {};
  res = {
    status: jest.fn(() => ({ send })),
    json: jest.fn()
  };
});

describe('getAllHygienes()', () => {
  describe('when there is no user present', () => {
    beforeEach(() => (req.user = undefined));

    it('responds with 401', () => {
      hygieneController.getAllHygienes(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
      hygieneController.getAllHygienes(req, res);

      expect(send).toHaveBeenCalledWith('Not Authenticated');
    });
  });
  describe('when there is a user present', () => {
    beforeEach(() => {
      req.user = {
        identifier: 'testUser'
      };
    });

    describe('when firstAid array is empty', () => {
      beforeEach(() => {
        data = [];
      });

      it('responds with 200', () => {
        hygieneController.getAllHygienes(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it('responds with an empty array', () => {
        hygieneController.getAllHygienes(req, res);

        expect(send).toHaveBeenCalledWith([]);
      });

      describe('when firstAid items exist', () => {
        beforeEach(() => {
          data = [
            {
              hygieneName: 'Dial Soap',
              hygineQuantity: '18',
              hygienPurchaseDate: '11/30/2022'
            }
          ];
        });

        it('responds with 200', () => {
          hygieneController.getAllHygienes(req, res);

          expect(res.status).toHaveBeenCalledWith(200);
        });

        it('responds with firstAid items', () => {
          hygieneController.getAllHygienes(req, res);

          expect(send).toHaveBeenCalledWith([
            {
              hygieneName: 'Dial Soap',
              hygineQuantity: '18',
              hygienPurchaseDate: '11/30/2022'
            }
          ]);
        });
      });
    });
  });
});
