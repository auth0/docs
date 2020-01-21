<!-- markdownlint-disable MD041 -->

::: note
**New to Auth?** Learn [How Auth0 works](/overview), how it [integrates with Single-Page Applications](/architecture-scenarios/application/spa-api) and which [protocol](/flows/concepts/implicit) it uses.
:::
<%= include('../../../_includes/_new_app') %>
<%= include('../../../_includes/_callback_url') %>

::: note
If you are following along with the sample project you downloaded from the top of this page, you should set the **Allowed Callback URL** to `${callback}`.
:::

<% if (typeof showLogoutInfo !== 'undefined' && showLogoutInfo === true) { %>
<%= include('../../../_includes/_logout_url') %>
<% } %>

<% if (typeof showWebOriginInfo !== 'undefined' && showWebOriginInfo === true) { %>
  <%= include('../../../_includes/_web_origins') %>

  <% if (typeof webOriginUrl !== 'undefined') { %>
  ::: note
  If you are following along with the sample project you downloaded from the top of this page, you should set the **Allowed Web Origins** to `${webOriginUrl}`.
  :::
  <% } %>

<% } %>

<%= include('../../../_includes/_token_signature') %>

<% if (typeof show_install_info === 'undefined' || (typeof show_install_info !== 'undefined' && show_install_info !== false)) { %>
  <% if (typeof new_js_sdk !== 'undefined' && new_js_sdk === true) { %>
  <%= include('_install_auth0-spa-js') %>
  <% } else { %>
  <%= include('_install_auth0js') %>
  <% } %>
<% } %>
