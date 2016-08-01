---
title: User Data Storage Scenario
description: Demonstrating the best practices in using Auth0 storage mechanisms through the scenario of a native Swift app with a Node API backend.
url: /tutorials/User-Data-Storage-Scenario
---

# Auth0 User Data Storage Scenario

Auth0 provides multiple locations for storing different types of data associated with authenticating an app’s users. The purpose of this document is to demonstrate the best practices in using these storage mechanisms efficiently and securely. It is also to give you a look at an end-to-end experience of an application using auth0 and an external database. We created an example application to illustrate the important distinctions a developer must make when storing their user data with Auth0. For this example case, we started with a basic mobile app for iOS (coded in Swift) from the Auth0 seed project for an [iOS mobile app](/quickstart/native/ios-swift). As a backend for the app, we used the Auth0 seed project for a simple [Node.js API](/quickstart/backend/nodejs). As we discuss the different types of data and the best places to store them, we will continue to use this application as the example case. See the mobile/backend [architecture scenario](/architecture-scenarios/application/mobile-api) from our documentation to give you a visual of how the application is structured. 

## Table of Contents

- [Where do I put my authentication data?](/User-Data-Storage-Scenario#where-do-i-put-my-authentication-data-)
- [Why not put all the app’s data in the Auth0 data store?](/User-Data-Storage-Scenario#why-not-put-all-the-app's-data-in-the-auth0-data-store)
- [When should I use the Auth0 data store?](/User-Data-Storage-Scenario#when-should-i-use-the-auth0-data-store-)
- [Review](/User-Data-Storage-Scenario#review)


## Where do I put my authentication data?

Auth0 has a data store which serves as a way for developers to store data associated with their users’ profiles, beyond the basic information associated with authenticating their users, i.e name, email, username, password, and so on. You can also use a [separate database](/connections/database/mysql) to store such information if your needs are different from what the Auth0 data store offers. However, we recommend storing authentication-related data in Auth0’s data store in order to make things less complicated by allowing you to easily manage user data through Auth0’s [dashboard](${uiURL}).


## Why not put all the app’s data in the Auth0 data store?

The Auth0 data store is highly specialized for storing authentication data. Attempting to store any authentication-related data beyond the default user information in the Auth0 data store should only be done in specific cases. Here are some reason's why you should not use the Auth0 data store when you don't have to:

### Scalability

It is best not to store such additional data in the Auth0 data store because the Auth0 data store has limited scalability and your app’s data could exceed that limit. Using an external database allows you to keep things simple on the Auth0 side, to be able to efficiently manage your user authentication, while leaving the heavy database lifting up to a separate database formatted to efficiently store your extra data. 

### Performance

The two sets of data are also likely accessed with different frequencies. Auth0 is not optimized so that you can be querying millions of times in short period of time. It is better to leave this up to a service like *INSERT DATABASE* which is  optimized for fast, large data operations.

### Flexibility 

By using a separate database, your access to the authentication data is concentrated in a small chunk of code, and your access to all other data is grouped separately. The way you want to organize your data may not be possible in the Auth0 data store because of the way it is built to accomodate only the user profiles and their metadata. Certain actions that you might require from a customizable database service are not possible in Auth0 data store. For example, if you wanted to make a specific query like `SELECT users.favGenre, access.roles FROM users, access WHERE users.user_id = access.user_id`, this is something you can't do with in the auth0 data store. Using a separate database will allow you to manage your data however you see fit

### Example

Here is an example of data that is associated with a user but not with authenticating that user in the app: In the case of our mobile music application, the user’s music needs to be saved, so they can find it easily when they log in again. This data is not required in the process of authenticating the user for the app, but favorite songs and artists are personal data that should be associated with the user. So we would want to store this data in a separate database connected to the backend of our mobile app, instead of in the Auth0 data store. Here is how we did this:

Using the user’s unique `user_id` from their Auth0 user profile, we can make sure the data is associated with the user in our separate database in order to query by a unique identifier. Here is an example row from our `songs` table in our Heroku Postgres database:

| song_id   | songname           | user_id                    |
| --------- | ------------------ | -------------------------- |
| "1a"      | "Yellow Submarine" | "google-oauth2\|xxxyyy123" |

The Node.js seed project authenticates requests to the specific URI associated with getting the user’s personal data from the database. This is accomplished through the validation of a JSON Web Token. [Learn about token based authentication and how to easily implement JWT in your applications.](https://auth0.com/learn/token-based-authentication-made-easy/) 

Here is the code implementing JWT validation from the Node.js seed project:
```
var routes = require('./routes/index');
var users = require('./routes/users');

var authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'), //creating the JWT
  audience: process.env.AUTH0_CLIENT_ID
});

app.use('/', routes);
app.use('/users', users);
app.use('/secured', authenticate); //accessing secured path requires validation
```

We added specific functionality for different data requests coming from our mobile app. For example, upon receiving a GET request to the path `/secured/getFavGenre`, the API calls the function we wrote called `queryGenre()`, which queries the database for the user’s favorite genre and returns it in the response of the GET request.

This is the function on the client (Swift) that makes the request to our Heroku-hosted Node.js API:
```
@IBAction func getGenre(sender: AnyObject) {
        let request = buildAPIRequest("/secured/getFavGenre", type:"GET") 
        let task = NSURLSession.sharedSession().dataTaskWithRequest(request) {[unowned self](data, response, error) in
            let genre = NSString(data: data!, encoding: NSUTF8StringEncoding) //get the result when the request returns
            dispatch_async(dispatch_get_main_queue(), { 
                self.favGenre.text = "Favorite Genre:  \(genre!)" //change the UI to display the result
            })
        }
        task.resume()
    }
```

This should not be confused with the `queryGenre()` from the backend, which queries our app's database. This function is on the client (in the Swift code), and simply makes a request to the API/backend which handles the request. This function changes the interface of the app to display the response data of the request to `/secured/getFavGenre`.

The function `buildAPIRequest()` takes the path and the type of HTTP request as parameters and builds a request using the base URL of our Node.js API hosted on Heroku.

The Express server code from our Node.js API that handles the request to `/secured/getFavGenre` makes a call to the backend function `queryGenre()` as discussed:

```
app.get('/secured/getFavGenre', function(req, res) {
  queryGenre(req.user.sub, res);
});
```

Then `queryGenre()` takes the `user_id` and queries the `user_data` table in our app's database to find that user's favorite genre and returns it to the client:

```
function queryGenre(user_id, res){
	
  pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting data...');

  client
    .query('SELECT fav_genre as value FROM user_data WHERE user_id = $1', [user_id], function(err, result) {

      if(err) {
        return console.error('error running query', err);
      }
      res.writeHead(200, {"Accept": "text/html"});
      res.end(result.rows[0].value);
    });
  });

};
```

## When should I use the Auth0 data store?

Any data you are storing with Auth0 in addition to what is already in the user profile should go in metadata. Metadata is JSON in the user profile that is used to store any extra data to be used in the authentication process by Auth0. There are two kinds of metadata: app metadata and user metadata.

### App metadata

 App metadata is used for storing supplementary data associated with authentication that is read-only for the user. Its three most common uses are:

- Permissions: Features the user must unlock through their achievement in the application, a special key they are given, or any other exclusive factor that allows certain users to have privileges within the application that others do not.
- Plans: Settings that must not be freely changed by the user without confirmation of a subscription. These require the user to pay or provide proof of purchase through the app to alter their in-app experience in some way.
- External IDs: Used in associating external accounts (not authentication providers) with the identity provider account that authenticated the user through Auth0.

### Example of app metadata

Some data from our music app that would be appropriate to store in app metadata is a music streaming subscription. Another example is the user’s permission to edit the app’s featured playlists. Both of these are appropriate for metadata because they are important in authenticating the user and customizing their experience as they are logged in. What makes them app metadata instead of user metadata is that they must not be easily changed by the user. We implemented the permissions example with two Auth0 [rules](/rules):

 The first sends a request to our Node API which queries the database connected to heroku to check how many plays the user’s playlist has. If the number is 100 or greater, then we assign `playlist_editor` as a value in the `roles` array in the app metadata. 
 
 ```
 function (user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  user.app_metadata.roles = user.roles || [];
  
  var CLIENT_SECRET = configuration.AUTH0_CLIENT_SECRET;
  var CLIENT_ID = configuration.AUTH0_CLIENT_ID;

  //Copies user profile attributes needed in the API (equivalent to `scope`)
  var scope = {
    user_id: user.user_id,
    email: user.email,
    name: user.name
  };

  var options = {
    subject: user.user_id,
    expiresInMinutes: 600, //Should be greater than the SAML token expiration
    audience: CLIENT_ID,
    issuer: 'https://eliharkins.auth0.com'
  };

  var id_token = jwt.sign(scope, 
                           new Buffer(CLIENT_SECRET, 'base64'),
                           options);

  var auth = 'Bearer ' + id_token;

   request.get({
    url: 'https://auth0-node-data-api.herokuapp.com/secured/getPlays',
    headers: {
       'Authorization': auth, 
       'Content-Type': 'text/html'
    },
    timeout: 15000
  }, function(err, response, body){
    if (err) 
      return callback(new Error(err));
    var plays = parseInt(body, 10);
    if (plays >= 100 && user.roles.indexOf('playlist editor') < 0){
      console.log('Making user an editor');
      user.app_metadata.roles.push('playlist editor');
      auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
        .then(function(){
          callback(null, user, context);
        })
        .catch(callback);
    }
    
    else if (plays < 100 && user.roles.indexOf('playlist editor') >= 0){
      console.log('Taking away privileges');
      user.app_metadata.roles = [];
      auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
        .then(function(){
          callback(null, user, context);
        })
        .catch(callback);
    }
    else{
      callback(null, user, context);
    }
    console.log(user.app_metadata.roles);
    
  });
  
}
 ```

The second rule gets the app metadata and assigns the `roles` array to a field of the user object so that it can be accessed without directly accessing the app metadata on the client and so that the `scope` parameter can specify `roles` upon login wihtout unnecessarily including all of the app metadata in the user object:

```
function(user, context, callback) {
   if (user.app_metadata) {
      user.roles = user.app_metadata.roles;
   }
   user.roles = user.roles || [];
   console.log(user.roles);
   callback(null, user, context);
}
```

The app recognizes whether the user is a playlist editor or not and displays their permission accordingly when they are welcomed to the app. There is no actual featured playlist for the simplicity of the example. This is a good example of app metadata because in this scenario, the user has no direct control over how many times other people play their playlist, and so they must not be able to change their own permission to edit the app’s featured playlist. This is a special permission they have to “earn,” in this case by getting more people to listen to their playlist.

### User metadata

User metadata is extra authentication data determined by the user, such as preferences, customization of their avatar, or anything else that they get to choose which alters their experience in the app upon logging in. 

### Example of user metadata

In the case of our music app, we should consider that the user would want to change their `displayName`, which is displayed to other users of the app and to the user when they are welcomed to the app upon authentication. They could also want to change their music streaming settings. Both of these things would be stored in user metadata. We stored the variable `displayName` in user metadata and allowed the user to update their display name for the purpose of this example.

We used an Auth0 rule to get the `user.user_metadata` in order to show their display name every time the user logs in.

```
function(user, context, callback){
  user.user_metadata = user.user_metadata || {};
  // update the user_metadata that will be part of the response
  user.user_metadata.displayName = user.user_metadata.displayName || "user";

  // persist the user_metadata update
  auth0.users.updateUserMetadata(user.user_id, user.user_metadata)
    .then(function(){
      callback(null, user, context);
    })
    .catch(function(err){
      callback(err);
    });
}
```

We used the Auth0 Management API v2 to allow the app’s users to alter their metadata via GET and PATCH requests: 

[Get users by id.](https://auth0.com/docs/api/management/v2#!/Users/get_users_by_id)

[Patch users by id.](https://auth0.com/docs/api/management/v2#!/Users/patch_users_by_id)

## Review

Here is a review of the types of data and the best practices for storing them in the right places in the context of our example application:

| Data (Music App Example)                                | Location |
| ------------------------------------------------------- | -------------------------------------------------------------- |
| Songs, artists, and playlists saved to the user’s music | A separate database connected to the backend of the application|
| User’s permission to edit the app’s featured playlist, stored in `roles` variable | App metadata |
| User’s chosen display name that they are free to change, stored in `displayName` variable | User metadata |


This document is meant to give you a better idea of where to store different types of data both authentication-related and otherwise. Rules are a helpful tool to work with the authentication data of your application in a systematic and simple way. In general the ways Auth0 provides for you to store your users’ data are intended to be used for authentication data only, so if your data seems irrelevant to the authentication process, it is best stored in a separate database. This article should clear up any doubt you have about how to use Auth0’s data storage methods.

If you want to take a closer look at how we implemented our example for this article beyond the Auth0 seed projects, go to github and dive into the code:

[iOS app (client)](https://github.com/eharkins/auth0-swift-data-app)

[Node.js API (server)](https://github.com/eharkins/auth0-node-data-api)
