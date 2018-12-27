---
title: Tenant's and Application’s Default Login Pages
description: How to configure your tenant's and application's default login page.
toc: true
topics:
  - applications
contentType: how-to
---

# Configuring Tenant and Application’s Default Login Pages

In certain cases that will be described below, Auth0 could need to redirect back to the application’s login screen, using [OIDC Third Party Initiated Login](https://openid.net/specs/openid-connect-core-1_0.html#ThirdPartyInitiatedLogin).

You can configure the url for the tenant or client login screen using a Management API call:

Client-level

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/clients/${account.clientId}",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer API2_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
  ],
  "postData": {
      "initiate_login_uri": "<login_url>"
  }
}
```

Tenant-level:

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/tenants/settings",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer API2_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
  ],
  "postData": {
      "default_redirection_uri": "<login_url>"
  }
}
```

The `login_url` should link to a route in the application that ends up redirecting to Auth0's `/authorize` endpoint, e.g. `http://yoursite.com/login'.


## Scenarios for Redirecting to the Default Login Page

### Users Bookmarking the login page

When an application initiates the login process, it navigates to the `https://${account.namespace}/authorize` page with a set of required parameters. Auth0 then redirects end-users to a `https://${account.namespace}/login` page , with an URL that looks like:

https://${account.namespace}/login?state=g6Fo2SBjNTRyanlVa3ZqeHN4d1htTnh&...

The ‘state’ parameter points to a record in an internal database where we track the status of the authorization transaction. Whenever the transaction completes, or after X time passes, the record is deleted from the internal database.

Sometimes users bookmark the login page, and when they navigate to the bookmarked URL, the transaction record is no longer there and Auth0 can’t continue with the login flow. In that case, Auth0 will read the default login url configured at the client level / tenant level, and redirect to that page. If the default login page is not configured, Auth0 will render an error page.