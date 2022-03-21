const app = require("../app");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { findUserPerEmail, findUserPerId } = require("../queries/users.queries");

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserPerId(id);
    done(null, user);
  } catch (e) {
    done(e);
  }
});
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = await findUserPerEmail(email);
        if (user) {
          const match = await user.comparePassword(password);
          if (match) {
            done(null, user);
          } else {
            done(null, false, { message: "Mauvais mot de passe" });
          }
        } else {
          done(null, false, {
            message: "Aucun utilisateur trouvé avec cet email",
          });
        }
      } catch (e) {}
    }
  )
);
