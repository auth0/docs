# What is SSO?

SSO means Single Sign On. The user logs in to one application and it's "automatically" signed in to every other application, regardless of the platform, technology and domain.

For example, Google implements SSO for their products: Gmail, YouTube, Analytics, etc. When you turn on your computer and access Gmail, you login for the first time. Then, you go to YouTube and you don't get prompt to login again.

The way this works is by means of a "central service" (in the case of Google at https://accounts.google.com). When you login for the first time a cookie gets created on this central service. Then, when you try to access the second application, you get redirected to the central service, but since you already have a cookie, you get redirected to the app directly with a token, which means you're already logged in.

## How to implement SSO?

For every application in Auth0 that you want to enable SSO, you have to turn on the SSO flag on the application settings on the Auth0 dashoard (or through the API)

<img src="https://cdn.auth0.com/docs/sso-checkbox.png" alt="Single Sign On Checkbox" style="width: 50%">

Then, there are two ways of implementing SSO in Auth0. One involves client-side (JavaScript) and the other is completely server side.

* [Client-side SSO (Single Page Apps)](single-page-apps-sso)
* [Server-side SSO (Regular Web Apps)](regular-web-apps-sso)

> You can see an example of SSO with both Single Page Apps and Regular Web Apps in [this github repository](https://github.com/auth0/auth0-sso-sample)


# What is Single Log Out?

Single Logout is the process where you clean up the session of each application the user is logged in. To continue with the Google example, if you logout from Gmail, you get logged out also from YouTube, Google Analytics, etc.
