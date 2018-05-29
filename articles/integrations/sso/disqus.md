---
title: Disqus Single Sign On Integration
description: How to set up Single Sign On (SSO) integration with Disqus and Auth0.
toc: true
public: true
tags:
  - sso
  - disqus
---

# Disqus Single Sign On Integration

Disqus allows you to embed a discussion section onto your site where your users can enter comments and interact with you and your other visitors. By implementing a Single Sign On (SSO) integration between Disqus and Auth0, users that have signed in and authenticated via Auth0 can leave comments as themselves in your Disqus discussion section.

## Install and Configure Disqus

1. If you don't already have an account with Disqus, create one. If you do, log in.
2. Select the **I want to install Disqus on my site** box.

  ![](/media/articles/integrations/disqus/disqus-on-site.png)

3. You will be directed to the *Create a new site* page. Provide your **Website Name** and your website's **Category**. When you've provided the requested information, click **Create Site** to continue.

  ::: note
  You **Website Name** will become your unique Disqus URL. Make note of this URL, since it is required to configure your Auth0 Application.
  :::

  ![](/media/articles/integrations/disqus/create-new-site.png)

4. Select your site's platform to receive customized instructions on installing Disqus and embedding its UI onto your site. If the platform you're using isn't listed, select **I don't see my platform, install manually with Universal Code** at the bottom of the page.

  ![](/media/articles/integrations/disqus/platforms.png)

  When you have finished the installation process, click **Configure** to move on to the next step.

5. Configure your Disqus installation by providing the requested information about your website. When done (or if you want to complete this at a later time using the *Settings* page), click **Complete Setup**.

## Enable and Configure Single Sign On with Disqus

Once you have installed and configured your Disqus instance, you need to enable Single Sign On.

::: warning
A Disqus Pro level subscription is required to use the [Disqus Single Sign-On (SSO) add-on](https://help.disqus.com/customer/portal/articles/236206-integrating-single-sign-on).
:::

1. Navigate to the [Applications section of the Disqus API](https://disqus.com/api/applications/) to register your application.

  ![](/media/articles/integrations/disqus/register-api-app.png)

2. Provide the requested details about your application. When complete, click **Register my application**.

  ![](/media/articles/integrations/disqus/register.png)

3. You will now see your Auth0 application listed in the Disqus Applications panel.

  ![](/media/articles/integrations/disqus/register-api-app.png)

4. Click on the [Single Sign-On](https://disqus.com/api/sso/) tab to go to the SSO management area where you will configure your remote domain and test the payload you create. Provide the following for your integration:

  * **Name**: the name used to identify your domain
  * **Slug**: the prefixed value for your account

  **Notes**:

  * Refrain from using any non-alphanumeric characters to prevent conflicts from happening. * The name assigned to your remote domain is permanent and non-transferable.
  * You can have only one remote domain per user account, and you should use a single remote domain per site (created using the moderator account).

  Click **Save Changes** when you're done.

  ![](/media/articles/integrations/disqus/sso-config.png)

5. Return to the *Settings* page of the *Applications* tab.
6. Scroll to the *Settings* section and provide the following information:

  * **Domains**: the domain(s) of the site in which you've embedded Disqus;
  * **SSO Domain**: the Disqus account for which you have SSO enabled.

  Under the *Authentication* section, provide the following information:

  * **Default Access**: Set to *Read and Write*.

  ![](/media/articles/integrations/disqus/disqus-app-settings.png)

  When done, click **Save Changes**.

6. At this point, SSO is fully configured for your Disqus account. You will now need to [finish configuring the integration](https://help.disqus.com/customer/portal/articles/236206-single-sign-on) from the Auth0 side.

  ![](/media/articles/integrations/disqus/sso-config.png)

## Integrate Disqus with Auth0

At this point, you will embed code onto your site that will generate a secured message that is passed to Disqus.

When you are signed in to Auth0, you have user information including (but not limited to):

* `user_id`;
* `username`;
* `displayName`.

You can host [server-side code](https://github.com/disqus/DISQUS-API-Recipes/tree/master/sso) that generates the secure authentication message to pass the user's data to Disqus. This message contains three parts, each of which is separated with a single whitespace character:

* The message body in a JSON-serialized form;
* The HMA-SHA1 signature;
* The timestamp of the message.

You can host this code server-side as a Node service that's protected by Auth0 so that only authorized entities can access it.

```js
var JSON = require('json3');
var CryptoJS = require("crypto-js");
var DISQUS_SECRET = "disqus_secret";
var DISQUS_PUBLIC = "disqus_public";
var data = disqusSignon();


function disqusSignon() {
  var disqusData = {
    id: "auth0|577d19a858dd4da46509080'",
    username: "test1234@gmail.com",
    email: "test1234@gmail.com"
  };

  var disqusStr = JSON.stringify(disqusData);

  var timestamp = Math.round(+new Date() / 1000);

  var message = new Buffer(disqusStr).toString('base64');

  /*
   * CryptoJS (included in the directory) is required for hashing
   * https://code.google.com/p/crypto-js/
   */

  var result = CryptoJS.HmacSHA1(message + " " + timestamp, DISQUS_SECRET);
  var hexsig = CryptoJS.enc.Hex.stringify(result);

  return {
    pubKey: DISQUS_PUBLIC,
    auth: message + " " + hexsig + " " + timestamp
  };
}
```

To complete the integration and pass the authentication data to Disqus, you'll need to add user-related entries to the `disqus_config` variable in your app's code.

```js
var disqus_config = function() {
  // Replace PAGE_URL with your page's canonical URL variable
  this.page.url = 'http://PAGE_URL.disqus.com';
  this.page.identifier = '1234567';
  this.page.title = 'Landing Page'

  //Call the Node.js service to get auth data for user

  /*
  var user = {
    pubKey : 'PUBLIC_KEY',
    auth : message + " " + hexsig + " " + timestamp
  }
  */

  this.page.remote_auth_s3 = user.auth;
  this.page.api_key = user.pubKey;
};
```

At this point, you will see the option to SSO using Disqus when authenticating in to your app.
