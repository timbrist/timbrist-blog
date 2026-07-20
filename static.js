const fs = require("node:fs");
const path = require("node:path");


const STATIC_PATH = path.join(process.cwd(), "./public");

/**
 * 
 * @param {string} url 
 * @returns node:fs
 */
async function prepareFile(url) {
    const toBool = [() => true, () => false];
    const urlAsPath = decodeURI(url);
    const paths = [STATIC_PATH, urlAsPath];
    if (url.endsWith("/")) paths.push("index.html");
    const filePath = path.join(...paths);
    const pathTraversal = !filePath.startsWith(STATIC_PATH);
    const exists = await fs.promises.access(filePath).then(...toBool);
    const found = !pathTraversal && exists;
    const streamPath = found ? filePath : `${STATIC_PATH}/404.html`;
    const ext = path.extname(streamPath).substring(1).toLowerCase();
    const stream = fs.createReadStream(streamPath);
    return { found, ext, stream };
};

module.exports={
    prepareFile
}