---
title: Calling an API
description: This tutorial demonstrates how to make API calls for protected resources on your server.
budicon: 546
topics:
  - quickstarts
  - spa
  - react
  - apis
github:
  path: 02-Calling-an-API
sample_download_required_data:
  - client
  - api
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD041-->

Most single-page apps use resources from data APIs. You may want to restrict access to those resources, so that only authenticated users with sufficient privileges can access them. Auth0 lets you manage access to these resources using [API Authorization](/api-auth).

This tutorial shows you how to create a simple API using [Express](https://expressjs.com) that validates incoming JSON Web Tokens. You will then see how to call this API using an Access Token granted by the Auth0 authorization server.

<%= include('../_includes/_calling_api_create_api') %>

<%= include('../_includes/_calling_api_create_backend.md') %>