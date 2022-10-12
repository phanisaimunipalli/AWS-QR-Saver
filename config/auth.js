module.exports = {
  ensureAuthenticated: function (req, res, next) {
    console.log("config.auth.req: ", req);
    if (req.isAuthenticated()) {
      return next();
    }

    req.flash("error_msg", "Please login to view this resource");
    res.redirect("./users/login");
  },
};
