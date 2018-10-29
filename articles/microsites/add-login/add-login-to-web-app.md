# Add Login to a Traditional Web Application

Welcome! Let's see what you have to do to add login to your Traditional Web App and no, you won't have to study any protocols to get this working.

## How does login work with Auth0?

Every time one of your users clicks Log In or Sign Up, your app calls Auth0. Auth0 loads your app's configuration, redirects the user to the login page hosted by Auth0, and displays the available login options, such as username/password and login with Google. Auth0 verifies your user's identity and sends the basic user information back to your app included in a signed [token](/tokens/id-token). Once the user successfully authenticates, Auth0 redirects the user back to your app (to a preconfigured URL that you specify), informing your app at the same time about the logged in user's information. 

If you have a user database, you can use it with Auth0. If not, no problem. You can use Auth0's user data store, social identity providers (like Google or Facebook), or enterprise directories (like Active Directory). You can also choose to use a combination of those, based on your needs. Think of Auth0 as an identity hub that supports all major identity providers and various protocols. Want to add Google login to your app? You can enable it with a flip of a switch in the Auth0 Dashboard, add your Google keys, and have it available on the next login. And if GDPR affects you, we are here for you. We have tools you can use to comply with GDPR. 

We have a lot of additional building blocks you can use, like Single Sign-On, Multi-factor Authentication, Password policies, Anomaly Detection, and more.

## What standards does Auth0 use?

The standards that this flow uses are OAuth 2.0 and OpenID Connect.

- **OAuth 2.0** grants authorization. It enables you to authorize a Web App to access an API, without sharing your credentials. Instead, Web App A authenticates with an Authorization Server (in our case, Auth0) once, and the server sends the application a token that can be used as credentials to access the protected resources of the API. These tokens are called **Access Tokens**. The issue with OAuth 2.0 is that it doesn't include any authentication mechanisms to let you know who the user is that authenticated and granted authorization to the app. Access Tokens are meant for APIs, and they must be validated before they are used.

- **OpenID Connect (OIDC)** builds on OAuth 2.0. It enables users to verify their identity and give some basic profile information without sharing their credentials. An example is a to-do application which lets users log in using their Google account and then push their to-do items as calendar entries to their Google Calendar. The part where they authenticate their identity is implemented via OpenID Connect, while the part where they authorize the to-do application to modify their calendar by adding entries is implemented via OAuth 2.0. OIDC uses tokens called **ID Tokens**, which contain information about the user and what they authorized, as a JSON object. ID Tokens are meant for applications, and they must be validated before they are used.

OAuth 2.0 comes in different flavors, and the one we use for traditional web apps is the [Authorization Code Grant](/application-auth/current/server-side-web).

## Add login to your traditional web app

Its easy to add login to your traditional web app with Auth0. Just follow these steps:

1. [Add your application in the Auth0 Dashboard](/applications/spa). This will be the entity that represents your application in Auth0. When you do that, a unique key is generated for your app (called a Client Id). This must be part of the request every time you log in a user.
2. Select **Dashboard > Application > Settings**, and specify the URL of your app where Auth0 will redirect users after they authenticate.
3. [Enable the login options](/identityproviders) you want to offer to your users (for example, username/password, social media, enterprise directories, multifactor authentication, etc).
4. Edit your code to redirect to Auth0 when the user wants to authenticate. Use one of our [libraries](/libraries) to do this or directly call our [Authentication API](/api/authentication#authorization-code-grant).
5. Parse the callback results, and [restore your application's previous state](/protocols/oauth2/oauth-state#how-to-use-the-parameter-to-restore-state). For example, if the user tried to access their profile information and at that point you asked them to login, once they do, you must redirect them to the profile page they were trying to access.

## Learn More

The documents listed below will show you how to perform all these tasks as well as provide you with high-level conceptual and reference information.

### Guides

- [How to implement the Authorization Code Grant](/application-auth/current/server-side-web)
- [How to refresh a user's session](/api-auth/tutorials/silent-authentication)
- [Single Sign On (SSO)](/sso/current/single-page-apps)
- [How to validate an ID Token](/tokens/id-token#validate-an-id-token)
- [How to configure multiple login pages](/hosted-pages/login#configure-multiple-pages-by-using-separate-tenants)
- [How to get an Access Token](/tokens/concepts/overview-access-tokens)
- [How to add custom claims to your ID Token](/scopes/current#example-add-custom-claims)
- [Renew Tokens when using Safari](/api-auth/token-renewal-in-safari)

### Concepts

- [Authentication for Server-side Web Apps](/application-auth/current/server-side-web)
- [About Universal Login](/hosted-pages/login#about-universal-login)
- [Universal vs Embedded Login](/guides/login/universal-vs-embedded)
- [About Cross Origin Authentication](/cross-origin-authentication)
- [An introduction to OpenID Connect](/protocols/oidc)
- [ID Token](/tokens/id-token)
- [An introduction to OAuth 2.0](/protocols/oauth2)
- [Access Token](/tokens/concepts/overview-access-tokens)
- [Which OAuth 2.0 flow should I use?](/api-auth/which-oauth-flow-to-use)
- [How the Authorization Code Grant works](/api-auth/grant/authorization-code)
- [An introduction to JSON Web Tokens (JWTs)](/jwt)
- [Architecture scenario: SSO for Regular Web Apps](/architecture-scenarios/web-app-sso)

### References

- [Where to Store Tokens](/security/store-tokens)
- [Common Threats and How to Prevent Them](/security/common-threats)
- [Identity Providers supported by Auth0](/connections)
- [Multi-factor Authentication](/multifactor-authentication)
- [Passwordless Authentication](/connections/passwordless)
**SDKs**
- [Angular Auth0](https://github.com/auth0/angular-auth0)
- [Angular Lock](https://github.com/auth0/angular-lock)
- [Auth0.js](https://github.com/auth0/auth0.js)
- [angular2-jwt](https://github.com/auth0/angular2-jwt)
- [angular-jwt](https://github.com/auth0/angular-jwt)
- [angular-storage](https://github.com/auth0/angular-storage)
**APIs**
- [Auth0 Authentication API](/api/authentication)
- [Auth0 Management API](/api/management/v2)



## What's next?

We believe in providing powerful building blocks for our users. 

### Customize the Auth0 pages that your users see

- [Customize the login page](/hosted-pages/login)
- [Customize the password reset page](/hosted-pages/password-reset)
- If you use multi-factor authentication with Guardian, you can [customize the Guardian multi-factor login page](/hosted-pages/password-reset)
- [Customize the error pages](/hosted-pages/error-pages) that your users see in case authentication fails
- If you use Lock, customize the [UI](/libraries/lock/v11/ui-customization), the [error messages](/libraries/lock/v11/customizing-error-messages), the [language](/libraries/lock/v11/i18n), and other [configuration options](/libraries/lock/v11/configuration)

### Customize the login flow

- Execute JS code when a user authenticates to your application using [Rules](/rules). They run once the authentication process is complete, and you can use them to customize and extend Auth0's capabilities. They can be chained together for modular coding and can be turned on and off individually. Use rules to create authorization rules based on complex logic, normalize user information, deny user access based on conditions, enable multi-factor authentication based on context, and more.
- Execute arbitrary Node.js code during authentication, using [Hooks](/hooks). For example, you can intercept creation of a new database user to enforce custom password policy, employ application specific logic to prevent the signup, perform any action as a result of a successful creation of a new database user (for example, send a message to Slack, or create a record in your CRM system), and more.
- Build your multi-factor authentication flow using our [API](/multifactor-authentication/api).

### Customize the emails Auth0 sends to your users

- [Customize](/email/templates) the From Address, the Subject, or redirect to URLs for Welcome, Verification, Change Password Confirmation, and Blocked Account Emails
- Modify the lifetime of the links sent in Verification Email and Change Password Confirmation emails
- Incorporate attributes specific to the user, like their name
- [Use your own SMTP email provider](/email/providers)
- [Use our Management API to completely manage the email flow, and control when and how emails are sent](/email/custom)

### Customize the user's profile

- Save additional information for a user in the [User Metadata](/metadata)
- [Change the user's profile picture](/user-profile/user-picture)

### Explore additional features

- [Export your Auth0 logs to an external service](/extensions#export-auth0-logs-to-an-external-service)
- [Use Auth0 Extend](https://goextend.io/). This is our Serverless extensibility platform. It gives you the power of Webhooks and more, without the pain. 
- See how you can use Auth0 features to be compliant with [GDPR](/compliance/gdpr/features-aiding-compliance).

### Boost your security

If you use a database connection to authenticate users, then we have several [password options to ensure that your users pick strong passwords](/connections/database/password-options):

- Enable password history in order to prevent their re-use
- Enable the password dictionary in order to stop users from choosing common passwords
- Force a user that is setting their password to not set passwords that contain any part of the user's personal data
- Configure your [password strength policy](/connections/database/password-strength)

When a user tries to access sensitive resources, ask them to authenticate with a stronger authentication mechanism (like a code delivered to their phone), with [step-up authentication](/multifactor-authentication/step-up-authentication).

Verify a user's identity by requiring them to present more than one piece of identifying information, with [Multi-factor Authentication](/multifactor-authentication).

Use Auth0's built-in tools to detect anomalies and stop malicious attempts to access your application. [Anomaly detection](/anomaly-detection) can alert you and your users of suspicious activity, as well as block further login attempts. 

- Brute-force protection: block suspicious IPs, and notify users and administrators
- Breached password detection: have your users notified and/or blocked from logging in if we suspect their credentials were part of a published security breach.
