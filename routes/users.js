const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const AWS = require("aws-sdk");
const keys = require("./../config/keys");
const User = require("./../models/user");

//Login Page
router.get("/login", (req, res) => res.render("login"));

//Register Page
router.get("/register", (req, res) => res.render("register"));

//Register Handle
router.post("/register", (req, res) => {
  console.log("register.req: ", req);
  console.log("register.req.body: ", req.body);
  const { fname, lname, email, password, password2 } = req.body;
  let errors = [];

  //check required fields
  if (!fname || !lname || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields!" });
  }

  //check password match
  if (password != password2) {
    errors.push({ msg: "Passwords do not match!" });
  }

  //check pass length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      fname,
      lname,
      email,
      password,
      password2,
    });
  } else {
    const dynamoDbObj = require("./../models/connect");
    console.log("register.dynamoDbObj: ", dynamoDbObj);
    let user = () => {
      var params = {
        TableName: "user",
        Key: {
          email: email,
        },
      };
      console.log("register.params: ", params);
      dynamoDbObj.get(params, function (err, data) {
        if (err) {
          throw err;
        } else {
          if (Object.keys(data).length > 0) {
            errors.push({ msg: "Email is already registered" });
            res.render("register", {
              errors,
              fname,
              lname,
              email,
              password,
              password2,
            });
          } else {
            // var hashedPwd = bcrypt.genSalt(10, (err,salt) =>
            // bcrypt.hash(password, salt, (err,hash) => {
            //     if(err) throw err;
            //     hashedPwd=hash;
            // }));
            // console.log(hashedPwd);

            const newUser = new User({
              fname,
              lname,
              email,
              password,
              level: "U",
            });
            console.log("register.newUser: ", newUser);
            //Hash password
            bcrypt.genSalt(10, (err, salt) =>
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                //set password to hashed
                newUser.password = hash;
                //save user
                newUser
                  .save()
                  .then((user) => {
                    console.log("User registered in Mongo");
                  })
                  .catch((err) => console.log(err));
              })
            );

            //update in dynamodb
            var input = {
              email: email,
              fname: fname,
              lname: lname,
              level: "U",
              password: password,
            };
            var params = {
              TableName: "user",
              Item: input,
            };

            dynamoDbObj.put(params, function (err, data) {
              if (err) {
                console.log(err);
              } else {
                req.flash("success_msg", "You are now registered!!");
                res.redirect("/users/login");
              }
            });
          }
        }
      });
    };

    user();
  }
});

//Login Handle
router.post("/login", (req, res, next) => {
  // console.log("login.req: ", req);
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

//logout handle
router.get("/logout", (req, res, next) => {
  req.logout();
  req.flash("success_msg", "You are Logged out");
  res.redirect("/users/login");
});

//google oauth
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res, next) => {
    res.redirect("/dashboard");
  }
);

//facebook oauth
router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook"),
  (req, res, next) => {
    res.redirect("/dashboard");
  }
);

module.exports = router;
