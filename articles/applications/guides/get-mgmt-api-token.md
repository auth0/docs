
# Get a Management APIv2 Token

To get a Management APIv2 Token, an application can use any of the [API Authorization Flows](/api-auth) with the following request parameters:

- `audience=https://${account.namespace}/api/v2/`
- `scope=read:current_user update:current_user_metadata`
:::
