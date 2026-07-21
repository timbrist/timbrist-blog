
const loadingElement = document.querySelector("#loading");
const errorElement = document.querySelector("#error");
const postElement = document.querySelector("#post");
// const titleElement = document.querySelector("#post-title");
const dateElement = document.querySelector("#post-date");
// const excerptElement = document.querySelector("#post-excerpt");
const contentElement = document.querySelector("#post-content");

function showError(message) {
  errorElement.hidden = false;
  errorElement.textContent = message;
}

function isValidSlug(slug) {
  return (
    typeof slug === "string" &&
    slug.length <= 100 &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
  );
}

function renderPost(post) {
  // document.title = `${post.title} | My Blog`;

  // titleElement.textContent = post.title;

  dateElement.dateTime = post.date;
  dateElement.textContent = post.date;

  // if (post.excerpt) {
  //   excerptElement.textContent = post.excerpt;
  // } else {
  //   excerptElement.hidden = true;
  // }

  /*
   * post.html 是后端 remark 生成的 HTML，
   * 因此这里需要使用 innerHTML。
   */
  contentElement.innerHTML = post.html;

  postElement.hidden = false;
}

async function loadPost() {
  const params = new URLSearchParams(
    window.location.search,
  );

  const slug = params.get("slug");

  if (!slug) {
    loadingElement.hidden = true;
    showError("缺少文章 slug。");
    return;
  }

  if (!isValidSlug(slug)) {
    loadingElement.hidden = true;
    showError("文章 slug 格式不正确。");
    return;
  }

  try {
    const response = await fetch(
      `/post?slug=${encodeURIComponent(slug)}`,
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ??
        data.error ??
        "Unable to load post",
      );
    }

    renderPost(data.post);
  } catch (error) {
    showError(
      error instanceof Error
        ? error.message
        : "Unable to load post",
    );
  } finally {
    loadingElement.hidden = true;
  }
}

loadPost();