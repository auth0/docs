---
title: Add Sign in with Apple to Your App
connection: Apple
index: 3
image: /media/connections/apple.svg
seo_alias: apple
description: Learn how to add login functionality to your app with Apple. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
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
# Add Sign in with Apple to Your App

To add support for Sign in with Apple, you'll need to have an Auth0 tenant set up with a custom domain, as well as a web application configured to use Auth0 for authentication at that domain. You can get an application up and running in a few simple steps by using any of our quick starts. Note that for the following instructions, your application can use any development stack: Node.js, ASP.NET, Java, and so on.

Using the Apple connection will require the following:

* An [Apple Developer](https://developer.apple.com/programs/) account, which is a paid account with Apple. (There is no free trial available (unless you are part of their [iOS Developer University Program](https://developer.apple.com/support/compare-memberships/)).
* A [Custom Domain](/custom-domains) set up on your Auth0 tenant (this is required because you must be able to do domain verification with Apple).

::: panel Test the Connection with Auth0 Developer Credentials First
You can test out the Apple connection before you begin by going to the [Dashboard](${manage_url}) to **Connections > Social** and **Try** the Apple connection, leaving the settings blank. This will let you test it with Auth0’s developer credentials. Prior to using it in production applications however, you will need to set up your own developer credentials.
:::

## Set up your app in your Apple Developer Account

Once your Developer Account is set up, you can follow the instructions in the [Apple Setup Guide](/connections/apple-setup) to get your app set up. If you have any issues, refer to the [Apple Documentation](https://developer.apple.com/sign-in-with-apple/get-started/).

When setting up your application, make sure you save the following items for later:

* The Client ID (the Service ID)
* The Client Secret Signing Key
* The Apple Team ID
* The Client Signing Key ID (optional)

1. When you sign into the developer account, go to the [Certificates, IDs, & Profiles](https://developer.apple.com/account/resources/certificates/list) section, and choose the [Identifiers](https://developer.apple.com/account/resources/identifiers/list/serviceId) subsection on the left menu.

2. Click **Register an App ID** button.

3. Choose **App IDs** as the identifier type, and click **Continue**. 

4. Enter a description for your new App ID and a Bundle ID. For the latter, Apple recommends using a reverse-domain name style string (e.g., `com.<YOUR CUSTOM DOMAIN>.appid`). 

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

13. Click **Download** for Apple to send you a file called `apple-developer-domain-association.txt`. You will have to use the contents of this file soon. Also, keep the page open because you will have to use the **Verify** button.

## Create your web application

1. After configuring the Apple developer account, complete the web application code. Create an `npm` project and install a few dependencies:

    ``` text
    # start the npm project
    npm init -y

    # install its dependencies
    npm i dotenv \
      express \
      express-session \
      jsonwebtoken \
      passport \
      passport-oauth
    ``` 

    | Package | Description |
    | --- | --- |
    | **dotenv** | Environment variables that are better kept out of the code itself. |
    | **express** | Make your project an Express web app. |
    | **express-session** | Passport will need this package to manage users' sessions. |
    | **jsonwebtoken** | Generate a JWT to work as the client secret while configuring passport. |
    | **passport** | Use this package to handle user authentication in your app. |
    | **passport-oauth** | Use this passport strategy to integrate with Apple's identity provider. |

2. After installing these packages, create a new file called `app.js` and insert the following code into it:

    ``` text
    const express = require("express");
    const session = require("express-session");
    const port = process.env.PORT || 3000;
    const passport = require("passport");
    const OAuth2Strategy = require("passport-oauth").OAuth2Strategy;
    const fs = require("fs");
    const jwt = require("jsonwebtoken");

    const domainAssociation = fs.readFileSync(
      "./apple-developer-domain-association.txt",
      "utf8"
    );
    const appleStrategy = "apple";

    const app = express();

    app.use(
      session({
        secret: "secret",
        saveUninitialized: false,
        resave: false
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
      "apple",
      new OAuth2Strategy(
        {
          authorizationURL: "https://appleid.apple.com/auth/authorize",
          tokenURL: "https://appleid.apple.com/auth/token",
          clientID: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          callbackURL: process.env.CALLBACK,
          state: Date.now() // bleh
        },
        (accessToken, refreshToken, payload, profile, done) => {
      done(null, { profile, payload });
        }
      )
    );

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });

    app.get("/.well-known/apple-developer-domain-association.txt", (req, res) => {
      res.send(domainAssociation);
    });

    app.get("/auth/apple", passport.authenticate(appleStrategy));

    app.get(
      "/callback",
      passport.authenticate(appleStrategy, {
        successRedirect: "/",
        failureRedirect: "/login"
      })
    );

    app.get("/profile", (req, res) => {
      res.send(
        jwt.decode(req.session.passport.user.payload.id_token, { complete: true })
      );
    });

    app.get("/", (req, res) => {
      console.log("User", req.user);
      res.send(JSON.stringify({ Hello: "World" }));
    });

    app.listen(port, () => {
      console.log(`Apple Login POC listening on port ${port}!`);
    });
    ```

3. In the code above, you will notice that there is a reference to the `apple-developer-domain-association.txt` file. Make this file available to the app while running it in your server so Apple can check that you are the owner of the domain you used in the previous section. Move the file you downloaded from Apple to the project root.

4. To confirm that the code is working, execute the following commands locally.

    ``` text
    export CLIENT_ID=test
    export CLIENT_SECRET=test
    export CALLBACK=test

    npm start
    ```

::: note
You can leave the test values on the environment variables for the moment. You will configure these variables later.
:::

If everything works as expected, you will be able to see the contents of the domain association file at the following link: `http://localhost:3000/.well-known/apple-developer-domain-association.txt`. If that is the case, you are ready to make your application run on the real server.

### Verify the domain ownership on Apple

1. Move your project code to your server and make it run like you did locally (i.e., you still don't need to provide the final environment variables). To achieve that, you can use whatever means you prefer. For example, you can use Git, or you can move the files manually (with the help of `scp` or similar). 

2. After running this project on a real server (which must respond on behalf of the domain you configured in the Apple developer account), you can head back to the page you left open (**Register a Services ID**), and click **Verify**. If you got everything right, Apple would be able to confirm that you own the informed domain.

### Configure email relay service

::: note
Even if you do configure this properly, you won't be able to use the relay service. The documentation doesn't say how to get unique, randomly-created emails for the users that sign in. Also, using OpenID Connect scopes like email doesn't work.
:::

1. To use the email relay service that Apple provides, click **More** under the **Certificates, Identifiers, & Profiles** section and click **Configure**. 

2. Add your domain (`<YOUR CUSTOM DOMAIN>.com`) in the field available on **Domains and Associated Email Addresses** 

3. Click **Register**. 

4. Add an email address (for example, `me@<YOUR CUSTOM DOMAIN>.com`) in **Individual Email Addresses** and click  **Register**.

## Create and enable a connection in Auth0

Next, you’ll add Apple to the collection of identity providers you can integrate with via Auth0.

1. Once you have the credentials you need from your Apple developer account, go to [**Connections** > **Social**](${manage_url}) in the Dashboard, and click on the **Apple** connection.

2. Fill in the Client ID (Services ID), Client Secret Signing Key, the Team ID, and the Client Signing Key ID (if you have it) here. You can also fill in the Key ID, but this is optional, as Apple will accept the key without the ID.

    ![Apple Connection Settings](/media/articles/connections/social/apple/apple_connection.png)

## Generate client secret

Now that you have verified your domain with Apple, define the environment variables needed to use this identity provider. 

1. Configure the following variables:

    | Variable | Description
    | --- | --- |
    | **CLIENT_ID** | Gets the value that you used as the identifier of the Service ID you created at Apple  (`com.<YOUR CUSTOM DOMAIN>.webapp`). |
    | **CALLBACK** | The URL to which the user will be redirected after the authentication process takes place. You will have to use the value you passed to the **Return URL** field (`<YOUR CUSTOM DOMAIN>.com/callback`) on the same Service ID. |

2. For most OAuth-compliant identity providers, the `CLIENT_SECRET` variable is static. However, Apple rotates this secret by using signed JSON Web Tokens (JWTs) that carry the `exp` claim. To generate this key, go to **Keys** in **Certificates, Identifiers, & Profiles** section in your Apple developer dashboard. 

3. Click the round, blue icon to add a new key. 

4. Use **Sign In with Apple Key** to fill the **Key Name** field, and check the **Sign In with Apple** option. 

5. Click **Configure** to confirm that the **Choose a Primary App ID** field is filled with your App ID. 

6. Click **Save**, then **Continue**, then **Register** (3 buttons on 3 pages).

  Apple redirects you to a page where you will be able to download the new key. 
  
7. Click the download button and then move the file to your project root. Rename it to `authkey.p8`. 

8. Back in the Apple Developer Portal, make a note of the Key ID click **Done**.

9. Create a new file called `generate-secret.js` inside the project root, and add the following code to it:

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

10. Run this script to generate a new token:

    ``` text
    node generate-secret.js
    ```

    The value that the script outputs is the value that you will use on the `CLIENT_SECRET` environment variable. 

11. Return to your Auth0 dashboard and make sure your custom social connection fields look like this:

    | Field | Value |
    | --- | --- |
    | Name | Apple, or any name you choose |
    | Client ID | Your Services ID identifier, (e.g., `com.<YOUR CUSTOM DOMAIN>.webapp`) |
    | Client Secret | The string generated in the previous step |
    | Fetch User Profile Script | Check the variables in the script to make sure they are correct |
    | Authorization URL | `https://appleid.apple.com/auth/authorize` |
    | Token URL | `https://appleid.apple.com/auth/token` |
    | Scope | email name |
    | Custom Headers | `"UserAgent": "Auth0", "Accepts": "application/json"`|

12. Click **Save** and enable this connection for your application.

13. On your server, stop the web app instance that is running, and issue the following commands:

    ``` text
    # now you need to use the real values
    export CLIENT_ID=com.<YOUR CUSTOM DOMAIN>.webapp
    export CLIENT_SECRET=eyJ...KsA
    export CALLBACK=https://<YOUR CUSTOM DOMAIN>.com/callback

    npm start
    ```

    This time, set the environment variables with the final values. If things work as expected, you will see the application running under your domain again. Then, if you request for the `/auth/.apple` route under this domain, your application will redirect you to the **Sign In with Apple** page so you can log into your application. On this page, if you use valid credentials, Apple will sign you into the application (after the multifactor authentication process).

## Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social).

::: note
If you are using the Classic Universal Login flow, or embedding `Lock.js` in your application, make sure you are using `Lock.js` version 11.16 or later.
:::

1. Visit your login page and you should now see an option for Sign In with Apple:

    ![Apple Login](/media/articles/connections/social/apple/apple-login-page.png)

2. Click **Continue with Apple**, then enter your Apple ID and password.

3. You will be asked to verify a new device. Click **Allow**.

4. Next you'll be given a verication code. Make a note of this code, click **Done**, and then enter the code on the **Two-Factor Authentication** screen.

5. When this is done, you'll have the option to edit your name and choose whether you'd like to share or hide your email. Make your choice, then click **Continue**.

    You are now signed in with Apple!

## Keep reading

* [What is Sign in with Apple](https://auth0.com/blog/what-is-sign-in-with-apple-a-new-identity-provider/)
* [Apple's Sign in with Apple page](https://developer.apple.com/sign-in-with-apple/)

<%= include('../_quickstart-links.md') %>
