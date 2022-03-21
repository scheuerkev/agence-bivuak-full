const { createUser } = require("../queries/users.queries");

exports.signupForm = (req, res, next) => {
  res.render("users/signup", {
    errors: null,
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user,
  });
};

exports.signup = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await createUser(body);
    res.redirect("/");
  } catch (e) {
    res.render("users/signup", {
      errors: [e.message],
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  }
};
