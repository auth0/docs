# Step-Up Authentication

Applications that allow users to access different types of resources might require these user to authenticate with a stronger authentication mechanism if they to access sensitive resources.

An application like Fabrikam's Intranet could require users to authenticate with their username and password if they want to access customer data. Now when they need access to employee data which contains sensitive information like a user's salary, a stronger authentication mechanism like multifactor authentication should be used.

Auth0's extensible multifactor authentication support allows you to add support for step-up authentication to your application. An application can verify if the user logged in using multifactor authentication and if that's not the case require the user to do so before they can access sensitive resources.

![](/media/articles/step-up-authentication/flow.png)

## Custom Multifactor Authentication Rule

The following [rule](rules/index) will modify the outgoing token and add an `authentication_level` to it. A regular login will be marked as `normal`.

This rule will also inspect the `scope`. If the login request was made with the `step_up` scope this means that the application wants us to trigger a step-up authentication (using multifactor authentication for example). In that case the rule force the user to additionally authenticate with multifactor authentication and will set the `authentication_level` to `mfa`.

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

> Note: In addtion to the supported mutlifactor authentication providers [you can plug in your own custom providers](https://auth0.com/docs/multifactor-authentication/custom-provider).

## Application Logic

On the application side some logic will be required to asses if the user logged in with a higher authentication level when accessing sensitive resources.

As a first step you would write some middleware (or something similar depending on the technology you're using) in your web application to have a generic way of enforcing step up authentication.

```js
var requireMultiFactor = function(req, res, next) {
  if (!req.isAuthenticated() || req.user._json.authentication_level != 'mfa') {
    logger.warn('User did not sign in with MFA. Step up required.');
    return res.redirect('/login/mfa');
  }

  next();
};
```

This middleware will redirect the user to `/login/mfa` within the application if they are not authenticated or did not authenticate with multifactor authentication. This route would require the user to (re-)authenticate and would specify the `step_up` scope, which will trigger the custom logic in the rule:

```js
router.get('/login/mfa',
  passport.authenticate('auth0', { scope: 'openid step_up' }));
```

As a last step the middleware to enforce a user to be logged in with multifactor authentication should be applied to all routes that expose sensitive data, like the employee directory:

```js
router.get('/employees', requireMultiFactor, function(req, res) {
  res.render('employees');
});
```

> Make sure to enable the **Use Auth0 instead of the IdP to do Single Sign On** option on your application in Auth0 or specify a connection when triggering the step-up authentication flow to make sure users don't have to authenticate all over again. By enabling the SSO setting or specifying a connection name you will trigger an SSO login which will only prompt the user for multifactor authentication.

## Sample Application

The Fabrikam Intranet sample is available [on GitHub](https://github.com/auth0/step-up-authentication-sample). In this sample users that try to access the Customers section will require to authenticate:

![](/media/articles/step-up-authentication/login-page.png)

After they've authenticated they will have access to the customer data:

![](/media/articles/step-up-authentication/customers-page.png)

The token in this case will state that the user logged in with a `normal` authentication level (no multifactor authentication).

![](/media/articles/step-up-authentication/normal-authentication-level.png)

When a user tries to access the Employees directory, they will be forced to authenticate using a higher authentication level (multifactor authentication).

![](/media/articles/step-up-authentication/mfa.png)

After this step the user's token will state that the authentication level is `mfa`.

![](/media/articles/step-up-authentication/mfa-authentication-level.png)

As a result, the application will now allow the user to access more sensitive resources:

![](/media/articles/step-up-authentication/employees-page.png)
