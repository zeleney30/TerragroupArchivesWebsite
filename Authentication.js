const passport = require("passport");
const dotenv = require("dotenv");

// Load config.env
dotenv.config({ path: "./config.env" });

const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      // Coneecting to Google
      clientID: '828042283208-l6df3668ar0acrjpcq7bjtido5r28pml.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: "https://powerful-mountain-17148.herokuapp.com/auth/google/callback",
      passReqToCallback: true,
    },
    // function (request, accessToken, refreshToken, profile, done) {
    //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //     return done(err, user);
    //   });
    // What to do when user is verified?
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile); // if you have a db the null will be an err
    }
  )
);

// Serialize and Deserialize Users -- Setting up for user sessions/cookies
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});