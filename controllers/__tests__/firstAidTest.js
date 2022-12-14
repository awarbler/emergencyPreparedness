const firstAidController = require("../firstAid");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const FirstAid = require("../../models/firstAid");

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
        data = [];
        mockingoose(FirstAid).toReturn(data, "find");
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
          data = [
              {
                  name: "BandAid",
                  quantity: "18",
                  purchaseDate: "11/30/2022",
              }
          ];

          mockingoose(FirstAid).toReturn(data, "find");
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

    describe("when firstAid item by name exists", () => {
      beforeEach(() => {
        req.params = { name: "BandAid" };

        data = [
          {
            name: "BandAid",
            quantity: "18",
            purchaseDate: "11/30/2022"
          }
        ];

        const finderMock = (query) => {
          if (query.getQuery().name === "BandAid") {
            return data;
          }
          return [];
        };
        mockingoose(FirstAid).toReturn(finderMock, "find");
      });

      it("responds with 200", async () => {
        await firstAidController.getFirstAidItemByName(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("responds with firstAid item matching the name parameter", async () => {
        await firstAidController.getFirstAidItemByName(req, res);

        expect(send).toHaveBeenCalledWith(expect.objectContaining(data[0]));
      });
    });
  });
});
// });

///// createNewFirstAidItem() /////
describe("createNewFirstAidItem()", () => {
  describe("when there is no user present", () => {
    beforeEach(() => (req.user = undefined));

    it("responds with 401", () => {
      firstAidController.createNewFirstAidItem(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
      firstAidController.createNewFirstAidItem(req, res);

      expect(send).toHaveBeenCalledWith("Not Authenticated");
    });
  });
  describe("when there is a user present", () => {
    beforeEach(() => {
      req.user = {
        identifier: "testUser",
      };
    });

    describe("when user creates a firstAid post and is valid", () => {
      beforeEach(() => {
        req.body = {
          name: "BandAids",
          quantity: "20",
          purchaseDate: "12/2/2022"
        };
        mockingoose(FirstAid).toReturn(req.body, "save");
      });

      it("responds with 201", async () => {
        await firstAidController.createNewFirstAidItem(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
      });

      it("responds with firstAid post", async () => {
        await firstAidController.createNewFirstAidItem(req, res);

        expect(send).toHaveBeenCalledWith(expect.objectContaining(req.body));
      });
    });
    describe("when user creates a firstAid post and is invalid", () => {
      beforeEach(() => {
        req.body = {
          name: "BandAids",
          quantity: "20",
        };

      });

      it("responds with 422", async () => {
        await firstAidController.createNewFirstAidItem(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
      });

      it("responds with a validation error", async () => {
        await firstAidController.createNewFirstAidItem(req, res);
  
        expect(send).toHaveBeenCalledWith({"message": "first-aids validation failed: purchaseDate: Path `purchaseDate` is required."});
      });
    });
  });
});

///// updateFirstAidItem /////
describe("updateFirstAidItem()", () => {
  describe("when there is no user present", () => {
    beforeEach(() => (req.user = undefined));

    it("responds with 401", () => {
      firstAidController.updateFirstAidItem(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
      firstAidController.updateFirstAidItem(req, res);

      expect(send).toHaveBeenCalledWith("Not Authenticated");
    });
  });
  describe("when there is a user present", () => {
    beforeEach(() => {
      req.user = {
        identifier: "testUser"
      };
    });

    // describe("when firstAid item exists", () => {
    //   beforeEach(() => {
    //     req.params = { name: "BandAid" };

    //     data = [
    //       {
    //         name: "BandAid",
    //         quantity: "18",
    //         purchaseDate: "11/30/2022"
    //       }
    //     ];

    //     res.body = [
    //       {
    //         name: "Band-aid",
    //         quantity: "22",
    //         purchaseDate: "12/3/2022"
    //       }
    //     ];

    //     const finderMock = (query) => {
    //       console.log(query.getQuery().name);
    //       if (query.getQuery().name === "BandAid") {
    //         return data;
    //       }
    //       return [];
    //     };
    //     mockingoose(FirstAid).toReturn(finderMock, "findOne").toReturn(res.body, "save");

    //         res.body = [
    //           {
    //          name: "Band-aid",
    //          quantity: "22",
    //          purchaseDate: "12/3/2022"
    //        }
    //      ];

    //         mockingoose(FirstAid).toReturn(res.body, "updateOne");
    //   });
  
      describe("when firstAid item gets updated and is valid", () => {
          beforeEach(() => {
      //       req.params = { name: "BandAid" }
  
      //         data = [
      //              {
      //             name: "BandAid",
      //             quantity: "18",
      //             purchaseDate: "11/30/2022"
      //           }
      //         ];

      //         req.body = [
      //           {
      //          name: "Band-aid",
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
      //             if (query.getQuery().name === "BandAid") {
      //               return req.params;
      //             }
      //             return [];
      //           }; 
      //         mockingoose(FirstAid).toReturn(finderMock, "findOne").toReturn(res.body, "save");

          req.params = { name: "BandAid" };

              req.body = [
                {
                  acknowledged: true, modifiedCount: 1
             }
           ];

           const finderMock = query => {   
                  console.log(query.getQuery().name)       
                    if (query.getQuery().name === "BandAid") {
                      return req.body;
                    }
                    return { acknowledged: true, modifiedCount: 0 };
                  }; 
           
              mockingoose(FirstAid).toReturn(finderMock, "updateOne");
            });
  
        it("responds with 204", async () => {
          await firstAidController.updateFirstAidItem(req, res);
  
          expect(res.status).toHaveBeenCalledWith(204);
        });
  
        it("responds with successful updated firstAid item", async () => {
          await firstAidController.updateFirstAidItem(req, res);
          
          console.log("2. assertion")
          expect(send).toHaveBeenCalledWith(expect.objectContaining(req.body));
        });
      });
      describe("when the firstAid item gets updated and is invalid", () => {
        beforeEach(() => {
          req.body = {
            name: "BandAids",
            quantity: "20",
          };
  
        });
  
        it("responds with 422", async () => {
          await firstAidController.createNewFirstAidItem(req, res);
  
          expect(res.status).toHaveBeenCalledWith(422);
        });
  
        it("responds with a validation error", async () => {
          await firstAidController.createNewFirstAidItem(req, res);
    
          expect(send).toHaveBeenCalledWith({"message": "first-aids validation failed: purchaseDate: Path `purchaseDate` is required."});
        });
      });
    });
  });
// });

///// deleteFirstAidItem /////
describe("deleteFirstAidItem()", () => {
  describe("when there is no user present", () => {
    beforeEach(() => (req.user = undefined));

    it("responds with 401", () => {
      firstAidController.deleteFirstAidItem(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
      firstAidController.deleteFirstAidItem(req, res);

      expect(send).toHaveBeenCalledWith("Not Authenticated");
    });
  });
  describe("when there is a user present", () => {
    beforeEach(() => {
      req.user = {
        identifier: "testUser"
      };
    });

    describe("when firstAid item gets deleted and is valid", () => {
      beforeEach(() => {
        req.params = { name: "Band-aid" };

        res.body = [{ acknowledged: true, deletedCount: 1 }];

        const finderMock = (query) => {
          // console.log(query.getQuery().name);
          if (query.getQuery().name === "Band-aid") {
            // console.log(req.body)
            return res.body;
          }
          return { acknowledged: false, deletedCount: 0 };
        };
        mockingoose(FirstAid).toReturn(finderMock, "deleteOne");
      });

      it("responds with 200", async () => {
        await firstAidController.deleteFirstAidItem(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("responds with successful deleted firstAid item", async () => {
        await firstAidController.deleteFirstAidItem(req, res);

        expect(send).toHaveBeenCalledWith(expect.objectContaining(res.body));
        // console.log('===>>>', send)
      });
    });
  });
});
