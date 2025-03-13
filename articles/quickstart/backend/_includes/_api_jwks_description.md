By default, your API uses RS256 as the algorithm for signing tokens. Since RS256 uses a private/public keypair, it verifies the tokens against the public key for your Auth0 account. The public key is in the <a href="/tokens/concepts/jwks" target="_blank" rel="noreferrer">JSON Web Key Set (JWKS)</a> format, and can be accessed <a href="https://${account.namespace}/.well-known/jwks.json" target="_blank" rel="noreferrer">here</a>.

<% if (typeof sampleLink == 'string') { %>
::: note
We recommend using the default RS256 <a href="/tokens/concepts/signing-algorithms" target="_blank" rel="noreferrer">signing algorithm</a> for your API. If you need to use the HS256 algorithm, see the <a href="${sampleLink}" target="_blank" rel="noreferrer">HS256 integration sample</a>.
:::
<% } %>
