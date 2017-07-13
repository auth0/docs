---
description: Claims for a user profile returned via an OIDC-Compliant authorization flow
---

# User Profiles Returned from OIDC-Compliant Pipelines

::: version-warning
This article describes the claims included in the ID tokens returned when authenticating someone using an OIDC-conformant flow. The claims differ from those returned on the Auth0 Normalized Profile, which is a protocol-agnostic representation of the user that provides a standard way of storing user-related claims, regardless of the identity provider(s) involved. 

Please toggle the versioning drop-down to **auth0** to see additional information on claims included on the Auth0 Normalized Profile.
:::

When you're using an OIDC-conformant authentication flow, the user profile you receive in return may differ slightly from the [Auth0 Normalized User Profile](/user-profile/normalized).

The following is a [non-normative example of such a response](https://openid.net/specs/openid-connect-basic-1_0.html#StandardClaims):

```json
  {
   "sub": "248289761001",
   "name": "Jane Doe",
   "given_name": "Jane",
   "family_name": "Doe",
   "middle_name": "",
   "nickname": "",
   "preferred_username": "j.doe",
   "profile": "",
   "picture": "http://example.com/janedoe/me.jpg",
   "website": "http://example.com",
   "email": "janedoe@example.com",
   "email_verified": true,
   "gender": "female",
   "birthdate": "",
   "zoneinfo": "",
   "locale": "",
   "phone_number": "",
   "phone_number_verified": false,
   "address": "",
   "updated_at": "",
  }
```

## How to Retrieve the User Profile

You can retrieve the user profile by retrieving an ID token using the Authentication API's [`oauth/token` endpoint](/api/authentication#get-token) or the [`/userinfo` endpoint](/api/authentication#get-user-info). Auth0's [Lock](https://auth0.com/docs/libraries#lock-login-signup-widgets) widget and the [Auth0 client-side SDKs](/libraries#auth0-client-side-sdks) also return the OIDC-compliant user profile.

Additionally, the User Profile section of our [QuickStarts](/quickstarts) return user profiles compliant with the OIDC specification. Some of our more popular QuickStarts are:

- [ASP.NET Core](/quickstart/webapp/aspnet-core/04-user-profile)
- [Android](/quickstart/native/android/04-user-profile)
- [Angular 1.x](/quickstart/spa/angularjs/02-user-profile) and [Angular 2](/quickstart/spa/angular2/03-user-profile)
- [jQuery](/quickstart/spa/jquery/02-user-profile)
- [Node.js](/quickstart/webapp/nodejs)
- [React](/quickstart/spa/react/02-user-profile)

## Claims

| Parameter | Definition |
| --------- | ---------- |
| `sub` <br/><span class="label label-primary">String</span> | unique identifier for the user |
| `name` <br/><span class="label label-primary">String</span> | name of the user |
| `given_name` <br/><span class="label label-primary">String</span> | the first/given name of the user |
| `family_name` <br/><span class="label label-primary">String</span> | the surname/last name of the user |
| `middle_name` <br/><span class="label label-primary">String</span> | the middle name of the user |
| `nickname` <br/><span class="label label-primary">String</span> | casual name of the user that may/may not be the same as the `given_name` |
| `preferred_username` <br/><span class="label label-primary">String</span> | identifier by which the user wishes to be referred to |
| `profile` <br/><span class="label label-primary">String</span> | URL of the user's profile page |
| `picture` <br/><span class="label label-primary">String</span> | URL of the user's profile picture |
| `website` <br/><span class="label label-primary">String</span> | URL of the user's website/blog |
| `email` <br/><span class="label label-primary">String</span> | preferred email address of the user |
| `email_verified` <br/><span class="label label-primary">Boolean</span | `true` if user's email address is verified; else, `false` |
| `gender` <br/><span class="label label-primary">String</span> | gender of the user |
| `birthdate` <br/><span class="label label-primary">String</span> | birthday of the user |
| `zoneinfo` <br/><span class="label label-primary">String</span> | time zone in which the user is located |
| `locale` <br/><span class="label label-primary">String</span> | location where the user is located |
| `phone_number` <br/><span class="label label-primary">String</span> | preferred telephone number for the user |
| `phone_number_verified` <br/><span class="label label-primary">Boolean</span | `true` if user's phone number is verified; else, `false` |
| `address` <br/><span class="label label-primary">JSON Object</span | preferred postal address of the user |
| `updated_at` <br/><span class="label label-primary">Number</span | time when the user's profile was last updated |