---
title: Redirect URI Supported Wildcard Formats
description: Describes a comprehensive list of all supported formats and the validation rules enforced to ensure that there is no wildcard vulnerability in redirect URIs.
topics:
  - users
  - user-management
  - state-parameter
  - redirection
contentType: how-to
useCase: manage-users
---
# Redirect URI Supported Wildcard Formats

In order to prevent security vulnerability caused by wildcards in redirect URIs, Auth0 enforces validation for what you can register. 

| Format | Allowed Callback URL | Allowed Logout URLs (app and tenant) | Allowed Web Origins | Allowed Origins (CORS) |
| -- | -- | -- | -- | -- |
| [Subdomain level wildcards](#subdomain-level-wildcards) | Applies | Applies | Does not apply | Applies |
| [Native app port wildcards](#native-app-port-wildcards) | Applies | Applies | Does not apply | Does not apply | 
| [Custom schemes](#custom-schemes) | Applies | Applies | Does not apply | Does not apply |

## Format requirements

### Subdomain level wildcards

* The protocol **MUST** be `http:` or `https:`. For example: `com.ios.bundle://*.my-ios.bundle` is not allowed.
* The wildcard **MUST** be at the hostname level (cannot be contained in the path or query components of the URI). For example: `https://*.example.com`.
* A URI **MUST NOT** contain more than a single wildcard. For example: `https://*.*.example.com` is not allowed.
* A wildcard **MAY** be prefixed/suffixed with valid hostname characters. For example: `https://auth0-manhattan-pr-*.herokuapp.com`, `https://*-dev.elasticbeanstalk.com`, `https://prefix-*-suffix.example.com`.
* A complete subdomain wildcard **MUST NOT** match a known Public Suffix Domain. For example: `https://*.herokuapp.com`, `https://*.uk`.
* A wildcard **MUST NOT** match an IPv4/v6 address. For example: `https://79.*.148.30` where `*` might evaluate to an integer in a valid IP range
* A wildcard **MUST** evaluate to a non-empty string

### Native app port wildcards

* Application type **MUST** be native. 
* The protocol **MUST** be `http:`. For example: `com.ios.bundle://my-ios.bundle:0` is not allowed. 
* Port wildcards **MUST** be used with a loopback address only: `http + loopback + port?`. For example: `http://localhost:0` and `http://127.0.0.1:0/callback`. 

See [OAuth 2.0 for Native Apps: Loopback Interface Redirection](https://tools.ietf.org/html/bcp212#section-7.3) specification for details.

### Custom schemes

* Custom schemes **MUST** contain at least a single period character (`.`) in the scheme. This is to protect against collisions with private use schemes such as `mailto:, file:`. For example: `com.example.app:/my-bundle`. 
* A custom scheme **SHOULD** be based on a domain name under the customer's control, expressed in reverse order. This is `com.example.app:/my-bundle`.

See [OAuth 2.0 for Native Apps: Private-Use URI Scheme Redirection](https://tools.ietf.org/html/bcp212#section-7.1).

## Redirect URI restrictions

* Fragments will not be allowed in registration of URIs. For example: `https://example.com#fragment=true` and `https://tools.ietf.org/html/rfc6749`.

* Query string and path components are evaluated as an exact match if a URI is registered with such components. 

* If the URL fails to parse with native Node.js URL module, it will be considered an invalid URL under the [WHATWG URL Standard](https://url.spec.whatwg.org/) and rejected from registration. For example: `https://#$%.example.com`.