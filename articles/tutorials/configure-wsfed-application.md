# How to configure a WS-Fed application

If a WS-Fed application (Service Provider) is  to use Auth0 as an Identity Provider, this is configured in one of two places.

Some commonly used WS-Fed applications are pre-configured in Auth0 and available via `Single Sign On Integrations`.

If a WS-Fed application is not listed in `Single Sign On Integrations`, the generic WS-Fed application configuration can be accessed via:

1. In the Auth0 Dashboard, click on `Applications`, `+ CREATE APP`, enter a name and press Save.
2. Then click on the `Addons` tab -> `WS-Fed Web App`.
3. Enter the `Application Callback URL` - this is the URL in the WS-Fed application to which the WS-Fed response will be posted.  It may also called the `ACS` or `Assertion Consumer Service URL` in some applications. 
4. Enter the `Realm` - this is an identifier sent by the WS-Fed application and is used to identify the application in the response.
