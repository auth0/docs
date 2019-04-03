---
description: New Universal Login Experience
topics:
  - login
  - universal-login
contentType: index
beta: true
toc: true
---
# New Universal Login Experience

Auth0's New [Universal Login](/universal-login) experience provides a reimagined login flow, with a fresh UX design and lightweight pages. When you pick this new experience, Auth0 will use it for all pages that haven't been customized.

The key structural difference with the [Classic Experience](/universal-login/classic) is that while the former uses Javascript widgets in all the pages, the New Experience is rendered on the server and does not require Javascript. 

From a functional perspective, there's is a still a [feature gap](/universal-login/new-experience-limitations) between the New and Classic experience. 

In addition of some missing features, in the New Experience some pages has certain differences detailed below.

## Login

- If you are using Development Keys for Social Providers:

    - Single Sign On and Silent Authentication will work properly, which does not happen in the Classic experience.

    - Users will see a warning in the login page mentioning that the tenant is configured with Development Keys.

- A button will be rendered for each social and enterprise connection. 

- A 'show password' icon will be displayed next to the password field.

## Multi-Factor Authentication

- If users have more than one MFA factor enrolled (e.g. SMS and Push notifications), the new MFA page will let the user select which one they want to use.

## Password Reset

- In the Classic Experience you can [configure a url](/email/templates#redirect-to-results-for-the-change-password-email-template) to redirect users after completing the password reset. The URL will receive a success indicator and a message. The New Experience will redirect the users to the [default login route](/universal-login/default-login-url) when it succeeds, and will handle the error cases as part of the Universal Login flow. The Redirect URL in the email template will be ignored.  

- A 'show password' icon will be displayed next to the password fields.

## Consent

- The logo / color selected in the dashboard configuration section will be properly applied.
