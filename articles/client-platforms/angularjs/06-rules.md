---
title: Rules
description: test
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs-sample/tree/master/06-Rules',
}) %>_

<!-- Every section in this doc can be reused in other quickstarts except the step 4 of creating rules  -->

Rules are one of the cool features of Auth0. Reason for it's coolness is it's flexibility which gives you the ability to extend what Auth0 has to offer. Rule are JavaScript functions which can be thought  of as middlewares because of how they work:

![How rules work](/media/articles/rules/flow.png)

- Step 1: An app initiates an authentication request to Auth0.
- Step 2: Auth0 routes the request to an Identity Provider through a configured connection.
- Step 3: The user authenticates successfully.
- Step 4: The user object representing the logged in user is passed through the Rules pipeline, and returned to the app.

Among many possibilities, Rules can be used to:

- __Profile enrichment__: query for information on the user from a database/API, and add it to the user profile object.
- Create __authorization rules__ based on complex logic (anything that can be written in JavaScript).
- __Normalize attributes__ from different providers beyond what is provided by Auth0.
- Reuse information from existing databases or APIs for migration scenarios.
- Keep a __white-list of users__ and deny access based on email.
- __Notify__ other systems through an API when a login happens in real-time.
- Enable counters or persist other information. (For information on storing user data, see: [Metadata in Rules](https://auth0.com/docs/rules/metadata-in-rules).)
- Enable __multifactor__ authentication, based on context (e.g. last login, IP address of the user, location, etc.).

## How to Use Rules
Rules are created as function snippets from [your dashboard](https://manage.auth0.com/#/rules/create). The function has the following signature:

```js
function (user, context, callback) {

}
```

- __user__: the user object as it comes from the identity provider. (For a complete list of the user properties, see: [User Profile Structure](https://auth0.com/docs/user-profile/user-profile-structure).)
- __context__: an object containing contextual information of the current authentication transaction, such as user's IP address, application, location. (A complete list of context properties is available here: [Context Argument Properties in Rules](https://auth0.com/docs/rules/context).)
- __callback__: a function to send back the potentially modified user and context objects back to Auth0 (or an error).

__NOTE__: Because of the async nature of node.js, it is important to always call the callback function, or else the script will timeout.

### Creating Rules
1. From the [new rule](https://manage.auth0.com/#/rules/create) you can create a rule either from scratch or use an existing template. Existing templates are written by Auth0 team to assist you complete common tasks. For example sake we will stick to using an existing template and to be precise, one that will help us attach roles to user based on certain conditions. Select `Set roles to a user`:

![Rules templates](/media/articles/angularjs/rule_template.png)

2. Name the rule whatever suite you in the first text box in the new rule page. For simplicity, update the template snippet to the following:

```js
function (user, context, callback) {
  user.roles = [];
  // only johnfoo is admin
  if (user.email === 'YOUR_EMAIL@gmail.com') {
    user.roles.push('admin');
  }

  // all users are guest
  user.roles.push('guest');

  callback(null, user, context);
}
```

This simply adds `guest` `roles` to all users except the user with `YOUR_EMAIL@gmail.com` which will have both `admin` and `guest` added to it's `roles`.

3. Before using the rule in your app, you can play around and see if it works by clicking the `Try This Rule` button. This will open a pop-up where you can try the just created rule in isolation with mocked user and context.

![Try Rule](/media/articles/rules/try_rule.png)

Save the rule once you are satisfied with how it works.

4. Finally __Authenticate__ again and grab the user's profile to see the magic of rules on the data returned:


```js
// controller
.controller('LoginCtrl', ['$scope', 'auth', function ($scope, auth){
  $scope.auth = auth;
}]);

```

```html
<!-- view  -->
<a class="btn btn-primary" ng-click="auth.signin()">Login with Redirect</a>
```

```js
// config
authProvider.on('loginSuccess', ['profilePromise',
function(profilePromise) {
  profilePromise.then(function(profile){
    // profile
    console.log(profile);
  });
}]);
```

![Console](/media/articles/rules/console.png)

Assuming John is the user, at the beginning of the rules pipeline, John's user object will be:

```bash
{
  "email": "johnfoo@gmail.com",
  "family_name": "Foo",
  "user_id": "google-oauth2|103547991597142817347"
  //... other properties ...
}
```

The context object will be:

```bash
{
  "clientID": "...client_id_of_the_app...",
  "clientName": "my app",
  "connection": "google-oauth2"
}
```

After the rule executes, the output that the application will receive is the following user object:

```bash
{
  "email": "johnfoo@gmail.com",
  "family_name": "Foo",
  "user_id": "google-oauth2|103547991597142817347",

  //... other props ...

  "roles": ["guest", "admin"]  // NEW PROPERTY ADDED BY THE RULE
}
```

This is just one of the tons of cool things we can do with rules. As a refresher, what rules does is help us extend Auth0's core functionality so feel free to do so anytime you can. The rule templates gives you an idea of the capabilities of rules in Auth0.
