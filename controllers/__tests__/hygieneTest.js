const hygieneController = require("../hygiene");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const Hygiene = require("../../models/hygiene");

let req, res, send;

beforeEach(() => {
  req = {};
  send = jest.fn();
  res = {
    status: jest.fn(() => ({
      send
    })),
    json: jest.fn()
    // send
  };
});

///// getAllhygieneItems() /////
describe("getAllHygienes()", () => {
  describe("when there is no user present", () => {
    beforeEach(() => (req.user = undefined));

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
        mockingoose(Hygiene).toReturn(data, "find");
      });

      it("responds with 200", async () => {
        await hygieneController.getAllHygienes(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("responds with an empty array", async () => {
        await hygieneController.getAllHygienes(req, res);

        expect(send).toHaveBeenCalledWith([]);
      });

      describe("when Hygiene items exist", () => {
        beforeEach(() => {
          data = [
            {
              name: "Dial Soap",
              quantity: "18",
              purchaseDate: "11/30/2022"
            }
          ];

          mockingoose(Hygiene).toReturn(data, "find");
        });

        it("responds with 200", async () => {
          await hygieneController.getAllHygienes(req, res);

          expect(res.status).toHaveBeenCalledWith(200);
        });

        it("responds with Hygiene items", async () => {
          await hygieneController.getAllHygienes(req, res);

          expect(send).toHaveBeenCalledWith([
            expect.objectContaining({
              name: "Dial Soap",
              quantity: "18",
              purchaseDate: "11/30/2022"
            })
          ]);
        });
      });
    });
  });
});

///// getHygieneItemByName /////
describe("getHygieneByName()", () => {
  describe("when there is no user present", () => {
    beforeEach(() => ((req.user = undefined), (req.name = undefined)));

    it("responds with 401", () => {
      hygieneController.getHygieneByName(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
      hygieneController.getHygieneByName(req, res);

      expect(send).toHaveBeenCalledWith("Not Authenticated");
    });
  });
  describe("when there is a user present", () => {
    beforeEach(() => {
      req.user = {
        identifier: "testUser"
      };
    });

    describe("when Hygiene item by name exists", () => {
      beforeEach(() => {
        req.params = { name: "Dial Soap" };

        data = [
          {
            name: "Dial Soap",
            quantity: "18",
            purchaseDate: "11/30/2022"
          }
        ];

        const finderMock = (query) => {
          if (query.getQuery().name === "Dial Soap") {
            return data;
          }
          return [];
        };
        mockingoose(Hygiene).toReturn(finderMock, "find");
      });

      it("responds with 200", async () => {
        await hygieneController.getHygieneByName(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("responds with Hygiene item matching the name parameter", async () => {
        await hygieneController.getHygieneByName(req, res);

        expect(send).toHaveBeenCalledWith(expect.objectContaining(data[0]));
      });
    });
  });
});
// });

///// createNewHygiene() /////
describe("createNewHygiene()", () => {
  describe("when there is no user present", () => {
    beforeEach(() => (req.user = undefined));

    it("responds with 401", () => {
      hygieneController.createNewHygiene(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
      hygieneController.createNewHygiene(req, res);

      expect(send).toHaveBeenCalledWith("Not Authenticated");
    });
  });
  describe("when there is a user present", () => {
    beforeEach(() => {
      req.user = {
        identifier: "testUser"
      };
    });

    describe("when user creates a Hygiene post and is valid", () => {
      beforeEach(() => {
        req.body = {
          name: "Dial Soaps",
          quantity: "20",
          purchaseDate: "12/2/2022"
        };
        mockingoose(Hygiene).toReturn(req.body, "save");
      });

      it("responds with 201", async () => {
        await hygieneController.createNewHygiene(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
      });

      it("responds with Hygiene post", async () => {
        await hygieneController.createNewHygiene(req, res);

        expect(send).toHaveBeenCalledWith(expect.objectContaining(req.body));
      });
    });
    describe("when user creates a Hygiene post and is invalid", () => {
      beforeEach(() => {
        req.body = {
          name: "Dial Soaps",
          quantity: "20"
        };
      });

      it("responds with 422", async () => {
        await hygieneController.createNewHygiene(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
      });

      it("responds with a validation error", async () => {
        await hygieneController.createNewHygiene(req, res);

        expect(send).toHaveBeenCalledWith({
          message: "hygiene validation failed: purchaseDate: Path `purchaseDate` is required."
        });
      });
    });
  });
});

///// updateHygiene /////
describe("updateHygiene()", () => {
  describe("when there is no user present", () => {
    beforeEach(() => (req.user = undefined));

    it("responds with 401", () => {
      hygieneController.updateHygiene(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
      hygieneController.updateHygiene(req, res);

      expect(send).toHaveBeenCalledWith("Not Authenticated");
    });
  });
  describe("when there is a user present", () => {
    beforeEach(() => {
      req.user = {
        identifier: "testUser"
      };
    });

    // describe("when Hygiene item exists", () => {
    //   beforeEach(() => {
    //     req.params = { name: "Dial Soap" };

    //     data = [
    //       {
    //         name: "Dial Soap",
    //         quantity: "18",
    //         purchaseDate: "11/30/2022"
    //       }
    //     ];

    //     res.body = [
    //       {
    //         name: "dial soap",
    //         quantity: "22",
    //         purchaseDate: "12/3/2022"
    //       }
    //     ];

    //     const finderMock = (query) => {
    //       console.log(query.getQuery().name);
    //       if (query.getQuery().name === "Dial Soap") {
    //         return data;
    //       }
    //       return [];
    //     };
    //     mockingoose(hygiene).toReturn(finderMock, "findOne").toReturn(res.body, "save");

    //         res.body = [
    //           {
    //          name: "dial soap",
    //          quantity: "22",
    //          purchaseDate: "12/3/2022"
    //        }
    //      ];

    //         mockingoose(hygiene).toReturn(res.body, "updateOne");
    //   });

    describe("when hygiene item gets updated and is valid", () => {
      beforeEach(() => {
        //       req.params = { name: "Dial Soap" }

        //         data = [
        //              {
        //             name: "Dial Soap",
        //             quantity: "18",
        //             purchaseDate: "11/30/2022"
        //           }
        //         ];

        //         req.body = [
        //           {
        //          name: "dial soap",
        //          quantity: "22",
        //          purchaseDate: "12/3/2022"
        //        }
        //      ];

        //      res.body = [
        //       {
        //         acknowledged: true, modifiedCount: 1
        //    }
        //  ];

        //         const finderMock = query => {
        //           console.log(query.getQuery().name)
        //             if (query.getQuery().name === "Dial Soap") {
        //               return req.params;
        //             }
        //             return [];
        //           };
        //         mockingoose(hygiene).toReturn(finderMock, "findOne").toReturn(res.body, "save");

        req.params = { name: "Dial Soap" };

        req.body = [
          {
            acknowledged: true,
            modifiedCount: 1
          }
        ];

        const finderMock = (query) => {
          console.log(query.getQuery().name);
          if (query.getQuery().name === "Dial Soap") {
            return req.body;
          }
          return { acknowledged: true, modifiedCount: 0 };
        };

        mockingoose(Hygiene).toReturn(finderMock, "updateOne");
      });

      it("responds with 204", async () => {
        await hygieneController.updateHygiene(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
      });

      it("responds with successful updated hygiene item", async () => {
        await hygieneController.updateHygiene(req, res);

        console.log("2. assertion");
        expect(send).toHaveBeenCalledWith(expect.objectContaining(req.body));
      });
    });
    describe("when the hygiene item gets updated and is invalid", () => {
      beforeEach(() => {
        req.body = {
          name: "Dial Soaps",
          quantity: "20"
        };
      });

      it("responds with 422", async () => {
        await hygieneController.createNewHygiene(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
      });

      it("responds with a validation error", async () => {
        await hygieneController.createNewHygiene(req, res);

        expect(send).toHaveBeenCalledWith({
          message: "hygiene validation failed: purchaseDate: Path `purchaseDate` is required."
        });
      });
    });
  });
});
// });

///// deletehygieneItem /////
describe("deleteHygiene()", () => {
  describe("when there is no user present", () => {
    beforeEach(() => (req.user = undefined));

    it("responds with 401", () => {
      hygieneController.deleteHygiene(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
      hygieneController.deleteHygiene(req, res);

      expect(send).toHaveBeenCalledWith("Not Authenticated");
    });
  });
  describe("when there is a user present", () => {
    beforeEach(() => {
      req.user = {
        identifier: "testUser"
      };
    });

    describe("when Hygiene item gets deleted and is valid", () => {
      beforeEach(() => {
        req.params = { name: "dial soap" };

        res.body = [{ acknowledged: true, deletedCount: 1 }];

        const finderMock = (query) => {
          // console.log(query.getQuery().name);
          if (query.getQuery().name === "dial soap") {
            // console.log(req.body)
            return res.body;
          }
          return { acknowledged: false, deletedCount: 0 };
        };
        mockingoose(Hygiene).toReturn(finderMock, "deleteOne");
      });

      it("responds with 200", async () => {
        await hygieneController.deleteHygiene(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("responds with successful deleted Hygiene item", async () => {
        await hygieneController.deleteHygiene(req, res);

        expect(send).toHaveBeenCalledWith(expect.objectContaining(res.body));
        // console.log('===>>>', send)
      });
    });
  });
});
