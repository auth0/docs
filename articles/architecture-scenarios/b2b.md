---
order: 05
title: Business to Business Identity Scenarios
image: /media/articles/architecture-scenarios/b2b.png
extract: In this scenario you usually have a larger SAAS application, like Zendesk for example, where their customers are typically other companies which are registered as tenants.
toc: true
description: Explains the architecture scenario of B2B with large SAAS application.
topics:
    - b2b
    - architecture
    - lockjs
    - active-directory
contentType: concept
useCase:
  - invoke-api
  - secure-an-api
  - build-an-app
---

# Business to Business Identity Scenarios

Your applications are used by a number of businesses, each with their own expectations for how identities should be managed. Auth0 can streamline the process of setting up identity management for those applications.

This guide outlines some common requirements for business to business (B2B) application scenarios and how Auth0 can help you meet them. We'll provide tips for setting up all the common requirements like enterprise providers, leveraging existing groups and roles, as well as single sign-on.

## Enterprise providers

Most businesses already have a corporate identity repository which has information on all the employee users and user profile information. It may also contain information on partners and contractors. A common requirement for the B2B scenario, therefore, is to allow such customers to log in to your B2B application via their [Enterprise provider](/identityproviders#enterprise) such as SAML2 providers, ADFS, Google Apps, Azure AD or an on-premise corporate directory service.

This is attractive to your customers because it allows them to avoid creating more unmanaged usernames and passwords for cloud applications. They can create, update and delete accounts in their corporate systems and have the changes immediately reflected in their B2B cloud applications, ensuring tight control for compliance. 

The benefit to you, the B2B application provider, is that Auth0 makes it very easy to accommodate the wide variety of different authentication mechanisms that your customers might ask for, speeding up your customer onboarding time which speeds up time-to-revenue!

Auth0 provides simple configuration to enable a wide variety of enterprise providers to speed the onboarding of your B2B customers.

## Auth0 database connection

If your customers do not have an enterprise identity provider, never fear - [Auth0 provides an identity repository](/connections/database#using-the-auth0-user-store). Their users can register for accounts in an Auth0 DB connection. This is a quick onboarding path for them and a faster path to revenue for you.

## Groups and roles

Your customers may want to control access to your application by leveraging groups and roles in their internal directory service. 

Auth0 can receive user attributes, like groups and roles, from a [directory service](/connections/enterprise/ldap) or [enterprise identity provider](/identityproviders#enterprise) as part of user authentication. You can then make the attributes available to your application through tokens returned to the application or with the Auth0 Management API. This gives your customers a centralized way to control which of their users can access your application.

## Profile Translation

Sometimes a customer’s directory or identity provider returns attributes in one format, but your application uses another format. Using Auth0's [Rules](/rules/current/metadata-in-rules), you can [map and translate user profile attributes](https://auth0.com/rules/saml-attribute-mapping). You can even translate between OIDC/OAuth, SAML, WS-Fed, and LDAP.

For example, you retrieve attributes in SAML assertion format from a SAML Identity Provider. With a rule you can then translate the attributes to custom claims in an ID Token for an OIDC/OAuth application.

You can also map SAML attributes to the Auth0 user profile from the dashboard. To do this, go to [Connections > Enterprise > SAMLP Identity Provider](${manage_url}/#/connections/enterprise), select your SAML connection, and set your attribute mappings in the **Mappings** tab.

## Add attributes to User Profiles

You may want to enrich user profiles with attributes or data retrieved from other services. For example, you might receive an address or phone number and wish to translate that into a geographic region. [Auth0 Rules](/rules) enable you to write small snippets of code that execute during the authentication transaction. This lets you execute logic or call other services for user information, then add [user metadata](/users/concepts/overview-user-metadata) to the Auth0 user profile and optionally the resulting tokens sent to your applications.

## Single sign-on

If you have several applications, you can set up [single sign-on (SSO)](/sso/current) across them so users only have to log in once.

Auth0 supports integration with applications that externalize authentication using industry standard identity protocols:

* OIDC/OAuth
* SAML2
* WS-Fed

After some configuration, all your applications can leverage your enterprise identity provider. In this setup, Auth0 is the broker between your applications and enterprise identity providers.

Now when a user signs in to one application, they can access other applications integrated with Auth0 without having to log in again. This will be true until their SSO session expires. You should configure the SSO session length within Auth0 to meet security policies.

## APIs

Modern applications often leverage a [suite of APIs](/apis) to retrieve and combine data for an optimized user experience. [Auth0 supports the OAuth 2.0 specification](/api-auth) so your application can leverage APIs for all manner of transactions. Auth0 can be configured to [issue access tokens for your custom APIs](/api-auth/tutorials/adoption/api-tokens) as well as the Auth0 Management API to manage users and the rest of your Auth0 configuration.

## Branding

Branding is an important part of any application. Your logo, colors and styles should be consistent in all parts of the application. You can [customize](/hosted-pages#customize-your-hosted-page) the login, signup, and error pages displayed by Auth0 so it matches your application. Add your own logo, text, and colors. There's also I18N/L10N support for global rollouts. [Emails for verification or password resets](/email/templates) are customizable too. 

Login screens should appear to come from your application’s branded domain name. To maintain consistency, you can define a [custom domain name](/custom-domains) for the login screen displayed by Auth0.

## Multifactor authentication

Businesses are often concerned about applications that involve sensitive content. Offering [multifactor authentication](/mfa) (MFA) helps protect their data and your applications. Auth0 provides a variety of ways to implement MFA. And for more flexibility, you can use Rules to turn it on only for the applications or customer groups that need it.

## Logs export

Need to analyze logs or store them long-term? Auth0 provides extensions to [export logs to external tools](/logs) for analysis and retention. You can also retrieve log data with the Management API. Auth0 only retains logs for a limited period of time, governed by the type of subscription purchased. If your required data retention period is longer than the logs retention period for your subscription, you will want to export logs so you can keep them as long as you wish.

## Audit

Companies have many uses for logs data, one of which is audit reports. Auth0 captures a variety of data in log files, which may be useful for your audit reporting. The logs have information on authenticated users, the identity provider used, and when significant administrative changes are made in the Auth0 dashboard.

Log events each have an [event type](/logs#log-data-event-listing). You can use event types as filters when querying log data with the Management API, or when exporting logs to log analysis tools.

## Monitoring

If you offer a B2B service, chances are uptime is critical for you and knowing the status of any service your application depends on is important. [Auth0 provides monitoring endpoints](/monitoring/how-to-monitor-auth0) as well as a status page you can subscribe to.

Auth0 makes every effort to minimize outages, but if there is any disruption to service, it will appear on the status page. To support requirements for root cause analysis documentation after a disruption, Auth0 conducts internal analysis and publishes the results on the disruption notice when the analysis is completed.

In addition, you may want to set up monitoring of any remote Identity Providers you use with your Auth0 connections. This will help you quickly isolate the source of the problem if one of them goes down. An additional best practice to consider is setting up synthetic transactions that test the end-to-end login experience.

Last but not least your customers may have some of the same concerns, so you may want to document any monitoring pages or endpoints they can look at to help them troubleshoot and narrow down the location of an issue.

## Anomaly Detection

An unfortunate part of modern life on the internet is hackers. Hackers are constantly trying to find a way into applications. For example, they may try to log in using common passwords. Or they may use credentials stolen from elsewhere, hoping that users re-used the same passwords at other sites.

Auth0's [Anomaly Detection](/anomaly-detection) detects these situations for Auth0 Database connections and provides options for how to respond. Turn on Anomaly Detection and configure the response options so you can respond appropriately if such an event occurs.

## Github Deployment

Do you manage a lot of your application code in Github? You can deploy code for rules, hooks, or custom database access from there with Auth0's [Github Deployment extension](/extensions/github-deploy).

If you have a full continuous integration/continuous deployment pipeline, use the [Auth0 Deploy CLI tool](https://github.com/auth0/auth0-deploy-cli) for greater flexibility.

## Account Center

Auth0 [provides a rich account center](https://support.auth0.com/) for managing your tenants, viewing usage volume, reviewing notifications from Auth0 as well as filing and tracking support tickets. The account center also provides links to valuable content on topics such as compliance.
