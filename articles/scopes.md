# Scopes

You can control the attributes that go into the issued token with the `scope` parameter in the authorization request. Some examples:

* `scope=openid`: will only return the `user_id` as the `sub` attribute in the token.
* `scope=openid email nickname`: will return the `user_id` as `sub`, `email` and `nickname` attributes.
* `scope=openid profile` (not recommended): will return all the user attributes in the token. If you have a huge amount of information on a user profile this is usually the reason of the `token_too_long` error. You should use a more constrained scope. If you expect the token in the body of the response (e.g. when using `/delegation`), then token size would not matter as much.

> You might be using `response_type=token` which gives back a JSON Web Token in the URL (like `https://yourapp/#id_token=eY....`). The main problem with this is that long URLs don't play well with different stacks, and browsers.
