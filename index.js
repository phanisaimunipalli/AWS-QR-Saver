"use strict";

var fs = require("fs");
var path = require("path");

exports.get = function (event, context, callback) {
  var contents = fs.readFileSync(`views${path.sep}welcome.ejs`);
  var result = {
    statusCode: 200,
    body: contents.toString(),
    headers: { "content-type": "text/html" },
  };

  callback(null, result);
};
