---
section: libraries
title: Custom Fields at Signup
description: Adding additional fields to signups with Lock v2 for iOS
tags:
  - libraries
  - lock
  - ios
---

# Lock v2 for iOS - Custom Fields at Signup

**Lock v2 for iOS** allows you to specify additional fields that the user must complete before creating a new account. The extra fields will be shown on a second screen after the user completes the basic fields (email, username, password).

## Adding custom fields

When signing up the default information requirements are the user's *email* and *password*. You can expand your data capture requirements as needed. Capturing additional signup fields here will store them in the `user_metadata`, which you can read more about in the [Metadata Documentation](/metadata).

```swift
.withOptions {
  $0.customSignupFields = [
    CustomTextField(name: "first\_name", placeholder: "First Name", icon: LazyImage(name: "ic_person", bundle: Lock.bundle)),
    CustomTextField(name: "last\_name", placeholder: "Last Name", icon: LazyImage(name: "ic_person", bundle: Lock.bundle))
  ]
}
```

::: note
You must specify the icon to use with your custom text field.
:::

Thats it! If you have enabled users Sign Up in the Application's Dashboard, after they complete the basic fields (email/username, password) and hit Submit, they will be prompted to fill the remaining fields.

::: note
Note that the user must fill all of the custom fields before being able to complete signup.
:::

When requesting a user Sign Up or Sign In, the extra fields will be attached to the `user_metadata` attribute in the request body. You can access them by querying the user profile at any time, even from the Dashboard in the User's section.
