const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = require("./routes/routing");
const requestLogger = require("./utilities/requestLogger");
const errorLogger = require("./utilities/errorLogger");

// ------------------------- APPLICATION INSTANCE --------------------------
const app = express();

//=============================== MIDDLEWARE ================================
app.use(
  session({ secret: "user session", resave: false, saveUninitialized: false })
);
app.use(bodyParser.json());
// ===================== REQUESTLOGGER ===================================
app.use(requestLogger);
// ============================= ROUTES ==================================

app.use("/", router);

// ==================== ERRORLOGGER ======================================
app.use(errorLogger);
// ========================= PORT ========================================

app.listen(3000, () => console.log("http://localhost:3000"));
