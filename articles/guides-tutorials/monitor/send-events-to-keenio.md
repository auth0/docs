---
title: Send Logging Events to Keen
description: Learn how to send logging events to Keen from Auth0.
topics:
  - monitoring
  - keenio
contentType:
  - how-to
useCase:
  - analyze-auth0-analytics
  - analyze-logs
  - analyze-external-analytics
  - integrate-analytics
---
# Send Logging Events to Keen

[Keen](http://keen.io) provides a service to capture and analyze events generated in your apps. In their words:

> Analytics transforms data into answers – the kind of answers every company deserves. Unfortunately, a lot of companies a) can't find an analytics service that's right for their specific needs, and b) don't have the resources to develop their own analytics infrastructure. That's why we started Keen IO. Basically, we built it, so you don't have to. And we made it powerful, flexible, and scalable enough that you can use it however you need to – even if those needs change over time.

In this example, you will learn how to connect Auth0 to Keen and stream `signup` events. To implement this with Auth0, you just need to create one [Rule](/rule) in your pipeline.

![Keen IO Dataflow](/media/articles/tutorials/keen-io-dataflow.png)

## Record a sign-up event in Keen

Create a rule that will record user `signup` events for your apps in Keen. Please note:

* In this example, we expect your Keen credentials to be stored in the [global `configuration` object](/rules/current#use-the-configuration-object). Be sure to add your **Write Key** here before running your rule. Doing this allows you to use your key in multiple rules and prevents you from having to store it directly in the code.

* For this rule, we send contextual information, such as IP address (can be used to deduce location), user ID, and username. However, you can send any number of properties.

* For this rule, we track the event type using a __persistent__ property called `user.signedUp`. When the property is set to `true`, we return immediately. Otherwise, we assume the event is a new `signup`, and if everything goes well, we set the property to `true`. The next time the user signs in, this rule will be skipped.


```js
function(user, context, callback) {

  if(user.signedUp){
    return callback(null, user, context);
  }

  var writeKey = configuration.KEENIO_WRITE_KEY;
  var projectId = configuration.KEENIO_PROJECT_ID;
  var eventCollection = 'signups';

  var keenEvent = {
    userId: user.user_id,
    name: user.name,
    ip: context.request.ip //Potentially any other properties in the user profile/context
  };

  request.post({
      method: 'POST',
      url: 'https://api.keen.io/3.0/projects/' + projectId + '/events/' + eventCollection,
      headers: {
        "Authorization: " + writeKey,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(keenEvent),
      }, 
      function (e, r, body) {
        if( e ) return callback(e,user,context);
        //We assume everything went well
        user.persistent.signedUp = true;
        return callback(null, user, context);
       });
}
```

## Keep reading
Check out our [repository of Auth0 Rules](https://github.com/auth0/rules) for more great examples:

* Rules for access control
* Integration with other services: [MixPanel](http://mixpanel.com), [Firebase](http://firebase.com), [TowerData](https://www.towerdata.com/email-intelligence/email-enhancement), [Parse](http://parse.com), [Splunk](https://www.splunk.com), [Segment](https://segment.com/)
