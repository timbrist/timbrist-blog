const fs = require("node:fs");
const path = require("node:path");
const { pipeline } = require("node:stream/promises");

const STATIC_PATH = path.join(process.cwd(), "./public");

const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=utf-8",
  js: "text/javascript; charset=utf-8",
  css: "text/css; charset=utf-8",
  png: "image/png",
  jpg: "image/jpeg",
  gif: "image/gif",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};


async function isFile(filePath) {
  try {
    const stats = await fs.promises.stat(filePath);
    return stats.isFile();
  } catch {
    return false;
  }
}

async function prepareFile(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  let relativePath = decodedPath.replace(/^\/+/, "");
  if (decodedPath.endsWith("/")) {
    relativePath = path.join(relativePath, "index.html");
  }

  const requestedPath = path.resolve(STATIC_PATH,relativePath,);
  const insideStaticDirectory = requestedPath.startsWith(`${STATIC_PATH}${path.sep}`);

  const found = insideStaticDirectory && await isFile(requestedPath);

  const filePath = found ? requestedPath : path.join(STATIC_PATH, "404.html");

  const ext = path
    .extname(filePath)
    .slice(1)
    .toLowerCase();

  return {
    found,
    filePath,
    ext,
  };
}


async function serveStatic(req, res, url) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return false;
  }

  const file = await prepareFile(url.pathname);

  res.statusCode = file.found ? 200 : 404;
  res.setHeader(
    "Content-Type",
    MIME_TYPES[file.ext] ?? MIME_TYPES.default,
  );

  if (req.method === "HEAD") {
    res.end();
    return true;
  }

  await pipeline(
    fs.createReadStream(file.filePath),
    res,
  );

  return true;
}


module.exports={
    prepareFile,//test
    serveStatic
}