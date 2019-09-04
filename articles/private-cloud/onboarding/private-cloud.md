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

After your purchase of the Private Cloud, Auth0 will host a **kickoff meeting** with you to begin the implementation process. We strongly recommend that this meeting occur no later than **five (5) days** after the contract signing.

Implementation begins immediately after the kickoff meeting, and the process takes **two (2) weeks**. At this point, you're ready for the **Environment Handover**, where your Private Cloud deployment is ready for Production use.

## Updates

Auth0 will issue monthly updates to the Private Cloud automatically. The [Private Cloud Release Notes](https://auth0.com/releases/) will contain full details on the changes made to your deployment.

::: note
The four most recent Private Cloud releases are considered to be the **Active Releases**.
:::

## Custom domains

See [Custom Domains](/custom-domains) for instructions on how to map your tenant domain to a custom domain of your choosing, as well as how to manage the required certificates.

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

## Create Dashboard administrators

To create additional Dashboard administrators, an *existing* administrator must reach out to Auth0 [Support](${env.DOMAIN_URL_SUPPORT}) requesting that an additional administrative account be made. Please include in your request:

* The name(s) of the tenant(s) for which the new administrator should have access
* The email addresses of those to be invited