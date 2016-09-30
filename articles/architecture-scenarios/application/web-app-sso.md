---
title: SSO for Regular Web Apps
description: A regular web application which needs to authenticate users using OpenID Connect.
---

# SSO for Regular Web Apps

In this scenario we will build a web application for a fictitious company named ABC Inc.The app is meant to be used by ABC's employees and contractors. Employees will use their existing corporate directory (Active Directory), while contractors will be managed in a separate user store.

::: panel-info NOTE
By _Regular Web App_, we mean an app that uses primarily server side, page GETs, POST, and cookies for maintaining state. This is contrast with a Web _SPA_ (Single Page App), that heavily relies on client side JavaScript code calling an API.
:::

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
Identity-as-Service ("IDaaS") is a cloud-based service for identity and access management. The offered services often include SSO, Federated Identity, password management, and more.
:::

### Which protocol to use?

The next decision has to do with which protocol to use, OAuth 2.0 with OpenID Connect (OIDC) or SAML.

::: panel-info Supported identity protocols
Auth0 implements proven, common and popular identity protocols, both for consumer oriented web products (OAuth 2.0, OAuth 1.0, OpenID) and for enterprise deployments (SAML, WS-Federation, LDAP). You have complete freedom to use the one that best meets your business needs.
:::

OpenID Connect is an authentication protocol, based on the OAuth 2.0 family of specifications. It uses simple JSON identity tokens (JWT) delivered via the OAuth 2.0 protocol.

::: panel-info OAuth vs OpenID Connect (OIDC)
OAuth 2.0 and OpenID Connect (OIDC) are often mistaken for the same thing, but this is not exact.
__OAuth 2.0__ is a protocol that lets you authorize one website (the consumer or client) to access your data from another website (the resource server or provider). For example, you want to authorize a website to access some files from your Dropbox account. The website will redirect you to Dropbox which will ask you whether it should provide access to your files. If you agree the website will be authorized to access your files from Dropbox. At the core, OAuth 2.0 is about resource access and sharing.
__OpenID Connect__, on the other hand, is a simple identity layer built on top of the OAuth 2.0 protocol. It gives you one login for multiple sites. Each time you need to log in to a website using OIDC, you are redirected to your OpenID site where you login, and then taken back to the website. At the core, OIDC is concerned with user authentication.
:::

SAML is an XML-based protocol, that provides both authentication and authorization between trusted parties.

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

### Clients & Connections

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

The next step is to configure the identity providers that will be used for authentication at the web app. Each identity provides maps to a __connection__ in Auth0. Each client needs at least one connection, and each connection can be used for more than one client.

ABC needs to configure two connections: one Active Directory connection for the internal employees, and one Database connection for external parties.

::: panel-info Supported identity providers
Auth0 supports a vast variety of protocols and identity providers:
- Social: Allow your users to log in using Google, Facebook, LinkedIn, Github, and many more.
- Enterprise: Allow your users to log in using Active Directory, ADFS, LDAP, SAML-P, and many more.
- Database connections: Create your own user store by configuring a new database connection, and authenticate your users using email/username and password. The credentials can be securely stored either in the Auth0 user store, or in your own database.
- Passwordless authentication: Allow your users to login without the need to remember a password and use an authentication channel like SMS or e-mail.
:::

#### Creating a database connection

To register a database connection, go to the [Auth0 dashboard](${manage_url}) and in the side navigation select [Connections > Database](${manage_url}/#/connections/database).

Click on the button __+ Create DB Connection__. You will be prompted for the name of the connection. We will name our connection `Timesheet-Users`:

![Create DB Connection Dialog Box](/media/articles/architecture-scenarios/web-app-sso/new-db-conn.png)

When you click __Save__ you will be navigated to the _Settings_ page for the new connection. Ensure that you enable your client to use this connection at the _Clients Using This Connection_ section.

![Enable the client to use this DB connection](/media/articles/architecture-scenarios/web-app-sso/enable-client-db.png)

For more information on database connections refer to [Database Identity Providers](/connections/database).

#### Creating an Active Directory / LDAP Connection

Next you need to configure your Active Directory / LDAP connection. Go to the [Auth0 dashboard](${manage_url}) and in the side navigation select the [Connections > Enterprise](${manage_url}/#/connections/enterprise)).

There you need to create the AD / LDAP connection and install the AD Connector. You can find details in these documents:
- [How to connect your Active Directory with Auth0](/connections/enterprise/active-directory)
- [How to install the Active Directory/LDAP Connector](/connector)

Once you have configured the connection and the connector, be sure to enable your client to use this AD / LDAP connection:

![Enable the client to use this AD connection](/media/articles/architecture-scenarios/web-app-sso/enable-client-ad.png)

Now that we have designed our solution and discussed the configurations needed on Auth0 side, we can proceed with integrating Auth0 with our Timesheets web app. That’s what the next paragraph is all about, so keep reading!

## Inside the implementation
