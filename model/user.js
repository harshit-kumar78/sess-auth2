const connection = require("./connection");
const usersDB = {};

usersDB.register = async (userObj) => {
  let userModel = await connection.getUserCollection();
  let registeredUser = await userModel.create(userObj);
  if (registeredUser) return registeredUser;
  else return null;
};

usersDB.login = async (userName) => {
  let userModel = await connection.getUserCollection();
  let userData = await userModel.findOne({ userName: userName });
  if (userData) return userData;
  else return null;
};

usersDB.generateOrderId = async () => {
  let userModel = await connection.getUserCollection();
  let orderIds = await userModel.distinct("orders.orderId"); //important method
  if (orderIds.length) {
    let max_order_Id = Math.max(...orderIds);
    return max_order_Id + 1;
  } else {
    return 1001;
  }
};

usersDB.placeOrder = async (userName, orderData) => {
  let newOrderId = await usersDB.generateOrderId();
  orderData.orderId = newOrderId;
  let userModel = await connection.getUserCollection();
  let orderConfirmation = await userModel.updateOne(
    { userName: userName },
    { $push: { orders: orderData } }
  );

  if (orderConfirmation.modifiedCount > 0) return newOrderId;
  else return null;
};

usersDB.getOrders = async (userName) => {
  let usersModel = await connection.getUserCollection();
  let ordersObj = await usersModel.findOne(
    { userName: userName },
    { orders: 1, _id: 0 }
  );
  if (ordersObj) return ordersObj;
  else return null;
};
module.exports = usersDB;
