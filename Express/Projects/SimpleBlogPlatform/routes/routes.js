// routes/routes.js
import express from "express";
import controllers from "../controller/loginandsignup.js"; // Import the default export
import cloginData from "../controller/submitData.js"; // Import the submitData controller
import clogin from "../controller/clogin.js";
import validateUser from "../middleware/middleware.js";
import ccreatePost from "../controller/cpostRoutes.js";
import postData from "../controller/postData.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const route = express.Router();

// Define routes
route.get("/", controllers.cLoginPage);
route.get("/signup", controllers.csignupPage);
route.post("/submit", validateUser, cloginData); // Use the submitData controller for POST requests
route.post("/home", clogin); // Use the submitData controller for POST requests

route.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error destroying session");
    }
    res.render("LoginPage");
  });
});

// Post routes

route.use("/protected", isAuthenticated);

route.get("/protected/create_post", ccreatePost);
route.post("/protected/submit_post", postData);

export default route;
