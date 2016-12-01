---
title: Login
default: true
description: This tutorial demonstrates how to use the Auth0 React Native iOS SDK to add authentication and authorization to your mobile app.
budicon: 448
---

<%= include('../../_includes/_package', {
  org: 'auth0',
  repo: 'Mobile-Samples.React',
  path: 'Classic/Lock',
  requirements: [
    'React Native 0.26.0',
    'CocoaPods 1.0.0',
    'NodeJS 4.3'
  ]
}) %>

## CocoaPods

You'll need CocoaPods in order to fetch **Lock** native libraries dependencies for you and link them to your project.

To install CocoaPods just run the following command:

```bash
gem install cocoapods
```

> If you need help installing CocoaPods, please check this [guide](http://guides.cocoapods.org/using/getting-started.html)

## Adding Lock

First you need to run the following command to install **react-native-lock**

```bash
npm install --save react-native-lock
```

Then install [rnpm](https://github.com/rnpm/rnpm)

```bash
npm install rnpm -g
```

After that, link **react-native-lock** with your iOS project:

```bash
rnpm link react-native-lock
```

If you get the following warning.

```
!] The `<YourAppName> [Debug]` target overrides the `OTHER_LDFLAGS` build setting defined in `Pods/Target Support Files/Pods/Pods.debug.xcconfig'. This can lead to problems with the CocoaPods installation
    - Use the `$(inherited)` flag, or
    - Remove the build settings from the target.

[!] The `<YourAppName> [Release]` target overrides the `OTHER_LDFLAGS` build setting defined in `Pods/Target Support Files/Pods/Pods.release.xcconfig'. This can lead to problems with the CocoaPods installation
    - Use the `$(inherited)` flag, or
    - Remove the build settings from the target.
```

Click `<YourAppName>.xcodeproj` in the project navigator and go the `Build Settings` tab. Make sure 'All' is toggled on (instead of 'Basic'). Look for `Other Linker Flags` and add the value `$(inherited)` for **all** configurations .

Another error you might have while trying to run the project, if you are using a `react-native` version `>=0.26.0`

```
"std::terminate()", referenced from:
        ___clang_call_terminate in libReact.a(RCTJSCExecutor.o)
```

To solve it, click `<YourAppName>.xcodeproj` in the project navigator and go the `Build Settings` tab. Make sure 'All' is toggled on (instead of 'Basic'). Look for `Other Linker Flags` and add the flag `-lc++` for **all** configurations .

## Implement the Login

Now we're ready to implement the Login. First we need to require react-native-lock-ios:

${snippet(meta.snippets.setup)}

Then we can show **Lock**:

${snippet(meta.snippets.use)}

[![Lock.png](/media/articles/native-platforms/reactnative-ios/Lock-Widget-Screenshot.png)](https://auth0.com)

> **Note**: There are multiple ways of implementing the login box. What you see above is the Login Widget, but you can try our passwordless Login Widgets: [SMS](https://github.com/auth0/react-native-lock-ios#sms-passwordless), [Email](https://github.com/auth0/react-native-lock-ios#email-passwordless) or [TouchID](https://github.com/auth0/react-native-lock#touchid-ios-only)

On successful authentication, the callback function will yield the user's profile and tokens inside the parameters `profile` and `token` respectively.

## Showing User Information

After the user has logged in, we can use the `profile` object which has all the user information (Let's assume the profile is stored in a component's state object):

```jsx
  <Text>Welcome {this.state.profile.name}</Text>
  <Text>Your email is: {this.state.profile.email}</Text>
```

> You can [click here](/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.