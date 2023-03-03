const fs = require("fs");

const errorLogger = (err, req, res, next) => {
  let errorMessage = `${new Date()} - ${err.stack}\n`;
  fs.appendFile("./errorLogger.txt", errorMessage, (error) => {
    if (error) console.log("logging error failed");
    else {
      err.status ? res.status(err.status) : res.status(500);
      res.json({ message: err.message });
    }
  });
};
module.exports = errorLogger;
