var express = require("express");
var router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");

router.get("/login", function (req, res, next) {
  res.sendFile(path.join(__dirname, "../", "public", "login.html"));
});

router.post("/connect", function (req, res, next) {
  const { username, password } = req.body;
  if (username === "john" && password === "doe") {
    const payload = { username, admin: true };
    const secretKey = "SuperSafeS3cr3tKey";
    const token = jwt.sign(payload, secretKey);
    res
      .set("x-authorization-token", token)
      .sendFile(path.join(__dirname, "../", "public", "checkToken.html"));
  } else res.redirect("login");
});

router.post("/checkJWT", function (req, res, next) {
  const { token } = req.body;
  console.log({ token });
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).send("Invalid token");
    console.log(payload);
    if (payload.admin) {
      res.redirect("admin");
    } else res.redirect("login");
  });
});

router.get('/admin', (req, res) => {
  res.send('welcome to the admin page')
})

module.exports = router;
