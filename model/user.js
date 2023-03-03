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
module.exports = usersDB;
