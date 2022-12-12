const hygieneController = require("../hygiene");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const Hygiene = require("../../models/hygiene");
const { query } = require("express");

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
        // data = [];
        mockingoose(Hygiene).toReturn([], "find");
      });

      it("responds with 200", async () => {
        await hygieneController.getAllHygienes(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("responds with an empty array", async () => {
        await hygieneController.getAllHygienes(req, res);

        expect(send).toHaveBeenCalledWith([]);
      });

      describe("when hygiene items exist", () => {
        beforeEach(() => {
          // data = [
          //   {
          //     name: "Dial Soap",
          //     quantity: "18",
          //     purchaseDate: "11/30/2022"
          //   }
          // ];

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

describe("getHygieneByName()", () => {
  describe("when there is no user present", () => {
    beforeEach(() => (req.user = undefined));

    it.only("responds with 401", () => {
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

    describe("when hygiene item exists", () => {
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

      it("responds with hygiene item matches requested parameter", async () => {
        await hygieneController.getHygieneByName(req, res);
        //console.log("2. Doing the assertion with 'expect");
        expect(send).toHaveBeenCalledWith(expect.objectContaining(data[0]));
      });
    });
  });
});

describe("createNewHygiene())", () => {
  describe("when there is no user present", () => {
    beforeEach(() => (req.user = undefined));

    it.only("responds with 401", () => {
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

    describe("Occurs when user creates a new Hygiene post", () => {
      beforeEach(() => {
        req.body = {
          name: "Dial Soap",
          quantity: "18",
          purchaseDate: "11/30/2022"
        };
        mockingoose(Hygiene).toReturn(req.body, "save");
      });

      it("responds with 201", async () => {
        await hygieneController.createNewHygiene(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
      });

      it("responds with new Hygiene post", async () => {
        await hygieneController.createNewHygiene(req, res);

        expect(send).toHaveBeenCalledWith(expect.objectContaining(req.body));
      });
    });
  });
});

describe("updateHygiene()", () => {
  describe("when there is no user present", () => {
    beforeEach(() => (req.user = undefined));

    it.only("responds with 401", () => {
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

    describe("when hygiene item exists", () => {
      beforeEach(() => {
        req.params = { name: "Dial Soap" };

        data = [
          {
            name: "Dial Soap",
            quantity: "18",
            purchaseDate: "11/30/2022"
          }
        ];

        req.body = [
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
        await hygieneController.updateHygiene(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("responds with hygiene item matches requested parameter", async () => {
        await hygieneController.updateHygiene(req, res);
        //console.log("2. Doing the assertion with 'expect");
        expect(send).toHaveBeenCalledWith(expect.objectContaining(data[0]));
      });
    });
  });
});

describe("deleteHygiene())", () => {
  describe("when there is no user present", () => {
    beforeEach(() => (req.user = undefined));

    it.only("responds with 401", () => {
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

    describe("Occurs when Hygiene item exists", () => {
      beforeEach(() => {
        req.params = { name: "Dial Soap" };

        res.body = [{ acknowledge: true, deleteCount: 1 }];

        const finderMock = (query) => {
          if (query.getQuery().name === "Dial Soap") {
            return data;
          }
          return [];
        };

        mockingoose(Hygiene).toReturn(req.body, "save");
      });

      it("responds with 200", async () => {
        await hygieneController.deleteHygiene(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("responds with hygiene item matches", async () => {
        await hygieneController.createNewHygiene(req, res);

        expect(send).toHaveBeenCalledWith(expect.objectContaining(req.body));
      });
    });
  });
});
