SAML Service Provider: Regular Web Application
SAML Identity Provider: Auth0

This means: The web app is expecting a SAML response as opposed to an OIDC flow

- share a new property being added to app_metadata via a rule that is also meant to be used as part of the SAML mapping
    - Auth0 takes the app_metadata's properties and promotes them as root level properties during the auth transaction (this step is done before rule execution)
    - example:
        - user logs in for the first time
        - we want to use a rule to return the Salesforce ID and store it as a property on app_metadata
    - in the example, if we want to include the new property as part of the SAML response, we need to (for the first login at least) save it to app_metadata and set it as `user.salesforceId` -- do not save it to the user as a root property
        - this allows the SAML mapping to work
- discuss alternatives?

- SP- vs IDP-initiated login
- Single Logout
- Encrypting SAML requests: why or why not

Main Use Cases:
- Most customers are integrating with existing commercial apps that offer SAML SSO Integration, such as Slack, Salesforce, Tableau, and so on
- Use for SAML Web Apps are legacy apps
- Company A acquires Company B and the app is legacy -- very few brand new apps are configured as SAML SPs

Most general:
- Service Provider-initiated SAML
- HTTP-Post binding
- Both with encrypted assertion/requests or without encryption

Tableau and WatchGuard were massive users of SAML, and the above was most common; SLO was important for Tableau, but only when the SP was a 3rd party