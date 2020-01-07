---
title: User Data Storage Scenario
description: Recommendations for using Auth0 storage mechanisms.
topics:
    - users
    - user-management
    - user-profiles
    - data-storage
    - swift
    - ios
    - nodejs
    - api
contentType: reference
useCase: manage-users
---
# User Data Storage Scenario

Auth0 provides a sample app, a mobile music application, that reflects the end-to-end user experience when using Auth0 with an custom external database. The sample app is an iOS app created using the [Auth0 iOS seed project](/quickstart/native/ios-swift). The backend uses the [Node.js API](/quickstart/backend/nodejs). 

For a visualization of the application's overall structure, see the [Mobile + API architecture scenario](/architecture-scenarios/application/mobile-api).

## Metadata

### App metadata

The following data points from our mobile music application are appropriate to store in `app_metadata`:

* User's subscription plan
* User's right (or lack thereof) to edit featured playlists

These two data points should be stored in `app_metadata` instead of `user_metadata` because they should not be directly changeable by the user.

### User metadata

The following data points from our mobile music application are appropriate to store in `user_metadata`:

* Application preferences;
* Any details chosen by the user to alter their experience of the app upon login.

Note that, unlike the data points for `app_metadata`, the user can easily and readily change those stored in `user_metadata`.

We can let the user change their `displayName`, which is the name the user sees upon logging in and is displayed to other users of the app.

To display the user's chosen identifier whenever they log in, we use a rule to get the `user.user_metadata` value.

```js
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

Here's a look at the screen the user would use to change their `displayName`:

![](/media/articles/tutorials/data-scenarios/4-settings.png)

To save the changes to the database, the application makes a call to the [Get a User](/api/management/v2#!/Users/get_users_by_id) endpoint of the [Management API](/api/management/v2) to identify the appropriate user:

```har
{
	"method": "GET",
	"url": "https://YOURACCOUNT.auth0.com/api/v2/users/user_id",
	"headers": [{
		"name": "Authorization",
		"value": "Bearer YOUR_ID_TOKEN_HERE"
	}]
}
```

This is followed by a call to the [Update a User](/api/management/v2#!/Users/patch_users_by_id) endpoint to update the `user_metadata` field:

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/users/user_id",
  "httpVersion": "HTTP/1.1",
  "cookies": [],
  "headers": [{
    "name": "Authorization",
    "value": "Bearer YOUR_ACCESS_TOKEN"
  }, {
    "name": "Content-Type",
    "value": "application/json"
  }],
  "queryString": [],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"user_metadata\": {\"displayName\": \"J-vald3z\"}"
  },
  "headersSize": -1,
  "bodySize": -1,
  "comment": ""
}
```

You must replace `YOUR_ACCESS_TOKEN` with a [Management API Access Token](/api/management/v2/concepts/tokens).

## User data permission rules

Use [rules](/rules) to implement permissions on whether a user can edit featured playlists or not.

### Assign Playlist Editor role

The first rule sends a request to our Node API, which then queries the database connected to Heroku to check how many plays the user’s playlist has. If the number is 100 or greater, we assign `playlist_editor` as a value in the `roles` array in `app_metadata`.

```js
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

### Scope parameter specifies role 

The second rule gets the `app_metadata` field and assigns the `roles` array to a field in the user object so it can be accessed without calling `app_metadata` on the application. The `scope` parameter can then specify `roles` upon the user logging in without including everything in `app_metadata` in the user object:

```js
function(user, context, callback) {
   if (user.app_metadata) {
      user.roles = user.app_metadata.roles;
   }
   user.roles = user.roles || [];
   callback(null, user, context);
}
```

After we've implemented these two rules, the app recognizes whether the user is a playlist editor or not and changes the welcome screen accordingly. If `playlist_editor` is in the `roles` array stored in the user's `app_metadata`, the user will be welcomed as an **EDITOR** after signing in:

![](/media/articles/tutorials/data-scenarios/3-home.png)

### Associate a user's music with the user

We need to associate a user's music with that user, but this information is not required for authentication. Here's how to store this information in a separate database that is integrated with the backend of the application.

The user's unique identifier is their [user_id](/users/normalized#storing-user-data). Here is a sample row from the `songs` table in our database:

| song_id   | songname           | user_id                    |
| --------- | ------------------ | -------------------------- |
| 1         | Number One Hit     | google-oauth2|xxxyyy123    |

The Node.js backend authenticates requests to the URI associated with getting the user’s personal data from the database by validating a JSON Web Token.

::: note
[Learn about token-based authentication and how to implement JWT in your Applications.](/tokens/concepts/jwts)
:::

Here is the code implementing JWT validation from the [Node.js seed project](/quickstart/backend/nodejs):

```js
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

We can add functionality to handle different data requests from our Application. For example, if we receive a `GET` request to `/secured/getFavGenre`, the API calls the `queryGenre()` function, which queries the database for and responds with the user’s favorite genre.

```swift
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

::: note
The function `buildAPIRequest()` takes the path and HTTP method of the request as parameters and builds a request using the base URL of our Node.js API that's hosted on Heroku.
:::

In the Application, the `getGenre()` function makes a request to the API and changes the app's interface to display the request response to `/genres/getFav`. The backend retrieves the required data for this action using the `queryGenre()` function and returns the results to the Application:

```js
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

## Keep reading

* [User Data Storage Best Practices](/best-practices/user-data-storage-best-practices)
* [Rules](/rules)
