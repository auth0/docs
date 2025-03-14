---
title: Update Access Token Lifetime
description: Learn how to update the Access Token lifetime for an API using the Auth0 Dashboard.
topics:
  - applications
  - access-token
  - dashboard
contentType: 
  - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Update Access Token Lifetime

You can change the Access Token lifetime using Auth0's Dashboard.

1. Navigate to the [APIs](${manage_url}/#/apis) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the API to view.

2. Locate the **Token Expiration (Seconds)** field, and enter the appropriate Access Token lifetime (in seconds) for the API. 

    ::: note
    The **Token Expiration For Browser Flows (Seconds)** field refers to Access Tokens issued for the API via implicit and hybrid flows and does not cover all flows initiated from browsers. For example the PKCE flow (used in auth0-js-spa SDK) can be initiated from the browser, but it refers to the Token Expiration not the Token Expiration For Browser Flows value.
    :::

    ![Update Token Expiration](/media/articles/tokens/tokens-expiration-api.png)

    Here are some examples of token expiration values:

    | **Value** | **Description** |
    |------------|-----------------|
    | Default | 86400 seconds (24 hours) |
    | Maximum | 2592000 seconds (30 days) |

3. Click **Save Changes**.

