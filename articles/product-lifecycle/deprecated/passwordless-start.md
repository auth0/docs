---
description: Describes the deprecation of using the /passwordless/start endpoint from confidential applications without a client secret in the request.
topics:
  - passwordless
  - migrations
contentType: reference
useCase:
  - customize-connections
---
# Deprecation Notice: Use of /passwordless/start from Confidential Applications

Auth0 is deprecating the use of the `/passwordless/start` endpoint from confidential applications when Auth0 cannot authenticate that the call is made on behalf of the application.

OAuth uses the term 'confidential' for applications that can store secrets. In Auth0, those are 'Regular Web Applications', which serve web pages from a backend app. Single Page Applications and Native Applications are considered 'public' applications, and are not affected by this change.

Auth0 can authenticate calls to `/passwordless/start` when they include a `client_secret` as a parameter, or when the calls are made from the custom login page in Universal Login and forward the `state` parameter.

## Are you affected?

If any of your applications currently call the `/passwordless/start` endpoint directly to begin passwordless authentication from a Web Application, and you are not sending the `client_secret` as a parameter, this deprecation does affect you. 

If you are implementing passwordless authentication through the Universal Login page and you changed the default way Auth0 libraries are initialized, it might also affect you too.

You can verify whether you are affected by checking the [tenant logs](${manage_url}/#/logs), filtering by "Deprecation Notice" and check for logs saying "Enforce client authentication for passwordless connections". You can also perform this search directly with the following query: `type:depnote AND description:*passwordless*`.

## Migration

See [Migration Guide: Use of /passwordless/start from Confidential Applications](/product-lifecycle/migration/guides/passwordless-start) for details.