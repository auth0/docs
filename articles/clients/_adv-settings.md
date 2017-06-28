The **Advanced Settings** section allows you to:

* Manage or add Client Metadata, Mobile, OAuth, and WS-Federation settings 
* Obtain certificates and token endpoint information
* Set the grant type(s) for the Client

![Advanced Client Settings Page](/media/articles/clients/advanced-settings.png)

#### Application Metadata

Application metadata are custom string keys and values (each of which has a character maximum of 255), set on a per application basis. Metadata is exposed in the Client object as client_metadata, and in Rules as context.clientMetadata

You can create up to 10 sets of metadata.

#### Mobile Settings

If you're developing a mobile application, you can provide the necessary iOS/Android parameters here.

When developing iOS apps, you'll provide your **Team ID** and **App Bundle Identifier**.

When developing Android apps, you'll provide your **App Package Name** and your **Key Hashes**.

#### OAuth

Set the OAuth-related settings on this tab:

* By default, all apps/APIs can make a delegation request, but if you want to explicitly grant permissions to selected apps/APIs, you can do so in **Allowed APPs/APIs**.

* Set the algorithm used (**HS256** or **RS256**) for signing your JSON Web Tokens.

* Toggle the switch to indicate if your client is OIDC Conformant or not.

#### Grant Types

Set the authorization grant types allowed for the client. See [Client Grant Types](/clients/client-grant-types) for additional information about each grant type.

#### WS-Federation

The sample script provides a basis for you to make changes to your WS-Federation settings.

#### Certificate

This page provides you with the Auth0 signing certificate, fingerprint, and thumbprint. You can also download a certificate if needed for an integration you're configuring.

#### Endpoints

This section provides you with a complete list of the OAuth, SAML, and WS-Federation endpoints for your Auth0 account.