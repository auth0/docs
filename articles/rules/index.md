---
url: /rules
---

# Rules

**Rules** are code snippets written in JavaScript that are executed in Auth0 as part of the authentication pipeline every time a user authenticates to your application. Rules allow you to easily customize and extend Auth0's capabilities. Rules can be chained together for modular coding and can be turned on and off individually.

![](/media/articles/rules/flow.png)

* **Step 1:** An app initiates an authentication request to Auth0.
* **Step 2:** Auth0 routes the request to an Identity Provider through a configured connection.
* **Step 3:** The user authenticates successfully.
* **Step 4:** The `user` object representing the logged in user is passed through the Rules pipeline and returned to the app.

Among many possibilities, Rules can be used to:

* Bring information from your database and add it to the user profile object.
* Create authorization rules based on complex logic (anything that can be written in JavaScript).
* Normalize attributes from different providers beyond what is provided by Auth0.
* Reuse information from existing databases or APIs for migration scenarios.
* Keep a white-list of users and deny access based on email.
* Enable counters or persist other information. (For information on storing user data, see: [Metadata in Rules](/rules/metadata-in-rules).)

**NOTE:** You can find more examples of common Rules on Github at [auth0/rules](https://github.com/auth0/rules).

## Rule Syntax

A Rule takes the following arguments:

* `user`: The user object as it comes from the identity provider.
* `context`: An object containing contextual information of the current authentication transaction. (For a complete list of context properties, see: [Context Argument Properties in Rules](/rules/context).)
* `callback`: Sends the modified `user` and `context`

**NOTE:** Because of the async nature of *node.js*, it is important to include the `callback` argument, or else the script will timeout.

## Examples

To create a Rule, or try the examples below, go to [New Rule](${uiURL}/#/rules/create) in the Rule Editor on the dashboard.

### *Hello World*

This rule will add a `hello` attribute to all users authenticating through any provider.

```js
function (user, context, callback) {
  user.hello = 'world';
  console.log('===> set "hello" for ' + user.name);
  callback(null, user, context);
}
```

**NOTE:** You can add `console.log` lines for [debugging](#debugging).

### Add roles to a user

In this example, all authenticated users will get a **guest** role, but `johnfoo@gmail.com` will also be an **admin**:

```js
function (user, context, callback) {
  user.roles = [];
  // only johnfoo is admin
  if (user.email === 'johnfoo@gmail.com') user.roles.push('admin');

  // all users are guest
  user.roles.push('guest');

  callback(null, user, context);
}
```

At the beginning of the rules pipeline, John's `user` object will be:

```js
{
  "email": "johnfoo@gmail.com",
  "family_name": "Foo",
  "user_id": "google-oauth2|103547991597142817347"
  //... other props ...
}
```

The `context` object will be:

```js
{
  "clientID": "...client_id_of_the_app...",
  "clientName": "my app",
  "connection": "google-oauth2"
}
```

After the rule executes, the output that the application will receive is the following `user` object:

```js
{
  "email": "johnfoo@gmail.com",
  "family_name": "Foo",
  "user_id": "google-oauth2|103547991597142817347",

  //... other props ...

  "roles": ["guest", "admin"]  // NEW PROPERTY ADDED BY THE RULE
}
```

### Deny access based on a condition

In addition to adding and removing properties from the user object, you can return an *access denied* error.

```js
function (user, context, callback) {
  if (user.roles.indexOf('admin') === -1) {
    return callback(new UnauthorizedError('Only admins can use this'));
  }

  callback(null, user, context);
}
```

This will cause a redirect to your callback url with an `error` querystring parameter containing the message you set. (e.g.: `https://yourapp.com/callback?error=unauthorized&error_description=Only%20admins%20can%20use%20this`)

## Debugging

You can add `console.log` lines in the rule's code for debugging. The [Rule Editor](${uiURL}/#/rules/create)  provides two ways for seeing the output:

![](/media/articles/rules/rule-editor.png)

1. **TRY THIS RULE**: Opens a pop-up where you can edit the **user** and **context** arguments Click **TRY** to see the Rule execution result, as well as the `console.log` output.

  ![](/media/articles/rules/try-rule.png)

2. **DEBUG RULE**: Displays instructions for installing, configuring and running the [webtask CLI](https://github.com/auth0/wt-cli) for debugging rules. Paste these commands into a terminal to see the `console.log` output and any unhandled exceptions that occur during Rule execution.

  For example:

  ```sh
  ~  npm install -g wt-cli
  ~  wt init --container "youraccount" --url "https://sandbox.it.auth0.com" --token "eyJhbGci...WMPGI" -p "youraccount-default-logs"
  ~  wt logs -p "youraccount-default-logs"
  [18:45:38.179Z]  INFO wt: connected to streaming logs (container=youraccount)
  [18:47:37.954Z]  INFO wt: webtask container assigned
  [18:47:38.167Z]  INFO wt: ---- checking email_verified for some-user@mail.com! ----
  ```

  This debugging method works for rules tried from the dashboard and those actually running during user authentication.

## Available modules

For security reasons, the Rules code runs in a JavaScript sandbox based on [webtask.io](https://webtask.io) where you can use the full power of the ECMAScript 5 language.

For a list of currently supported sandbox modules, see: [Modules Supported by the Sandbox](https://tehsis.github.io/webtaskio-canirequire).

## Further reading

* [Managing rules using source control with GitHub](source-control)
* [Redirecting users from within rules](/rules/redirect)
