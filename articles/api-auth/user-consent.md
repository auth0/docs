---
description: Learn how to decouple APIs from applications that consume them and define third-party apps that you don't control or may not trust. 
topics:
  - api-authentication
  - oidc
  - user-consent
contentType: how-to
useCase:
  - secure-api
  - call-api
---

# User Consent and Third-Party Applications

The [OIDC-conformant authentication pipeline](/api-auth/tutorials/adoption) supports defining [resource servers (such as APIs) as entities separate from applications](/api-auth/tutorials/adoption/api-tokens). This lets you decouple APIs from the applications that consume them, and also lets you define third-party applications that you might not control or even fully trust.

All applications created from the [Dashboard](${manage_url}/#/applications) are assumed to be first-party by default.

Third-party applications cannot be created from the Dashboard. They must be created through the Management API, by setting `is_first_party: false`.

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

If the user allows the application, this creates a *user grant* which represents the user's consent to this combination of application, resource server, and <dfn data-key="scope">scopes</dfn>. 

The application then receives a successful authentication response from Auth0 as usual. Once consent has been given, the user won't see the consent dialog during subsequent logins until consent is revoked explicitly.

## Scope descriptions 

By default, the consent page will use the scopes' names to prompt for the user's consent. As shown below, you should define scopes using the **action:resource_name** format.

![API Scopes](/media/articles/api-auth/consent-scopes.png)

The consent page groups scopes for the same resource and displays all actions for that resource in a single line. For example, the configuration above would result in **Posts: read and write your posts**.

If you would like to display the **Description** field instead, you can do so by setting the tenant's **use_scope_descriptions_for_consent** to **true**. This will affect consent prompts for all of the APIs on that tenant.

To set the **use_scope_descriptions_for_consent** flag, you will need to make the appropriate call to the API:

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/tenants/settings",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer API2_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
  ],
  "postData": {
      "mimeType": "application/json",
      "text" : "{ \"flags\": { \"use_scope_descriptions_for_consent\": true } }"
  }
}
```

## Handle rejected permissions

If a user decides to reject consent to the application, they will be redirected to the `redirect_uri` specified in the request with an `access_denied` error:

```
HTTP/1.1 302 Found
Location: https://fabrikam.com/contoso_social#
    error=access_denied
    &state=...
```

## Skip consent for first-party applications

Only first-party applications can skip the consent dialog, assuming the resource server they are trying to access on behalf of the user has the "Allow Skipping User Consent" option enabled.

::: panel Consent can't be skipped on localhost
Note that this option only allows __verifiable__ first-party applications to skip consent at the moment. As `localhost` is never a verifiable first-party (because any malicious application may run on `localhost` for a user), Auth0 will always display the consent dialog for applications running on `localhost` regardless of whether they are marked as first-party applications. During development, you can work around this by modifying your `/etc/hosts` file to add an entry such as the following:

```text
127.0.0.1       myapp.example
```

Similarly, you **cannot** skip consent (even for first-party applications) if `localhost` appears in any domain in the <dfn data-key="callback">**Allowed Callback URLs**</dfn> setting (found in [Dashboard > Applications > Settings](${manage_url}/#/applications/${account.clientId}/settings)). Make sure to update **Allowed Callback URLs**, and the callback URL you configured in your application, to match the updated domain-mapping.
:::

Since third-party applications are assumed to be untrusted, they are not able to skip consent dialogs.

## Revoke Consent

If a user has provided consent, but you would like to revoke it, you can do so via [Dashboard > Users](${manage_url}/#/users). Select the user in which you are interested, and switch over to the **Authorized Applications** tab.

Click **Revoke** next to the appropriate application.

## Password-based flows

When performing a [Resource Owner Password Credentials exchange](/api-auth/grant/password), there is no consent dialog involved.
During a password exchange, the user provides their password to the application directly, which is equivalent to granting the application full access to the user's account.

### Force users to provide consent

When redirecting to /authorize, the `prompt=consent` parameter will force users to provide consent, even if they have an existing user grant for that application and requested scopes.

### Customize the consent dialog

The consent dialog UI cannot be customized or set to a custom domain.

## Keep reading

* [First-Party and Third-Party Applications](/applications/concepts/app-types-first-third-party)
* [View Application Ownership](/api/management/guides/applications/view-ownership)
* [Confidential and Public Applications](/applications/concepts/app-types-confidential-public)
* [Enable Third-Party Applications](/applications/guides/enable-third-party-apps)
* [Auth0 Grant Types Mapping](/applications/reference/grant-types-auth0-mapping)
