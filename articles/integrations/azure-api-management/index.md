---
description: Using Auth0 as an OAuth 2.0 server to authenticate users wanting access to an API managed by the Azure API Management service
toc: true
url: /integrations/azure-api-management
---

# Integrate Azure API Management Service with Auth0

If you have an API that you want published and secured, you can do so using Azure API Management in conjunction with Auth0. 

Azure's API Management Service allows you to create new APIs or import existing API definitions and publish them for use by the approved audiences. Auth0 makes authorizing users of your API using OAuth 2.0 standards easy.

In this example, we will show you how to [create a representation of your API in Auth0](/integrations/azure-api-management/configure-auth0), set up the [Azure API Management service, import an existing API, and secure it using Auth0](/integrations/azure-api-management/configure-azure).

<%= include('./_stepnav', {
 next: ["1. Configure Auth0", "/integrations/azure-api-management/configure-auth0"]
}) %>

<%= include('./_stepnav', {
 next: ["2. Configure Azure API Management", "integrations/azure-api-management/configure-azure"]
}) %>