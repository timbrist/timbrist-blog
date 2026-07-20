# timbrist-blog
Let's build a blog from scratch, see how much it will evolve. 

## How this website and blog build 
Jul 20, I was thinking the first step, that when access GET /echo?message=hello return { message: 'hello' };

W3Schools provides some of the (examples)["https://www.w3schools.com/nodeJs/nodejs_http.asp"] to build a simple web server.

Then I tried to translate the idea to test.js
Given uri='/echo?message=hello'
When visit`http://localhost:5090${uri}`
GET { message: 'hello' }

