function auth(user) {
  return (req, res, next) => {
    console.log("hello from middle");
    let user = req.params.user || user;
    console.log(user);
    if (user == "admin") {
      next();
    } else {
      res.status(403).send("Forbidden: You don't have the required role");
    }
  };
}

export default auth;
