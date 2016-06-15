---
title: Login
description: This tutorial will show you how to use the Auth0 React SDK to add authentication and authorization to your web app.
---

## React Tutorial

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* NodeJS 5.6.0
:::

<%= include('../../_includes/_package', {
  pkgRepo: 'auth0-react',
  pkgBranch: 'gh-pages',
  pkgPath: 'examples/redirect-lock-with-api',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

**If you have an existing application, follow the steps below.**


${include('../\_callback')}

### 1. Add the Auth0 scripts and set the viewport

Add the code below to the `index.html` file to include the Auth0 script and set the viewport:

${snippet(meta.snippets.dependencies)}

### 2. Configure Auth0Lock

To have your app work with Auth0, configure Auth0Lock by creating an instance of the service in the `componentWillMount` lifecycle event of your component:

${snippet(meta.snippets.setup)}

### 3. Implement the login

To implement the login, call the `.show()` method of Auth0's `lock` instance when a user clicks the login button.

${snippet(meta.snippets.use)}

To discover all the available arguments for `lock.show`, see the [Auth0Lock documentation](/libraries/lock#-show-options-callback-).

After authentication, Auth0 will redirect the user back to your application with an identifying `idToken` as a `hash` parameter of `window.location`. Use `lock.parseHash` to parse the `hash` and create the `idToken`. This `idToken` is used to retrieve the user's profile from Auth0 and to call your backend APIs.

In this example, the `token` is stored in `localStorage` to keep the user authenticated after each page refresh:

```js
var App = React.createClass({
  // ...
  componentWillMount: function() {
    //Extending function defined in step 2.
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
  },
  render: function() {
    if (this.state.idToken) {
      return (<LoggedIn lock={this.lock} idToken={this.state.idToken} />);
    } else {
      return (<Home lock={this.lock} />);
    }
  }
});
```

Finally, call `ReactDOM.render()` method from `react-dom` library to display the `App` component:

```js
ReactDOM.render(
  <App />,
  document.getElementById('container-id')
);
```


### 4. Retrieve the user profile and display user information

Use the `token` to retrieve the user profile and display the user's nickname:

```js
var LoggedIn = React.createClass({
  getInitialState: function() {
    return {
      profile: null
    }
  },

  componentDidMount: function() {
    // In this case, the lock and token are retrieved from the parent component
    // If these are available locally, use `this.lock` and `this.idToken`
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
        <div className="loading">Loading profile</div>
      );
    }
  }
});

```

To discover all the available properties of a user's profile, see [user-profile](/user-profile). Note that the properties available depend on the social provider used.

### 5. Perform secure calls to your API

To perform secure calls to the API you are creating <%= configuration.api ? ' on ' + configuration.api : '' %>, return on each request the [JWT token](/jwt) received on the login in the `Authorization` header:

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

### 6. Log out

In this implementation, a log out involves simply deleting the saved token from `localStorage` and redirecting the user to the home page:

```js
localStorage.removeItem('userToken');
// Go to home with your React Router
```

### 7. All done!

You have completed the implementation of Login and Signup with Auth0 and React.
