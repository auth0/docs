---
url: /appliance/extensions
section: appliance
description: Explains implementation details for Extensions specific to the PSaaS Appliance.
tags:
    - appliance
    - extensions
---

# PSaaS Appliance: Extensions

While using [Extensions](/extensions) in the PSaaS Appliance is very similar to using Extensions in the multi-tenant installation of Auth0, there are some differences.

## Configure Extensions

Extensions make use of Webtasks. When you activate a Webtask in the PSaaS Appliance, you get a URL specific to that instance of the Webtask service. By default, this URL is structured as follows:

`webtask.<auth0applianceurl>`

::: note
To enable Webtasks, go to the [Webtasks Settings page of the Management Dashboard](${manage_url}/#/account/webtasks).

See [Enable Webtasks, Web Extensions, and User Search](/appliance/infrastructure/extensions) for additional information.
:::

In order for you to configure Extensions, you will need to add this URL to the **Allowed Origins (CORS)** section under the [Auth0 Dashboard's Application Settings page](${manage_url}/#/applications).

![Allowed Origins Section of Application Settings](/media/articles/appliance/allowed-origins.png)

At this point, you can enable any of the available Extensions [in the dashboard](${manage_url}/#/extensions) and use them just as you would if your Auth0 installation were running in the cloud.

## Delegated Administration Extension

The [Delegated Administration](/extensions/delegated-admin) extension is available beginning with version 10755 when User search is enabled.

## Dedicated Domains

Beginning with PSaaS Appliance version `13451`, you may now configure Webtask on a [dedicated domain](/appliance/webtasks/dedicated-domains). This enables you to safely use extensions in multi-tenant environments (the behavior is akin to that of the Auth0 Public Cloud Service).