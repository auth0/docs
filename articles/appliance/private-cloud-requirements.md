---
section: appliance
description: >
  If you have decided to purchase an Appliance that is hosted in a dedicated area of Auth0's cloud, Auth0 will set up the Appliance on your behalf. This document describes the necessary information.
---

# Information Requirements for Setting Up the Appliance in Auth0's Private Cloud

If you have decided to purchase an Appliance that is hosted in a dedicated area of Auth0's cloud, Auth0 will set up the Appliance on your behalf. To do so, Auth0 asks that you provide the following information:

* **Preferred AWS region** such as AWS US-West-2, AWS US-East-1, AWS EU-Central-1, etc;
* **Eight (8) DNS names**:
    * Four (4) will be used for the non-Production node, and four (4) will be used for the Production cluster;
    * Domain names will have 4 parts and will end in auth0.com;
    * **Important**: Please finalize DNS names prior to Appliance deployment.
* **SMTP Settings** (including the hostname, port number, username, and password). Auth0 will work with you to enter your settings. For additional details, please see the [SMTP section of the Appliance infrastructure manual](/appliance/infrastructure/security#smtp);
* **Administrator(s) email address** for App tenant for non-production and Production environments.
* **Custom Domain (optional)**: If you want your customer-facing applications to use your custom domain (rather than a domain ending in auth0.com), you will need to manage the DNS and certificate for that specific domain. The certificate must be signed by a public Certificate Authority. In this case, you would own two pieces of configuration:
    * Using the Auth0 Dashboard you will have to register the custom domain name(s) and upload the certificate(s) associated with that specific domain. You will also be in charge of updating this certificate(s).
    * You will have to add DNS entries on your own DNS that alias (CNAME) our domain identity.\<yourname\>.com => identity.\<yourname\>.auth0.com

## Further Reading

* [DNS](/appliance/infrastructure/dns)
* [DNS Records](/appliance/infrastructure/network#dns-records)
* [Custom Domains on the Appliance](/appliance/custom-domains) 
