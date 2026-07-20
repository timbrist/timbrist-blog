const test = require("node:test");
const assert = require("node:assert/strict");

test("we visit GET /echo?message=hello we get hello", async () => {
    const uri = '/echo?message=hello';
    const response = await fetch(`http://localhost:5090${uri}`);

    assert.equal(response.status, 200);
    console.log("status:", response.status);

    const data = await response.json();
    
    const expected = {
        message: "hello",
    };

    assert.deepEqual(data, expected);
    console.log("data:", data);
});

test("we visit GET /post?slug=helloworld ", async () => {
    const uri = '/post?slug=helloworld';
    const url = `http://localhost:5090${uri}`;
    console.log("visit: ", url);
    const response = await fetch(url);

    assert.equal(response.status, 200);
    console.log("status:", response.status);

    const data = await response.json();
    
    console.log("data:", data);
});

test("we visit GET /posts ", async () => {
    const uri = '/posts';
    const url = `http://localhost:5090${uri}`;
    console.log("visit: ", url);
    const response = await fetch(url);

    assert.equal(response.status, 200);
    console.log("status:", response.status);

    const data = await response.json();
    
    console.log("data:", data);
});

test("we visit GET / ", async () => {
    const uri = '/';
    const url = `http://localhost:5090${uri}`;
    console.log("visit: ", url);
    const response = await fetch(url);

    assert.equal(response.status, 200);
    console.log("status:", response.status);

});

//node --test tests/get.route.test.js