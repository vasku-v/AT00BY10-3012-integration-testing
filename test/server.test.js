/**
 * @file server.test.js
 * @description Integration test for the Hex-to-RGB API.
 * Uses Supertest for HTTP requests and Chai for assertions.
 */

const request = require("supertest");
const expect = require("chai").expect;

/**
 * Ensure the server exports the Express app instead of starting
 * a HTTP listener.
 */
process.env.NODE_ENV = "test";
const app = require("../src/server");

/**
 * Integration test suite for the Hex-to-RGB API.
 * Verifies route availability, valid hex parsing,
 * supported formats, and proper error handling.
 */
describe("Hex-to-Rgb API", () => {
    /**
     * Verifies that the root route is reachable and responds correctly.
     */
    it("responds to the root route", async () => {
        const res = await request(app).get("/");
        expect(res.status).to.equal(200);
        expect(res.text).to.equal("Hello!");
    });

    /**
     * Ensures the /hexToRgb endpoint responds with HTTP 200
     * when provided a valid hex query parameter.
     */
    it("returns status 200 for /hexToRgb", async () => {
        const res = await request(app).get("/hexToRgb?hex=00FF00");
        expect(res.status).to.equal(200);
    });

    /**
     * Confirms that a valid 6-digit hex value is converted
     * into an RGB object returned as JSON
     */
    it("return RGB values in JSON form", async () => {
        const res = await request(app).get("/hexToRgb?hex=FF008C");
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal({ r: 255, g: 0, b: 140 });
    });

    /**
     * Verifies that hex values prefixed with "#" are accepted.
     */
    it("accepts hex values starting with #", async () => {
        const res = await request(app).get("/hexToRgb?hex=%23FF008C");
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal({ r: 255, g: 0, b: 140 });
    });

    /**
     * Verifies that lowercase hex values are accepted.
     */
    it("accepts lowercase hex format", async () => {
        const res = await request(app).get("/hexToRgb?hex=58a0a1");
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal({ r: 88, g: 160, b: 161 });
    });

    /**
     * Verifies that 3-digit hex values are accepted.
     */
    it("accepts 3-digit hex", async () => {
        const res = await request(app).get("/hexToRgb?hex=FFF");
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal({ r: 255, g: 255, b: 255 });
    });

    /**
     * Ensures an invalid hex string containing non-hex characters
     * results in a 400 error response.
     */
    it("throws an error if the hex format is invalid", async () => {
        const res = await request(app).get("/hexToRgb?hex=ff7g89");
        expect(res.status).to.equal(400);
        expect(res.body).to.deep.equal({ error: "invalid hex format" });
    });

    /**
     * Ensures hex values with an invalid length result in a 400
     * error response.
     */
        it("throws an error if the hex length is invalid", async () => {
        const res = await request(app).get("/hexToRgb?hex=337A374");
        expect(res.status).to.equal(400);
        expect(res.body).to.deep.equal({ error: "invalid hex format" });
    });
});