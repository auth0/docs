---
description: How to send events to Keen IO from Auth0.
---

# Sending events to Keen IO from Auth0

[Keen IO](http://keen.io) provides a service to capture and analyze events generated in your apps. In their words:

> Anlytics transforms data into answers – the kind of answers every company deserves. Unfortunately, a lot of companies a) can't find an analytics service that's right for their specific needs, and b) don't have the resources to develop their own analytics infrastructure. That's why we started Keen IO. Basically, we built it, so you don't have to. And we made it powerful, flexible, and scalable enough that you can use it however you need to – even if those needs change over time.large number of anayltics services with a single, simple to use API. 

This example shows how you can very easily connect Auth0 to __Keen IO__ and stream `signup` events. 

Implementing this with Auth0 is very easy, only taking a few lines of code.

![](/media/articles/tutorials/keen-io-dataflow.png)

### 1. Recording a __SignUp__ event in Keen IO:

This rule checks whether the user has already signed up before or not. This is tracked by the `user.signedUp` property. If the property is present then we assume return immediately, otherwise we assume a new `signup`. 


```
function(user, context, callback) {

  if(user.signedUp){
    return callback(null, user, context);
  }

  var writeKey = 'YOUR KEEN IO WRITE KEY';
  var projectId = 'YOUR KEEN IO PROJECT ID';
  var eventCollection = 'signups';

  var keenEvent = {
    userId: user.user_id,
    name: user.name,
    ip: context.request.ip //Potentially any other properties in the user profile/context
  };

  request.post({
      method: 'POST',
      url: 'https://api.keen.io/3.0/projects/' + projectId + '/events/' + eventCollection + '?api_key=' + writeKey,
      headers: {
        'Content-type': 'application/json',
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
> Notice that if all calls are successful, we signal the user as signed up. So next time we skip the entire rule.

Check out our [repository of Auth0 Rules](https://github.com/auth0/rules) for more great examples:

* Rules for access control
* Integration with other services: [MixPanel](http://mixpanel.com), [Firebase](http://firebase.com), [Rapleaf](http://rapleaf.com), [Parse](http://parse.com)
