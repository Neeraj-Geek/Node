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
                <a href="edit.html">Edit</a>
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
  };

  if (postId) {
    getSinglePost(postId);
  } else {
    getAllPost();
  }
});
