const userController = require("../user");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const User = require("../../models/user");

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
describe("getAllUsers()", () => {
  describe("when user array is empty", () => {
    beforeEach(() => {
      data = [];
      mockingoose(User).toReturn(data, "find");
    });

    it("responds with 200", async () => {
      await userController.getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("responds with an empty array", async () => {
      await userController.getAllUsers(req, res);

      expect(send).toHaveBeenCalledWith([]);
    });

    describe("when user items exist", () => {
      beforeEach(() => {
        data = [
          {
            identifier: "google-oauth2|111561996783833983363",
            email: "awoodbyui@gmail.com",
            givenName: "Anita",
            familyName: "Woodford",
            locale: "en",
            picture:
              "https://lh3.googleusercontent.com/a/ALm5wu1voZ1OAxVA0RZUe9XjIxyNzyF8FUUiCshUXRz2=s96-c"
          }
        ];
        mockingoose(User).toReturn(data, "find");
      });

      it("responds with 200", async () => {
        await userController.getAllUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("responds with Users items", async () => {
        await userController.getAllUsers(req, res);

        expect(send).toHaveBeenCalledWith([
          expect.objectContaining({
            identifier: "google-oauth2|111561996783833983363",
            email: "awoodbyui@gmail.com",
            givenName: "Anita",
            familyName: "Woodford",
            locale: "en",
            picture:
              "https://lh3.googleusercontent.com/a/ALm5wu1voZ1OAxVA0RZUe9XjIxyNzyF8FUUiCshUXRz2=s96-c"
          })
        ]);
      });
    });
  });
});

///// getHygieneItemByName /////
describe("getUserByEmail()", () => {
  describe("when user item by email exists", () => {
    beforeEach(() => {
      req.params = { email: "awoodbyui@gmail.com" };

      data = [
        {
          identifier: "google-oauth2|111561996783833983363",
          email: "awoodbyui@gmail.com",
          givenName: "Anita",
          familyName: "Woodford",
          locale: "en",
          picture:
            "https://lh3.googleusercontent.com/a/ALm5wu1voZ1OAxVA0RZUe9XjIxyNzyF8FUUiCshUXRz2=s96-c"
        }
      ];

      const finderMock = (query) => {
        if (query.getQuery().email === "awoodbyui@gmail.com") {
          return data;
        }
        return [];
      };
      mockingoose(User).toReturn(finderMock, "find");
    });

    it("responds with 200", async () => {
      await userController.getUserByEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("responds with Hygiene item matching the email parameter", async () => {
      await userController.getUserByEmail(req, res);

      expect(send).toHaveBeenCalledWith(expect.objectContaining(data[0]));
    });
  });
});
// });

///// updateUser /////
describe("updateUser()", () => {
  // describe("when user item exists", () => {
  //   beforeEach(() => {
  //     req.params = { email: "Dial Soap" };

  //     data = [
  //       {
  //         email: "Dial Soap",
  //         quantity: "18",
  //         purchaseDate: "11/30/2022"
  //       }
  //     ];

  //     res.body = [
  //       {
  //         email: "dial soap",
  //         quantity: "22",
  //         purchaseDate: "12/3/2022"
  //       }
  //     ];

  //     const finderMock = (query) => {
  //       console.log(query.getQuery().email);
  //       if (query.getQuery().email === "Dial Soap") {
  //         return data;
  //       }
  //       return [];
  //     };
  //     mockingoose(user).toReturn(finderMock, "findOne").toReturn(res.body, "save");

  //         res.body = [
  //           {
  //          email: "dial soap",
  //          quantity: "22",
  //          purchaseDate: "12/3/2022"
  //        }
  //      ];

  //         mockingoose(user).toReturn(res.body, "updateOne");
  //   });
  describe("when user item gets updated and is valid", () => {
    beforeEach(() => {
      //       req.params = { email: "Dial Soap" }

      //         data = [
      //              {
      //             email: "Dial Soap",
      //             quantity: "18",
      //             purchaseDate: "11/30/2022"
      //           }
      //         ];

      //         req.body = [
      //           {
      //          email: "dial soap",
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
      //           console.log(query.getQuery().email)
      //             if (query.getQuery().email === "Dial Soap") {
      //               return req.params;
      //             }
      //             return [];
      //           };
      //         mockingoose(user).toReturn(finderMock, "findOne").toReturn(res.body, "save");

      req.params = { email: "awoodbyui@gmail.com" };

      req.body = [
        {
          acknowledged: true,
          modifiedCount: 1
        }
      ];

      const finderMock = (query) => {
        console.log(query.getQuery().email);
        if (query.getQuery().email === "awoodbyui@gmail.com") {
          return req.body;
        }
        return { acknowledged: true, modifiedCount: 0 };
      };

      mockingoose(User).toReturn(finderMock, "updateOne");
    });

    it("responds with 204", async () => {
      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
    });

    it("responds with successful updated User item", async () => {
      await userController.updateUser(req, res);

      console.log("2. assertion");
      expect(send).toHaveBeenCalledWith(expect.objectContaining(req.body));
    });
  });
  // describe("when the user item gets updated and is invalid", () => {
  //   beforeEach(() => {
  //     req.body = {
  //       email: "awoodbyui@gmail.com",
  //       givenName: "Anita",
  //       familyName: "Woodford",
  //       locale: "en"
  //     };
  //   });

  //   it.only("responds with 422", async () => {
  //     await userController.updateUser(req, res);

  //     expect(res.status).toHaveBeenCalledWith(422);
  //   });

  //   it.only("responds with a validation error", async () => {
  //     await userController.updateUser(req, res);

  //     // expect(send).toHaveBeenCalledWith({
  //     //   message: "User validation failed: purchaseDate: Path `purchaseDate` is required."
  //     // });
  //     expect(send).toHaveBeenCalledWith({
  //       message: "users validation failed: picture: Path `picture` is required."
  //     });
  //   });
  // });
});
// });

// });

///// deleteUserItem /////
describe("deleteUser()", () => {
  describe("when there is a user present", () => {
    beforeEach(() => {
      req.user = {
        identifier: "testUser"
      };
    });
    describe("when User item gets deleted and is valid", () => {
      beforeEach(() => {
        req.params = { email: "awoodbyui@gmail.com" };

        res.body = [{ acknowledged: true, deletedCount: 1 }];

        const finderMock = (query) => {
          // console.log(query.getQuery().email);
          if (query.getQuery().email === "awoodbyui@gmail.com") {
            // console.log(req.body)
            return res.body;
          }
          return { acknowledged: false, deletedCount: 0 };
        };
        mockingoose(User).toReturn(finderMock, "deleteOne");
      });

      it("responds with 200", async () => {
        await userController.deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("responds with successful deleted User item", async () => {
        await userController.deleteUser(req, res);

        expect(send).toHaveBeenCalledWith(expect.objectContaining(res.body));
        // console.log('===>>>', send)
      });
    });
  });
});
