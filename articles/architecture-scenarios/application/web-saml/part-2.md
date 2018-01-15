---
description: Regular Web App Using SAML - Auth0 Configuration
toc: true
---
# Regular Web App Using SAML: Auth0 Configuration

In this section, we will walk you through the configuration you need to do so that you can use Auth0 as your identity provider (IdP). You will be using the [Dashboard](${manage_url}) for these steps.

## Client

Configuring Auth0 begins by registering the timesheets app in the Dashboard as a **client**. The client is an application that makes access requests to protected resources on behalf of the resource owner. 

::: note
The term "client" does not imply any particular implementation characteristics. A client can be a regular web app, a mobile app, or a single page app.
:::

The primary characteristics of a Client in Auth0 are:

- __Name__: The canonical name of the client. This is used to identify the client at the portal, emails, logs, and so on
- __Client ID__ (*read-only*): The unique identifier for the client. This is the ID used in the application when setting up authentication with Auth0. It is an auto-generated alphanumeric string
- __Client secret__ (*read-only*): A string used to sign and validate tokens which will be used in the different authentication flows. It is auto-generated and it must be kept confidential
- __Domain__ (*read-only*): The domain name assigned to the Auth0 account. The format of the domain is `{account-name}.auth0.com` or `{account-name}.{location}.auth0.com`, for example `ExampleCo.auth0.com`
- __Callback URL__: The URL where the user is redirected after they authenticate

We will need to create two clients: one for the service provider (SP) and one for the identity provider (IdP).

### Create a Client for the Service Provider

To create a new client, go to the [Clients](${manage_url}/#/clients) section of the [dashboard](${manage_url}).

Click on __+ Create Client__. You will be prompted for the client name and the type of the client. We will name our client `Timesheet-App` and select `Regular Web Applications` as the client type.

Click **Create** to proceed.

![Create Client Dialog Box]()

After Auth0 has successfully created your client, it will redirect you to the [Quick Start](${manage_url}/#/clients/${account.clientId}/quickstart) section of your new client. On this page, you can choose the technology you plan to use to build your app, and Auth0 will display the relevant quickstart information.

The other sections for a particular client include:

- [Settings](${manage_url}/#/clients/${account.clientId}/settings): View and update the settings of your client. This is the page you will use to retrieve information like _Domain_, _Client ID_, and _Client Secret_. This is also the page you'll use to [set the __Callback URL__ for your client](#configure-callback-urls)
- [Addons](${manage_url}/#/clients/${account.clientId}/addons): Addons are plugins associated with a client in Auth0. Usually, they are third party APIs used by the client for which Auth0 generates access tokens
- [Connections](${manage_url}/#/clients/${account.clientId}/connections): Connections are sources of users. We will use this view shortly to enable specific connections for our client

#### Configure Callback URLs

The __Allowed Callback URLs__ field contains the URLs where Auth0 will redirect to after the user has authenticated. You can specify multiple URLs by providing a comma-separated list.

You can use the star symbol as a wildcard for subdomains (for example, `*.google.com`). Make sure to specify the protocol (**http://** or **https://**), otherwise the callback may fail in certain cases.

The callback URL for our sample project is `http://localhost:5000/signin-auth0`. Go ahead and set this value to the __Allowed Callback URLs__ field if you plan on using our sample, otherwise add the URL for your application deployment.

#### Obtain SAML Configuration Details About the Service Provider

Now that you have an Auth0 client for the service provider (SP), we can obtain the information we need to configure the SAML integration (which we will review at a later point in this tutorial).

Go to your Client Settings page. Scroll to the bottom of the page and click **Show Advanced Settings**.

![]()

Open the **Certificates** area and click **Download Certificate**. Choose **PEM** from the drop-down presented. Be sure to save this file in a save place, since you'll need this at a later point of the setup process.

![]()

Next, open the **Endpoints** tab. 

### Create a Client for the Identity Provider


#### Configure Callback URLs


#### Obtain SAML Configuration Details About the Service Provider

## Connections

At this point, we will configure the identity providers that will be used for authentication in the web app. Each identity provides maps to a __connection__ in Auth0. Each client needs at least one connection, and each connection can be used for more than one client.

You'll need to configure two connections:

* One to store the users who are logging in via single sign on (SSO) using Tableau
* One to store users who are logging in with a username (or email) and a password

::: panel Supported identity providers
Auth0 supports a vast variety of protocols and identity providers:
- Social: Allow your users to log in using Google, Facebook, LinkedIn, Github, and many more.
- Enterprise: Allow your users to log in using Active Directory, ADFS, LDAP, SAML-P, and many more.
- Database Connections: Create your own user store by configuring a new database connection, and authenticate your users using email/username and password. The credentials can be securely stored either in the Auth0 user store, or in your own database.
- Passwordless Authentication: Allow your users to login without the need to remember a password and use an authentication channel like SMS or e-mail.
:::

### Create a Database Connection

To create a database connection, go to [Connections > Database](${manage_url}/#/connections/database).

Click on __+ Create DB Connection__. You will be prompted for the name of the connection. We will name our connection `Timesheet-Users`.

Click **Save** to proceed.

![Create DB Connection Dialog Box]()

When Auth0 has created your connection, it will redirect you to the _Settings_ page for the new connection. Ensure that you enable your client to use this connection at the _Clients Using This Connection_ section.

![Enable the client to use this DB connection](/media/articles/architecture-scenarios/web-app-sso/enable-client-db.png)

For more information on database connections refer to [Database Identity Providers](/connections/database).

### Create an Enterprise SAML-P Connection

At this point, you'll need to configure a connection to hold the users that will be using single sign on with their Tableau accounts.

Go to [Connections > Enterprise](${manage_url}/#/connections/enterprise)).

You will be creating a **SAML-P** Connection. Click the **plus sign** to begin this process. You will be prompted for the name of the connection. We will name our connection `Timesheet-Users`.

Click **Save** to proceed.

![Create SAML-P Connection Dialog Box]()

### Enabling Your Connections for Your Client

You've created your client and the two connections needed to hold your users, but you'll need to manually enable your connections for use with your client. You can do this by returning to **Client > Connections**. Make sure that only the sliders next to the connections you want used are green.

![Client Connections]()

## Summary



<%= include('./_stepnav', {
 prev: ["1. Solution Overview", "/architecture-scenarios/application/web-saml/part-1"],
 next: ["3. Application (Non-Auth0) Configuration", "/architecture-scenarios/application/web-saml/part-3"]
}) %>