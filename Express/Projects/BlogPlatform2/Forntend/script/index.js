document.addEventListener("DOMContentLoaded", async () => {
  const postList = document.getElementById("post-list");

  // Util Function to Fetch Data
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

  // Fetch and Display All Posts
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
            <a href="post.html?id=${element.id}" class="read_more">Read More</a>
          </div>`;
        postList.appendChild(blogCard);
      });
    } else {
      console.log("No posts available or error fetching data.");
    }
  }

  getAllPost();
});
