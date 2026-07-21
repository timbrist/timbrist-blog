
const loadingElement = document.querySelector("#loading");
const errorElement = document.querySelector("#error");
const postsElement = document.querySelector("#posts");


function renderPosts(posts){
    if(posts.length === 0){
        postsElement.textContent = "No Posts At This Moment.";
    }

    posts.forEach(post => {
        //create the dom node for each post 
        const article = document.createElement("article");
        const title = document.createElement("h2");
        const link = document.createElement("a");
        const date = document.createElement("time");
        const excerpt = document.createElement("p");

        //set content
        link.href =`/post.html?slug=${encodeURIComponent(post.slug)}`;

        link.textContent = post.title;

        date.dateTime = post.date;
        date.textContent = post.date;

        excerpt.textContent = post.excerpt;

        title.append(link);
        article.append(title, date, excerpt);
        postsElement.append(article);

    });
}

async function loadPosts(){
    try{
        const response = await fetch("/posts");
        const data = await response.json();

        renderPosts(data.posts);
    }catch (error) {
        errorElement.hidden = false;
        errorElement.textContent =
        error instanceof Error
            ? error.message
            : "Unable to load posts";
    } finally {
        loadingElement.hidden = true;
    }
}
loadPosts();