---
url: /private-saas/extensions
section: private-saas
description: Explains implementation details for Extensions specific to the Auth0 private-saas.
---

# Auth0 private-saas: Extensions

While using [Extensions](/extensions) in the private-saas is very similar to using Extensions in the multi-tenant installation of Auth0, there are some differences.

## Configure Extensions

Extensions make use of Webtasks. When you activate a Webtask in the private-saas, you get a URL specific to that instance of the Webtask service. By default, this URL is structured as follows:

`webtask.<auth0privatesaaseurl>`

:::panel-info Enable Webtasks
To enable Webtasks, go to the [Webtasks Settings page of the Management Dashboard](${manage_url}/#/account/webtasks).
:::

In order for you to configure Extensions, you will need to add this URL to the **Allowed Origins (CORS)** section under the [Auth0 Dashboard's Client Settings page](${manage_url}/#/clients).

![Allowed Origins Section of Client Settings](/media/articles/private-saas/allowed-origins.png)

At this point, you can enable any of the available Extensions [in the dashboard](${manage_url}/#/extensions) and use them just as you would if your Auth0 installation were running in the cloud.

## Delegated Administration Extension

The [Delegated Administration](/extensions/delegated-admin) extension is available beginning with version 10755 if you've enabled User Search.
