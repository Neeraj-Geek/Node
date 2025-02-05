document.addEventListener("DOMContentLoaded", () => {
  const create_form = document.getElementById("create-post-form");
  create_form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = Date.now();
    const title = formData.get("title");
    const author = formData.get("author");
    const content = formData.get("content");
    console.log(title, author, content);
    fetch("http://localhost:3000/create-post", {
      method: "POST",
      body: JSON.stringify({ id, title, author, content }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
    window.location.href = "./index.html";
    alert("Post Created successfully!");
  });
});
