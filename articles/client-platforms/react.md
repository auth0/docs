---
lodash: true
title: React Tutorial
name: React
image: //auth0.com/lib/platforms-collection/img/react.png
tags:
  - quickstart
snippets:
  dependancies: client-platforms/react/dependancies
  setup: client-platforms/react/setup
  use: client-platforms/react/use
---

## React Tutorial

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="/auth0-react/gh-pages/create-package?path=examples/redirect-lock-with-api&type=js@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

**Otherwise, if you already have an existing application, please follow the steps below.**


@@includes.callback@@

### 1. Adding the Auth0 scripts and setting the right viewport

@@snippet(meta.snippets.dependancies)@@

We're including the Auth0 lock script to the `index.html`

### 2. Create the Auth0Lock instance

Configuring the Auth0Lock will let your app work with Auth0. We recommend creating it in the `componentWillMount` lifecycle event of your Component.

@@snippet(meta.snippets.setup)@@

### 3. Let's implement the login

Now we're ready to implement the Login. Once the user clicks on the login button, we'll call the `.show()` method of Auth0's `lock` we've just created.

@@snippet(meta.snippets.use)@@

> If you want to check all the available arguments for the show method, check the [Auth0Lock](/lock) documentation.

After authentication, Auth0 will redirect your user back to your application. You'll get the `token` as a `hash` parameter. You can use `lock` to parse the `hash` and get the `token`. This `token` will be used for two things:

-  Retrieve the profile from Auth0
-  Call your backend APIs

In this example we are going to store the `token` in `localStorage`. We do this so that the user doesn't have to authenticate every time.

```js
var App = React.createClass({
  // ...
  componentWillMount: function() {
    // ...
    this.setState({idToken: this.getIdToken()})
  },
  getIdToken: function() {
    var idToken = localStorage.getItem('userToken');
    var authHash = this.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        console.log("Error signing in", authHash);
        return null;
      }
    }
    return idToken;
  }
});
```

### 4. Get the user profile and show information about the user

Now that we have the `token` (either from `localStorage` or by parsing the `hash`), we can use it to grab the user profile and display some information.

```jsx
var LoggedIn = React.createClass({
  getInitialState: function() {
    return {
      profile: null
    }
  },

  componentDidMount: function() {
    // In this case, we receive lock and the token from the parent component
    // If you hav them locally, just use `this.lock` and `this.idToken`
    this.props.lock.getProfile(this.props.idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
        return;
      }
      this.setState({profile: profile});
    }.bind(this));
  },

  render: function() {
    if (this.state.profile) {
      return (
        <h2>Welcome {this.state.profile.nickname}</h2>
      );
    } else {
      return (
        <div class="loading">Loading profile</div>
      );
    }
  }
});

```

> You can [click here](/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

### 5. Performing secure calls to your API

As we're going to call an API we're going to make <%= configuration.api ? ('on ' + configuration.api) : '' %>, we need to make sure we send the [JWT token](/jwt) we receive on the login on every request in the `Authorization` header.

```js
var getFoos = fetch('/api/foo', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
  },
  method: 'GET',
  cache: false
});

getFoos.then(function (response) {
  response.json().then(function (foos) {
    console.log('the foos:', foos);
  });
});
```

### 6. Logging out

In our case, logout means just deleting the saved token from localStorage and redirecting the user to the home page.

```js
localStorage.removeItem('userToken');
// Go to home with your React Router
```

### 7. You're done!

You've implemented Login and Signup with Auth0 and React.
