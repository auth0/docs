# Obtaining a ClientId and Client Secret for Google

To configure Google OAuth connections (Google Apps and Google) you will need to register Auth0 with Google on the API Console.

##1. Log in  API Console
Go to the [API Console](https://console.developers.google.com), and click __Create Project__.

A dialog like the one shown in the following figure will be displayed.

![](img/goog-api-app-empty.png)

##2. Complete information about your instance of Auth0

Provide your app's information and click **Create**.

> The information provided in this dialog is not related to Auth0. It is only useful for your reference

![](img/goog-api-app-info.png)

An activity will begin, as shown in the following figure. Once the activity is completed you will be redirected to the project's dashboard to continue with the next steps.

![](img/goog-api-creation-activity.png)

---

##3. Enable the Google+ API

Click **Enable an API** and locate the **Google+ API** item in the list.

![](img/goog-api-plus-off.png)

Enable it by clicking **OFF**.

![](img/goog-api-plus-on.png)

---

##4. Get your ClientId and ClientSecret

Click **Credentials** in the left sidebar and then click **Create new Client ID**.

![](img/goog-api-credentials.png)

Enter your tenant's information. That means replacing the appearences of **"YOURTENANT"** shown in the following figure with the tenant you created.

![](img/goog-api-client-creation.png)

Click **Create Client ID**. The resulting settings will be displayed:

![](img/goog-api-client-settings.png)

You can now use the `ClientId` and `ClientSecret` for your Auth0 connection's settings.

##5. Enable Admin SDK Service

If you are planning to connect Google Apps enterprise domains, you need to enable the __Admin SDK__ service.

To do so, click **API** in the left sidebar, locate the **Admin SDK** item and click **OFF** to turn it on.

![](img/goog-api-admin-sdk.png)
