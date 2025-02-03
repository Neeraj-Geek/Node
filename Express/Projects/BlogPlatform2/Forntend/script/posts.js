document.addEventListener("DOMContentLoaded", async () => {
  const postDetail = document.getElementById("post-detail");
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  async function fetchUrl(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return error;
    }
  }

  // Fetch and Display a Single Post
  async function getSinglePost(postId) {
    const singlePostData = await fetchUrl(
      `http://localhost:3000/getpost/${postId}`
    );
    if (singlePostData) {
      const postContent = `
        <h2 id="post-title">${singlePostData.title}</h2>
        <p id="post-author">by <span>${singlePostData.author}</span></p>
        <p id="post-date">Posted on: <span>${singlePostData.date}</span></p>
        <div id="post-content">${singlePostData.content}</div>
        <div class="post-actions">
          <button id="edit_post">Edit</button>
          <button id="delete-post">Delete</button>
        </div>`;
      postDetail.innerHTML = postContent;

      document
        .getElementById("delete-post")
        .addEventListener("click", async () => {
          const deletePost = await fetchUrl(
            `http://localhost:3000/deletepost/${postId}`
          );
          if (deletePost.response === "Deleted") {
            window.location.href = "./index.html";
            alert("Data deleted successfully!");
          }
        });

      document.getElementById("edit_post").addEventListener("click", () => {
        window.location.href = `./edit.html?id=${postId}`;
      });
    }
  }

  if (postId) getSinglePost(postId);
});
