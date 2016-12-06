---
url: /appliance/extensions
section: appliance
description: Explains implementation details for Extensions specific to the Auth0 Appliance.
---

# Auth0 Appliance: Extensions

In most ways the usage of Extensions in the appliance is the same as in the cloud. This page explains the differences.

## How to Configure Extensions

Extensions make use webtasks, when you activate a webtask in the appliance you get an url for the webtask service. By default this url structured: webtask.<auth0applianceurl>. To be able to configure extensions, you will need to specifically add the webtask DNS to the **Allowed Origins (CORS)** section under the Client Settings.

![Allowed Origins Section of Client Settings](/media/articles/appliance/allowed-origins.png)

Then you can enable the available extensions [in the dashboard](${manage_url}/#/extensions) and use them as you would in the cloud.

[See the Extensions docs](/extensions) to learn more about the extensions.

## Available Extensions in Appliance

The **Delegated Administration Extension** and **Authorization Extension** are **not** available in the appliance. The other extensions are available to use as you would in the cloud.
