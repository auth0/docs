# Authentication API Debugger

## Test with Authentication API Debugger

<%= include('../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the fields **Application** (select the application you want to use for the test) and **Connection** (the name of the social connection to use).

1. Copy the <dfn data-key="callback">**Callback URL**</dfn> and set it as part of the **Allowed Callback URLs** of your [Application Settings](${manage_url}/#/applications).

1. At the *OAuth2 / OIDC* tab, click **OAuth2 / OIDC Login**.

## Other endpoints
To use Authentication API Debuggar with:
- Passwordless: At the *OAuth2 / OIDC* tab, set **Username** to the user's phone number if `connection=sms`, or the user's email if `connection=email`, and **Password** to the user's verification code. Click **Resource Owner Endpoint**.
- SAML SSO:  At the *Other Flows* tab, click **SAML**.
- WS-Federation: At the *Other Flows* tab, click **WS-Federation**.
- Logout: At the *Other Flows* tab, click **Logout**, or **Logout (Federated)** to log the user out of the identity provider as well.
- Legacy Login: At the *OAuth2 / OIDC* tab, set the fields **ID Token**, **Refresh Token** and **Target Client ID**. Click **Delegation**.
- Legacy Delegation: At the *OAuth2 / OIDC* tab, set **Username** and **Password**. Click **Resource Owner Endpoint**.
- Legacy Resource Owner:  At the *OAuth2 / OIDC* tab, set the **Username** and **Password**, and click **Resource Owner Endpoint**.

## Authentications Flows
Use the Authentication API Debuggar with:
- Authorization Code Flow: At the *OAuth2 / OIDC* tab, set the field **Authorization Code** to the code you retrieved from [Authorization Code Grant](#authorization-code-grant-pkce-), and the **Code Verifier** to the key. Click **OAuth2 Code Exchange**.
- Authorization Code Flow + PKCE: At the *OAuth2 / OIDC* tab, set the field **Authorization Code** to the code you retrieved from [Authorization Code Grant](#authorization-code-grant-pkce-), and the **Code Verifier** to the key. Click **OAuth2 Code Exchange**.
- Client Credential Flow:  At the *OAuth2 / OIDC* tab, click **OAuth2 Client Credentials**.
