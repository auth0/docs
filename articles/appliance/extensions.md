---
url: /appliance/extensions
section: appliance
description: Explains implementation details for Extensions specific to the Auth0 Appliance.
---

# Auth0 Appliance: Extensions

While using [Extensions](/extensions) in the Appliance is very similar to using Extensions in the multi-tenant installation of Auth0, there are some differences.

## Configure Extensions

Extensions make use of Webtasks. When you activate a Webtask in the Appliance, you get a URL specific to that instance of the Webtask service. By default, this URL is structured as follows:

`webtask.<auth0applianceurl>`

:::panel-info Enable Webtasks
To enable Webtasks, go to the [Webtasks Settings page of the Management Dashboard](${manage_url}/#/account/webtasks).
:::

In order for you to configure Extensions, you will need to add this URL to the **Allowed Origins (CORS)** section under the [Auth0 Dashboard's Client Settings page](${manage_url}/#/clients).

![Allowed Origins Section of Client Settings](/media/articles/appliance/allowed-origins.png)

At this point, you can enable any of the available Extensions [in the dashboard](${manage_url}/#/extensions) and use them just as you would if your Auth0 installation were running in the cloud.

## Extensions Unavailable in the Appliance

The following Extensions are unavailable in the Appliance:

* [Delegated Administration](/extensions/delegated-admin)
* [Auth0 Authorization](/extensions/authorization-extension)
