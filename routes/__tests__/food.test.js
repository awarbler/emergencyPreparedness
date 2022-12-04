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
    

    describe("/:name", () => {
        it("GET request", () => {
            expect(routes["/:name"]).toContain("get");
        });
    
        it("PUT request", () => {
            expect(routes["/:name"]).toContain("put");
        });

        it("DELETE request", () => {
            expect(routes["/:name"]).toContain("delete");
        });
    });
})