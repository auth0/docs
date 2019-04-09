Once a user successfully authenticates, [${idp} will include an Access Token](/tokens/overview-idp-access-tokens) in the user profile it returns to Auth0. You can use this token to call ${idp}'s API.

To get the ${idp} Access Token, you must retrieve the full user's profile using the Auth0 Management API and extract the Access Token from the response. For detailed steps, see [Call an Identity Provider's API](/connections/calling-an-external-idp-api).

Using the token, you can call ${idp}'s API following ${idp}'s documentation.

Optional: Get a [Refresh Token](/tokens/refresh-token/current#get-a-refresh-token) from ${idp} to refresh your Access Token once it expires. To ensure your application is secure, pay close attention to the [restrictions on using Refresh Tokens](/tokens/refresh-token/current#restrictions-on-refresh-token-usage).