---
url: /saml-apps
---

# SAML Configurations for 3rd party apps

##Google Apps

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
"nameIdentifierFormat": "urn:oasis:names:tc:SAML:2.0:nameid-format:email",
"nameIdentifierProbes": [
"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
],
}
```
**Callback URL**: `https://www.google.com/a/{YOUR-GOOGLE-DOMAIN}/acs`

---

##Litmos

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

**Callback URL**: `https://{YOUR DOMAIN}.litmos.com/integration/samllogin`

---

##Cisco WebEx

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

---

##SproutVideo

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
**Callback URL**: `https://{YOUR SPROUT VIDEO ACCOUNT}.vids.io`

---

##FreshDesk

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

**Callback URL**: `https://{FD Domain}.freshdesk.com/login/saml`

---
