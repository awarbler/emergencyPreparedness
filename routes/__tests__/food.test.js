const foodRouter = require("../food");
const routesFor = require("./routesFor");
const routes = routesFor(foodRouter);

describe("routes", () => {
  describe("/", () => {
    it("GET request", () => {
      expect(routes["/"]).toContain("get");
    });

    it("POST request", () => {
      expect(routes["/"]).toContain("post");
    });
  });

  describe("/:foodName", () => {
    it("GET request", () => {
      expect(routes["/:foodName"]).toContain("get");
    });

    it("PUT request", () => {
      expect(routes["/:foodName"]).toContain("put");
    });

    it("DELETE request", () => {
      expect(routes["/:foodName"]).toContain("delete");
    });
  });
});
