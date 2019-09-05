---
title: Add Sign In with Apple to Your Native App
connection: Apple
index: 3
image: /media/connections/apple.svg
seo_alias: apple
description: Learn how to add native login functionality to your native app with Apple. 
toc: true
topics:
  - authentication
  - connections
  - social
  - apple
contentType: how-to
useCase:
  - add-login
  - customize-connections
  - add-idp
---
# Add Sign In with Apple to Your Native App

To set up and configure Sign In with Apple for your native app, you will do the following:

1. [Complete the prerequisites](#before-you-begin): Have an Apple Developer account (paid), an Auth0 tenant set up with a custom domain, and a web application configured to use Auth0 for authentication at that domain.  
2. [Register your app in your Apple Developer account](#register-your-app-in-your-apple-developer-account): Obtain Apple IDs and keys for the application connection settings in the Dashboard.
3. [Configure and test the application connection in Auth0](#configure-the-connection-in-auth0): Complete the social connection settings configuration information with the IDs and keys you obtained for your application from Apple. 

## Prerequisites

<%= include('../_includes/_siwa-prerequisites') %>

## Register your native app on your Apple Developer account

Once your Apple Developer account is set up, follow the instructions in the [Apple Setup Guide](/connections/apple-setup) to set up your application. 

When setting up your application, make sure you save the following IDs and keys for the application connection settings in the Auth0 Dashboard:

* Client ID (the Service ID)
* Client Secret Signing Key
* Apple Team ID
* Client Signing Key ID (optional)

1. When you sign into the developer account, go to the [Certificates, IDs, & Profiles](https://developer.apple.com/account/resources/certificates/list) section, and choose the [Identifiers](https://developer.apple.com/account/resources/identifiers/list/serviceId) subsection on the left menu.

2. Click **Register an App ID** button.

3. Choose **App IDs** as the identifier type, and click **Continue**. 

4. Enter a description for your new App ID and a Bundle ID. For the latter, Apple recommends using a reverse-domain name style string (for example, `com.<YOUR CUSTOM DOMAIN>.appid`). 

5. Scroll down and check the **Sign In with Apple** feature. You won't have to use the **Edit** here. You will configure this feature later.

6. Leave the other options with their default values and click **Continue**. When you click on this button, Apple  displays a summary of the options you just configured. If everything is correct, click **Register**. Apple redirects you to the **Certificates, Identifiers & Profiles** subsection again, this time listing your new App ID. 

7. Create a Service ID that represents your application. This might look like a redundant effort, but Apple organizes it so you can nest multiple Services IDs under the same App ID. This makes sense when you have distinct versions of your application to support different devices.

8. Click the round, blue icon next to the **Identifiers** header, then choose **Services IDs** and click  **Continue**. 

9. Fill in the same fields as in step 4 above (description and identifier), and enable the **Sign In with Apple** feature. 

10. Click **Configure**. Apple displays a dialog where you define the web domain you will use (`<YOUR CUSTOM DOMAIN>.com`) and add a **Return URL** (`https://<YOUR CUSTOM DOMAIN>/login/callback`). Click **Save**.  

11. On the **Register a Services ID** page, click **Continue** and, on the next screen, click **Register**.

    After registering your Service ID, Apple redirects you to the **Certificates, Identifiers & Profiles** page. There, you will see your newly-created Service ID.
  
12. Click the Service ID and view the details of the service. Click **Configure** next to the **Sign In with Apple** feature. 

    This time, Apple displays two new buttons next to your domain: **Download** and **Verify**.

13. Click **Download** for Apple to send you a file called `apple-developer-domain-association.txt`. You will have to use the contents of this file soon. Also, keep the page open because you will have to use the **Verify** button later.

## Configure and test the connection in Auth0

1. Once you have the credentials you need from your Apple developer account, Go to [**Connections** > **Social**](${manage_url}), and click on the **Apple** connection.

2. On the **Settings** tab, complete the fields **Client ID** (Services ID), **Client Secret Signing Key**, and **Apple Team ID**. You can also fill in the **Key ID** but it is optional, as Apple will accept the key without the ID.

    ![Application Connection Settings: Advanced Mobile Settings](/media/articles/connections/social/apple/apple-app-mobile-settings.png)

3. Click **Save**.

4. [Test the connection](/connections/social/apple/guides/test-siwa-connection).

## Keep reading

* [Auth0 Blog: What is Sign In with Apple](https://auth0.com/blog/what-is-sign-in-with-apple-a-new-identity-provider/)
* See [Sign In with Apple](https://developer.apple.com/sign-in-with-apple/) for information about Apple's Sign In with Apple capabilities.
