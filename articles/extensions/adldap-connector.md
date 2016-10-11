---
description: This page explains the Auth0 AD/LDAP Connector Health Monitor Extension and how to install and configure it.
---

# Auth0 Extension: Auth0 AD/LDAP Connector Health Monitor

The Auth0 AD/LDAP Connector Health Monitor exposes an API endpoint of your choice so that you can monitor your AD/LDAP connectors.

## Configuring the Extension

To complete installation of this extension, click on the Auth0 AD/LDAP Connector Health Monitor box in the list of provided extensions on the Extensions page of the Management Portal. In the "Install Extension" window that then pops open, you will be asked to provide the following configuration variables:

- Auth0_Domain: The domain of your Auth0 app;
- Auth0_Global_Client_ID: The Auth0 Global Client ID for your app;
- Auth0_Global_Client_Secret: The Auth0 Global Client Secret for your app,

Once you have provided the appropriate values for the above fields, click "Install" to proceed.

## Using Your Installed Extension

Under the Installed Extensions tab of the Extensions page in the Management Portal, you will see a list containing the Extensions you've installed.

Clicking on the Auth0 AD/LDAP Connector Health Monitor brings up a new window with a JSON snippet similar to the following:

```text
{
  "message": "Use this url: 'https://sandbox.it.auth0.com/api/run/auth0user/auth0-ldap-conector-health-monitor?connection={MY-LDAP-CONNECTOR}' for monitoring your AD/LDAP connector."
}
```

Once you have provided the specific `connection` value, the provided URL can be used with your monitoring service to monitor your AD/LDAP connectors.
