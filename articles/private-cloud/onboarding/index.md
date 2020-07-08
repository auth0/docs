---
section: private-cloud
description: Learn about the onboarding and implementation process for Private Cloud deployment options.
topics: private-cloud
contentType: concept
useCase: 
    - private-saas-deployment
    - private-cloud
---
# Private Cloud Onboarding

When you choose the Private Cloud deployment option, you will participate in our onboarding and implementation process. In addition, depending on the deployment model you have chosen, you may need to meet certain infrastructure requirements. To learn more about implementation timelines, infrastructure requirement, and standard Private Cloud features, like updates, support, rate limits, and tenant logging practices, read on. 

## Timeline

The timeline for Private Cloud deployments is as follows:

<table class="table">
  <thead>
    <tr>
      <th><strong>Task</strong></td>
      <th><strong>Standard Private Cloud</strong></td>
      <th colspan=2><strong>Managed Private Cloud</strong></td>
    </tr>
    <tr>
      <th></td>
      <th></td>
      <th><strong>Auth0-hosted</strong></td>
      <th><strong>Customer-hosted</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Customer onboarding requirements</td>
      <td>Upon contract signing</td>
      <td>Upon contract signing</td>
      <td>Upon contract signing</td>
    </tr>
    <tr>
      <td>Kickoff meeting</td>
      <td>No later than five (5) days after contract signing</td>
      <td>No later than five (5) days after contract signing</td>
      <td>No later than five (5) days after contract signing</td>
    </tr>
    <tr>
      <td>Pre-production handover</td>
      <td>N/A</td>
      <td>Five (5) business days from kickoff meeting</td>
      <td>Five (5) business days from ready customer infrastructure</td>
    </tr>
    <tr>
      <td>Production handover</td>
      <td>Ten (10) business days from kickoff meeting</td>
      <td>Ten (10) business days from pre-production handover</td>
      <td>Ten (10) business days from ready customer infrastructure</td>
    </tr>
  </tbody>
</table>

### Customer onboarding requirements

Upon contract signing, we will ask you to provide key information regarding your onboarding requirements, which we will then validate.
Information we request may include:

* Tenant administrators
* Preferred AWS regions
* DNS records
* Custom domains
* SSO requirements
* Data sovereignty details

To learn more about Private Cloud onboarding requirements, see [Onboarding Requirements](/private-cloud/onboarding/onboarding-requirements).

### Kickoff meeting

Once we validate your onboarding requirements, we will host a kickoff meeting with you to begin the implementation process. We strongly recommend that this meeting occur no later than five (5) days after the contract signing.

### Implementation

Immediately after the kickoff meeting, we begin the implementation process, the length of which varies according to the table above depending on your deployment option. If you have chosen the Customer-hosted deployment option, the implementation process will depend highly on the amount of time you need to [provision your infrastructure per Auth0 requirements](/private-cloud/onboarding/managed-private-cloud/infrastructure).

At the end of this process, you're ready for the Production handover, when your Private Cloud deployment is ready for Production use.

## Infrastructure requirements

For Standard and Auth-hosted Private Cloud deployment options, Auth0 will handle the infrastructure for you.

If you have chosen the Customer-hosted deployment option, please review the [infrastructure requirements](/private-cloud/onboarding/managed-private-cloud/infrastructure), as well as the [IP/Domain and Port List](/private-cloud/onboarding/managed-private-cloud/ip-domain-port-list) required for Private Cloud deployments. In addition, our Managed Services Engineering team will require regular access to install patches, updates, and upgrades; troubleshoot and fix issues; and optimize security and performance. To learn about available options, see [Remote Access Options](/private-cloud/onboarding/managed-private-cloud/remote-access-options).

## Updates

Auth0 issues monthly updates to the Private Cloud. Of these, the four most recent are considered active. Updating to an active release is mandatory and ensures that you receive:

* the latest features
* security fixes and enhancements
* bug fixes

After an update, you can learn about the changes made to your deployment in the [Private Cloud Release Notes](https://auth0.com/releases/).

If you have chosen the Standard Private Cloud deployment model, updates will be automatic on a set schedule. Otherwise, we will each out to you to coordinate specific dates and times for your updates. To learn more, see [Private Cloud Upgrades](/private-cloud/operations-upgrades). 

## Custom domains

You can use custom domains with your Private Cloud deployment. To learn how to map your tenant domain to a chosen custom domain and manage the required certificates, see [Custom Domains](/custom-domains).

::: warning
If you have chosen the Customer-hosted Managed Private Cloud deployment option and are already using the legacy custom domains feature, you will need to migrate to the Auth0 Custom Domains feature. Please contact Auth0 for assistance.
:::

## Tenant logging

Auth0 provides tenant [logs](/logs) that are accessible via the Auth0 Dashboard or the Management API's [Search Log Events endpoint](/api/v2#!/Logs/get_logs).

You can also send data logged by Auth0 to an external service. To help you, Auth0 provides extensions that support automatic log export to services like Sumo Logic or Loggly. These currently include:

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

To ensure the quality of Auth0's services, Auth0 production APIs are subject to rate limiting. To learn more, see [Rate Limits](/policies/rate-limits).

## Support

Auth0 will provide you with an account to access the [Auth0 Support Center](${env.DOMAIN_URL_SUPPORT}), where you can get information about your Auth0 environment and open support tickets. Your account will be linked to your Private Cloud deployment and current [Support](/support) plan. and generally the tenant name you use will follow this format: **customer_name**-support.

If you have any questions or concerns, please reach out to the [Auth0 Support team](${env.DOMAIN_URL_SUPPORT}). To help expedite your request, please provide as much information as possible when you [open a Support ticket](/support/tickets).

## Dashboard administrators

During onboarding, you will be asked to provide information about Dashboard administrators. To create additional administrators, an existing administrator must submit a request to [Auth0 Support](${env.DOMAIN_URL_SUPPORT}). Please include:

* name(s) of the tenant(s) to which the new administrator should have access
* email addresses of administrators to be invited