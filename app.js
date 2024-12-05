const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const router = require("./routes/siswa");
const methodOver = require("method-override");
const routerUser = require("./routes/user");

require("./utils/db");

const app = express();

app.use(methodOver("_method"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(express.static('public'));
app.use("/user", routerUser);
app.use("/", router);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
