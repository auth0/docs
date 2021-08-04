<!-- markdownlint-disable MD041 -->

::: note
**New to Auth?** Learn [How Auth0 works](/overview), how it [integrates with Regular Web Applications](/architecture-scenarios/web-app-sso) and which [protocol](/flows) it uses.
:::

<%= include('../../../_includes/_new_app', { showClientSecret: true, isPublicClient: false }) %>

<%= include('../../../_includes/_callback_url') %>

::: note
If you are following along with the sample project you downloaded from the top of this page, the callback URL you need to add to the **Allowed Callback URLs** field is `${callback}`.
:::
