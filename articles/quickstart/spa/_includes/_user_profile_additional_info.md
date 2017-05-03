## Getting the User's Info with auth0.js

The example above uses the `getUserInfo` method that comes with the Lock widget. If you have implemented a custom login form with auth0.js, you can retrieve a user's profile info with its `userInfo` method. See the [auth0.js documentation](auth0js#extract-the-authresult-and-get-user-info) for more information.

## Updating a User's Profile

Auth0 provides a `user_metadata` object for all users. This object is intended to store information that can be modified by the user and is a useful place to keep data that is meant to be user-defined. See the [management API documentation](api/management/v2) for more information on how to allow users to make edits to their own profile information.