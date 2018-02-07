### SSO with embedded authentication

Embedded login scenarios are not able to reliably provide SSO, because of a variety of factors (such as types of clients, differing browsers, differing domains, and others). For this reason, Auth0's recommendation is that any client applications which **require** SSO should use [universal login](/hosted-pages/login) rather than embedded login.

Our recommendation is to use [universal login](/hosted-pages/login) instead. This recommendation is a requirement if you have multiple domains or use [third-party applications](/clients/client-types#third-party-client).
