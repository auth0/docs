::: note
**Checkpoint:** Try to log in to your application again. Look at how the Access Token differs from before. It is no longer an opaque token. It is now a JSON Web Token with a payload that contains your API identifier as the value for `audience`, and the scopes you created. Read more about this token in the <a href="/tokens/concepts/jwts" target="_blank">JSON Web Tokens documentation</a>.
:::

::: note
By default, any user can ask for any scope you defined. You can implement access policies to limit this behavior using <a href="/rules" target="_blank">Rules</a>.
:::
