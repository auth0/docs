---
order: 04
title: SSO for Regular Web Apps
image: /docs/media/articles/architecture-scenarios/web-oidc.png
extract: Traditional web application which needs to authenticate users using OpenID Connect.
description: Regular web app scenario which needs to authenticate users using OpenID Connect.
---

# SSO for Regular Web Apps

In this scenario we will build a web application for a fictitious company named ABC Inc. The app is meant to be used by ABC's employees and contractors. Employees will use their existing corporate directory (Active Directory), while contractors will be managed in a separate user store.

::: panel-info NOTE
By _Regular Web App_, we mean an app that uses primarily server side, page `GET`, `POST`, and cookies for maintaining state. This is contrast with a Web _SPA_ (Single Page App), that heavily relies on client side JavaScript code calling an API.
:::

__Table of Contents__
- [The Premise](#the-premise)
  - [Goals & Requirements](#goals-requirements)
- [Overview of the Solution](#overview-of-the-solution)
  - [Identity Management](#identity-management)
  - [Which protocol to use](#which-protocol-to-use)
  - [Authentication Flow](#authentication-flow)
    - [How to validate an ID Token](#how-to-validate-an-id-token)
- [Auth0 Configuration](#auth0-configuration)
  - [Client](#client)
    - [Create a Client](#create-a-client)
    - [Configure Callback URLs](#configure-callback-urls)
  - [Connections](#connections)
    - [Create a database connection](#create-a-database-connection)
    - [Create an Active Directory / LDAP Connection](#create-an-active-directory-ldap-connection)
- [Inside the Implementation](#inside-the-implementation)
  - [User Login](#user-login)
    - [Automate Home Realm Discovery (HRD)](#automate-home-realm-discovery-hrd-)
  - [Session Management](#session-management)
  - [User Logout](#user-logout)
  - [Access Control](#access-control)
    - [Refresh the authorization related claims](#refresh-the-authorization-related-claims)
    - [Install the Authorization Extension](#install-the-authorization-extension)
- [Conclusion](#conclusion)

## The Premise

ABC Inc. is a consulting startup company. Currently they have approximately 100 employees and they also outsource several activities to external contractors. Most of the employees work from the company's main office, but there are some teams that work remotely. Additionally, some employees frequently travel to customer locations and work from mobile devices.

All employees and external contractors are required to fill in their timesheets every week using spreadsheets. The current system is inefficient and the company decided that they need to move to a better and more automated solution.

The company evaluated several of the available timesheets application and concluded that it would be more cost-effective to build their own in-house solution, since they are looking for a very simple application at the moment. The app will be built using ASP.NET Core, since their developers are already using this technology and they can have the app ready in a week or so.

### Goals & Requirements

ABC Inc. wants to launch the new solution quickly so they chose to start simple and build into it as they gather feedback from their employees.

The application should be available to logged in users only. Each user will have a role, and based on this role, they should be able to perform certain actions and view specific data.

::: panel-info Authentication vs Authorization
ABC wants to __authenticate__ and __authorize__ each user. Authentication has to do with identity: verifying that the user is indeed who they claim to be. Authorization is about deciding which resources a user should have access to, and what they should be allowed to do with those resources.
:::

ABC's timesheets app needs to support two roles: _User_ and _Admin_:
- Someone with the User role can add timesheet entries, by specifying the date, the client and the hours worked. The Admin role also has this same right.
- Those with the User role should have access only to their own timesheets entries.
- Someone with the Admin role can additionally:
  - Approve or reject timesheet entries of other users.
  - Edit the client drop-down list of values (add, edit, delete).

Each user will be required to fill in their timesheets by the end of the week. They can either choose to register daily their timesheets or add the entries for the whole week together. The timesheets will have to be reviewed and approved by an Admin. The rejected entries will have to be updated by each employee and re-submitted for approval.

The company uses Active Directory for all employees and employees will sign into the Timesheet application using their Active Directory credentials. The external contractors can sign in with a username and password. Contractors are not on ABC's corporate directory.

ABC wants to minimize user login burden, but wants to maintain a level of security depending on the operation: submitting timesheet entries is lower risk than approving them. However the approved timesheets are used for customer charging so security is definitely a requirement. The authentication strategy should be flexible so it can adapt as the company grows. For example, they should easily be able to add additional authentication requirements, like multifactor authentication, for Admins.

The solution should be available both to the employees with a physical presence in the company office, as well as to those working remotely, without the overhead of a VPN connection, hence the app should be deployed on a cloud provider like Heroku or Microsoft Azure.

![Diagram of the solution](/media/articles/architecture-scenarios/web-app-sso/solution-diagram.png)

## Overview of the solution

### Identity Management

ABC decided to use Auth0 as their Identity as a Service (IDaaS) provider. The reasoning behind this decision was that the company did not want to commit resources on  training, implementation and maintenance of identity and access management. Furthermore, the company plans on building into this solution in the future, possibly adding a mobile native app and an API to push approved timesheets to their internal systems. Auth0 provides the flexibility to incorporate such changes in their architecture with minimum effort.

::: panel-info Identity-as-Service
Identity-as-Service ("IDaaS") is a cloud-based service for identity and access management. The offered services often include SSO, federated identity, password management, and more.
:::

### Which protocol to use

The next decision has to do with which protocol to use, OAuth 2.0 with OpenID Connect (OIDC) or SAML.

::: panel-info Supported identity protocols
Auth0 implements proven, common and popular identity protocols, both for consumer oriented web products (OAuth 2.0, OAuth 1.0, OpenID) and for enterprise deployments (SAML, WS-Federation, LDAP). You have complete freedom to use the one that best meets your business needs.
:::

__OpenID Connect__ is an authentication protocol, based on the OAuth 2.0 family of specifications. It uses simple JSON identity tokens (JWT) delivered via the OAuth 2.0 protocol.

::: panel-info OAuth vs OpenID Connect (OIDC)
OAuth 2.0 and OpenID Connect (OIDC) are often mistaken for the same thing, but this is not exact.
__OAuth 2.0__ is a protocol that lets you authorize one website (the consumer or client) to access your data from another website (the resource server or provider). For example, you want to authorize a website to access some files from your Dropbox account. The website will redirect you to Dropbox which will ask you whether it should provide access to your files. If you agree the website will be authorized to access your files from Dropbox. At the core, OAuth 2.0 is about resource access and sharing.
__OpenID Connect__, on the other hand, is a simple identity layer built on top of the OAuth 2.0 protocol. It gives you one login for multiple sites. Each time you need to log in to a website using OIDC, you are redirected to your OpenID site where you login, and then taken back to the website. At the core, OIDC is concerned with user authentication.
:::

__SAML__ is an XML-based protocol, that provides both authentication and authorization between trusted parties.

Compared to SAML, OpenID Connect is lighter weight and simpler to deal with. SAML is proven, powerful and flexible, but for the requirements of this app, that flexibility and power is not required. Identity federation (one of the most compelling reasons for adopting SAML) is not required here either, And if it ever became a requirement, it can be easily handled by Auth0, in the same way it deals with AD (that uses LDAP).

For these reasons, ABC will use OpenID Connect for their implementation.

### Authentication Flow

OpenID Connect supports more than one flow for authentication. Since our scenario involves a regular web app we will use the __Authorization Code Flow__.

The flow goes as follows:
1. The app (called a Client in OIDC) initiates the authentication request by redirecting the user to Auth0.
1. The first time the user goes through this flow a consent page will be shown where the permissions that will be given to the Client are listed (for example, post messages, list contacts). The user logs in to the service (unless they are already logged in) and authorizes the application access.
1. Auth0 redirects the user to the Client, along with an _authorization code_ in the querystring.
1. The Client sends the _authorization code_ to Auth0, along with the client credentials (`client_id` and `client_secret`), and asks for a token.
1. The service returns an __ID token__.

![Diagram of the Authorization Code Flow](/media/articles/architecture-scenarios/web-app-sso/authz-code-flow.png)

::: panel-info Form Post Response Mode
Another option is to use the __OAuth 2.0 Form Post Response Mode__ with `response_type=id_token&response_mode=form_post`. Due to the `response_type=id_token` request parameter, the response contains the `id_token` directly, instead of the authorization code, while the `response_mode=form_post` encodes the `id_token` with the rest of the Authorization Response parameters as HTML form values that are auto-submitted in the User Agent. This way you can have an optimized authentication flow (no need to exchange the code for an `id_token`), however you have to make sure that it is supported by the technology you are using to implement your app (ASP .NET Core middleware does support it). For more details refer to the [OAuth 2.0 Form Post Response Mode specification](https://openid.net/specs/oauth-v2-form-post-response-mode-1_0.html).
:::

The __ID token__ (usually referred to as `id_token`) is a __JSON Web Token (JWT)__ that contains identity data. It is consumed by the client and used to get user information like the user's name, email, and so forth, typically used for UI display.

::: panel-info More on tokens
Tokens are alphanumeric strings used in token-based authentication. They allow users to authenticate with a username and password once and get a token in return which they can use from that point on. They have a limited lifetime duration.

__JSON Web Tokens (JWTs)__ are tokens that conform to the [JSON Web Token Standard](https://tools.ietf.org/html/rfc7519) and contain information about an identity in the form of claims. They are self-contained in that it is not necessary for the recipient to call a server to validate the token. JWTs can be signed using a secret (with the __HMAC__ algorithm) or a public/private key pair using __RSA__. You can find more information on JWT [here](/jwt).

The ID Token, which is a JWT, conforms to an industry standard (IETF [RFC 7519](https://tools.ietf.org/html/rfc7519)) and contains three parts: A header, a body and a signature.
- The header contains the type of token and the hash algorithm used on the contents of the token.
- The body, also called the payload, contains identity claims about a user. There are some claims with registered names, for things like the issuer of the token, the subject of the token (who the claims are about), and the time of issuance.  Any number of additional claims with other names can be added, though care must be taken to keep the JWT within the browser size limitations for URLs.
- The signature is used by the recipient of a JWT to validate the integrity of the information conveyed in the JWT.
:::

#### How to validate an ID token

The validation of an ID token requires several steps:
1. If the ID Token is encrypted, decrypt it using the keys and algorithms that the Client specified.
1. The Issuer Identifier for the OpenID Provider must match the value of the `iss` (issuer) claim.
1. The `aud` (audience) claim should contain the Client's `client_id` value. The ID Token must be rejected if the ID Token does not list the Client as a valid audience, or if it contains additional audiences not trusted by the Client.
1. If the ID Token contains multiple audiences, the Client should verify that an `azp` claim is present.
1. If an `azp` (authorized party) claim is present, the Client should verify that its `client_id` is the claim value.
1. The Client must validate the signature of ID Tokens according to JWS using the algorithm specified in the JWT `alg` header parameter. The Client must use the keys provided by the Issuer.
1. The `alg` value should be the default of `RS256` or the algorithm sent by the Client in the `id_token_signed_response_alg` parameter during registration.
1. If the JWT `alg` header parameter uses a MAC based algorithm such as `HS256`, `HS384`, or `HS512`, the octets of the UTF-8 representation of the client_secret corresponding to the `client_id` contained in the `aud` (audience) claim are used as the key to validate the signature. For MAC based algorithms, the behavior is unspecified if the `aud` is multi-valued or if an `azp` value is present that is different than the `aud` value.
1. The current time must be before the time represented by the `exp` claim.
1. The `iat` claim can be used to reject tokens that were issued too far away from the current time, limiting the amount of time that nonces need to be stored to prevent attacks. The acceptable range is Client specific.
1. If a `nonce` value was sent in the Authentication Request, a `nonce` claim must be present and its value checked to verify that it is the same value as the one that was sent in the Authentication Request. The Client should check the `nonce` value for replay attacks. The precise method for detecting replay attacks is Client specific.
1. If the `acr` claim was requested, the Client should check that the asserted claim value is appropriate.
1. If the `auth_time` claim was requested, either through a specific request for this claim or by using the `max_age` parameter, the Client should check the `auth_time` claim value and request re-authentication if it determines too much time has elapsed since the last End-User authentication.

Note that if you store ID tokens on your server, you must store them securely.

## Auth0 Configuration

In this section we will review all the configurations we need to apply using the [Auth0 Dashboard](${manage_url}).

### Client

The Auth0 configuration part starts with registering the timesheets app at the Auth0 dashboard as a __client__. A client is an application making protected resource requests on behalf of the resource owner (end-user).

::: panel-info NOTE
The term "client" does not imply any particular implementation characteristics. A client can be a web app, a mobile app or an SPA. In the case of ABC it is a ASP.NET Core web app.
:::

The main characteristics of a Client in Auth0 are:
- __Name__: The canonical name of the client. This is used to identify the client at the portal, emails, logs, and more.
- __Client ID__ (read-only): The unique identifier for the client. This is the ID used in the application when setting up authentication with Auth0. It is an auto-generated alphanumeric string.
- __Client secret__ (read-only): A base64 encoded string, used to sign and validate tokens which will be used in the different authentication flows. It is auto-generated and it must be kept confidential.
- __Domain__: The domain name assigned to the Auth0 account. The format of the domain is `{account-name}.auth0.com` or `{account-name}.{location}.auth0.com`, for example `abc.auth0.com`.
- __Callback URL__: The URL where the user is redirected after they authenticate.

#### Create a Client

ABC's scenario involves only one application: the timesheets web app. Hence we have to configure one Client at Auth0 side.

To register a database connection, go to the [dashboard](${manage_url}) and in the side navigation select [Clients](${manage_url}/#/clients).

Click on the button __+ Create Client__. You will be prompted for the name and the type of the client. We will name our client `Timesheet-App` and select `Regular Web Applications` as the client type.

![Create Client Dialog Box](/media/articles/architecture-scenarios/web-app-sso/new-client.png)

When you click __Create__ you will be navigated to the [Quick Start view](${manage_url}/#/clients/${account.clientId}/quickstart). Here you can pick the technology you plan on using to build your app and the relevant how-to quickstart will be displayed.

The other available views are:
- [Settings](${manage_url}/#/clients/${account.clientId}/settings): Here you can view and update the settings of your client. This is the page you will use to retrieve information like _Domain_, _Client ID_, and _Client Secret_. In this page you will also have to [set the __Callback URL__ for your client](#configure-callback-urls).
- [Addons](${manage_url}/#/clients/${account.clientId}/addons): Addons are plugins associated with a client in Auth0. Usually, they are third party APIs used by the client that Auth0 generates access tokens for (for example Salesforce, Azure Service Bus, Azure Mobile Services, SAP, and so forth). We will not use any Addons in this scenario.
- [Connections](${manage_url}/#/clients/${account.clientId}/connections): Connections are sources of users. We will use this view shortly to enable specific connections for our client.

#### Configure Callback URLs

The __Allowed Callback URLs__ field contains the URL(s) where Auth0 will redirect to after the user has authenticated in order for the OpenID Connect to complete the authentication process. You can specify multiple valid URLs by comma-separating them. You can use the star symbol as a wildcard for subdomains, for example `*.google.com`. Make sure to specify the protocol, `http://` or `https://`, otherwise the callback may fail in some cases.

The Callback URL for our sample project is `http://localhost:5000/signin-auth0`. Go ahead and set this value to the __Allowed Callback URLs__ field if you plan on using our sample, otherwise add the URL you chose to deploy your application to.

### Connections

The next step is to configure the identity providers that will be used for authentication at the web app. Each identity provides maps to a __connection__ in Auth0. Each client needs at least one connection, and each connection can be used for more than one client.

ABC needs to configure two connections: one Active Directory connection for the internal employees, and one Database connection for external parties.

::: panel-info Supported identity providers
Auth0 supports a vast variety of protocols and identity providers:
- Social: Allow your users to log in using Google, Facebook, LinkedIn, Github, and many more.
- Enterprise: Allow your users to log in using Active Directory, ADFS, LDAP, SAML-P, and many more.
- Database connections: Create your own user store by configuring a new database connection, and authenticate your users using email/username and password. The credentials can be securely stored either in the Auth0 user store, or in your own database.
- Passwordless authentication: Allow your users to login without the need to remember a password and use an authentication channel like SMS or e-mail.
:::

#### Create a database connection

To register a database connection, go to the [dashboard](${manage_url}) and in the side navigation select [Connections > Database](${manage_url}/#/connections/database).

Click on the button __+ Create DB Connection__. You will be prompted for the name of the connection. We will name our connection `Timesheet-Users`.

![Create DB Connection Dialog Box](/media/articles/architecture-scenarios/web-app-sso/new-db-conn.png)

When you click __Save__ you will be navigated to the _Settings_ page for the new connection. Ensure that you enable your client to use this connection at the _Clients Using This Connection_ section.

![Enable the client to use this DB connection](/media/articles/architecture-scenarios/web-app-sso/enable-client-db.png)

For more information on database connections refer to [Database Identity Providers](/connections/database).

#### Create an Active Directory / LDAP Connection

Next you need to configure your Active Directory / LDAP connection. Go to the [Auth0 dashboard](${manage_url}) and in the side navigation select the [Connections > Enterprise](${manage_url}/#/connections/enterprise)).

There you need to create the AD / LDAP connection and install the AD Connector. You can find details in these documents:
- [How to connect your Active Directory with Auth0](/connections/enterprise/active-directory)
- [How to install the Active Directory/LDAP Connector](/connector)

::: panel-info AD/LDAP Connector
The AD/LDAP Connector, is a bridge between your Active Directory and the Auth0 Service. This bridge is necessary because AD is typically locked down to your internal network, and Auth0 is a cloud service running on a completely different context.
[More information](/connector/overview)
:::

Once you have configured the connection and the connector, be sure to enable your client to use this AD / LDAP connection:

![Enable the client to use this AD connection](/media/articles/architecture-scenarios/web-app-sso/enable-client-ad.png)

::: panel-info Kerberos support
The AD/LDAP connector supports Kerberos to make it easer for your users to authenticate when they are on a domain-joined machine within the corporate network. To activate Kerberos on an Active Directory you have to simply enable the option in the dashboard. After enabling Kerberos you'll also be able to configure the __IP Ranges__. When users originate from these IP address ranges this information will be exposed in the SSO endpoint which means client-side SDKs like auth0.js and the Lock will be able to detect Kerberos support and allow Integrated Windows Authentication.
[More information](/connector/kerberos)

**NOTE**: If you enable Kerberos then you need to make some changes to the AD/LDAP's configuration file. For details refer to: [Modify the AD/LDAP Connector Settings](/connector/modify).
:::

Now that we have designed our solution and discussed the configurations needed on Auth0 side, we can proceed with integrating Auth0 with our timesheets web app. That's what the next paragraph is all about, so keep reading!

## Inside the implementation

Let's walk through the implementation of our regular web application. We used ASP .NET Core for the implementation, you can find the code in [this GitHub repository](https://github.com/auth0-samples/auth0-pnp-webapp-oidc).

The sample contains an application which uses Active Directory integration to authenticate company employees and an Auth0 database connection for external contractors. Authorization is implemented using rules and claims as we will see in detail in this paragraph.

### User Login

Auth0 provides a Lock widget which serves as a login component for your application, meaning that you do not have to implement your own login screen. The Lock widget seamlessly integrates with all of the connections you configure inside your Auth0 dashboard, whether they be database, social or enterprise connections.

There are a number of different ways in which you can implement a Login screen using a web application and Auth0:
- __Hosted Lock__: Use an instance of the Lock widget which is hosted on the Auth0 infrastructure.
- __Embedded Lock__: Embed the Lock widget inside a web page of your application. You have some customization options for the actual Lock widget, and full control over the rest of the HTML on the page.
- __Custom UI__: Develop a completely custom web page for the login screen. The custom HTML form will post back to your server which will in turn authenticate the user using the Authentication API. For more information on when to use a Custom UI refer to [Lock vs. a Custom UI](/libraries/when-to-use-lock).

The recommended best practice is to use Hosted Lock because it is the most secure option and the easiest way to enable users to log in to your application.

#### Automate Home Realm Discovery (HRD)

By default, Lock will display all the connections available for login. Selecting the appropriate Identity Providers from multiple options is called _Home Realm Discovery (HRD)_. In our case the options are either authenticating with Active Directory (for company employees) or using email/password for our database connection (external contractors).

You may however want to avoid that first step, where the user needs to choose the Identity Provider (IdP), and have the system identify it instead of asking every time. Lock offers you the following options:

- __Identify the IdP programatically__: When you initiate an authentication transaction with Auth0 you can optionally send a `connection` parameter. This value maps directly with any connection defined in your dashboard. When using the Hosted version of Lock by calling the [`/authorize`](https://auth0.com/docs/api/authentication#!#get--authorize_db) endpoint, you can pass along a `connection` query string parameter containing the name of the connection. Alternatively, if you are using Embedded Lock, this is as simple as writing `auth0.show({connections: ['YOUR_CONNECTION']});`.

  There are multiple practical ways of getting the `connection` value. One of them is to use __vanity URLs__: for example, company employees will use `https://internal.yoursite.com`, while external contractors will use `https://external.yoursite.com`.

- __Use email domains__: Lock can use email domains as a way of routing authentication requests. Enterprise connections in Auth0 can be mapped to `domains`. If a connection has this setup, then the password textbox gets disabled automatically when typing an e-mail with a mapped domain. Note that you can associate multiple domains to a single connection.

For additional information on this topic refer to: [Selecting the connection in Auth0 for multiple login options](/libraries/lock/v10/selecting-the-connection-for-multiple-logins).

### Session Management

When talking about managing sessions, there are typically three layers of sessions we need to consider:

- __Application Session__: The first is the session inside the application. Even though your application uses Auth0 to authenticate users, you will still need to keep track of the fact that the user has logged in to your application. In a normal web application this is achieved by storing information inside a cookie.
- __Auth0 session__: Next, Auth0 will also keep a session and store the user's information inside a cookie. Next time when a user is redirected to the Auth0 Lock screen, the user's information will be remembered.
- __Identity Provider session__: The last layer is the Identity Provider, for example Facebook or Google. When you allow users to sign in with any of these providers, and they are already signed into the provider, they will not be prompted to sign in. They may simply be required to give permissions to share their information with Auth0 and in turn your application.

When developing a web application, you will therefore need to keep track of the fact that the user has logged in to your Web application. You can do this by making use of a cookie-based session to keep track of the fact that the user has signed in, and also store any of the user related information or tokens.

::: panel-info How do I control the duration of the user's local application session? Can I drive that from Auth0?
The web app has full control over the user's local application session. How this is done usually depends on the web stack being used (for example, ASP.NET). Regardless, all approaches ultimately use one or more cookies to control the session. The developer can choose to use the expiration of the JWT `id_token` returned by Auth0 to control their session duration or ignore it completely. Some developers store the `id_token` itself in session state and end the user's session when it has expired.

The reason why you would use the expiration of the token to determine the expiration of the local session is because it gives you centralized control of the duration of a user session from the Auth0 Dashboard.
:::

The login flow is as follows:

![Login Flow Diagram](/media/articles/architecture-scenarios/web-app-sso/login-flow.png)

1. __Initiate OIDC Authentication Flow__: The user's browser will send a request to Auth0 to initiate the OIDC flow.
1. __Set SSO Cookie__: Auth0 will set a cookie to store the user's information.
1. __Code exchange and return ID Token__: Auth0 will make a request back to the web server and return the code. The web server will exchange the code for an ID token.
1. __Set auth cookie and send response__: The web server will send a response back to the browser and set the application authentication cookie to store the user's session information.
1. __Auth cookie sent with every subsequent request__: The application authentication cookie will be sent on every subsequent request as proof that the user is authenticated.

::: panel-info How does Auth0's SSO session impact the application's session?
Auth0 manages its own single-sign-on session. Applications can choose to honor or ignore that SSO session when it comes to maintaining their own local session. The Lock widget even has a special feature where it can detect if an Auth0 SSO session exists and ask the user if they wish to log in again as that same user.

![Lock Widget SSO](/media/articles/architecture-scenarios/web-app-sso/sso-login.png)

If they do so, they are signed in without having to re-enter their credentials with the actual IDP.  Even though the user didn't authenticate, the application still performs an authentication flow with Auth0 and obtains a new `id_token`, which can be used to then manage the new local application session.
:::

See the implementation in [ASP.NET Core](/architecture-scenarios/application/web-app-sso/login-aspnetcore).

### User Logout

When logging the user out, you will once again need to think about the three layers of sessions which we spoke about before:
- __Application Session__: You need to log out the user from your Web Application, by clearing their session.
- __Auth0 session__: You need to log out the user from Auth0. To do this you redirect the user to `https://${account.namespace}/v2/logout`. Redirecting the user to this URL clears all single sign-on cookies set by Auth0 for the user.
- __Identity Provider session__: Although this is not common practice, you can force the user to log out from the Identity Provider used, for example Facebook or Google. To do this add a `federated` querystring parameter to the logout URL: `https://${account.namespace}/v2/logout?federated`.

To redirect a user after logout, add a `returnTo` querystring parameter with the target URL as the value: `https://${account.namespace}/v2/logout?returnTo=http://www.example.com`. Note, that you will need to add the `returnTo` URL as an __Allowed Logout URLs__. For more information on how to implement this refer to: [Logout](/logout).

The logout flow (not including federated logout) is as follows:

![Logout Flow Diagram](/media/articles/architecture-scenarios/web-app-sso/logout-flow.png)

1. __Initiate Logout Flow__: The logout flow will be initiated from the browser, for example by the user clicking a _Logout_ link. A request will be made to the web server.
1. __Clear user’s local session__: The user's Application Session / Cookie will be cleared.
1. __Redirect browser to Auth0 Logout__: The user's browser will be redirected to the Auth0 Logout URL.
1. __Clear SSO Cookie__: Auth0 will clear the user's SSO Cookie.
1. __Redirect to post-logout URL__: Auth0 will return a redirect response and redirect the user's browser to the `returnTo` querystring parameter.

See the implementation in [ASP.NET Core](/architecture-scenarios/application/web-app-sso/logout-aspnetcore).

### Access Control

Authorization refers to the process of determining what actions a user can perform inside your application.

You can either implement authorization directly inside your application, independently of Auth0, or use one of the available ways to retrieve the user authorization levels, put them as authorization claims inside the `id_token` and validate these claims inside your application, once you retrieve the token, to control access.

There are various ways in which you can retrieve and set the user authorization claims when using Auth0:
- By configuring and using the [Auth0 Authorization Extension](/extensions/authorization-extension).
- By using Active Directory groups. These can be used in combination with the Authorization Extension by mapping Active Directory Groups to Groups you define using the Authorization extension.
- Add metadata to the user's profile by making use of [rules](/rules#add-roles-to-a-user).
- By calling an external services from inside a [rule](/rules).

Since in our case the company has already Active Directory set up, we will enforce access control using the Authorization Extension in combination with Active Directory groups.

::: panel-info NOTE
At this point in time the authorization extension is primarily designed to enforce coarse-grained authorization, for example to control access to an application based on a user's group membership. It is not necessarily designed to control fine-grained access (i.e. whether a user can perform a specific action inside the application), even though this is how we are utilizing it in this instance.
:::

All users will implicitly be regular users, but timesheet administrators will be assigned to an `Admin` group which will allow them to approve timesheets. The Authorization Extension allows for mapping groups to existing group membership.

All timesheet administrators will be assigned to the `Timesheet Administrators` group on Active Directory, which will be automatically mapped to the `Admin` group inside the Timesheet Application.

When you install the Authorization Extension, it creates a rule in the background, which does the following:
1. Determine the user's group membership.
1. Store the user's group membership info as part of the `app_metadata`.
1. Add the user's group membership to the outgoing token.
1. Verify that the user has been granted access to the current application.


#### Refresh the authorization related claims

In the scenario described in this document, the web app does not handle its own authorization, but instead Auth0 delivers the authorization claims. User group membership is retrieved from the Active Directory and passed in the web app as claims in the `id_token`.

There are some scenarios however when you might need to refresh the user's authorization claims. For example:
- The user leaves the company so all access should be revoked.
- The user receives Admin privileges and you want this change to be propagated quickly.
- You consider the timesheets approval process a sensitive one, so each time a user tries to approve an entry, you want to verify that the user indeed has the admin rights required.

In all these scenarios, the user is already logged in so the app has parsed and applied the access control granted by the claims contained in the `id_token`, but you want to refresh these access control related claims.

In this case the developer can pick one of the following solution to this problem:

- The web app falls back on the Auth0 SSO session when it wants to refresh the `id_token` by performing another authorization flow (`/authorize` endpoint) with Auth0.

- When performing the initial authorization flow, the web app requests a `refresh_token`, by adding `offline_access` at the `scope` parameter, for example `scope=openid offline_access`. The `refresh_token` is stored in session, alongside with the `id_token`. Then when a session needs to be refreshed (a timeframe has passed or the user tries to approve a timesheet), the app uses the `refresh_token` on the backend to obtain a new `id_token`, using the `/oauth/token` endpoint with `grant_type=refresh_token`. This will result in re-querying the Active Directory, get the updated information, which would include any new groups the user has been added to since the last time, and sending this information to the web app as part of the `id_token` claims.

The question on how often this should be triggered depends on the specific use case, and to answer that you need to consider items like how often the user profile data change and how crucial it is to propagate these changes to your web app as fast as possible. This way you can decide on the time interval you want to propagate this change and configure your web app to refresh the authorization claims based on that. Of course, if a user knows their rights changed (for example, they can now approve timesheets), but the application isn't reflecting this quickly enough, they can just log back out and log in again.  This will force an new `id_token` to be issued, with a corresponding query to Active Directory for the latest information.

For more information on how to retrieve and use a refresh token refer to [Refresh Tokens](/tokens/refresh-token).

#### Install the Authorization Extension

To install the Authorization extension navigate to the [Extensions](${manage_url}/#/extensions) view of your Auth0 Dashboard, and select and install the Auth0 Authorization extension.

![Install the Authorization Extension](/media/articles/architecture-scenarios/web-app-sso/install-authz-ext.png)

Once installed, you will see the app listed under _Installed Extensions_.

When you click on the link to open the extension for the first time, you will be prompted to provide permission for the extension to access your Auth0 account. If you do so, you will be redirected to the Authorization Dashboard.

Once on the Authorization Dashboard, navigate to Groups in the navigation menu, and create a new group called `Admin`.

![Create Admin Group](/media/articles/architecture-scenarios/web-app-sso/create-admin-group.png)

After the group has been added you can click on the new group to go to the group management section. Go to the _Group Mappings_ tab and add a new group mapping which will map all Active Directory users in the `Timesheet Admins` groups to the `Admin` group you just created.

![Add Admin Group Mapping](/media/articles/architecture-scenarios/web-app-sso/add-group-mapping.png)

Once you click __Save__ you can see the new mapping listed.

![View Admin Group Mapping](/media/articles/architecture-scenarios/web-app-sso/view-group-mapping.png)

With the mapping configured you only need to maintain membership to the `Timesheet Admins` group in Active Directory, and those users will be automatically mapped to the `Admin` group inside our application.

For more information refer to the [Authorization Extension documentation](/extensions/authorization-extension).

#### Enforce permissions in your application

When you installed the Authorization Extension, it also created an Auth0 rule which will add an `authorization` claim with all the authorization related settings for a particular user. The groups for a user will be added as a sub-claim of the `authorization` claim called `groups` and all the groups a user belongs to will be added as an array to this claim. This is an example of what JSON payload of a ID token may look like with the groups listed:

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "authorization": {
    "groups": ["Admin"]
  }
}
```

In your application you will therefore need to decode the ID Token returned when a user is authenticated, and extract the groups which a user belongs to from the `authorization` claim. You can then store these groups, along with other user information inside the user's session, and subsequently query these to determine whether a user has permissions to perform a certain action based on their group membership.

See the implementation in [ASP.NET Core](/architecture-scenarios/application/web-app-sso/authorization-aspnetcore).

## Conclusion

In this document we covered a simple scenario: a regular web app, hosted in the cloud, using Auth0 for authentication, while utilizing the existing Active Directory user store. We learned what OpenID Connect offers and why it was preferable for this business case, how the Authentication Flow works, what an ID Token is and how to validate and manipulate it, how to configure clients and connections on Auth0 dashboard, how to implement user login and logout using Lock, and how session management and access control works.

We started by describing the business case and the requirements and went on explaining how each requirement can be met and the thought process behind each choice that was made.

We used ASP .NET Core for the sample web app implementation, hopefully though after going through this document you are able to build such a web app using the framework you prefer.

Don't forget to check back for new business cases and more complex architecture scenarios!
