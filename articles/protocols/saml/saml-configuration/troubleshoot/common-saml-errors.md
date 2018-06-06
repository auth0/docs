---
description: Common SAML errors and troubleshooting steps
  tags:
    - saml
    - sso
    - errors
---

# Common SAML Errors

This article covers SAML errors you might encounter when Auth0 acts as the service provider and the steps you should take to resolve them.

## Error: The Connection was Disabled

```json
{
  "error": "invalid_request",
  "error_description": "the connection was disabled"
}
```

This message indicates that the Application doesn't have an active Connection associated.

### How to Fix

1. Navigate to [Connections > Enterprise](${manage_url}/#/connections/enterprise).
2. Find your Connection, and click on **Settings**.
3. Switch to the *Applications* tab.
4. Enable at least one Application (if you don't see any in the list, you will need to [create an application](/applications#how-to-configure-an-application) before proceeding).

## Error: IdP-Initiated Default App Not Configured

```json
{
  "invalid_request": "Default App for IdP-Initiated is not configured. Make sure to configure that from connection settings or include client_id in RelayState parameter."
}
```

This error appears if you haven't provided the necessary information to support IdP-initiated login flows.

### How to Fix

1. Navigate to [Connections > Enterprise](${manage_url}/#/connections/enterprise).
2. Find your Connection, and click on **Settings**.
3. Switch to the *IdP-Initiated* tab.
4. Select the **Default Application** and the **Response Protocol** used by that Application, and (optionally) specify any additional parameters you want passed to the Application.

## Error: Missing RelayState

This error occurs when the identity provider doesn't return the `RelayState` parameter along with its response.

### How to Fix

Work with the identity provider to ensure that it returns the `RelayState` parameter.

## Error: Audience is Invalid

This error occurs if the value of the `audience` element from the identity provider's SAML response doesn't match the value expected by Auth0. Auth0 expects the value to be the Entity ID for the Connection.

**Find Your Connection's Entity ID**

1. Navigate to [Connections > Enterprise](${manage_url}/#/connections/enterprise). Find your Connection, and click on **Setup Instructions**.
2. Under the *Common Settings* section, your **Entity ID** is the second parameter provided.

### How to Fix

Make sure that the identity provider sends the correct `audience` value in the SAML response.

## Error: Specifying the Incorrect Protocol

One common error is specifying the incorrect response protocol on the IdP-Initiated tab. The response protocol is the one used between Auth0 and the Application (not the remote identity provider). For example, if you set this value to **SAML** when your Application expects **OpenID Connect** or **WS-Fed** results in errors due to the incorrect configuration.

### How to Fix

1. Navigate to [Connections > Enterprise](${manage_url}/#/connections/enterprise).
2. Find your Connection, and click on **Settings**.
3. Switch to the *IdP-Initiated* tab.
4. Check the value you have set in the **Response Protocol** field.
