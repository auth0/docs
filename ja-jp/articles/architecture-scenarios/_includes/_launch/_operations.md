## Status

You should ensure your operations staff knows how to monitor Auth0 service status and has set up a means to subscribe to updates on Auth0 status.

<%= include('../../_includes/_operations/_service-status.md', { platform: 'b2b' }) %>

## Email provider setup

You should double check that you have set up your own email provider to support production volumes of emails that might be sent to customers for signup, email validation, account recovery and the like.

<%= include('../../_includes/_operations/_email-provider.md', { platform: 'b2b' }) %>

## Infrastructure

<%= include('../../_includes/_operations/_infrastructure.md', { platform: 'b2b' }) %>

## NTP

If this is not handled automatically by your hosting environment, you should have scripts which will automatically restart NTP (Network Time Protocol) if it fails and alerts that will notify someone if NTP is not running.  Authentication transactions rely on accurate system time because security tokens may be evaluated as expired when received if there are time discrepancies between sending and receiving systems.

## LoadBalancer timeouts checked 

If you use the AD/LDAP connector, you should check the load balancer settings in your environment to see if they terminate long running connections that are inactive. If they do, you can modify the [Auth0 AD/LDAP Connection settings](/connector/modify#configuration-file) to use the `LDAP_HEARTBEAT_SECONDS` setting to send periodic heartbeat messages to keep the connection open.

## LoadBalancer configuration

If your application maintains server state such that it depends on sticky load balancing to route users to a particular server, it can be beneficial to double check that all load balancer configurations are correct.  One load balancer in a pool that is out of sync can cause intermittent errors that are hard to troubleshoot.  A quick check of load balancer configuration can avoid such issues in the first place.

## Logs 

You should check that you have set up the ability to capture log data, that logs are covered by your data retention policy and you have mechanisms to enforce logs data retention limits. You should also make sure that your development, support, and security teams know how to access logs data for troubleshooting and forensics purposes. Exporting log files to services that provide comprehensive analytics can help you identify patterns such as usage trends and errors.

<%= include('../../_includes/_operations/_logging.md', { platform: 'b2b' }) %>

## Monitoring

Be sure to set up proactive monitoring of the Auth0 service as well as end-to-end authentication through your application. 

<%= include('../../_includes/_operations/_monitoring.md', { platform: 'b2b' }) %>

## Auth0 Notifications

You should ensure your team is monitoring all of the following communication channels from Auth0 to stay abreast of important announcements and changes.

<%= include('../../_includes/_operations/_notifications.md', { platform: 'b2b' }) %>

In addition, you should periodically check the [Auth0 migrations page](/product-lifecycle/migrations) for news about upcoming deprecations that might require your team to make changes.

## Automated Deployment, version control

While not required, it is highly recommended that you have deployment automation set up. You can respond more efficiently if you need to make any changes after launch if you have automated the ability to deploy and revert changes to dev, test and production environments.

<%= include('../../_includes/_deployment/_introduction.md', { platform: 'b2b' }) %>

## Backup / Restore

You should have a plan and mechanism in place to support any backup/restore capability needed for your project. This can be done using the Auth0 Management API for data as well as the Automated Deployment capabilities described in the automated deployment section for Auth0 configuration.

As noted in the Auth0 [Data Tenant Restore policy](policies/restore-deleted-tenant) and [Data Transfer policy](policies/data-transfer), Auth0 does not restore deleted tenants or move data between tenants.  Auth0 provides the Auth0 Management API to provide customers a completely flexible capability to backup, restore and move data as needed. Customers can write scripts to retrieve data from Auth0 for backup purposes, and similarly write scripts for use with the Automated Deployment capability to restore any aspect of their Auth0 configuration.

## Versions Up to Date

You should double check that all technologies in your application stack, as well as browser versions used by your users are on current, up-to-date versions as this will impact Auth0’s ability to provide support if issues arise.
* Check you are using the latest supported version of node.js in [Auth0 dashboard settings](/dashboard/dashboard-tenant-settings#extensibility).
* Check you are using a version of SDK/Libraries supported by Auth0 per the [Auth0 Support Matrix](/support/matrix).

## Certificate rollover plan

Certificates may be used in identity deployments. To ensure a certificate expiration does not catch you by surprise, you should have a list of certificates in your environment along with the expiration dates, how you will be notified when expiration draws near and how the certificate rollover process works.

### SAML connections

For SAML connections, you obtain a certificate from the IdP and upload it to a SAML connection for the IdP in your Auth0 dashboard. When one of these certificates is about to expire, Auth0 will send email to dashboard administrators warning of the upcoming expiration. You can obtain the new certificate and upload it using the connection configuration screen.

### WS-Fed connections

For WS-Fed connections, if you configure them by specifying an ADFS URL, any changes will be picked up by a daily update. You can trigger an update manually by visiting the connection configuration page in the Auth0 dashboard and doing a Save. If a certificate is changed at the remote IdP, Auth0 can be updated by those mechanisms or by uploading a new metadata file in the same connection configuration screen.

## Disaster Recovery / Business Continuity Plan in place

While not an absolute requirement prior to launch, it is useful to have a disaster recovery plan in place to ensure business continuity in the face of different types of disasters, including system outages and natural disasters hitting a region where critical staff is located.

## Processes documented

Another item which is not an absolute requirement, but also recommended is to ensure all processes related to Auth0 are documented. This can include the following:

* Change management for configuration
* Deployment of new changes and any automatic deployment mechanisms used, how to revert to previous version if issues found
* Certificate rollover processes, if any
* Adding or removing new Identity Providers, if applicable
* Changes to user profile structure in Auth0 or in directories Auth0 pulls from
* Adding or removing applications or APIs
* Capturing and exporting logs
* Backup/restore process you have implemented
* User management (forgotten password, lost phone)
* Root cause analysis after an incident
