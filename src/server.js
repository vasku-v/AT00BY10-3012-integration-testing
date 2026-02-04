/**
 * @file server.js
 * @description REST API server providing a Hex-to-RGB conversion endpoint.
 * Built with Express. Exposes the app instances for testing.
 */

const express = require("express");
const hexToRgbLib = require("./hex2rgb");
const app = express();
const port = 3000;

/**
 * Root route.
 * Used a a health check to confirm the server is running.
 */
app.get("/", (req, res) => {
    res.send("Hello!")
});

/**
 * Converts a hexadecimal color value to its RGB representation.
 * 
 * @route GET /hexToRgb
 * @queryparam {string} hex - Hexadecimal color value to convert.
 * @returns {{r: number, g: number, b: number}} - RGB color object.
 * 
 * @throws {400} - If the hex query parameter is missing.
 * @throws {400} - If the hex value format is invalid.
 */

app.get("/hexToRgb", (req, res) => {
    const hex = req.query.hex;

    if (!hex) {
        return res.status(400).json({ error: "hex parameter missing "});
    }

    try {
        return res.json(hexToRgbLib.hexToRgb(hex))
    } catch (err) {
        return res.status(400).json({ error: "invalid hex format" });
    }
});

if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => console.log(`Server: localhost:${port}`));
}

module.exports = app;