---
title: Calling an API
description: This tutorial demonstrates how to make calls to an external API
budicon: 546
topics:
  - quickstarts
  - spa
  - vuejs
  - apis
github:
  path: 03-calling-an-api
sample_download_required_data:
  - client
contentType: tutorial
useCase: quickstart
---

Most single-page apps use resources from data APIs. You may want to restrict access to those resources, so that only authenticated users with sufficient privileges can access them. Auth0 lets you manage access to these resources using [API Authorization](/api-auth).

This tutorial shows you how to access protected resources in your API, as well as how to modify the API that was created in part 2 to include an endpoint that requires an access token.

<%= include('../_includes/_calling_api_create_api') %>

