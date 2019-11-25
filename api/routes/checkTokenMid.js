const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (!token) {
    return res.json({
      success: false,
      message: "This route requires authentication"
    });
  }
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
console.log(token)
  if (token) {
    jwt.verify(token, 'cheieSecretaDeMutatDOTENV', (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: err.message
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};

module.exports = {
  checkToken: checkToken
};