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
        console.log(email, password);
        const user = await findUserPerEmail(email);
        console.log("User in try before if", user);
        if (user) {
          console.log("User in if", user);
          const match = await user.comparePassword(password);
          if (match) {
            done(null, user);
          } else {
            done(null, false, { message: "Wrong password" });
          }
        } else {
          done(null, false, { message: "User not found" });
        }
      } catch (e) {
        done(e);
      }
    }
  )
);
