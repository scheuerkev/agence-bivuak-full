exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth/signin/form");
  }
};

exports.isAdmin = (req, res, next) => {
  req.user.role === 1 ? next() : res.redirect("/blog");
};
