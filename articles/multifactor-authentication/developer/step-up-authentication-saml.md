---
description: Describes using SAML assertions to perform step-up authentication with Auth0
---

## Step-up Authentication for SAML

With Step-Up Authentication, applications that allow access to different types of resources can require users to authenticate with a stronger authentication mechanism to access sensitive resources.

For example, Fabrikam's Intranet can require users to authenticate with their username and password to access customer data. However, a request for access to employee data (which may contain sensitive salary information) can trigger a stronger authentication mechanism like multifactor authentication.

You can add step-up authentication to your app with Auth0's extensible multifactor authentication support. Your app can verify that the user has logged in using multifactor authentication and, if not, require the user to step-up to access certain resources.

![Step-up flow](/media/articles/mfa/step-up-flow.png)

## Step-up Authentication with Auth0

There are three core concepts used when addressing authentication level at Auth0.

* `RequestedAuthnContext` this element specifies the authentication context requirements of authentication statements returned in response to a request or query. 

* `AuthnContext`: Specifies the context used by the authenticating authority. Contains an authentication context class reference, an authentication context declaration or declaration reference, or both. 

* `AuthnContextClassRef` A URI reference identifying the authentication context class or declaration. It might be used as part of the Request (inside RequestedAuthnContext) to require MFA to be performed and will be included as part of `AuthnContext` in the response to indicate if MFA (in this case) or other context was fulfilled.

## Example
To request that Auth0 require a multifactor authentication, as part of a SAML Request add the field `AuthnContextClassRef` element inside RequestedAuthnContext to the authentication along with the `acr` level desired. The exact configuration steps to add that Element depends on the client tools / libraries you are using. Bellow an example that shows how the SAML Request and response XML will look:

### SAML Request
```xml
<?xml version="1.0" encoding="UTF-8"?>
<samlp:AuthnRequest xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" AssertionConsumerServiceURL="{CONSUMER_CALLBACK}" Destination="{DESTINATION}" ID="{REQUEST_ID}" IssueInstant="2013-04-28T22:43:42.386Z" ProtocolBinding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Version="2.0">

  <saml:Issuer xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion">http://samlp-callback</saml:Issuer>

  <samlp:RequestedAuthnContext Comparison="exact">
    <AuthnContextClassRef>http://schemas.openid.net/pape/policies/2007/06/multi-factor</AuthnContextClassRef>
  </samlp:RequestedAuthnContext>

  <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
    <ds:SignedInfo>
      <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
      <ds:SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
      <ds:Reference URI="#pfx55ee0ca7-7c89-a080-9603-b8261592c952">
        <ds:Transforms>
          <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/></ds:Transforms>
          <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
          <ds:DigestValue>{DIGEST VALUE}</ds:DigestValue>
      </ds:Reference>
    </ds:SignedInfo>
    <ds:SignatureValue>{SIGNATURE}</ds:SignatureValue>
    <ds:KeyInfo>
      <ds:X509Data>
        <ds:X509Certificate>{CERTIFICATE}</ds:X509Certificate>
      </ds:X509Data>
    </ds:KeyInfo>
  </ds:Signature>
</samlp:AuthnRequest>
```

You must notice the `AuthnContextClassRef` element under `RequestedAuthnContext`, the value `http://schemas.openid.net/pape/policies/2007/06/multi-factor` will force Auth0 to request MFA if there is a valid MFA rule that applies to the user. It will ignore browser rememberance and other attributes that could otherwise allow Auth0 to skip the second factor.

### SAML Response
After the user have logged in you will get a SAML Response that will look like:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<saml:Assertion xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion" Version="2.0" ID="{RESPONSE_ID}" IssueInstant="2017-01-17T22:20:03.213Z">
  <saml:Issuer>{ISSUER}</saml:Issuer>
  <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
    ...
  </Signature>

  <saml:Subject>
    <saml:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified">{USER_ID}</saml:NameID>
    ...
  </saml:Subject>

  <saml:Conditions NotBefore="2017-01-17T22:20:03.213Z" NotOnOrAfter="2017-01-17T23:20:03.213Z">
    ...
  </saml:Conditions>

  <saml:AttributeStatement xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    ...
  </saml:AttributeStatement>

  <saml:AuthnStatement AuthnInstant="2017-01-17T22:20:03.213Z" SessionIndex="{SESSION_INDEX}">
    <saml:AuthnContext>
      <saml:AuthnContextClassRef>http://schemas.openid.net/pape/policies/2007/06/multi-factor</saml:AuthnContextClassRef>
    </saml:AuthnContext>
  </saml:AuthnStatement>
</saml:Assertion>
```

Once you get a response, and after validating the signature and all the other security assertions, you must check the value of 
`AuthnContextClassRef`. It will match `http://schemas.openid.net/pape/policies/2007/06/multi-factor` to indicate that MFA was performed. Any other value means that MFA was not performed.

## Further reading

* [SAML Specification](https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf)
