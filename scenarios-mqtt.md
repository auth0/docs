# Authenticating & Authorizing Devices using MQTT with Auth0

[MQTT](http://en.wikipedia.org/wiki/MQ_Telemetry_Transport) is a light-weight protocol often used for devices to communicate with other systems. It is designed for the __publish/subscribe__ messaging pattern.

Generally speaking there are 3 components:

1. A `publisher` of messages.
2. A `subscriber` to messages.
3. A `broker` that connects one and the other.

There's a notion of `topics` (a.k.a. as `channels` or `subjects`) which messages are associated with. Topics are used to route messages between publishers and subscribers.

The MQTT protocol supports a basic authentication mechanism based on `usernames` & `passwords`. These credentials are sent with the `CONNECT` message.

This article shows an integration between nodejs based MQTT broker: [mosca](https://github.com/mcollina/mosca) and [Auth0](http://auth0.com). In this example, Auth0 is used to __authenticate__ `publishers` and `subscribers` to the broker, and then __authorize__ routing of messages.

> mosca is a nodejs based messaging broker that implements other protocols besides MQTT. It offers great extensibility features. It is surprisingly simple to integrate with Auth0.

![](https://docs.google.com/drawings/d/1hMahWH3Q0YBs5vT8Ubl-uLgvkcoo5f6Q0crMHbAqi6k/pub?w=854&amp;h=521) 

##Components of the solution

###The Broker

__mosca__ is straight forward to host and can be embedded in other servers. For the purpose of this sample, we simply self-host a __mosca__ server:


```
var mosca = require('mosca')
var Auth0Mosca = require('./auth0Mosca');

var settings = {
  port: 9999,
};

var auth0 = new Auth0Mosca('https://eugeniop.auth0.com', '{Your AUTH0 ClientID}', '{Your Auth0 Client Secret}','Thermostats');

//Setup the Mosca server
var server = new mosca.Server(settings);
server.on('ready', setup);

// Fired when the mqtt server is ready
function setup() {

  server.authenticate = auth0.authenticate();
  server.authorizePublish = auth0.authorizePublish();
  server.authorizeSubscribe = auth0.authorizeSubscribe();

    console.log('Mosca server is up and running');
}

server.on('clientConnected', function(client) {
  console.log('New connection: ', client.id );
});
``` 

This creates a server listening for MQTT messages on port 9999. __mosca__ allows you to override the 3 functions used to authenticate and authorize operations. 

In this sample, we are using a very simple module `Auth0Mosca` to perform these functions. Auth0 is wired up to __mosca__ in the `Setup` function.

###The Auth0Mosca module

This little module provides the 3 functions used by __mosca__:

```
var request = require('request');
var jwt = require('jsonwebtoken');

function Auth0Mosca(auth0Namespace, clientId, clientSecret, connection)
{
  this.auth0Namespace = auth0Namespace;
  this.connection = connection;
  this.clientId = clientId;
  this.clientSecret = clientSecret;
}

Auth0Mosca.prototype.authenticate = function(){

  var self = this;

  return function(client, username, password, callback) {

     var data = {
        client_id:   self.clientId, // {client-name}
        username:    username,
        password:    password,
        connection:  self.connection,
        grant_type:  "password",
        scope: 'openid profile'
    };

    request.post({
        headers: {
                "Content-type": "application/json"
            },
        url: self.auth0Namespace + '/oauth/ro',
        body: JSON.stringify(data)
      }, function(e,r,b){
        if(e){ 
          console.log('Error in Authentication');
          return callback(e,false);
        }
        var r = JSON.parse(b);

        if( r.error ) { return callback( r, false); } 

        jwt.verify(r.id_token, new Buffer(self.clientSecret, 'base64'), function(err,profile){
          if( err ) { return callback("Error getting UserInfo", false); }
          client.deviceProfile = profile;
          return callback(null, true);
        });
    });
  }
}

Auth0Mosca.prototype.authorizePublish = function() {
  return function (client, topic, payload, callback) {
   callback(null, client.deviceProfile && client.deviceProfile.topics && client.deviceProfile.topics.indexOf(topic) > -1);
  }
}

Auth0Mosca.prototype.authorizeSubscribe = function() {
  return function(client, topic, callback) {
  callback(null, client.deviceProfile && client.deviceProfile.topics && client.deviceProfile.topics.indexOf(topic) > -1);
}

module.exports = Auth0Mosca;

```

Here we are using the [OAuth2 Resource Owner Password Credential Grant](https://docs.auth0.com/protocols#9) to authenticate the broker and all connections to it. Each time a `publisher` or a `subscriber` send a CONNECT message to the broker the `authenticate` function is called. In it we call the Auth0 endpoint and forward the device `username`/`password`. Auth0 validates this against it's account store (that is the first `request.post` in the code). If successful, it parses the Json Web Token for the device profile and adds it to the `client` object that represents either the `subscriber` or the `publisher`. Thats's done in the `jwt.verify` call.

By convention, all devices connected to the broker have an account in Auth0:

![](http://puu.sh/7JNZP.png)

Notice that the Device profile has also a property `topics`. This is an array with all topics this particular device is allowed to. In the screenshot above, `thermostat-1a` will be allowed publishing to topics `temperature` and `config`.

The `authorizePublish` and `authorizeSubscribe` functions simply check that a particular topic is present in this list. 

###The Publisher

For this sample, the publisher is a simple nodejs program that uses the `mqtt` module. And adds the right credentials:

```
var mqtt = require('mqtt')
  , host = 'localhost'
  , port = '9999';

var settings = {
  keepalive: 1000,
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  clientId: 'Thermostat 1a',
  username:'thermostat-1a',
  password:'the password'
}

// client connection
var client = mqtt.createClient(port, host, settings);

setInterval(sendTemperature, 2000, client);

function sendTemperature(client){ 
  var t = {
    T: Math.random() * 100,
    Units: "C"
  };

  client.publish('temperature', JSON.stringify(t));
}
```

Of course `username` & `password` here will have to match whatever it is stored in Auth0.

###The subscriber
The subscriber is very similar to the publisher:

```
var mqtt = require('mqtt')
  , host = 'localhost'
  , port = '9999';

var settings = {
  keepalive: 1000,
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  clientId: 'Reader-X1',
  username:'reader-X1',
  password:'the password'
}

// client connection
var client = mqtt.createClient(port, host, settings);


client.subscribe('temperature');

client.on('message', function(topic, message) {

  if(topic ==='temperature')
  {
    console.log('New reading', message);
  }
});
```
##Summary
This shows how easy it is to use Auth0 in various sceanrios. Auth0's user store is being used to manage devices. Of course much more sophisticated authorization rules could be written based on other conditions: time, location, deviceId, etc. All these would be very simple to implement, either through additional profile attributes or through [Auth0 Rules](rules). This also shows how the flexible Auth0 Profile can be extended to support arbitrary artifacts (e.g. `topics` in the example). 

> Caveats: it is never a good idea to send credentials (`username`/`password`) over unsecured networks. There are other implementations that provide transport level security that would prevent message contents to be revelead. __mosca__ supports TLS as an example. Likely a production deployment would prefer this, unless all traffic happens in a closed network.







