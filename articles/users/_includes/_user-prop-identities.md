Array of user identity objects. Each identity object has these properties:
- `connection` (text): Connection used to authenticate the user.
- `isSocial` (boolean): Value (`true`/`false`) indicating if the connection is a social one or not.
- `provider` (text): Entity that is authenticating the user (such as Facebook, Twitter, and so on).
- `user_id` (text): User's unique identifier for this connection/provider.
