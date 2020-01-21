The [Password Reset](/universal-login/password-reset) page is used whenever a user takes advantage of password change functionality and, as with the login page, you can [customize it](/universal-login/password-reset#edit-the-password-reset-page) to reflect your organization's particular branding requirements. 

<% if (platform === "b2b") { %>
If your organization users will all be isolated from each other (i.e, each organization gets its own Auth0 [database connection](/connections/database)), and you are branding the [Universal Login](#universal-login-and-login-pages) pages by organization, then it's also important to brand things like the [password reset](/universal-login/password-reset) page so users know for which organization the password change is occurring. This can be done in a couple of ways:

* Create JavaScript on the Password Reset page that can pull resources from a CDN based on the connection parameter that indicates from which organization the user is coming.
* Create a separate tenant for an organization and use Universal Login to customize what is required for that organization.
<%  } %>
