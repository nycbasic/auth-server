const db = require("../model/index"),
  jwt = require("jwt-simple"),
  config = require("../config");

function jwtToken(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode(
    { sub: user.id, name: user.username, iat: timeStamp },
    config.secret
  );
}

exports.signin = (req, res, next) => {
  return res.send({ token: jwtToken(req.user) });
};

exports.signup = async (req, res, next) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(422).send({
      error: "All fields must be filled"
    });
  }
  await db.User.findOne(
    {
      email
    },
    "email username",
    async (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        return res.status(422).send({ error: "Email already exist" });
      }
      await db.User.create(req.body, (err, newUser) => {
        if (err) {
          return res.status(422).send({
            error: "Username already exist"
          });
        }
        res.json({
          message: "Sucess!",
          token: jwtToken(newUser)
        });
      });
    }
  );
};
