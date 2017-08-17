Use the `client.userInfo` method from the auth0.js library to get user information from the `/userInfo` endpoint. 
For the first argument in this method, use the user's `access_token`.
For the second argument, use a callback with arguments for a potential error and a profile. 