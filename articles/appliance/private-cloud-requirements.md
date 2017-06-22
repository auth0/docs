---
section: appliance
description: If your subscription agreement includes an Appliance that is hosted in a dedicated area of Auth0's cloud, Auth0 will set up the Appliance on your behalf. This document describes the necessary information.
---
# Information Requirements for Setting Up the Appliance in Auth0's Private Cloud

If your subscription agreement includes an Appliance that is hosted in a dedicated area of Auth0's cloud, Auth0 will set up the Appliance on your behalf. To do so, Auth0 asks that you provide the following information:

* **Preferred AWS region** such as AWS US-West-2, AWS US-East-1, AWS EU-Central-1, etc;
* **Eight (8) DNS names**:
    * Four (4) will be used for the non-Production node, and four (4) will be used for the Production cluster;
    * Each domain name will have 4 parts and end with `auth0.com`;
    * The domain part of the name that is hosted in Auth0's Private Cloud cannot have the same name as any of your other tenants hosted in the multi-tenant cloud.
    ::: warning
    Please finalize DNS names prior to Appliance deployment.
    :::
* **SMTP Settings** (including the hostname, port number, username, and password). Auth0 will work with you to enter your settings. For additional details, please see the [SMTP section of the Appliance infrastructure manual](/appliance/infrastructure/security#smtp);
* **Administrator(s) email address** for App tenant for non-production and Production environments.
* **Custom Domains (optional)**: If you want to use a custom domain with your customer-facing applications, you'll need to manage the DNS and certificate (signed by a public certificate authority) yourself. This means that you'll own and be responsible for the following two pieces of the configuration:

  * Registering the custom domain(s) and uploading the accompanying certificate(s) to the Auth0 Dashboard. You'll also be responsible for keeping your certificates up-to-date;
  * Adding the appropriate entries to your DNS that aliases the Auth0 identity (e.g. `identity.\<yourname\>.com` => `identity.\<yourname\>.auth0.com`)
  ::: note
  Webtask does not currently support your custom domain.
  :::

## Further Reading

* [Custom Domains on the Appliance](/appliance/custom-domains) 
