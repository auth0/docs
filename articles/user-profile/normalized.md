# Auth0 Normalized User Profile

Not all the identity providers (called _Connections_ in Auth0) will supply the same amount of information about the user. They might even choose different properties to convey the same meaning (e.g. `last_name` vs `family_name`). Auth0 normalizes common and frequently used properties in the user profile. This greatly simplifies the development experience, as you just need to be concerned with one schema.

These are the attributes that Auth0 will map to a common schema:

* `user_id`: A unique identifier of the user per identity provider, same for all apps (e.g.: google-oauth2|103547991597142817347). **ALWAYS GENERATED**
* `name`: The full name of the user (e.g.: John Foo). **ALWAYS GENERATED**
* `email`: Email of the user.  (if available from provider. Some providers, like Twitter, won't give you one. Other providers will require a specific scope and user consent).
* `email_verified`: Whether the email of the user has been verified.  When using Database Connections, an email is sent to the user on signup. The message contains a link, that when followed sets this property to `true`. When using Enterprise or Social Connections this flag comes from the identity provider. Email verification can be turned on/off on the Dashboard under the Emails section.
* `nickname`: Username (if available, might not be unique across identity providers). **ALWAYS GENERATED**
* `picture`: URL pointing to the user picture (if not available, Auth0 will use [gravatar.com](http://gravatar.com) with the email). **ALWAYS GENERATED**
* `given_name`: First name of the user (if available).
* `family_name`: Last name of the user (if available).

Another piece of information added to the user profile is an array of identities. In the common use case (logging in with a single provider), the array contains only one element.

When accounts are linked though, the array will have an element for each account that has been associated. See [account linking](/link-accounts) for more information.

* `access_token` (inside the `identities` array): if the identity provider implements OAuth2, you will find the `access_token` that can be used to call the provider API and obtain more information from the user (e.g: Facebook friends, Google contacts, LinkedIn contacts, etc.)

* `access_token_secret`: **currently only for Twitter**. If the identity provider is OAuth 1.0a, an  `access_token_secret` property will be present and can be used to call the provider API and obtain more information from the user.

> **NOTE:** Auth0 will pass-through to the app any other properties supplied by the identity provider, that are not mapped to the standard attributes named above.

## Keeping User Data on your Application

When outsourcing user authentication there frequently no need to keep a Users/Passwords table, but you will still want to associate application data to the authenticated user. 

For example, you could have a **Users table**, that would have a copy of each user authenticated by Auth0 (without passwords of course). Every time a users logs in, you would search that user. If it does not exist, you could create a new record on the fly. If it does exist, update all the fields, essentially keeping a local copy of the user data. This is useful, if your app uses this information for reporting, or analytics.

Another option would be to have the user identifier on each table/collection that has user-associated data. For smaller applications, that's often simpler to implement.

## Uniquely identifying users coming from Auth0

There are two recommended options:

1. Using the `user_id` property. This is guaranteed to be unique per user. (Often of the form: `{identity provider id}|{unique id in the provider}`, like: `facebook|1234567890`).
2. Using a _natural_ key like the `email` property. In this case it's very important to turn on Email Verification and also check that `email_verified` is `true`, otherwise you would be open to some edge case where a user might signup using an identity provider that provides email but it doesn't verify it. Also, in some cases like Twitter, email is not provided.

## Sample User Profiles

This is a sample user profile from a user that logged in through **Google**:

```json
{
  "email": "johnfoo@gmail.com",
  "email_verified": true,
  "family_name": "Foo",
  "gender": "male",
  "given_name": "John",
  "identities": [
    {
      "access_token": "ya29.AsaS6ZQgRHlCHqzZ3....sFFBpQYpVVieSWur-7tmZbzEtwMkA",
      "provider": "google-oauth2",
      "user_id": "103547991597142817347",
      "connection": "google-oauth2",
      "isSocial": true
    }
  ],
  "locale": "en",
  "name": "John Foo",
  "nickname": "matiasw",
  "picture": "https://lh4.googleusercontent.com/-OdsbOXom9qE/AAAAAAAAAAI/AAAAAAAAADU/_j8SzYTOJ4I/photo.jpg",
  "user_id": "google-oauth2|103547991597142817347"
}
```

This is a sample profile from **Windows LiveID (Microsoft Accounts)**:

```json
{
  "email": "bobdoe@outlook.com",
  "email_verified": true,
  "emails": [
    "bobdoe@outlook.com",
    "bobdoe@outlook.com"
  ],
  "family_name": "Doe",
  "given_name": "Bob",
  "identities": [
    {
      "access_token": "EwAoAq1DBAAUGCCXc8wU/zFu...OTvW4acxv5gAA",
      "provider": "windowslive",
      "user_id": "4cf0a30169d55031",
      "connection": "windowslive",
      "isSocial": true
    }
  ],
  "locale": "en_US",
  "name": "Bob Doe",
  "nickname": "matiasw@outlook.com",
  "picture": "https://secure.gravatar.com/avatar/c89b2bb92df91508e14172097a5e17da?s=480&r=pg&d=https%3A%2F%2Fssl.gstatic.com%2Fs2%2Fprofiles%2Fimages%2Fsilhouette80.png",
  "user_id": "windowslive|4cf0a30169d55031"
}
```

This is a sample profile from **Office 365 (Microsoft Azure Active Directory)**:

```json
{
  "email": "jeff@foo.onmicrosoft.com",
  "family_name": "Jeff",
  "given_name": "Beth",
  "identities": [
    {
      "user_id": "10030000838D23AF@MicrosoftOnline.com",
      "provider": "office365",
      "connection": "foo-onmicrosoft",
      "isSocial": false
    }
  ],
  "name": "Jeff Beth",
  "nickname": "jeff@auth0.onmicrosoft.com",
  "picture": "https://secure.gravatar.com/avatar/a7f86ddd090d5a4cb833b97baab2aca1?s=480&r=pg&d=https%3A%2F%2Fssl.gstatic.com%2Fs2%2Fprofiles%2Fimages%2Fsilhouette80.png",
  "tenantid": "75696069-df44-4310-9bcf-08b45e3007c9",
  "upn": "jeff@foo.onmicrosoft.com",
  "user_id": "office365|10030000838D23AF@MicrosoftOnline.com"
}
```

This is a sample profile from **ADFS (Active Directory Federation Services)**:

```json
{
  "email": "john@fabrikam.com",
  "family_name": "Fabrikam",
  "email_verified": false,
  "given_name": "John",
  "identities": [
    {
      "user_id": "john@fabrikam.com",
      "provider": "adfs",
      "connection": "auth10.com",
      "isSocial": false
    }
  ],
  "issuer": "https://adfs.fabrikam.com",
  "name": "John Fabrikam",
  "nickname": "john",
  "picture": "https://secure.gravatar.com/avatar/5426f6b9d63ad92d60e6fe9fdf83aa21?s=480&r=pg&d=https%3A%2F%2Fssl.gstatic.com%2Fs2%2Fprofiles%2Fimages%2Fsilhouette80.png",
  "user_id": "adfs|john@fabrikam.com"
}
```
