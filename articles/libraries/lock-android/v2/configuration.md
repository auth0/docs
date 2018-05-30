---
section: libraries
title: Lock for Android v2 Configuration
description: Altering the appearance and behavior of Lock for Android
tags:
  - libraries
  - lock
  - android
---
# Lock Android: Configuration

These are options that can be used to configure Lock for Android to your project's needs. **Note that if you are a user of Lock v1 who is now migrating to Lock v2**, you'll want to take note first of those [options that have been renamed or whose behavior have changed](/libraries/lock-android/migration-guide), and then look over the new list below, which contains quite a few options new to v2.

Configurations options are added to the Lock Builder using the following format:

```java
 lock = Lock.newBuilder(auth0, callback)
    // Configuration options
    .closable(true)
    .allowSignUp(false)
    .setPrivacyURL('http://example.com/privacy')
    .setTermsURL('http://example.com/terms')
    // End configuration options
    .build(this);
```

## UI options

- **closable(boolean)**: Defines if the LockActivity can be closed. By default it's not closable.
- **allowedConnections(List<String>)**: Filters the allowed connections from the list configured in the Dashboard. By default if this value is empty, all the connections defined in the dashboard will be available.

## Authentication options

- **withAuthenticationParameters(Map<String, Object>)**: Defines extra authentication parameters to be sent on each log in and sign up call. The default `scope` used on authentication calls is `openid`. If you want to specify a different one, use `withAuthenticationParameters` and add a different value for the `scope` key.
- **withScope(String)**: Changes the scope requested when performing an authentication request.

## Database options

- **withUsernameStyle(int)**: Defines if it should ask for email only, username only, or both of them. The accepted values are `USERNAME` and `EMAIL`. By default it will respect the Dashboard configuration of the parameter `requires_username`.
- **loginAfterSignUp(boolean)**: Whether after a `SignUp` event the user should be logged in automatically. Defaults to `true`.
- **initialScreen(int)**: Allows to customize which form will first appear when launching Lock. The accepted values are `LOG_IN`, `SIGN_UP`, and `FORGOT_PASSWORD`. By default `LOG_IN` is the initial screen.
- **allowSignUp(boolean)**: Shows the Sign Up form if a Database connection is configured and it's allowed from the Dashboard. Defaults to `true`.
- **allowLogIn(boolean)**: Shows the Log In form if a Database connection is configured. Defaults to `true`.
- **allowForgotPassword(boolean)**: Shows the Forgot Password form if a Database connection is configured and it's allowed from the Dashboard. Defaults to `true`.
- **allowShowPassword(boolean)**: Shows a button to toggle the input visibility of a Password field. Defaults to `true`.
- **setDefaultDatabaseConnection(String)**: Defines which will be the default Database connection. This is useful if your application has many Database connections configured.
- **withSignUpFields(List<CustomField>)**: Shows a second screen with extra fields for the user to complete after the username/email and password were completed in the sign up screen. Values submitted this way will be attached to the user profile in `user_metadata`. See [this file](/libraries/lock-android/custom-fields) for more information.
- **setPrivacyURL(String)**: Allows to customize the Privacy Policy URL. Defaults to `https://auth0.com/privacy`.
- **setTermsURL(String)**: Allows to customize the Terms of Service URL. Defaults to `https://auth0.com/terms`.
- **setSupportURL(String)**: Allows to set a Support URL that will be displayed in case that a non-recoverable error raises on Lock.
- **setMustAcceptTerms(boolean)**: Forces the user to accept the Terms&Policy before signing up. Defaults to `false`.
- **useLabeledSubmitButton(boolean)**: If set to `true`, it will display a label of the current mode (sign up/ log in) in the submit button instead of an icon. Defaults to `true`. If the `hideMainScreenTitle` option is set to true this setting is ignored and a label will be used anyways.
- **hideMainScreenTitle(boolean)**: If set to `true`, the header on the main screen won't display the title.

## OAuth options

- **withAuthStyle(String, int)**: Customize the look and feel of a given connection (name) with a specific style. See [this document on custom oauth connections](/libraries/lock-android/v2/custom-theming#custom-oauth-connection-buttons) for more information.
- **withAuthHandlers(AuthHandler...)**: Customize the authentication process by passing an array of AuthHandlers. See [this document on custom authentication parameters](/libraries/lock-android/custom-authentication-providers) for more information.
- **withAuthButtonSize(int)**: Allows to customize the Style of the Auth buttons. Possible values are `SMALL` and `BIG`. If this is not specified, it will default to `SMALL` when using **ClassicLock** with at least 2 Enterprise or Database connections, or when using **PasswordlessLock** with a Passwordless connection and less than 3 Social connections. On the rest of the cases, it will use `BIG`.
- **withConnectionScope(String, String...)**: Allows to specify additional scopes for a given Connection name, which will be request along with the ones defined in the connection settings in the [Auth0 Dashboard](${manage_url}). The scopes are not validated in any way and need to be recognized by the given authentication provider. For a list, check in the [Auth0 Dashboard](${manage_url}) under the settings for the connection in question.
- **withScheme(String)**: Allows to change the scheme of the `redirect_uri` sent on the authorize call. By default, the scheme is `https`. When changing this setting, the intent-filter on the `AndroidManifest.xml` file and the Allowed Callbacks URLs on the application dashboard must be updated too.

## Passwordless options

- **useCode()**: Send a code instead of a link via email/SMS for Passwordless authentication.
- **useLink()**: Send a link instead of a code via email/SMS for Passwordless authentication.
- **rememberLastLogin(boolean)**: Whether the email or phone used in the last successful authentication will be saved to auto-login the next time a Passwordless authentication is requested.
