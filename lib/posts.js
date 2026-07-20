const fs = require("node:fs/promises");
const path = require("node:path");
const matter = require("gray-matter");


const {
  markdownToHtml,
} = require("./markdown.js");

/*
read posts/ path
keep only .md
return slug
*/


const postsDirectory = path.join(process.cwd(), "_posts");

/**
 * 
 * @param {string} slug 
 * @returns Promise<Post>
 */
async function getPostBySlug(slug){

    const filePath = path.join(
        postsDirectory, 
        `${slug}.md`
    );
    const source = await fs.readFile(filePath,'utf8');
    const {data, content} = matter(source);

    if (typeof data.title !== "string" ||
        typeof data.date !== "string") {
        throw new Error(
            `Post "${slug}" is missing title or date`,
        );
    }

    const renderedHtml = await markdownToHtml(content);

    return {
        slug,
        title: data.title,
        date: data.date,
        excerpt:
        typeof data.excerpt === "string"
            ? data.excerpt
            : "",
        html: renderedHtml,
    };
}

/**
 * @return Promise<PostSummary[]>
 */
async function getAllPosts(){
    const filenames = await fs.readdir(
        postsDirectory,
    );

    const markdownFiles = filenames.filter(
        (filename) => filename.endsWith(".md"),
    );

    const posts = await Promise.all(
        markdownFiles.map(async (filename) => {
        const slug = filename.replace(/\.md$/, "");
        const filePath = path.join(
            postsDirectory,
            filename,
        );

        const source = await fs.readFile(
            filePath,
            "utf8",
        );

        const { data } = matter(source);

        if (
            typeof data.title !== "string" ||
            typeof data.date !== "string"
        ) {
            throw new Error(
            `Post "${filename}" is missing title or date`,
            );
        }

        return {
            slug,
            title: data.title,
            date: data.date,
            excerpt:
            typeof data.excerpt === "string"
                ? data.excerpt
                : "",
        };
        }),
    );
    
    return posts.sort((a, b) =>
        b.date.localeCompare(a.date),
    );

}

module.exports = {
  getPostBySlug,
  getAllPosts
};


/*
getPostBySlug("helloworld").then(post => console.dir(post, { depth: null })).catch(console.error)
getAllPosts().then(posts => console.log(posts));
*/