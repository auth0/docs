---
title: SAML Configuration in Auth0
description: This article explains the various configuration options of SAML available with Auth0.
---

# SAML Configuration

## Overview

In a SAML federation there is a Service Provider and an Identity Provider.  The Service Provider agrees to trust the Identity Provider to authenticate users.  The Identity Provider authenticates users and provides to Service Providers an Authentication Assertion that indicates a user has been authenticated.

Auth0 supports the SAML protocol and can serve in either a SAML Service Provider (SP) role, a SAML Identity Provider (IDP) role or both.


### SAML Identity Provider

Some Applications, such as Salesforce, Box, Workday, can be configured to allow users to authenticate against an external Identity Provider using the SAML protocol.  Such applications can be integrated with Auth0 and in this case Auth0 will serve as the SAML IDP for the application.

Users of the application will be redirected to Auth0 to log in, and Auth0 can authenticate them using any backend authentication connection, such as an LDAP directory, a database, or even other SAML IDPs or Social Providers.  Once the user is authenticated, Auth0 will return a SAML assertion to the application indicating that the user has been successfully authenticated.

![](/media/articles/saml/saml-configuration/saml-case2.png)

### SAML Service Provider

Other applications, especially custom applications, may externalize authentication against an external Identity Provider using a protocol such as OpenID Connect or OAuth2.  In such cases, even though the application was written to utilize the OpenID Connect or OAuth2 protocol, it may be desirable to leverage an enterprise SAML provider for authentication.

In this situation, Auth0 will receive an authentication request from the application using the OpenID Connect or OAuth2 protocol, and Auth0 will translate the request into a SAML Authentication Request and send it on to a SAML Identity Provider.  In this case, Auth0 serves as a SAML Service Provider in the federation with the Identity Provider.

![](/media/articles/saml/saml-configuration/saml-case1.png)

### SAML Service Provider and Identity Provider

Auth0 can also serve as an authentication hub between applications making a SAML request and backend SAML Identity Providers.  In this case, Auth0 would serve as a SAML Identity Provider to the applications, and it would also serve as a SAML Service Provider to backend SAML Identity Providers.  This use case is advantageous when applications need to support multiple backend Identity Providers.

![](/media/articles/saml/saml-configuration/saml-case3.png)

## Configuring Auth0 as a Service Provider

We have a video with a quick overview of configuring Auth0 as a SAML service provider:

<iframe src="//fast.wistia.net/embed/iframe/2xrll0d056" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="640" height="400"></iframe>
<script src="//fast.wistia.net/assets/external/E-v1.js" async></script>

If Auth0 will serve as a SAML Service Provider, an Auth0 Connection is used to configure the Auth0 side (Service Provider) of each SAML federation.

There are instructions for several specific providers below:

* [ADFS](/adfs)
* [Okta](/okta)
* [OneLogin](/onelogin)
* [Ping7](/ping7)
* [SalesForce](/saml/identity-providers/salesforce)
* [SiteMinder](/siteminder)
* [SSOCircle](/ssocircle)

Auth0 can be configured as a Service Provider to any other SAML-compliant Identity Provider using the following generic instructions: [Generic Service Provider Configuration](/saml-sp-generic)


## Configuring Auth0 as a SAML Identity Provider

Configuring Auth0 to serve as a SAML Identity Provider is done in a couple different places, depending on the type of application.

For some SSO Integrations that support SAML, the Auth0 side of the configuration is done using the "SSO Integrations" link in the dashboard, clicking on "CREATE SSO INTEGRATION", and selecting the specific integration.  Instructions specific to the chosen SSO Integration are provided in the **Tutorial** section: [Using Auth0 in SAML2 Web Apps](/saml2webapp-tutorial).


For any application not listed on the "SSO Integrations" page(click "CREATE SSO INTEGRATION"  to see the list) the Auth0 side of the configuration can be added. Go to the "Applications" link on the dashboard, choose your application, click on the "Addons" tab, and then toggle on the "SAML2 WEB APP" box.

Generic instructions for configuring Auth0 as an IDP: [Generic Identity Provider Configuration](/saml-idp-generic).

The SAML2 Web App screen ("Settings" tab) can be used to specify various SAML parameters for the SAML Authentication Response.  SSO Integrations that require special settings are documented at: [SAML settings needed for some SSO Integrations](/saml-apps).

Once Auth0 has been configured to serve as a SAML Identity Provider to client applications, it needs a way to authenticate users.  It can use any of the supported connection types for this.  Auth0 can authenticate users against ldap directories, databases, other SAML Identity Providers or even Social providers and once a user is authenticated, Auth0 can translate the authentication result into a SAML Authentication Assertion to send back to the application client.

## Configuring Auth0 as both Service Provider and Identity Provider

In this situation, there are two federations to configure.  The federation between the application and Auth0 will follow the instructions above for Configuring Auth0 as an Identity Provider.   The federation between Auth0 and any backend SAML Identity providers would follow the instructions for Configuring Auth0 as a Service Provider.

A different, but similar, use case is setting up one Auth0 account to serve as a SAML Service Provider and then setting up a second Auth0 account to serve as a SAML Identity Provider for the first account.  This configuration would typically just be used for testing purposes.  The steps to set this up are described in: [Auth0 as Identity Provider for itself](/samlsso-auth0-to-auth0).

**NOTE**: A list of [Identity Providers](/samlp-providers) that are believed to be SAML compliant.

## Special Configuration Situations

Once a basic SAML setup has been done, there are a number of additional requirements that may need to be implemented to refine the setup to a particular situation.  The instructions below assume a connection has been set up (for Auth0 as Service Provider) or an Application has been set up (Auth0 as Identity Provider) and instructions are given for the specific settings to alter for each requirement.

### IDP-initiated SSO

Most of the instructions for setting up a SAML federation start with Service-Provider-Initiated Single Sign On which involves a user first invoking a URL on the Service Provider which returns a browser redirect to send the user to the Identity Provider for authentication.  After authentication, the user browser is redirected back to the Service Provider with a SAML assertion indicating authentication status. This is common for consumer-facing scenarios.

An alternative sequence is called Identity-Provider-Initiated Single Sign On where a user first invokes a URL on the Identity Provider and is prompted to authenticate and then is redirected to the Service Provider with a SAML assertion.  This is common in enterprise scenarios where an enterprise sets up a portal with links to outsourced or cloud-hosted applications to ensure users go to the correct application.  In this case the user first goes to the portal URL, which redirects to the IDP, where the user authenticates.  After authentication, the user clicks on links on the portal and their browser is redirected to the Service Provider with a SAML assertion.

#### Auth0 as Service Provider
If Auth0 is acting as a Service Provider, the following is needed to support IDP-Initiated Single Sign On.

* Ensure the IDP includes the connection parameter in the ACS (Assertion Consumer Service) URL.
* In the connection configuration, use the IDP-Initiated tab to specify 1) the application to which the user will be redirected after IDP login, 2) the protocol by which to return to that application and 3) any query parameters to pass to the application.

#### Auth0 as Identity Provider
If Auth0 is acting as an Identity Provider, the following is needed to support IDP-initiated Single Sign On.


* The URL to invoke for IDP-initiated login, if Auth0 will authenticate the users is of the form: `https://{accountname}.auth0.com/samlp/{client_id}`
* The `RelayState parameter` can be appended to specify a URL to which the Service Provider should redirect the user after processing the SAML response. Example: `https://{accountname}.auth0.com/samlp/{client_id}?RelayState=http://{final_destination_URL}`


### Signing and Encryption

#### Auth0 as Service Provider

##### Signing SAML Authentication Requests

If Auth0 is acting as a SAML Service Provider, the Authentication Request sent to the Identity Provider can be signed by doing the following for the SAML connection:

* Connections -> Enterprise -> SAMLP Identity Provider -> Settings (gear icon)
* Turn on the **"Sign Request"** toggle
* Download the certificate underneath the **"Sign Request"** toggle and give it to the Identity Provider for use in validating the signature.

###### Turning Deflate encoding on and off
Note that by default, SAML Authentication Requests are sent via HTTP-Redirect and using deflate encoding, which puts the signature in a query parameter.  To turn deflate encoding off, one can use the Auth0 Management APIv2 **"Update a connection"** endpoint to set the "deflate" option to false.

First use the Management APIv2 Get a Connection to see and copy the list of all options.  Then use Update a Connection, adding the "deflate" option and setting it to false, and paste in the rest of the options and their values:

```
{
   "name":"NAME_OF_CONNECTION"
   "options" : {
       ""deflate":false
    ...include all other options...
    }
}
```

##### Receiving Signed SAML Authentication Responses

When Auth0 is acting as a SAML Service Provider, all SAML Responses from an Identity Provider should be signed to ensure the response has not been tampered with.  Auth0 should be configured to validate the signature of the responses by:

* Obtain a signing certificate from the Identity Provider
* Load the certificate from the Identity Provider into the Auth0 Connection:
* Connections -> Enterprise -> SAMLP Identity Providers -> Settings (gear icon) for the desired connection -> **"UPLOAD CERTIFICATE"**

Auth0 can accept a SAML response with signature for either the assertion, the response or both.


##### Receiving Encrypted SAML Authentication Assertions

When Auth0 is acting as a SAML Service Provider, it may need to receive encrypted assertions from an Identity Provider. To do this, the Service Provider public key/certificate must be given to the Identity Provider.  The Identity Provider will encipher the SAML assertion with the public key and then Auth0 as the Service Provider will use its private key to decipher the assertion.

To prepare a connection for this:

* Connections -> Enterprise -> SAMLP Identity Providers -> Setup (pencil icon) for the desired connection
* See the "Optional: Assertions can be encrypted..." line which provides the ability to download a certificate in three different formats.
* Download and send to the Identity Provider administrator the certificate format needed by the Identity Provider.


#### Auth0 as Identity Provider

##### Receiving signed SAML Authentication Requests

When Auth0 is acting as a SAML Identity Provider, it can receive signed authentication requests, signed with the Service Provider's private key, and use the Service Provider's public key/certificate to validate the signature.

##### Sending Signed SAML Authentication Responses/Assertions

When Auth0 is acting as a SAML Identity Provider, it will sign responses or assertions with its private key and the receiving Service Provider will validate the signature with the corresponding public key/certificate.  To do this:

* Go to *Dashboard > Clients > Settings (gear icon) > Show Advanced Settings*.
* Under **Certificates** use **DOWNLOAD CERTIFICATE** to obtain the Identity Provider signing certificate.
* Send this certificate to the Service Provider for use in validating the signature.
* Then go to *Clients > Addons > SAML2 WEB APP > Settings* tab.
* By default the SAML Assertion will be signed.
* To sign the SAML Response, uncomment the `signResponse` line and set it to `true`.

At present, Auth0 will sign either the assertion **or** the response, but not both simultaneously.


##### Sending Encrypted SAML Authentication Assertions

When Auth0 is acting as a SAML Identity Provider, it is possible for it to encrypt the SAML assertion it sends by using a Rule.

You will need to obtain the certificate and public key from the Service Provider.

```js
function (user, context, callback) {

  context.samlConfiguration = (context.samlConfiguration || {});
  context.samlConfiguration.encryptionPublicKey = "-----BEGIN PUBLIC KEY-----\nMIGf...bpP/t3\n+JGNGIRMj1hF1rnb6QIDAQAB\n-----END PUBLIC KEY-----\n";
  context.samlConfiguration.encryptionCert = "-----BEGIN CERTIFICATE-----\nMII...u84\n-----END CERTIFICATE-----\n";

  callback(null, user, context);
}
```

### Logout


For information on how to log out the user's session in Auth0, or in both Auth0 and federated identity providers, see:

* [Logout](/logout)

When Auth0 is serving as a SAML Identity Provider, it is necessary to specify a logout callback URL in the Application Addon Settings in order for logout to work.  To do this, go to:

* Auth0 Dashboard -> Apps/APIs -> {Name of Application} -> Addons -> SAML2 WEB APP -> Settings

In the "Settings" field, enter a specification for logout callback URL:

```
"logout": { "callback" : "http://your-callback-goes-here" },
```

### Selecting between multiple Identity Providers (Auth0 connections)

If you have a multi-tenant application, or even a single-tenant application, that needs to select between multiple Identity Providers (Auth0 connections), this is called Home Realm Discovery. This can be done by programmatically specifying the connection in the call which invokes authentication, or by specifying the email domain(s) for each connection in the connection settings, or by adding custom buttons to the Lock widget.

Information on how to do each of these options is at: [Home Realm Discovery](/hrd)

## Customizing SAML assertions (Auth0 as IDP)

The "Configuring Auth0 as a SAML Identity Provider" section above contains information on basic configuration for Auth0 to serve as a SAML Identity Provider.

This section explains how to customize the SAML Assertions and the SAML and WS-Fed protocol parameters when Auth0 is configured to serve as an Identity Provider.


### Via Application Addons

In the Auth0 dashboard, the **""Apps/APIs"** -> **"Settings"** -> **"Addons"** -> **"SAML2WebApp"** -> **"Settings"** tab can be used for several types of customizations, including the following common cases:

* Specifying an audience other than the default Issuer of the SAML request
* Specifying a recipient
* mapping profile attributes to specific attribute statements
* Changing the signature or digest algorithm
* Specifying whether to sign the assertion or the entire response

The tab contains a description of each setting.

### Via Rules

Auth0 rules can also be used to add more extensive or dynamic customizations to the SAML response.  Note that customizations done in Rules will override customizations done in the Apps/APIs Addons tab.

You can customize the SAML Assertion by creating a [rule](/rules) like this:

```js
function (user, context, callback) {
  // change SAML token lifetime to 10 hours
  context.samlConfiguration.lifetimeInSeconds = 36000;

  // if available, use upn as NameID
  if (user.upn) {
    context.samlConfiguration.mappings = {
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": "upn"
    }
  }

  callback(null, user, context);
}
```

To include user_metadata attributes in an assertion, you can create a [rule](/rules) like this:

```js
function (user, context, callback) {
  user.user_metadata = user.user_metadata || {};
  user.user_metadata.color2 = "purple";
  context.samlConfiguration.mappings = {
    //Attribute already in user_metadata
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/color": "user_metadata.color",

    //Attribute dynamically added to user_metadata above
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/color": "user_metadata.color",
  };
  callback(null, user, context);
}
```


### Configuration options

Below are all the customizations you can do and they can be done using either of the above two options.

* __audience (`string`):__ The audience of the SAML Assertion. Default will be the `Issuer` on `SAMLRequest`.
* __recipient (`string`):__ The recipient of the SAML Assertion (SubjectConfirmationData). Default is `AssertionConsumerUrl` on `SAMLRequest` or Callback URL if no SAMLRequest was sent.
* __mappings (`Array`):__ The mappings between Auth0 profile and the output attributes on the SAML Assertion. Default mapping is shown above.
* __createUpnClaim (`bool`):__ Whether or not a UPN claim should be created. Default is `true`.
* __passthroughClaimsWithNoMapping (`bool`):__ If `true` (default), for each claim that is not mapped to the [common profile](/user-profile), Auth0 will passthrough those in the output assertion. If `false`, those claims won't be mapped. Default is `true`.
* __mapUnknownClaimsAsIs (`bool`):__ if `passthroughClaimsWithNoMapping` is `true` and this is `false` (default), for each claim that is not mapped to the [common profile](/user-profile) Auth0 will add a prefix `http://schema.auth0.com`. If `true` it will passthrough the claim as-is. Default is `false`.
* __mapIdentities:__ If `true`, it will add more information in the token like the provider used (google, adfs, ad, etc.) and the `access_token` if available. Default is `true`.
* __signatureAlgorithm:__ Signature algorithm to sign the SAML Assertion or response. Default is `rsa-sha1` and it could be `rsa-sha256`.
* __digestAlgorithm:__ Digest algorithm to calculate digest of the SAML Assertion or response. default `sha1`. It could be `sha256`.
* __destination:__ Destination of the SAML Response. If not specified, it will be `AssertionConsumerUrl` of `SAMLRequest` or Callback URL if there was no SAMLRequest.
* __lifetimeInSeconds (`int`):__ Expiration of the token. Default is `3600` seconds (1 hour).
* __signResponse (`bool`):__ Whether or not the SAML Response should be signed. By default the SAML Assertion will be signed, but not the SAML Response. If `true`, SAML Response will be signed instead of SAML Assertion.
* __nameIdentifierFormat (`string`):__ Default is `urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified`.
* __nameIdentifierProbes (`Array`):__ Auth0 will try each of the attributes of this array in order. If one of them has a value, it will use that for the Subject/NameID. The order is: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier` (mapped from `user_id`), `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress` (mapped from `email`), `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name` (mapped from `name`).


## Design Considerations

### SAML Provisioning

In designing a SAML SSO implementation, it is often helpful to consider which system(s) will serve as authoritative sources for user profile information, what user profile attributes each application will need, and how the user profile information will be distributed to all systems that need it.

#### Auth0 as Service Provider

If Auth0 is serving as the Service Provider in a SAML federation, it does not require any out-of-band process to create user accounts in Auth0 in advance of user authentication.  Auth0 can route authentication requests to an Identity Provider without already having an account pre-created for a specific user. Auth0 will capture user profile information from the assertion returned by the Identity Provider and create a user profile for the user in Auth0.  This is sometimes called Just-In-Time provisioning.

There are several mechanisms available to route a request to an IdP. See: [Selecting the Connection in Auth0](/hrd).

A popular option is specifying e-mail domains as part of the IDP configuration. For example: adding the email domain "companyx.com" to the IDP configuration for company X will result in all users with that email domain being routed to that IDP.

When a user authenticates at an Identity Provider, the user attributes returned by the Identity Provider in the SAML Authentication Assertion will be used to create a user profile for the user in Auth0 at the time of authentication. That user profile will contain the attributes sent by the IDP.

The user profile received by Auth0 will also be relayed to the application.

Note, however, that while Auth0 does not require any process to pre-create accounts in Auth0 prior to user authentication, an application integrated with Auth0 may still require this.  If this is the case, several options exist:

* When a user is created at the Identity Provider, an out-of-band process can create the user in the application or Auth0 and add any user profile attributes needed by the application. After the user is authenticated, if attributes are still missing in the profile, the application can obtain the attributes from the appropriate source and then store these in the Auth0 user profile. Upon next login, those extra attributes will be sent to the application in addition to the Identity Provider's attributes.

* An Auth0 rule can be written to call an API to retrieve any missing information and add it dynamically to the Auth0 profile, which is returned to the application. Rules are executed after successful authentication. Profile attributes can be retrieved each time from a remote source or persisted in the Auth0 profile.

* Auth0 can simply pass the basic user profile information from the Identity Provider to the application and the application can retrieve any missing information from another source to populate a user profile that is local to the application.

In selecting an approach, careful consideration should be given to utilize an appropriate authoritative source for any user profile attributes used for access control.  For example, an Identity Provider may be able to supply basic user profile attributes such as email address, name, and possibly access control groups for a user.  There may, however, be additional administrative functions within the application that are needed to grant application-specific privileges to users.

#### Auth0 as Identity Provider

If Auth0 is serving as the Identity Provider in a SAML federation, user accounts may be created in a variety of ways.

 * Users created in a backend authentication system used by Auth0 such as an LDAP directory, a database, or another SAML Identity Provider.
 * Use of the Auth0 Dashboard by administrators to create users in Auth0
 * Calls to the Auth0 API to create users in Auth0
 * Self-service user signup to create users in Auth0

Once accounts have been created in Auth0, or any authentication system it uses in  a connection, it may be necessary to create an account and user profile for users in an application using Auth0 as an Identity Provider, if the application was written to retrieve user profile information from a local application store.

Several options exist:

 * An out-of-band process can create user profile information in the application.
 * An Auth0 rule that executes on first login could call an application API to create the user profile in the application.
 * The application can be modified to create user profiles dynamically, based on information in the SAML assertion.

In selecting an approach, careful consideration should be given to utilize an appropriate authoritative source for any user profile attributes used for access control.

### Deprovisioning

Deprovisioning of accounts should be done, at minimum, at the Identity Provider.  Once an account is removed or disabled at the Identity Provider, the user will not be able to log in.

It may also be desirable to remove accounts at Auth0 if it is acting as Service Provider or an application integrated with Auth0.  Regardless of whether Auth0 is acting as a Service Provider or an Identity Provider, user accounts can be removed from Auth0 via the Auth0 dashboard or via the Auth0 API.

**NOTE:** The following extension is useful for troubleshooting SAML authentication: [SAML debugger extension for Firefox](https://addons.mozilla.org/en-US/firefox/addon/saml-tracer/).


## SAML options and bindings

Supported SAML options:
* Web Browser SSO Profile
* Single Logout Profile
* Name Identifier Management Profile
* Name Identifier Mapping Profile

Not supported SAML options:
* Enhanced Client and Proxy (ECP) Profile
* Identity Provider Discovery Profile
* Assertion Query/Request Profile
* Artifact Resolution Profile

Supported SAML bindings:
* HTTP Redirect Binding
* HTTP POST Binding

Not supported SAML bindings:
* HTTP Artifact Binding
* SAML SOAP Binding
* Reverse SOAP (PAOS) Binding
* SAML URI Binding
