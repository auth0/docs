---
description: How to troubleshoot SAML-related configuration issues
toc: true
  tags:
    - saml
    - sso
---

# Troubleshooting

This guide serves to help you troubleshoot any issues that may arise during the SAML configuration process. It is not intended to be an exhaustive guide, but one that covers the most commonly encountered issues during setup.

## Understand the Situation

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

## Information Gathering

When troubleshooting, we recommend beginning by gathering information that helps answer the following questions:

1. How many users experience the issue? Just one user? All users?
2. Is this an issue with a new setup, or is this an existing integration that's stopped working?
3. How many applications does the issue affect?
4. What is the expected behavior? What is the behavior you're seeing?
5. How far through the login sequence does the user get?

## Troubleshooting Approaches

* [SAML Troubleshooting When Auth0 is the Service Provider](/protocols/saml/saml-configuration/troubleshoot/auth0-as-sp)

* [SAML Troubleshooting When Auth0 is the Identity Provider](/protocols/saml/saml-configuration/troubleshoot/auth0-as-idp)

## If the Issue Affects Only One (or Just a Few) Users

* Check the user's profile, browser, or device for any issues.
* Check to see if it happens in all browsers for the affected users (indicating a data issue) or just certain types of browsers (indicating a browser-specific issue).
* Check to see if the browswer has enabled JavaScript and cookies.
* Check that the caps lock key is disabled.
* If the user is using a mobile device, check to see if there's any software that might impact authentication and/or authorization (such as not running some type of required software).
* Check to see if the user can access some of the app's key URLs, such as the IdP's SSO URL (indicating a network connectivity issue).

## Next Steps

If the troubleshooting steps listed above don't solve the issue you're seeing, please request assitance from Auth0 by opening up a ticket in the Support Center. Be sure to include the following information:

1. The number of users experiencing this issue. One? All?
2. Whether this issue involves a new setup or if it involves an existing integration that suddenly stopped working
3. The number of applications affected
4. What the expected behavior is, as well as what the current behavior is
5. How far through the login sequence the user gets
6. The name of the application registered in Auth0 and the identity protocol it uses
7. The name of the Connection involved
8. Whether or not you're using the Auth0 Lock widget (if so, what version?)
9. Is a customized version of Lock used?
10. An HTTP trace of the SSO interaction in [a .har file](/har)
11. An Auth0 log entry for the failed authentication
12. An authentication log file from any third-party applications (such as Sharepoint) involved

### Keep reading

::: next-steps
* [Common SAML Errors](/protocols/saml/saml-configuration/troubleshoot/common-saml-errors)
:::
