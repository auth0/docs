## iOS guide to i18n

Here are the instructions to internationalize your iOS application. Please follow the steps below:

1) Add a file named `Lock.strings`, which is the format for i18n in iOS, included in the bundle of the app when is built. The easier way to do it is using Xcode, just go to `File -> New File`, then `iOS -> Strings File`. The name will be Auth0 and make sure it's added to your application target by checking the box.

![](/media/articles/i18n/i18n-guide-mobile/i18n-guide-mobile-1.png)

![](/media/articles/i18n/i18n-guide-mobile/i18n-guide-mobile-2.png)

2) Then the file contents should be something like this:

```
"Email" = "Email";
"Password" = "Passwort";
"ACCESS" = "ZUGRIFF";
```

Where the key is the text you see in screen and the value is the translation.

3) To have multiple languages you'll need to add them in your project settings:

![](/media/articles/i18n/i18n-guide-mobile/i18n-guide-mobile-1.png)

4) Then you will see different files per language you can customize:

![](/media/articles/i18n/i18n-guide-mobile/i18n-guide-mobile-3.png)


