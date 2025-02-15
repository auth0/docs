<!-- markdownlint-disable MD041 -->

::: note
**New to Auth?** Learn <a href="/overview" target="_blank">How Auth0 works</a>, how it <a href="/architecture-scenarios/web-app-sso" target="_blank">integrates with Regular Web Applications</a> and which <a href="/flows" target="_blank">protocol</a> it uses.
:::

<%= include('../../../_includes/_new_app', { showClientSecret: true, isPublicClient: false }) %>

<%= include('../../../_includes/_callback_url') %>

::: note
If you are following along with the sample project you downloaded from the top of this page, the callback URL you need to add to the **Allowed Callback URLs** field is `${callback}`.
:::
