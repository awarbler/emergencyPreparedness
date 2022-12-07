const hygieneController = require("../hygiene");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const Hygiene = require("../../models/hygiene");

let req, res, send;

beforeEach(() => {
  send = jest.fn();

  req = {};
  res = {
    status: jest.fn(() => ({ send })),
    json: jest.fn()
  };
});

describe("getAllHygienes()", () => {
  describe("when there is no user present", () => {
    beforeEach(() => (req.user = undefined));
    console.log("no user");

    it("responds with 401", () => {
      hygieneController.getAllHygienes(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
      hygieneController.getAllHygienes(req, res);

      expect(send).toHaveBeenCalledWith("Not Authenticated");
    });
  });

  describe("when there is a user present", () => {
    beforeEach(() => {
      req.user = {
        identifier: "testUser"
      };
    });

    describe("when hygiene array is empty", () => {
      beforeEach(() => {
        data = [];
        mockingoose(Hygiene).toReturn([], "find");
      });

      it("responds with 200", async () => {
        await hygieneController.getAllHygienes(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("responds with an empty array", async () => {
        await hygieneController.getAllHygienes(req, res);
        // start new
        // console.log("2. Doing the assertion with 'expect");
        expect(send).toHaveBeenCalledWith([]);
      });

      describe("when hygiene items exist", () => {
        beforeEach(() => {
          data = [
            {
              name: "Dial Soap",
              quantity: "18",
              purchaseDate: "11/30/2022"
            }
          ];
          mockingoose(Hygiene).toReturn(
            [
              {
                name: "Dial Soap",
                quantity: "18",
                purchaseDate: "11/30/2022"
              }
            ],
            "find"
          );
        });

        it("responds with 200", async () => {
          await hygieneController.getAllHygienes(req, res);

          expect(res.status).toHaveBeenCalledWith(200);
        });

        it("responds with hygiene items", async () => {
          await hygieneController.getAllHygienes(req, res);

          // console.log("2. Doing the assertion with 'expect");
          expect(send).toHaveBeenCalledWith([expect.objectContaining({})]);
        });
      });
    });
  });
});

describe("getHygieneByName()", () => {
  // describe("when there is no user present", () => {
  //   beforeEach(() => (req.user = undefined));
  //   it.only("responds with 401", () => {
  //     hygieneController.getHygieneByName(req, res);
  //     expect(res.status).toHaveBeenCalledWith(401);
  //   });
  //   it("responds with 'Not Authenticated'", () => {
  //     hygieneController.getHygieneByName(req, res);
  //     expect(send).toHaveBeenCalledWith("Not Authenticated");
  //   });
  // });
  describe("when there is a user present", () => {
    beforeEach(() => {
      req.user = {
        identifier: "testUser"
      };
    });
    describe("when hygiene item by name is empty", () => {
      //     beforeEach(() => {
      //         data = [];
      //         req.name = {
      //             name: "BandAid",
      //         };
      //         mockingoose(Hygiene).toReturn([], 'find');
      //         return Hygiene.find({ name: 'BandAid' }).then(doc => {
      //             expect(JSON.parse(JSON.stringify(doc))).toMatchObject(data);
      //         });
      //     });
      //     it("responds with 200", async () => {
      //         await HygieneController.getHygieneItemByName(req, res);
      //         expect(res.status).toHaveBeenCalledWith(200);
      //     });
      //     it("responds with an empty Hygiene item", async () => {
      //         await HygieneController.getHygieneItemByName(req, res);
      //         expect(send).toHaveBeenCalledWith([]);
      //     });
    });

    describe("when hygiene item exists", () => {
      //   beforeEach(() => {
      //     data = [
      //       {
      //         name: "Dial Soap",
      //         quantity: "18",
      //         purchaseDate: "11/30/2022"
      //       }
      //     ];
      //     const testing = Hygiene.find({ name: "BandAid" }).then((doc) => {
      //       expect(JSON.parse(JSON.stringify(doc))).toMatchObject(data);
      //       console.log("====>", testing);
      //     });
      // mockingoose(Hygiene).toReturn([
      //     {
      //         name: "BandAid",
      //         quantity: "18",
      //         purchaseDate: "11/30/2022",
      //     },
      // ], 'find');
      //   });

      it("responds with hygiene item", () => {
        data = [
          {
            name: "Dial Soap",
            quantity: "18",
            purchaseDate: "11/30/2022"
          }
        ];
        const testing = Hygiene.find({ name: "Dial Soap" }).then((doc) => {
          expect(JSON.parse(JSON.stringify(doc))).toMatchObject(data);
          console.log("=====>", testing);
          console.log("====>doc", doc);
          console.log("====>data", data);
        });
      });

      //   it("responds with 200", async () => {
      //     await hygieneController.getHygieneName(req, res);

      //     expect(res.status).toHaveBeenCalledWith(200);
      //   });

      //   it("responds with hygiene item", () => {
      //     hygieneController.gethygieneItemByName(req, res);

      //     expect(send).toHaveBeenCalledWith([
      //       expect.objectContaining({
      //         name: "BandAid",
      //         quantity: "18",
      //         purchaseDate: "11/30/2022"
      //       })
      //     ]);
    });
    // start here
  });
});
