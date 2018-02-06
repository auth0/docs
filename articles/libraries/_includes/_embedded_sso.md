### SSO with embedded authentication

If you use embedded login, then you can only implement SSO if your applications are [first-party clients](/clients/client-types#first-party-client) who share the same top level domain (for example, `app1.acme.com` and `app2.acme.com`). 

Our recommendation is to use [universal login](/hosted-pages/login) instead. This recommendation is a requirement if you have multiple domains or use [third-party applications](/clients/client-types#third-party-client).
