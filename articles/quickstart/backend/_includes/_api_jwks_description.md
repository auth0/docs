By default, your API will be set up to use RS256 as the algorithm for signing tokens. Since RS256 works by using a private/public keypair, tokens can be verified against the public key for your Auth0 account. This public key is accessible at [https://${account.namespace}/.well-known/jwks.json](https://${account.namespace}/.well-known/jwks.json).

::: note
It is highly recommended that you use the default signing algorithm of RS256 for your API. If you do require HS256 as the algorithm, see the [HS256 integration sample](${sampleLink}).
:::
