---
description: Import MFA enrollments for your existing users.
topics:
  - mfa
contentType:
  - how-to
useCase:
  - import-mfa
---
# Import Multi-Factor Authenticators

You can import a user's MFA enrollments with [automatic migration](/users/guides/configure-automatic-migration) and [bulk user imports](/users/guides/bulk-user-imports). The supported enrollment types are:

* Email: for [email](/mfa/concepts/mfa-factors#email-notifications) verification.
* Phone: for [SMS](/mfa/concepts/mfa-factors#sms-notifications) or [Voice](/mfa/concepts/mfa-factors#voice-notifications) verification.
* TOTP: for [One-Time Passwords (OTP)](/mfa/concepts/mfa-factors#one-time-passwords) used with authenticator applications, such as Google Authenticator.

Importing MFA enrollments provides a seamless user experience, since users won't have to re-enroll after migration.

::: warning
Please note that the classic login experience does not support factor selection for users with multiple factors. If you plan to import users with multiple registered factors, consider using the [universal login](/universal-login) experience.

:::

## Schema

The schema applies to MFA factors for both of the aforementioned workflows.

```json
{
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "totp": {
                "type": "object",
                "properties": {
                "secret": {
                    "type": "string",
                        "pattern": "^[A-Z2-7]+$",
                        "description": "The OTP secret is used for MFA authentication with Google Authenticator type apps. It must be supplied in un-padded Base32 encoding, such as: JBTWY3DPEHPK3PNP"
                    },
                },
                "additionalProperties": false,
                "required": ["secret"],
            },
            "phone": {
                "type": "object",
                "properties": {
                "value": {
                    "type": "string",
                    "pattern": "^\\+[0-9]{1,15}$",
                    "description": "The phone number for SMS or Voice MFA. The phone number should include a country code and begin with +, such as: +12125550001"
                },
                },
                "additionalProperties": false,
                "required": ["value"],
            },
            "email": {
                "type": "object",
                "properties": {
                    "value": {
                        "type": "string",
                        "format": "email",
                        "description": "The email address for MFA"
                    },
                },
                "additionalProperties": false,
                "required": ["value"],
            },
        },
        "maxProperties": 1,
        "additionalProperties": false,
    },
    "minItems": 1,
    "maxItems": 10
}
```

## Bulk User Import

To begin, prepare a `users.json` file as described [here](/users/guides/bulk-user-imports). Be sure to include any existing MFA enrollments for each user. Next, start a bulk user import (described in more detail [here](/users/guides/bulk-user-imports#request-bulk-user-import)). You can _update_ the factors of any existing users by enabling the `upsert` option in your initial request.

Once the import job completes, check the response for any errors. If any of the users' MFA factors failed to import, you will see errors such as: 

```json
{
  "code": "MFA_FACTORS_FAILED",
  "message": "Unable to import factors"
}
```

When using the `upsert` option, any non-MFA related updates to existing users will have been applied to the user's profile. For example, the following error summary shows the user's `picture` attribute was successfully set to `http://example.org/jdoe.png`, however we were unable to import the provided MFA factors. In cases like this it is safe to retry the import for failed users.

```json
[
  {
    "user": {
      "email": "antoinette@contoso.com",
      "picture": "http://example.org/jdoe.png",
      "mfa_factors": [
        {
          "totp": {
            "secret": "2PRXZWZAYYDAWCD"
          }
        },
        {
          "phone": {
            "value": "+15551112233"
          }
        },
        {
          "email": {
            "value": "antoinette@antoinette.biz"
          }
        }
      ]
    },
    "errors": [
      {
        "code": "MFA_FACTORS_FAILED",
        "message": "Unable to import factors"
      }
    ]
  }
]
```

## Automatic Migration

MFA enrollments can also be imported during an [automatic migration](/connections/database/custom-db/overview-custom-db-connections#automatic-migration-scenario). This can be accomplished by providing any existing enrollments in the `mfa_factors` field of the user that is provided to the callback at the end of your custom DB [login script](/connections/database/custom-db/templates/login).

Any failures will appear in your tenant logs as failed logins, and will be distinguishable from other failures by their description: `Unable to import MFA factors`. For instance:

```json
{
  "_id": "5e9df3b29ebabe00571c04a7",
  "date": "2020-04-20T19:10:42.916Z",
  "type": "fu",
  "description": "Unable to import MFA factors.",
  "connection": "Username-Password-Authentication",
  "connection_id": "con_mMkvaycgzgCS0p0z",
  "client_id": "aCbTAJNi5HbsjPJtRpSP6BIoLPOrSj2Cgg",
  "client_name": "All Applications",
  "ip": "10.12.13.1",
  "client_ip": null,
  "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
  "details": {
    "error": {
      "message": "Unable to import MFA factors."
    }
  },
  "user_name": "test@test.io",
  "strategy": "auth0",
  "strategy_type": "database"
}
```

## Recovery Codes

Auth0 does not provide a way to import Recovery Codes. When the users's MFA factors are imported, they won't have a recovery code.

If you want to provide users for a recovery code, you can check if they have one enrolled, and if not, use the [recovery code regeneration](/api/management/v2#!/Users/post_recovery_code_regeneration) API endpoint to generate a new one.
