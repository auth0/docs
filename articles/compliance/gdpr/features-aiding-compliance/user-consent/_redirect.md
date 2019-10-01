For simplicity, we will use [this sample consent form](https://github.com/auth0/rules/blob/master/redirect-rules/simple/webtask.js#L31).

You will need to host this form, and the URL for the form must be publicly-accessible. You'll need to provide the URL where the form can be accessed to Auth0 at a later step of this tutorial.

::: note
Please see [Redirect Users to Consent Form Hosted Using Webtask](/compliance/gdpr/features-aiding-compliance/user-consent/webtask-redirect) if you want to host your consent form using Webtask.
:::

1. Add the [redirect rule](/rules/redirect). Go to [Dashboard > Rules](${manage_url}/#/rules), and click **Create Rule**. At **Rules Templates**, select **empty rule**. Change the default rule's name from `empty rule` to something descriptive (e.g., `Redirect to consent form`).

2. Add the following JavaScript code to the script editor, and **Save** your changes.

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

      // if user clicks 'I agree' on the consent form, save it to their profile so they don't get prompted again
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

3.  Return to [Dashboard > Rules](${manage_url}/#/rules) and scroll down to the bottom of the page where the **Settings** section is. Create a key/value pair as follows:

  - **Key**: `CONSENT_FORM_URL`
  - **Value**: `your-consent-form-url.com`

Be sure to provide the publicly-accessible URL where your consent form can be found.

::: warning
When setting up redirection to your consent form for use in a Production environment, be sure to review [Trusted Callback URLs](https://github.com/auth0/rules/tree/master/redirect-rules/simple#trusted-callback-urls) and [Data Integrity](https://github.com/auth0/rules/tree/master/redirect-rules/simple#data-integrity) regarding security concerns.
:::