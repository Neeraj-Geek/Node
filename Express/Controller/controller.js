const homePage = (req, res) => {
  res.send("This is home page");
};

const createPage = (req, res) => {
  res.send("This is create page");
};

const deletePage = (req, res) => {
  res.send("This is delete page");
};
const updatePage = (req, res) => {
  res.send("This is update page");
};

export { homePage, createPage, deletePage, updatePage };
