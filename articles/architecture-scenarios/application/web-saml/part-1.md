## Authentication Process

When the user attempts to log in to the regular web app, the web app responds by:

1. Generating a SAML request
2. Redirecting the user to the SSO URL

At this point, Auth0 begins to:

1. Parse the SAML request
2. Authenticates the user
3. Generates a SAML response to send back to the regular web app for verification. This is sent using an HTTP POST call to a designated endpoint (or callback) for the regular web app. The response contains SAML assertions about the user.

If the regular web app is able to verify the SAML response, it allows the user to log in and access the protected resources. 