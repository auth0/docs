## Link the Accounts

Now, you can link the accounts. To do this, you need the following values: 
- `id`: the logged-in user's ID (see `profile.sub`)
- `accessToken`: a Management API access token for the saved account the user initially logged in to; must have the `update:current_user_identities` scope
- `otherUserToken`: the ID Token for the second account received in the last login response
