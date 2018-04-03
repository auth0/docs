---
title: Fingerprinting of Cross-Origin Authentication Requests
description: An explanation of the technique used to mitigate CSRF attacks for cross-origin authentication requests.
---
# Fingerprinting of Cross-Origin Authentication Requests

For users of the [deprecated versions of Lock and Auth0.js](/migrations#introducing-lock-v11-and-auth0-js-v9), cross-origin authentication carries with it an intrinsic risk of CSRF attacks. This is why Auth0 strongly recommends that all users of legacy versions migrate to the newest, most secure versions immediately. If the new versions do not match your needs, the recommendation is that you use universal login instead.

* [Migration Guide for Lock v11](/libraries/lock/v11/migration-guide)
* [Migration Guide for Auth0.js](/libraries/auth0js/v9/migration-guide)
* [Migration Guide for Universal Login](/guides/login/migration-embedded-universal)

Failing that, an improvement has been made to the cross-origin authentication process for users of deprecated versions of Lock and Auth0.js, which will **help mitigate** CSRF attacks, but is **in no way a preventative measure against CSRF**. It simply lowers the amount of risk involved with using the legacy endpoints with respect to CSRF threats.

This feature, called "Fingerprinting", is a method by which Auth0 compares the original request with subsequent ones, in an attempt to determine whether a CSRF attack is taking place. Requests which do not pass this fingerprinting validation are rejected with the following error: 

```
"type": "f",
"description": "Unable to verify transaction consistency"
```

Note that getting this error does not mean that a CSRF attack was caught, but merely that the request did not pass the fingerprinting validation. 

This feature allows applications which have been unable to update to have more time to do so with less risk, but the requirement to migrate away from these deprecated library versions still stands, and the Removal of Service date for those deprecated library versions is **July 16, 2018**.