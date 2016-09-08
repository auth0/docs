---
toc_title: Native Social Authentication
description:
---

# Lock iOS: Native Social Authentication

**Lock** by default handles all social authentication with Safari (Web Login), but you can enable native login for some social connections. Currently we only provide integration with Facebook, Google & Twitter that can be included like this in your `Podfile`
```ruby
pod 'Lock-Facebook'
pod 'Lock-Twitter'
pod 'Lock-Google'
```
> We recommend to at least fix the major version instead of always obtaining the latest version, e.g `pod 'Lock-Facebook', '~> 2.0`

## Configuration

> Before following these steps, please check our [documentation](/libraries/lock-ios)

### Facebook

Lock uses Facebook iOS SDK to obtain user's access token so you'll need to configure it using your Facebook App info:

First, add the following entries to the `Info.plist`:
* _FacebookAppID_: `YOUR_FACEBOOK_APP_ID`
* _FacebookDisplayName_: `YOUR_FACEBOOK_DISPLAY_NAME`

Then register a custom URL Type with the format `fb<FacebookAppID>`. For more information please check [Facebook Getting Started Guide](https://developers.facebook.com/docs/ios/getting-started).

Here's an example of how the entries should look like in your `Info.plist` file:

![FB plist](/media/articles/libraries/lock-ios/fb-plist.png)

Finally, you need to register `A0FacebookAuthenticator` with your instance of `A0Lock`:

```objc
A0Lock *lock = ...//Get your Lock instance
A0FacebookAuthenticator *facebook = [A0FacebookAuthenticator newAuthenticationWithDefaultPermissions];
[lock registerAuthenticators:@[facebook]];
```

### Twitter

Twitter authentication is done using [Reverse Auth](https://dev.twitter.com/docs/ios/using-reverse-auth) in order to obtain a valid access_token that can be sent to Auth0 Server and validate the user. By default we use iOS Twitter Integration but we support OAuth Web Flow (with Safari) as a fallback mechanism in case a user has no accounts configured in his/her Apple Device.

To support Twitter authentication you need to register `A0TwitterAuthenticator` with your instance of `A0Lock`:

```objc
A0Lock *lock = ...//Get your Lock instance
NSString *twitterApiKey = ... //Remember to obfuscate your api key
NSString *twitterApiSecret = ... //Remember to obfuscate your api secret
A0TwitterAuthenticator *twitter = [A0TwitterAuthenticator newAuthenticatorWithKey:twitterApiKey                                                                            andSecret:twitterApiSecret];
[lock registerAuthenticators:@[twitter]];
```

We need your twitter app's key & secret in order to sign the reverse auth request. For more info please read the Twitter documentation related to [Authorizing Requests](https://dev.twitter.com/docs/auth/authorizing-request) and [Reverse Auth](https://dev.twitter.com/docs/ios/using-reverse-auth).

### Google

Google authentication uses [Google Sign-In](https://developers.google.com/identity/sign-in/ios/) iOS library, so you'll need to register your iOS application in [Google Developer Console](https://console.developers.google.com/project) and get your clientId.

We recommend follwing [this wizard](https://developers.google.com/mobile/add?platform=ios) instead and download the file `GoogleServices-Info.plist` that is generated at the end.

Then add that file to your application's target and the last step is to register two custom URL for your application.

The first URL should have a scheme equal to your application Bundle Identifier, the other one should be your Google clientId reversed, so if your clientID is `CLIENTID.apps.googleusercontent.com` the scheme will be `com.googleusercontent.apps.CLIENTID`
> This last value can be found in `GoogleServices-Info.plist` under the key `REVERSED_CLIENT_ID`
> For more information please check Google's [documentation](https://developers.google.com/identity/sign-in/ios/)

And finally with your Mobile clientID from Google, go to [Social Connections](${uiURL}/#/connections/social), select **Google** and add the clientID to the field named `Allowed Mobile Client IDs`
