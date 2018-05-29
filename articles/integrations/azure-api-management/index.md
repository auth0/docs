---
description: Using Auth0 as an OAuth 2.0 server to authenticate users wanting access to an API managed by the Azure API Management service
tags:
    - integrations
    - azure
    - api-management
---

# Integrate Azure API Management Service with Auth0

If you have an API that you want published and secured, you can do so using Azure API Management in conjunction with Auth0. 

Azure's API Management Service allows you to create new APIs or import existing API definitions and publish them for use by the approved audiences. Auth0 makes authorizing users of your API (using OAuth 2.0 standards) easy.

In this tutorial, we will show you how to [create a representation of your API in Auth0](/integrations/azure-api-management/configure-auth0), set up the [Azure API Management service, import an existing API, and secure it using Auth0](/integrations/azure-api-management/configure-azure). More specifically, we will:

1. Set up Auth0 by creating an API and Machine to Machine Application, Connection, and User
2. Create an API Management Service on the Azure Portal
3. Import a Basic Calculator API (this sample API is provided by Microsoft)
4. Set up Auth0 for use as an OAuth 2.0 Server in Azure
5. Secure access to your Basic Calculator API using Auth0

We will also test the integration. You'll see that, whenever a user attempts to make a call to the Basic Calculator API, they are asked to provide credentials to an Auth0-provided login screen. Only by providing valid credentials is the user allowed to make a call to the API.

<%= include('./_stepnav', {
 next: ["1. Configure Auth0", "/integrations/azure-api-management/configure-auth0"]
}) %>