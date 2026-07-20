const http = require("node:http");
const { stringify } = require("node:querystring");

const server = http.createServer(async (req, res)=>{
    const url = new URL(req.url ?? "/", `http://${req.headers.host}`);

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