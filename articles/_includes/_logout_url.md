### Configure Logout URLs

A logout URL is a URL in your application that Auth0 can return to after the user has been logged out of the authorization server. This is specified in the `returnTo` query parameter.

You can set the logout URL for your app in the **Allowed Logout URLs** field in your [Application Settings](${manage_url}/#/applications/${account.clientId}/settings). If you don't set a logout URL, your users will be unable to log out of the application and will get an error.

<% if (typeof(returnTo) !== "undefined") { %>
  ::: note
  If you are following along with the sample project you downloaded from the top of this page, you should set the **Logout URL** to `${returnTo}`.
  :::
<% } %>