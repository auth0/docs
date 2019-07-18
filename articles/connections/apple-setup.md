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

This guide will show you how to use your Apple Developer account to set up your application with Apple. Once you have it ready to use, you can take the credentials you acquire during the process and use those to set up your [Apple connection](/connections/social/apple) in the Auth0 Dashboard.

## Prerequisites

In order to proceed, you will need an [Apple Developer](https://developer.apple.com/programs/) account, which is a paid account with Apple. If you intend to use Sign in with Apple as an Identity Provider for Auth0, you will also need a [Custom Domain](/custom-domains) set up on your Auth0 tenant (this is required because you must be able to do domain verification with Apple).

::: note
You can test out the Apple connection by simply going to the [Dashboard](${manage_url}) to **Connections > Social** and Try the Apple connection, leaving the settings blank. This will let you test it out with Auth0’s developer credentials. Prior to use in production applications, however, you will need to set up your own, which this guide details.
:::

## Set up your app in your Apple Developer Account

### Get your Team ID

![Membership Page](/media/articles/connections/social/apple/apple-membership.jpg)

Make note of your Team ID, which you can find on the [Membership page](https://developer.apple.com/account/#/membership/) of your Apple Developer Account.

### Create your App Identifier

First, we need to create an App Identifier.

1. If you have not already done so, sign in to your [Apple Developer Account](https://developer.apple.com/account/#/overview/).
1. Go to **Certificates, IDs, & Profiles > Identifiers** and click the blue plus icon next to **Identifiers** to create a new App ID.
1. Choose **App IDs** as the identifier type and hit **Continue**
1. Provide a description and a Bundle ID (reverse-domain name style, i.e., com.mycustomdomain)
1. Scroll down and check **Sign In with Apple**, then **Continue** followed by **Register**

### Create your Services ID

Now, we need to create the Services ID.

1. Back at the **Certificates, IDs, & Profiles** section, click the blue plus icon next to **Identifiers**.
1. Choose **Services IDs** and click **Continue**. Fill in the description and identifier (`com.mycustomdomain.webapp`).
1. After checking **Sign In with Apple**, click on **Configure** and define your **Web Domain** (`mycustomdomain.com`) and your **Return URL** (`https://mycustomdomain.com/login/callback`). Make sure that you follow this format and just 
1. Click **Save**, and then **Continue** followed by **Register**.

### Verify your domain with Apple

1. On the **Certificates, IDs, & Profiles** page, click your newly created Services ID.
1. Hit the **Configure** button next to the **Sign In with Apple** feature, then click **Download**.
1. Copy the `apple-developer-domain-association.txt` file to your application server and make it accessible at `https://mycustomdomain.com/.well-known/apple-developer-domain-association.txt`.
1. When this is ready, click **Verify** on your Services ID configuration page. If no error message is shown, all is well.

### Setup your Signing Key

1. Head to **Keys** under the **Certificates, Identifiers, & Profiles** section of your Apple developer dashboard.
1. Click on the round, blue, plus icon to add a new key.
1. Enter a **Key Name** and check the **Sign In with Apple** option.
1. Click on **Configure** to make sure the **Choose a Primary App ID** field is filled with the correct App ID.
1. Hit **Save**, **Continue**, and then **Register**.
1. On this page, make a note of the Key ID, then download the key, move it to its own directory, and rename the key file that you downloaded to `authkey.p8`. 
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
 subject: "com.mycustomdomain.webapp",
 keyid: "KEY_ID"
});

console.log("The token is:", token);
```

::: note
You will need to replace `com.mycustomdomain.webapp` with the identifier for your Services ID and replace `TEAM_ID` with your Team ID, which you located above. Lastly, you will also need to replace `KEY_ID` with the Key ID you noted earlier.
:::

Once your script is redy, run it to generate your client secret:

`node generate-secret.js`

This gives you the last of the items you need to provide when setting up the connection in Auth0's dashboard: 

* The Apple Team ID
* The Client ID (the Service ID)
* The Client Signing Key ID
* The Client Secret Signing Key
