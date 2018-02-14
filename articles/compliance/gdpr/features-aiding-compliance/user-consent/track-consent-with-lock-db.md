---
title: Track Consent with Lock for DB Connections
description: This tutorial describes how you can customize Lock to capture consent metadata, and applies to Database Connections
toc: true
---
# Track Consent with Lock for DB Connections

In this tutorial we will see how you can use Lock to ask for consent information, and then save this input at the user's [metadata](/metadata). This tutorial is valid only if you use a database connection to authenticate users.

## Overview

We will configure a simple JavaScript Single Page Application and a database connection (we will use Auth0's infrastructure, instead of setting up our own).

Instead of building an app from scratch, we will utilize [Auth0's JavaScript Quickstart sample](/quickstart/spa/vanillajs). We will also use [Auth0's Hosted Login Page](/hosted-pages/login) so we can implement a [centralized login experience](/guides/login/centralized-vs-embedded), instead of embedding the login in our app.

We will customize Lock to add a consent flag, indicating whether the user has agreed to the processing of their information. This information will be saved at the user's metadata, as follows:

```text
{
  "consentGiven": "true"
}
```

We will see two different implementations for this: one that just displays a flag, and another that can be customized in order to display links to other pages where the Terms & Conditions and/or privacy policy information can be reviewed.

## Configure the application

1. Go to [Dashboard > Clients](${manage_url}/#/clients) and create a new [client](/clients). Choose `Single Web Page Applications` as type.

1. Go to **Settings** and set the **Allowed Callback URLs** to `http://localhost:3000`. 

    :::note
    This field holds the set of URLs to which Auth0 is allowed to redirect the users after they authenticate. Our sample app will run at `http://localhost:3000` hence we set this value.
    :::

1. Copy the **Client Id** and **Domain** values. You will need them in a while.

1. Go to [Dashboard > Connections > Database](https://manage.auth0.com/#/connections/database) and create a new connection. Click **Create DB Connection**, set a name for the new connection, and click **Save**.

1. Go to the connection's **Clients** tab and make sure your newly created client is enabled.

1. Download the [JavaScript SPA Sample](/quickstart/spa/vanillajs). 

1. [Set the Client ID and Domain](https://github.com/auth0-samples/auth0-javascript-samples/tree/master/01-Login#set-the-client-id-and-domain) values.

You have now configured both the application and a new DB connection. There's one more configuration step we need to do before we run it.

## Option 1: Configure the login page with custom fields

In this section, we will customize the login widget to add a flag which users will check if they agree to the processing of their information. If you need to display more information (for example, the complete Terms & Conditions and/or privacy policy) see the next paragraph.

1. Go to [Dashboard > Hosted Pages](${manage_url}/#/login_page). At the **Login** tab enable the toggle.

1. At the **Default Templates** dropdown make sure that `Lock` is picked. The code is propulated for you.

1. To add a field for the `consentGiven` metadata, use the [additionalSignUpFields](/libraries/lock/configuration#additionalsignupfields-array-) option. The example below, sets the type to `checkbox` (so we have a flag), the label to `I consent to data processing`, and the default value to checked.

    ```js
    //code reducted for simplicity
    var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
      auth: {
        //code reducted for simplicity
      },
      additionalSignUpFields: [{
        type: "checkbox",
        name: "consentGiven",
        prefill: "true",
        placeholder: "I consent to data processing"
      }],
      //code reducted for simplicity
    });
    ```

1. To see what this will look like, click the **Preview** tab, and when Lock loads select the **Sign Up** tab.

    ![Preview Lock with consent flag](/media/articles/compliance/lock-db-consent-flag.png)

## Option 2: Configure the login page with Terms & Conditions link

In this section, we will customize the login widget to add a flag which users must check in order to sign up. The flag's label will include links to pages that display the Terms & Conditions and privacy policy.

1. Go to [Dashboard > Hosted Pages](${manage_url}/#/login_page). At the **Login** tab enable the toggle. 

1. At the **Default Templates** dropdown make sure that `Lock` is picked. The code is propulated for you.

1. To add a field for the `consentGiven` metadata, use the [mustAcceptTerms](/libraries/lock/configuration#mustacceptterms-boolean-) option. To include links to your Terms & Conditions and/or privacy policy pages, use the [languageDictionary](/libraries/lock/configuration#languagedictionary-object-) option. The example below, displays next to the flag the text `I agree to the terms of service and privacy policy` (including links to both pages).

    ```js
    //code reducted for simplicity
    var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
      auth: {
        //code reducted for simplicity
      },
      languageDictionary: {
        signUpTerms: "I agree to the <a href='/terms' target='_new'>terms of service</a> and <a href='/privacy' target='_new'>privacy policy</a>."
      },
      mustAcceptTerms: true,
      //code reducted for simplicity
    });
    ```

1. To see what this will look like, click the **Preview** tab, and when Lock loads select the **Sign Up** tab.

    ![Preview Lock with Terms & Conditions flag](/media/articles/compliance/lock-db-consent-flag-TC.png)

1. This flag does not allow users to sign up unless they accept the terms, however it does not set any metadata. To save this information at the `consentGiven` metadata property, add a [rule](/rules). Go to [Dashboard > Rules](${manage_url}/#/rules) and click **Create Rule**. At the **Rules Templates** select **empty rule**. Change the default rule's name (`empty rule`) to something descriptive, for example `Set consent flag upon signup`.

1. Add the following JavaScript code and save your changes. The code sets the `consentGiven` metadata to `true`, if it is not already set (which means it's the first login after a signup).

    ```js
    function (user, context, callback) {
      user.user_metadata = user.user_metadata || {};
      // short-circuit if the user signed up already
      if (user.user_metadata.consentGiven) return callback(null, user, context);
      
      // first time login/signup
      user.user_metadata.consentGiven = true;
        auth0.users.updateUserMetadata(user.user_id, user.user_metadata)
        .then(function(){
          callback(null, user, context);
        })
        .catch(function(err){
          callback(err);
        });
    }
    ```

## Test the configuration

1. Go to the folder where you downloaded the application and run it.

    ```bash
    npm install
    npm run
    ```

1. Go to [http://localhost:3000](http://localhost:3000). Click **Login**. Once Lock is displayed, click **Sign Up**.

    :::note
    The login page will be served by default at `${account.namespace}/login`. If you want to use your own domain, see [Custom Domains](/custom-domains).
    :::

1. If you followed the [first implementation option](#option-1-configure-the-login-page-with-custom-fields), you should see the new custom field we added. Set an email and password and leave the `I consent to data processing` flag checked. Click **Sign Up**.

    ![Application Sign Up widget](/media/articles/compliance/lock-signup-new-field.png)

1. If you followed the [second implementation option](#option-2-configure-the-login-page-with-terms-conditions-link), you should see the flag to accept the terms of service and privacy policy. Note that the **Sign up** button remains disabled until you check the flag. Follow the links to check they are working. Set an email and password and accept the terms. Click **Sign Up**.

    ![Application Sign Up widget](/media/articles/compliance/lock-signup-new-field-TC.png)

1. Go to [Dashboard > Users](${manage_url}/#/users) and search for the new user.

1. Go to **User Details** and scroll down to the **Metadata** section. At the **user_metadata** text area you should see the following:

    ```text
    {
      "consentGiven": "true"
    }
    ```

That's it, you are done!