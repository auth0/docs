---
title: Send Logging Events to Segment
description: Learn how to send logging events to Segment from Auth0.
topics:
  - monitoring
  - segmentio
contentType:
  - how-to
useCase:
  - analyze-auth0-analytics
  - analyze-logs
  - analyze-external-analytics
  - integrate-analytics
---
# Send Logging Events to Segment

[Segment](https://segment.com/) provides a large number of analytics-related functionality with a single, simple to use API.

In this example, you will learn how to connect Auth0 to Segment and stream `signup` and `login` events. To implement this with Auth0, you just need to create one [Rule](/rule) in your pipeline.

![Segment Flow](/media/articles/monitoring/segment/segment-io-dataflow.png)

You'll be using [Segment's Node.js library](https://github.com/segmentio/analytics-node) to record Auth0 data.

## 1. Find your Segment Write Key

To configure this integration, you'll need your Segment **Write Key**. You can find this under Segment's  **Settings** > **API**.

![Segment API Keys](/media/articles/monitoring/segment/segment-3.png)

## 2. Record sign-up and log-in events in Segment

Create a rule to record user `signup` and `login` events for your apps and send the information to Segment using Segment's Node.js library.

In this example, we expect your Segment credentials to be stored in the [global `configuration` object](/rules/current#use-the-configuration-object). Be sure to add your **Write Key** here before running your rule. Doing this allows you to use your key in multiple rules and prevents you from having to store it directly in the code.


```js
function(user, context, callback) {
  var Analytics = require('analytics-node');
  var analytics = new Analytics(configuration.WRITE_KEY, { flushAt: 1 });

  // Note: Set { flushAt: 1 } and use analytics.flush to ensure
  // the data is sent to Segment before the rule/Webtask terminates

  // Identify your user
  analytics.identify({
      userId: user.user_id,
      traits: {
      email: user.email,
      signed_up: user.created_at,
      login_count: user.logins_count
    },
    "context": {
      "userAgent": context.request.UserAgent,
      "ip": context.request.ip
    }
  });
  analytics.track({
    userId: user.user_id,
    event: 'Logged In',
    properties: {
      clientName: context.clientName,
      clientID: context.clientID,
      connection: context.connection
    },
    "context": {
      "userAgent": context.request.UserAgent,
      "ip": context.request.ip
    }
  });
  analytics.flush(function(err, batch){
    callback(null, user, context);
  });
}
```

## 3. Check your integration

See if your integration works by checking the Segment Debugger to see if your Auth0 events are appearing.

![Segment Debugger](/media/articles/monitoring/segment/segment-14.png)


## Keep reading

Check out our [repository of Auth0 Rules](https://github.com/auth0/rules) for more great examples:

* Rules for access control
* Integration with other services: [MixPanel](http://mixpanel.com), [Firebase](http://firebase.com), [TowerData](https://www.towerdata.com/email-intelligence/email-enhancement), [Parse](http://parse.com), [Splunk](https://www.splunk.com), [Keen](https://keen.io/)
