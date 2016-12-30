---
description: You can add step-up authentication to your app with Auth0's extensible multifactor authentication support.
---

# Step-Up Authentication with Custom Multifactor Authentication Rules

::: panel-info Notice
Auth0 now supports `amr` and `acr` claims with `acr_values` for step-up authentication. This approach allows for more control with MFA.

[Click here for details.](/tutorials/step-up-authentication) 
:::

## What is Step-Up Authentication?

With Step-Up Authentication, applications that allow access to different types of resources can require users to authenticate with a stronger authentication mechanism to access sensitive resources.

For example, *Fabrikam's Intranet* can require users to authenticate with their username and password to access customer data. However, a request for access to employee data (which may contain sensitive salary information) can trigger a stronger authentication mechanism like multifactor authentication.

You can add step-up authentication to your app with Auth0's extensible multifactor authentication support. Your app can verify that the user has logged in using multifactor authentication and, if not, require the user to step-up to access certain resources.

![](/media/articles/step-up-authentication/flow.png)

## Custom Multifactor Authentication Rule

The following [rule](/rules) modifies the outgoing token by adding an `authentication_level` parameter. A regular login will be marked as `normal`.

This rule also inspects the `scope`. If the login request is made with `step_up` scope, the application is requesting step-up authentication. In this case, this rule forces the user to additionally authenticate with multifactor authentication and sets the `authentication_level` to `mfa`.

```js
function (user, context, callback) {

  user.authentication_level = 'normal';

  if (isStepUpRequested()) {
    triggerStepUp(user, context);
    user.authentication_level = 'mfa';
  }

  callback(null, user, context);

  function isStepUpRequested() {
    // If "step_up" is part of the incoming scope, we will force step up authn.
    return (context.request.query.scope || context.request.body.scope || '')
      .split(' ')
      .indexOf('step_up') >= 0;
  }

  function triggerStepUp(user, ctx) {
    // Force step up with Google authenticator.
    ctx.multifactor = {
      provider: 'google-authenticator',
      issuer: "Step Up Authentication",
      ignoreCookie: true
    };
  }
}
```

**NOTE:** In addition to the [Auth0 supported mutlifactor authentication providers](/multifactor-authentication#using-auth0s-built-in-support) (Google Authenticator and Duo Security) you can plug in your own [custom provider](/multifactor-authentication#use-a-custom-mfa-service).

## Application Logic

You will need to add logic to your app to check the user's login authentication level when they request access to sensitive resources.

First, write some middleware (or something similar, depending on your platform) in your web app to enforce step-up authentication.

```js
var requireMultiFactor = function(req, res, next) {
  if (!req.isAuthenticated() || req.user._json.authentication_level != 'mfa') {
    logger.warn('User did not sign in with MFA. Step up required.');
    return res.redirect('/login/mfa');
  }

  next();
};
```

If the user has not yet authenticated or did not authenticate with multifactor authentication, this code will redirect the user to `/login/mfa` within your app. This route requires the user to authenticate (or re-authenticate) and specifies the `step_up` scope which will trigger the custom logic in the rule you created above:

```js
router.get('/login/mfa',
  passport.authenticate('auth0', { scope: 'openid step_up' }));
```

Next, add code to ensure that the multifactor authentication requirement is applied to all routes that expose sensitive data, like the employee directory:

```js
router.get('/employees', requireMultiFactor, function(req, res) {
  res.render('employees');
});
```

**NOTE:** Enable the **Use Auth0 instead of the IdP to do Single Sign On** option in the settings page of your app in Auth0 or specify a connection name when triggering step-up authentication to make sure users are not forced to authenticate when already logged in. By enabling the SSO setting or specifying a connection name, your app will trigger an SSO login which will only prompt the user for multifactor authentication.

## Sample Application

The *Fabrikam Intranet* sample is [available on GitHub](https://github.com/auth0/step-up-authentication-sample). In this sample, a user that tries to access the Customers section will be required to authenticate:

![](/media/articles/step-up-authentication/login-page.png)

After they have authenticated, the user will be allowed access to the customer data:

![](/media/articles/step-up-authentication/customers-page.png)

In this case, the token will indicate that the user logged in at the `normal` authentication level (no multifactor authentication).

![](/media/articles/step-up-authentication/normal-authentication-level.png)

When the user tries to access the Employees directory, they will be forced to authenticate using a higher authentication level (multifactor authentication).

![](/media/articles/step-up-authentication/mfa.png)

After this step, the user's token will indicate that the authentication level is `mfa`.

![](/media/articles/step-up-authentication/mfa-authentication-level.png)

As a result, the app will now allow the user to access more sensitive resources:

![](/media/articles/step-up-authentication/employees-page.png)