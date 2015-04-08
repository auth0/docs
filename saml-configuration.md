# SAML

In a SAML federation there is a Service Provider and an Identity Provider.  The Service Provider agrees to trust the Identity Provider to authenticate users.  The Identity Provider authenticates users and provides to Service Providers an Authentication Assertion that indicates a user has been authenticated.

Auth0 supports the SAML protocol and can serve in either a SAML Service Provider (SP) role, a SAML Identity Provider (IDP) role, or both.


### SAML Identity Provider

Some Applications, such as Salesforce, Box, Workday, can be configured to allow users to authenticate against an external Identity Provider using the SAML protocol.  Such applications can be integrated with Auth0 and in this case Auth0 will serve as the SAML IDP for the application.  

Users of the application will be redirected to Auth0 to log in, and Auth0 can authenticate them using any backend authentication connection, such as an LDAP directory, a database, or even other SAML IDPs or Social Providers.  Once the user is authenticated, Auth0 will return a SAML assertion to the application indicating that the user has been successfully authenticated.

![](https://cdn.auth0.com/docs/img/saml-case2.png)

### SAML Service Provider

Other applications, especially custom applications, may externalize authentication against an external Identity Provider using a protocol such as OpenID Connect or OAuth2.  In such cases, even though the application was written to utilize the OpenID Connect or OAuth2 protocol, it may be desirable to leverage an enterprise SAML provider for authentication.  

In this situation, Auth0 will receive an authentication request from the application using the OpenID Connect or OAuth2 protocol, and Auth0 will translate the request into a SAML Authentication Request and send it on to a SAML Identity Provider.  In this case, Auth0 serves as a SAML Service Provider in the federation with the Identity Provider.

![](https://cdn.auth0.com/docs/img/saml-case1.png)

### SAML Service Provider and Identity Provider

Auth0 can also serve as an authentication hub between applications making a SAML request and backend SAML Identity Providers.  In this case, Auth0 would serve as a SAML Identity Provider to the applications, and it would also serve as a SAML Service Provider to backend SAML Identity Providers.  This use case is advantageous when applications need to support multiple backend Identity Providers.

![](https://cdn.auth0.com/docs/img/saml-case3.png)  

## Configuring Auth0 as a Service Provider

If Auth0 will serve as a SAML Service Provider, an Auth0 Connection is used to configure the Auth0 side (Service Provider) of each SAML federation. 

There are instructions for several specific providers below: 

* [ADFS](@@env.BASE_URL@@/adfs)
* [Okta](@@env.BASE_URL@@/okta)
* [OneLogin](@@env.BASE_URL@@/onelogin)
* [Ping7](@@env.BASE_URL@@/ping7)
* [SiteMinder](@@env.BASE_URL@@/siteminder)
* [SSOCircle](@@env.BASE_URL@@/ssocircle)

Auth0 can be configured as a Service Provider to any other SAML-compliant Identity Provider using the following generic instructions:

* [Generic Service Provider Configuration](@@env.BASE_URL@@/saml-sp-generic)


## Configuring Auth0 as a SAML Identity Provider

Configuring Auth0 to serve as a SAML Identity Provider is done in a couple different places, depending on the type of application.

For some Third Party applications that support SAML, the Auth0 side of the configuration is done using the "Third Party Apps" link in the dashboard, clicking on the "NEW THIRD PARTY APP" button, and selecting the specific application.  Instructions specific to the chosen application are provided.

* [Third Party SAML Web Apps](@@env.BASE_URL@@/saml2webapp-tutorial)


For any application not listed on the "Third Party Apps" page, (click NEW THIRD PARTY APP button to see the list) the Auth0 side of the configuration can be done using the "Apps/APIs" link and then clicking on the "Addons" tab for the particular application, and clicking on the toggle in the "SAML2 WEB APP" box.   

Generic instructions for configuring Auth0 as an IDP:

* [Generic Identity Provider Configuration](@@env.BASE_URL@@/saml-idp-generic)

The SAML2 Web App screen ("Settings" tab) can be used to specify various SAML parameters for the SAML Authentication Response.  Third Party Applications that require special settings are documented at: 

* [SAML settings needed for some Third Party Apps](@@env.BASE_URL@@/saml-apps)


Once Auth0 has been configured to serve as a SAML Identity Provider to client applications, it needs a way to authenticate users.  It can use any of the supported connection types for this.  Auth0 can authenticate users against ldap directories, databases, other SAML Identity Providers or even Social providers and once a user is authenticated, Auth0 can translate the authentication result into a SAML Authentication Assertion to send back to the application client.

## Configuration Auth0 as both Service Provider and Identity Provider

In this situation, there are two federations to configure.  The federation between the application and Auth0 will follow the instructions above for Configuring Auth0 as an Identity Provider.   The federation between Auth0 and any backend SAML Identity providers would follow the instructions for Configuring Auth0 as a Service Provider.

A different, but similar, use case is setting up one Auth0 account to serve as a SAML Service Provider and then setting up a second Auth0 account to serve as a SAML Identity Provider for the first account.  This configuration would typically just be used for testing purposes.  The steps to set this up are described in:

[Auth0 as Identity Provider for itself](@@env.BASE_URL@@/samlsso-auth0-to-auth0)

## Some SAML-compliant Identity Providers

  
A list of [Identity Providers](@@env.BASE_URL@@/samlp-providers) that are believed to be SAML compliant.

## Customizing SAML assertions (Auth0 as IDP)

The "Configuring Auth0 as a SAML Identity Provider" section above contains information on basic configuration for Auth0 to serve as a SAML Identity Provider.
 
This section explains how to customize the SAML Assertions and the SAML and WS-Fed protocol parameters when Auth0 is configured to serve as an Identity Provider.

You can customize the SAML Assertion by creating a [rule](rules) like this:

    function (user, context, callback) {
      // change SAML token lifetime to 10 hours
      context.samlConfiguration.lifetimeInSeconds = 36000;
      
      // if available, use upn as NameID
      if (user.upn) {    
        context.samlConfiguration.mappings = {
           "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": "upn"
        }
      }

      callback(null, user, context)
    }


### Configuration options

Below are all the customizations you can do:

* __audience (`string`):__ The audience of the SAML Assertion. Default will be the `Issuer` on `SAMLRequest`.
* __recipient (`string`):__ The recipient of the SAML Assertion (SubjectConfirmationData). Default is `AssertionConsumerUrl` on `SAMLRequest` or Callback URL if no SAMLRequest was sent.
* __mappings (`Array`):__ The mappings between Auth0 profile and the output attributes on the SAML Assertion. Default mapping is shown above.
* __createUpnClaim (`bool`):__ Whether or not a UPN claim should be created. Default is `true`.
* __passthroughClaimsWithNoMapping (`bool`):__ If `true` (default), for each claim that is not mapped to the [common profile](user-profile), Auth0 will passthrough those in the output assertion. If `false`, those claims won't be mapped. Default is `true`.
* __mapUnknownClaimsAsIs (`bool`):__ if `passthroughClaimsWithNoMapping` is `true` and this is `false` (default), for each claim that is not mapped to the [common profile](user-profile) Auth0 will add a prefix `http://schema.auth0.com`. If `true` it will passthrough the claim as-is. Default is `false`.
* __mapIdentities:__ If `true`, it will will add more information in the token like the provider used (google, adfs, ad, etc.) and the `access_token` if available. Default is `true`.
* __signatureAlgorithm:__ Signature algorithm to sign the SAML Assertion or response. Default is `rsa-sha1` and it could be `rsa-sha256`.
* __digestAlgorithm:__ Digest algorithm to calculate digest of the SAML Assertion or response. default `sha1`. It could be `sha256`.
* __destination:__ Destination of the SAML Response. If not specified, it will be `AssertionConsumerUrl` of `SAMLRequest` or Callback URL if there was no SAMLRequest.
* __lifetimeInSeconds (`int`):__ Expiration of the token. Default is `3600` seconds (1 hour). 
* __signResponse (`bool`):__ Whether or not the SAML Response should be signed. By default the SAML Assertion will be signed, but not the SAML Response. If `true`, SAML Response will be signed instead of SAML Assertion.
* __nameIdentifierFormat (`string`):__ Default is `urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified`.
* __nameIdentifierProbes (`Array`):__ Auth0 will try each of the attributes of this array in order. If one of them has a value, it will use that for the Subject/NameID. The order is: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier` (mapped from `user_id`), `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress` (mapped from `email`), `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name` (mapped from `name`).



