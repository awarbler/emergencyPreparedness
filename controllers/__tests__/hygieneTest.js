const hygieneController = require("../hygiene.js");
const mongoose = require("mongoose");

let req, res, send;

beforeEach(() => {
    send = jest.fn();

    req = {};
    res ={
        status: jest.fn(() => ({ send })),
        json: jest.fn()
    };
});
describe ("getAllHygienes()",() => {
    describe (" a list of all hygiene assigned to a user",() => {
        beforeEach(() => (req.user = underfined));

        it ("responds with 401", () => {
            hygiene.index(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
        });
        it("responds with 'Not Authenticated", () => {
            hygieneController.index(req, res);
            expect(send).toHaveBeenCalledWith("Not Authenticated");
        });
    });
    describe ("when there is a user present", () => {
        beforeEach(() => {
            req.user = {
                identifier: "testUser",
            };
        });
        // describe("when the user has no hygiene items", () => {
        //     beforeEach(() => (
        //         req.user = underfined));

        //     it("responds with 401", () => {
        //         hygieneC
        //     })

        // })

        
    });

});
