const homePage = (req, res) => {
  const data = {
    title: "Home Page",
    header: "Welcome to EJS! Home Page",
  };
  res.render("homePage", data);
};

export default homePage;
