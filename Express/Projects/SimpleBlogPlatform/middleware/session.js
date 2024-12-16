import session from "express-session";

const sessionMiddleware = session({
  secret: "session_express_key", // Replace with a strong secret key
  resave: false, // Do not save session if unmodified
  saveUninitialized: true, // Save new sessions even if they're unmodified; set to false if compliance is needed
  cookie: {
    secure: false, // Set to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24, // Set session cookie expiry (e.g., 1 day)
  },
});

export default sessionMiddleware;
