const app = require("../app");
const passport = require("passport");
const User = require("../database/models/user.model");
const { findUserPerEmail } = require("../queries/user.queries");
const LocalStrategy = require("passport-local").Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (error) {
    done(error);
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
        console.log(user);
        if (user) {
          const match = await user.comparePassword(password);
          if (match) {
            done(null, user);
          } else {
            done(null, false, { message: "Mot de passe invalide" });
          }
        } else {
          done(null, false, { message: "Cet utilisateur n'existe pas" });
        }
      } catch (e) {
        done(e);
      }
    }
  )
);
