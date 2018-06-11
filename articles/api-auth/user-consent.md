---
title: User consent and third-party applications
tags:
  - api-authentication
  - oidc
  - user-consent
articleType: how-to
---

# User Consent and Third-Party Applications

<%= include('../_includes/_pipeline2') %>

The [OIDC-conformant authentication pipeline](/api-auth/tutorials/adoption) supports defining [resource servers (such as APIs) as entities separate from applications](/api-auth/tutorials/adoption/api-tokens).
This lets you decouple APIs from the applications that consume them, and also lets you define third-party applications that you might not control or even fully trust.

## Types of applications

All Auth0 applications are either first-party or third-party.

**First-party** applications are those controlled by the same organization or person that owns the Auth0 domain.
For example, suppose you wanted to access the Contoso API; in this case, there would likely be a first-party application used for logging in at contoso.com.

**Third-party** applications are controlled by different people or organizations who most likely should not have administrative access to your Auth0 domain.
They enable external parties or partners to access protected resources at your API in a secure way.
A practical application of third-party applications is the creation of "developer centers", which allow users to obtain credentials in order to integrate their applications with your API.
Similar functionality is provided by well-known APIs such as Facebook, Twitter, GitHub, and many others.

## Creating a third-party application

All applications created from the [management dashboard](${manage_url}/#/applications) are assumed to be first-party by default.

At the time of writing, third-party applications cannot be created from the management dashboard.
They must be created through the management API, by setting `is_first_party: false`.

All applications created through [Dynamic Client Registration](/api-auth/dynamic-client-registration) will be third-party.

## Consent dialog

If a user is authenticating through a third-party application and is requesting authorization to access the user's information or perform some action at an API on their behalf, they will see a consent dialog.
For example:

<table>
  <tbody>
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
        <img alt="Auth0 consent dialog - Fabrikam Application for Contoso is requesting access to your account" src="/media/articles/hosted-pages/consent-dialog.png">
        </td>
    </tr>
  </tbody>
</table>

If the user chooses to allow the application, this will create a user grant which represents this user's consent to this combination of application, resource server and scopes.

The application will then receive a successful authentication response from Auth0 as usual.

Once consent has been given, the user will no longer see the consent dialog on subsequent logins.

## Handling rejected permissions

If a user decides to reject consent to the application, they will be redirected to the `redirect_uri` specified in the request with an `access_denied` error:

```
HTTP/1.1 302 Found
Location: https://fabrikam.com/contoso_social#
    error=access_denied
    &state=...
```

## Skipping consent for first-party applications

Only first-party applications can skip the consent dialog, assuming the resource server they are trying to access on behalf of the user has the "Allow Skipping User Consent" option enabled.

::: panel Consent can't be skipped on localhost
Note that this option only allows __verifiable__ first-party applications to skip consent at the moment. As `localhost` is never a verifiable first-party (because any malicious application may run on `localhost` for a user), Auth0 will always display the consent dialog for applications running on `localhost` regardless of whether they are marked as first-party applications. During development, you can work around this by modifying your `/etc/hosts` file to add an entry such as the following:

```text
127.0.0.1       myapp.example
```

Once you do this, remember to update your application configuration URLs, such as the **Allowed Callback URLs** (found in [Dashboard > Applications > Settings](${manage_url}/#/applications/${account.clientId}/settings)), and the callback URL you configured in your application, to match the updated domain-mapping.
:::

Since third-party applications are assumed to be untrusted, they are not able to skip consent dialogs.

## Revoking Consent

If a user has provided consent, but you would like to revoke it, you can do so via [Dashboard > Users](${manage_url}/#/users). Select the user in which you are interested, and switch over to the **Authorized Applications** tab.

Click **Revoke** next to the appropriate application.

## Password-based flows

When performing a [Resource Owner Password Credentials exchange](/api-auth/grant/password), there is no consent dialog involved.
During a password exchange, the user provides their password to the application directly, which is equivalent to granting the application full access to the user's account.

### Forcing users to provide consent

When redirecting to /authorize, the `prompt=consent` parameter will force users to provide consent, even if they have an existing user grant for that application and requested scopes.

### Customizing the consent dialog

As of today the consent dialog UI cannot be customized or set to a custom domain.
We plan to implement this in future releases.
