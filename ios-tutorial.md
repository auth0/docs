# Using Auth0 with iOS

Integrating Auth0 with iOS based apps relies on the common method of instantiating a [UIWebView](http://developer.apple.com/library/ios/#documentation/uikit/reference/UIWebView_Class/Reference/Reference.html) inside the native app to drive all interactions with the authentication providers, and then extracting security tokens once they become available. 

Because we are using the `implicit flow`, the access token is sent as an URL fragment in the final redirect:

	@@account.callback@@#access_token=123456789098765432&id_token=324314355465564534314...

This sample works by intercepting the final redirect to the defined callback address (`@@account.callback@@`) and parsing the URL to extract the tokens.

> The `access_token` is a regular OAuth Access Token. `id_token` is a Json Web Token (JWT) and it is signed by Auth0. If you have the __Windows Azure Mobile Services__ (WAMS) add-on enabled, Auth0 will sign the JWT with WAMS `masterkey`.

##Before you start

1. You will need XCode 4.5.2
2. We also assume you have some connection enabled in your Auth0 account. If you haven't done so, this [tutorial](enable-simple-connection) shows how to do it.
3. [Get the sample](https://github.com/auth0/Auth0-iOS-Sample).

> The easiest way is to run `git clone https://github.com/auth0/Auth0-iOS-Sample.git` on your terminal.

##Open the project and update your settings

Open the project with XCode and open the file `auth0ViewController.m`. Replace these constants with:

```objc
NSString * const tenant = @"@@account.tenant@@";
NSString * const clientId = @"@@account.clientId@@";
NSString * const returnUrl = @"@@account.callback@@";
NSString * const connection = @"google-oauth2"; //change to "paypal", "linkedin", etc
```
##Run the sample

The sample shows two buttons that will display the __Auth0 Login Control__. Tapping on `Login` will initiate the login process against the specific `connection` specified in the constant.

Tapping on `Login with Widget` will display the __Auth0 Login Widget__:

![](img/ios-tutorial.png)

##Using the library

All functionality is encapsulated in the `Auth0Client` library. Calling it requires just a couple lines of code:

```objc
Auth0Client *client = [Auth0Client auth0ClientWithWidget:tenant clientId:"@@account.clientId@@" returnUrl:YOUR_CALLBACK];

[client showInViewController:self allowsClose:NO withCompletionHandler:^(BOOL authenticated) {
    if (!authenticated) {
        NSLog(@"Error authenticating");
    }
    else{
        self.accessTokenView.text = [client.accessToken copy];
        jwtToken = [client.jwtToken copy];
        self.jwtTokenView.text = jwtToken;
    }
}];
```

> Remember that the `returnUrl` parameter must also be defined in your Auth0 [settings](https://app.auth0.com/#/settings). This sample uses __https://localhost/client__

Congratulations!
