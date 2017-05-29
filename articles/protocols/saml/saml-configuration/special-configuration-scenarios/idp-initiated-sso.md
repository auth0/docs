---
  description: Setting up IdP-initiated SSO
---

# Special Configuration Scenarios: IdP Initiates SSO

Many instructions for setting up a SAML federation begin with SSO initiated by the service provider:

1. The service provider returns a browser redirect so that the user authenticates using the identity provider.
2. After authentication, the browser redirects the user back to the Service Provider with a SAML assertion containing information about the authentication status.

This is commonly used for consumer-facing scenarios.

## Alternative to Service Provider-Initiated SSO

You might choose to begin with the identity provider initiating SSO instead of the service provider. The user:

1. Invokes a URL on the identity provider;
2. Is prompted to authenticate
3. Is redirected to the service provider with a SAML assertion

This is commonly used in enterprise scenarios.

For example, an organization might set up a portal to ensure that users navigate to the correct application:

1. The user navigates to the portal's URL;
2. The user is redirected to the IdP, which authenticates the user;
3. If successfully authenticated, the user clicks on the appropriate link;
4. The user is redirected to the service provider with a SAML assertion.

## Auth0 as Service Provider Where IdP Initiates SSO

If Auth0 acts as the service provider, you need to make the following changes to support IdP-initiated SSO:

* Ensure the IdP includes the Connection parameter in the assertion consumer service (ACS) URL.
* When configuring the Connection, use the IdP-initiated tab to specify the following:

    1. The default application to which the user gets redirected after IdP login;
    2. The protocol to be used between Auth0 and the client application when Auth0 forwards the results of the user authentication to the client application (note that this will most likely be **Open ID Connect**, unless your Auth0 client is configured to act as a SAML Identity Provider).
    3. Query parameters to pass to the app.
    
### Multiple target applications

When making the IdP-Initiated SSO call from the identity provider, you can specify a target `client_id` in the `RelayState` that will override the default target application selected in the IdP-Initiated tab settings. With this feature, a single SAML connection can have multiple target applications for IdP-Initiated flows.

The `RelayState` value in the POSTed body should have this format:

```
Key1=Value1&Key2=Value2&...&client_id=[THE TARGET CLIENT_ID]
```

## Auth0 as Identity Provider Where IdP Initiates SSO

If Auth0 acts as the identity provider, you need to make the following changes to support IdP-initiated SSO:

* Invoke the IdP-initiated login using the following URL:

  ```text
  https://${account.namespace}/samlp/${account.clientId}
  ```

* Append the `RelayState` parameter to the URL to which the service provider redirects the user after processing the SAML response. For example, the following URL is where the service provider redirects the URL after its processed the SAML response from Auth0:

  ```text
  https://${account.namespace}/samlp
  /${account.clientId}?RelayState=http://FINAL_DESTINATION_URL
  ```
