const test = require("node:test");
const assert = require("node:assert/strict");

const {markdownToHtml} = require("../lib/markdown.js");

test("Given md, When call markdownToHtml, Then get html", async () => {
    const testMarkdown = `
# Hello
This is **important**.`;
    const htmlstring = await markdownToHtml(testMarkdown);
    console.log("html: ", htmlstring);
    const expected = '<h1>Hello</h1>\n<p>This is <strong>important</strong>.</p>\n';
    assert.deepEqual(htmlstring, expected);
});
