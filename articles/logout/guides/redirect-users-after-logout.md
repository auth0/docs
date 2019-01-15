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

To redirect a user after logout, add a `returnTo` querystring parameter with the target URL as the value. We suggest that you encode the target URL being passed in. For example, to redirect the user to `http://www.example.com` after logout, you can make the following request:

```text
https://${account.namespace}/v2/logout?returnTo=http%3A%2F%2Fwww.example.com
```

You will need to add the non-encoded `returnTo` URL (for these examples, it is `http://www.example.com`) as an **Allowed Logout URLs** in one of two places:

* For logout requests that do not include the `client_id` parameter, such as:

    ```text
    https://${account.namespace}/v2/logout?returnTo=http%3A%2F%2Fwww.example.com
    ```

  you must add the `returnTo` URL (for example `http://www.example.com`) to the **Allowed Logout URLs** list in the [Advanced tab of your Tenant Settings](${manage_url}/#/tenant/advanced). See [Set the Allowed Logout URLs at the Tenant Level](#set-the-allowed-logout-urls-at-the-tenant-level) for more information.

* For logout requests that include the `client_id` parameter, such as:

    ```text
    https://${account.namespace}/v2/logout?returnTo=http%3A%2F%2Fwww.example.com&client_id=CLIENT_ID
    ```

  you must add the `returnTo` URL (for example `http://www.example.com`) to the **Allowed Logout URLs** list in the **Settings** tab of your Auth0 app that is associated with the specified `CLIENT_ID`. See [Set the Allowed Logout URLs at the Application Level](#set-the-allowed-logout-urls-at-the-application-level) for more information.

## Set the Allowed Logout URLs at the tenant level

To add a list of URLs that the user may be redirected to after logging out at the tenant level, go to the [Tenant Settings > Advanced](${manage_url}/#/tenant/advanced) of the Auth0 Dashboard.

![Tenant level logout screen](/media/articles/logout/tenant-level-logout.png)

When providing the URL list, you can:

* Specify multiple, valid, comma-separated URLs
* Use `*` as a wildcard for subdomains (such as `http://*.example.com`)

## Set the Allowed Logout URLs at the application level

To redirect the user after they log out from a specific application, you must add the URL used in the `returnTo` parameter of the redirect URL to the **Allowed Logout URLs** list in the **Settings** tab of your Auth0 application that is associated with the `CLIENT_ID` parameter.

![Application level logout screen](/media/articles/logout/client-level-logout.png)

When providing the URL list, you can:

* Specify multiple, valid, comma-separated URLs
* Use `*` as a wildcard for subdomains (such as `http://*.example.com`)

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

If you are using Facebook, please be aware of the additional requirements when triggering a logout.

You will also need to encode the `returnTo` parameter.

```text
https://${account.namespace}/v2/logout?federated&
      returnTo=https%3A%2F%2F${account.namespace}%2Flogout%3FreturnTo%3Dhttp%3A%2F%2Fwww.example.com
      &access_token=[facebook access_token]
```

## Keep reading

