const foodController = require("../food");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const Food = require("../../models/food");

let req, res, send;

beforeEach(() => {
  send = jest.fn();
  req = {};
  res = {
    status: jest.fn(() => ({ send })),
    json: jest.fn()
  };
});

describe("getAllFood()", () => {
  describe("when there is no user", () => {
    beforeEach(() => (req.user = undefined));

    it("responds with 401", () => {
      // foodController.index(req, res);
      foodController.getAllFood(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
      //foodController.index(req, res);
      foodController.getAllFood(req, res);

      expect(send).toHaveBeenCalledWith("Not Authenticated");
    });
  });

  describe("when there is a user present", () => {
    beforeEach(() => {
      req.user = {
        identifer: "testUser"
      };
    });

    describe("when food array is empty", () => {
      beforeEach(() => {
        data = [];
        mockingoose(Food).toReturn([], "find");
      });

      it("responds with 200", async () => {
        await foodController.getAllFood(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("responds with an empty array", async () => {
        await foodController.getAllFood(req, res);

        expect(send).toHaveBeenCalledWith([]);
      });

      describe("when food items exists", () => {
        beforeEach(() => {
          data = [
            {
              foodName: "pasta",
              brandName: "Great Value",
              quanitity: "10",
              purchaseDate: "12/25/2000",
              expirationDate: "12/25/2010",
              orderNextByDate: "12/25/2009",
              description: "It is pasta"
            }
          ];
          mockingoose(Food).toReturn(
            [
              {
                foodName: "pasta",
                brandName: "Great Value",
                quanitity: "10",
                purchaseDate: "12/25/2000",
                expirationDate: "12/25/2010",
                orderNextByDate: "12/25/2009",
                description: "It is pasta"
              }
            ],
            "find"
          );
        });

        it("responds with 200", async () => {
          await foodController.getAllFood(req, res);

          expect(res.status).toHaveBeenCalledWith(200);
        });

        it("responds with food items", async () => {
          await foodController.getAllFood(req, res);

          expect(send).toHaveBeenCalledWith([
            expect.objectContaining({
              foodName: "pasta",
              brandName: "Great Value",
              quanitity: "10",
              purchaseDate: "12/25/2000",
              expirationDate: "12/25/2010",
              orderNextByDate: "12/25/2009",
              description: "It is pasta"
            })
          ]);
        });
      });
    });
  });
});
