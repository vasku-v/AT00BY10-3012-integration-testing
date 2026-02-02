// hex2rgb.js

/**
 * Converts a hexadecimal color string to an RGB object.
 * 
 * Accepts both 3-character and 6-character hex formats, with or without
 * a leading "#" symbol.
 * 
 * @param {string} hex - The hexadecimal color value (e.g. "#fff", "ffffff").
 * @returns {{ r: number, g: number, b: number }} An object containing the 
 *          red, green and blue values in the range 0-255.
 * @throws {Error} If the input is not a string.
 * @throws {Error} If the cleaned hex value is not 3 or 6 characters long.
 * @throws {Error} If the hex string contains invalid characters.
 * 
 * @example
 * hexToRgb("#041627");
 * // -> { r: 4, g: 22, b: 39 }
 * 
 * @example
 * hexToRgb("f3f")
 * // -> { r: 255, g: 51, b: 255 }
 */

function hexToRgb(hex) {

    if (typeof hex !== "string") {
        throw new Error("Hex value must be a string");
    }

    hex = hex.replace("#", "")

    if (hex.length !== 3 && hex.length !== 6) {
        throw new Error("Hex value must be 3 or 6 characters long after #-sign");
    }

    if (!/^[0-9A-Fa-f]+$/.test(hex)) {
        throw new Error("Hex value contains invalid characters.");
    }

    let r, g, b;

    if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
    }
    else {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
    }

    return { r, g, b };
}

module.exports = { hexToRgb };