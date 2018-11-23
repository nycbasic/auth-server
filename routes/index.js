const { signup, signin } = require("../controllers/auth");

const passport = require("passport"),
  passportServices = require("../passport/services");
const requireSignin = passport.authenticate("local", { session: false }),
  requireAuth = passport.authenticate("jwt", { session: false });

module.exports = function(app) {
  app.get("/", requireAuth, (req, res, next) => {
    res.json({ message: "You've been succefully authenticated" });
  });

  app.get("/test", requireAuth, (req, res, next) => {
    res.json({ message: "You're In!" });
  });

  app.post("/signup", signup);
  app.post("/signin", requireSignin, signin);
};
