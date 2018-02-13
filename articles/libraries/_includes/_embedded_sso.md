### SSO with embedded authentication

Apps with embedded login must meet two criteria in order to have SSO.

1. Both of the clients attempting SSO must be [first-party clients](/clients/client-types#first-party-client). SSO with third party clients will not work.
1. They need to make use of [custom domains](/custom-domains) and have both the applications which intend to have SSO as well as the Auth0 tenant on the same domain. Traditionally, Auth0 domains are in the format `foo.auth0.com`, but custom domains allow you to use the same domain for both the applications in question and your Auth0 tenant, preventing the risk of CSRF attacks.

Our recommendation is to use [universal login](/hosted-pages/login) instead of setting up SSO in embedded login scenarios. Universal login is the most reliable and stable way to perform SSO, and is the only way to do so if you must use multiple domains for your applications, or use [third-party clients](/clients/client-types#third-party-client).
