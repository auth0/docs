For security, keep the expiry time of a user's access token short. 

When you create an API in the Auth0 dashboard, the default expiry time for browser flows is 7200 seconds (2 hours).

This short expiry time is good for security, but can affect user experience. To improve user experience, provide a way for your users to automatically get a new access token and keep their client-side session alive. You can do this with [Silent Authentication](/api-auth/tutorials/silent-authentication).

::: note
You can control the expiry time of an access token from the [APIs section](${manage_url}/#/apis). 
You can control the expiry time of an ID token from the [Clients section](${manage_url}/#/clients). 
These settings are independent.
:::