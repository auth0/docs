# Link Accounts walkthrough using the API Explorer

1. Make sure you have two users in the [Users section](${uiURL}/#/users) of the Dashboard. In the example there are two users with same e-mail addresses but different connections (Google and Username-Password). 
	![](/media/articles/link-accounts/users.png)
2. Take a look at each user's profile before linking. You can edit the user_metadata and app_metadata from the Dashboard in order to play with data.
	![](/media/articles/link-accounts/user-google.png)
	![](/media/articles/link-accounts/user-database.png)
3. Link accounts using the [API Explorer](https://auth0.com/docs/api/v2#!/Users/post_identities). Make sure you have have an [API V2 token](/tokens/apiv2) with `update:users` scope. 
    ![](/media/articles/link-accounts/link-accounts-api-explorer.png)
4. Notice how the user profile changed:
	* Only the primary account shows in the [Users](${uiURL}/#/users) list in the Dashboard.
	* The other account is now embeded in the `Identities` array of the primary profile.
  * The data of the associated account is reduced. `user_metadata` and `app_metadata` associated to the database user is lost.
  * `user_metadata` and `app_metadata` of the root account remains the same.

  ``` json
  {
      "email": "cs.auth0@gmail.com",
      "email_verified": true,
      "name": "John Doe",
      "given_name": "John",
      "family_name": "Doe",
      "user_id": "google-oauth2|115015401343387192604",
      "identities": [
          {
              "provider": "google-oauth2",
              "access_token": "ya29._wEJa1qod9LoM6W4hTMHrHfaB2jPECV4Ef9XiB7g6AZFYlFobBzKytFMx4PjHpipwzg-",
              "expires_in": 3600,
              "user_id": "115015401343387192604",
              "connection": "google-oauth2",
              "isSocial": true
          },
          {
              "profileData": {
                  "email": "cs.auth0@gmail.com",
                  "email_verified": true,
                  "nickname": null,
                  "username": null
              },
              "user_id": "560d7b906609ac95169d9d51",
              "provider": "auth0",
              "connection": "Username-Password-Authentication",
              "isSocial": false
          }
      ],
      "user_metadata": {
          "color": "red"
      },
      "app_metadata": {
          "roles": [
              "Admin"
          ]
      },
      ...
  }
  ```

  5. Use the [API Explorer](https://auth0.com/docs/api/v2#!/Users/delete_provider_by_user_id) to unlink the accounts.

  ![](/media/articles/link-accounts/unlink-accounts-api-explorer.png)

  Notice that the primary account remains being the only one shown in the [Users](${uiURL}/#/users) list in the Dashboard. If you login again with the inlinked account, it will be added to the user's list. But all the associated metadata that it had before linking is not recovered.
  