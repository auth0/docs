---
description: Regular web app scenario configuration for Auth0
toc: true
---
# SSO for Regular Web Apps: Auth0 Configuration

In this section we will review all the configurations we need to apply using the [Auth0 Dashboard](${manage_url}).

## Application

The Auth0 configuration part starts with registering the timesheets app at the Auth0 dashboard as an __application__. An application is making protected resource requests on behalf of the resource owner (end-user).

::: note
The term "application" does not imply any particular implementation characteristics. An application can be a web app, a mobile app or an SPA. In the case of ExampleCo it is a ASP.NET Core web app.
:::

The main characteristics of an application in Auth0 are:
- __Name__: The canonical name of the application. This is used to identify the application at the portal, emails, logs, and more.
- __Client ID__ (read-only): The unique identifier for the application. This is the ID used in the application when setting up authentication with Auth0. It is an auto-generated alphanumeric string.
- __Client secret__ (read-only): A string used to sign and validate tokens which will be used in the different authentication flows. It is auto-generated and it must be kept confidential.
- __Domain__: The domain name assigned to the Auth0 account. The format of the domain is `{account-name}.auth0.com` or `{account-name}.{location}.auth0.com`, for example `ExampleCo.auth0.com`.
- __Callback URL__: The URL where the user is redirected after they authenticate.

### Create an Application

ExampleCo's scenario involves only one application: the timesheets web app. Hence we have to configure one Application at Auth0 side.

To register a database connection, go to the [dashboard](${manage_url}) and in the side navigation select [Applications](${manage_url}/#/applications).

Click on the button __+ Create Application__. You will be prompted for the name and the type of the application. We will name our application `Timesheet-App` and select `Regular Web Applications` as the application type.

![Create Application Dialog Box](/media/articles/architecture-scenarios/web-app-sso/new-client.png)

When you click __Create__ you will be navigated to the [Quick Start view](${manage_url}/#/applications/${account.clientId}/quickstart). Here you can pick the technology you plan on using to build your app and the relevant how-to quickstart will be displayed.

The other available views are:
- [Settings](${manage_url}/#/applications/${account.clientId}/settings): Here you can view and update the settings of your application. This is the page you will use to retrieve information like _Domain_, _Client ID_, and _Client Secret_. In this page you will also have to [set the __Callback URL__ for your application](#configure-callback-urls).
- [Addons](${manage_url}/#/applications/${account.clientId}/addons): Addons are plugins associated with an application in Auth0. Usually, they are third party APIs used by the application that Auth0 generates Access Tokens for (for example Salesforce, Azure Service Bus, Azure Mobile Services, SAP, and so forth). We will not use any Addons in this scenario.
- [Connections](${manage_url}/#/applications/${account.clientId}/connections): Connections are sources of users. We will use this view shortly to enable specific connections for our application.

### Configure Callback URLs

The __Allowed Callback URLs__ field contains the URL(s) where Auth0 will redirect to after the user has authenticated in order for the OpenID Connect to complete the authentication process. You can specify multiple valid URLs by comma-separating them. You can use the star symbol as a wildcard for subdomains, for example `*.google.com`. Make sure to specify the protocol, `http://` or `https://`, otherwise the callback may fail in some cases.

The Callback URL for our sample project is `http://localhost:5000/signin-auth0`. Go ahead and set this value to the __Allowed Callback URLs__ field if you plan on using our sample, otherwise add the URL you chose to deploy your application to.

## Connections

The next step is to configure the identity providers that will be used for authentication at the web app. Each identity provides maps to a __connection__ in Auth0. Each application needs at least one connection, and each connection can be used for more than one application.

ExampleCo needs to configure two connections: one Active Directory connection for the internal employees, and one Database connection for external parties.

::: panel Supported identity providers
Auth0 supports a vast variety of protocols and identity providers:
- Social: Allow your users to log in using Google, Facebook, LinkedIn, Github, and many more.
- Enterprise: Allow your users to log in using Active Directory, ADFS, LDAP, SAML-P, and many more.
- Database connections: Create your own user store by configuring a new database connection, and authenticate your users using email/username and password. The credentials can be securely stored either in the Auth0 user store, or in your own database.
- Passwordless authentication: Allow your users to login without the need to remember a password and use an authentication channel like SMS or e-mail.
:::

### Create a database connection

To register a database connection, go to the [dashboard](${manage_url}) and in the side navigation select [Connections > Database](${manage_url}/#/connections/database).

Click on the button __+ Create DB Connection__. You will be prompted for the name of the connection. We will name our connection `Timesheet-Users`.

![Create DB Connection Dialog Box](/media/articles/architecture-scenarios/web-app-sso/new-db-conn.png)

When you click __Save__ you will be navigated to the _Settings_ page for the new connection. Ensure that you enable your application to use this connection at the _Applications Using This Connection_ section.

![Enable the application to use this DB connection](/media/articles/architecture-scenarios/web-app-sso/enable-client-db.png)

For more information on database connections refer to [Database Identity Providers](/connections/database).

### Create an Active Directory / LDAP Connection

Next you need to configure your Active Directory / LDAP connection. Go to the [Auth0 dashboard](${manage_url}) and in the side navigation select the [Connections > Enterprise](${manage_url}/#/connections/enterprise)).

There you need to create the AD / LDAP connection and install the AD Connector. You can find details in these documents:
- [How to connect your Active Directory with Auth0](/connections/enterprise/active-directory)
- [How to install the Active Directory/LDAP Connector](/connector)

::: note
The AD/LDAP Connector, is a bridge between your Active Directory and the Auth0 Service. This bridge is necessary because AD is typically locked down to your internal network, and Auth0 is a cloud service running on a completely different context.
[More information](/connector/overview)
:::

Once you have configured the connection and the connector, be sure to enable your application to use this AD / LDAP connection:

![Enable the application to use this AD connection](/media/articles/architecture-scenarios/web-app-sso/enable-client-ad.png)

::: panel Kerberos support
The AD/LDAP connector supports Kerberos to make it easer for your users to authenticate when they are on a domain-joined machine within the corporate network. To activate Kerberos on an Active Directory you have to simply enable the option in the dashboard. After enabling Kerberos you'll also be able to configure the __IP Ranges__. When users originate from these IP address ranges this information will be exposed in the SSO endpoint which means client-side SDKs like auth0.js and the Lock will be able to detect Kerberos support and allow Integrated Windows Authentication.
[More information](/connector/kerberos)

::: note
If you enable Kerberos then you need to make some changes to the AD/LDAP's configuration file. For details refer to: [Modify the AD/LDAP Connector Settings](/connector/modify).
:::

Now that we have designed our solution and discussed the configurations needed on Auth0 side, we can proceed with integrating Auth0 with our timesheets web app. That's what the next paragraph is all about, so keep reading!

<%= include('./_stepnav', {
 prev: ["1. Solution Overview", "/architecture-scenarios/application/web-app-sso/part-1"],
 next: ["3. Application Implementation", "/architecture-scenarios/application/web-app-sso/part-3"]
}) %>
