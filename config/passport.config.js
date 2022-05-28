require("dotenv").config();
const app = require("../app");
const passport = require("passport");
const User = require("../database/models/user.model");
const {
  findUserPerEmail,
  findUserPerGoogleId,
} = require("../queries/user.queries");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const util = require("util");

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

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/cb",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(
          util.inspect(profile, { compact: true, depth: 5, breakLength: 80 })
        );
        const localUser = await findUserPerEmail(profile.emails[0].value);
        const googleUser = await findUserPerGoogleId(profile.id);
        if (localUser) {
          done(null, localUser);
        } else {
          if (googleUser) {
            done(null, googleUser);
          } else {
            const newUser = new User({
              username: profile.displayName,
              local: {
                googleId: profile.id,
                email: profile.emails[0].value,
              },
              avatar: profile.photos[0].value,
            });
            const savedUser = await newUser.save();
            done(null, savedUser);
          }
        }
      } catch (e) {
        console.log(e);
        done(e);
      }
    }
  )
);
