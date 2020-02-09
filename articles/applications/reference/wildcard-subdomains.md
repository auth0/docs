---
title: Wildcard for Subdomains
description: Learn how using a wildcard for subdomains can function in application configuration.
toc: true
topics:
  - applications
contentType: reference
useCase:
  - build-an-app
---
# Wildcard for Subdomains

Several fields in [Application Settings](/dashboard/reference/settings-application) allow for use of wildcards for subdomains for convenient registration of URLs:
 
* **Allowed Callback URLs**: Set of URLs to which Auth0 is allowed to redirect users after they authenticate.
* **Allowed Logout URLs**: List of URLs to which you can redirect users after they log out from Auth0.
* **Allowed Origins (CORS)**: Set of URLs that will be allowed to make requests from JavaScript to Auth0 API (typically used with CORS).

You can use the star symbol (`*`) as a wildcard for subdomains, but it must be used in accordance with the following rules in order to properly function.

## Notes on Wildcard Usage

* The protocol of the URL **MUST** be `http:` or `https:`. `com.example.app://*.example.com` will not work.

* The wildcard **MUST** be located within the hostname component of the URL. Star symbols (`*`) located outside of the hostname, such as in the path or query, will not be treated as wildcards. `https://example.com/*` will not be treated as having a wildcard.

* The wildcard **MUST** be located in a subdomain within the hostname component. `https://*.com` will not work.

* The wildcard **MUST** be located in the subdomain furthest from the root domain. `https://sub.*.example.com` will not work.

* The URL **MUST NOT** contain more than one wildcard. `https://*.*.example.com` will not work.

* A wildcard **MAY** be prefixed and/or suffixed with additional valid hostname characters. `https://prefix-*-suffix.example.com` will work.

* A URL with a valid wildcard **WILL** match a URL with no subdomain at the same level as the wildcard. `https://*.example.com` will work with `https://example.com`.

* A URL with a valid wildcard **WILL NOT** match a URL more than one subdomain level in place of the wildcard. `https://*.example.com` will not work with `https://sub1.sub2.example.com`.
