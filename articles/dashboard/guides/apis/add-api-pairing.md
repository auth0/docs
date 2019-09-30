---
title: Add API Pairing
description: Learn how to add an API pairing using the Auth0 Management Dashboard. For use with Auth0's On-Behalf-Of Flow.
topics:
  - authorization
  - dashboard
  - on-behalf-of
  - token-exchange
  - scopes
  - permissions
contentType:
  - how-to
useCase:
  - call-api
  - secure-api
---
# Add API Pairing

This guide will show you how to pair a source API and a target API using Auth0's Dashboard for use with Auth0's [On-Behalf-Of Flow](/flows/concepts/on-behalf-of). For full configuration of APIs using the On-Behalf-Of Flow, see [Call API Using On-Behalf-Of Flow](/flows/guides/on-behalf-of/call-api-on-behalf-of).

1. Navigate to the [APIs](${manage_url}/#/apis) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the API to view.

![View APIs](/media/articles/authorization/api-list.png)

2. Click the **Delegate** tab, and enable the toggle next to the target API you want to pair with the source API.

3. Select required permissions, and click **Save**.
