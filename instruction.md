# S3 Static hosting
 For s3 to get static web hosting, need to have a public bucket.  
 if not public then need extra setttings


# API gateway
For the api gateway, we need to enable the CROS.  
test the method created manually form the api test.  

 For this example the values that are noted and sent via post method were,   
		1. contact  
		2. message

```
	Query strings :  leave blank.

	Headers:  {  "Content-Type" : "application/json" }
	
	Client certification : normally not valued by default

	Request body:
		{
			"contact" : "9087654321",
			"message" : "message form the api"
		}
```
	

# Lambda function
For the lambda function,   
	do not change the function name other than given default. if changed, then change the same in the handler setting.  
	for the lambda function, the role should have   
			1. dynamodb-put-access			  
			2. and 2 more permission that were created by aws itself  
					2.1. basic execution role  
					2.2. lambdasnstopic
# SNS topic
For the SNS, use the standard type to get the mail, message to phone options.  

# Cloud Watch logs
Use cloud watch logs for the api gateway stage created.

	for this we need to create a role
	TE: api gateway
	Permission : amazonAPIGatewayPushToCloudWatchLogs
	
	we can see the logs and interpret them.
 
 
 # Cloud Front
Create a distribution, as cloud front is global, not to worry of region.  
Use the s3 web hosting endpoint for origin  
Leave the origin path ( optional ) blank if already setup the s3 web hosting.  
> [!NOTE]
> Remember to use the s3 web hosting endpoint not the s3 bucket name as origin.  

For **origin route**, use http, as **s3 supports only http** not https.  

We need to create a certificate CNAME in route r53.  
> [!NOTE]
> Remember that these certificates are to be created in US-EAST-1 ( N. Virginia region only ).  

While creating a certificate, use DNS validation over email verification.  

Once the certificate is defined, it will provide the records, add those to the r53 only then the certificate will be validated.  

Once the clod front is defined, head to r53, create a A record with proper website name and use alias to the cloudfront endpoint.  



# Reflecting any updates to s3 bucket files
By default, if we make any changes to the files in s3 bucket, those will be reflected immediately in the application when accessd using s3 static end point.  

But those wont be reflected in the application when accessed using cloud front distribution.

#### Reason:
Cloud front uses TTL (Time to Live), to store the cache of the contents of files or obejects.  
Untill the cache time (TTL) is expired, the old content is sreved with cloudfront.

## How to override the old Content
_Use INVALIDATION option in the cloudfront._

1. Go to cloud front, access the respective distribution.

2. switch to the invalidate option, create invalidation, specify the objects/files path in the bucket to recache or override the old cache.

		EX: /index.html	
			/assest/img/

3. save.

4. AWS will automatically start the invalidation.
