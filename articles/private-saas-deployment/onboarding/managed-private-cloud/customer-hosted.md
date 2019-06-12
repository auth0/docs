---
section: private-saas-deployment
description: Overview of the Customer-hosted Managed Private Cloud onboarding process
topics: private-cloud
contentType: concept
useCase: private-saas-deployment
---
# Onboarding

This article will cover all facets of the **Customer-hosted Managed Private Cloud** onboarding process, including timelines, information about future updates, technical requirements, and implementation instructions for key Managed Private Cloud features.

## Timeline

After your purchase of the Managed Private Cloud, Auth0 will host a **kickoff meeting** with you to begin the implementation process. We strongly recommend that this meeting occur no later than **five (5) days** after the contract signing.

Implementation begins immediately after the kickoff meeting, and the process takes between **three (3) to four (4) weeks**. The specific amount of time required is highly depending on the amount of time you need to provision your infrastructure per Auth0 requirements.

At the end of the implementation process, you're ready for the **Environment Handover**. Your Managed Private Cloud deployment is, at this point, ready for Production use.

## Infrastructure

Please see the [PSaaS Infrastructure Guide](/appliance/infrastructure) for information on the infrastructure requirements for implementation.

## Updates

Auth0 will issue monthly updates to the Managed Private Cloud, but the specific time during which the update is applied will be coordinated with you. 

Auth0 provides monthly releases to the Managed Private Cloud, of which the four most recent are considered *active*. Updating to an active release is mandatory and ensures that you receive:

* The latest features
* Security fixes and enhancements
* Bug fixes

Auth0 will reach out to you to coordinate the specific dates and times during which updates are applied to your deployment.

The [Private Cloud Release Notes](https://auth0.com/releases/) will contain full details on the changes made to your deployment.

## Custom domains

See [Custom Domains](/custom-domains) for instructions on how to map your tenant domain to a custom domain of your choosing, as well as how to manage the required certificates.

## SSL Certificates and SMTP

When using the Managed Private Cloud, you will need to provide several SSL certificates. You must create and install a unique SSL certificate for:

* Each Private Cloud (e.g., your development environment, your production environment)
* Extensions
* Custom Domains
* Webtasks (with or without Dedicated Domains)
  
The SSL Certificate:

* must be created by a public certificate authority. They cannot be self-signed;
* can be a wildcard or a multi-domain (SAN) certificate;
* must contain all required DNS/domain names, including those for the:
  * Management Dashboard;
  * Configuration Tenant;
  * Webtask;
  * App Tenant(s) (current and future) specific to that particular Private Cloud

Auth0 accepts the PFX/PKCS12 certificate format. If you are using the CER/PEM formats, please convert to the PFC format.

The PFX certificate must contain the full chain (all intermediate certificates must be included in the public key).

### SMTP

You must configure an SMTP server for the Managed Private Cloud to send emails. The Managed Private Cloud requires an authentication SMTP server that has been configured with SMTP PLAIN authentication.

AWS SES Users: If your domain is not validated, you will not be able to send email with AWS SES.

Optionally, you may use a Transactional Email Provider (such as SendGrid, Amazon SES, Mandrill).

The Managed Private Cloud supports STARTTLS, but it is not required.

## Tenant logging

Auth0 provides [logs] that are accessible via the Dashboard of the Management API's [`logs` endpoint](/api/v2#!/Logs/get_logs).

You can also choose to send the data logged by Auth0 to an external service. To help with this, there are Auth0 extensions that support automatic log export to services like Sumo Logic or Loggly. The following is a list of Auth0 log export extensions currently available:

* [Auth0 Logs to Application Insights](/extensions/application-insight)
* [Auth0 Logs to Azure Blob Storage](/extensions/azure-blob-storage)
* [Auth0 Logs to Loggly](/extensions/loggly)
* [Auth0 Logs to Papertrail](/extensions/papertrail)
* [Auth0 Logs to Sumo Logic](/extensions/sumologic)
* [Auth0 Logs to Splunk](/extensions/splunk)
* [Auth0 Logs to Logstash](/extensions/logstash)
* [Auth0 Logs to Mixpanel](/extensions/mixpanel)
* [Auth0 Logs to Logentries](/extensions/logentries)

## Rate limits

To ensure the quality of Auth0's services, the APIs are subject to [rate limiting](/policies/rate-limits).

## Support

You can reach out to the Auth0 [Support](${env.DOMAIN_URL_SUPPORT}) team with any questions or concerns you might have. To help expedite your request, please provide as much information as possible in the [Support ticket you open](/support/tickets).

## Create Dashboard administrators

To create additional Dashboard administrators, an *existing* administrator must reach out to Auth0 [Support](${env.DOMAIN_URL_SUPPORT}) requesting that an additional administrative account be made. Please include in your request:

* The name(s) of the tenant(s) for which the new administrator should have access
* The email addresses of those to be invited