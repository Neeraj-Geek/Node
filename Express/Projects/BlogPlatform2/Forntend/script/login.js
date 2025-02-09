document.addEventListener("DOMContentLoaded", () => {
  const LoginForm = document.getElementById("login-form");
  LoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = "./index.html";
      })
      .catch((error) => {
        console.error(error);
        alert("error while Login");
      });
  });
});
