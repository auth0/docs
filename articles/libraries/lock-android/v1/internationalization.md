---
section: libraries
title: Lock Android v1 Internationalization
description: Internationalization support in Lock for Android
tags:
  - libraries
  - lock
  - i18n
  - android
---
# Lock Android: Internationalization

<%= include('../_includes/_lock-version') %>

By default, **Lock.Android** displays all text in English. If you wish to display text in another language, you may provide a `strings.xml` file and define values to be used for the various text items that Lock might display.

Android asks the device what _locale_ was configured by the user and tries to fetch the list of localized texts for that language. For this to work, the developer needs to add each translation file into the app by using a special folder naming convention as per Android standards. More information can be found in the [Android developer docs](https://developer.android.com/training/basics/supporting-devices/languages.html).

Some of the default values provided by Lock include:

```html
<resources>
  <string name="sms_login_btn_text">Login SMS</string>
  <string name="no_login_text">Login not found</string>
  ...
</resources>
```

By providing your own `strings.xml` file, these values can be adjusted as such:

```html
<resources>
  <string name="sms_login_btn_text">Login with SMS</string>
  <string name="no_login_text">This user was not found!</string>
  ...
</resources>
```

## Lock String Values

For a full list of the names used by Lock, see the [default strings.xml file](https://github.com/auth0/Lock.Android/blob/v1/app/src/main/res/values/strings.xml) in the Lock.Android repository.
