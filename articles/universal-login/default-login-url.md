---
title: Tenant's and Application’s Default Login Route
description: How to configure your tenant's and application's default login route.
toc: true
topics:
  - applications
contentType: how-to
---
# Configure Default Login Routes

In certain cases (described below), Auth0 could need to redirect back to the application's login initiation endpoint, using [OIDC Third Party Initiated Login](https://openid.net/specs/openid-connect-core-1_0.html#ThirdPartyInitiatedLogin).

You can configure these URIs in [Application Settings](/dashboard/reference/settings-application) or [Tenant Advanced Settings](/dashboard/reference/settings-tenant).

You can also do this using the Management API:

**Application level**

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
      "mimeType": "application/json",
      "text": "{\"initiate_login_uri\": \"<login_url>\"}"
  }
}
```

**Tenant level**

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
      "mimeType": "application/json",
      "text": "{\"default_redirection_uri\": \"<login_url>\"}"
  }
}
```

The `login_url` should point to a route in the application that ends up redirecting to Auth0's `/authorize` endpoint, e.g. `https://mycompany.org/login`. Note that it requires `https` and it cannot point to `localhost`.

## Scenarios for redirecting to the default login route

### Users bookmarking the login page

When an application initiates the login process, it navigates to `https://${account.namespace}/authorize` with a set of [required parameters](/api/authentication#login). Auth0 then redirects end-users to a `https://${account.namespace}/login` page, with a URL that looks like:

`https://${account.namespace}/login?state=g6Fo2SBjNTRyanlVa3ZqeHN4d1htTnh&...`

The `state` parameter points to a record in an internal database where we track the status of the authorization transaction. Whenever the transaction completes, or after X time passes, the record is deleted from the internal database.

Sometimes users bookmark the login page, and when they navigate to the bookmarked `/login` URL, the transaction record is no longer there and Auth0 cannot continue with the login flow. In that case, Auth0 will redirect to the default client URL if configured, or the tenant level URL if not. If no default login URL is set, Auth0 will render an error page.

### Completing the password reset flow

When the password reset flow is completed and the default URI for the application or tenant is configured, users will see a button that will let them navigate back to the login page.

This behavior only happens when the [New Universal Login Experience](/universal-login/new) is enabled. In Classic mode, you will need to [configure the Redirect URL in the Password Reset Email Template](/email/templates#configuring-the-redirect-to-url).

### Completing the email verification flow

As part of the signup process, users get an email to verify their email address. If they click on the link, they will land on a page that says that the email was verified, with a button to go back to the application. When clicked, users will be redirected to the login page, and if they already have a valid session, they'll end up being redirected to the application.

This behavior only happens when the [New Universal Login Experience](/universal-login/new) is enabled. In Classic mode, you will need to [configure the Redirect URL in the Verification Email Template](/email/templates#configuring-the-redirect-to-url).
