document.addEventListener("DOMContentLoaded", () => {
  const signUpForm = document.getElementById("signup-form");
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    let user = { name, email, password };

    fetch("http://localhost:3000/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
    window.location.href = "./login.html";
    alert("Sign up successfully!");

    console.log(user);
  });
});
