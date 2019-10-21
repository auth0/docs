---
description: How to customize SAML assertions
topics:
  - saml
  - saml-assertions
contentType:
  - how-to
useCase:
  - add-idp
---

# Customize SAML Assertions

You can customize your <dfn data-key="security-assertion-markup-language">SAML</dfn> assertions, as well as the SAML and WS-Fed protocol parameters.

## Auth0 as the Identity Provider

To customize your SAML assertions when Auth0 acts as the identity provider, you can do so by configuring the addon itself or using [rules](/rules).

### Use the Application Addon

To customize your SAML assertion using the application add-on, navigate to [Applications > Settings > Addons](${manage_url}/#/applications/${account.clientId}/addons). Click on **SAML2 Web App** to launch the *Settings* tab that allows you to make several types of customizations including:

* Specifying an audience other than the default issuer of the SAML request;
* Specifying a recipient;
* Mapping profile attributes to specific attribute statements;
* Changing the signature or digest algorithm;
* Specifying whether just the assertion or the entire response should be signed.

### Use Rules

You can use rules to add more extensive or dynamic customizations to the SAML response.

Customizations done in Rules override customizations done using the Application Addons tab.

#### Example: Changing the SAML Token Lifetime and Using UPN as NameID

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

#### Example: Include `user_metadata` Attributes in an Assertion

```js
function (user, context, callback) {
  user.user_metadata = user.user_metadata || {};
  user.user_metadata.color = "purple";
  context.samlConfiguration.mappings = {
    //Attribute already in user_metadata
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/color": "user_metadata.color",

    //Attribute dynamically added to user_metadata above
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/color": "user_metadata.color",
  };
  callback(null, user, context);
}
```

## Configuration Options

The following is a list of customization options for your SAML assertions.

* **audience** (string): The audience of the SAML Assertion. Default will be the Issuer on SAMLRequest.

* **recipient** (string): The recipient of the SAML Assertion (SubjectConfirmationData). Default is `AssertionConsumerUrl` on SAMLRequest or Callback URL if no SAMLRequest was sent.

* **mappings** (Object): The mappings between Auth0 profile and the output attributes on the SAML Assertion. Default mapping is shown above.

* **createUpnClaim** (bool): Whether or not a UPN claim should be created. Default is true.

* **passthroughClaimsWithNoMapping** (bool): If true (default), for each claim that is not mapped to the common profile, Auth0 will passthrough those in the output assertion. If false, those claims won't be mapped. Default is true.

* **mapUnknownClaimsAsIs** (bool): if `passthroughClaimsWithNoMapping` is true and this is false (default), for each claim that is not mapped to the common profile Auth0 will add a prefix `http://schema.auth0.com`. If true it will passthrough the claim as-is. Default is false.

* **mapIdentities**: If true, it will will add more information in the token like the provider used (google, adfs, ad, and so on) and the <dfn data-key="access-token">Access Token</dfn> if available. Default is true.

* **signatureAlgorithm**: Signature algorithm to sign the SAML Assertion or response. Default is `rsa-sha1` and it could be `rsa-sha256`.

* **digestAlgorithm**: Digest algorithm to calculate digest of the SAML Assertion or response. Default is `sha1` and it could be `sha256`.

* **destination**: Destination of the SAML Response. If not specified, it will be `AssertionConsumerUrl` of SAMLRequest or Callback URL if there was no SAMLRequest.

* **lifetimeInSeconds** (int): Expiration of the token. Default is 3600 seconds (1 hour).

* **signResponse** (bool): Whether or not the SAML Response should be signed. By default the SAML Assertion will be signed, but not the SAML Response. If true, SAML Response will be signed instead of SAML Assertion.

* **nameIdentifierFormat** (string): Default is `urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified`.

* **nameIdentifierProbes** (Array): Auth0 will try each of the attributes of this array in order. If one of them has a value, it will use that for the Subject/NameID. The order is: http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier (mapped from user_id), http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress (mapped from email), http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name (mapped from name).

* **authnContextClassRef**: Default is `urn:oasis:names:tc:SAML:2.0:ac:classes:unspecified`.

* **typedAttributes**: Default is true. When set to true, we infer the xs:type of the element. Types are `xs:string`, `xs:boolean`, `xs:double `and `xs:anyType`. When set to false all `xs:type` are `xs:anyType`

* **includeAttributeNameFormat**: Default is true. When set to `true`, we infer the NameFormat based on the attribute name. NameFormat values are `urn:oasis:names:tc:SAML:2.0:attrname-format:uri`, `urn:oasis:names:tc:SAML:2.0:attrname-format:basic` and `urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified`. If set to `false`, the attribute NameFormat is not set in the assertion
