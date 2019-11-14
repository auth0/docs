## Tenant Check

This section covers a list of configurations to check in your tenant. This should be done periodically during development and sufficiently before launch so you have time to fix anything amiss.

### General tenant check

#### Tenant preparation check

Check to ensure you have [set up tenant environments](/dev-lifecycle/setting-up-env) to support your SDLC lifecycle and that Dev, Test and Prod tenants are cleanly separated so that ongoing development work after launch doesn’t negatively impact your production environment.

<%= include('../../_includes/_architecture/_sdlc-support.md', { platform: 'b2c' }) %>

#### Tenant association check

<%= include('../../_includes/_architecture/_tenant-association.md', { platform: 'b2c' }) %>

#### Specify production tenant

To ensure Auth0 recognizes your production tenant, be sure to [set your production tenant](/dev-lifecycle/setting-up-env#set-the-environment
) with the “production” flag in the Support Center.

#### Tenant production Check

Auth0 provides a [Production Check](/pre-deployment) facility to detect many common errors. You should ensure this has been run and any findings from the report mitigated before launch.

In addition, you should check the [best practice configurations advice](/pre-deployment/tests/best-practice), for which checking cannot be automated.

#### Tenant Settings Check

##### Tenant Settings

Make sure to follow the [Auth0 tenant settings best practices](/best-practices/tenant-settings#set-up-branding-configuration) in configuring your logo as well as your support email and support URL so user's know how to get help if an issue occurs. You'll want to check your SSO Session Timeout settings and the list of dashboard admins with access to your production tenant as well. For further information on tenant setting, see the Auth0 dashboard [tenant settings documentation](/dashboard/dashboard-tenant-settings#settings).

##### Error Page Customization

<%= include('../../_includes/_branding/_error-page.md', { platform: 'b2c' }) %>

##### Legacy feature flags off

If you have an older tenant, you may have various legacy feature flags enabled in your [tenant settings advanced tab](/dashboard/dashboard-tenant-settings#advanced). If you have any toggles on in the “Migrations” section of this tab, you should review your usage and make plans to migrate off the legacy feature. 

##### Delegated admin extension

While you are checking the list of users with access to your production tenant, don't forget to check any users specified in the [Delegated Admin Extension](/extensions/delegated-admin/v3).

#### Custom Domain Naming set up

<%= include('../../_includes/_branding/_custom-domain-naming.md', { platform: 'b2c' }) %>

### Application  and Connection settings check

Each of your application configurations in Auth0 should be checked against the [application configuration best practices](/best-practices/application-settings).

Each of your connection settings should be reviewed against the [connection configuration best practices](/best-practices/connection-settings).

In addition, you should review that all connections are appropriate and that no experimental connections are left in your production tenant as they could enable unauthorized access.  

If you use SAML connections, it is a best practice to configure the connections to sign SAML requests.

### Page customization check

If you use the Auth0 universal login page, password reset page, or Guardian multi-factor authentication, you should check that you have adequately customized the pages displayed to the end user.

#### Universal Login Page

<%= include('../../_includes/_branding/_universal-login.md', { platform: 'b2c' }) %>

#### Password Reset Page customization

<%= include('../../_includes/_branding/_password-reset.md', { platform: 'b2c' }) %>

#### Guardian

<%= include('../../_includes/_branding/_guardian.md', { platform: 'b2c' }) %>

### Authorization check

If you are using Auth0’s [authorization feature](https://auth0.com/docs/authorization), be sure to double check all privileges granted to ensure authorizations are appropriate for your production environment.

### API configuration check

#### Access token expiration

You should double check the [API access token expiration settings](/dashboard/reference/settings-api) to ensure they are appropriate for each API in your production environment.

#### API offline access

If your application does not request refresh tokens, this should be off.

#### Access token signing algorithm

It is recommended that the [API access token signing algorithm](/getting-started/set-up-api#signing-algorithms) be set to RS256 rather than HS256 to minimize exposure of the signing key. 

#### API Access token validation

If you have any custom APIs, be sure to check that they are adequately [validating the access tokens](/api-auth/tutorials/verify-access-token) they receive before using the information in them.

### API Scopes

If you have applications making machine-to-machine calls to any of your APIs, you should review the scopes specified for the API to ensure they are all appropriate for your production environment. For further information see the documentation on [client credentials grant](/api-auth/config/using-the-auth0-dashboard).

### Rules/Hooks check

You should also have aligned your rules with Auth0 [rules best practices](/best-practices/rules).

### Email templates customized

<%= include('../../_includes/_branding/_email-templates.md', { platform: 'b2b' }) %>

### Anomaly detection configured

<%= include('../../_includes/_authentication/_anomaly-detection.md', { platform: 'b2b' }) %>
