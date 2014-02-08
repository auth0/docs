# Auth0 Normalized User Profile

Not all the identity providers will supply the same amount of information about the user. They might even choose different properties to convey the same meaning (e.g. `last_name` vs `family_name`). Auth0 normalizes the profile of the user regardless of the identity provider the user is authenticating with. This of course greatly simplifies the development experience, as you just need to be concerend with one schema. 

These are the attributes that Auth0 will provide:

* `user_id`: A unique identifier of the user per identity provider, same for all apps (e.g.: google-oauth2|103547991597142817347). **ALWAYS GENERATED**
* `name`: The full name of the user (e.g.: John Foo). **ALWAYS GENERATED**
* `email`: Email of the user.  (if available from provider. E.g. twitter won't give you one. If using facebook or windows live, you will have to ask for extra user consent).
* `nickname`: User name (if available, might not be unique across identity providers). **ALWAYS GENERATED**
* `picture`: URL pointing to the user picture (if not available, will use [gravatar.com](http://gravatar.com) with the email). **ALWAYS GENERATED**
* `given_name`: First name of the user (if available).
* `family_name`: Last name of the user (if available).

Another piece of information added to the user profile is an array of identities. This is used when the user associates one account with a new one (e.g.: Google and Facebook different accounts, same person).

* `access_token`: inside the identities array you will find one record per identity provider the user has associated. If the identity provider is OAuth2, you will find the `access_token` that can be used to call the provider API and obtain more information from the user (e.g: Facebook friends, Google contacts, LinkedIn contacts, etc.)
* `access_token_secret`: **currently only for twitter**. If the identity provider is OAuth 1.0a, an  `access_token_secret` property will be present and can be used to call the provider API and obtain more information from the user.

> **NOTE:** Auth0 will pass-through to the app any other properties supplied by the identity provoder, that are not mapped to the standard attributes named above.

This is a sample user profile from a user that logged in through **Google**:

```
{
  "email": "johnfoo@gmail.com",
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

```
{
  "email": "bobdoe@outlook.com",
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

This is a sample profile from **Office 365 (Windows Azure Active Directory)**:

```
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

```
{
  "email": "john@fabrikam.com",
  "family_name": "Fabrikam",
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
