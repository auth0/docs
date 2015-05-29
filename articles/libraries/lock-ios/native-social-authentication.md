# Lock iOS: Native Social Authentication

**Lock** by default handles all social authentication with Safari (Web Login), but you can enable native login for some social connections.
The only connections that have native integration are Facebook and Twitter and are included by default in **Lock** pod but you can pick the one you need. For example if you only need Facebook:

```ruby
pod 'Lock/UI'
pod 'Lock/Facebook'
```

Only Twitter:

```ruby
pod 'Lock/UI'
pod 'Lock/Twitter'
```

## Configuration

> Before following these steps, please check our [documentation](/libraries/lock-ios)

### Facebook

Lock uses Facebook iOS SDK to obtain user's access token so you'll need to configure it using your Facebook App info:

First, add the following entries to the `Info.plist`:
* _FacebookAppId_: `YOUR_FACEBOOK_APP_ID`
* _FacebookDisplayName_: `YOUR_FACEBOOK_DISPLAY_NAME`

Then register a custom URL Type with the format `fb<FacebookAppId>`. For more information please check [Facebook Getting Started Guide](https://developers.facebook.com/docs/ios/getting-started).

Here's an example of how the entries should look like in your `Info.plist` file:

[![FB plist](https://cloudup.com/cYOWHbPp8K4+)](http://auth0.com)

Finally, you need to register Auth0 Facebook Provider somewhere in your application. You can do that in the `AppDelegate.m` file:

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  A0FacebookAuthenticator *facebook = [A0FacebookAuthenticator newAuthenticationWithDefaultPermissions];
  [[A0SocialAuthenticator sharedInstance] registerSocialAuthenticatorProvider:facebook];
}
```

###Twitter

Twitter authentication is done using [Reverse Auth](https://dev.twitter.com/docs/ios/using-reverse-auth) in order to obtain a valid access_token that can be sent to Auth0 Server and validate the user. By default we use iOS Twitter Integration but we support OAuth Web Flow (with Safari) as a fallback mechanism in case a user has no accounts configured in his/her Apple Device.

To support Twitter authentication you need to configure the Twitter authentication provider:

```objc
NSString *twitterApiKey = ... //Remember to obfuscate your api key
NSString *twitterApiSecret = ... //Remember to obfuscate your api secret
A0TwitterAuthenticator *twitter = [A0TwitterAuthenticator newAuthenticationWithKey:twitterApiKey                                                                            andSecret:twitterApiSecret];
[[A0SocialAuthenticator sharedInstance] registerSocialAuthenticatorProvider:twitter];
```

We need your twitter app's key & secret in order to sign the reverse auth request. For more info please read the Twitter documentation related to [Authorizing Requests](https://dev.twitter.com/docs/auth/authorizing-request) and [Reverse Auth](https://dev.twitter.com/docs/ios/using-reverse-auth).
