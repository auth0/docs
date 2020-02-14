---
description: Describes how Auth0 cloud environment upgrades affect IP addresses and traffic from Austrailia and Europe.
topics:
  - whitelist
contentType: reference
useCase:
  - customize-connections
---
# Whitelisting Changes

## New IP Addresses for Whitelisting in Australia

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Low | 2017-08-22 |  2017-09-30 |

Auth0 is updating its cloud environments, and traffic from these regions will originate from new IP addresses. If you are whitelisting IP addresses, you will need to add the new addresses to your firewall rules.

### Are you affected?

If you are using a custom database connection, rule, and/or custom email provider that connects to your environment, **and** you have implemented firewall restrictions for IP address ranges, then you are affected by this change. You will need to make sure the following IP addresses are allowed to go through your firewall:

```
13.55.232.24, 13.54.254.182, 13.210.52.131, 52.62.91.160, 52.63.36.78, 52.64.84.177, 52.64.111.197, 52.64.120.184, 54.66.205.24, 54.79.46.4, 54.153.131.0
```

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

## New IP Addresses for Whitelisting in Europe

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Low | 2017-08-22 |  2017-09-30 |

Auth0 is updating its cloud environments, and traffic from these regions will originate from new IP addresses. If you are whitelisting IP addresses, you will need to add the new addresses to your firewall rules.

### Are you affected?

If you are using a custom database connection, rule, and/or custom email provider that connects to your environment, **and** you have implemented firewall restrictions for IP address ranges, then you are affected by this change. You will need to make sure the following IP addresses are allowed to go through your firewall:

```
34.253.4.94, 35.156.51.163, 35.157.221.52, 52.16.193.66, 52.16.224.164, 52.28.45.240, 52.28.56.226, 52.28.184.187, 52.28.212.16, 52.29.176.99, 52.50.106.250, 52.57.230.214, 52.211.56.181, 52.213.216.142, 52.213.38.246, 52.213.74.69
```

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

## CDN provider migration in the Europe and Australia environments

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Low | N/A |  2017-07-12 |

The existing Auth0 CDN service is one of our older services. It was been built and maintained internally since the early days of the company. To improve its scaling and availability, we are changing providers to use Amazon CloudFront on July 12, at 1pm UTC. We have already made this change in the US environment, and are now ready to do so in Europe and Australia.

### Are you affected?

If you use <dfn data-key="lock">Lock</dfn> (hosted by our CDN) in Europe or Australia, yes.

This change shouldn't cause any disruption or change in behavior in your applications, so you don't have to do anything. This notification is for information only.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

## Whitelisting IP Address Ranges (Q1 2017)

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Low | 2017-01-15 |  2017-02-20 |

Auth0 is expanding into new US regions, and traffic originating from these regions will have new IP addresses. If you are whitelisting IP addresses, you will need to add the new addresses to your firewall rules.

### Are you affected?

If you are using a custom database connection, rule, and/or custom email provider that connects to your environment, **and** you have implemented firewall restrictions for IP address ranges, then you are affected by this change. You will need to add the following IP addresses to your firewall rules:

```
138.91.154.99, 54.183.64.135, 54.67.77.38, 54.67.15.170,
54.183.204.205, 54.173.21.107, 54.85.173.28, 35.167.74.121, 35.160.3.103,
35.166.202.113, 52.14.40.253,
52.14.38.78, 52.14.17.114, 52.71.209.77, 34.195.142.251, 52.200.94.42
```

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).
