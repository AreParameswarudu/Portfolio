# Portfolio
Portfolio-website   
Visit the site [using](https://myportfolio.param-world.click)

<img width="1437" height="651" alt="Screenshot 2025-08-04 205518" src="https://github.com/user-attachments/assets/46279784-d08a-474a-9de2-7ec189d3f45f" />  

# Objective:
 I want to use my knowledge of **AWS**, **Web development**, **Networking**, **Data Analytics**, Hosting a website in Cloud, **Serverless architecture** and to create, host and use/implement analytics on my own **personal portfolio website**.  
 This was possible with merely because of the fact I have/had **AWS free trail account** and a lots of interent towards doing/building **_something realtime_**.  

 NOTE: Well, despite the fact that I have/had a free tier account, it still costs me to host and server for realtime.

# How I structured it.
Each aspect of the architecture was segmented into each section and they are as follows,
### 1. Security, DNS and Certification
### 2. Content Delivery
### 3. Application (Frontend)
### 4. Backend for messaging
### 5. Analytics

# Prerequireties:
* AWS account.
* Own Domain.
* Knowledge on the usage of each service, and on cost associated on respective services.
* Patience.

Alright, here is a break down of each section, 

## Application (Frontend)

The frontend was a more of a simple static with little dynamic content.  
So choosing the **S3 static web hosting** service form AWS is justified.  
Using S3 is more cost effective and of less overhead to maintain.  
We can simply create a public bucket, add files and required folder into it, enable static web hosting from the properties section.  

But the problem is that it gives us the `http` url to access the site. so next section is about making this `http` url to be `https` and also attach the `SSL` certificate for it.  
For making a static web url to `https` we either go with **AWS Amplify** or need to choose **AWS CloudFront**.   
I went with **AWS CloudFront** so that I can server the website to the audience world wide with low latency.  

## Content Delivery
We can create a CloudFront distribution from any region but for the created distribution to have a `SSL` certificate or `CNAME` record, these can only be enabled for the region of `N.Virginia`.  
So creating a ClounFront distribution in `N.Virginia` is most advised.  
While creating distribution, we need to take a good core of the options that we enable or disable and a step by step instructions were mentioned in `instruction.md` file.  

During the creation of distribution, it asks us for to create SSL certificates in the ASM or use the one that already exist.  
Which leads us to the next section that is **Security, DNS and Certification**.  


## Security, DNS and Certification
Well practically, the security aspect that I have used in the project was use of **AWS WAF** to safegaurd the website, this actually is part of creating distribution.  
After the distribution was created and the respective records were creaeted in the **ACM**,   
we need to use **R53** to create a record with the domain we have and create a alias record for the record to route the traffic to CloudFront distribution.  

## Backend
Well the portfolio web site is not completely of a static content, it also has a messaging option. So the visiors can message me.  
I thought of going completely with serverless, so I opted to use **AWS API Gateway** to catch the message sent by visitors and to trigger the lambda function that I hvae setup.  
This Lamda function work is to take the content submitted by visitors and upload them to a storage unit in AWS and also alert me thorugh a simple SMS that a visitor left a message for you.  

For the storage, I choose **DynamoDB** which is less overhead to maintain.  


## Analytics
I wanted to know how often my website was being visited and from which geo-location people were visiting. So I thought of storing the logs of each session so that I can use analytics on them.  
For the storing of logs, we can either go with S3 bucket access logs or CloudFront Logs.  

CloudFront logs us the most essential details that helps me to know my audience. So I used the CloudFront logs and store them in either another S3 bucket or directly on AWS CloudWatch logs.  
By stroing the logs, I can use analytics on the logs and can analyze my audiences. For that I went with Athena to query the logs.

