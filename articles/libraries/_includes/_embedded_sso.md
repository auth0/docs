### SSO with embedded authentication

Apps with embedded login must meet two criteria in order to have SSO.

1. Both of the applications attempting SSO must be [first-party applications](/applications/concepts/app-types-first-third-party#first-party-applications). SSO with third party applications will not work.
1. They need to make use of [custom domains](/custom-domains) and have both the applications which intend to have SSO as well as the Auth0 tenant on the same domain. Traditionally, Auth0 domains are in the format `foo.auth0.com`, but custom domains allow you to use the same domain for each of the applications in question as well as your Auth0 tenant, preventing the risk of CSRF attacks.

::: note
Our recommendation is to use [Universal Login](/hosted-pages/login) instead of setting up SSO in embedded login scenarios. Universal Login is the most reliable and stable way to perform SSO, and is the only way to do so if you must use multiple domains for your applications, or use [third-party applications](/applications/concepts/app-types-first-third-party#third-party-applications).
:::
