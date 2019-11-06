---
order: 06
title: Business to Employees Identity Scenarios
image: /media/articles/architecture-scenarios/b2e.png
extract: Large organization who wants to federate their existing enterprise directory service to allow employees to log in to applications using their existing enterprise credentials.
description: Explains the architecture scenario of B2E with a large organization that wants to extend their existing enterprise directory service.
topics:
    - b2e
    - architecture
    - lockjs
    - active-directory
    - saml
    - sso
contentType: concept
useCase:
  - invoke-api
  - secure-an-api
  - build-an-app
---

# Business to Employees Identity Scenarios

The B2E (Business to Employees) scenario involves applications that are used by employee users.  These are applications that are targeted toward users who are typically acting on behalf of an organization such as an employer, a university, or a group in which they are a member, as opposed to acting on their own behalf.  

Such applications that are custom written by the organization may use the OIDC/OAuth protocol to externalize authentication whereas those that have been purchased will often use the <dfn data-key="security-assertion-markup-language">SAML</dfn> protocol. In either case, the enterprise will typically want to use some form of Enterprise connection, such as a SAML Identity Provider, ADFS, G Suite, Azure AD or a directory service such as AD or OpenLDAP, and less frequently, a custom DB, for authentication of enterprise users.

For a business that is creating or integrating applications with Auth0 for a B2E environment,  there are several requirements that are common for this scenario.  This guide will summarize the most common requirements for B2E applications and explain the Auth0 features which help meet each need.  
 
## Enterprise providers

Most businesses already have a corporate identity repository which has information on all the employee users and user profile information.  It may also contain information on partners and contractors. A common requirement for the B2E scenario therefore, is to allow such users to log in via [Auth0 Enterprise connections](/connections/identity-providers-enterprise) such as SAML2 providers, ADFS, G Suite, Azure AD or an on-premise corporate directory service.  This is attractive to users because it allows them to avoid creating yet another username and password for each application and instead leverage the same login credential across all their enterprise applications.  

This is especially attractive to security interests within the company because user credentials are only exposed to the identity stack instead of to each application.  Furthermore, this architecture allows the business to retain control over access to applications because the enterprise identity provider provides a single shutoff point.  If a user leaves the organization, administrators can simply disable the user’s account in the corporate identity provider and the user can no longer log in to any of the applications using that identity provider.  

Auth0 makes it easy to enable login via a wide variety of enterprise providers with just a few simple configuration steps.

## Groups and roles

With a lot of users, you may set up groups and <dfn data-key="role">roles</dfn> to manage access and privileges. Often, these are stored and administered in a directory service.

Auth0 can get user attributes, like groups and roles, from a directory service or enterprise identity provider during authentication. You can then make the attributes available through tokens returned to the application or with the Auth0 Management API.

## Profile translation

Sometimes a directory or identity provider returns attributes in one format, but your application uses another format. Using Auth0's [Rules](/rules/current/metadata-in-rules), you can [map and translate user profile attributes](https://auth0.com/rules/saml-attribute-mapping). You can even translate between OIDC/OAuth, SAML, WS-Fed, and LDAP.

For example, you retrieve attributes in SAML assertion format from a SAML Identity Provider. With a rule you can then translate the attributes to custom claims in an ID Token for an OIDC/OAuth application.

You can also map SAML attributes to the Auth0 user profile from the dashboard. To do this, go to [Connections > Enterprise > SAMLP Identity Provider](${manage_url}/#/connections/enterprise), select your SAML connection, and set your attribute mappings in the **Mappings** tab.

## Extensibility with augmented user profiles

You may want to enrich user profiles with attributes or data retrieved from other services. For example, you might receive an address or phone number and wish to translate that into a geographic region. [Auth0 Rules](/rules) enable you to write small snippets of code that execute during the authentication transaction. This lets you execute logic or call other services for user information, then add [user metadata](/users/concepts/overview-user-metadata) to the Auth0 user profile and optionally the resulting tokens sent to your applications.

## Single Sign-on

If you have several internal applications, you can set up <dfn data-key="single-sign-on">[Single Sign-on (SSO)](/sso)</dfn> across them so users only have to log in once.

Auth0 supports integration with applications that externalize authentication using industry standard identity protocols:

* OIDC/OAuth
* SAML2
* WS-Fed

After some configuration, all your applications can leverage your enterprise identity provider. In this setup, Auth0 is the broker between your applications and enterprise identity providers.

Now when a user signs in to one application, they can access other applications integrated with Auth0 without having to log in again. This will be true until their SSO session expires. You should configure the SSO session length within Auth0 to meet security policies.

## Single Sign-on integrations

You can also integrate purchased applications with Auth0 for <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn>. Auth0 provides [pre-built integrations](/integrations/sso) for applications such as:

* SalesForce
* Zendesk
* Slack
* New Relic

## Branding

Branding is an important part of any application. Your logo, colors and styles should be consistent in all parts of the application. You can [customize](/libraries/custom-signup) the login, signup, and error pages displayed by Auth0 so it matches your application. Add your own logo, text, and colors. There's also I18N/L10N support for global rollouts. [Emails for verification or password resets](/email/templates) are customizable too. 

[Login screens](/libraries/lock/v11/ui-customization) should appear to come from your application’s branded domain name. To maintain consistency, you can define a [custom domain name](/custom-domains) for the login screen displayed by Auth0.

## Multi-factor authentication

Internal or employee applications often deal with sensitive content. [Multi-factor authentication (MFA)](/mfa) helps protect your data and applications. Auth0 provides a variety of ways to implement MFA. And for more flexibility, you can use Rules to turn it on only for the applications or user groups that need it.

## Logs export

Need to analyze logs or store them long-term? Auth0 provides extensions to [export logs to external tools](/logs) for analysis and retention. You can also retrieve log data with the Management API.

## Audit

Companies have many uses for logs data, one of which is audit reports. Auth0 captures a variety of data in log files, which may be useful for your audit reporting. The logs have information on authenticated users, the identity provider used, and when significant administrative changes are made in the Auth0 dashboard.

Log events each have an event type. You can use event types as filters when querying log data with the Management API, or when exporting logs to log analysis tools.

## Monitoring

Monitoring the infrastructure and services that your applications depend on is critical. [Auth0 provides monitoring endpoints](/monitoring/guides/test-testall-endpoints) as well as an [Auth0 Status](https://status.auth0.com) page you can subscribe to.

Auth0 makes every effort to minimize outages, but if there is any disruption to service, it will appear on the status page. To support requirements for root cause analysis documentation after a disruption, Auth0 conducts internal analysis and publishes the results on the disruption notice when the analysis is completed.

## Anomaly Detection

An unfortunate part of modern life on the internet is hackers. Hackers are constantly trying to find a way into applications. For example, they may try to log in using common passwords. Or they may use credentials stolen from elsewhere, hoping that users re-used the same passwords at other sites.

Auth0's [Anomaly Detection](/anomaly-detection) detects these situations for Auth0 Database connections and provides options for how to respond. Turn on Anomaly Detection and configure the response options so you can respond appropriately if such an event occurs.

## Github Deployment

Do you manage a lot of your application code in Github? You can deploy code for rules, hooks, or custom database access from there with Auth0's [Github Deployment extension](/extensions/github-deploy).

If you have a full continuous integration/continuous deployment pipeline, use the [Auth0 Deploy CLI tool](https://github.com/auth0/auth0-deploy-cli) for greater flexibility.
