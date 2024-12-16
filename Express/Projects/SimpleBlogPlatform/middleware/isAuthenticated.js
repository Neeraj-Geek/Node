const isAuthenticated = (req, res, next) => {
  console.log("Session data:", req.session);
  console.log("Checking authentication..."); // Debugging statement

  if (req.session && req.session.user) {
    console.log("User is authenticated:", req.session.user); // Debugging statement
    next(); // Proceed to the next middleware/route handler
  } else {
    console.log("User is not authenticated, redirecting to login."); // Debugging statement
    res.redirect("/"); // Redirect to login page if not authenticated
  }
};

export default isAuthenticated;
