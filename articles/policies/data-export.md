---
description: Auth0 policies on exporting data.
topics:
    - auth0-policies
    - data 
    - data-exports
contentType:
  - reference
useCase:
  - support
---
# Data Export Policy

If you would like to export your data from Auth0 there are a several ways you can do this. Please note these tools do not export password hashes of your [Auth0-hosted database users](/connections/database). You can still request this information by opening a [support ticket](https://support.auth0.com/). Please note that in order to make this request you must be signed in to the Developer plan for one month.

## Use the Import/Export Extension

You can use our [Import/Export Extension](/extensions/user-import-export) to export nearly all data in your Auth0 tenant. 

## Use the Management API

If you want to export certain sets of data programmatically, the **Management API** can assist you with this. For more information on using the Management API, you can:

* Browse the [Management API documentation](/api/management/v2).
* Read about [obtaining a token](/api/management/v2/tokens) which you can use to call the Management API.
* Read about [searching for users](/users/search) as well as the [query syntax](/users/search/v3/query-syntax) that can be used.
