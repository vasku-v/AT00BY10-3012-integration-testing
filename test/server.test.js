// server.test.js

const request = require("supertest");
const expect = require("chai").expect;

process.env.NODE_ENV = "test"; // ensure server exports app
const app = require("../src/server");

/**
 * Integration test for the Hex-to-Rgb API.
 * Uses Supertest for HTTP requests and Chai for assertions.
 */
describe("Hex-to-Rgb API", () => {
    it("responds to the root route", async () => {
        const res = await request(app).get("/");
        expect(res.status).to.equal(200);
        expect(res.text).to.equal("Hello!");
    });

    it("returns status 200 for /hexToRgb", async () => {
        const res = await request(app).get("/hexToRgb?hex=00FF00");
        expect(res.status).to.equal(200);
    });

    it("return RGB values in JSON form", async () => {
        const res = await request(app).get("/hexToRgb?hex=FF008C");
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal({ r: 255, g: 0, b: 140 });
    });

    it("accepts hex values starting with #", async () => {
        const res = await request(app).get("/hexToRgb?hex=%23FF008C");
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal({ r: 255, g: 0, b: 140 });
    });

    it("accepts lowercase hex format", async () => {
        const res = await request(app).get("/hexToRgb?hex=58a0a1");
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal({ r: 88, g: 160, b: 161 });
    });

    it("accepts 3-digit hex", async () => {
        const res = await request(app).get("/hexToRgb?hex=FFF");
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal({ r: 255, g: 255, b: 255 });
    });

    it("throws an error if the hex format is invalid", async () => {
        const res = await request(app).get("/hexToRgb?hex=ff7g89");
        expect(res.status).to.equal(400);
        expect(res.body).to.deep.equal({ error: "invalid hex format" });
    });

        it("throws an error if the hex length is invalid", async () => {
        const res = await request(app).get("/hexToRgb?hex=337A374");
        expect(res.status).to.equal(400);
        expect(res.body).to.deep.equal({ error: "invalid hex format" });
    });
});