# Auth0 Appliance Infrastructure Requirements: Security and Access

 The following are the security and access requirements for your Appliance instances.

 ## SSL Certificates

 Each Auth0 Appliance (e.g. your production cluster Appliance(s) and your development/test node Appliance) requires a unique SSL certificate to be created and installed.

 > If you are unsure of where to get SSL Certificates, please contact your network security team. They are usually the ones familiar with the required processes and working the appropriate certificate authorities (CA) to generate new certificates.

The SSL Certificate:

* may be a wildcard *or* a multi-domain (SAN) certificate;
* must contain all required DNS/domain names, including those for the:
    * Management Dashboard;
    * Configuration Tenant;
    * App Tenant(s) (current *and* future) specific to that particular Appliance instance.

Auth0 accepts the following certificate formats:
