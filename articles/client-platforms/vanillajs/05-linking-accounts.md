---
title: Linking Accounts
description: This tutorial demonstrates how to link different user accounts in your web app
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-javascript-spa',
  path: '05-Linking-Accounts'
}) %>

<%= include('../../_includes/_linking_accounts') %>


```js
// app.js

...

var lock = new Auth0Lock('<%= account.clientId %>', '<%= account.namespace %>');

// Lock instance to launch a login to obtain the secondary id_token
lockLink = new Auth0Lock('<%= account.clientId %>', '<%= account.namespace %>', {
  auth: {
    params: {
      state: 'linking'
    }
  },
  allowedConnections: ['Username-Password-Authentication', 'facebook', 'google-oauth2'],
  languageDictionary: { // allows us to override dictionary entries
    title: 'Link with:'
  }
});
...
```

When setting the callback for the `authenticated` event with the `on` method, you can determine which login was executed by checking the value of the `authResult.state` attribute.

```js
// app.js

...

lock.on('authenticated', function(authResult) {
  // Every lock instance listens to the same event, so we need to check if
  // it's not the linking login here.
  if (authResult.state != 'linking') {
    localStorage.setItem('id_token', authResult.idToken);

    lock.getProfile(authResult.idToken, function(err, profile) {
      if (err) {

        return alert('There was an error getting the profile: ' + err.message);

      } else {

        localStorage.setItem('profile', JSON.stringify(profile));
        showUserIdentities(profile);

        // Linking purposes only
        localStorage.setItem('user_id', profile.user_id);
        login_div.style.display = 'none';
        logged_div.style.display = 'inline-block';
      }
    });
  }
});

lockLink.on('authenticated', function(authResult) {
  // Every lock instance listens to the same event, so we need to check if
  // it's not the linking login here.
  if (authResult.state == 'linking') {
    // If it's the linking login, then do the link through the API.
    linkAccount(authResult.idToken);
  }
});

...
```

Now that the second login is handled, you will need to actually do the linking.

```js
// app.js

...

var linkAccount = function(id_token) {

  // Get user_id value stored at login step
  var user_id = localStorage.getItem('user_id');
  var url = 'https://' + '<%= account.namespace %>' + '/api/v2/users/' + user_id + '/identities';
  var data = JSON.stringify({ link_with: id_token });
  var xhr = new XMLHttpRequest();

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('id_token'));

  xhr.onload = function() {
    if (xhr.status == 201) {
      fetchProfile();
    } else {
      alert("Request failed: " + xhr.statusText);
    }
  };

  xhr.send(data);
};

...
```

The function takes the `id_token` of the account to link with and posts to the API, passing the `link_with` parameter with the `id_token` value in the body. If the request is successful, it fetches the profile to ensure that the accounts are linked.

To begin the linking process, call the `show` method on `lockLink` instance:

```js
// app.js

...

document.getElementById('btn-link-account').addEventListener('click', function() {
  lockLink.show();
});

...
```

```html

...

<button type="button" class="btn btn-default" id="btn-link-account">Link Account</button>

...
```

## User Profile from the Linked Accounts

The user profile contains an array of identities, which includes the profile information from linked providers.

To view a user's identities, access the [Users](${manage_url}/#/users) page on the Auth0 dashboard, select a user, and scroll down to `identities`.

This example shows a user with a linked Google account:

![User identities](/media/articles/users/user-identities-linked.png)

If you fetch the profile after linking accounts, this same information will be available. You can display this information and provide an **Unlink** button.

```html
<!-- index.html -->

...

<h3>Linked accounts</h3>
<ul id="linked-accounts-list"></ul>

...
```

```js
// app.js
...

var showUserIdentities = function(profile) {

  login_div.style.display = "none";
  logged_div.style.display = "inline-block";

  var linked_accounts = '';

  profile.identities.forEach(function(identity) {
    // Print all the identities but the main one (Auth0).
    if (profile.user_id != identity.provider + '|' + identity.user_id) {
      var identity_stringified = JSON.stringify(identity);
      var btn = "<button type='button' class='unlink-account' data-identity='" + identity_stringified + "'>Unlink</button>";
      linked_accounts +=
        '<li>' + identity.connection + ' ' + identity.profileData.name + ' ' + btn + '</li>';
    }
  });

  document.getElementById('linked-accounts-list').innerHTML = linked_accounts;
  bind_unlink_buttons();
};

...
```

## Unlinking Accounts

You can disassociate a linked account by calling the [unlink a user account](/api/management/v2#!/Users/delete_provider_by_user_id) endpoint using the primary `user_id` and the `provider` and `user_id` of the identity to unlink.

```js
// app.js

...

var unlinkAccount = function(identity) {

  // Get user_id value stored at login step
  var user_id = localStorage.getItem('user_id');
  var url = 'https://' + '<%= account.namespace %>' + '/api/v2/users/' + user_id + '/identities/' + identity.provider + '/' + identity.user_id;
  var xhr = new XMLHttpRequest();

  xhr.open('DELETE', url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('id_token'));

  xhr.onload = function() {
    if (xhr.status == 200) {
      fetchProfile();
    } else {
      alert("Request failed: " + xhr.statusText);
    }
  };

  xhr.send();
};
...
```
