# Auth0 Normalized User Profile

Because individual identity providers (known as **Connections** in Auth0) provide differing amounts of information about a user, Auth0 normalizes common and frequently used properties in the User Profile. For example, `user_name` in the User Profile contains details that may have been returned as `surname` or `last_name`.

## Normalized User Profile Schema

These are the attributes that Auth0 will map to a common schema:

*Fields that are **always generated**: *

* **`name`**: the user's full name;
* **`nickname`**:the user's username;
* **`picture`**: the URL pointed to the user's picture. If unavailable, Auth0 will use the Gravatar image associated with the user's email address;
* **`user_id`**: the user's unique identifier. This is unique per Connection, but the same for all apps that authenticate via that Connection.

*Fields that are generated if details are available:*
* **`email`**: the user's email address;
* **`email_verified`**: the `true/false` value indicating if the user's email address has been verified;
* **`given_name`**: the user's first name;
* **`family_name`**: the user's last name.

### Additional Attributes

The User Profile includes an array of identities. In the common use case (logging in with a single provider), the array contains only one element.

In the event that the user logs in with a single provide, the array contains one element. If the user has multiple accounts linked, the array will have an element for each associated account. See [account linking](/link-accounts) for more information.

The `identities` array contains the following attributes:

* `access_token`: if the identity provider implements OAuth2, you will find the `access_token` that can be used to call the provider API and obtain more information about the user;
* `access_token_secret`: **currently only for Twitter**. If the identity provider is OAuth 1.0a, an  `access_token_secret` property will be present and can be used to call the provider API and obtain more information from the user;
* `connection`: the name of the connection;
* `expires_in`: the length of time before the token expires;
* `isSocial`: indicates if the provider is a Social provider;
* `provider`: the provider of the connection;
* `user_id`: the unique identifier of the user for this connection.

> **NOTE:** Auth0 will pass through to the app any other properties supplied by the identity provider, even those that are not mapped to the standard attributes named above.

## Keeping User Data on your Application

When outsourcing user authentication, there generally is no need to keep a Users/Passwords table. Even so, you might still want to associate application data to authenticated users.

For example, you could have a **Users table** that would have a copy of each user authenticated by Auth0. Every time a users logs in, you would search the table for that user. If the user does not exist, you would create a new record. If it does exist, you would update all fields, essentially keeping a local copy of the user data.

Alternatively, you might store the user identifier on each table/collection that has user-associated data. For smaller applications, that's often simpler to implement.

## Uniquely Identifying Users from Auth0

There are two recommended options:

1. Using the `user_id` property. This is guaranteed to be unique per user. (e.g.: `{identity provider id}|{unique id in the provider}`, or `facebook|1234567890`).
2. Using a *natural* key like the `email` property. We recommend, however, that you turn on email verification and only use this with providers that require the users to verify their emails.

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
