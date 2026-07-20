
const test = require("node:test");
const assert = require("node:assert/strict");

const {getPostBySlug,getAllPosts} = require("../lib/posts.js");

test("Given a file name(slug) = '_posts/hello.md' When call getPostBySlug Then get the meta data and html from the markdown file", async () => {
    const slug = 'helloworld';
    const post = await getPostBySlug(slug);
    console.log("Html and Metadat: ", post);
    
    //not a empty string is fine :
    assert.ok(post, "post should exist");
    assert.equal(typeof post, "object");

    assert.equal(typeof post.slug, "string");
    assert.ok(post.slug.trim().length > 0, "slug should not be empty");

    assert.equal(typeof post.title, "string");
    assert.ok(post.title.trim().length > 0, "title should not be empty");

    assert.equal(typeof post.date, "string");
    assert.ok(post.date.trim().length > 0, "date should not be empty");

    assert.equal(typeof post.excerpt, "string");
    assert.ok(post.excerpt.trim().length > 0, "excerpt should not be empty");

    assert.equal(typeof post.html, "string");
    assert.ok(post.html.trim().length > 0, "html should not be empty");
});


test("Given a file path = '_posts' When call getAllPosts Then get all the metadata from files that end with .md", 
    async () => {
    const posts = await getAllPosts();
    console.log("posts and Metadata: ", posts);

});