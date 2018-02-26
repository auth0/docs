By default, your API uses RS256 as the algorithm for signing tokens. Since RS256 uses a private/public keypair, it verifies the tokens against the public key for your Auth0 account. You can access this public key [here](https://${account.namespace}/.well-known/jwks.json).

<% if (typeof sampleLink == 'string') { %>
::: note
We recommend using the default RS256 signing algorithm for your API. If you need to use the HS256 algorithm, see the [HS256 integration sample](${sampleLink}).
:::
<% } %>
