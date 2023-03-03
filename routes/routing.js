const express = require("express");
const router = express.Router();
const userService = require("../service/user");

router.post("/register", async (req, res, next) => {
  try {
    let userObj = req.body;
    let registeredUser = await userService.register(userObj);
    res.json({ message: `${registeredUser.userName} registered successfully` });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    let userObj = req.body;

    let userData = await userService.login(userObj);
    req.session.currentUser = userData;
    res.json({ message: `${userData.userName} logged in successfully` });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
