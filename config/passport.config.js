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

passport.use("local",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = findUserPerEmail(email);
        if (user) {
          console.log(user);
          const match = await user.comparePassword(password);
          if (match) {
            done(null, user);
          } else {
            done(null, false, { message: "Wrong password" });
          }
        } else {
          done(null, false, {
            message: "Unable to find a user with this email",
          });
        }
      } catch (error) {
        done(error);
      }
    }
  )
);
