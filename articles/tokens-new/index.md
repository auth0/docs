---
title: Tokens
description: Learn about the types of tokens referenced in Auth0, what each is used for, and how to use it.
classes: topic-page
topics:
  - tokens
  - jwt
contentType:
  - reference
useCase:
  - tokens
---
# Tokens

Auth0 uses two formats for tokens:

* **JSON Web Tokens (JWTs)**: Tokens that conform to the [JSON Web Token](/tokens/concepts/jwts) standard and contain information about an entity in the form of claims. They are self-contained in that it is not necessary for the recipient to call a server to validate the token.
* **Opaque Tokens**: Tokens in a proprietary format that typically contain some identifier to information in a server’s persistent storage. To validate an opaque token, the recipient of the token needs to call the server that issued the token.

There are five primary tokens used in Auth0's token-based authentication scenarios:

<%= include('../_includes/_topic-links', { links: [
  'tokens/concepts/id-tokens',
  'tokens/concepts/access-tokens',
  'tokens/concepts/idp-access-tokens',
  'tokens/concepts/refresh-tokens',
  'api/v2/tokens'
] }) %>
