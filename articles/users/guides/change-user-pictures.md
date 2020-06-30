---
description: How to use the user_metadata to change a user's picture field and how to change the default picture for all users.
topics:
    - users
    - user-management
    - user-profiles
    - user-picture
contentType: how-to
useCase: manage-users
v2: true
---

# Change User Pictures

Auth0 [normalizes](/users/normalized) common profile properties in the User Profile, this includes the `name` and `picture` field and more. The picture field is populated by either the social provider profile picture or the Gravatar image associated with the user's email address. By default, all database users will have a placeholder image with their initials. When you authenticate the user, this picture field is referred by as `user.picture`.

![User Picture](/media/articles/user-profile/user-picture.png)

1. By default, the `user.picture` attribute is not directly editable when provided by identity providers other than Auth0 (such as Google, Facebook, Twitter). If you want to be able to edit this attribute, you must [configure your connection sync with Auth0](/dashboard/guides/connections/configure-connection-sync) so that user attributes will be updated from the identity provider only on user profile creation. Root attributes will then be available to be [edited individually](/api/management/guides/users/update-root-attributes-users) or [by bulk import](/api/management/guides/users/update-root-attributes-users) using the Management API.

Alternatively, you can use the [Metadata](/users/concepts/overview-user-metadata) to store the picture attribute for users, but this is not recommended for scalability.

For example, if your app provides a way to upload profile pictures, once the picture is uploaded, you can set the URL to the picture in `user.user_metadata.picture`:

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/users/USER_ID",
  "httpVersion": "HTTP/1.1",
  "cookies": [],
  "headers": [{
    "name": "Authorization",
    "value": "Bearer ABCD"
  }, {
    "name": "Content-Type",
    "value": "application/json"
  }],
  "queryString": [],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"user_metadata\": {\"picture\": \"https://example.com/some-image.png\"}}"
  },
  "headersSize": -1,
  "bodySize": -1,
  "comment": ""
}
```

2. To ensure that the picture from the `user_metadata` is returned in the ID Token, you need to create a [Rule](/rules) to check whether the `user.user_metadata.picture` attribute is present, and if so replace the `user.picture` attribute with that value. This will ensure that the picture from the `user_metadata` is returned in the `picture` claim of the ID Token.

Here is an example of the code you can use in your Rule:

```js
function (user, context, callback) {
  if (user.user_metadata.picture)
    user.picture = user.user_metadata.picture;

  callback(null, user, context);
}
```

## Change the default picture for all users

To change the default picture of all users who do not have a profile picture set, you can use a rule to do this.

Example:

```js

function (user, context, callback) {
  if (user.picture.indexOf('cdn.auth0.com') > -1) {
    const url = require('url');
    const u = url.parse(user.picture, true);
    u.query.d = 'URL_TO_YOUR_DEFAULT_PICTURE_HERE';
    delete u.search;
    user.picture = url.format(u);
  }
  callback(null, user, context);
}

```

## Keep reading

- [User Profile Structure](/users/references/user-profile-structure)
- [View Users](/users/guides/view-users)
- [Auth0 Blog: Update of the user's details section](https://auth0.com/blog/update-of-the-user-details-section/)
