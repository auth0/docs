::: note
**New to Auth?** Learn [How Auth0 works](/overview), how it [integrates with Regular Web Applications](/architecture-scenarios/application/web-app-sso) and which [protocol](/flows/concepts/auth-code) it uses.
:::

<%= include('../../../_includes/_new_app', { showClientSecret: true }) %>

<%= include('../../../_includes/_callback_url') %>

::: note
If you are following along with the sample project you downloaded from the top of this page, the callback URL you need to whitelist in the **Allowed Callback URLs** field is `${callback}`.
:::
