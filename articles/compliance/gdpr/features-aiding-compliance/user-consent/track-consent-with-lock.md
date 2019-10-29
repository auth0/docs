---
title: "GDPR: Track Consent with Lock"
description: This tutorial describes how you can customize Lock to capture consent information
toc: true
topics:
    - compliance
    - gdpr
contentType: tutorial
useCase: compliance
---
# Track Consent with Lock

In this tutorial we will see how you can use Lock to ask for consent information, and then save this input at the user's [metadata](/users/concepts/overview-user-metadata).

<%= include('../_legal-warning.md') %>

## Overview

We will configure a simple JavaScript Single-Page Application and a database connection (we will use Auth0's infrastructure, instead of setting up our own database).

Instead of building an app from scratch, we will use [Auth0's JavaScript Quickstart sample](/quickstart/spa/vanillajs). We will also use [Auth0's Universal Login Page](/hosted-pages/login) so we can implement a [Universal Login experience](/guides/login/centralized-vs-embedded), instead of embedding the login in our app.

We will capture consent information, under various scenarios, and save this at the user's metadata.

All scenarios will save the following properties at the [user's metadata](/users/concepts/overview-user-metadata):
- a `consentGiven` property, with true/false values, shows if the user has provided consent (true) or not (false)
- a `consentTimestamp` property, holding the Unix timestamp of when the user provided consent

For example:

```text
{
  "consentGiven": "true"
  "consentTimestamp": "1525101183"
}
```

We will see three different implementations for this:
- one that displays links to other pages where the Terms & Conditions and/or privacy policy information can be reviewed
- one that adds custom fields at the signup widget and works for database connections
- one that redirects to another page where the user can provide consent, and works for social connections

## Configure the application

1. Go to [Dashboard > Applications](${manage_url}/#/applications) and create a new [application](/applications). Choose `Single Web Page Applications` as type.

1. Go to **Settings** and set the **Allowed Callback URLs** to `http://localhost:3000`. 

    :::note
    This field holds the set of URLs to which Auth0 is allowed to redirect the users after they authenticate. Our sample app will run at `http://localhost:3000` hence we set this value.
    :::

1. Copy the **Client Id** and **Domain** values. You will need them in a while.

1. Go to [Dashboard > Connections > Database](${manage_url}/#/connections/database) and create a new connection. Click **Create DB Connection**, set a name for the new connection, and click **Save**. You can also [enable a social connection](/connections/identity-providers-social) at [Dashboard > Connections > Social](${manage_url}/#/connections/social) (we will [enable Google login](/connections/social/google) for the purposes of this tutorial).

1. Go to the connection's **Applications** tab and make sure your newly created application is enabled.

1. Download the [JavaScript SPA Sample](/quickstart/spa/vanillajs). 

1. [Set the Client ID and Domain](https://github.com/auth0-samples/auth0-javascript-samples/tree/master/01-Login#set-the-client-id-and-domain) values.

## Option 1: Display Terms & Conditions link

In this section, we will customize the login widget to add a flag which users must check in order to sign up. The flag's label will include links to pages that display the Terms & Conditions and privacy policy.

This works both for database connections and social logins.

1. Go to [Dashboard > Hosted Pages](${manage_url}/#/login_page). At the **Login** tab enable the toggle. 

1. At the **Default Templates** dropdown make sure that `Lock` is picked. The code is prepopulated for you.

1. To add a field for the `consentGiven` metadata, use the [mustAcceptTerms](/libraries/lock/configuration#mustacceptterms-boolean-) option. To include links to your Terms & Conditions and/or privacy policy pages, use the [languageDictionary](/libraries/lock/configuration#languagedictionary-object-) option. The example below, displays next to the flag the text `I agree to the terms of service and privacy policy` (including links to both pages).

    ```js
    //code reducted for simplicity
    var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
      auth: {
        //code reducted for simplicity
      },
      languageDictionary: {
        signUpTerms: "I agree to the <a href='https://my-app-url.com/terms' target='_blank'>terms of service</a> and <a href='https://my-app-url.com/privacy' target='_blank'>privacy policy</a>."
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
      user.user_metadata.consentTimestamp = Date.now();
      auth0.users.updateUserMetadata(user.user_id, user.user_metadata)
      .then(function(){
        callback(null, user, context);
      })
      .catch(function(err){
        callback(err);
      });
    }
    ```

## Option 2: Add custom fields for database connections

In this section, we will customize the login widget to add a flag which users will check if they agree to the processing of their information.

This works only for database connections (if you use social logins, see the next paragraph).

1. Go to [Dashboard > Hosted Pages](${manage_url}/#/login_page). At the **Login** tab enable the toggle.

1. At the **Default Templates** dropdown make sure that `Lock` is picked. The code is prepopulated for you.

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

Note that in this option we only set the flag and not the timestamp. Displaying the current time in the login widget is not optimal, that's why we didn't add an additional signup field. What you should do is set the timestamp in the background, with a rule that will check the value of `consentGiven` and set the additional `consentTimestamp` metadata to the current timestamp.

## Option 3: Redirect to another page

If you are using social logins, adding custom fields is not an option, but you can redirect the user to another page where you ask for consent and any additional info, and then redirect back to finish the authentication transaction. This can be done with [redirect rules](/rules/redirect). We will use that same rule to save the consent information at the user's metadata so we can track this information and not ask for consent upon next login.

<%= include('./_redirect.md') %>

<%= include('../../../../_includes/_parental-consent') %>

We are done with the configuration part, let's test!

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

1. If you followed the [first implementation option](#option-1-display-terms-conditions-link), you should see the flag to accept the terms of service and privacy policy. Note that the **Sign up** button remains disabled until you check the flag. Follow the links to check they are working. Set an email and password and accept the terms and click **Sign Up**. Alternatively, if you use a social connection, accept the terms and choose **Sign Up with Google**.

    ![Application Sign Up widget](/media/articles/compliance/lock-signup-new-field-TC.png)

1. If you followed the [second implementation option](#option-2-add-custom-fields-for-database-connections), you should see the new custom field we added. Set an email and password and leave the `I consent to data processing` flag checked. Click **Sign Up**.

    ![Application Sign Up widget](/media/articles/compliance/lock-signup-new-field.png)

1. If you followed the [third implementation option](#option-3-redirect-to-another-page), choose **Sign Up with Google**. You will be navigated to the consent form. Check the **I agree** flag and click **Submit**.

    ![Application Sign Up widget](/media/articles/compliance/lock-consent-form-agree.png)

    :::panel User did not consent
    If you do not check the **I agree** flag before clicking **Submit**, then you will see a popup error `Unauthorized. Check the console for details.`. At the console you will see this JSON: 
    ```text
    {
      error: "unauthorized", 
      errorDescription: "User did not consent!", 
      state: "q0GjMwzZN_q5r8XPHvfakkMYcYM2q1N3"
    }
    ```
    Note, that the user is created but they won't be able to log in. If they try to, they will be prompted again to provide consent.
    :::

1. Go to [Dashboard > Users](${manage_url}/#/users) and search for the new user.

1. Go to **User Details** and scroll down to the **Metadata** section. At the **user_metadata** text area you should see the following:

    ```text
    {
      "consentGiven": "true"
      "consentTimestamp": "1525101183"
    }
    ```

That's it, you are done!
