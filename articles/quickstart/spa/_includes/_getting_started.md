::: note
**New to Auth?** Learn [How Auth0 works](/overview), how it [integrates with Single Page Applications](/architecture-scenarios/application/spa-api) and which [protocol](/flows/concepts/single-page-login-flow) it uses.
:::
<%= include('../../../_includes/_new_app') %>
<%= include('../../../_includes/_callback_url') %>

::: note
If you are following along with the sample project you downloaded from the top of this page, you should set the **Allowed Callback URL** to `${callback}`.
:::

<% if(typeof showLogoutInfo !== 'undefined' && showLogoutInfo === true) { %>
<%= include('../../../_includes/_logout_url') %>
<% } %>

<%= include('../_includes/_install_auth0js') %>
