---
section: private-cloud
description: Overview of the Private Cloud onboarding process
topics: private-cloud
contentType: concept
useCase: private-cloud
---
# Managed Private Cloud Onboarding

This article will cover all facets of the **Managed Private Cloud** (both Auth0-hosted and customer-hosted) onboarding process, including timelines, information about future updates, technical requirements, and implementation instructions for key Managed Private Cloud features.

::: note
If you are a Private Cloud customer, please see [Private Cloud Onboarding](/private-cloud/onboarding/private-cloud). 
:::

## Timeline

After your purchase of the Managed Private Cloud, Auth0 will host a **kickoff meeting** with you to begin the implementation process. We strongly recommend that this meeting occur no later than **five (5) days** after the contract signing.

### Auth0-Hosted Managed Private Cloud

Implementation begins immediately after the kickoff meeting, and the process takes **two (2) weeks**. At this point, you're ready for the **Environment Handover**, where your Private Cloud deployment is ready for Production use.

### Customer-Hosted Managed Private Cloud

Implementation begins immediately after the kickoff meeting, and the process takes between **three (3) to four (4) weeks**. The specific amount of time required is highly dependent on the amount of time you need to provision your infrastructure per Auth0 requirements.

At the end of the implementation process, you're ready for the **Environment Handover**. Your Managed Private Cloud deployment is, at this point, ready for Production use.

## Infrastructure

Customers hosting Auth0 using Amazon Web Services should review the [infrastructure requirements](/private-cloud/onboarding/managed-private-cloud/infrastructure), as well as the [IP/Domain and Port List](/private-cloud/onboarding/managed-private-cloud/ip-domain-port-list) required for Private Cloud deployments.

## Updates

Auth0 provides monthly releases to the Managed Private Cloud, of which the four most recent are considered *active*. Updating to an active release is mandatory and ensures that you receive:

* The latest features
* Security fixes and enhancements
* Bug fixes

Auth0 will reach out to you to coordinate the specific dates and times during which updates are applied to your deployment.

The [Private Cloud Release Notes](https://auth0.com/releases/) will contain full details on the changes made to your deployment.

## Custom domains

See [Custom Domains](/custom-domains) for instructions on how to map your tenant domain to a custom domain of your choosing, as well as how to manage the required certificates.

If you are a customer-hosted Managed Private Cloud customer using the legacy custom domains feature, you will need to migrate your custom domains to the Auth0 Custom Domains feature. Please consult Auth0 for additional assistance.

## Tenant logging

Auth0 provides [logs](/logs) that are accessible via the Dashboard of the Management API's [`logs` endpoint](/api/v2#!/Logs/get_logs).

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

To ensure the quality of Auth0's services, the APIs are subject to rate limiting.

## Support

You can reach out to the Auth0 [Support](${env.DOMAIN_URL_SUPPORT}) team with any questions or concerns you might have. To help expedite your request, please provide as much information as possible in the [Support ticket you open](/support/tickets).

## Remote Access Options

The Managed Private Cloud requires regular access by our Managed Services Engineering team to install patches, updates, and upgrades, troubleshoot and fix issues, and optimize security and performance. See [Remote Access Options](/private-cloud/onboarding/managed-private-cloud/remote-access-options) for information on the options available.

## Create Dashboard administrators

To create additional Dashboard administrators, an *existing* administrator must reach out to Auth0 [Support](${env.DOMAIN_URL_SUPPORT}) requesting that an additional administrative account be made. Please include in your request:

* The name(s) of the tenant(s) for which the new administrator should have access
* The email addresses of those to be invited
