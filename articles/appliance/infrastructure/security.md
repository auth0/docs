---
section: appliance
---

# Auth0 Appliance Infrastructure Requirements: Security and Access

 This document details the security and access requirements for your Appliance instances.

 ## SSL Certificates

 Each Auth0 Appliance (e.g. your production cluster Appliance instance(s) and your development/test node Appliance instance) requires a unique SSL certificate to be created and installed.

 > If you are unsure of where to get SSL Certificates, please contact your network security team. They are usually the ones familiar with the required processes and working with the appropriate certificate authorities (CA) to generate new certificates.

The SSL Certificate:

* may be a wildcard *or* a multi-domain (SAN) certificate;
* must contain all required DNS/domain names, including those for the:
    * Management Dashboard;
    * Configuration Tenant;
    * App Tenant(s) (current *and* future) specific to that particular Appliance instance.

Auth0 accepts the following certificate formats:

* PFX/PKCS12;
* CER/PEM (RSA Private Key).

If you are using **PEM**, please ensure that:
* there is no password on the private key;
* the key is an RSA Private Key.

**Note**: All intermediate certificates must be included in the public key.

```text
-----BEGIN CERTIFICATE-----
MY-PUBLIC-KEY
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
PARENT
-----END CERTIFICATE-----
```

## Transparent Proxies

If you are behind a transparent proxy, you will need to:

* obtain certificate(s) for your proxy;
* add an exception so that the Appliance instance(s) may get through the proxy unauthenticated.

## HTTPS

Please ensure that your network is configured such that the Auth0 Appliance exposes HTTPS to end users only.

## SMTP

You must configure an SMTP server in order for the Auth0 Appliance to send emails. The Auth0 Appliance requires an authentication SMTP server that has been configured with SMTP PLAIN authentication.

**AWS SES Users**: If your domain is not validated, you will not be able to send email with AWS SES.

Optionally, you may use a Transactional Email Provider (e.g. SendGrid, Amazon SES, Mandrill).

The Appliance supports STARTTLS, but it is not required.

## Auth0 Remote Access

Auth0 may require remote access to your Appliance instances to perform updates, maintenance, or troubleshooting.

### Initial Configuration

Auth0's remote access method for initial configuration requires SSH access via Jumphost (the preferred method) or via VPN.

After the initial configuration, please feel free to disable this connection. If these requirements are not feasible given your infrastructure, please contact your Auth0 Customer Success Engineer or Pre-Sales Engineer to determine an alternate solution.

### Updates, Maintenance, and Troubleshooting

Typically, updates are performed via the Auth0 Dashboard. In the event that Auth0 needs to remote in to identify and troubleshoot issues, an Auth0 Customer Success Engineer will need access to the Appliance through SSH access via Jumphost (the preferred method) or over VPN.

This connection may be enabled for and disabled after the agreed-upon time frames for work. If these requirements are not feasible given your infrastructure, please contact your Auth0 Customer Success Engineer or Pre-Sales Engineer to determine an alternate solution.

### Around-the-Clock Accessibility for Custom SLAs

Auth0's remote access method requires SSH access via Jumphost (the preferred method) or via VPN. For those customers requesting a Custom SLA tied to the Appliance, remote access must be granted through this method 24 hours per day, 7 days per week. If these requirements are not feasible given your infrastructure, please contact your Auth0 Customer Success Engineer or Pre-Sales Engineer to determine an alternate solution.
