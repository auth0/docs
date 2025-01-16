::: warning
When a user's `/oauth/ro` based access token has expired, Auth0 **forces them to reauthenticate** (forced logout required) because the `/oauth/ro` refresh token cannot be used to call `/oauth/token` for a new Access Token. All currently logged in user's must log in again during an `/oauth/ro` to `/oauth/token` migration. 
:::
