---
section: compliance
description: Learn how to host a redirect form using Webtask and redirect users to the form.
contentType: how-to
sitemap: false
---
# Redirect Users to Consent Form Hosted Using Webtask

:::warning
Webtask is no longer accepting new signups. We recommend hosting your consent form on another hosting service like Heroku. 
::: 

For simplicity, we will use this [sample consent form](https://wt-peter-auth0_com-0.run.webtask.io/simple-redirect-rule-consent-form). This is a form we have hosted for you, but later on we will see how to host your own version of this form (with your own URL). You can find the code at [Auth0 Redirect Rules repo](https://github.com/auth0/rules/blob/master/redirect-rules/simple/webtask.js).

:::note
If you are implementing this from a regular web app, hosting your own form, then you can also save the consent information at the `user_metadata` using the [Management API's Update User endpoint](/api/management/v2#!/Users/patch_users_by_id).
:::

1. First, we will add the rule. Go to [Dashboard > Rules](${manage_url}/#/rules) and click **Create Rule**. At the **Rules Templates** select **empty rule**. Change the default rule's name (`empty rule`) to something descriptive, for example `Redirect to consent form`.

2. Add the following JavaScript code and save your changes. The code redirects the user to the `CONSENT_FORM_URL` URL (we will configure this at the next step). Once the user hits **Submit** at the consent form, the rule runs again as part of the callback. At this point we persist the information at the `user_metadata`.

    ```js
    function redirectToConsentForm (user, context, callback) {
      var consentGiven = user.user_metadata && user.user_metadata.consentGiven;
      // redirect to consent form if user has not yet consented
      if (!consentGiven && context.protocol !== 'redirect-callback') {
        var auth0Domain = auth0.baseUrl.match(/([^:]*:\/\/)?([^\/]+\.[^\/]+)/)[2];
        context.redirect = {
          url: configuration.CONSENT_FORM_URL +
            (configuration.CONSENT_FORM_URL.indexOf('?') === -1 ? '?' : '&') +
            'auth0_domain=' + encodeURIComponent(auth0Domain)
        };
      }
      // if user clicked 'I agree' on the consent form, persist it to their profile
      // so they don't get prompted again
      if (context.protocol === 'redirect-callback') {
        if (context.request.body.confirm === 'yes') {
          user.user_metadata = user.user_metadata || {};
          user.user_metadata.consentGiven = true;
          user.user_metadata.consentTimestamp = Date.now();
          auth0.users.updateUserMetadata(user.user_id, user.user_metadata)
            .then(function(){
              callback(null, user, context);
            })
            .catch(function(err){
              callback(err);
            });
        } else {
          callback(new UnauthorizedError('User did not consent!'));
        }
      }
      callback(null, user, context);
    }
    ```

3. Go back to [Dashboard > Rules](${manage_url}/#/rules), scroll down, and under **Settings**, create a Key/Value pair as follows:
  - **Key**: `CONSENT_FORM_URL`
  - **Value**: `https://wt-peter-auth0_com-0.run.webtask.io/simple-redirect-rule-consent-form`

If you want to work with your own implementation of the consent form webtask, you can host your own version of the webtask.js script. For instructions see [Consent Form Setup](https://github.com/auth0/rules/tree/master/redirect-rules/simple#consent-form-setup).

To learn more about redirect rules, see [Redirect Users from Rules](/rules/redirect).

:::warning
If you plan on using this approach in a production environment, make sure to review [Trusted Callback URL's](https://github.com/auth0/rules/tree/master/redirect-rules/simple#trusted-callback-urls) and [Data Integrity](https://github.com/auth0/rules/tree/master/redirect-rules/simple#data-integrity) (both sections address some security concerns).
:::
