---
title: Login
description: This tutorial will show you how to use the Auth0 Meteor SDK to add authentication and authorization to your web app.
---

## Meteor Tutorial

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Meteor 1.3.4.1
* Blaze templates
:::

<%= include('../../_includes/_package', {
  pkgRepo: 'meteor-auth0',
  pkgBranch: 'master',
  pkgPath: 'examples/auth0-meteor-sample',
  pkgFilePath: null,
  pkgType: 'server'
}) %>

**If you have an existing application, please follow the steps below.**

### 1. Installation

Install our Meteor package from [Atmosphere](https://atmospherejs.com/) on your Meteor application by running this command on your project folder.

${snippet(meta.snippets.dependencies)}

__Note:__  this package is designed to work with Meteor __1.3.4.1__, so please run `meteor update` in the root of your project if you're using an older version.

### 2. Before getting started

Create an `settings.json` file at the root of your application folder, and configure it with the following contents:

${snippet(meta.snippets.setup)}

Our meteor package reads this information and creates a Lock instance with these settings.

### 3. Specify the callback on Auth0 Dashboard

${include('../_callbackRegularWebApp')}

### 4. Implement the login

To implement the login, call the `.show()` method of Auth0's `lock` instance from the client of your Meteor project.

${snippet(meta.snippets.use)}

In this case we are using a Blaze template called `Auth0Login`.

To discover all the available arguments for `lock.show`, see [.show\(\[options, callback\]\)](/libraries/lock#-show-options-callback-).

### 5. Retrieve user information

You can retrieve information about the user's profile using the `currentUser` helper. The information will be under `currentUser.services.auth0`.

```html
#app.html

<template name="Auth0Login">
  {{#if currentUser}}
    <div>Your name is: <b>{{currentUser.services.auth0.name}}</b></div>
    <button class="logout">Log Out</button>
  {{else}}
    <button class="login">Log In</button>
  {{/if}}
</template>

```

You can access the user profile from the server through the `Meteor.user()` global getter, the information will be under the `services.auth0` object.

```js
var userName = Meteor.user().services.auth0.name;
```

To discover all the available properties of a user's profile, see [user-profile](/user-profile). Note that the properties available depend on the social provider used.

### 6. Log out

To log out you can just call `Meteor.logout();` on the client side of your application.

```js
Template.Auth0Login.events({
  ...,
  'click button.logout'(event, instance) {
    Meteor.logout();
  },
})

```

### 7. All done!

You have completed the implementation of Login and Signup with Auth0 and Meteor.
