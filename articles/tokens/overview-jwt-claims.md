rules you should be aware of when it comes to naming (especially if you are using self-defined custom claims).

The JWT specification defines seven claims that can be included in a token. These are **registered claim names**, and they are:

* iss
* sub
* aud
* exp
* nbf
* iat
* jti

For your specific use case, you might then use what are called **public claim names**. Examples of these include:

* auth_time
* acr
* nonce

Finally, there are **private claim names**, which you can use to convey identity-related information, such as name or department.

Because public and private claims are not registered, take care to avoid name collisions. If a collision does occur, it can be difficult to tease apart two claims of the same name, but with differing information.
