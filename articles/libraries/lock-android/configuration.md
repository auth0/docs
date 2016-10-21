---
toc_title: Lock for Android Configuration Options
description: Altering the appearance and behavior of Lock for Android
---

# Lock Configuration Options

These are options that can be used to configure Lock for Android to your project's needs. **Note that if you are a user of Lock v1 who is now migrating to Lock v2**, you'll want to take note first of those [options that have been renamed or whose behavior have changed](/libraries/lock-android/migration-guide), and then look over the new list below, which contains quite a few options new to v2.

## UI Options

- **[DEPRECATED 10/14/2016] useBrowser {boolean}**: Whether to use the WebView or the Browser to request calls to the `/authorize` endpoint. The default value is to use Browser. Using the Browser has some [restrictions](#some-restrictions).
- **closable {boolean}**: Defines if the LockActivity can be closed. By default it's not closable.
- **allowedConnections {List<String>}**: Filters the allowed connections from the list configured in the Dashboard. By default if this value is empty, all the connections defined in the dashboard will be available.

## Authentication Options

- **withAuthenticationParameters {Map<String, Object>}**: Defines extra authentication parameters to be sent on each log in and sign up call.
The default `scope` used on authentication calls is `openid`. This changed from v1 as the previous included the `offline_access scope`. If you want to specify a different one, use `withAuthenticationParameters` and add a different value for the `scope` key.
- **useImplicitGrant {boolean}**: Whether to use the Implicit Grant or Code Grant flow when authenticating. By default it will try to use Code Grant. If the device has an old API level and can't generate the hash because it lacks the required algorithms, it will use the Implicit Grant.

## Database Options

- **withUsernameStyle {int}**: Defines if it should ask for email only, username only, or both of them. The accepted values are USERNAME and EMAIL. By default it'll respect the Dashboard configuration of the parameter `requires_username`.
- **loginAfterSignUp {boolean}**: Whether after a SignUp event the user should be logged in automatically. Defaults to `true`.
- **initialScreen {int}**: Allows to customize which form will first appear when launching Lock. The accepted values are LOG_IN, SIGN_UP, and FORGOT_PASSWORD. By default LOG_IN is the initial screen.
- **allowSignUp {boolean}**: Shows the Sign Up form if a Database connection is configured and it's allowed from the Dashboard. Defaults to true.
- **allowLogIn {boolean}**: Shows the Log In form if a Database connection is configured. Defaults to true.
- **allowForgotPassword {boolean}**: Shows the Forgot Password form if a Database connection is configured and it's allowed from the Dashboard. Defaults to true.
- **setDefaultDatabaseConnection {String}**: Defines which will be the default Database connection. This is useful if your application has many Database connections configured.
- **withSignUpFields {List<CustomField>}**: Shows a second screen with extra fields for the user to complete after the username/email and password were completed in the sign up screen. Values submitted this way will be attached to the user profile in `user_metadata`. See [this file](/libraries/lock-android/custom-fields) for more information.
- **setPrivacyURL {String}**: Allows to customize the Privacy Policy URL. Will default to "https://auth0.com/privacy".
- **setTermsURL {String}**: Allows to customize the Terms of Service URL. Will default to "https://auth0.com/terms".
- **setMustAcceptTerms {boolean}**: Forces the user to accept the Terms&Policy before signing up. Defaults to false.

## OAuth Options

- **withAuthStyle {String, int}**: Customize the look and feel of a given connection (name) with a specific style. See [this document on custom oauth connections](/libraries/lock-android/custom-oauth-connections) for more information.
- **withAuthHandlers {AuthHandler...}**: Customize the authentication process by passing an array of AuthHandlers. See [this document on custom authentication parameters](/libraries/lock-android/custom-authentication-providers) for more information.
- **withAuthButtonSize {int}**: Allows to customize the Style of the Auth buttons. Possible values are SMALL and BIG. If this is not specified, it will default to SMALL when using **ClassicLock** with at least 2 Enterprise or Database connections, or when using **PasswordlessLock** with a Passwordless connection and less than 3 Social connections. On the rest of the cases, it will use BIG.
- **withConnectionScope(String, String...)**: Allows to specify additional scopes for a given Connection name, which will be request along with the ones defined in the connection settings in the Auth0 dashboard. The scopes are not validated in any way and need to be recognized by the given authentication provider.

## Passwordless Options

- **useCode {}**: Send a code instead of a link via email/SMS for Passwordless authentication.
- **useLink {}**: Send a link instead of a code via email/SMS for Passwordless authentication.