---
description: New Universal Login Experience
topics:
  - login
  - universal-login
contentType: index
toc: true
---
# New Universal Login Experience

Auth0's New <dfn data-key="universal-login">Universal Login</dfn> Experience provides a reimagined login flow, with a fresh UX design and lightweight pages. When you pick this new experience, Auth0 will use it for all pages that haven't been customized. You can enable it from the [Universal Login Settings](${manage_url}/#/login_settings) dashboard section:

![Login Page](/media/articles/universal-login/experience-picker.png)

The key structural difference from the [Classic Experience](/universal-login/classic) is that the former uses Javascript widgets in all the pages, while the New Experience is rendered on the server and does not require Javascript. 

From a functional perspective, the New Experience has much better support for [Localization](/universal-login/i18n), consistent UI customization with [Page Templates](/universal-login/page-templates), a better MFA experience, and several improvements across all pages. 

The New Experience is being actively developed, so new features are regularly added. However, there is still a [feature gap](/universal-login/new-experience-limitations) with the Classic Experience, and some pages in the New Experience have certain differences detailed below.

## User Interface Customization

Learn how to [customize](/universal-login/customization-new) the New Universal Login user interface.

## Internationalization

The New Experience provides a consistent approach for [Internationalization](/universal-login/i18n). 

## Text Customization

You can override any text in the New Experience by using the [Text Customization API](/universal-login/text-customization). 

## Login

- If you are using Development Keys for Social Providers:

    - <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> and Silent Authentication will work properly, which does not happen in the Classic Experience.

    - Users will see a warning in the login page mentioning that the tenant is configured with [Development Keys](/connections/social/devkeys).

- A button will be rendered for each social and enterprise connection. 

- A 'show password' icon will be displayed next to the password field.

- If you redirect users to the `/login` page directly, they will get an error unless they have configured the [default login route](/universal-login/default-login-url). You should always redirect users to the proper authorization request endpoint (e.g., `/authorize` if you are using OpenID Connect).

- You can specify the `login_hint` when redirecting to Auth0, and it will be used to populate the username/email field for the login or signup page.

## Signup

- You can make users land directly on the Signup page instead of the Login page by specifying the `screen_hint=signup` parameter when redirecting to `/authorize`. Note that this can be combined with `prompt=login`, which indicates whether you want to always show the authentication page or you want to skip if there's an existing session. 

|`/authorize` parameters | No existing session  | Existing session |
|--|--|--|
|no extra parameters   | Shows the login page  | Redirects to the callback url |
|`screen_hint=signup`  | Shows the signup page | Redirects to the callback url |
|`prompt=login`        | Shows the login page  | Shows the login page          |
|`prompt=login&screen_hint=signup`| Shows the signup page | Shows the signup page |

## Multi-Factor Authentication

- If users have more than one <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn> factor enrolled (e.g., SMS and Push notifications), the new MFA page will let the user select which one they want to use.

- You can use [Email as an MFA factor](/mfa/concepts/mfa-factors#email-notifications).

- You can use [Voice as an MFA factor](/mfa/concepts/mfa-factors#voice-notifications).

- If you are using the Guardian SDK to create your own native application to handle Push Notifications, you can configure the name of the application and the URLs to download them in the "Push via Auth0 Guardian" option in the MFA [Dashboard > MFA](${manage_url}/#/mfa) section.

- If you have a rule that sets the MFA provider to `google-authenticator` you need to enable the OTP factor in the [Dashboard > MFA](${manage_url}/#/mfa) section.

## Password Reset

- In the Classic Experience, you can [configure a url](/email/templates#redirect-to-results-for-the-change-password-email-template) to redirect users after completing the password reset. The URL will receive a success indicator and a message. The New Experience will redirect the users to the [default login route](/universal-login/default-login-url) when it succeeds and will handle the error cases as part of the Universal Login flow. The Redirect URL in the email template will be ignored.  

Please note that you must provide an **Application Login URI** under [Application Settings](/dashboard/reference/settings-application) for the redirect URLs to work.

- A 'show password' icon will be displayed next to the password fields.

- If the Database Connection is set to ['Require Username'](/connections/database/require-username), the password reset flow will ask the user for the username and send a password reset email to the associated email address.

## Email Verification

- After a user clicks the email verification link, they'll be redirected to a page that will confirm that their email is verified. If the [default login route](/universal-login/default-login-url) is configured, users will be able to click a button and get redirected to it.

## Consent

- The logo and colors selected in the dashboard configuration section will be properly applied. (Recommended logo size is 150 x 150 pixels.)

## Custom DB Connections

When using [Custom DB Connections](/connections/database/custom-db):

- The password reset flow will function properly even if you return errors from the change password script.
- The [errors](/connections/database/custom-db/error-handling) returned in `ValidationErrors` or `WrongUsernameOrPasswordError` will be displayed in the corresponding pages.

## Implement Universal Login

<%= include('./_implement_universal_login') %>
