---
section: private-cloud
description: Overview of the Private Cloud onboarding process
topics: private-cloud
contentType: concept
useCase: private-cloud
---
# Private Cloud Onboarding

This article will cover all facets of the **Private Cloud** onboarding process, including timelines, information about future updates, technical requirements, and implementation instructions for key Private Cloud features.

::: note
If you are a **Managed** Private Cloud customer, please see [Managed Private Cloud Onboarding](/private-cloud/onboarding/managed-private-cloud). 
:::

## Timeline

After you purchase the Private Cloud, Auth0 will host a **kickoff meeting** with you to begin the implementation process. We strongly recommend that this meeting occur no later than **five (5) days** after the contract signing.

Immediately after the kickoff meeting, we begin the implementation process, which takes **two (2) weeks**. At the end of this process, you're ready for the **Environment Handover**, where your Private Cloud deployment is ready for Production use.

## Updates

Auth0 issues automatic monthly updates to the Private Cloud. The [Private Cloud Release Notes](https://auth0.com/releases/) will contain full details on the changes made to your deployment.

::: note
The four most recent Private Cloud releases are considered to be the **Active Releases**.
:::

## Custom domains

To learn how to map your tenant domain to a custom domain of your choosing, see [Custom Domains](/custom-domains). You can also learn how to manage the required certificates.

## Tenant logging

Auth0 provides [logs](/logs) that are accessible via the Dashboard or the Management API's [`logs` endpoint](/api/v2#!/Logs/get_logs).

You can also send data logged by Auth0 to an external service. To help with this, Auth0 provides extensions that support automatic log export to services like Sumo Logic or Loggly. These currently include:

* [Auth0 Logs to Application Insights](/extensions/application-insight)
* [Auth0 Logs to Azure Blob Storage](/extensions/azure-blob-storage)
* [Auth0 Logs to Logentries](/extensions/logentries)
* [Auth0 Logs to Loggly](/extensions/loggly)
* [Auth0 Logs to Logstash](/extensions/logstash)
* [Auth0 Logs to Mixpanel](/extensions/mixpanel)
* [Auth0 Logs to Papertrail](/extensions/papertrail)
* [Auth0 Logs to Splunk](/extensions/splunk)
* [Auth0 Logs to Sumo Logic](/extensions/sumologic)

## Rate limits

To ensure the quality of Auth0's services, Auth0 APIs are subject to rate limiting.

## Support

If you have any questions or concerns, please reach out to the [Auth0 Support team](${env.DOMAIN_URL_SUPPORT}). To help expedite your request, please provide as much information as possible when you [open a Support ticket](/support/tickets).

## Create Dashboard administrators

To create additional Dashboard administrators, an existing administrator must submit a request to [Auth0 Support](${env.DOMAIN_URL_SUPPORT}). Please include:

* name(s) of the tenant(s) for which the new administrator should have access
* email addresses of administrators to be invited