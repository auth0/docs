---
section: appliance
description: Appliance infrastructure information about enabling Webtasks and Web Extensions
---

# Enable Webtasks, Web Extensions, and User Search

Beginning with version 10755, the Appliance supports User search (using our improved user search capabilites, Elastic search). This will allow you to use the [Delegated Admininstration extension](/extensions/delegated-admin) and other extensions that require User Search.

Beginning with version 8986, the Appliance supports web extensions. This is in addition to support for [Webtasks](appliance/webtasks).

:::panel-info Extensions
Some of the [Extensions](/extensions) available to users of the Auth0 public cloud are unavailable in the Appliance. As such, these do not appear as options in the Appliance's Dashboard.
:::

## Requirements for Enabling User Search

Your Development and/or Production environments must meet the following requirements before you can enable User search.

* If you have a single non-production/development node, you need to add an additional drive: 50 GB for User Search
* If you have a 3-node PROD cluster, you need to add an additional drive on all 3 VMs: 100 GB for User Search
* If you have another configuration, please consult with your Customer Success Engineer.

## Enabling User Search

Once you have added the additional drive(s), submit a Support ticket to request the following:

* Enable User search
* Perform the update to version 10755 or above. Auth0 will work with you to upgrade your Development environment first, so that you can test the changes. Afterwards, Auth0 will coordinate the Production upgrade.

## Requirements for Enabling Webtasks

Your Development and/or Production environments must meet the following requirements before you can enable Webtasks and update to version 8986 or above.

* All nodes in the cluster need outbound access using **Port 443** to:
  * `docker.it.auth0.com` (or `52.9.124.234`)
    * Please note that version 8293 required outbound access to `docker.it.auth0.com` (or `52.9.124.234`) on Port **5000**.
  * `cdn.auth0.com`
* All nodes should be able to communicate with other nodes in the same cluster using ports **8721** and **8701**.
* The SSL certificates (issued by a **public** certificate authority) have the appropriate Webtask DNS entry. Examples:
  * `webtask.<yourdomain>.com`
  * `webtask-dev.<yourdomain>.com`

## Enabling Webtasks

Once you have met the requirements for enabling Webtasks, submit a Support ticket to request the following:

* Configure Webtasks (including switching your sandbox mode to `auth0-sandbox`)
* Perform the upgrade. Auth0 will work with you to upgrade your Development environment first, so that you can test the changes. Afterwards, Auth0 will coordinate the Production upgrade.

## Further Reading

* [IP Address and Port Requirements](/appliance/infrastructure/ip-domain-port-list)
* [Web Extensions](/extensions)
* [Delegated Admininstration extension](/extensions/delegated-admin)
* [Webtasks](appliance/webtasks)
* [Version Change Logs](https://auth0.com/changelog/appliance)
