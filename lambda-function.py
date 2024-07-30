import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('serverless-web-application-on-aws')

def lambda_handler(event, context):
    response = table.get_item(Key={'id': '0'})
    views = response['Item']['views']
    views += 1
    
    table.put_item(Item={
        'id': '0',
        'views': views
    })
    
    return {
        'statusCode': 500,
        'body': json.dumps(views)
    }
