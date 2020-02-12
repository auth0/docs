---
description: Claims for a user profile returned via an OIDC-Compliant authorization flow
topics:
  - user-profile
  - normalized-user-profile
  - users
  - oidc-user-profiles
contentType:
  - index
  - concept
  - reference
useCase:
  - manage-users
---
# User Profiles Returned from OIDC-Compliant Pipelines

::: version-warning
This article describes the user profile that includes only the [OpenID Connect (OIDC) standard claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). Use the toggle for information on the Auth0 normalized profile, which might contain information from many identity providers.
:::

When you're using an OIDC-conformant authentication flow, the user profile you receive in return may differ slightly from the [Auth0 Normalized User Profile](/users/normalized/auth0).

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
   "address": {
      "street_address": "",
      "locality": "",
      "region": "",
      "postal_code": "",
      "country": ""
   },
   "updated_at": "",
  }
```

## Retrieve User Profiles using ID Tokens

You can retrieve the user profile by retrieving an ID Token using the Authentication API's [`oauth/token` endpoint](/api/authentication#get-token) or the [`/userinfo` endpoint](/api/authentication#get-user-info). Auth0's [Lock](https://auth0.com/docs/libraries#lock-login-signup-widgets) widget and the [Auth0 client-side SDKs](/libraries#auth0-client-side-sdks) also return the OIDC-compliant user profile.

Additionally, the User Profile section of our [QuickStarts](/quickstarts) return user profiles compliant with the OIDC specification. Some of our more popular QuickStarts are:

- [ASP.NET Core](/quickstart/webapp/aspnet-core/04-user-profile)
- [Android](/quickstart/native/android/04-user-profile)
- [Angular 2](/quickstart/spa/angular2/03-user-profile)
- [Node.js](/quickstart/webapp/nodejs)
- [React](/quickstart/spa/react/02-user-profile)

## Claims

| Parameter | Definition |
| --------- | ---------- |
| `sub` | unique identifier for the user |
| `name` | name of the user |
| `given_name` | the first/given name of the user |
| `family_name` | the surname/last name of the user |
| `middle_name` | the middle name of the user |
| `nickname` | casual name of the user that may/may not be the same as the `given_name` |
| `preferred_username` | identifier by which the user wishes to be referred to |
| `profile` | URL of the user's profile page |
| `picture` | URL of the user's profile picture |
| `website` | URL of the user's website/blog |
| `email` | preferred email address of the user |
| `email_verified` <br/><span class="label label-primary">Boolean</span> | `true` if user's email address is verified; else, `false` |
| `gender` | gender of the user |
| `birthdate` | birthday of the user |
| `zoneinfo` | time zone in which the user is located |
| `locale` | two-part code representing the end user's language and location (e.g., `fr-CA` for a user located in Canada and working in French) |
| `phone_number` | preferred telephone number for the user |
| `phone_number_verified` <br/><span class="label label-primary">Boolean</span> | `true` if user's phone number is verified; else, `false` |
| `address` <br/><span class="label label-primary">JSON Object</span> | preferred postal address of the user |
| `updated_at` <br/><span class="label label-primary">Number</span> | time when the user's profile was last updated |

## Keep reading

* [Configure Applications with OpenID Connect Discovery](/protocols/oidc/openid-connect-discovery)
* [OIDC Conformant Authentication Adoption Guide](/api-auth/tutorials/adoption)
* [OIDC Handbook](https://auth0.com/resources/ebooks/the-openid-connect-handbook)