# Authenticating & Authorizing a Tessel device with Auth0

[Tessel](https://tessel.io) is an amazing board. Not only it has a great hardware spec and a great extensibility story, you can program it Javascript! When it was announced on Kickstarter we immediately supported it and waited long weeks to get hold of one.

![](media/articles/scenarios/tessel/TM-00-04-ports.png)

It finally arrived and were able to write our first program: get a token from Auth0 and call an API.

> Tessel aims for full compatibility with Javascript. Most of core node modules also work, but not all of them. See [the docs for full details](https://github.com/tessel/docs/blob/master/compatibility.md).

## The sample

This example is straight-forward:

1. We call the `Resource Owner` endpoint on Auth0 with device credentials
2. Get a token back
3. We use the token to call an API

![](media/articles/scenarios/tessel/tessel-flow.png


```
var http = require('https');
var tessel = require('tessel');

tessel.syncClock(function () {

  var device_id = 'tessel-01';
  var password = 'THE TESSEL PASSWORD';

  authenticate(device_id, password, function(e,token){

    if(e) return console.log("Error:" + e);

    getDeviceProfile(token.access_token, function(e, profile){
      console.log("Device profile:");
      console.log(profile);
    });
  });

  function getDeviceProfile(token, done){
    request('eugeniopace.auth0.com',
          '/userinfo',
          'GET',
          {
          "Content-type": "application/json",
          "Authorization": "Bearer " + token
        },
        null, 
        function(e,response){
          if(e) return done(e);
          done(null, JSON.parse(response));
        });
  }

  function authenticate(device_id, password, done)
  {
    request('eugeniopace.auth0.com',
          '/oauth/ro',
          'POST',
          {
          "Content-type": "application/json",
        },
        JSON.stringify({
            client_id:   'YOUR CLIENT ID IN AUTH0', // {client-name}
            username:    device_id,
            password:    password,
            connection:  'devices',
            grant_type:  "password",
            scope: 'openid'
          }),
          function(e,response){
            if(e) return done(e);
            done(null, JSON.parse(response));
        });
  }

  function request(host, path, method, headers, body, done){
    var options = {
      hostname: host,
      path: path,
      method: method,
      headers: headers
    };

    var req = http.request(options, function(res) {
      res.setEncoding('utf8');

      var response = "";

      res.on('data', function (chunk) {
        response += chunk;
      });

      res.on('end', function(){
        done(null, response);
        });
    });

    req.on('error', function(e) {
      done(e);
    });

    if( body ) req.write(body);
    req.end();
  }
});
```

Noteworthy highlights of the code:

1. This is 99% compatible with node (the only device specific module.is `tessel` that we only use to make sure all SSL calls happen with adequate time references.
2. The `request` function, is a simple wrapper on `http` module functions. The `request` module doesn't currently work in Tessel.

The `Resource Owner` endpoint requires credentials (e.g. username/password), so the backend user store connected to Auth0 needs to support this (like a Database connection or Active Directory).

## Tessel Setup

* Run `tessel update` to make sure you install the latest firmware with SSL support.
* You will obviously need connection to the web. You can setup WiFi with the `tessel wifi` command.

## Summary
Tessel is awesome. We see a lot of potential. This sample shows how easy it is to connect it with Auth0.

> Always send credentials (e.g. `username`/`password`) over secured networks.





