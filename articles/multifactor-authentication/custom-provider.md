# Custom Multifactor Authentication Provider

If you are using a different MFA provider or want to build your own, you can use the `redirect` protocol in Auth0. For example, you can use **YubiKey**; if you want to read more about how to integrate it, click [here](/multifactor-authentication/yubikey).


![YubiKey Custom Provider](https://cdn.auth0.com/content/multi-factor-authentication/yubikey.png)

To use a custom MFA provider, you can interrupt the authentication transaction and redirect the user to an arbitrary URL where an additional authentication factor can happen. After this completes (successfully or not), the transaction can then resume in Auth0 for further processing. The following code shows how simple is to do that.

````JavaScript
function (user, context, callback) {

  if( condition() && context.protocol !== 'redirect' ){
    context.redirect = {
      url: 'https://your_custom_mfa'
    };
  }

  if( context.protocol === 'redirect'){
    //TODO: handle the result of the MFA step
  }

  callback(null, user, context);
}
````
