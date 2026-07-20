const http = require("node:http");
const { stringify } = require("node:querystring");
const { prepareFile } = require("./static.js");

const {getPostBySlug, getAllPosts} = require("./lib/posts.js");

const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "text/javascript",
  css: "text/css",
  png: "image/png",
  jpg: "image/jpeg",
  gif: "image/gif",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};

const server = http.createServer(async (req, res)=>{
    const url = new URL(req.url ?? "/", `http://${req.headers.host}`);

    
    //Handle routes 
    if(req.method === "GET" && url.pathname === "/echo"){
        try{
            const message = url.searchParams.get("message") || "";
            const response = JSON.stringify({ message,});
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.end(response);
            return;
        }catch(error){
            res.statusCode = 401;
            res.end(error instanceof Error ? error.message : "something is not right");
            return;
        }
    }

    if(req.method === "GET" && url.pathname === "/post"){
        const slug = url.searchParams.get("slug") || "";
        console.log("GET /posts?slug=",slug);
        try{
            const post = await getPostBySlug(slug);
            console.log("slug: ", slug);
            const response = JSON.stringify({ post,});
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.end(response);
            return;
        }catch(error){
            if (error && typeof error === "object" &&error.code === "ENOENT") {
                const response = JSON.stringify( `Post '${slug}' was not found`);
                res.statusCode = 404;
                res.setHeader("Content-Type", "text/plain; charset=utf-8");
                res.end(response);
                return;
            }
            console.error(error);  
            const response = JSON.stringify( {
                success: false,
                error: "INTERNAL_SERVER_ERROR",
                message: "Unable to load post",
            });

            res.statusCode = 500;
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.end(response);
        }
    }

    if(req.method === "GET" && url.pathname === "/posts"){
        console.log("GET /posts");
        try{
            const posts = await getAllPosts();
            const response = JSON.stringify({ posts: posts,});
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.end(response);
        }catch(error){
            res.statusCode = 400;
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            
            const response = JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "get posts failed"
            });
            res.end(response);
        }
    }

    //handle static files
    if (req.method === "GET" || req.method === "HEAD") {
        try {
            const file = await prepareFile(url.pathname);
            const statusCode = file.found ? 200 : 404;
            const mimeType =
                MIME_TYPES[file.ext] ?? MIME_TYPES.default;

            res.writeHead(statusCode, {
                "Content-Type": mimeType,
            });

            if (req.method === "HEAD") {
                res.end();
            } else {
                file.stream.pipe(res);
            }
        } catch (error) {
            console.error(error);

            if (!res.headersSent) {
                const response = JSON.stringify( {
                    success: false,
                    error: "INTERNAL_SERVER_ERROR",
                    message: "Unable to load post",
                });

                res.statusCode = 500;
                res.setHeader("Content-Type", "text/plain; charset=utf-8");
                res.end(response);
            } else {
                res.destroy();
            }
        }

        return;
    }



    //handle routes that is not exist
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
        error: "NOT_FOUND",
        message: "Route not found",
    }));

});

server.listen(5090, () => {
  console.log("Server running at http://localhost:5090");
});