---
section: appliance
description: PSaaS Appliance infrastructure information about enabling Webtasks and Extensions
topics:
    - appliance
    - infrastructure
    - extensions
contentType: 
    - Reference
useCase: appliance
applianceId: appliance32
sitemap: false
---
# Enable Webtasks, Extensions, and User Search

The PSaaS Appliance supports:

* Extensions
* [Webtasks](appliance/webtasks)
* User search using Elasticsearch

## Extensions

You can find a list of extensions available to you [on the Dashboard]({$manage_url}/#/extensions).

Some of the [Extensions available to users of the Auth0 public cloud](/extensions) are unavailable in the PSaaS Appliance. As such, these do not appear as options in the PSaaS Appliance's Dashboard.

## Webtasks Requirements 

Your Development and Production environments must meet the following requirements before you can enable Webtasks:

* All nodes in the cluster have outbound access using **Port 443** to:
  * `docker.it.auth0.com` (or `52.9.124.234`)
  * `cdn.auth0.com`
* All nodes can communicate with other nodes in the same cluster using ports **8721** and **8701**.
* All [SSL certificates](/appliance/infrastructure/security#ssl-certificates) have the appropriate Webtask DNS entry. Examples:
  * `webtask.<yourdomain>.com`
  * `webtask-dev.<yourdomain>.com`

## Enable Webtasks

Once you have met the requirements for enabling Webtasks, submit a Support ticket to request that Auth0 configure Webtasks on your behalf.

## Dedicated Domains

You may configure Webtasks on a [dedicated domain](/appliance/webtasks/dedicated-domains). Using dedicated domains enables you to safely use extensions in multi-tenant environments (the behavior is akin to that of the Auth0 Public Cloud Service).

If you are planning on using Extensions, you **must** implement Webtask dedicated domains.

## User search

The PSaaS Appliance supports User Search using Elasticsearch. This allows you to use extensions that require user search functionality, including the [Delegated Administration extension](/extensions/delegated-admin).

### Requirements for enabling user search

To enable User Search, you must increase the amount of storage available in your Development and Production environments.

* If you have a *single non-Production/Development node*, you need an additional **50 GB** drive;
* If you have a *three-node Production cluster*, you need an extra **100 GB** drive on *each* of your three Virtual Machines;
* If you have a *Geographic High-Availability implementation*, you need an additional **100 GB** drive on *each* of your data nodes in the primary and secondary data centers.

For all other configuration types, please consult with your Customer Success Engineer.

## Enabling User Search

Once you have added the additional drive(s), submit a Support ticket to request that Auth0 enable User Search.

## Keep reading

::: next-steps
* [IP Address and Port Requirements](/appliance/infrastructure/ip-domain-port-list)
* [Extensions](/extensions)
* [Delegated Administration extension](/extensions/delegated-admin)
* [Webtasks](/appliance/webtasks)
* [Version Change Logs](https://auth0.com/changelog/appliance)
:::