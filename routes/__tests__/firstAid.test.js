const firstAidRouter = require("../firstAid");
const routesFor = require("./routesFor");

const routes = routesFor(firstAidRouter);

describe("routes", () => {
    // it("testing routes with console.log", () => {
    //     console.log(firstAidRouter);
    //     console.log(firstAidRouter.stack[1].route);
    //     routesFor(firstAidRouter);
    //     console.log(routesFor(firstAidRouter));
    // })
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
            expect(routes["/:name"]).toContain("get");
        });
    
        it("supports http PUT request", () => {
            expect(routes["/:name"]).toContain("put");
        });

        it("supports http DELETE request", () => {
            expect(routes["/:name"]).toContain("delete");
        });
    });
    
})