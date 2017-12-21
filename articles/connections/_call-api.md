Once you successfully authenticate a user, ${idp} includes an [access token](/tokens/access-token) in the user profile it returns to Auth0. 

You can then use this token to call their API.

In order to get a ${idp} access token, you have to retrieve the full user's profile, using the Auth0 Management API, and extract the access token from the response. For detailed steps refer to [Call an Identity Provider API](/connections/calling-an-external-idp-api).

Once you have the token you can call the API, following ${idp}'s documentation.

::: note
For more information on these tokens, refer to [Identity Provider Access Tokens](/tokens/idp).
:::