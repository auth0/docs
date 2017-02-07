---
section: libraries
toc_title: Android Development Keystores and Key Hashes
title: Android Development Keystores and Key Hashes
url: /libraries/lock-android/keystore
description: Instructions on acquiring development keystores/key hashes during Android app development.
---

# Android Development Keystores and Key Hashes

You will need a [Keystore](https://developer.android.com/studio/publish/app-signing.html) for signing your Android app. 

_If you already have one, you can continue and skip the instructions about acquiring one._ 

During development, you can use the default "android debug keystore" to sign your application. To generate the key hashes using this keystore follow the examples below. 

For a release keystore, replace the file, alias, store password and key password with your own values.

## Generating your key hashes

**On Windows:**

```bash
keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
```

**On Linux / macOS:**

```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

**Sample output:**

```text
Alias name: androiddebugkey
Creation date: Jan 01, 2013
Entry type: PrivateKeyEntry
Certificate chain length: 1
Certificate[1]:
Owner: CN=Android Debug, O=Android, C=US
Issuer: CN=Android Debug, O=Android, C=US
Serial number: 4aa9b300
Valid from: Mon Jan 01 08:04:04 UTC 2013 until: Mon Jan 01 18:04:04 PST 2033
Certificate fingerprints:
     MD5:  AE:9F:95:D0:A6:86:89:BC:A8:70:BA:34:FF:6A:AC:F9
     SHA1: BB:0D:AC:74:D3:21:E1:43:07:71:9B:62:90:AF:A1:66:6E:44:5D:75
     SHA256: 15:B9:F9:33:9F:E4:E3:68:C2:10:49:17:5D:A8:77:12:7C:8E:57:E9:FF:B7:23:EA:CC:DD:56:08:06:C9:5E:33
     Signature algorithm name: SHA256withRSA
     Version: 3
```

## Using your key hashes

Once you have your key hashes output, copy the resulting SHA256 value and go to your client's settings in the [Auth0 Dashboard](${manage_url}/#/clients). Click "Show Advanced Settings", and in the "Mobile Settings" tab, under "Android", fill the "App Package Name" with your application's package name, and the "Key Hashes" field with the SHA256 value you copied. Don't forget to save the changes.

::: panel-warning Required Actions
If you don't add the Callback URL to the client settings nor the Key Hashes to the client's mobile settings, the Auth0 server won't return the call result to your application.
:::