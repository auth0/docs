---
title: Stream Auth0 Log Events to Slack
description: Use the HTTP Event Log Streams to send failed events to Slack.
toc: false
topics:
  - logs
  - streams
  - event-streams
  - http-event
  - Slack
contentType: how-to
---

# Send Auth0 Failed Log Events to Slack

This guide explains how to use [Auth0 Log Streaming](/logs/streams) to send specific logged events to Slack. The events sent in this guide include all failures (e.g., logins, signups, token exchange) and limits (e.g., rate limits, anomaly detection).

Using this guide, you will build the following:

![Stream Auth0 Log Events to Slack](/media/articles/logs/log-stream-to-slack-diagram.png)

1. Application 1 and 2 both redirect to Auth0 to log in
2. The login for Application 2 succeeds, but the login for Application 1 fails; both events create a distinct log record
3. Both applications receive a response from Auth0
4. These log events are sent together in a JSON payload to the custom webhook
5. The webhook filters out the successful event
6. The webhook sends the failed event to Slack

To learn how to adjust the filter used here for different scenarios, see our [Log Event Type Codes](/logs/references/log-event-type-codes) reference.

## What is Slack

Slack is a business communication platform that can be extended using custom applications. Many companies, including Auth0, use Slack for general team communication as well as a notification platform.

## Get started with Slack

Go to [Slack API Applications](https://api.slack.com/apps), and log in to your Slack account. Follow instructions in the [Incoming Webhooks for Slack](https://slack.com/help/articles/115005265063-Incoming-Webhooks-for-Slack) guide to create a Slack endpoint that will accept the failed log events. Make sure to leave your browser tab open or copy the URL provided as you'll need that later in this guide.

## Deploy the webhook

You'll build a simple Express API that provides a single `/api/logs` route accepting POST requests. When any log event happens, it will be sent to this endpoint. If the request is formatted properly, the log events for failures will be parsed and sent to Slack.

 Start with a simple Express application:

```js
// app.js
require("dotenv").config();

const express = require("express");
const http = require("http");

const app = express();
app.use(express.json());

app.post("/api/logs", require("./api/logs"));

const port = process.env.PORT || 3000;
http.createServer(app).listen(port, () => {
  console.log(`Listening on port <%= "${port}" %>`);
});
```

Then add the endpoint middleware:

```js
// api/logs/index.js
const got = require("got");

module.exports = async (req, res, next) => {
  const { body, headers } = req;

  if (!body || !Array.isArray(body)) {
    return res.sendStatus(400);
  }

  if (headers.authorization !== process.env.AUTH0_LOG_STREAM_TOKEN) {
    return res.sendStatus(401);
  }

  const failedLogs = body.filter((log) => {
    return "f" === log.data.type[0] || /limit/.test(log.data.type);
  });

  if (failedLogs.length === 0) {
    return res.sendStatus(204);
  }

  const reqUrl = process.env.SLACK_WEBHOOK_URL;
  const reqOpts = {
    json: {
      attachments: failedLogs.map((log) => {
        return {
          pretext: "*Auth0 log alert*",
          title: `<%= " ${log.data.description}" %> [type: <%= "${log.data.type}" %>]`,
          color: "#ff0000",
          title_link: `https://manage.auth0.com/#/logs/<%= "${log.data.log_id}" %>`
        };
      }),
    },
  };

  try {
    const slackResponse = await got.post(reqUrl, reqOpts);
    res.status(slackResponse.statusCode);
    return res.end(slackResponse.body);
  } catch (error) {
    next(error);
  }
};
```

Finally, add the NPM package file:

```json
// package.json
{
  "dependencies": {
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "got": "^10.7.0"
  },
  "scripts": {
    "start": "node app.js",
  }
}
```

To configure this application, you'll also need the following environment variables:

- `SLACK_WEBHOOK_URL`: The URL provided by Slack for your incoming webhook application.
- `AUTH0_LOG_STREAM_TOKEN`: Optional, but recommended. A long, random string used to protect the endpoint from unauthorized requests. You will use this value in the Auth0 configuration steps below as well.

If you are testing this locally or hosting this endpoint yourself, these can be saved in a `.env` file in the application's root directory. For hosting providers like Heroku, Dokku, and similar, consult the platform's documentation for the correct way to deploy these.

Once configured locally or deployed to your host, you can test the endpoint and its connection to Slack with the following:

```bash
npm install # If running yourself
added XX packages from XX contributors in XX.XXs

npm start # If running yourself 
Listening on port 3000

# Replace the Authorization header below
curl \
  --header "Authorization: AUTH0_LOG_STREAM_TOKEN_VALUE" \
  --header "Content-Type: application/json" \
  --request POST \
  --data '[{"data": {"type": "f", "description": "Test failure", "client_id": "TestClientId", "client_name": "Test Client Name", "log_id": "abc1234567890"}}]' \
  http://localhost:3000/api/logs
ok
```

The `ok` above signals that the request was accepted and processed correctly. In Slack, you should see the following message in the channel you configured:

![Stream Auth0 Log Events to Slack](/media/articles/logs/log-stream-to-slack-message.png)

## Configure an Auth0 log stream

The final step is to configure Auth0 to send log events to this webhook using an HTTP event stream.

To create a new stream poinint to your deployed Express application, follow the instructions in [HTTP Event](/logs/streams/http-event). Use the following field values:

- **Payload URL**: URL to your deployed webhook like `https://[host domain]/api/logs`
- **Authorization Token**: Value configured above
- **Content Type**: Use "application/json"
- **Content Format**: Use "JSON Array"

Once this is saved, your log stream is ready to use. To test, you'll need to trigger a failing log event. The simplest way to do that is to attempt to log in with an incorrect email or password. If the stream is configured correctly, you should see a Slack message saying:

`Wrong email or password. [type: fu]`

## Troubleshoot

If you're not seeing the Slack message appear after several seconds, you'll need to walk down the same path a log event would:

1. Check the Dashboard **Logs > Search** screen to make sure the record is there.
2. Check the **Health** tab for the stream ([delivery attempts and retries](/logs/streams/http-event#delivery-attempts-and-retries)).
3. If the webhook delivery is succeeding, check the logs for your deployed application.

## More on Log Streams

::: next-steps
* [HTTP Event Log Streams](/logs/streams/http-event)
* [Amazon EventBridge Log Streams](/logs/streams/amazon-eventbridge)
* [Datadog Event Log Streams](/logs/streams/datadog)
* [Azure Event Grid Log Streams](/logs/streams/azure-event-grid)
:::
