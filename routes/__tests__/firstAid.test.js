const { route } = require("../firstAid");
const firstAidRouter = require("../firstAid");
const routesFor = require("./routesFor");

describe("routes", () => {
    it("testing routes with console.log", () => {
        // console.log(firstAidRouter);
        // console.log(firstAidRouter.stack[1].route);
        // routesFor(firstAidRouter);
        console.log(routesFor(firstAidRouter));
    })
})