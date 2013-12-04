# SAML

Auth0 supports SAML protocol (used by apps like Salesforce, Box, etc.), WS-Federation protocol (used by apps like SharePoint, CRM, etc.) and the OAuth2/OpenID Connect protocol (used by custom developed applications). This document explains how to customize the SAML Assertions and the SAML and WS-Fed protocol parameters.

By default, Auth0 will generate a SAML Assertion following certain conventions. However, you can customize everything by creating a [rule](rules) like this:

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

Below all the customizations you can do:

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
