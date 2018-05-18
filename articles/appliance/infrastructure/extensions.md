---
section: appliance
description: PSaaS Appliance infrastructure information about enabling Webtasks and Extensions
tags:
    - appliance
    - infrastructure
    - extensions
---
# Enable Webtasks, Extensions, and User Search

Beginning with version `8986`, the PSaaS Appliance supports extensions. This is in addition to support for [Webtasks](appliance/webtasks).

::: note
Some of the [Extensions](/extensions) available to users of the Auth0 public cloud are unavailable in the PSaaS Appliance. As such, these do not appear as options in the PSaaS Appliance's Dashboard.
:::

Beginning with version `10755`, the PSaaS Appliance supports User Search using Elasticsearch. This allows you to use extensions that require User Search, including the [Delegated Admininstration extension](/extensions/delegated-admin)

## Requirements for Enabling User Search

To enable User Search, you must increase the amount of storage available in your Development and Production environments.

* If you have a *single non-Production/Development node*, you need an additional **50 GB** drive;
* If you have a *three-node Production cluster*, you need an additional **100 GB** drive on *each* of your three Virtual Machines;
* If you have a *Geographic High-Availability implementation*, you need an additional **100 GB** drive on *each* of your data nodes in the primary and secondary data centers.

For all other configuration types, please consult with your Customer Success Engineer.

## Enabling User Search

Once you have added the additional drive(s), submit a Support ticket to request that Auth0:

* Enable User Search;
* Update your PSaaS Appliance to version `10755` or above. Auth0 will work with you to upgrade your Development environment first, so that you can test the changes. Auth0 will coordinate the Production upgrade after you've concluded testing in Development.

## Requirements for Enabling Webtasks

Your Development and/or Production environments must meet the following requirements before you can enable Webtasks and update to version `8986` or above.

* All nodes in the cluster have outbound access using **Port 443** to:
  * `docker.it.auth0.com` (or `52.9.124.234`)
    * Please note that version 8293 required outbound access to `docker.it.auth0.com` (or `52.9.124.234`) on Port **5000**.
  * `cdn.auth0.com`
* All nodes are able to communicate with other nodes in the same cluster using ports **8721** and **8701**.
* All [SSL certificates](/appliance/infrastructure/security#ssl-certificates) have the appropriate Webtask DNS entry. Examples:
  * `webtask.<yourdomain>.com`
  * `webtask-dev.<yourdomain>.com`

## Enabling Webtasks

Once you have met the requirements for enabling Webtasks, submit a Support ticket to request that Auth0:

* Configure Webtasks (including switching your sandbox mode to `auth0-sandbox`)
* Update your PSaaS Appliance to version `8986`. Auth0 will work with you to upgrade your Development environment first, so that you can test the changes. Afterwards, Auth0 will coordinate the Production upgrade.

## Dedicated Domains

Beginning with PSaaS Appliance version `13451`, you may now configure Webtask on a [dedicated domain](/appliance/webtasks/dedicated-domains). This enables you to safely use extensions in multi-tenant environments (the behavior is akin to that of the Auth0 Public Cloud Service).

## Keep reading

::: next-steps
* [IP Address and Port Requirements](/appliance/infrastructure/ip-domain-port-list)
* [Extensions](/extensions)
* [Delegated Admininstration extension](/extensions/delegated-admin)
* [Webtasks](/appliance/webtasks)
* [Version Change Logs](https://auth0.com/changelog/appliance)
:::
