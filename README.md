
![Logo](https://github.com/phanisaimunipalli/AWS-QR-Saver/blob/master/public/images/qrsaver_logo.png?raw=true)

Welcome to the AWS QR Saver
==================================================

We come across many QR Codes daily and it is hard to track all of them when they are mixed with our personal photos in the gallery. The QR Saver solves this problem with a powerful **AWS Cloud Solution** to allow users to upload, update, download and delete your QR Codes from anywhere in the world.


Coursework
-----------
This web application is powered by AWS CodeStar and developed as part of CMPE-281 Project assignment leveraging AWS Cloud services, deployed by **AWS CloudFormation** to **AWS Elastic Bean Stalk** and **Amazon API Gateway**.

*	University: [San Jose State University](http://www.sjsu.edu/)
* Course: Cloud Technologies (CMPE-281)
*	Professor: [Sanjay Garje](https://www.linkedin.com/in/sanjaygarje/)
*	Student: [Phani Sai Ram Munipalli](https://www.linkedin.com/in/iamphanisairam/)
* Major: Masters in Software Engineering

What's Here
-----------

This application includes:

* README.md - this file
* buildspec.yml - this file is used by AWS CodeBuild to package your
  application for deployment to AWS Elastic Bean Stalk
* index.js - this file contains the sample Node.js code for the web service
* tests/ - this directory contains unit tests for your application
* template-configuration.json - this file contains the project ARN with placeholders used for tagging resources with the project ID




## Features

- High Availability
- CloudFront Distribution
- Auto Scaling
- Multi Regional AZs


## Tech Stack

**Client:** Embedded JavaScript, Bootstrap, CSS, HTML5

**Server:** Node, Express

**Libraries:** passport, aws-sdk, aws-s3, bcrypt, mongoose

**Database:** AWS Dynamo DB

**AWS Cloud Services:** AWS S3, Elastic Bean Stalk, CloudFront, CloudWatch, EC2, Elastic Load Balancer, Auto Scaling Group, Lambda, Multi AZ


## Run Locally

Clone the project

```bash
  git clone https://github.com/phanisaimunipalli/AWS-QR-Saver.git
```

Go to the project directory

```bash
  cd aws-qrsaver
```

Install dependencies

```bash
  npm install
```

Configuration

``Update DynamoDB AccessKeys' details with your custom user generated credentials.``

Start the server

```bash
  npm run start
```


## Documentation

[QR Saver Deep Dive](https://github.com/phanisaimunipalli/AWS-QR-Saver/blob/master/screenshots/Project1-AWS-QR-Saver.pdf?raw=true)


## Optimizations

Created the application with maximum scalability and availbility across different regions in the Globe using AWS AZs. Disaster recoveries, Cross-Region Buckets for AWS S3, Auto Start of EC2 Instance, Various Datapoints and monitoring metrics continously watched using CloudWatch dashboards. 


## Screenshots


**New User Registration** 

![User Registration](https://github.com/phanisaimunipalli/AWS-QR-Saver/blob/master/screenshots/qrsaver-register.gif?raw=true)


**Custom Login** 

![Custom Login](https://github.com/phanisaimunipalli/AWS-QR-Saver/blob/master/screenshots/qrsaver-customlogin.gif?raw=true)


**Upload File** 

![File Upload](https://github.com/phanisaimunipalli/AWS-QR-Saver/blob/master/screenshots/qrsaver-fileupload.gif?raw=true)


**Check in AWS S3** 

![Check in AWS s3](https://github.com/phanisaimunipalli/AWS-QR-Saver/blob/master/screenshots/qrsaver-fileupload-s3.gif?raw=true)


**File record in DynamoDB** 

![File DynamoDB](https://github.com/phanisaimunipalli/AWS-QR-Saver/blob/master/screenshots/qrsaver-fileupload-dynamodb.gif?raw=true)


**Delete File** 

![Delete File](https://github.com/phanisaimunipalli/AWS-QR-Saver/blob/master/screenshots/qrsaver-filedelete.gif?raw=true)

**Admin Panel** 


![Admin Panel](https://github.com/phanisaimunipalli/AWS-QR-Saver/blob/master/screenshots/qrsaver-admin.gif?raw=true)

**QR Saver AWS Elastic Beanstalk** 

![QRSaver Beanstalk](https://github.com/phanisaimunipalli/AWS-QR-Saver/blob/master/screenshots/qrsaver-elasticbean.gif?raw=true)


**QRS - AWS CodePipeline** 

![AWS CodePipeline](https://github.com/phanisaimunipalli/AWS-QR-Saver/blob/master/screenshots/qrsaver-codepipeline.gif?raw=true)


**QRS - AWS CloudWatch** 

![AWS CloudWatch](https://github.com/phanisaimunipalli/AWS-QR-Saver/blob/master/screenshots/qrsaver-cloudwatch.gif?raw=true)


**QRS - AWS CloudFront** 

![AWS CloudFront](https://github.com/phanisaimunipalli/AWS-QR-Saver/blob/master/screenshots/qrsaver-cloudfront.gif?raw=true)


**QRS - AWS Lambda Restart** 

![AWS Lambda](https://github.com/phanisaimunipalli/AWS-QR-Saver/blob/master/screenshots/qrsaver-lambda.gif?raw=true)

**QRS - AWS SNS** 

![AWS SNS](https://github.com/phanisaimunipalli/AWS-QR-Saver/blob/master/screenshots/qrsaver-sns.png?raw=true)

**Custom Files** 

![Custom Files](https://github.com/phanisaimunipalli/AWS-QR-Saver/blob/master/screenshots/qrsaver-files-custom.gif?raw=true)



## Authors

- [@phanisaimunipalli](https://www.github.com/phanisaimunipalli)

