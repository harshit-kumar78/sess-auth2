const usersDB = require("../model/user");

let throwError = (errorMessage, statusCode) => {
  let err = new Error(errorMessage);
  err.status = statusCode;
  throw err;
};
const userService = {};

userService.register = async (userObj) => {
  let registeredUser = await usersDB.register(userObj);
  return registeredUser
    ? registeredUser
    : throwError("User Registration Failed", 500);
};

userService.login = async (userObj) => {
  let userData = await usersDB.login(userObj.userName);
  if (!userData) {
    throwError("Email Id is not Registered", 404);
  } else if (userData.password !== userObj.password) {
    throwError("Invalid Password", 403);
  } else {
    return userData;
  }
};

module.exports = userService;
