document.addEventListener("DOMContentLoaded", async () => {
  const postList = document.getElementById("post-list");
  const postDetail = document.getElementById("post-detail");
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  //Util Function
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

  //Get All Post
  async function getAllPost() {
    const allPostData = await fetchUrl("http://localhost:3000/");
    if (Array.isArray(allPostData) && allPostData.length > 0) {
      allPostData.forEach((element) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        blogCard.innerHTML = `
      <div class="content">
        <h3>${element.title}</h3>
        <p>${element.content}</p>
         <a href="post.html?id=${element.id}" class='read_more'>Read More</a>
      </div>
    `;
        postList.appendChild(blogCard);
      });
      const readMore = document.querySelectorAll(".read_more");
      readMore.forEach((read_btn) => {
        read_btn.addEventListener("click", () => {
          getSinglePost(postId);
        });
      });
    } else {
      console.log("No posts available or error fetching data.");
    }
  }
  const editPost = async (postId) => {
    window.location.href = "./edit.html";
    const editForm = document.getElementById("edit-post-form");
    console.log(editForm);
    const singlePostData = await fetchUrl(
      `http://localhost:3000/getpost/${postId}`
    );
    if (singlePostData) {
      console.log(singlePostData);
      const form_post = ` <label for="title">Title:</label>
            <input type="text" id="title" name="title" value="Sample Title" required>

            <label for="author">Author:</label>
            <input type="text" id="author" name="author" value="Sample Author" required>

            <label for="content">Content:</label>
            <textarea id="content" name="content" rows="10" required>Sample Content</textarea>

            <button type="submit">Update Post</button>`;
    } else {
      console.log("No post found");
    }
  };

  //GEt Single Post
  const getSinglePost = async (idx) => {
    const singlePostData = await fetchUrl(
      `http://localhost:3000/getpost/${idx}`
    );
    const postContent = ` <h2 id="post-title">${singlePostData.title}</h2>
            <p id="post-author">by <span>${singlePostData.author}</span></p>
            <p id="post-date">Posted on: <span>Date: ${singlePostData.date}</span></p>
            <div id="post-content">${singlePostData.content}</div>
            <div class="post-actions">
            <button id="edit_post">Edit</button>
                
                <button id="delete-post">Delete</button>
            </div>`;

    postDetail.innerHTML = postContent;
    const deleteBtn = document.getElementById("delete-post");
    deleteBtn.addEventListener("click", async () => {
      const deletePost = await fetchUrl(
        `http://localhost:3000/deletepost/${idx}`
      );
      if ((deletePost.response = "Deleted")) {
        window.location.href = "./index.html";
        alert("Data deleted successfully!");
      }
    });
    const editBtn = document.getElementById("edit_post");
    editBtn.addEventListener("click", (idx) => {
      window.location.href = "./edit.html";
      const editForm = document.getElementById("edit-post-form");
      console.log(editForm);
      const form_post = ` <label for="title">Title:</label>
            <input type="text" id="title" name="title" value=${singlePostData.title} required>

            <label for="author">Author:</label>
            <input type="text" id="author" name="author" value=${singlePostData.author} required>

            <label for="content">Content:</label>
            <textarea id="content" name="content" rows="10" required>${singlePostData.content}</textarea>

            <button type="submit">Update Post</button>`;
      editForm.innerHTML = form_post;
    });
  };

  if (postId) {
    getSinglePost(postId);
  } else {
    getAllPost();
  }
});
