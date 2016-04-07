# API Authorization: Using the Auth0 Dashboard
<%=include('./_preview-warning') %>

1. Open the Auth0 Dashboard and browse to the Applications section.
2. Here you will create a new Application for each of the clients that will consume the API you want to generate access tokens for.
3. Navigate to the API section by browsing to [manage.auth0.com/#/apis](http://manage.auth0.com/#/apis)

  > *NOTE*: This will open the API section (you won't be able to navigate from the sidebar since we haven't made the section public)

  ![](/media/articles/api-auth/api-section.png)

4. Create a new "API" and enter a friendly name and identifier for it (ideally this would be the public endpoint of API)

  [](/media/articles/api-auth/new-api.png)

5. Under the "Authorized Clients" tab, add each of your clients representing the consumers of the API. This will create a client grant for each client and will allow you to generate `access_token`s for them to consume your API.

6. Make a note of the `client_id` and `client_secret` of the authorized clients. You are going to need these for the `client credentials` flow.

  ![](/media/articles/api-auth/authorized-client.png)

7. Update your API to parse this token out of the requests and validate them. For this you will need to use the **signing_secret** of the API, which is the one used for signing the `access_tokens` using the HS256 algorithm.

You are now ready to ask Auth0 for `access_tokens` for you API. Navigate [to this separate section](/api-auth/asking-for-access-tokens) for details on generating access tokens or you can continue by [setting up custom scopes for your API](/api-auth/adding-scopes) if that's your preference.
