---
title: Litmos SAML Configuration
description: Litmos SAML Configuration
---

${include('./\_header')}

```json
{
 "mappings": {
   "user_id":     "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
   "email":       "Email",
   "given_name":  "FirstName",
   "family_name": "LastName"
 },
 "createUpnClaim":       false,
 "passthroughClaimsWithNoMapping": false,
 "mapUnknownClaimsAsIs": false,
 "mapIdentities":        false,
 "signatureAlgorithm":   "rsa-sha1",
 "digestAlgorithm":      "sha1",
 "destination":          "https://{YOUR DOMAIN}.litmos.com/integration/samllogin",
 "lifetimeInSeconds":    3600,
 "signResponse":         false,
 "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
 "nameIdentifierProbes": [
   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
 ]
}
```

## Application Callback URL

`https://{YOUR DOMAIN}.litmos.com/integration/samllogin`

## Sample SAML

```xml
<samlp:Response xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
                xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
                ID="Rb77e69ab4bdc11758eb4d74e32b0e96c759e31f5"
                Version="2.0"
                IssueInstant="2014-05-08T15:28:51Z"
                Destination="https://{YOUR DOMAIN}.litmos.com/integration/samllogin"
                >
    <saml:Issuer>urn:{tenant}.auth0.com</saml:Issuer>
    <samlp:Status>
        <samlp:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success" />
    </samlp:Status>
    <saml:Assertion xmlns:xs="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    Version="2.0"
                    ID="pfx6bf65a3b-b37f-0347-75bd-0c5f24f32c50"
                    IssueInstant="2014-05-08T15:28:51Z"
                    >
        <saml:Issuer>urn:{tenant}.auth0.com</saml:Issuer>
        <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
            <ds:SignedInfo>
                <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
                <ds:SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1" />
                <ds:Reference URI="#pfx6bf65a3b-b37f-0347-75bd-0c5f24f32c50">
                    <ds:Transforms>
                        <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />
                        <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
                    </ds:Transforms>
                    <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" />
                    <ds:DigestValue>cdFGeW7M8cxg9xEVh/gLxRKlWDA=</ds:DigestValue>
                </ds:Reference>
            </ds:SignedInfo>
            <ds:SignatureValue>*********</ds:SignatureValue>
            <ds:KeyInfo>
                <ds:X509Data>
                    <ds:X509Certificate>*********</ds:X509Certificate>
                </ds:X509Data>
            </ds:KeyInfo>
        </ds:Signature>
        <saml:Subject>
            <saml:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress">brandon@litmos.com</saml:NameID>
            <saml:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
                <saml:SubjectConfirmationData NotOnOrAfter="2014-05-08T15:31:51Z"
                                              Recipient="https://{YOUR DOMAIN}.litmos.com/integration/samllogin"
                                              />
            </saml:SubjectConfirmation>
        </saml:Subject>
        <saml:Conditions NotBefore="2014-05-08T15:25:51Z"
                         NotOnOrAfter="2014-05-08T15:31:51Z"
                         >
            <saml:AudienceRestriction>
                <saml:Audience/>
            </saml:AudienceRestriction>
        </saml:Conditions>
        <saml:AuthnStatement AuthnInstant="2014-05-08T15:28:50Z"
                             SessionNotOnOrAfter="2014-05-09T15:28:51Z"
                             SessionIndex="_5c256210-b8f3-0131-a06f-782bcb56fcaa"
                             >
            <saml:AuthnContext>
                <saml:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport</saml:AuthnContextClassRef>
            </saml:AuthnContext>
        </saml:AuthnStatement>
        <saml:AttributeStatement>
            <saml:Attribute Name="LastName"
                            NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic"
                            >
                <saml:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                                     xsi:type="xs:string"
                                     >Smith</saml:AttributeValue>
            </saml:Attribute>
            <saml:Attribute Name="FirstName"
                            NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic"
                            >
                <saml:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                                     xsi:type="xs:string"
                                     >John</saml:AttributeValue>
            </saml:Attribute>
            <saml:Attribute Name="Email"
                            NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic"
                            >
                <saml:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                                     xsi:type="xs:string"
                                     >john@mail.com</saml:AttributeValue>
            </saml:Attribute>
        </saml:AttributeStatement>
    </saml:Assertion>
</samlp:Response>
```
