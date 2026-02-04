/**
 * @file hex2rgb.test.js
 * @description Unit tests for the hex2rgb function.
 * This test suite verifies correct hexadecimal-to-RGB conversion
 * (both 3- and 6-digit formats, with or without a leading '#') and ensures
 * that invalid inputs throw the appropriate errors.
 * 
 * @module test/hex2rgb
 */

const { expect } = require("chai");
const { hexToRgb } = require("../src/hex2rgb");

describe("hex2rgb.js", () => {
    /**
     * Runs once before all tests in this suite
     */
    before(() => {
        console.log("Testing starting...");
    });

    /**
     * Runs once after all tests in this suite
     */
    after(() => {
        console.log("Testing completed.");
    });

    /**
     * Test suite for the hexToRgb() function.
     */
    describe("hexToRgb()", () => {
        /**
         * Verifies conversion of a standard 6-digit hexadecimal value.
         */
        it("should convert hexadecimal color value to an RGB correctly", () => {
            expect(hexToRgb("041627")).to.deep.equal({ r: 4, g: 22, b: 39 }) 
        });

        /**
         * Verifies conversion of a shorthand 3-digit hexadecimal value.
         */
        it("should convert a 3-digit hex correctly", () => {
            expect(hexToRgb("F3F")).to.deep.equal({ r: 255, g: 51, b: 255 })
        });

        /**
         * Verifies that a leading '#' is optional.
         */
        it("should work without a leading #", () => {
            expect(hexToRgb("F29F05")).to.deep.equal({ r: 242, g: 159, b: 5 })
        });
        
        /**
         * Verifies case-insensitive handling of hexadecimal characters.  
         */
        it("should work with lowercase and uppercase letters", () => {
            expect(hexToRgb("#4a44F2")).to.deep.equal({ r: 74, g: 68, b: 242})
        });

        /**
         * Verifies that non-string input throws an appropriate error.
         */
        it("should throw an error if input is not a string", () => {
            expect(() => hexToRgb(123456)
            .to.throw("Hex value must be a string"));
        });

        /**
         * Verifies that incorrect hex length throws an appropriate error.
         */
        it("should throw an error if hex length is invalid", () => {
            expect(() => hexToRgb("#FF000")
            .to.throw("Hex value must be 3 or 6 characters long after #-sign"));
        });

        /**
         * Verifies that invalid hexadecimal characters throw an appropriate error.
         */
        it("should throw an error if hex value contains invalid characters", () => {
            expect(() => hexToRgb("#FFM051"))
            .to.throw("Hex value contains invalid characters.");
        });
    });
});