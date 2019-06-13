In a large scale re-structure, it's not always possible - or practical - to update all your applications at once. In fact, our recommended best practice is to plan for an iterative style approach. If your applications already participate in Single Sign On (SSO) and your legacy identity system supports OIDC, WS-Fed or SAML, then you have a couple of options available if want to continue to provide SSO as you integrate with Auth0:  

* Update your existing identity provider in your legacy SSO system to [redirect to Auth0 for login](https://auth0.com/docs/protocols/saml/saml-configuration/auth0-as-identity-provider), or
* Have Auth0 redirect to your legacy SSO system to login. This requires configuring your legacy system as an IdP in Auth0 (for either [SAML](https://auth0.com/docs/protocols/saml/saml-configuration/auth0-as-service-provider) or [OIDC](https://auth0.com/docs/extensions/custom-social-extensions)).

::: panel Best Practice
Supporting an SSO experience with your legacy system can add complexity, but may be worth it to generate a more seamless user experience as you integrate with Auth0. If you intend to go down this path, planning for it early can help ensure that it is possible to achieve. If you don't already have SSO at a centralized service, then the complexity to add it would unlikely be worth the benefits.
:::

This is a complex topic that will need some additional investigation depending on your current legacy architecture, and we recommend you should only look into this if you currently have SSO support in your legacy system (N.B. if you are currently redirecting from your applications to a centralized system to authenticate your users and that system only asks for credentials if you don’t already have a session with the centralized system, then you have legacy SSO).
