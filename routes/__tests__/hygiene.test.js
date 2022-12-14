const hygieneRouter = require("../hygiene");
const routesFor = require("./routesFor");

const routes = routesFor(hygieneRouter);

describe("routes", () => {
  describe("/", () => {
    it("supports http GET request", () => {
      expect(routes["/"]).toContain("get");
    });

    it("supports http POST request", () => {
      expect(routes["/"]).toContain("post");
    });
  });

  describe("/:name", () => {
    it("supports http GET request", () => {
      expect(routes["/"]).toContain("get");
    });

    it("supports http Put request", () => {
      expect(routes["/:name"]).toContain("put");
    });

    it("supports http DELETE request", () => {
      expect(routes["/:name"]).toContain("delete");
    });
  });
});
