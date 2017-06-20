---
description: Describes the differences between the Auth0 Client types and what they mean when it comes to settings
---

# Client Settings

When creating an Auth0 Client, you'll be asked to indicate the *type* of Client you want to create. 

![Window for selecting client type](/media/articles/clients/create-clients.png)

You can choose from one of four options:

* **Native**: used for desktop or mobile apps that run natively on the the device
* **Single Page Web Applications**: apps with a JavaScript front-end utilizing an API
* **Regular Web Applications**: traditional web apps with refresh behavior
* **Non Interactive Clients**: CLIs, daemons, or services running on the back-end

## Settings

By default, the settings for all client types include the following:

* **Name**: the name of your Client;
* **Domain**: the Auth0 domain associated with your account;
* **Client ID**: the unique ID of your Client;
* **Client Secret**: the unique secret for your Client;
* **Description**: a description of what your Client is used for;
* **Client Type**: the type of Client this is;
* **Allowed Callback URLs**: the URLs to which the user can be redirected after authentication;
* **Allowed Logout URLs**: the URLs to which a user can be redirected to after logout;
* **Allowed Origins (CORS)**: URLs allowed to make JavaScript requests to the Auth0 API
* **JWT Expiration (seconds)**: the length of time before the Auth0-issued ID token expires;
* **Use Auth0 instead of the IdP to do Single Sign On**: if enabled, Auth0 handles SSO instead of the IdP

![Client Settings Page](/media/articles/clients/settings.png)

Clients of type **Non Interactive Clients** or **Regular Web Page Applications**, have an additional setting called **Token Endpoint Authentication Method**. This defines the token endpoint's requested authentication method, and the accepted values are:

* `None`, for a public client without a client secret
* `Post`, for a client using HTTP POST parameters
* `Basic`, for a client using HTTP Basic parameters 

### Advanced Settings

The **Advanced Settings** section allows you to:

* Manage or add Client Metadata, Mobile, OAuth, and WS-Federation settings 
* Obtain certificates and token endpoint information

![Advanced Client Settings Page](/media/articles/clients/advanced-settings.png)

Regardless of which Client Type you choose, this area is the same. The exception is for Clients of type **Non Interactive Clients** or **Regular Web Page Applications**; both, under the OAuth tab, show a **Trust Token Endpoint IP Header** setting. By enabling this setting, the `auth0-forwarded-for` is set as trusted and used as a source of end user IP information for protection against brute-force attacks on the token endpoint.
