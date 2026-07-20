const test = require("node:test");
const assert = require("node:assert/strict");

test("we visit GET /echo?message=hello we get hello", async () => {
    const response = await fetch('http://localhost:5090/echo?message=hello');

    assert.equal(response.status, 200);
    console.log("status:", response.status);

    const data = await response.json();
    
    const expected = {
        message: "hello",
    };

    assert.deepEqual(data, expected);
    console.log("data:", data);
});

//node --test tests/get.route.test.js