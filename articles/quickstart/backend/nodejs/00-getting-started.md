---
title: Getting Started
description: This tutorial demonstrates how to verify JSON Web Tokens and protect endpoints in an Express API
---

To restrict access to the resources served by your API, a check needs to be made to determine whether the incoming request contains valid authentication information. There are various methods for including authentication information in a request, but for integration with Auth0, the server needs to check for a valid JSON Web Token (JWT).

This sample demonstrates how to check for a JWT in the `Authorization` header of an incoming HTTP request and verify that it is valid. The validity check is done in an Express middleware function which can be applied to any endpoints you wish to protect. If the token is valid, the resources which are served by the endpoint can be released, otherwise a `401 Authorization` error will be returned.

## Create an API in Auth0

<%= include('../_includes/_api_create') %>

