---
description: FAQs for Management API Access Tokens
section: apis
toc: true
topics:
  - apis
  - management-api
  - tokens
contentType: 
    - reference
useCase: invoke-api
---

# Management API Access Token FAQs

__How long is the token valid for?__</br>
The Management API token has by default a validity of __24 hours__. After that the token will expire and you will have to get a new one. If you get one manually from [the API Explorer tab of your Auth0 Management API](${manage_url}/#/apis/management/explorer) though, you can change the expiration time. However, having non-expiring tokens is not secure.

__The old way of generating tokens was better, since the token never expired. Why was this changed?__</br>
The old way of generating tokens was insecure since the tokens had an infinite lifespan. The new implementation allows tokens to be generated with specific <dfn data-key="scope">scopes</dfn> and expirations. We decided to move to the most secure implementation because your security, and that of your users, is priority number one for us.

__Can I change my token's validity period?__</br>
You cannot change the default validity period, which is set to 24 hours. However, if you get a token manually from [the API Explorer tab of your Auth0 Management API](${manage_url}/#/apis/management/explorer) you can change the expiration time for the specific token. Note though, that your applications should use short-lived tokens to minimize security risks.

__Can I refresh my token?__</br>
You cannot renew a Management API token. A [new token](#2-get-the-token) should be created when the old one expires.

__My token was compromised! Can I revoke it?__</br>
You cannot directly revoke a Management API token, thus we recommend a short validity period.
Note that deleting the application grant will prevent *new tokens* from being issued to the application. You can do this either by [using our API](/api/management/v2#!/Client_Grants/delete_client_grants_by_id), or manually [deauthorize the API application using the dashboard](${manage_url}/#/apis/management/authorized-applications).

__My Client Secret was compromised! What should I do?__</br>
You need to change the secret immediately. Go to your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings) and click the __Rotate__ icon <i class="notification-icon icon-budicon-171"></i>, or use the [Rotate a client secret](/api/management/v2#!/Clients/post_rotate_secret) endpoint. Note that previously issued tokens will continue to be valid until their expiration time.
