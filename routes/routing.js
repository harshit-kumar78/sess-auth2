const { application } = require("express");
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

router.put("/place-order", async (req, res, next) => {
  try {
    let currentUser = req.session.currentUser;
    let orderData = req.body;
    let newOrderId = await userService.placeOrder(currentUser, orderData);
    if (newOrderId)
      res.json({
        message: `Order placed Successfully. Order Id: ${newOrderId}`,
      });
  } catch (err) {
    next(err);
  }
});

router.get("/orders", async (req, res, next) => {
  try {
    const currentUser = req.session.currentUser;
    const orders_array = await userService.getOrders(currentUser);
    res.send(orders_array);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
