---
section: private-cloud
description: Learn about the onboarding process for Managed Private Cloud services
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

Implementation begins immediately after the kickoff meeting, and the process takes **two (2) weeks**. At the end of this process, you're ready for the **Environment Handover**, where your Private Cloud deployment is ready for Production use.

### Customer-Hosted Managed Private Cloud

Immediately after the kickoff meeting, we begin the implementation process, which takes between **three (3) to four (4) weeks**. The specific amount of time required depends highly on the amount of time you need to provision your infrastructure per Auth0 requirements.

At the end of this process, you're ready for the **Environment Handover**. Your Managed Private Cloud deployment is, at this point, ready for Production use.

## Infrastructure

Customers hosting Auth0 using Amazon Web Services should review the [infrastructure requirements](/private-cloud/onboarding/managed-private-cloud/infrastructure), as well as the [IP/Domain and Port List](/private-cloud/onboarding/managed-private-cloud/ip-domain-port-list) required for Private Cloud deployments.

## Updates

Auth0 provides monthly releases to the Managed Private Cloud; of these, the four most recent are considered active. Updating to an active release is mandatory and ensures that you receive:

* the latest features
* security fixes and enhancements
* bug fixes

We will reach out to you to coordinate the specific dates and times during which we will apply updates will to your deployment.

The [Private Cloud Release Notes](https://auth0.com/releases/) will contain full details about the changes made to your deployment.

## Custom domains

To learn how to map your tenant domain to a custom domain of your choosing, see [Custom Domains](/custom-domains). You can also learn how to manage the required certificates.

If you are a customer-hosted Managed Private Cloud customer using the legacy custom domains feature, you will need to migrate your custom domains to the Auth0 Custom Domains feature. Please consult Auth0 for additional assistance.

## Tenant logging

Auth0 provides [logs](/logs) that are accessible via the Dashboard or the Management API's [`logs` endpoint](/api/v2#!/Logs/get_logs).

You can also send data logged by Auth0 to an external service. To help with this, Auth0 provides extensions that support automatic log export to services like Sumo Logic or Loggly. These currently include:

* [Auth0 Logs to Application Insights](/extensions/application-insight)
* [Auth0 Logs to Azure Blob Storage](/extensions/azure-blob-storage)
* [Auth0 Logs to Loggly](/extensions/loggly)
* [Auth0 Logs to Logentries](/extensions/logentries)
* [Auth0 Logs to Logstash](/extensions/logstash)
* [Auth0 Logs to Mixpanel](/extensions/mixpanel)
* [Auth0 Logs to Papertrail](/extensions/papertrail)
* [Auth0 Logs to Splunk](/extensions/splunk)
* [Auth0 Logs to Sumo Logic](/extensions/sumologic)

## Rate limits

To ensure the quality of Auth0's services, Auth0 APIs are subject to rate limiting.

## Support

If you have any questions or concerns, please reach out to the [Auth0 Support team](${env.DOMAIN_URL_SUPPORT}). To help expedite your request, please provide as much information as possible when you [open a Support ticket](/support/tickets).

## Remote Access Options

Managed Private Cloud requires regular access by our Managed Services Engineering team to install patches, updates, and upgrades; troubleshoot and fix issues; and optimize security and performance. To learn about the available options, see [Remote Access Options](/private-cloud/onboarding/managed-private-cloud/remote-access-options).

## Create Dashboard administrators

To create additional Dashboard administrators, an existing administrator must submit a request to [Auth0 Support](${env.DOMAIN_URL_SUPPORT}). Please include:

* name(s) of the tenant(s) for which the new administrator should have access
* email addresses of administrators to be invited
