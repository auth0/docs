---
description: How to send events to segment.io from Auth0
tags:
  - monitoring
  - segmentio
---
# Send Auth0 Events to Segment

[Segment](http://segment.io/features) provides a large number of analytics-related functionality with a single, simple to use API.

This example shows how you can connect Auth0 to Segment and stream `signup` and `login` events. You'll be using [Segment's Node.js library](https://github.com/segmentio/analytics-node) to record Auth0 data.

![Segment Flow](/media/articles/monitoring/segment/segment-io-dataflow.png)

## Find your Segment Write Key

To configure this integration, you'll need your Segment **Write Key**. You can find this under **Settings** > **API**.

![Segment API Keys](/media/articles/monitoring/segment/segment-3.png)

## Record sign up and login events

To record Auth0 signup and login events and send the information to Segment, you will create a [rule](/rules) implementing Segment's Node.js library.

::: note
Be sure to add your **Write Key** to the [Global Configuration Object](/rules#using-the-configuration-object) prior to running your rule.
:::

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

## Check your integration

To see if your integration works, you can check the Segment Debugger to see if your Auth0 events are appearing.

![Segment Debugger](/media/articles/monitoring/segment/segment-14.png)
