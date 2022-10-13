const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const multer = require("multer");
const keys = require("../config/keys");
const Files = require("./../models/files");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("QRImage_Saver");

router.post("/", (req, res) => {
  upload(req, res, (err) => {
    // console.log('User is');
    // console.log(req.user);
    const moment = require("moment");
    //File Upload started
    var startDate = new Date();

    //get user details
    const email = req.user.email;
    const fname = req.user.fname;
    const lname = req.user.lname;
    const file = req.file;

    if (!file) {
      req.flash("error_msg", "Please select a file");
      res.redirect("/dashboard");
    } else {
      //for s3 bucket
      const s3FileURL = "https://phani-qrsaver.s3.us-west-1.amazonaws.com";

      console.log("Starting the QRSaver Bucket");
      let s3bucket = new AWS.S3({
        accessKeyId: keys.AwsAccessKeyId,
        secretAccessKey: keys.AwsSecretAccessKey,
        region: keys.region,
        s3BucketEndpoint: false,
        endpoint: "s3.amazonaws.com",
        port: 443,
      });

      var myFileName = file.fieldname + "_" + Date.now();
      //for s3 bucket
      var s3params = {
        Bucket: "phani-qrsaver",
        Key: myFileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      };
      s3bucket.upload(s3params, function (err, data) {
        if (err) {
          console.log(err);
          //res.status(500).json({error: true, Message: err});
        } else {
          //success
          req.flash("success_msg", "QR Code has been Successfully Uploaded!");
          res.redirect("/dashboard");
          //updating in dyanamodb
          var endDate = new Date();
          //dynamoDb
          var input = {
            email: email,
            createdDate: Date.now(),
            fileDesc: file.originalname,
            fileName: myFileName,
            fileUrl: data.Location,
            modifiedDate: Date.now(),
            fname: fname,
            lname: lname,
            uploadTime: (endDate - startDate) / 1000,
          };

          const dynamoDbObj = require("./../models/connect");

          var paramsDb = {
            TableName: "files",
            Item: input,
            Key: {
              fileName: input.fileName,
            },
          };

          dynamoDbObj.put(paramsDb, function (err, data) {
            if (err) {
              console.log(err);
            } else {
              console.log("File uploaded");
            }
          });

          //mongo
          const newFile = new Files({
            fname: fname,
            lname: lname,
            email: email,
            fileUrl: data.Location,
            fileName: myFileName,
            fileDesc: file.originalname,
            uploadTime: (endDate - startDate) / 1000,
            modifiedDate: (endDate - startDate) / 1000,
          });
          //check if already exisits
          Files.findOne({ fileName: file.originalname }).then((fileName) => {
            newFile
              .save()
              .then((file) => {
                console.log("File Uploaded");
              })
              .catch((err) => console.log(err));
          });
        }
      });
    }
  });
});

module.exports = router;
