---
  description: How to troubleshoot SAML-related configuration issues
---

# Troubleshooting

This guide serves to help you troubleshoot any issues that may arise during the SAML configuration process. It is not intended to be an exhaustive guide, but one that covers the most commonly encountered issues during setup.

## Step 1: Understand the Situation

When troubleshooting, it's important that all parties involved are using the same terminology to facilitate understanding. This section describes key vocabulary and siutations that will be referred to later in this guide.

* **Is Auth0 serving as the SAML Service Provider (SP), the SAML Identity Provider (IdP), or both?**

  Generally speaking, the SP redirects users elsewhere for authentication. The IdP authenticates the user by prompting them to login and validating the information provided. If your application redirects the user to Auth0 for authentication via SAML, then Auth0 is the IdP. If Auth0 redirects users via a Connection to a remote IdP via SAML, then Auth0 is the SP to the remote IdP.

  Auth0 can act as the SP, IdP, or both.

* **Does your authentication flow use an SP-initiated model, an IdP-initiated model, or both?**

  SP-initiated authentication flows begin with the user navigating to the SP application and getting redirected to the IdP for login. An IdP-initiated flow means the user navigates to the IdP, logs in, and then gets redirected to the SP application.

  Within enterprise settings, the IdP-initiated flow is most common.

* **Which user profile attribute identifies the user at the IdP (during login) and within each application?**

  If the naming attribute differs between the IdP and the application(s), you'll need to configure the appropriate mappings within Auth0 so that it sends the correct user profile attributes to the application(s).

  * From our experience, using the email address as the unique identifier is the easiest option, though there are privacy concerns with this option.
  * Enterprise organizations often use an internal ID of some type with the IdP, which needs to be mapped to another attribute meaninful to outsourced SaaS applications.

* **Are your authentication requests signed?**


* **Are your authentication assertions encrypted?**
