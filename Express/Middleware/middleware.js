export function auth() {
  return (req, res, next) => {
    console.log("hello from middle");
    let user = req.params.user || user;
    console.log(user);
    if (user == "admin") {
      req.user = "Admin";
      next();
    } else {
      res.status(403).send("Forbidden: You don't have the required role");
    }
  };
}

export function auth2() {
  return (req, res, next) => {
    req.message = `${req.user} to home Page `;
    next();
  };
}
