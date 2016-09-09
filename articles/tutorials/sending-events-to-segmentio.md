# Sending events to segment.io from Auth0

[segment.io](http://segment.io/features) provides access to large number of anayltics services with a single, simple to use API. 

This example shows how you can very easily connect Auth0 to __segment.io__ and stream `signup` and `login` events. 

Implementing this with Auth0 is very easy, only taking a few lines of code.

![](/media/articles/tutorials/segment-io-dataflow.png)

### 1. Recording a __SignUp__ or __Login__ event in segment.io:

This rule checks whether the user has already signed up before or not. This is tracked by the `user.signedUp` property. If the property is present then we assume this is a `login` event, otherwise we assume a new `signup`. 

The `sendEvent` function is a simple wrapper around the __segment.io REST API__ which is trivial to call using the provided `request` module. Notice we are also sending some additional contextual information: the __IP address__ and __User Agent__ of the user.


```
function(user, context, callback) {

  if(user.signedUp){
    sendEvent('login');
  } else {
    sendEvent('signup');  
  }
  
  function sendEvent(e)
  {
    var sioTrack =  
    {
      secret: "YOUR SEGMENTIO SECRET",
      userId: user.user_id,
      event: e,
      properties: {
        application: context.clientName,
        ip: context.ip,
        agent: context.userAgent
      },
      context: {
        "providers" : { "all": false }
      }
    };

    request({
      method: 'POST',
      url: '  https://api.segment.io/v1/track',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(sioTrack),
    }, 
    function (err, response, body) {
      if(err) return callback(err, user, context);
      if(e === 'signup'){ user.persistent.signedUp = true; }
      callback(null, user, context);
    });
  }
}
```
> Notice that if all calls are successful, we signal the user as signed up. So next time we record `login`.

Check out our [repository of Auth0 Rules](https://github.com/auth0/rules) for more great examples:

* Rules for access control
* Integration with other services: [Firebase](http://firebase.com), [Rapleaf](http://rapleaf.com), [Parse](http://parse.com)
