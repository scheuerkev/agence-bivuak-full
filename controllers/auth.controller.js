const passport = require("passport");

exports.signin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      next(err);
    } else if (!user) {
      console.log(res);
      res.status(403).send({ errors: info.message });
    } else {
      req.login(user, (err) => {
        if (err) {
          next(err);
        } else {
          res.send(req.user);
        }
      });
    }
  })(req, res, next);
};

exports.signinWithGoogle = (req, res, next) => {
  passport.authenticate("google", {
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  })(req, res, next);
};

exports.signinForm = (req, res, next) => {
  res.render("auth/auth-form", {
    errors: null,
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user,
  });
};

exports.signout = (req, res, next) => {
  req.session.destroy(() => {
    res.status(200).send({ message: "Déconnexion réussie" });
  });
};
