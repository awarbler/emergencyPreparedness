const firstAidController = require("../firstAid");
const mongoose = require("mongoose");

let req, res, send;

beforeEach(() => {
    send = jest.fn();

    req = {};
    res = {
        status: jest.fn(() => ({ send })),
        json: jest.fn(),
    };
});

describe("getAllFirstAidItems()", () => {
    describe("when there is no user present", () => {
        beforeEach(() => (req.user = undefined));
    });

    it("responds with 401",  () => {
        firstAidController.getAllFirstAidItems(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
        firstAidController.getAllFirstAidItems(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
    });
});

describe("when there is a user present", () => {
    beforeEach(() => {
        req.user = {
            identifier: "testUser",
        };
    });

    describe("")
});