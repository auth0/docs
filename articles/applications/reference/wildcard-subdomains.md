---
title: Wildcards for Subdomains
description: Describes wildcards for subdomains function in application configuration.
toc: true
topics:
  - applications
contentType: reference
useCase:
  - build-an-app
---
# Wildcards for Subdomains

You can use wildcards for subdomain URL registration in your application configuration in the Dashboard with these fields:

* **Allowed Callback URLs**: Set of URLs to which Auth0 is allowed to redirect users after they authenticate.
* **Allowed Logout URLs**: List of URLs to which you can redirect users after they log out from Auth0.
* **Allowed Origins (CORS)**: Set of URLs that will be allowed to make requests from JavaScript to Auth0 API (typically used with CORS).

::: warning
Avoid using wildcards for subdomains in application callbacks and allowed origins as it can make your application vulnerable to attacks. See [Application Settings Best Practices](/best-practices/application-settings) for this and other recommended settings.
:::

You can use the star symbol (`*`) as a wildcard for subdomains, but it must be used in accordance with the following rules in order to properly function:

* The protocol of the URL **must** be `http:` or `https:`. `com.example.app://*.example.com` will not work.

* The wildcard **must** be located in a subdomain within the hostname component. `https://*.com` will not work.

* The wildcard **must** be located in the subdomain furthest from the root domain. `https://sub.*.example.com` will not work.

* The URL **must not** contain more than one wildcard. `https://*.*.example.com` will not work.

* A wildcard **may** be prefixed and/or suffixed with additional valid hostname characters. `https://prefix-*-suffix.example.com` will work.

* A URL with a valid wildcard **will not** match a URL more than one subdomain level in place of the wildcard. `https://*.example.com` will not work with `https://sub1.sub2.example.com`.
