---
  description: Learn to set up IdP-initiated Single Sign-on (SSO)
  topics:
    - saml
    - sso
contentType:
  - how-to
useCase:
  - add-idp
---

# Special Configuration Scenarios: IdP-Initiated Single Sign-On

Many instructions for setting up a <dfn data-key="security-assertion-markup-language">SAML</dfn> federation begin with <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> initiated by the service provider:

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

## Risks of Using an IdP-Initiated SSO Flow

In general, it is recommended to use Service-Provided flows whenever available. When an application actively requests an authentication as a first step (as is the case for SP-Initiated flows), it can check that the authentication response matches the original request. 
In IdP-initiated scenarios, on the other hand, the application can not verify that the user actually started the flow. Because of this, the IdP-Initiated flow opens the possibility of an [Login CSRF attack](https://support.detectify.com/customer/portal/articles/1969819-login-csrf), where an attacker can trick a legitimate user into using a session created by the attacker. 

Login CSRF attacks are generally less of a concern in enterprise-only scenarios, as any would-be attacker would have to come from the same directory of users. But it's definitely a security concern in consumer-facing applications, so we strongly advise against enabling IdP-Inititated flows on SAML connections.

## Auth0 as Service Provider Where IdP Initiates SSO

For information on how to configure IdP-Initiated flows when Auth0 is the Service Provider see [How to setup IdP-Initiated SSO in a SAML connection](/protocols/saml/idp-initiated-sso).

## Auth0 as Identity Provider Where IdP Initiates SSO

If Auth0 acts as the identity provider, you can use the application's SAML Sign In URL endpoint directly (without a SAML request):

* Invoke the IdP-initiated login using the following URL:

  ```text
  https://${account.namespace}/samlp/${account.clientId}
  ```

* Append the `RelayState` parameter to the URL to which the service provider redirects the user after processing the SAML response. For example, the following URL is where the service provider redirects the URL after its processed the SAML response from Auth0:

  ```text
  https://${account.namespace}/samlp
  /${account.clientId}?RelayState=https://FINAL_DESTINATION_URL
  ```

Note: it's up to the target application to accept IdP-Initiated flows and use the `RelayState` in a meaningful way if provided.