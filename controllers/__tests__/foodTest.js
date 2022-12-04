const foodController = require("../food");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const Food = require("../../models/food");
const food = require("../../models/food");

let req, res, send;

beforeEach(() => {
  send = jest.fn();
  req = {};
  res = {
    status: jest.fn(() => ({ send })),
    json: jest.fn()
  };
});

//GET ALL
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
          // data = [
          //   {
          //     foodName: "pasta",
          //     brandName: "Great Value",
          //     quanitity: "10",
          //     purchaseDate: "12/25/2000",
          //     expirationDate: "12/25/2010",
          //     orderNextByDate: "12/25/2009",
          //     description: "It is pasta"
          //   }
          // ];
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



// GET BY NAME
describe("getFoodByfoodName()", () => {
  describe("when there is no user present", () => {
    beforeEach(() => ((req.user = undefined), (req.foodName = undefined)));

    it("responds with 401", () => {
      foodController.getFoodByfoodName(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
      foodController.getFoodByfoodName(req, res);

      expect(send).toHaveBeenCalledWith("Not Authenticated");
    });
  });
  describe("when there is a user present", () => {
    beforeEach(() => {
      req.user = {
        identifier: "testUser"
      };
    });


    describe("when food item by name exists", () => {
        beforeEach(() => {
            req.params = { foodName: "pasta" }

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

            const finderMock = query => {          
                if (query.getQuery().foodName === "pasta") {
                  return data;
                }
                return [];
              }; 
            mockingoose(food).toReturn(finderMock, "find");
          });

      it("responds with 200", async () => {
        await foodController.getFoodByfoodName(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("responds with food item matching the name parameter", async () => {
        await foodController.getFoodByfoodName(req, res);

        expect(send).toHaveBeenCalledWith(expect.objectContaining(data[0]));
      });
    });
  });
});


// CREATE
describe("createNewFoodItem()", () => {
  describe("when there is no user present", () => {
    beforeEach(() => (req.user = undefined));

    it("responds with 401", () => {
      foodController.createNewFoodItem(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
      foodController.createNewFoodItem(req, res);

      expect(send).toHaveBeenCalledWith("Not Authenticated");
    });
  });
  describe("when there is a user present", () => {
    beforeEach(() => {
      req.user = {
        identifier: "testUser",
      };
    });

    describe("when user creates a food post and is valid", () => {
      beforeEach(() => {
          req.body = {
            foodName: "pasta",
            brandName: "Great Value",
            quanitity: "10",
            purchaseDate: "12/25/2000",
            expirationDate: "12/25/2010",
            orderNextByDate: "12/25/2009",
            description: "It is pasta"
            };
            mockingoose(Food).toReturn(req.body, "save");
      });

      it("responds with 201", async () => {
        await foodController.createNewFoodItem(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
      });

      it("responds with food post", async () => {
        await foodController.createNewFoodItem(req, res);

        expect(send).toHaveBeenCalledWith(expect.objectContaining(req.body));
      });
    });
  });
});


// UPDATE

// describe("updateFoodItem()", () => {
//   describe("when there is no user present", () => {
//     beforeEach(() => ((req.user = undefined)));

//     it("responds with 401", () => {
//       foodController.updateFoodItem(req, res);

//       expect(res.status).toHaveBeenCalledWith(401);
//     });

//     it("responds with 'Not Authenticated'", () => {
//       foodController.updateFoodItem(req, res);

//       expect(send).toHaveBeenCalledWith("Not Authenticated");
//     });
//   });
//   describe("when there is a user present", () => {
//     beforeEach(() => {
//       req.user = {
//         identifier: "testUser"
//       };
//     });

//     describe("when food item exists", () => {
//         beforeEach(() => {
//             req.params = { name: "pasta" }

//             data = [
//                  {
//                   foodName: "pasta",
//                   brandName: "Great Value",
//                   quanitity: "10",
//                   purchaseDate: "12/25/2000",
//                   expirationDate: "12/25/2010",
//                   orderNextByDate: "12/25/2009",
//                   description: "It is pasta"
//               }
//             ];

//             req.body = [
//               {
//                 foodName: "pasta",
//                 brandName: "Great Value",
//                 quanitity: "10",
//                 purchaseDate: "12/25/2000",
//                 expirationDate: "12/25/2010",
//                 orderNextByDate: "12/25/2009",
//                 description: "It is pasta"
//            }
//          ];

//             const finderMock = query => {          
//                 if (query.getQuery().name === "pasta") {
//                   return data;
//                 }
//                 return [];
//               }; 
//             mockingoose(Food).toReturn(finderMock, "findOne").toReturn(req.body, "save");
//           });

//       it("responds with 200", async () => {
//         await foodController.updateFoodItem(req, res);

//         expect(res.status).toHaveBeenCalledWith(200);
//       });

//       it("responds with food item matching the name parameter", async () => {
//         await foodController.updateFoodItem(req, res);

//         expect(send).toHaveBeenCalledWith(expect.objectContaining(req.body));
//       });
//     });
//   });
// });




// DELETE


describe("deleteFoodItem()", () => {
  describe("when there is no user present", () => {
    beforeEach(() => ((req.user = undefined)));

    it("responds with 401", () => {
      foodController.deleteFoodItem(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
      foodController.deleteFoodItem(req, res);

      expect(send).toHaveBeenCalledWith("Not Authenticated");
    });
  });
  describe("when there is a user present", () => {
    beforeEach(() => {
      req.user = {
        identifier: "testUser"
      };
    });

    describe("when food item exists", () => {
      beforeEach(() => {
          req.params = { foodName: "pasta" }

          res.body = [
              { acknowledged: true, deletedCount: 1 }
          ];

          const finderMock = query => {     
              // console.log(query.getQuery().name);     
              if (query.getQuery().foodName === "pasta") {
                  // console.log(req.body)
                  return res.body;
              }
              return { acknowledged: false, deletedCount: 0 };
              }; 
              mockingoose(Food).toReturn(finderMock, "deleteOne");
          });

      it.only("responds with 200", async () => {
        await foodController.deleteFoodItem(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it.only("responds with food item matching the name parameter", async () => {
        await foodController.deleteFoodItem(req, res);

        expect(send).toHaveBeenCalledWith(expect.objectContaining(res.body));
        console.log('===>>>', send)
      });
    });
  });
});
