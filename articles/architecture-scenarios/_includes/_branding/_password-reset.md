The [Password Reset](/universal-login/password-reset) page is used whenever a user takes advantage of password change functionality and, as with the login page, you can [customize it](/universal-login/password-reset#edit-the-password-reset-page) to reflect your organization's particular branding requirements. 

<% if (platform === "b2b") { %>
If your organization users will all be isolated from each other, than it is important to make it clear on the Universal Login page which organization the change password page is for. This can be done in a couple of ways:

* Create JavaScript on the Change Password Page that can pull resources from a CDN based on the connection parameter presented to it which should tell you which organization the user is from.
* Create a separate tenant for the organization and use the Universal Login page to customize any way desired for that organization.
<%  } %>