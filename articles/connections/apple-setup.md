---
title: Setting up Sign in with Apple
description: Learn how to set up your application with Apple prior to setting up your Apple connection at Auth0.
toc: true
beta: true
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
# Set Up Your Application in Sign in with Apple

This guide shows you how to set up an application in your pple Developer account. Once done, you can use the assigned credentials to set up your Apple connection in the Dashboard.

## Prerequisites

You will need a paid [Apple Developer](https://developer.apple.com/programs/) account. If you want to use Sign in with Apple as an identity provider for Auth0, you'll also need a [Custom Domain](/custom-domains) set up. Custom domains are required for domain verification with Apple.

![Developer Program](/media/articles/connections/social/apple/apple-developerprogram.jpg)

::: note
You can test the Apple connection using the [Dashboard](${manage_url}) by going to **Connections > Social**. Click **Try** on the Apple connection (leave the settings blank). This will let you test with Auth0’s developer credentials. Prior to using the connection in Production, you must provide your own credentials (we'll cover how to do this later in this guide).
:::

## Set up your app in your Apple Developer Account

### Get your Team ID

![Membership Page](/media/articles/connections/social/apple/apple-membership.jpg)

Make note of your Team ID, which you can find on the [Membership page](https://developer.apple.com/account/#/membership/) of your Apple Developer Account.

### Create your App Identifier

First, we need to create an App Identifier.

1. If you have not already done so, sign in to your [Apple Developer Account](https://developer.apple.com/account/#/overview/).
1. Go to **Certificates, IDs, & Profiles > Identifiers** and click the **blue plus icon** next to **Identifiers** to create a new App ID.
1. Choose **App IDs** as the identifier type and click **Continue**
1. Provide a description and a Bundle ID (reverse-domain name style, e.g., `com.acme`)
1. Scroll down and check **Sign In with Apple**. Then click **Continue**, followed by **Register**

### Create your Services ID

Next, create the Services ID.

![Register Services ID](/media/articles/connections/social/apple/apple-registerservicesid.jpg)

1. Back in the **Certificates, IDs, & Profiles** section, click the **blue plus icon** next to **Identifiers**.
1. Choose **Services IDs** and click **Continue**. Fill in the description and identifier (`com.acme.webapp`).
1. After checking **Sign In with Apple**, click on **Configure** and define your **Web Domain** (`acme.com`) and your **Return URL**. Make sure that your Return URL follows this format: `https://accounts.acme.com/login/callback` (where `accounts.acme.com` is the custom domain you configured in Auth0).
  ![Configure URLs](/media/articles/connections/social/apple/apple-configureurls.jpg)
1. Click **Save**, and then **Continue** followed by **Register**.

### Verify your domain with Apple

1. On the **Certificates, IDs, & Profiles** page, click your newly created Services ID.
1. Click the **Configure** button next to the **Sign In with Apple** feature, then click **Download**.
1. Copy the `apple-developer-domain-association.txt` file to your application server and make it accessible at `https://acme.com/.well-known/apple-developer-domain-association.txt`.
1. When this is ready, click **Verify** on your Services ID configuration page. If no error message is shown, your domain has been successfully verified.

### Setup your Signing Key

1. Go to **Keys** under the **Certificates, Identifiers, & Profiles** section of your Apple developer dashboard.
1. Click on the **blue plus icon** to add a new key.
1. Enter a **Key Name** and check the **Sign In with Apple** option.
1. Click **Configure** to make sure the **Choose a Primary App ID** field is filled with the correct App ID.
1. Click **Save**, **Continue**, and then **Register**.
1. On the page to which you're redirected after registering, make a note of the Key ID. Then, download the key, move it to its own directory, and rename the key file that you downloaded to `authkey.p8`. 
1. Use a JWT library with support for the ES256 algorithm to generate the client secret from the key. The example below uses Node.js, but libraries for other languages can be used in a similar fashion. To use this script, create a new file called `generate-secret.js` in the same directory as the downloaded key and add the following code:

```js
const jwt = require("jsonwebtoken");
const fs = require("fs");

const privateKey = fs.readFileSync("./authkey.p8");
const token = jwt.sign({}, privateKey, {
 algorithm: "ES256",
 expiresIn: "60 days",
 audience: "https://appleid.apple.com",
 issuer: "TEAM_ID",
 subject: "com.acme.webapp",
 keyid: "KEY_ID"
});

console.log("The token is:", token);
```

::: note
You will need to replace:

* `com.acme.webapp` with the identifier for your Services ID
* `TEAM_ID` with your Team ID
* `KEY_ID` with your Key ID
:::

Once your script is ready, run the following on the command line to generate your client secret:

`node generate-secret.js`

This gives you the last of the items you need to provide when setting up the connection in Auth0's dashboard: 

* The Apple Team ID
* The Client ID (the Service ID)
* The Client Signing Key ID
* The Client Secret Signing Key

You can take these credentials and return to the [Apple Connection](/connections/social/apple) page to finish setting up your Auth0 connection.
