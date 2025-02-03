document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");
  const editForm = document.getElementById("edit-post-form");

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

  // Fetch Post Data and Populate Form
  async function populateEditForm(postId) {
    const singlePostData = await fetchUrl(
      `http://localhost:3000/getpost/${postId}`
    );
    if (singlePostData) {
      editForm.innerHTML = `
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" value="${singlePostData.title}" required>

        <label for="author">Author:</label>
        <input type="text" id="author" name="author" value="${singlePostData.author}" required>

        <label for="content">Content:</label>
        <textarea id="content" name="content" rows="10" required>${singlePostData.content}</textarea>

        <button type="submit">Update Post</button>`;

      editForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const id = postId;
        const title = formData.get("title");
        const author = formData.get("author");
        const content = formData.get("content");
        fetch("http://localhost:3000/submit-post", {
          method: "POST",
          body: JSON.stringify({ id, title, author, content }),
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => console.log("Success:", data))
          .catch((error) => console.error("Error:", error));

        alert("Post updated successfully!");
      });
    }
  }

  if (postId) populateEditForm(postId);
});
