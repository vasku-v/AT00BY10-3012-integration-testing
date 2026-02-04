// server.js

/**
 * Rest API
 */

const express = require("express");
const hexToRgbLib = require("./hex2rgb");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello!")
});

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