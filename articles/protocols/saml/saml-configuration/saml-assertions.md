---
  description: How to customize your SAML assertions when using Auth0 as the identity provider
---

# Customize SAML Assertions

If you're using Auth0 as the identity provider, you can customize your SAML assertions and the WS-Federation protocol parameters.

## Settings

The following settings are available to you regardless of the method you choose to use to customize your SAML assertions/WS-Federation protocol parameters.

* **audience** (string): The audience of the SAML Assertion. Default will be the Issuer on SAMLRequest.
* **recipient** (string): The recipient of the SAML Assertion (SubjectConfirmationData). Default is AssertionConsumerUrl on SAMLRequest or Callback URL if no SAMLRequest was sent.
* **mappings** (Array): The mappings between Auth0 profile and the output attributes on the SAML Assertion. Default mapping is shown above.
* **createUpnClaim** (bool): Whether or not a UPN claim should be created. Default is true.
* **passthroughClaimsWithNoMapping** (bool): If true (default), for each claim that is not mapped to the common profile, Auth0 will passthrough those in the output assertion. If false, those claims won't be mapped. Default is true.
* **mapUnknownClaimsAsIs** (bool): if passthroughClaimsWithNoMapping is true and this is false (default), for each claim that is not mapped to the common profile Auth0 will add a prefix http://schema.auth0.com. If true it will passthrough the claim as-is. Default is false.
* **mapIdentities**: If true, it will will add more information in the token like the provider used (google, adfs, ad, etc.) and the access_token if available. Default is true.
* **signatureAlgorithm**: Signature algorithm to sign the SAML Assertion or response. Default is rsa-sha1 and it could be rsa-sha256.
* **digestAlgorithm**: Digest algorithm to calculate digest of the SAML Assertion or response. default sha1. It could be sha256.
* **destination**: Destination of the SAML Response. If not specified, it will be AssertionConsumerUrl of SAMLRequest or Callback URL if there was no SAMLRequest.
* **lifetimeInSeconds** (int): Expiration of the token. Default is 3600 seconds (1 hour).
* **signResponse** (bool): Whether or not the SAML Response should be signed. By default the SAML Assertion will be signed, but not the SAML Response. If true, SAML Response will be signed instead of SAML Assertion.
* **nameIdentifierFormat** (string): Default is urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified.
* **nameIdentifierProbes** (Array): Auth0 will try each of the attributes of this array in order. If one of them has a value, it will use that for the Subject/NameID. The order is: http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier (mapped from user_id), http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress (mapped from email), http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name (mapped from name).
* **authnContextClassRef**: Default is urn:oasis:names:tc:SAML:2.0:ac:classes:unspecified.
* **typedAttributes**: Default is true. When set to true, we infer the xs:type of the element. Types are xs:string, xs:boolean, xs:double and xs:anyType. When set to false all xs:type are xs:anyType
* **includeAttributeNameFormat**: Default is true. When set to try, we infer the NameFormat based on the attribute name. NameFormat values are urn:oasis:names:tc:SAML:2.0:attrname-format:uri, urn:oasis:names:tc:SAML:2.0:attrname-format:basic and urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified. If set to false, the attribute NameFormat is not set in the assertion

## Customize via Client Addons

You can customize your SAML assertions via the **Settings** editor of the Client's Addon configuration screen:

1. Log into the [Management Dashboard](${manage_url})
2. Navigate to your [Client's Addons page](${manage_url}/#/clients/${account.clientId}/addons).
3. Click to open the **SAML2 Web App** addon.
4. In the **Settings** editor, make the appropriate changes. **Save** to persist.

You can make many types of customizations, including:

* Specifying the audience of the SAML request if it's not the default issuer;
* Specifying the recipient;
* Mapping attribute statements to profile attributes;
* Changing the signature or digest algorithm;
* Specifying whether you want to sign just the assertion or the entire response.

## Customize via Rules

You can use [rules](/rules) to add more extensive or dynamic customizations to the SAML response.

:::panel-warning Overriding Settings
Customizations done via Rules override those done in the Addon configuration tab.
:::

You can customize the SAML assertion using a rule similar to the following:

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

You might also want to do something like including `user_metadata` in the assertion:

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
