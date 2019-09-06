---
title: Generate Client Secret for Web Apps Using Sign In with Apple
connection: Apple
index: 3
image: /media/connections/apple.svg
seo_alias: apple
description: Learn how to generate a client secret for web apps that use Sign In with Apple. 
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

# Generate Client Secret for Web Apps Using Sign In with Apple

After you have [verified your domain with Apple](/connections/social/apple/guides/add-siwa-to-web-app#verify-domain-ownership-on-apple), define the environment variables you need to use this identity provider. For most OAuth-compliant identity providers, the `CLIENT_SECRET` variable is static. However, Apple rotates this secret by using signed JSON Web Tokens (JWTs) that carry the `exp` claim. 

Configure the following variables:

| Variable | Description
| --- | --- |
| **CLIENT_ID** | Gets the value that you used as the identifier of the Service ID you created at Apple  (`com.<YOUR CUSTOM DOMAIN>.webapp`). |
| **CALLBACK** | The URL to which the user will be redirected after the authentication process takes place. You will have to use the value you passed to the **Return URL** field (`<YOUR CUSTOM DOMAIN>.com/callback`) on the same Service ID. |

## Generate and download an Apple key

1. To generate the client secret key, on your Apple Developer dashboard, go to the **Keys** in **Certificates, Identifiers, & Profiles** section. 

2. Click the round, blue icon to add a new key. 

3. Use **Sign In with Apple Key** to fill the **Key Name** field, and check the **Sign In with Apple** option. 

4. Click **Configure** to confirm that the **Choose a Primary App ID** field is filled with your App ID. 

5. Click **Save**, then **Continue**, then **Register** (3 buttons on 3 pages).

    Apple redirects you to a page where you will be able to download the new key. 
  
6. Click the download button and then move the file to your project root. Rename it to `authkey.p8`. 

7. Back in the Apple Developer Portal, make a note of the Key ID click **Done**.

8. Create a new file called `generate-secret.js` inside the project root, and add the following code to it:

    ``` js
    const jwt = require("jsonwebtoken");
    const fs = require("fs");

    const privateKey = fs.readFileSync("./authkey.p8");
    const token = jwt.sign({}, privateKey, {
      algorithm: "ES256",
      expiresIn: "2 days",
      audience: "https://appleid.apple.com",
      issuer: "TEAM_ID",
      subject: "com.<YOUR CUSTOM DOMAIN>.webapp",
      keyid: "KEY_ID"
    });

    console.log("The token is:", token);
    ```

    Replace `com.<YOUR CUSTOM DOMAIN>.webapp` with the identifier for your Service ID and `TEAM_ID` with your Team ID. To find this value, visit this [page](https://developer.apple.com/account/#/membership). You'll also need to replace `KEY_ID` with the Key ID you noted earlier.

9. Run this script to generate a new token:

    ``` text
    node generate-secret.js
    ```

    The value that the script outputs is the value that you will use on the `CLIENT_SECRET` environment variable. 

## Update Auth0 custom social connection fields

1. Return to your Auth0 dashboard and make sure your custom social connection fields look like this:

    | Field | Value |
    | --- | --- |
    | Name | Apple, or any name you choose |
    | Client ID | Your Services ID identifier, (for example, `com.<YOUR CUSTOM DOMAIN>.webapp`) |
    | Client Secret | The string generated in the previous step |
    | Fetch User Profile Script | Check the variables in the script to make sure they are correct |
    | Authorization URL | `https://appleid.apple.com/auth/authorize` |
    | Token URL | `https://appleid.apple.com/auth/token` |
    | Scope | email name |
    | Custom Headers | `"UserAgent": "Auth0", "Accepts": "application/json"`|

2. Click **Save** and enable this connection for your application.

3. On your server, stop the web app instance that is running, and issue the following commands:

    ``` text
    # now you need to use the real values
    export CLIENT_ID=com.<YOUR CUSTOM DOMAIN>.webapp
    export CLIENT_SECRET=eyJ...KsA
    export CALLBACK=https://<YOUR CUSTOM DOMAIN>.com/callback

    npm start
    ```

4. Set the environment variables with the final values. If things work as expected, you will see the application running under your domain again. Then, if you request for the `/auth/.apple` route under this domain, your application will redirect you to the **Sign In with Apple** page so you can log into your application. On this page, if you use valid credentials, Apple will sign you into the application (after the multifactor authentication process).

## Keep reading

* [Auth0 and Sign In with Apple Overview](/connections/social/apple/concepts/sign-in-with-apple-overview)
* [Sign In with Apple and Auth0 Connection Use Cases](/connections/social/apple/references/siwa-use-cases)
* [Sign In with Apple and Auth0 Logging](/connections/social/apple/references/siwa-logging)
* [Sign In with Apple and Auth0 Rate Limits](/connections/social/apple/references/siwa-rate-limits)
* [Sign In with Apple and Auth0 Troubleshooting](/connections/social/apple/references/siwa-troubleshooting)
