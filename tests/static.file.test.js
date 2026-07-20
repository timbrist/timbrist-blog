const test = require("node:test");
const assert = require("node:assert/strict");


const {prepareFile} = require("../static.js");

test("Given a filename index.html, When call prepareFile Then get file", async () => {
    const url = 'index.html';
    const file = await prepareFile(url);
    console.log("file: ", file);
});