---
section: appliance
description: PSaaS Appliance infrastructure information about security
topics:
    - appliance
    - infrastructure
    - security
contentType: reference
useCase: appliance
applianceId: appliance40
sitemap: false
---

# PSaaS Appliance Infrastructure Requirements: Security and Access

 This document details the security and access requirements for your PSaaS Appliance instances.

 ## SSL Certificates

When using the PSaaS Appliance, you will need to provide several SSL certificates. You must create and install a unique SSL certificate for:

* Each PSaaS Appliance (e.g., your production cluster, your development node, your QA environment)
* [Extensions](/appliance/extensions)
* [Custom Domains](/appliance/custom-domains)
* [Webtasks](/appliance/webtasks) (with or without [Dedicated Domains](/appliance/webtasks/dedicated-domains))

 ::: note
   If you are unsure of where to get SSL Certificates, please contact your network security team. They are usually the ones familiar with the required processes and working with the appropriate certificate authorities (CA) to generate new certificates.
 :::

The SSL Certificate:

* must be created by a public certificate authority. They cannot be self-signed;
* can be a wildcard *or* a multi-domain (SAN) certificate;
* must contain all required DNS/domain names, including those for the:
    * Management Dashboard;
    * Configuration Tenant;
    * webtask;
    * App Tenant(s) (current *and* future) specific to that particular PSaaS Appliance instance.

Auth0 accepts the following certificate format:

* PFX/PKCS12

If you are using CER / PEM format, you should [convert to PFX format](http://stackoverflow.com/questions/2957742/how-to-convert-pkcs8-formatted-pem-private-key-to-the-traditional-format).

::: note
  The PFX certificate must contain the full chain (all intermediate certificates must be included in the public key).
:::

```text
-----BEGIN CERTIFICATE-----
MY-PUBLIC-KEY
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
PARENT
-----END CERTIFICATE-----
```

If you're uploading the public and private keys separately, convert the private key to RSA as follows:

```text
-----BEGIN RSA PRIVATE KEY-----
PRIVATE-KEY
-----END RSA PRIVATE KEY-----
```

## Transparent Proxies

If you are behind a transparent proxy, you will need to:

* obtain certificate(s) for your proxy created by a public certificate authority.
* add an exception so that the PSaaS Appliance instance(s) may get through the proxy unauthenticated.

## HTTPS or TLS

Users must connect to the PSaaS Appliance using secure protocols (HTTPS or TLS). Depending on your network design, you could terminate the Secure Channel at the load balancer or the PSaaS Appliance. In both cases, your SSL/TLS certificate must be locally installed on the PSaaS Appliance.

## SMTP

You must configure an SMTP server for the PSaaS Appliance to send emails. The PSaaS Appliance requires an authentication SMTP server that has been configured with SMTP PLAIN authentication.

**AWS SES Users**: If your domain is not validated, you will not be able to send email with AWS SES.

Optionally, you may use a Transactional Email Provider (such as SendGrid, Amazon SES, Mandrill).

The PSaaS Appliance supports STARTTLS, but it is not required.

## Auth0 Remote Access

Auth0 requires [remote access](/appliance/remote-access-options) to your PSaaS Appliance instances to perform updates, maintenance, or troubleshooting.

### Initial Configuration

Auth0's remote access method for initial configuration requires SSH access via Jumphost. After the initial setup, please feel free to disable this connection. 

### Updates, Maintenance, and Troubleshooting

Typically, updates are performed via the Auth0 Dashboard. If Auth0 needs to remote in to identify and troubleshoot issues, an Auth0 Customer Success Engineer will need access to the PSaaS Appliance through SSH access via Jumphost. This connection can be enabled for and disabled after the agreed-upon time frames for work.
