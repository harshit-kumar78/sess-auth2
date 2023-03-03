const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "userName is mandatory"],
    unique: true,
  },
  password: { type: String, required: [true, "password is mandatory"] },
  orders: {
    type: [
      {
        orderId: { type: Number, unique: true },
        productName: {
          type: String,
          required: [true, "Product Name is mandatory"],
        },
        billAmount: {
          type: String,
          required: [true, "Bill Amount is mandatory"],
        },
      },
    ],
    default: [],
  },
});

let connection = {};
connection.getUserCollection = async () => {
  try {
    let conn = await mongoose.connect(
      "mongodb+srv://admin:root@mean-project.fhzjij3.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    // let userModel = await conn.model("Users", userSchema);
    let userModel = mongoose.model("Users", userSchema);
    return userModel;
  } catch (error) {
    if (error) {
      throw error;
    } else {
      let err = new Error("Database Connection failed");
      err.status = 500;
      throw err;
    }
  }
};
module.exports = connection;
