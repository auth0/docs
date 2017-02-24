---
section: libraries
toc_title: Internationalization
title: Internationalization in Lock v2 for iOS and macOS 
description: Internationalization support in Lock v2 for iOS and macOS
---

# Internationalization

By default, **Lock v2 for iOS and macOS** displays all text in English. If you wish to display text in another language, or you wish to alter the text values for your application, you may provide a `Lock.strings` file and define values to be used for the various text items that Lock might display.

More information about how to handle languages in Swift can be found in the Apple documentation on [Internationalization and Localization](https://developer.apple.com/library/content/documentation/MacOSX/Conceptual/BPInternational/Introduction/Introduction.html#//apple_ref/doc/uid/10000171i-CH1-SW1)

Some of the default values provided by Lock include:

```
// Forgot password
"com.auth0.lock.database.button.forgot_password" = "Don’t remember your password?";
// tos & privacy
"com.auth0.lock.database.button.tos" = "By signing up, you agree to our terms of\n service and privacy policy";
```

By providing your own `Lock.strings` file, these values can be adjusted as such:

```
// Forgot password
"com.auth0.lock.database.button.forgot_password" = "Did you forget your password?";
// tos & privacy
"com.auth0.lock.database.button.tos" = "Signing up is an indication of your agreement to our terms of\n service and privacy policy";
```

Or, you could translate those strings to entirely different languages, and set up those languages in Xcode along with the other strings files used in the translations for your app.

## Lock String Values

For a full list of the names used by Lock, see the [default Lock.strings file](https://github.com/auth0/Lock.swift/blob/master/Lock/Base.lproj/Lock.strings) in the Lock.swift repository.
