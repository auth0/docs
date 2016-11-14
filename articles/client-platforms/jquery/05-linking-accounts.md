---
title: Linking Accounts
description: This tutorial demonstrates how to integrate Auth0 with jQuery to link accounts.
budicon: 345
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-samples',
  path: '05-Linking-Accounts'
}) %>

<%= include('../../_includes/_linking_accounts') %>

```js
// app.js

...

// Lock instance to launch a login to obtain the secondary id_token
var lockLink = new Auth0Lock('${account.clientId}', '${account.namespace}', {
  auth: {params: {state: "linking"}},
  allowedConnections: ['Username-Password-Authentication', 'facebook', 'google-oauth2'],
  languageDictionary: { // allows to override dictionary entries
    title: "Link with:"
  }
});

...
```

Then, when setting the callback for the `authenticated` event with the `on` method, you can determine which login was executed by checking the value of the `authResult.state` attribute:

```javascript
// app.js

...

lock.on("authenticated", function(authResult) {
  // Every lock instance listen to the same event, so we have to check if
  // it's not the linking login here.
  if (authResult.state != "linking") {
    localStorage.setItem('id_token', authResult.idToken);
    lock.getProfile(authResult.idToken, function(err, profile) {
      if (err) {
        return alert("There was an error getting the profile: " + err.message);
      } else {
        localStorage.setItem('profile', JSON.stringify(profile));
        showUserIdentities(profile);
        // Linking purposes only
        localStorage.setItem('user_id', profile.user_id);
      }
    });
  }
});

lockLink.on("authenticated", function(authResult) {
  // Every lock instance listen to the same event, so we have to check if
  // it's the linking login here.
  if (authResult.state == "linking") {
    // If it's the linking login, then do the link through the API.
    linkAccount(authResult.idToken);
  }
});
...
```

Now that the second login is handled, you will need to actually do the linking.

Before doing the linking we need to configure AJAX to send an `Authorization` header automatically for each request:

```javascript
// app.js

...

$.ajaxSetup({
  'beforeSend': function(xhr) {
    if (localStorage.getItem('id_token')) {
      xhr.setRequestHeader('Authorization',
            'Bearer ' + localStorage.getItem('id_token'));
    }
  }
});

...
```

After that we are good to go and can link the accounts:

```javascript
// app.js

...

var linkAccount = function(id_token) {
  // Get user_id value stored at login step
  var user_id = localStorage.getItem('user_id');
  var data = JSON.stringify({ link_with: id_token });
  $.ajax({
    url: 'https://' + '${account.namespace}' + '/api/v2/users/' + user_id + '/identities',
    method: 'POST',
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'},
    data: data
  }).done(function() {
    fetchProfile();
  }).fail(function(jqXHR, textStatus) {
    alert("Request failed: " + textStatus);
  });
};

...
```

The function takes the `id_token` of the account to link with and posts to the API, passing the `link_with` parameter with the `id_token` value in the body. Then it fetches the profile on success to check that the accounts are now linked.

Now to begin the linking process, call the `show` method on `lockLink` instance:

```javascript
// app.js

...

$('#btn-link-account').on('click', function() {
  lockLink.show();
});

...
```

```html
  ...

  <button type="button" class="btn btn-default" id="btn-link-account">Link Account</button>

  ...
```

## User Profile Linked Accounts Information

The user profile contains an array of identities which includes the profile information from linked providers.

To view a user's identities, access the [Users](${manage_url}/#/users) page on the Auth0 dashboard, select a user, and scroll down to `identities`.

This example shows a user with a linked Google account:

![User identities](/media/articles/users/user-identities-linked.png)

Therefore, if you fetch the profile after linking accounts, this same information will be available.

You can display this information and provide an **Unlink** button:

```html
<!-- index.html -->

...

<h3>Linked accounts</h3>
<ul id="linked-accounts-list">
</ul>

...
```

```javascript
// app.js

...

var showUserIdentities = function(profile) {
  var linked_accounts = '';
  $.each(profile.identities, function(index, identity) {
    // Print all the identities but the main one (Auth0).
    if (profile.user_id != identity.provider + '|' + identity.user_id) {
      var identity_stringified = JSON.stringify(identity);
      var btn = "<button type='button' class='unlink-account' data-identity='" + identity_stringified + "'>Unlink</button>";
      linked_accounts +=
        '<li>' + identity.connection + ' ' + identity.profileData.name + ' ' + btn + '</li>';
    }
  })
  $('#linked-accounts-list').html(linked_accounts);
};

...
```

## Unlinking Accounts

You can disassociate a linked account by calling the [Unlink a user account](/api/management/v2#!/Users/delete_provider_by_user_id) endpoint using the primary `user_id`, and the `provider` and `user_id` of the identity to unlink:

```javascript
// app.js

...

var unlinkAccount = function(identity) {
  // Get user_id value stored at login step
  var user_id = localStorage.getItem('user_id');
  $.ajax({
    url: 'https://' + '${account.namespace}' + '/api/v2/users/' + user_id + '/identities/' + identity.provider + '/' + identity.user_id,
    method: 'DELETE',
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
  }).done(function() {
    fetchProfile();
  }).fail(function(jqXHR, textStatus) {
    alert("Request failed: " + textStatus);
  });
};

...
```
