---
title: User Profile
description: This tutorial will show you how to integrate Auth0 with VanillaJS to authenticate and fetch/show/update profile information.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-javascript-spa',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-javascript-spa',
  pkgBranch: 'master',
  pkgPath: '04-User-Profile',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

## Profile

To fetch user profile information, call the `lock.getProfile` function, specifying the `idToken` and a callback to process the response.

Once you retrieve the user profile, you can store it in `localStorage` (or any store).

```javascript
/* ===== ./app.js ===== */
window.addEventListener('load', function() {
  var lock = new Auth0Lock('<%= account.clientId %>', '<%= account.namespace %>');

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
    document.getElementById('avatar').src = profile.picture;
    document.getElementById('name').textContent = profile.name;
    document.getElementById('email').textContent = profile.email;
    document.getElementById('nickname').textContent = profile.nickname;
    document.getElementById('created_at').textContent = profile.created_at;
    document.getElementById('updated_at').textContent = profile.updated_at;
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

You can add input fields to the sign up form by adding `additionalSignUpFields` to the `options` parameter of the `Auth0Lock` instantiation.

**NOTE:** See [Additional sign up fields](/libraries/lock/v10/customization#additionalsignupfields-array-) for more information (**only available for Lock 10**).

```javascript
/* ===== ./app.js ===== */
...
var lock = new Auth0Lock('<%= account.clientId %>', '<%= account.namespace %>', {
  additionalSignUpFields: [{
    name: "address",                              // required
    placeholder: "Enter your address",            // required
    icon: "./address_icon.png",                   // optional
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
    document.getElementById('address').textContent = profile.user_metadata.address;
    ...
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

You can add an `address` attribute to the user profile's `user_metadata` by creating an AJAX call and a simple form. You will need to call the [Update a user](/api/management/v2#!/Users/patch_users_by_id) endpoint on form-submit with `method = 'PATCH'` to update user's data. This endpoint will return the user profile information updated with the new address.

**NOTE:** To call the endpoint we need to add the `Authorization` header to the request.

```javascript
/* ===== ./app.js ===== */
...
document.getElementById('btn-edit-submit').addEventListener('click', function() {
  var user_address = document.getElementById('edit_address').value;
  var url = 'https://' + '<%= account.namespace %>' + '/api/v2/users/' + user_id;
  var data = JSON.stringify({ user_metadata: {address: user_address} });
  var xhr = new XMLHttpRequest();
  xhr.open('PATCH', url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Authorization',
                       'Bearer ' + localStorage.getItem('id_token'));
  xhr.onload = function() {
    if (xhr.status == 200) {
      localStorage.setItem('profile', xhr.responseText);
      showUserProfile(JSON.parse(xhr.responseText));
    } else {
      alert("Request failed: " + xhr.statusText);
    }
  };
  xhr.send(data);
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

## Summary

In this guide we saw how to manage user profile by fetching the user profile information from Auth0 and then storing that information in localStorage to avoid future requests and then read this information from localStorage in order to show user profile. We also saw how to add custom sign up fields to Auth0's sign up form and how to update user's profile information.
