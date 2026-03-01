---
title: Create Namespaced Custom Claims
description: Learn about creating collision-resistant names for custom claims by using namespacing.
toc: false
topics:
  - tokens
  - jwt
  - claims
contentType:
  - concept
useCase:
  - invoke-api
  - secure-api
---
# Create Namespaced Custom Claims

To keep your custom claims from colliding with any [reserved claims](/tokens/concepts/jwt-claims#reserved-claims) or claims from other resources, you must give them a globally unique name using a namespaced format.

<%= include('../../_includes/_enforce-claim-namespacing') %>

Namespaces are arbitrary identifiers, so technically you can call your namespace anything you want. However, using the URI of a resource you control is conventional (following the way XML namespaces are defined).

Example namespace:
`http://www.myexample.com/`

Because a URI must be unique and because this URI is under your control, you can generally avoid the risk that someone else is using the same namespace. You can also optionally store the definition of your namespace at the URI, making your namespace self-documenting.

## Guidelines

* Any non-Auth0 `HTTP` or `HTTPS` URL can be used as a namespace identifier. Auth0 domains, which cannot be used as namespace identifiers, include: `auth0.com`, `webtask.io`, and `webtask.run`.

* Although ideally you will use a URI that you control, the namespace URI does not have to point to an actual resource. It is only being used as an identifier; it will not be called.

* You can use any number of namespaces.

## Add a namespace to a claim

Once you have chosen your namespace, you append the claim to it to create a namespaced claim, which can be added to a token.

Example namespaced claim:
`http://www.myexample.com/favorite_color`

For an example showing how to add custom claims to a token, see [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases#add-custom-claims-to-a-token).

## Read more

* [JSON Web Token Claims](/tokens/concepts/jwt-claims)
* [OpenID Connect Scopes: Standard Claims](/scopes/current/oidc-scopes#standard-claims)
* [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases)