# Scopes

You can control the attributes that goes into the token by using the `scope` attribute. Some examples:

* `scope=openid`: will only return the `user_id` (or `sub`) attribute in the token
* `scope=openid attr1 attr2`: will return the `user_id`, `attr1` and `attr2` attributes in the token (it works with any token).
* `scope=openid profile` (not recommended): will return all the user attributes in the token. If you have a huge amount of information on a user profile this is usually the reason of the `token_too_long` error. You should use a more constrained scope.

> You might be using `response_type=token` which gives back a JSON Web Token in the URL (like `https://yourapp/#id_token=eY....`). The main issue with this is that long URLs don't play well with different stacks and browsers. The cause of this is generally that you are requesting a lot of information to be in the token.
