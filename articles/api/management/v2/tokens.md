---
description: Details generating and using an Auth0 Management APIv2 token.
section: apis
---

# The Auth0 Management APIv2 Token

## Overview

The Auth0 Management APIv2 token is required to call v2 of the Auth0 Management API.  This token is used by a specific tenant in Auth0 to call Auth0 Management APIv2 to access or update records for that tenant.  This Management APIv2 token is a JWT, and contains various scopes, such as `read:users` or `update:clients`, and is signed with a client API key and secret for the entire tenant.

## How to get a Management APIv2 Token

**Create a Non Interactive Client**

A Non Interactive Client is a client that interacts with an API where there is no user involved. It's a machine to machine interaction. This must be used instead of a Single Page or Native apps because those cannot meet the necessary security requirements for executing this type of flow.

To create a new Non Interactive Client, go to the [Clients section](${manage_url}/#/clients) of the dashboard then click the **CREATE CLIENT** button.

Enter a name for your new client, select **Non Interactive Clients** and then click the **CREATE** button.

![Create New Client](/media/articles/api/tokens/noninteractive-client.png)

**Authorize the Client**

After creating the new client, you will be brought to it's **Quick Start** section. Select **Auth0 Management API** from the dropdown. You will then see a message that the client is not authorized, click **NAVIGATE TO THE API AND AUTHORIZE**.

![](/media/articles/api/tokens/navigate-button.png)

This will bring you to the [APIs section](${manage_url}/#/apis) under **Auth0 Management API** in the **Non Interactive Clients** section. (To enable the APIs section of the sidebar, go to Account Settings > Advanced > Enable APIs Section)

![Authorize Client](/media/articles/api/tokens/authorize-noninteractive.png)

Toggle the slider to authorize your client.

**Choose the scopes**

You will see the available scopes that you can be granted for this client (which can be revoked at any time). Choose the desired scopes and then click the **UPDATE** button.

![Choose authorized scopes](/media/articles/api/tokens/choose-scopes.png)

**Getting the token**

To test the client interaction with the API, go to the **Test** section under **Auth0 Management API**.

![Test Client](/media/articles/api/tokens/test-client.png)

This page will give you code snippets on how to form a request to get a token.

You should be able to scroll down to see your `access_token` property from the token which can be used to make authorized requests to your API.

### Special Scopes

Notice that within the Users API some endpoints have scopes related to the current user (like `read:current_user` or `update:current_user_identities`). These are [special scopes](/api/v2/changes#the-id_token-and-special-scopes) in the id_token, which are granted automatically to the logged in user, so it makes no sense to click on them to generate a Management APIv2 token that will be used from server side code.

## How to control contents of a Management APIv2 token

The Management APIv2 token will be issued for a particular tenant.  To have a token issued in the Management APIv2 explorer for a particular tenant, log into the Auth0 tenant, and then access the Management APIv2 explorer page.  Similarly, to obtain the secret with which to sign a Management APIv2 token, log into the desired tenant first before accessing the Management APIv2 explorer page.

## Validity

There is no specific validity period for a Management APIv2 token.  A Management APIv2 token can be built programmatically, as desired, by a client.

## Renewing the token

There is no mechanism for renewing a Management APIv2 token.  A new token should be created whenever it is needed.

## Termination of tokens

You can terminate the Management APIv2 tokens calling the [blacklist endpoint](/api/v2#!/Blacklists/post_tokens).

## Uses

The Auth0 Management APIv2 access token is used to call the Auth0 Management APIv2.  This token is required to update the app_metadata portions of the user profile.

## API Secret

Keep your API secret secure. In the event that your API secret has been compromised or you need to invalidate all of your tokens you can change the API secret.

You can change the API secret  in the dashboard by visiting this URL directly:

```text
${manage_url}/#/applications/YOUR_API_ID/settings
```

You can then change the `Client Secret` in that page to change your Management APIv2 secret.
