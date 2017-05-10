---
description: How to use the user_metadata to change a user's picture field and how to change the default picture for all users.
---

# User Picture

Auth0 [normalizes](/user-profile/normalized) common profile properties in the User Profile, this includes the `name` and `picture` field and more. The picture field is populated by either the social provider profile picture or the Gravatar image associated with the user's email address. By default all database users will have a placeholder image with their initials. When you authenticate the user, this picture field is referred by as `user.picture`.

![User Picture](/media/articles/user-profile/user-picture.png)

## Change a User's Picture

At this stage this attribute is not directly editable, however you can use the `user_metadata` picture attribute in your front-end as desired. To persist a different picture in the user's profile, you can set the URL to a new photo in the user object as `user.user_metadata.picture`. This will override the default picture and will be available in your app as `user.picture`. The `user_metadata` field can be updated by [calling the Management API v2 endpoint](/api/management/v2#!/Users/patch_users_by_id) with the `id` of the specified user.

For example, if your app provides a way to upload profile pictures, once the picture is uploaded, you can set the URL to the picture in `user.user_metadata.picture`.

## Change the default picture for all users

If you want to change the default picture of all users who do not have a profile picture set, you can use a rule to do this. 

Example:

```js

function (user, context, callback) {
  if (user.picture.indexOf('cdn.auth0.com') > -1) {
    var url = require('url');
    var u = url.parse(user.picture, true);
    u.query.d = '<URL TO YOUR DEFAULT PICTURE HERE>';
    delete u.search;
    user.picture = url.format(u);
  }

  callback(null, user, context);
}

```

## Further Reading:

- [Structure of the User Profile](/user-profile/user-profile-structure)
- [User Profile: In-Depth Details](/user-profile/user-profile-details)
- [Auth0 Blog: Update of the user's details section](https://auth0.com/blog/update-of-the-user-details-section/)
