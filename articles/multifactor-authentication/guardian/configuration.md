# Setting Up Guardian

Guardian is Auth0's multifactor authentication (MFA) application that provides a simple, safe way for you to implement MFA. It is currently available for mobile devices running iOS or Android.

For applications where Guardian MFA is enabled, the user will be required to sign in **and** confirm the signin with an verified mobile device. For additional information on the user log in process, please see the docs on the [Guardian UX/UI]().

## Implementing Multifactor Authentication
Within Auth0, you may implement MFA via the **Multifactor Auth** page of the Management Dashboard.

![](/guardian-dashboard.png)

### Integrating with External MFA Providers

Auth0 provides [built-in support](https://auth0.com/docs/multifactor-authentication#using-auth0-s-built-in-support) for MFA using Google Authenticator or Duo. This does *not* require you to use Guardian.

You may choose to use either of these providers on the **Multifactor Auth** page of the Management Dashboard.

### Configuring Guardian in the Management Dashboard

The first thing you will do when setting up Guardian is to decide whether you would like MFA to occur via push notifications, SMS, or both.

* **Push Notifications**:
* **SMS**:

To enable either Push Notifications or SMS verification, move the appropriate slider to the right.

![](/guardian-both.png)

Once you have enabled either option, you will be presented with the code snippet you will need to edit to ensure that MFA is applied to the appropriate Connections.

```js

```

### Customizing the Guardian Screen.

You may change the logo and the friendly name that is displayed to your users. To do so, you may make the appropriate settings changes from the Guardian page's link to Account Settings.

![](/guardian-logo-and-name-settings.png)

* **Friendly Name**: the name of the app that you want displayed to the users;
* **Logo URL**: the URL that points to the logo image you want displayed to your users.

![](/default-guardian-view.png)
