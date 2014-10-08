---
lodash: true
---

## iOS Objective-C Tutorial

<% if (configuration.api && configuration.thirdParty) { %>

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="@@base_url@@/Auth0.iOS/master/create-package?path=Examples/basic-sample&type=replace&filePath=Examples/basic-sample/basic-sample/Info.plist@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

<% } else  { %>

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="@@base_url@@/Auth0.iOS/master/create-package?path=Examples/basic-sample&type=replace&filePath=Examples/basic-sample/basic-sample/Info.plist@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

<% } %>

**Otherwise, if you already have an existing application, please follow the steps below.**

### Before Starting

<div class="setup-callback">
<p>Go to the <a href="@@uiAppSettingsURL@@" target="_new">Application Settings</a> section on Auth0 Admin app and make sure that <b>App Callbacks URLs</b> has the following value:</p>

<pre><code>@@account.clientId@@://*.auth0.com/authorize</pre></code>
</div>

### 1. Adding the Auth0 dependencies

Add the following to the `Podfile` and run `pod install`:

```ruby
pod 'Auth0.iOS', '~> 1.0'
pod 'JWTDecode', '~> 0.2'
```

> If you need help installing CocoaPods, please check this [guide](http://guides.cocoapods.org/using/getting-started.html)

### 2. Configuring Auth0 Credentials & Callbacks

Add the following entries to your app's `Info.plist`:

<table class="table"> 
  <thead>
    <tr>
      <th>Key</th>
      <th>Value</th>
    </tr>
  </thead>
  <tr>
    <td>Auth0ClientId</td>
    <td>@@account.clientId@@</td>
  </tr>
  <tr>
    <td>Auth0Tenant</td>
    <td>@@account.tenant@@</td>
  </tr>
</table>

Also you'll need to register a new _URL Type_ with the following scheme
`a0$@@account.clientId@@`. You can do it from your app's target Info section.

![Url type register](https://cloudup.com/cwoiCwp7ZfA+)

### 3. Register Native Authentication Handlers

To allow native logins using other iOS apps, e.g: Twitter, Facebook, Safari etc, you need to add the following method to your `AppDelegate.m` file.

```objc
#import <Auth0.iOS/Auth0.h>

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    return [[A0SocialAuthenticator sharedInstance] handleURL:url sourceApplication:sourceApplication];
}
```

> If you need Facebook or Twitter native authentication please continue reading to learn how to configure them. Otherwise please go directly to the [next step](#8)

#### Facebook

Auth0.iOS uses the native Facebook SDK to obtain the user's access token so you'll need to configure it using your Facebook App info:

First, add the following entries to the `Info.plist`:

|Key|Value|
|---|-----|
|_FacebookAppId_|`YOUR_FACEBOOK_APP_ID`|
|_FacebookDisplayName_|`YOUR_FACEBOOK_DISPLAY_NAME`|

Then, register a custom URL Type with the format `fb<FacebookAppId>`.

> For more information on how to configure this, please check [Facebook Getting Started Guide](https://developers.facebook.com/docs/ios/getting-started).

> **Note:** The Facebook app should be the same as the one set in Facebook's Connection settings on your Auth0 account

Here's an example of how the entries should look like:

![FB plist](https://cloudup.com/cYOWHbPp8K4+)

Finally, you need to register Auth0 Facebook authenticator somewhere in your application. You can do that in the `AppDelegate.m` file, for example:

```objc
#import <Auth0.iOS/Auth0.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    A0FacebookAuthenticator *facebook = [A0FacebookAuthenticator newAuthenticationWithDefaultPermissions];
    [[A0SocialAuthenticator sharedInstance] registerSocialAuthenticatorProvider:facebook];
}
```

####Twitter

To support Twitter native authentication you need to configure Auth0 Twitter authenticator:

```objc
#import <Auth0.iOS/Auth0.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  NSString *twitterApiKey = ... //Remember to obfuscate your api key
  NSString *twitterApiSecret = ... //Remember to obfuscate your api secret
  A0TwitterAuthenticator *twitter = [A0TwitterAuthenticator newAuthenticationWithKey:twitterApiKey                                                                            andSecret:twitterApiSecret];
  [[A0SocialAuthenticator sharedInstance] registerSocialAuthenticatorProvider:twitter];
}
```

### 4. Let's implement the login

Now we're ready to implement the Login. We can instantiate `A0AuthenticationController` and present it as a modal screen. In one of your controllers import **Auth0.iOS** classes

```objc
#import <Auth0.iOS/Auth0.h>
```

Then we instantiate the native widget and present it as a modal screen:

```objc
A0AuthenticationViewController *controller = [[A0AuthenticationViewController alloc] init];
controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
    // Do something with token & profile. e.g.: save them.
    // And dismiss the ViewController
    [self dismissViewControllerAnimated:YES completion:nil];
};
[self presentViewController:controller animated:YES completion:nil];
```

On successful authentication, `onAuthenticationBlock` will yield the user's profile and tokens.

> To learn how to save and manage the tokens and profile, please read [this guide](https://github.com/auth0/Auth0.iOS/wiki/How-to-save-and-refresh-JWT-token)

> **Note**: There are multiple ways of implementing the login box. What you see above is the Login Widget, but if you want, you can use your own UI.

### 5. Showing user information

After the user has logged in, we can use the `profile` object which has all the user information:

```objc
  self.usernameLabel.text = profile.name;
  self.emailLabel.text = profile.email;
```

> You can [click here](@@base_url@@/user-profile) to find out all of the available properties from the user's profile or you can check [A0UserProfile](https://github.com/auth0/Auth0.iOS/blob/master/Pod/Classes/Core/A0UserProfile.h). Please note that some of this depend on the social provider being used.

### 6. We're done

You've implemented Login and Signup with Auth0 in iOS. You're awesome!

