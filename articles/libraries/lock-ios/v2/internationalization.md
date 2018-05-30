---
section: libraries
title: Internationalization in Lock v2 for iOS
description: Internationalization support in Lock v2 for iOS
tags:
  - libraries
  - lock
  - ios
  - i18n
---

# Internationalization

By default, **Lock v2 for iOS** displays all text in English. If you wish to display text in another language, or you wish to alter the text values for your application, you may provide a `Lock.strings` file and define values to be used for the various text items that Lock might display.

More information about how to handle languages can be found in the official Apple documentation on [Internationalization and Localization](https://developer.apple.com/library/content/documentation/MacOSX/Conceptual/BPInternational/Introduction/Introduction.html#//apple_ref/doc/uid/10000171i-CH1-SW1)

## Lock String Values

For a full list of the terms used by Lock, see the base [Lock.strings](https://raw.githubusercontent.com/auth0/Lock.swift/master/Lock/Base.lproj/Lock.strings) file in the Lock.swift repository.

### Providing alternative English strings

If you want to change some or all of the existing terms, you can do this by downloading and adding the [Lock.strings](https://raw.githubusercontent.com/auth0/Lock.swift/master/Lock/Base.lproj/Lock.strings) file to your project.

Select the **Lock.strings** file and in the `File inspector` click on `Localize...`

![xcode localizable](/media/articles/libraries/lock-ios/xcode_localize.png)

Then select `English`:

![xcode localizable](/media/articles/libraries/lock-ios/xcode_localize_english.png)

Now lets take a couple of terms in **Lock.strings** and update them with alternative text:

```text
// Forgot password
"com.auth0.lock.database.button.forgot_password" = "Did you forget your password?";
// tos & privacy
"com.auth0.lock.database.button.tos" = "Signing up is an indication of your agreement to our terms of\n service and privacy policy";
```

### Supporting other languages

To add another language you first of all need to add the new language under `Project/Info`

![xcode add language](/media/articles/libraries/lock-ios/xcode_add_language.png)

Add the new language and ensure that **Lock.strings** is selected

![xcode add language](/media/articles/libraries/lock-ios/xcode_add_language_step_2.png)

You will notice under **Lock.strings** a new file has been created for your specified language, based upon the the **Reference Language** selection.

Now you are ready to translate to your desired language.

### Notes

Some terms use parameters and it's important to note their placement in your translation.  In particular multiple parameter terms such as:

```text
// No more than %@{count} identical characters in a row (such as, \"%@{identical sample}\" not allowed)
"com.auth0.lock.error.password.no_more_identical" = "No more than %1$d identical characters in a row (such as, \"%2$@\" not allowed)";
```
