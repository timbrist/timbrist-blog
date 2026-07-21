const http = require("node:http");
const { createApp } = require("./app.js");
const { getPostBySlug, getAllPosts, } = require("./lib/posts.js");

const port = Number(process.env.PORT) || 5090;
const host = "0.0.0.0";

const app = createApp();


app.get("/echo", (req, res) => {
    const message = req.query.get("message") ?? "";
    res.json({ message });
});

app.get("/post", async (req, res) => {
  const slug = req.query.get("slug") ?? "";

  if (!slug) {
    return res.status(400).json({
      success: false,
      error: "INVALID_SLUG",
      message: "A post slug is required",
    });
  }

  try {
    const post = await getPostBySlug(slug);

    return res.json({ post });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      error.code === "ENOENT"
    ) {
      return res.status(404).json({
        success: false,
        error: "POST_NOT_FOUND",
        message: `Post '${slug}' was not found`,
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "Unable to load post",
    });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await getAllPosts();

    return res.json({ posts });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "Unable to load posts",
    });
  }
});



const server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`Server running at http://localhost:${port}`);
});