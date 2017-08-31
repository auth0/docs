This guide walks you through setting up authentication and authorization in your ${library} apps with Auth0.

If you are new to Auth0 please check our [Auth0 Overview](https://auth0.com/docs/overview).

If you want to have a complete picture of how to integrate Authentication and Authorization for Single Page Applications, you can read about it [here](https://auth0.com/docs/architecture-scenarios/application/spa-api). 

If you are interested in a deeper undertanding of the OAuth flows that are used by Single Page Applications, read about the [Implicit Grant Flow](https://auth0.com/docs/api-auth/tutorials/implicit-grant)

<%= include('../../../_includes/_new_app') %>

<%= include('../../../_includes/_callback_url') %>

::: note
If you are following along with the sample project,  **Allowed Callback URLs** should be set to `${callback}`.
:::

<%= include('../_includes/_install_auth0js') %>
