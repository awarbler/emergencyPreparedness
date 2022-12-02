const foodController = require("../food");
const mongoose = require("mongoose");


let req, res, send;


beforeEach(() => {
    send = jest.fn();
    req = {};
    res =  {
        status: jest.fn(() => ({send})),
        json: jest.fn(),
    };
});



describe("getAllFood()", () => {
    describe("when there is no user", () => {
        beforeEach(()  => (req.user = undefined));
        
        it("responds with 401", () => {
            foodController.index(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
        });

        it("responds with 'Not Authenticated'",() => {
            foodController.index(req,res);

            expect(send).toHaveBeenCalledWith("Not Authenticated");
        });
    });

    describe("when there is a user present",() => {
        beforeEach(() => {
            req.user = {
                identifer: "testUser",
            };
        });

    })


});