For simplicity, we will use the following sample consent form:

```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
    <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title><%-title %></title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
      <link href="//cdn.auth0.com/styleguide/latest/lib/logos/img/favicon.png" rel="shortcut icon">
      <style>
        body { padding-top: 20px; padding-bottom: 20px; }
        .jumbotron { text-align: center; border-bottom: 1px solid #e5e5e5; }
        .jumbotron .btn { padding: 14px 24px; font-size: 21px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="jumbotron">
          <h1><%-title %></h1>
          <p>To continue, please accept this consent form.</p>
          <form action="<%-action %>" method="post">
            <div class="checkbox">
              <label>
                <input type="checkbox" name="confirm" value="yes"> I agree
              </label>
            </div>
            <input type="submit" class="btn btn-lg btn-success" value="Submit">
          </form>
        </div>
      </div>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    </body
  </html>
```

You will need to host this form, and the URL for the form must be publicly-accessible. You'll need to provide the URL where the form can be access to Auth0 at a later step of this tutorial.

*Please see the [Redirect Users to Consent Form Hosted Using Webtask](/compliance/gdpr/features-aiding-compliance/user-consent/webtask-redirect.md) if you want to host your consent form using Webtask.*

1. Add the [redirect rule](/rules/redirect). Go to [Dashboard > Rules](${manage_url}/#/rules) and click **Create Rule**. At the **Rules Templates** select **empty rule**. Change the default rule's name from `empty rule` to something descriptive (i.e., `Redirect to consent form`).

2. Add the following JavaScript code to the script editor and **Save** your changes.

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
    
    Note that this rule runs twice. First, the code redirects the user to the URL indicated by the `CONSENT_FORM_URL` variable (you will configure this in the next step of this tutorial). The rule will run again as part of the callback once the user clicks **Submit** on the consent form itself to save the information to the user's `user_metadata` field.

    If you're implementing a consent form for a regular web app and you're hosting the form, you can update the person's `user_metadata` via the [Management API's Update User endpoint](/api/management/v2#!/Users/patch_users_by_id).

3.  Return to [Dashboard > Rules](${manage_url}/#/rules) and scroll down to the bottom of the page where the **Settings** section is. Create a key/value pair as follows:

  - **Key**: `CONSENT_FORM_URL`
  - **Value**: `your-consent-form-url.com`

    Be sure to provide the publicly-accessible URL where your consent form can be found.

### Security

When setting up redirection to your consent form for use in a Production environment, be sure to review [Trusted Callback URLs](https://github.com/auth0/rules/tree/master/redirect-rules/simple#trusted-callback-urls) and [Data Integrity](https://github.com/auth0/rules/tree/master/redirect-rules/simple#data-integrity) regarding security concerns.
