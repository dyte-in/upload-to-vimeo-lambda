<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS'
description: 'This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Upload to Vimeo Lambda
Simple lambda function which uploads any Dyte recordings to vimeo using API.


## Usage

Change `VIMEO_API_KEY` in `serverless.yml` with your VIMEO API key. Refer to [this guide](https://developer.vimeo.com/api/guides/start) to get an API key.

### Deployment

```
$ serverless deploy
```

After deploying, you should see output similar to:

```bash
Deploying upload-to-vimeo-lambda to stage dev (us-east-1)

✔ Service deployed to stack upload-to-vimeo-lambda-dev (94s)

dashboard: https://app.serverless.com/xxxxxx/apps/upload-to-vimeo/upload-to-vimeo-lambda/dev/us-east-1
endpoint: POST - https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [http event docs](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/).

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
curl https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/
```

Which should result in response similar to the following (removed `input` content for brevity):

```json
❯ serverless invoke -f upload -p test.json
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Upload to vimeo done\"\n}"
}
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local -f upload -p test.json
```

Which should result in response similar to the following:

```
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Upload to vimeo done\"\n}"
}
```