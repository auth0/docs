---
title: Register Apps in the Apple Developer Portal
description: Learn how to set up your application with Apple before you set up your Apple connection in the Auth0 Dashboard.
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
# Register Apps in the Apple Developer Portal

Before you configure an Apple social connection in the Auth0 Dashboard, you need to set up your application on your Apple Developer account in the Apple Developer Portal. Once that is complete, you can use the assigned credentials you receive from Apple to set up your Apple connection in the Auth0 Dashboard. 

::: note
You can test the Apple connection with Auth0's developer credentials first by using the [Dashboard](${manage_url}) and going to **Connections > Social**. Click **Try** on the Apple connection, leaving the settings blank. Prior to using the connection in production, you must provide your own credentials as shown below.

![Developer Program](/media/articles/connections/social/apple/apple-developerprogram.jpg)
:::

After you register your application, you will be given the following IDs and keys to use in the application connection settings in the Dashboard:

* Apple Team ID (App ID)
* Services ID (Client ID)
* Client Secret Signing Key
* Client Signing Key ID (optional)

## Prerequisites

* A paid [Apple Developer](https://developer.apple.com/programs/) account. 

* A [Custom Domain](/custom-domains) set up. Custom domains are required for domain verification with Apple.

## Obtain Team ID

1. Sign in to your [Apple Developer Account](https://developer.apple.com/account/#/overview/).

2. Go to the [Membership page](https://developer.apple.com/account/#/membership/) of your Apple Developer account.

    ![Membership Page](/media/articles/connections/social/apple/apple-membership.jpg)

3. Make note of your Team ID.

## Create App ID

1. On the Apple Developer Portal, go to **Certificates, IDs, & Profiles > Identifiers** and click the **blue plus icon** next to **Identifiers** to create a new App ID.
2. Choose **App IDs** as the identifier type and click **Continue**
3. Provide a description and a Bundle ID (reverse-domain name style, e.g., `com.customdomain`)
4. Scroll down and check **Sign In with Apple**. 
5. Click **Continue** and then click **Register**

## Create Services ID

1. Back in the **Certificates, IDs, & Profiles** section, click the **blue plus icon** next to **Identifiers**.

    ![Register Services ID](/media/articles/connections/social/apple/apple-registerservicesid.jpg)

2. Choose **Services IDs** and click **Continue**. Fill in the description and identifier (`com.customdomain.webapp`).
3. After checking **Sign In with Apple**, click on **Configure** and define your **Web Domain** (`customdomain.com`) and your **Return URL**. Make sure that your Return URL follows this format: `https://customdomain.com/login/callback`.

    ![Configure URLs](/media/articles/connections/social/apple/apple-configureurls.jpg)

4. Click **Save**, **Continue**, and then click **Register**.

### Verify domain with Apple

1. On the **Certificates, IDs, & Profiles** page, click your newly created Services ID.
2. Click the **Configure** button next to the **Sign In with Apple** feature.

3. On the **Redirect URI/Domain Validation** page click **Download**.
4. Copy or move the `apple-developer-domain-association.txt` file to your application server and make it accessible at `https://customdomain.com/.well-known/apple-developer-domain-association.txt`.
1. When this is ready, click **Verify** on your Services ID configuration page. If no error message is shown, your domain has been successfully verified.

## Set up Signing Key

1. Go to **Keys** under the **Certificates, Identifiers, & Profiles** section of your Apple developer dashboard.
2. Click on the **blue plus icon** to add a new key.
3. Enter a **Key Name** and check the **Sign In with Apple** option.
4. Click **Configure** to make sure the **Choose a Primary App ID** field is filled with the correct App ID.
5. Click **Save**, **Continue**, and then **Register**.
6. On the page to which you're redirected after registering, make a note of the Key ID. Then, download the key, move it to its own directory, and rename the key file that you downloaded to `authkey.p8`. 
7. Use a JWT library with support for the ES256 algorithm to generate the client secret from the key. The example below uses `Node.js`, but libraries for other languages can be used in a similar fashion. To use this script, create a new file called `generate-secret.js` in the same directory as the downloaded key and add the following code:

    ```js
    const jwt = require("jsonwebtoken");
    const fs = require("fs");

    const privateKey = fs.readFileSync("./authkey.p8");
    const token = jwt.sign({}, privateKey, {
    algorithm: "ES256",
    expiresIn: "60 days",
    audience: "https://appleid.apple.com",
    issuer: "TEAM_ID",
    subject: "com.customdomain.webapp",
    keyid: "KEY_ID"
    });

    console.log("The token is:", token);
    ```

    Replace the following values:

    * `com.customdomain.webapp` with the identifier for your Services ID
    * `TEAM_ID` with your Team ID
    * `KEY_ID` with your Key ID

8. Once your script is ready, run the following on the command line to generate your client secret:

    `node generate-secret.js`

    This gives you the last of the items you need to provide when setting up the connection in Auth0's dashboard.

Next, you will use these credentials on the [Auth0 Dashboard > Connections > Settings](${manage_url}/#/connections/social) page in the dashboard to continue to configure your application. Depending on which type of application you want to configure, choose one of the following methods:

* [Add Sign In with Apple to Native iOS Apps](/connections/apple-siwa/add-siwa-to-native-app)
* [Add Sign In with Apple to Web or Other Apps](articles/connections/apple-siwa/add-siwa-to-web-app)

## Keep reading

* [iOS Swift - Sign In with Apple Quickstart](/quickstart/native/ios-swift-siwa)
* [Rate Limits for Sign In with Apple](/policies/rate-limits#limits-on-sign-in-with-apple)
* [Configure Email Relay Service for Sign In with Apple](/connections/apple-siwa/configure-email-relay-service)
* [Test Sign In with Apple Configuration](/connections/apple-siwa/test-siwa-connection)
