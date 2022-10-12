const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
//for file upload
// const multer = require("multer");

const app = express();

//passport config
require("./config/passport")(passport);

//DB config
const db = require("./config/keys").MongoURI;
// console.log("app.db: ", db);

// const dynamoDB = require("./models/connect");
// console.log("app.dynamoDB: ", dynamoDB);
//connect to Mongo

// mongoose.connect(db);
// var database = mongoose.connection;
// database.on("error", console.error.bind(console, "connection error:"));
// database.once("open", function callback() {
//   console.log("h");
// });

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb connected!!"))
  .catch((err) => console.log(err));

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//BodyParser
app.use(express.json());
app.use(express.urlencoded({ extented: false }));
app.use("/public/", express.static("./public"));

//Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/upload", require("./routes/file-upload"));
app.use("/delete", require("./routes/file-delete"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server has started`));
