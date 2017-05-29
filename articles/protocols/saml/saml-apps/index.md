---
description: This page lists SAML Configurations for various SSO integrations including Google Apps, Hosted Graphite, Litmos, Cisco Webex, Sprout Video, FreshDesk, Tableau Server, Datadog, Egencia, Workday and Pluralsight.
toc: true
---

# SAML Configurations for SSO Integrations

## Google Apps

```
{
  "audience": "https://www.google.com/a/{YOUR-GOOGLE-DOMAIN}/acs",
  "mappings": {
    "nickname": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
  },
  "createUpnClaim": false,
  "passthroughClaimsWithNoMapping": false,
  "mapUnknownClaimsAsIs": false,
  "mapIdentities": false,
  "signatureAlgorithm": "rsa-sha256",
  "digestAlgorithm": "sha256",
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:2.0:nameid-format:email",
  "nameIdentifierProbes": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
  ],
}
```

The **Callback URL** is `https://www.google.com/a/{YOUR-GOOGLE-DOMAIN}/acs`.

## Hosted Graphite

```
{
  "audience": "https://www.hostedgraphite.com/metadata/{YOUR-USER-ID}/",
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
  "nameIdentifierProbes": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
  ]
}
```

The **Callback URL** is `https://www.hostedgraphite.com/complete/saml/{YOUR-USER-ID}/`.

## Litmos

```
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

The **Callback URL** is `https://{YOUR DOMAIN}.litmos.com/integration/samllogin`.

## Cisco WebEx

```
{
   "mappings": {
     "email": ["email", "uid", "Name_ID"]
   },
  "createUpnClaim":       false,
  "passthroughClaimsWithNoMapping": false,
  "mapUnknownClaimsAsIs": false,
  "mapIdentities":        false,
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
  "nameIdentifierProbes": [
     "email",
   ]
}
```

## SproutVideo

```
{
 "audience":  "https://{YOUR SPROUT VIDEO ACCOUNT}.vids.io",
 "mappings": {
       "user_id":     "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
       "email":       "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
 },
 "createUpnClaim":       false,
 "passthroughClaimsWithNoMapping": false,
 "mapUnknownClaimsAsIs": false,
 "mapIdentities":        false,
 "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
 "nameIdentifierProbes": [
   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
 ],
}
```

The **Callback URL** is `https://{YOUR SPROUT VIDEO ACCOUNT}.vids.io`.

## FreshDesk

```
{
   "audience": "https://{FD Domain}.freshdesk.com",
   "mappings": {
     "email":       "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
     "given_name":  "User.FirstName",
     "family_name": "User.LastName",
   },
   "createUpnClaim":       false,
   "passthroughClaimsWithNoMapping": false,
   "mapUnknownClaimsAsIs": false,
   "mapIdentities":        false,
   "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
   "nameIdentifierProbes": [
     "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
   ]
}
```

The **Callback URL** is `https://{FD Domain}.freshdesk.com/login/saml`.

## Tableau Server

```
{
 "audience":  "{YOUR TABLEAU AUDIENCE}",
 "recipient": "http://{YOUR TABLEAU SERVER}/wg/saml/SSO/index.html",
 "mappings": {
    "email": "username"
 },
 "createUpnClaim":       false,
 "passthroughClaimsWithNoMapping": false,
 "mapUnknownClaimsAsIs": false,
 "mapIdentities":        false,
 "signatureAlgorithm":   "rsa-sha1",
 "digestAlgorithm":      "sha1",
 "destination":          "http://{YOUR TABLEAU SERVER}/wg/saml/SSO/index.html",
 "lifetimeInSeconds":    3600,
 "signResponse":         false,
 "nameIdentifierFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:basic",
 "nameIdentifierProbes": [
   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
 ]
}
```

The **Callback URL** is `http://{YOUR TABLEAU SERVER}/wg/saml/SSO/index.html`.

## Datadog

```
{
  "audience": "https://app.datadoghq.com/account/saml/metadata.xml",
   "mappings": {
   },
   "createUpnClaim":       false,
   "passthroughClaimsWithNoMapping": false,
   "mapUnknownClaimsAsIs": false,
   "mapIdentities":        false,
   "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
   "nameIdentifierProbes": [
     "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
   ],
}
```

The **Callback URL** is `https://app.datadoghq.com/account/saml/assertion`.

Notice that Datadog has an option to automatically provision new users. Check [here](http://docs.datadoghq.com/guides/saml/) for more details.

## Egencia

```json
{
  "audience": "https://{YOUR_ACCOUNT_NAME}.egencia.com",
   "mappings": {
   },
   "createUpnClaim":       false,
   "passthroughClaimsWithNoMapping": false,
   "mapUnknownClaimsAsIs": false,
   "mapIdentities":        false,
   "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
   "nameIdentifierProbes": [
     "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
   ],
}
```

The **Callback URL** is `https://www.egencia.com/auth/v1/artifactConsumer`.

## Workday

```
{
  "audience": "http://www.workday.com",
  "recipient": "https://www.myworkday.com/<tenant>/login-saml.htmld",
  "mappings": {
  },
  "createUpnClaim":       false,
  "passthroughClaimsWithNoMapping": false,
  "mapUnknownClaimsAsIs": false,
  "mapIdentities":        false,
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:X509SubjectName",
  "nameIdentifierProbes": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
  ],
  "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:X509",
}
```

The **Callback URL** is `https://impl.workday.com/<tenant>/fx/home.flex`.

## Pluralsight

```
{
  "audience":  "www.pluralsight.com",
  "mappings": {
    "user_id":     "id",
    "email":       "email",
    "given_name":  "firstName",
    "family_name": "lastName"
  },
  "createUpnClaim":       false,
  "passthroughClaimsWithNoMapping": false,
  "mapUnknownClaimsAsIs": false,
  "mapIdentities":        false,
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
  "nameIdentifierProbes": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
  ]
}
```

The **Callback URL** is `https://prod-pf.pluralsight.com/sp/ACS.saml2`.

## Eloqua (Oracle Eloqua Marketing Cloud)

```
{
"audience": "<Service Provider Entity Url from within Eloqua>",
 "recipient": "https://login.eloqua.com/auth/saml2/acs",
   "mappings": {
    "user_id": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
    "email": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
    "name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
   },
 "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
 "nameIdentifierProbes": [
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ],
 "destination": "https://login.eloqua.com/auth/saml2/acs"
  }

```

The **Callback URL** is `https://login.eloqua.com/auth/saml2/acs`.

::: note
The Service Provider Entity URL copied from within the IDP settings in Eloqua to set the audience restriction within Auth0.
:::
