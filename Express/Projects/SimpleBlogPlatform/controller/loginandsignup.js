const cLoginPage = (req, res) => {
  res.render("LoginPage");
};
const csignupPage = (req, res) => {
  res.render("signUp");
};
export default { cLoginPage, csignupPage };
