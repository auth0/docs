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

This guide will show you how to change the Access Token lifetime using Auth0's Dashboard.

1. Navigate to the [APIs](${manage_url}/#/apis) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the API to view.

2. Locate the **Token Expiration (Seconds)** field, and enter the appropriate Access Token lifetime (in seconds) for the API. When finished, click **Save Changes**.

![Update Token Expiration](/media/articles/tokens/tokens-expiration-api.png)

The following information may be useful when setting token expiration values:

| **Value** | **Description** |
|------------|-----------------|
| Default | 86400 seconds (24 hours) |
| Maximum | 2592000 seconds (30 days) |