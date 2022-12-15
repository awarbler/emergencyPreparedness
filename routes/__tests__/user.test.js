const userRouter = require("../user");
const routesFor = require("./routesFor");

const routes = routesFor(userRouter);

describe("routes", () => {
  describe("/", () => {
    it("supports http GET request", () => {
      expect(routes["/"]).toContain("get");
    });
  });
});

describe("/:email", () => {
  it("supports http GET request", () => {
    expect(routes["/"]).toContain("get");
  });

  it("supports http Put request", () => {
    expect(routes["/:email"]).toContain("put");
  });

  it("supports http DELETE request", () => {
    expect(routes["/:email"]).toContain("delete");
  });
});
