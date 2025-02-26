---
title: Redirect Users After Logout
description: Learn how to redirect users after logout. 
topics:
  - logout
  - redirect
contentType: how-to
useCase:
  - manage-logout
---

# Redirect Users After Logout

You can redirect users to a specific URL after they logout. You will need to register the redirect URL in your tenant or application settings. Auth0 only redirects to whitelisted URLs after logout. If you need different redirects for each application, you can whitelist the URLs in your application settings.

1. Add a `returnTo` querystring parameter with the target URL as the value. Encode the target URL being passed in. For example, to redirect the user to `http://www.example.com` after logout, make the following request:

   ```text
   https://${account.namespace}/v2/logout?returnTo=http%3A%2F%2Fwww.example.com
   ```

2. Add the non-encoded `returnTo` URL (for these examples, it is `http://www.example.com`) as an **Allowed Logout URLs** in one of two places:

   - **Tenant Settings**: For logout requests that do not include the `client_id` parameter you must add the `returnTo` URL (for example `http://www.example.com`) to the **Allowed Logout URLs** list in the [Advanced tab of your Tenant Settings](${manage_url}/#/tenant/advanced). For example:

     ```text
     https://${account.namespace}/v2/logout?returnTo=http%3A%2F%2Fwww.example.com
     ```

     To add a list of URLs that the user may be redirected to after logging out at the tenant level, go to the [Tenant Settings > Advanced](${manage_url}/#/tenant/advanced) of the Auth0 Dashboard.

     ![Tenant level logout screen](/media/articles/logout/tenant-level-logout.png)

   - **Auth0 Application Settings**: For logout requests that include the `client_id` parameter you must add the `returnTo` URL (for example `http://www.example.com`) to the **Allowed Logout URLs** list in the **Settings** tab of your Auth0 app that is associated with the specified `CLIENT_ID`. For example:

     ```text
     https://${account.namespace}/v2/logout?returnTo=http%3A%2F%2Fwww.example.com&client_id=CLIENT_ID
     ```
    
     To redirect the user after they log out from a specific application, you must add the URL used in the `returnTo` parameter of the redirect URL to the **Allowed Logout URLs** list in the **Settings** tab of your Auth0 application that is associated with the `CLIENT_ID` parameter.

    ![Application level logout screen](/media/articles/logout/client-level-logout.png)

   When providing the URL list, you can:

   * Specify multiple, valid, comma-separated URLs.
   * Use `*` as a [wildcard for subdomains](/applications/reference/wildcard-subdomains) (such as `http://*.example.com`).

::: warning
If the `client_id` parameter is included and the `returnTo` URL is NOT set, the server returns the user to the first Allowed Logout URLs set in the Dashboard.
:::

::: note
In order to avoid validation errors, make sure that you include the protocol part of the URL. For example, setting the value to `*.example.com` will result in a validation error, so you should use `http://*.example.com` instead.
:::

## Limitations

* The validation of URLs provided as values to the `returnTo` parameter, the querystring, and hash information provided as part of the URL are not taken into account.

* The behavior of federated logouts with social providers is inconsistent. Each provider will handle the `returnTo` parameter differently and for some it will not work. Please check your social provider's settings to ensure that they will accept the `returnTo` parameter and how it will behave.

* The URLs provided in the **Allowed Logout URLs** list are case-sensitive, so the URL used for logouts must match the case of the logout URL configured on the dashboard. However, do note that the scheme and host parts are case insensitive. For example, if your URL is `http://www.Example.Com/FooHoo.html`, the `http://www.Example.Com` portion is case insensitive, while the `FooHoo.html` portion is case sensitive.

::: note
If you are working with social identity providers such as Google or Facebook, you must set your `Client ID` and `Secret` for these providers in the [Dashboard](${manage_url}) for the logout to function properly.
:::

## Additional requirements for Facebook

If you are using Facebook, you will also need to encode the `returnTo` parameter. For example:

```text
https://${account.namespace}/v2/logout?federated&
      returnTo=https%3A%2F%2F${account.namespace}%2Flogout%3FreturnTo%3Dhttp%3A%2F%2Fwww.example.com
      &access_token=[facebook access_token]
```

## Keep reading

* [Log Users Out of Auth0](/logout/guides/logout-auth0)
* [Log Users Out of Applications](logout/guides/logout-applications)
* [Log Users Out of Identity Providers](/logout/guides/logout-idps)
* [Log Users Out of SAML Identity Providers](/logout/guides/logout-saml-idps)
* [Log Users Out of Auth0 as the SAML Identity Provider](/protocols/saml/saml-configuration/logout)
