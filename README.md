# timbrist-blog
Let's build a blog from scratch, see how much it will evolve. 

## How this website and blog build 
Jul 20, I was thinking the first step, that when access GET /echo?message=hello return { message: 'hello' };

W3Schools provides some of the (examples)["https://www.w3schools.com/nodeJs/nodejs_http.asp"] to build a simple web server.

Then I tried to translate the idea to test.js
Given uri='/echo?message=hello'
When visit`http://localhost:5090${uri}`
GET { message: 'hello' }

Now with the web server is running, I'm imaging that the blog can looks like (next-js-blog-stater)["https://next-blog-starter.vercel.app/"], here is their (example codes)["https://github.com/vercel/next.js/tree/canary/examples/blog-starter"]. 

Let's install some packages to handle .md files . I have no choice, if you want to write the markdown parser to html, it will take a long time to drift away from our main goal.

```bash
#create new branch to deal with markdown parser
git checkout -b mdparser
#start using package management 
npm init .
npm install remark remark-html gray-matter
```