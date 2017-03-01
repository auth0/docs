---
title: User consent and third-party clients
---

# User consent and third-party clients

The [OIDC-conformant authentication pipeline](/api-auth/tutorials/adoption) supports defining [resource servers (i.e. APIs) as entities separate from clients](/api-auth/tutorials/adoption/api-tokens).
This lets you decouple APIs from the applications that consume them, and also lets you define third-party clients that you might not control or even fully trust.

## Consent dialog

If a user is authenticating through a third-party client and is requesting authorization to access the user's information or perform some action at an API on their behalf, they will see a consent dialog.
For example:

<table>
    <tr>
        <td>
<pre><code>GET /authorize?
client_id=some_third_party_client
&redirect_uri=https://fabrikam.com/contoso_social
&response_type=token id_token
&<em>scope=openid profile email read:posts write:posts</em>
&<em>audience=https://social.contoso.com</em>
&nonce=...
&state=...
</code></pre>
        </td>
        <td>
        <img alt="Auth0 consent dialog - Fabrikam Client for Contoso is requesting access to your account" src="/media/articles/hosted-pages/consent-dialog.png">
        </td>
    </tr>
</table>

If the user chooses to allow the application, this will create a user grant which represents this user's consent to this combination of client, resource server and scopes.
The client application will then receive a successful authentication response from Auth0 as usual.

## Handling rejected permissions

If a user decides to reject consent to the application, they will be redirected to the `redirect_uri` specified in the request with an `access_denied` error:

```
HTTP/1.1 302 Found
Location: https://fabrikam.com/contoso_social#
    error=access_denied
    &state=...
```

The application can redirect the user to log in again to prompt them for consent again.

## Skipping consent for first-party clients

All clients created from the [management dashboard](${manage_url}/#/clients) are assumed to be first-party by default.
Only first-party clients can skip the consent dialog, assuming the resource server they are trying to access on behalf of the user has the "Allow Skipping User Consent" option enabled.

## Password-based flows

When performing a [Resource Owner Password Credentials exchange](/api-auth/grant/password), there is no consent dialog involved.
During a password exchange, the user provides their password to the client directly, which is equivalent to granting the client full access to the user's account.

### Forcing users to provide consent

When redirecting to /authorize, the `prompt=consent` parameter will force users to provide consent, even if they have an existing user grant for that client and requested scopes.

### Customizing the consent dialog

As of today the consent dialog UI cannot be customized.
We plan to implement this in future releases.
