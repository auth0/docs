<!-- markdownlint-disable MD041 -->

When you use Auth0, you delegate the authentication process to a centralized service. Auth0 provides you with functionality to log in and log out users from your application. However, your application may need to access resources from a secured API.

You can also [protect an API with Auth0](https://auth0.com/docs/microsites/protect-api/protect-api). We offer multiple [Auth0 API quickstarts](https://auth0.com/docs/quickstart/backend) to help you integrate Auth0 with your backend platform.

When an API is protected by Auth0, the authorization process is delegated to a centralized service that ensures only approved applications can access private resources. Your application authenticates the user and, in the process, it also receives an access token from Auth0. The application can then pass that access token to the API as a credential, as prescribed by OAuth2. In turn, the API can use Auth0 libraries (or any libraries capable to process JWT, the open standard Auth0 uses to encode access tokens) to verify the access tokens it receives from the calling application and issue a response with the desired data.

The focus of this guide is to show you how to configure the SDK to call APIs that require an access token. Instead of creating a demo API to test the client-server connection, you'll use the [Auth0 Management API](https://auth0.com/docs/api/management/v2), which comes bundled with your Auth0 tenant. However, you can adapt this guide to work with any API that you are securing with Auth0.
