---
section: private-cloud
description: Operations - Certificates expiration and renewal process
topics: private-cloud
contentType: concept
useCase: private-cloud
---
# Private Cloud Certificate Expiration and Renewal Process

You will typically receive certificate expiration notifications 30 days prior to expiry, 14 days prior to expiry and 1 days prior to expiry.

Certificates in the format `*.auth0.com` are the responsibility of Auth0 to both obtain and apply. 

Certificates relating to custom domains (in the format `*.auth.<CustomerName>.com`) are your responsibility to obtain. You should create a support ticket via the [Support Center](${env.DOMAIN_URL_SUPPORT}) to apply the new certificate to the environment. A maintenance window will be  confirmed with Auth0. After the certificate update is complete, your Auth0 managed support engineer will inform you. 

## Keep reading

* [Private Cloud Upgrades](/private-cloud/operations-upgrades)
* [Private Cloud Testing](/private-cloud/operations-testing)
* [Open and Manage Support Tickets](/support/tickets)
