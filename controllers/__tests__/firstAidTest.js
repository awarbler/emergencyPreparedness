const firstAidController = require("../firstAid");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const FirstAid = require("../../models/firstAid");

let req, res, send;

beforeEach(() => {
  send = jest.fn();

  req = {};
  res = {
    status: jest.fn(() => ({ send })),
    json: jest.fn(),
  };
});

describe("getAllFirstAidItems()", () => {
  describe("when there is no user present", () => {
    beforeEach(() => (req.user = undefined));

    it("responds with 401", () => {
      firstAidController.getAllFirstAidItems(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
      firstAidController.getAllFirstAidItems(req, res);

      expect(send).toHaveBeenCalledWith("Not Authenticated");
    });
  });
  describe("when there is a user present", () => {
    beforeEach(() => {
      req.user = {
        identifier: "testUser",
      };
    });

    describe("when firstAid array is empty", () => {
      beforeEach(() => {
        data = [];
      });

      it("responds with 200", () => {
        firstAidController.getAllFirstAidItems(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("responds with an empty array", () => {
        firstAidController.getAllFirstAidItems(req, res);

        expect(send).toHaveBeenCalledWith([]);
      });

      describe("when firstAid items exist", () => {
        beforeEach(() => {
          data = [
            {
              name: "BandAid",
              quantity: "18",
              purchaseDate: "11/30/2022",
            },
          ];

          mockingoose(FirstAid).toReturn(
            [
              {
                name: "BandAid",
                quantity: "18",
                purchaseDate: "11/30/2022",
              },
            ],
            "find"
          );
        });

        it("responds with 200", () => {
          firstAidController.getAllFirstAidItems(req, res);

          expect(res.status).toHaveBeenCalledWith(200);
        });

        it("responds with firstAid items", async () => {
          await firstAidController.getAllFirstAidItems(req, res);

          console.log("2. Doing the assertion with 'expect'");
          expect(send).toHaveBeenCalledWith([
            expect.objectContaining({
              name: "BandAid",
              quantity: "18",
              purchaseDate: "11/30/2022",
            }),
          ]);
        });
      });
    });
  });
});
