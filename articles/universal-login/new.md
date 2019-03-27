---
description: New Universal Login Experience
topics:
  - login
  - universal-login
contentType: index
toc: true
---
# New Universal Login Experience

Auth0's New Universal Login experience provides a reimagined login flow, with a fresh UX design and lightweight pages.

The key structural difference with the Classic Experience is that while the former uses Javascript widgets in all the pages, the New Experience is rendered on the server and does not require Javascript. 

From a functional perspective, there's is a still a feature gap between the New and Classic experience. [Learn more](/universal-login/new-experience-limitations).

In addition of some missing features, in the New Experience some pages has the following functional differences:

## Login

- If you are using Development Keys for Social Providers:

    - Single Sign On and Silent Authentication will work properly, which does not happen in the Classic experience.

    - Users will see a warning in the login page mentioning that the tenant is configured with Development Keys.

- A button will be rendered for each social and enterprise connection. 

- A 'show password' icon will be displayed next to the password field.

## Multi-Factor Authentication

- If users have more than one MFA factor enrolled (e.g. SMS and Push notifications), the new MFA page will let the user select which one they want to use. 

## Password Reset

- If you configure the default login route for the application, the password reset flow will let users get back to the login page. This will happen after the password was changed or if the link expired.

- A 'show password' icon will be displayed next to the password fields

## Consent

- The Consent page will be localized, and the logo / color selected in the dashboard configuration section will be properly applied.
