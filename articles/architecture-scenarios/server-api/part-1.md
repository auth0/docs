---
description: Solutions Overview for the Server + API architecture scenario
toc: true
---

# Server + API: Solution Overview

<%= include('../_includes/_api-overview-of-solution.md') %>

<%= include('../_includes/_api-authentication-and-authorization.md') %>

## Client Credentials Grant

OAuth 2 provides several *grant types* for different use cases. In this particular use case where a cron job will be uploading timesheets via an API, there is no interactive user (or resource owner) who grants permission to the cron job to access the API.

The cron job is also not making the API calls on behalf of any user. Instead there is a machine-to-machine authorization and the application (the cron job) makes calls to the Resource Server (the API) on its own behalf.

For situations like this where there is no user interaction involved, the Client Credentials Grant is ideal. With Client Credentials Grant (defined in [RFC 6749, section 4.4](https://tools.ietf.org/html/rfc6749#section-4.4)) an Application can directly request an `access_token` from the Authorization Server by using its Client Credentials (a Client Id and a Client Secret). Instead of identifying a Resource Owner, this token will represent the Application itself.

![Client Credentials Grant Flow](/media/articles/architecture-scenarios/server-api/client-credentials-grant.png)

1. The Application authenticates with the Authorization Server using its Client ID and Client Secret.
1. The Authorization Server validates this information and returns an `access_token`.
1. The Application can use the `access_token` to call the Resource Server on behalf of itself.

<%= include('./_stepnav', {
 prev: ["Introduction", "/architecture-scenarios/application/server-api"], next: ["2. Auth0 Configuration", "/architecture-scenarios/application/server-api/part-2"]
}) %>
