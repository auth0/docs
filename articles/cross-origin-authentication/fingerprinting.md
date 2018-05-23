---
title: Fingerprinting of Username + Password Login Requests
description: An explanation of the technique used to mitigate CSRF attacks for cross-origin authentication requests.
tags:
    - cors
    - fingerprinting
---
# Fingerprinting of Username + Password Login Requests

Auth0 has announced a [vulnerability](https://auth0.com/blog/managing-and-mitigating-security-vulnerabilities-at-auth0/) in all versions of Lock (<11) and auth0.js (<9). We strongly recommend that all users of legacy versions migrate to the newest, most secure versions immediately. Support for conducting logins with a username and password with these versions is now end of life and deprecated versions will stop working on **July 16th, 2018**.

* [Migration Guide for Lock v11](/libraries/lock/v11/migration-guide)
* [Migration Guide for Auth0.js](/libraries/auth0js/v9/migration-guide)

To help customers reduce their risk before the July 16th deadline a mitigation has been applied to Auth0 server requests from the deprecated versions of Lock and Auth0.js. This is not a full fix, but it does increase the complexity required for an attacker to exploit the vulnerability.

Auth0 performs “fingerprinting” on each request to the vulnerable endpoints. This enables Auth0 to compare the original request with subsequent ones. Requests which do not pass this fingerprinting validation are rejected with the following error: 

```json
"type": "f",
"description": "Unable to verify transaction consistency"
```

Note that getting this error does not mean that an attack occurred, but merely that the request did not pass the fingerprinting validation. If this error occurs, you may wish to prompt users to retry authentication. If fingerprinting validation issues persist, the only definitive solution is to migrate to the latest version of Lock / Auth0.js.

This feature allows applications which have been unable to update to have more time to do so with less risk, but the requirement to migrate away from these deprecated library versions still stands, and the Removal of Service date for those deprecated library versions is **July 16, 2018**.
