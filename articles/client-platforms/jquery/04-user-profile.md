---
title: User Profile
description: This tutorial will show you how to integrate Auth0 with jQuery to authenticate and fetch/show/update profile information.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-jquery-samples',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-jquery-samples',
  pkgBranch: 'master',
  pkgPath: '04-User-Profile',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* jQuery 3.1.0
:::

## Profile

To fetch user profile information, call the `lock.getProfile` function, specifying the `idToken` and a callback to process the response.

Once you retrieve the user profile, you can store it in `localStorage` (or any store).

```javascript
/* ===== ./app.js ===== */
$(document).ready(function() {
  var lock = null;

  lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
    auth: {
      params: { scope: 'openid email' } //Details: https://auth0.com/docs/scopes
    }
  });

  ...

  lock.on("authenticated", function(authResult) {
    lock.getProfile(authResult.idToken, function (err, profile) {
      if (err) {
        // Remove expired token (if any)
        localStorage.removeItem('id_token');
        // Remove expired profile (if any)
        localStorage.removeItem('profile');
        return alert('There was an error getting the profile: ' + err.message);
      } else {
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        showUserProfile(profile);
      }
    });
  });

  ...

  var logout = function() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    window.location.href = "/";
  };

  ...
});
```

Then display `user profile` attributes in your HTML:

```javascript
/* ===== ./app.js ===== */
...
var showUserProfile = function(profile) {
  // Editing purposes only
  user_id = profile.user_id;
  ...
  $('#avatar').attr('src', profile.picture);
  $('#name').text(profile.name);
  $('#email').text(profile.email);
  $('#nickname').text(profile.nickname);
  $('#created_at').text(profile.created_at);
  $('#updated_at').text(profile.updated_at);
  ...
};
...
```

```html
<!-- ===== ./index.html ===== -->
...
<div id="login" class="row">
  <h4>You are not logged in</h4>
  <button type="button" class="btn btn-primary" id="btn-login">Login</button>
</div>

<div id="logged" class="row" style="display: none;">
  <h4>You are logged in</h4>
  <div class="row">
    <div class="col-md-6">
      <h3>Profile</h3>
      <img alt="" id="avatar">
      <p><strong>Name: </strong> <span id="name"></span></p>
      <p><strong>Email: </strong> <span id="email"></span></p>
      <p><strong>Nickname: </strong> <span id="nickname"></span></p>
      <p><strong>Created At: </strong> <span id="created_at"></span></p>
      <p><strong>Updated At: </strong> <span id="updated_at"></span></p>
    </div>
  </div>
  <button type="button" class="btn btn-default" id="btn-logout">Logout</button>
</div>
...
```

## Custom Sign Up Fields

<%= include('../_includes/_profile-metadata-explanation') %>

You can add input fields to the sign-up form by adding `additionalSignUpFields` to the `options` parameter of the `Auth0Lock` instantiation.

**NOTE:** See [Additional Sign-Up Fields](/libraries/lock/v10/customization#additionalsignupfields-array-) for more information (**only available for Lock 10**).

```javascript
/* ===== ./app.js ===== */
...
  lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
    additionalSignUpFields: [{
      name: "address",                              // required
      placeholder: "Enter your address",            // required
      icon: "https://example.com/address_icon.png", // optional
      validator: function(value) {                  // optional
        // only accept addresses with more than 10 characters
        return value.length > 10;
      }
    }]
  });
...
```

Each `additionalSignUpFields` value is saved to the profile in the `user_metadata` attribute.

To display this data, read it from the profile's `user_metadata`:

```javascript
/* ===== ./app.js ===== */
...
var showUserProfile = function(profile) {
  ...
  if (profile.hasOwnProperty('user_metadata')) {
    $('#address').text(profile.user_metadata.address);
  }
}
...
```

```html
<!-- ===== ./index.html ===== -->
...
<strong>Address: </strong> <span id="address"></span>
...
```

## Update User Profile

You can add an `address` attribute to the user profile's `user_metadata` by creating an AJAX call and a simple form. You will need to call the [Update a User](/api/management/v2#!/Users/patch_users_by_id) endpoint on form-submit.

To call the endpoint we need to add the Authorization header to requests.

First, use `$.ajaxSetup()` for setting `Authorization` header automatically for all the requests:

```javascript
/* ===== ./app.js ===== */
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

Then use `$.ajax()` with `method = 'PATCH'` to update the user's data.

```javascript
/* ===== ./app.js ===== */
...
$('#btn-edit-submit').on('click', function(ev) {
  ev.preventDefault();
  var user_address = $('#edit_address').val();
  $.ajax({
    url: 'https://' + '${account.namespace}' + '/api/v2/users/' + user_id,
    method: 'PATCH',
    data: { user_metadata: {address: user_address} }
  }).done(function(updated_profile) {
    localStorage.setItem('profile', JSON.stringify(updated_profile));
    showUserProfile(updated_profile);
  }).fail(function(jqXHR, textStatus) {
    alert("Request failed: " + textStatus);
  });
});
...
```

Then create a simple form to add/update the *address* attribute:

```html
<!-- ===== ./index.html ===== -->
...
<div id="edit_profile" class="row" style="display: none;">
  <div class="col-md-6">
    <h3>Profile</h3>
    <img alt="" id="edit-avatar">
    <form>
      <div class="form-group">
        <label for="name">Address</label>
        <input type="text" class="form-control" id="edit_address" placeholder="Enter address">
      </div>
      <button type="submit" class="btn btn-default" id="btn-edit-submit">Submit</button>
    </form>
  </div>
</div>
...
```

# Summary

In this guide you learned how to manage user profiles by fetching the user profile information from Auth0, storing that information in localStorage to avoid future requests, and then reading this information from localStorage to show the user profile. You also learned how to add custom sign-up fields to Auth0's sign-up form and how to update user profile information.
