const aboutPage = (req, res) => {
  const data = {
    title: "about Page",
    header: "Welcome to About Page",
  };
  res.render("homePage", data);
};

export default aboutPage;
