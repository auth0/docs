::: panel Checkpoint
Try to log in to your application again. Look at how the `access_token` differs from before. It is no longer an opaque token. Instead, it is now a JSON Web Token with a payload that contains your API identifier as audience and the scopes you created.
:::

::: note
By default, any user can ask for any scope you defined. You can implement access policies to limit this behavior using [Rules](https://auth0.com/docs/rules).
:::