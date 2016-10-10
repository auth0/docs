---
description: Auth0 normalizes common user properties in the User Profile.
---

# Auth0 Normalized User Profile

Since every identity provider provides a different set of information about a user, Auth0 normalizes common profile properties in the User Profile. 

For example, `family_name` in the User Profile contains details that may have been returned as `surname` or `last_name`.

## Normalized User Profile Schema

The attributes that Auth0 maps to a common schema are listed below.

Fields that are always generated:

* **`name`**: the user's full name.
* **`nickname`**: the user's username.
* **`picture`**: the URL of the user's picture. If unavailable, Auth0 uses the Gravatar image associated with the user's email address.
* **`user_id`**: the user's unique identifier. This is unique per Connection, but the same for all apps that authenticate via that Connection.

Fields that are generated when the details are available:

* **`email`**: the user's email address.
* **`email_verified`**: a boolean indicating if the user's email address has been verified.
* **`given_name`**: the user's first name.
* **`family_name`**: the user's last name.

### Additional Attributes

The User Profile includes an array of identities. In the most common case (logging in with a single provider), the array contains only one element. If the user has multiple accounts linked, the array will have an element for each associated account. 

**NOTE:** For more information, see: [Link Accounts](/link-accounts).

The `identities` array contains the following attributes:

* `connection`: the name of the connection.
* `isSocial`: indicates if the provider is a Social provider.
* `provider`: the provider of the connection.
* `user_id`: the unique identifier of the user for this connection.

**NOTE:** Auth0 will pass to your app all other properties supplied by the identity provider, even if those that are not mapped to the standard attributes listed above.

## Storing User Data

When outsourcing user authentication, there is usually no need to maintain your own users/passwords table. Even so, you may still want to associate application data to authenticated users.

For example, you could have a *Users table* that lists each user authenticated by Auth0. Every time a users logs in, you could search the table for that user. If the user does not exist, you would create a new record. If they do exist, you would update all fields, essentially keeping a local copy of all user data.

Alternatively, you could store the user identifier in each table/collection that has user-associated data. This is a simpler implementation suited to smaller applications.

## Uniquely identify users

There are two recommended options to uniquely identify your users:

1. By the `user_id` property. This is guaranteed to be unique per user (e.g. `{identity provider id}|{unique id in the provider}`, or `facebook|1234567890`).
2. By a *natural* key, like the `email` property. In this case, it is recommended that you enable email verification and only use this option with providers that require that users verify their emails.

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
      "provider": "google-oauth2",
      "user_id": "103547991597142817347",
      "connection": "google-oauth2",
      "isSocial": true
    }
  ],
  "locale": "en",
  "name": "John Foo",
  "nickname": "FooJon",
  "picture": "https://lh4.googleusercontent.com/-OdsbOXom9qE/AAAAAAAAAAI/AAAAAAAAADU/_j8SzYTOJ4I/photo.jpg",
  "user_id": "google-oauth2|103547991597142817347"
}
```

This is a sample profile from **Microsoft Account**:

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
      "provider": "windowslive",
      "user_id": "4cf0a30169d55031",
      "connection": "windowslive",
      "isSocial": true
    }
  ],
  "locale": "en_US",
  "name": "Bob Doe",
  "nickname": "doebob@outlook.com",
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
