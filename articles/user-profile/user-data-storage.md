---
title: User Data Storage Guidance
description: Demonstrating the best practices in using Auth0 storage mechanisms through the scenario of a native Swift app with a Node API backend.
toc: true
---

# User Data Storage Guidance

Auth0 provides multiple locations for storing different types of data associated with authenticating an app’s users. The purpose of this document is to demonstrate the best practices in using these storage mechanisms efficiently and securely.

The document also gives you a look at an example of the end-to-end experience of an application using auth0 and an external database. We created an application to illustrate the important distinctions a developer must make when storing their user data with Auth0.

For this example case we used the scenario of a mobile music application. We started with a basic mobile app for iOS (coded in Swift) from the Auth0 seed project for an [iOS mobile app](/quickstart/native/ios-swift). As a backend for the app, we used the Auth0 seed project for a simple [Node.js API](/quickstart/backend/nodejs). As we discuss the different types of data and the best places to store them, we will continue to use this application as the example case. See the [Mobile + API architecture scenario](/architecture-scenarios/application/mobile-api) from our documentation to give you a visual of how the application is structured.

## Table of Contents

- [Where do I store my authentication data, such as usernames and passwords?](#where-do-i-put-my-authentication-data-)
- [Why not put all the app’s data in the Auth0 data store?](#why-not-put-all-the-app-s-data-in-the-auth0-data-store-)
- [When should I use the Auth0 data store?](#when-should-i-use-the-auth0-data-store-)
- [Review](#review)


## Where do I put my authentication data?

Auth0 has a data store which serves as a way for developers to store data associated with their users’ profiles, beyond the basic information Auth0 uses for authentication, i.e name, email, username, password, and so on. You can also [Authenticate Users with Username and Password using a Custom Database](/connections/database/mysql) to store such information if your needs are different from what the Auth0 data store offers. However, we recommend storing authentication-related data in Auth0’s data store in order to make things less complicated by allowing you to easily manage user data through Auth0’s [dashboard](${manage_url}).


## Why not put all the app’s data in the Auth0 data store?

The Auth0 data store is highly specialized for storing authentication data. Storing any authentication-related data beyond the default user information in the Auth0 data store should only be done in specific cases. Here are some reasons why you should not use the Auth0 data store when you don't have to:

- Scalability: The Auth0 data store because the Auth0 data store has limited scalability and your app’s data could exceed that limit. Using an external database allows you to keep things simple on the Auth0 side, while leaving the heavy database lifting up to a separate database formatted to efficiently store your extra data.

- Performance: Keeping your authentication data separate from any other data in your app is important because the two sets of data are also likely accessed with different frequencies. The Auth0 data store is not optimized to be queried with extremely high frequency. It is better to leave this up to a specialized database service, optimized for fast, large data operations.

- Flexibility: By using a separate database, your access to your users' authentication data is concentrated in a small chunk of code, and your access to all other data is grouped separately. Your organizational demands may not be met by the Auth0 data store because it is built to accomodate only the user profiles and their Metadata. Certain actions that you might require from a customizable database service are not possible in Auth0 data store. For example, if you wanted to make a specific query like `SELECT users.favGenre, access.roles FROM users, access WHERE users.user_id = access.user_id`. This is something you can't do with in the auth0 data store. Using a separate database will allow you to manage your data however you see fit.

### Example

Here is an example of data that is associated with a user but not with authenticating that user in the app. In the case of our mobile music application, the user’s music needs to be saved, so they can find it easily when they log in again. This data is not required in the process of authenticating the user for the app, but favorite songs and artists are personal data that should be associated with the user. So we would want to store this data in a separate database connected to the backend of our mobile app, instead of in the Auth0 data store. Here is how we did this:

We will use the [user_id](/user-profile/normalized#storing-user-data) as the user's unique identifier. Here is an example row from the `songs` table in our database:

| song_id   | songname           | user_id                    |
| --------- | ------------------ | -------------------------- |
| 1         | Number One Hit     | google-oauth2|xxxyyy123    |

The Node.js backend authenticates requests to the specific URI associated with getting the user’s personal data from the database. This is accomplished through the validation of a JSON Web Token.

>[Learn about token based authentication and how to easily implement JWT in your applications.](/jwt)

Here is the code implementing JWT validation from the Node.js seed project:
```
var genres = require('./routes/genres');
var songs = require('./routes/songs');
var playlists = require('./routes/playlists');
var displayName = require('./routes/displayName');

var authenticate = jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  audience: process.env.AUTH0_CLIENT_ID
});

app.use('/genres', authenticate, genres);
app.use('/songs', authenticate, songs);
app.use('/playlists', authenticate, playlists);
app.use('/displayName', authenticate, displayName);
```

We added specific functionality for different data requests coming from our mobile app. For example, upon receiving a GET request to the path `/secured/getFavGenre`, the API calls the function we wrote called `queryGenre()`, which queries the database for the user’s favorite genre and returns it in the response of the GET request.

This is the function on the client (Swift) that makes the request to our Heroku-hosted Node.js API:
```
@IBAction func getGenre(sender: AnyObject) {
        let request = buildAPIRequest("/genres/getFav", type:"GET")
        let task = NSURLSession.sharedSession().dataTaskWithRequest(request) {[unowned self](data, response, error) in
            let genre = NSString(data: data!, encoding: NSUTF8StringEncoding)
            dispatch_async(dispatch_get_main_queue(), {
                self.favGenre.text = "Favorite Genre:  \(genre!)"
            })
        }
        task.resume()
    }
```
The function `buildAPIRequest()` takes the path and HTTP method of the request as parameters and builds a request using the base URL of our Node.js API hosted on Heroku.

On the client (in the Swift code), the `getGenre()` function simply makes a request to the API and changes the interface of the app to display the response of the request to `/genres/getFav`. The request is handled on the backend by `queryGenre()`, which queries our app's database. Here is how `queryGenre()` gets the data and returns it to the client:

```
function queryGenre(user_id, res){

  db.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;

  client
    .query('SELECT fav_genre as value FROM user_data WHERE user_id = $1', [user_id], function(err, result) {

      if(err) {
        return console.error('error running query', err);
      }
      res.send(result.rows[0].value);
    });
  });

};
```

## When *should* I use the Auth0 data store?

Any data you are storing with Auth0 in addition to what is already in the user profile should go in Metadata. [Metadata](/metadata) is JSON in the user profile that is used to store any extra data to be used in the authentication process by Auth0. There are two kinds of Metadata: `app_metadata` and `user_metadata`.

### App Metadata

 `app_metadata` is used for storing supplementary data associated with authentication that is read-only for the user. Its three most common uses are:

- Permissions: Priveleges granted to certain users. This includes features the user must unlock through their achievement in the application, a special key they are given, or any other exclusive factor that allows certain users to have privileges within the application that others do not.
- Plans: Settings that must not be changed directly by the user without confirmation of a subscription. These require the user to pay or provide proof of purchase through the app to alter their in-app experience in some way. This includes things like a music or video streaming subsciption.
- External IDs: Used in associating external accounts (not authentication providers) with the identity provider account that authenticated the user through Auth0. For example, Auth0 could use an employee ID which identifies the user's account with their employer.

### Example of App Metadata

Some data from our music app that would be appropriate to store in `app_metadata` is music streaming subscriptions. Another example is the user’s permission to edit the app’s featured playlists. Both of these are appropriate for Metadata because they are important in authenticating the user and customizing their experience as they are logged in. What makes them appropriate for `app_metadata` instead of `user_metadata` is that they must not be easily changed by the user. We implemented the permissions example with two Auth0 [rules](/rules).

 The first rule sends a request to our Node API which queries the database connected to heroku to check how many plays the user’s playlist has. If the number is 100 or greater, then we assign `playlist_editor` as a value in the `roles` array in `app_metadata`.

 ```
function (user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  user.app_metadata.roles = user.roles || [];

  var CLIENT_SECRET = configuration.AUTH0_CLIENT_SECRET;
  var CLIENT_ID = configuration.AUTH0_CLIENT_ID;

  var scope = {
    user_id: user.user_id,
    email: user.email,
    name: user.name
  };

  var options = {
    subject: user.user_id,
    expiresInMinutes: 600,
    audience: CLIENT_ID,
    issuer: 'https://example.auth0.com'
  };

  var id_token = jwt.sign(scope, CLIENT_SECRET, options);

  var auth = 'Bearer ' + id_token;

  request.get({
    url: 'https://example.com/playlists/getPlays',
    headers: {
       'Authorization': auth,
      'Content-Type': 'text/html'
    },
    timeout: 15000
  }, function(err, response, body){
    if (err)
      return callback(new Error(err));
    var plays = parseInt(body, 10);

    if (plays >= 100 && user.roles.indexOf('playlist_editor') < 0){
      user.app_metadata.roles.push('playlist_editor');
      auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
        .then(function(){
          callback(null, user, context);
        })
        .catch(callback);
    }

    else if (plays < 100 && user.roles.indexOf('playlist_editor') >= 0){
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

  });

}
 ```

The second rule gets `app_metadata` and assigns the `roles` array to a field of the user object so that it can be accessed without directly accessing `app_metadata` on the client and so that the `scope` parameter can specify `roles` upon login without unnecessarily including all of `app_metadata` in the user object:

```
function(user, context, callback) {
   if (user.app_metadata) {
      user.roles = user.app_metadata.roles;
   }
   user.roles = user.roles || [];
   callback(null, user, context);
}
```

The app recognizes whether the user is a playlist editor or not and displays their permission accordingly when they are welcomed to the home screen. There is no actual featured playlist for the simplicity of the example. This is a good example of `app_metadata` because in this scenario, the user has no direct control over how many times other people play their playlist, and so they must not be able to change their own permission to edit the app’s featured playlist. This is a special permission they have to “earn,” in this case by getting more people to listen to their playlist.

We display the user's permissions by welcoming them as an "editor" if `playlist_editor` is in the `roles` array stored in their `user_metadata`:
<div class="phone-mockup"><img src="/media/articles/tutorials/data-scenarios/3-home.png" alt="Mobile example screenshot"/></div>

### User Metadata

`user_metadata` is data determined by the user and stored in the user profile, such as preferences, customization of their avatar, or anything else that they get to choose which alters their experience in the app upon logging in.

### Example of User Metadata

In the case of our music app, we should consider that the user would want to change their `displayName`, which is how they are identified to other users of the app and how the user is addressed when they are welcomed upon authentication. They could also want to change their music streaming settings. Both of these things would be stored in `user_metadata` since they are up to the user to determine. We stored the variable `displayName` in `user_metadata` and allowed the user to update their displayed name for the purpose of this example.

We used an Auth0 rule to get the `user.user_metadata` in order to show the user's display name every time they log in.

```
function(user, context, callback){
  user.user_metadata = user.user_metadata || {};
  user.user_metadata.displayName = user.user_metadata.displayName || "user";

  auth0.users.updateUserMetadata(user.user_id, user.user_metadata)
    .then(function(){
      callback(null, user, context);
    })
    .catch(function(err){
      callback(err);
    });
}
```

Here's a look at how we allowed the user to change their `displayName`:
<div class="phone-mockup"><img src="/media/articles/tutorials/data-scenarios/4-settings.png" alt="Mobile example screenshot"/></div>

We used the Auth0 Management APIv2 to allow the app’s users to alter their Metadata via GET and PATCH requests:

- [Get users by id.](/api/management/v2#!/Users/get_users_by_id)

- [Patch users by id.](/api/management/v2#!/Users/patch_users_by_id)

## Review

Here is a review of the types of data and the best practices for storing them in the right places in the context of our example application:

| Data (Music App Example)                                | Location |
| ------------------------------------------------------- | -------------------------------------------------------------- |
| Songs, artists, and playlists saved to the user’s music | A separate database connected to the backend of the application|
| User’s permission to edit the app’s featured playlist, stored in `roles` variable | `app_metadata` |
| User’s chosen display name that they are free to change, stored in `displayName` variable | `user_metadata` |


This document is meant to give you a better idea of where to store different types of data both authentication-related and otherwise. Rules are a helpful tool to work with the authentication data of your application in a systematic and simple way. The Auth0 data store is intended to be used for authentication data only, so if your data seems irrelevant to the authentication process, it is best stored in a separate database. This article should clear up any doubt you have about how to use Auth0’s data storage methods.

If you want to take a closer look at how we implemented our example for this article beyond the Auth0 seed projects, go to github and dive into the code:

- [iOS app (client)](https://github.com/auth0-samples/auth0-data-storage-scenarios-sample/tree/master/swift-data-app)

- [Node.js API (server)](https://github.com/auth0-samples/auth0-data-storage-scenarios-sample/tree/master/node-data-api)
