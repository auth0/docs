---
title: General Usage and Operations Best Practices
description: Learn about best practices for general operations in Auth0.
topics:
  - best-practices
contentType: 
    - index
    - reference
useCase:
  - best-practices
---
# General Usage and Operations Best Practices

Here are some recommended best practices for general Auth0 usage and operation.

## Capture log files 

Auth0 keeps tenant [logs](/logs) for a limited amount of time. To get log data and store it elsewhere, you can use the [Management API](/api/management/v2#!/Logs/get_logs) or one of the [available extensions](/extensions#export-auth0-logs-to-an-external-service) for services such as Loggly or Splunk.

## Set up your own email provider and customize email templates

[Auth0 provides a test email provider](/email) so you can test default welcome and email verification messages during tenant setup. The test provider can only send a limited amount of emails, so you should [configure your own mail server](/email/providers). Additionally, we recommend a unique email provider account per tenant. Sharing an email account between tenants can be a potential source of problems or outages for one tenant when making changes to the service intended for another.

Also, make sure to [configure and customize the templates](/email/templates) for emails sent from Auth0. These include email verification messages, welcome messages, password reset messages, et cetera. For custom templates provide a "from” address, a clear subject, your custom content, and a link timeout for emails with a link (such as a password reset link).

## Subscribe to updates on the Auth0 status page

Head over to the [Auth0 status page](https://status.auth0.com/) and sign up for notifications. If there are any Auth0 outages, you or your support staff will be notified.

## Store custom code in a source code repository

If you have custom code for rules, hooks, custom database scripts, or webtasks, store it in a source code repository such as Github for version and audit control. Auth0 has [extensions to help deploy code stored on external repositories](/extensions#deploy-hosted-pages-rules-and-database-connections-scripts-from-external-repositories).

If you have a full continuous integration/continuous deployment pipeline, use the [Auth0 Deploy CLI tool](https://github.com/auth0/auth0-deploy-cli) for greater flexibility.

## Store configuration values in dashboard

If your rules, hooks, custom database scripts, or webtasks require configuration values (such as credentials or API keys), you should store them in the Auth0 dashboard. Storing configuration values in the dashboard [makes migrating configuration](/dev-lifecycle/setting-up-env#migration) between tenants easier.

## Whitelist Auth0 public IP addresses

If your rules, hooks, custom database scripts, or webtasks call a service in your intranet or behind another firewall, be sure to whitelist the Auth0 public IP addresses. This lets requests from those IP addresses through. You can find the IP addresses for each region in your Auth0 dashboard, where you edit rules, hooks, or custom DB scripts.

## Run tenant configuration checks

The [Auth0 Support Center](https://support.auth0.com/) provides a configuration checker tool. Run the configuration checker periodically during development and again before you launch.

To run the configuration check, go to [Auth0 Support Center -> Tenants](https://support.auth0.com/tenants/public) and select the gear icon and choose **Run Production Check**.
