---
toc_title: Custom Fields at Signup
description: Adding additional fields to signups with Lock for Android
---

# Lock for Android Custom Fields at Signup

**Lock.Android** allows you to specify additional fields that the user must complete before creating a new account. The extra fields will be shown on a second screen after the user completes the basic fields (email, username, password).

## Create the Custom Fields
Create a new `CustomField` object passing all these 4 mandatory parameters.

1. Icon: The `int` that points to the resource you want to use as Icon (keep it small).
2. Type: The `FieldType` to use in this field. The type defines the keyboard layout and sometimes the input validation.
3. Key: The `String` that identifies this value in the result JSON. It shouldn't be repeated! Repeated field keys will result in the second field getting removed from the list.
4. Hint: The `@StringRes` of the text to show as hint in the field.

```java
List<CustomFields> customFields = new ArrayList<>();

CustomField fieldName = new CustomField(R.drawable.ic_field_person, FieldType.TYPE_TEXT_NAME, "firstName", R.string.hint_first_name);
customFields.add(fieldName);
```

Repeat the above steps as many times as fields you need.

## Use the Custom Fields
Create a new `List` to store the fields. Pass the list to the `Lock.Builder` before you build it, using the method `withSignUpFields()`.

```java
Lock lock = Lock.newBuilder(auth0, callback)
              .withSignUpFields(customFields)
              //...
              .build(this);
```

Thats it! If you have enabled users Sign Up in the Application's Dashboard, after they complete the basic fields (email/username, password) and hit Submit, they will be prompted to fill the remaining fields.

> Note that the user must fill _all_ of the custom fields before being able to complete signup.

When requesting a user Sign Up or Sign In, the extra fields will be attached to the `user_metadata` attribute in the request body. You can access them by querying the user profile at any time, even from the Dashboard in the User's section.

## Field Types
Each custom field can only have one `FieldType` associated.

* TYPE_NAME
* TYPE_NUMBER
* TYPE_PHONE_NUMBER
* TYPE_EMAIL
