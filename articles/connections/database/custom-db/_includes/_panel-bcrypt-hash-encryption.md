::: panel `bcrypt` hash encryption
The password credential for the user is passed to the login script in plain text so care must be taken regarding its use. You should refrain from logging, storing, or transporting the `password` credential anywhere in its vanilla form. Instead, use something similar to the following example, which uses the [`bcrypt`](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/) algorithm to perform cryptographic hash encryption:

```js
bcrypt.hash(password, 10, function (err, hash) {
  if (err) { 
    return callback(err); 
  } else {
	.
	.
  }
});
```
:::
