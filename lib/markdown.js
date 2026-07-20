const { remark } = require( "remark");
const { default: html } = require("remark-html");

/**Markdown string → HTML string
 * 
 * @param {string} markdown 
 * @returns Promise<string>
 */
async function markdownToHtml(markdown) {
  const result = await remark()
    .use(html)
    .process(markdown);

  return result.toString();
}

module.exports = {
  markdownToHtml,
};


// const testMarkdown = `
// # Hello
// This is **important**.`;
// const htmlstring = await markdownToHtml(testMarkdown);
// console.log(htmlstring);