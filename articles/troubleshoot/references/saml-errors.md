---
public: false
topics:
  - errors
  - saml
contentType:
  - reference
useCase: error-management
---

# SAML Errors

## Invalid request - connection disabled

```json
{
  "error": "invalid_request",
  "error_description": "the connection was disabled"
}
```

### Cause

This message indicates that the Application doesn't have an active Connection associated.

### Solution

1. Navigate to [Connections > Enterprise](${manage_url}/#/connections/enterprise).
2. Find your Connection, and click on **Settings**.
3. Switch to the *Applications* tab.
4. Enable at least one Application (if you don't see any in the list, you will need to [create an application](/applications) before proceeding).

## IdP-Initiated Default App Not Configured

```json
{
  "invalid_request": "Default App for IdP-Initiated is not configured. Make sure to configure that from connection settings or include client_id in RelayState parameter."
}
```

### Cause

This error appears if you haven't provided the necessary information to support IdP-initiated login flows.

### Solution

1. Navigate to [Connections > Enterprise](${manage_url}/#/connections/enterprise).
2. Find your Connection, and click on **Settings**.
3. Switch to the *IdP-Initiated* tab.
4. Select the **Default Application** and the **Response Protocol** used by that Application, and (optionally) specify any additional parameters you want passed to the Application.

::: panel SP-Initiated Login
If you see this error when using a SP-initiated flow, one of the following is missing or empty:

* The `RelayState` parameter
* The `InResponseTo` attribute in the SAML response

If these are missing or empty, Auth0 treats the login as IdP-initiated. You can fix this error by checking your configuration to ensure that both fields are populated and returned appropriately.
:::

## Missing RelayState parameter

### Cause

This error occurs when the identity provider doesn't return the `RelayState` parameter along with its response.

### Solution

Work with the identity provider to ensure that it returns the `RelayState` parameter.

## Audience is Invalid

This error occurs if the value of the `audience` element from the identity provider's SAML response doesn't match the value expected by Auth0. Auth0 expects the value to be the Entity ID for the Connection.

### Solution

1. Navigate to [Connections > Enterprise](${manage_url}/#/connections/enterprise). Find your Connection, and click on **Setup Instructions**.
2. Under the *Common Settings* section, your **Entity ID** is the second parameter provided.

Make sure that the identity provider sends the correct `audience` value in the SAML response.

## Incorrect protocol specified

There is an incorrect response protocol on the **IdP-Initiated** tab. The response protocol is the one used between Auth0 and the Application (not the remote identity provider). For example, if you set this value to **SAML** when your Application expects <dfn data-key="openid">**OpenID Connect**</dfn> or **WS-Fed** results in errors due to the incorrect configuration.

### Solution

1. Navigate to [Connections > Enterprise](${manage_url}/#/connections/enterprise).
2. Find your Connection, and click on **Settings**.
3. Switch to the *IdP-Initiated* tab.
4. Check the value you have set in the **Response Protocol** field.

## User isn't logged out from the IdP

When ADFS is configured as SAML IdP, if the ADFS is relaying party trust `Name ID` attribute isn't mapped the logout flow fails. For example, with the federated parameter `v2/logout?federated&...` user isn't redirected to the ADFS SAML logout endpoint but redirects back to application callback URL directly. As a consequence, the user isn't logged out from the IdP in that case.

### Solution

Add the `Name ID` attribute as a rule on the SAML Relaying Party Trust. 
