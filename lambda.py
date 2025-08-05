import json
import boto3

# Initialize clients
# Create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
sns = boto3.client('sns')


# Use the DynamoDB object to select our table
table = dynamodb.Table('portfolio-messages')
# sns topic's arn 
sns_topic_arn = 'arn:aws:sns:your-region:your-account-id:YourTopicName'

# Define the handler function that the Lambda service will use as an entry point
def lambda_handler(event, context):
    # Extract values from the event object we got from the Lambda service and store in variables
    contact = event['contact']
    message = event['message']
    
    # Write Employee data to the DynamoDB table and save the response in a variable
    table.put_item(
        Item={
            'contact': contact,
            'message': message
        }
    )

    # publish sns topic.
    sns.publish(
    TopicArn=sns_topic_arn,
    Message=f"New message from {contact}: {message}",
    Subject='New Submission Received'
    )
    
    # Return a properly formatted JSON object
    return {
        'statusCode': 200,
        'body': json.dumps('Employee data saved successfully!')
    }
