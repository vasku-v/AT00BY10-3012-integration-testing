# Hex-to-RGB REST API

This repository contains Vasilissa Vilkki's submission for the Integration Testing assignment in the course "AT00BY10-3012 Ohjelmistojen ylläpito ja testaus".

This project implements a simple REST API using Express that converts a hexadecimal color value into an RGB object.

The project includes:
- A hex-to-rgb conversion function
- Unit tests for the conversion logic
- Integration tests for the REST API route

---

# Usage

## Initialization

npm init -y

## Dependencies Installation

npm install express --save
npm install --save-dev mocha chai supertest

## Running Tests

npm test

## Starting Development Server

npm run dev

The server runs at:  
http://localhost:3000

---

# API Endpoint

### Example Usage

GET http://localhost:3000/hexToRgb?hex=ff00aa

### Successfull response

{
  "r": 255,
  "g": 0,
  "b": 170
}

### Error: invalid hex format

{
  "error": "invalid hex format"
}

### Error: missing parameter

{
  "error": "hex parameter missing"
}

---

# Project Directory Structure

AT00BY10-3012-integration-testing/  
-- src/  
---- hex2rgb.js  
---- server.js  
-- test/  
---- hex2rgb.test.js  
---- server.test.js  
-- package.json
-- .gitignore

# Test Types Included

## Unit Tests

Located in:  
-- test/  
---- hex2rgb.test.js

The unit tests are implemented using Mocha together with Chai's Expect style. All tests are placed in one test suite.

## Integration Tests

Located in:  
-- test/  
---- server.test.js  

The tests verify API route responses, JSON output format, error handling and that the API does not crash on invalid input.