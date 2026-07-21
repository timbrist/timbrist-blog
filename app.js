const { Router } = require("./routes.js");
const { serveStatic } = require("./static.js");

/**
 * 
 * @param {http.ServerResponse} res 
 */
function addResponseHelpers(res) {
  res.status = function status(code) {
    res.statusCode = code;
    return res;
  };

  res.json = function json(data) {
    res.setHeader(
      "Content-Type",
      "application/json; charset=utf-8",
    );
    res.end(JSON.stringify(data));
  };

  res.send = function send(body) {
    if (body !== null && typeof body === "object") {
      res.json(body);
      return;
    }

    res.setHeader(
      "Content-Type",
      "text/html; charset=utf-8",
    );
    res.end(String(body ?? ""));
  };
}

/**
 * 
 * @returns function app(req, res)
 */
function createApp() {
  const router = new Router();

  const app = async function app(req, res) {
    try {
      addResponseHelpers(res);
      const url = new URL(req.url ?? "/","http://localhost",);

      const handled = await router.handle(req, res,url);

      if (handled) { return; }

      // Serve static files here.
      const staticHandled = await serveStatic(req, res,url);

      if (staticHandled) { return; }

      // If no static file exists, return 404.
    } catch (error) {
      console.error(error);

      if (!res.headersSent) {
        res.status(500).json({
          error: "INTERNAL_SERVER_ERROR",
          message: "Unexpected server error",
        });
      } else {
        res.destroy();
      }
    }
  };

  app.get = router.get.bind(router);
  app.post = router.post.bind(router);
  app.put = router.put.bind(router);
  app.delete = router.delete.bind(router);

  return app;
}

module.exports = { createApp };