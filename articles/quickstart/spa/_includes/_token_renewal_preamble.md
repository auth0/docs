## Token Lifetime

For security, keep the expiry time of a user's Access Token short. 

When you create an API in the Auth0 dashboard, the default expiry time for browser flows is 7200 seconds (2 hours).

This short expiry time is good for security, but can affect user experience. To improve user experience, provide a way for your users to automatically get a new Access Token and keep their client-side session alive. You can do this with <a href="/api-auth/tutorials/silent-authentication" target="_blank" rel="noreferrer">Silent Authentication</a>.

::: note
You can control the expiry time of an Access Token from the <a href="${manage_url}/#/apis" target="_blank" rel="noreferrer">APIs section</a>. 
You can control the expiry time of an ID Token from the <a href="${manage_url}/#/applications" target="_blank" rel="noreferrer">Applications section</a>. 
These settings are independent.
:::