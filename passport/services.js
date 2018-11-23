const passport = require("passport"),
  LocalStrategy = require("passport-local"),
  JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt,
  db = require("../model/index"),
  config = require("../config");

//   Local Strategy - Signing In
const localLogin = new LocalStrategy(function(username, password, done) {
  db.User.findOne({ username: username }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: "Invalid Username" });
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false, { message: "Invalid Password" });
      }
      return done(null, user);
    });
  });
});

// Jwt Strategy - For Auth Access for certain routes
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("authorization"),
  secretOrKey: config.secret
};

const jwtAuth = new JwtStrategy(jwtOptions, function(payload, done) {
  db.User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

passport.use(localLogin);
passport.use(jwtAuth);
