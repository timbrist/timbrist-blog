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

we write a markdown.js to parse Markdown string → HTML string.
Given md = `# Hello This is **important**.`
when call markdownToHtml
Then  html


Continue, we need 2 funtions
1. getPostBySlug
Given a file name(slug) = '_posts/hello.md'
When call getPostBySlug
Then get the meta data and html from the markdown file

2. getAllPosts 
Given a file path = '_posts'
When call getAllPosts
Then get all the metadata from files that end with .md


I'm now merge  branch mdparser into main
```bash
git add README.md
git commit -m "update README with merge information "
git checkout main
git merge mdparser
```

start to write server route: GET /post?slug=helloworld, GET /posts


Next start to serve static index.html
(node server without framework)["https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Node_server_without_framework"]

BTW: routes must handle before static files .


I will deal with the ui tomorrow on Jul 21, 
```bash
git checkout -b ui
```

Jul 21, after finished the ui, right now i can't decide whether should I refactor, add contraints, or should I move on to add more features ?  But right now we have finished the basic functionalities that (next-js-blog-stater)["https://next-blog-starter.vercel.app/"] would have with only less than 10k of code.

1. refactor: I would abstract the route from the server.js 
2. contraints: think about contraints make the app more solid.
3. more features : I would like to have a admin -> upload zip that export from notion -> render the markdown that I write from notion . 
4. deploy: only after deploy a circle can be completed .

I decide to refactor it first and then deploy.

```bash
git checkout -b refactor
```