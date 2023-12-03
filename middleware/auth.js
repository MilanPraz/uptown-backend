const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    // console.log("hello");
    let token = req.headers.authorization?.replace("bearer ", "");
    let loggedIn = false;

    try {
      if (token) {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        loggedIn = true;
        // console.log(decoded);
      }
    } catch (err) {}
    console.log(loggedIn);
    if (loggedIn) {
      next();
    } else {
      return res.status(401).send("Unauthorized Access");
    }
  } catch (err) {
    res.send({ error: err });
  }
};

module.exports = auth;
