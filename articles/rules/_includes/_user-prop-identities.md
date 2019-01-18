Array of user identity objects. Each identity object has these properties:
- `.connection`: Connection used to authenticate the user.
- `.isSocial`: Boolean value (`true`/`false`) indicating if the connection is a social one or not.
- `.provider`: Entity that is authenticating the user (such as Facebook, Twitter, and so on).
- `.user_id`: User's unique identifier for this connection/provider.