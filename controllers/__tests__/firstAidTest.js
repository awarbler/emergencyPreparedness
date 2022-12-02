const firstAidController = require("../firstAid");
const mockingoose = require("mockingoose");
const FirstAid = require("../../models/firstAid");

let req, res, send;

beforeEach(() => {
  send = jest.fn();

  req = {};
  res = {
    status: jest.fn(() => ({ send })),
    json: jest.fn()
  };
});

///// getAllFirstAidItems() /////
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
        identifier: "testUser"
      };
    });

    describe("when firstAid array is empty", () => {
      beforeEach(() => {
        // data = [];
        mockingoose(FirstAid).toReturn([], "find");
      });

      it("responds with 200", async () => {
        await firstAidController.getAllFirstAidItems(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("responds with an empty array", async () => {
        await firstAidController.getAllFirstAidItems(req, res);

        expect(send).toHaveBeenCalledWith([]);
      });

      describe("when firstAid items exist", () => {
        beforeEach(() => {
          // data = [
          //     {
          //         name: "BandAid",
          //         quantity: "18",
          //         purchaseDate: "11/30/2022",
          //     }
          // ];

          mockingoose(FirstAid).toReturn(
            [
              {
                name: "BandAid",
                quantity: "18",
                purchaseDate: "11/30/2022"
              }
            ],
            "find"
          );
        });

        it("responds with 200", async () => {
          await firstAidController.getAllFirstAidItems(req, res);

          expect(res.status).toHaveBeenCalledWith(200);
        });

        it("responds with firstAid items", async () => {
          await firstAidController.getAllFirstAidItems(req, res);

          expect(send).toHaveBeenCalledWith([
            expect.objectContaining({
              name: "BandAid",
              quantity: "18",
              purchaseDate: "11/30/2022"
            })
          ]);
        });
      });
    });
  });
});

///// getFirstAidItemByName /////
describe("getFirstAidItemByName()", () => {
  describe("when there is no user present", () => {
    beforeEach(() => ((req.user = undefined), (req.name = undefined)));

    it("responds with 401", () => {
      firstAidController.getFirstAidItemByName(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
      firstAidController.getFirstAidItemByName(req, res);

      expect(send).toHaveBeenCalledWith("Not Authenticated");
    });
  });
  describe("when there is a user present", () => {
    beforeEach(() => {
      req.user = {
        identifier: "testUser"
      };
    });

    // describe("when firstAid item by name is empty", () => {
    //     beforeEach(() => {
    //         data = [];
    //         req.name = {
    //             name: "BandAid",
    //         };
    //         mockingoose(FirstAid).toReturn([], 'find');

    //         return FirstAid.find({ name: 'BandAid' }).then(doc => {
    //             expect(JSON.parse(JSON.stringify(doc))).toMatchObject(data);
    //         });
    //     });

    //     it("responds with 200", async () => {
    //         await firstAidController.getFirstAidItemByName(req, res);

    //         expect(res.status).toHaveBeenCalledWith(200);
    //     });

    //     it("responds with an empty firstAid item", async () => {
    //         await firstAidController.getFirstAidItemByName(req, res);

    //         expect(send).toHaveBeenCalledWith([]);
    //     });

    describe("when firstAid item exists", () => {
      beforeEach(() => {
        data = [
          {
            name: "BandAid",
            quantity: "18",
            purchaseDate: "11/30/2022"
          }
        ];
        const testing = FirstAid.find({ name: "BandAid" }).then((doc) => {
          expect(JSON.parse(JSON.stringify(doc))).toMatchObject(data);
          console.log("====>", testing);
        });
        // mockingoose(FirstAid).toReturn([
        //     {
        //         name: "BandAid",
        //         quantity: "18",
        //         purchaseDate: "11/30/2022",
        //     },
        // ], 'find');
      });

      it("responds with firstAid item", () => {
        data = [
          {
            name: "BandAid",
            quantity: "18",
            purchaseDate: "11/30/2022"
          }
        ];
        return FirstAid.find({ name: "BandAid" }).then((doc) => {
          expect(JSON.parse(JSON.stringify(doc))).toMatchObject(data);
        });
      });

      it("responds with 200", async () => {
        await firstAidController.getFirstAidItemByName(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("responds with firstAid item", async () => {
        await firstAidController.getFirstAidItemByName(req, res);

        expect(send).toHaveBeenCalledWith([
          expect.objectContaining({
            name: "BandAid",
            quantity: "18",
            purchaseDate: "11/30/2022"
          })
        ]);
      });
    });
  });
});
// });
