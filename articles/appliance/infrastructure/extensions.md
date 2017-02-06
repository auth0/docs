---
section: appliance
description: Appliance infrastructure information about enabling Webtasks and Web Extensions
---

# Enable Webtasks and Web Extensions

Beginning with version 8986, the Appliance supports web extensions. This is in addition to support for [Webtasks](appliance/webtasks).

:::panel-info Extensions
Some of the [Extensions](/extensions) available to users of the Auth0 public cloud are unavailable in the Appliance. As such, these do not appear as options in the Appliance's Dashboard.
:::

## Requirements for Updating to Version 8986

Your Development and/or Production environments must meet the following requirements before you can update to version 8986.

* All nodes need outbound access using **Port 443** to:
  * `docker.it.auth0.com` (or `52.9.124.234`)
    * Please note that version 8293 required outbound access to `docker.it.auth0.com` (or `52.9.124.234`) on Port **5000**.
  * `cdn.auth0.com`
* All nodes in the Development cluster (if applicable) should be able to communicate with each other using ports **8721** and **8701**.
* All nodes in the Production cluster should be able to communicate with each other using ports **8721** and **8701**.
* The Production and Development SSL certificates (issued by a **public** certificate authority) have the appropriate Webtask DNS entry. Examples:
  * `webtask.<yourdomain>.com`
  * `webtask-dev.<yourdomain>.com`

## Updating to Version 8986

Once you have met the requirements for updating to version 8986, contact an Auth0 Customer Success Engineer to:

* Configure Webtasks (including switching your sandbox mode to `auth0-sandbox`)
* Perform the upgrade. Auth0 will work with you to upgrade your Development environment first. You will then test the upgrade prior to the upgrade in Production.

## Further Reading

* [IP Address and Port Requirements](/appliance/infrastructure/ip-domain-port-list)
* [Web Extensions](/extensions)
* [Webtasks](appliance/webtasks)
* [Version Change Logs](https://auth0.com/changelog/appliance)
