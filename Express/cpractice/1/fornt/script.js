const userList = document.getElementById("user-list"); // Container for user data
fetch("http://localhost:3000/api/users")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    userList.innerHTML = ""; // Clear any existing content
    data.forEach((user) => {
      // Create a new div for each user
      const userDiv = document.createElement("div");
      userDiv.classList.add("user");

      // Add user details to the div
      userDiv.innerHTML = `
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Location:</strong> ${user.location}</p>
      `;

      // Append the user div to the user list
      userList.appendChild(userDiv);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
