---
title: Bulk User Import Database Schema and Examples
description: How to perform bulk user imports with the Management API.
toc: true
topics:
  - users
  - user-management
  - migrations
  - bulk-imports
contentType:
  - reference
useCase:
  - manage-users
  - migrate
---
# Bulk User Import Database Schema and Examples

The users file must have an array with the users' information in JSON format.

## User JSON schema

The following [JSON schema](http://json-schema.org) describes valid users:

```json
{
    "type": "object",
    "properties": {
        "email": {
            "type": "string",
            "description": "The user's email address.",
            "format": "email"
        },
        "email_verified": {
            "type": "boolean",
            "default": false,
            "description": "Indicates whether the user has verified their email address."
        },
        "user_id": {
            "type": "string",
            "description": "The user's unique identifier. This will be prepended by the connection strategy."
        },
        "username": {
            "type": "string",
            "description": "The user's username."
        },
        "given_name": {
            "type": "string",
            "description": "The user's given name."
        },
        "family_name": {
            "type": "string",
            "description": "The user's family name."
        },
        "name": {
            "type": "string",
            "description": "The user's full name."
        },
        "nickname": {
            "type": "string",
            "description": "The user's nickname."
        },
        "picture": {
          "type": "string",
          "description": "URL pointing to the user's profile picture."
        },
        "blocked": {
            "type": "boolean",
            "description": "Indicates whether the user has been blocked."
        },
        "password_hash": {
            "type": "string",
            "description":"Hashed password for the user. Passwords should be hashed using bcrypt $2a$ or $2b$ and have 10 saltRounds."
        },
        "custom_password_hash": {
            "type": "object",
            "description": "A more generic way to provide the users password hash. This can be used in lieu of the password_hash field when the users password hash was created with an alternate algorithm. Note that this field and password_hash are mutually exclusive.",
            "properties": {
                "algorithm": {
                    "type": "string",
                    "enum": ["argon2", "bcrypt", "hmac", "ldap", "md4", "md5", "sha1", "sha256", "sha512", "pbkdf2"],
                    "description": "The algorithm that was used to hash the password."
                },
                "hash": {
                    "type": "object",
                    "properties": {
                        "value": {
                            "type": "string",
                            "description": "The password hash."
                        },
                        "encoding": {
                            "type": "string",
                            "enum": ["base64", "hex", "utf8"],
                            "description": "The encoding of the provided hash. Note that both upper and lower case hex variants are supported, as well as url-encoded base64."
                        },
                        "digest": {
                            "type": "string",
                            "description": "The algorithm that was used to generate the HMAC hash",
                            "enum": ["md4", "md5", "ripemd160", "sha1", "sha224", "sha256", "sha384", "sha512", "whirlpool"]
                        },
                        "key": {
                            "type": "object",
                            "description": "The key that was used to generate the HMAC hash",
                            "required": ["value"],
                            "properties": {
                                "value": {
                                    "type": "string",
                                    "description": "The key value"
                                },
                                "encoding": {
                                    "type": "string",
                                    "enum": ["base64", "hex", "utf8"],
                                    "default": "utf8",
                                    "description": "The key encoding"
                                }
                            }
                        }
                    }
                },
                "salt": {
                    "type": "object",
                    "properties": {
                        "value": {
                            "type": "string",
                            "description": "The salt value used to generate the hash."
                        },
                        "encoding": {
                            "type": "string",
                            "enum": ["base64", "hex", "utf8"],
                            "default": "utf8",
                            "description": "The encoding of the provided salt. Note that both upper and lower case hex variants are supported, as well as url-encoded base64."
                        },
                        "position": {
                            "type": "string",
                            "enum": ["prefix", "suffix"],
                            "description": "The position of the salt when the hash was calculated. For example; MD5('salt' + 'password') = '67A1E09BB1F83F5007DC119C14D663AA' would have \"position\":\"prefix\"."
                        }
                    },
                    "required": ["value", "hash"]
                },
                "password": {
                    "type": "object",
                    "properties": {
                        "encoding": {
                            "type": "string",
                            "enum": ["ascii", "utf8", "utf16le", "ucs2", "latin1", "binary"],
                            "default": "utf8",
                            "description": "The encoding of the password used to generate the hash. On login, the user-provided password will be transcoded from utf8 before being checked against the provided hash. For example; if your hash was generated from a ucs2 encoded string, then you would supply \"encoding\":\"ucs2\"."
                        }
                    }
                }
            },
            "required": ["algorithm", "hash"],
            "additionalProperties": false
        },
        "app_metadata": {
            "type": "object",
            "description": "Data related to the user that does affect the application's core functionality."
        },
        "user_metadata": {
            "type": "object",
            "description": "Data related to the user that does not affect the application's core functionality."
        }
    },
    "required": ["email"],
    "additionalProperties": false
}
```

## Properties

You can import users with the following properties:

| Property | Type | Description | Upsert During Import? |
|----------|------|-------------|-----------------------|
| `app_metadata` | object | Data that can affect the application's core functionality or what the user can access. Data stored in `app_metadata` cannot be edited by users. This may include things such as support plans, roles or access groups. | Yes |
| `blocked` | boolean | Indicates whether the user has been blocked. | No |
| `email` | string | The user's email address. | No |
| `email_verified` | boolean | Indicates whether the user has verified their email address. | Yes |
| `family_name` | string | The user's family name. | Yes |
| `given_name` | string | The user's given name. | Yes |
| `name` | string | The user's full name. | Yes |
| `nickname` | string | The user's nickname. | Yes |
| `picture` | string | URL pointing to the user's profile picture. | Yes |
| `user_id` | string | The user's unique identifier. This will be prepended by the connection strategy. | No |
| `user_metadata` | object | Data that does not impact what users can or cannot access, such as work address, home address, or user preferences. | Yes |
| `username` | string | The user's username. | No |
| `password_hash` | string | Hashed password for the user's connection. When users are created, Auth0 uses [bcrypt](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/) to secure the password. Importing hashed passwords lets users keep their passwords for a smoother experience. Compatible passwords should be hashed using bcrypt $2a$ or $2b$ and have 10 saltRounds. This property can only be provided when the user is first imported and cannot be updated later. | No |
| `custom_password_hash` | object | A more generic way to provide the user's password hash. This can be used instead of the `password_hash` field when the user's password hash was created with an alternate algorithm. This property can only be provided when the user is first imported and cannot be updated later. | Yes |
| `password_set_date` | datetime | Timestamp indicating when the password for the user's connection was set. At user creation, this field exists, and `last_password_reset` does not. If the user has reset their password, this field and `last_password_reset` are identical. | No |

For more information on `app_metadata` and `user_metadata`, check out the [Metadata Overview](/users/concepts/overview-user-metadata).

## App metadata

The `user.app_metadata` object must **not** contain any of these properties:

* `__tenant`
* `_id`
* `blocked`
* `clientID`
* `created_at`
* `email_verified`
* `email`
* `globalClientID`
* `global_client_id`
* `identities`
* `lastIP`
* `lastLogin`
* `loginsCount`
* `metadata`
* `multifactor_last_modified`
* `multifactor`
* `updated_at`
* `user_id`

## Custom password hash

The `user.custom_password_hash` object can be used instead of the `user.password_hash` property when the user's password hash was created with an alternate algorithm. Note this field and `password_hash` are mutually exclusive.

The `user.custom_password_hash` object has the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `algorithm` | string | The algorithm used to hash the password. Must be one of: <ul><li>`argon2`</li><li>`bcrypt`</li><li>`hmac`</li><li>`ldap`</li><li>`md4`</li><li>`md5`</li><li>`sha1`</li><li>`sha256`</li><li>`sha512`</li><li>`pbkdf2`</li></ul> |
| `hash` | object | &nbsp; |
| `hash.value` | string | The password hash. |
| `hash.encoding` | string | The encoding of the provided hash. Must be one of: <ul><li>`base64`</li><li>`hex`</li><li>`utf8`</li></ul>Upper and lower case hex variants are supported, as well as url-encoded base64. |
| `hash.digest` | string | The algorithm used to generate the HMAC hash. Must be one of: <ul><li>`md4`</li><li>`md5`</li><li>`ripemd160`</li><li>`sha1`</li><li>`sha224`</li><li>`sha256`</li><li>`sha384`</li><li>`sha512`</li><li>`whirlpool`</li></ul> |
| `hash.key` | object | The key used to generate the HMAC hash. |
| `hash.key.value` | string | The key value. |
| `hash.key.encoding` | string | The key encoding. Must be one of: <ul><li>`base64`</li><li>`hex`</li><li>`utf8`</li></ul>By default, `hash.key.encoding` is `utf8`. |
| `hash.salt` | object | &nbsp; |
| `hash.salt.value` | string | The salt value used to generate the hash. |
| `hash.salt.encoding` | string | The encoding of the provided salt.Must be one of: <ul><li>`base64`</li><li>`hex`</li><li>`utf8`</li></ul> Upper and lower case hex variants are supported, as well as url-encoded base64. By default, `hash.salt.encoding` is `utf8`. |
| `hash.salt.position` | string | The position of the salt when the hash was calculated. |
| `password.encoding` | string | <%= include('../_includes/_password-encoding-description.md') %> |

### Supported hash algorithms

Auth0 currently supports imports of user passwords hashed by:

* [Argon2](https://github.com/p-h-c/phc-winner-argon2)
* [bcrypt](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/)
* [LDAP](https://tools.ietf.org/html/rfc2307#section-5.3) (`RFC-2307 "userPassword"`)
* [HMAC](https://tools.ietf.org/html/rfc2104)
* [MD4](https://tools.ietf.org/html/rfc1320)
* [MD5](https://tools.ietf.org/html/rfc1321)
* [SHA1](https://tools.ietf.org/html/rfc3174)
* [SHA256 and SHA512](https://tools.ietf.org/html/rfc4634)
* [PBKDF2](https://tools.ietf.org/html/rfc2898#section-5.2)

Please consider the following sections when providing a `custom_password_hash`.

#### Argon2

When the `algorithm` is set to `argon2`:

- `hash.encoding` must be `utf8`.
- `hash.salt` is not allowed.
- `hash.value` should be in [PHC string format](https://github.com/P-H-C/phc-string-format/blob/master/phc-sf-spec.md) and conform to [these requirements](https://github.com/auth0/magic#magicpasswordhash--magicverifypassword).
- `hash.value` must include the base64 encoded salt (as specified in the `PHC` documentation).

#### bcrypt

When the `algorithm` is set to `bcrypt`:

- `hash.encoding` must be `utf8`.
- `hash.salt` is not allowed.
- `hash.value` must be prefixed with either `$2a$` or `$2b$`. Other prefixes such as `$2$`, `$sha1$`, `$2x$`, etc. are not supported at this time. For instance, `$2b$10$nFguVi9LsCAcvTZFKQlRKeLVydo8ETv483lkNsSFI/Wl1Rz1Ypo1K` was generated from the string `hello` using with a cost parameter of 10.

#### HMAC

When the `algorithm` is set to `hmac`:

- `hash.encoding` must be either `hex` or `base64`.
- `hash.digest` is required and must be one of these:
  - `md4`
  - `md5`
  - `ripemd160`
  - `sha1`
  - `sha224`
  - `sha256`
  - `sha384`
  - `sha512`
  - `whirlpool`
- `hash.key.value` is required.
- `hash.key.encoding` must be either `base64` or `hex` or `utf8`.

#### LDAP

When the `algorithm` is set to `ldap`:

- `hash.encoding` must be `utf8`.
- `salt` is not allowed.
- `hash.value` must adhere to the format outlined in [RFC-2307 section-5.3](https://tools.ietf.org/html/rfc2307#section-5.3).
- The scheme should be one of `md5|smd5|sha*|ssha*` see [here](https://www.openldap.org/faq/data/cache/347.html) for more info.
- Note that the [crypt](https://www.openldap.org/faq/data/cache/344.html) scheme is **not supported** due to system/implementation dependent behavior. For more information, check out [Open LDAP Admin Guide - 14.4.2. CRYPT password storage scheme](https://www.openldap.org/doc/admin24/guide.html#CRYPT%20password%20storage%20scheme).

#### MD* or SHA*

When the `algorithm` is set to `md4`, `md5`, `sha1`, `sha256`, or `sha512`:

- `hash.encoding` must be either `hex` or `base64`.

#### PBKDF2

When the `algorithm` is set to `pbkdf2`:

- `hash.encoding` must be `utf8`.
- `hash.salt` is not allowed.
- `hash.value` should be in [PHC string format](https://github.com/P-H-C/phc-string-format/blob/master/phc-sf-spec.md).
- `hash.value` must include the B64 encoded salt (base64 omitting padding characters `=`, as specified in the `PHC` documentation).
- `hash.value` should include `i` (iterations) and `l` (keylen) parameters. If these parameters are omitted, they will default to `i=100000` and `l=64`.
- The `id` should be in a `pbkdf2-<digest>` format (`pbkdf2-sha512`, `pbkdf2-md5`, etc). The supported digests are:
    - `RSA-MD4`
    - `RSA-MD5`
    - `RSA-MDC2`
    - `RSA-RIPEMD160`
    - `RSA-SHA1`
    - `RSA-SHA1-2`
    - `RSA-SHA224`
    - `RSA-SHA256`
    - `RSA-SHA384`
    - `RSA-SHA512`
    - `md4`
    - `md4WithRSAEncryption`
    - `md5`
    - `md5WithRSAEncryption`
    - `mdc2`
    - `mdc2WithRSA`
    - `ripemd`
    - `ripemd160`
    - `ripemd160WithRSA`
    - `rmd160`
    - `sha1`
    - `sha1WithRSAEncryption`
    - `sha224`
    - `sha224WithRSAEncryption`
    - `sha256`
    - `sha256WithRSAEncryption`
    - `sha384`
    - `sha384WithRSAEncryption`
    - `sha512`
    - `sha512WithRSAEncryption`
    - `ssl3-md5`
    - `ssl3-sha1`
    - `whirlpool`

## Examples

### Basic

A file with the following contents is valid:

```json
[
  {
    "email": "john.doe@contoso.com",
    "email_verified": false,
    "app_metadata": {
        "roles": ["admin"],
        "plan": "premium"
    },
    "user_metadata": {
        "theme": "light"
    }
  }
]
```

### Custom Password Hash

Some example users with hashes provided:

```json
[
    {
        "email": "antoinette@contoso.com",
        "email_verified": false,
        "custom_password_hash": {
            "algorithm": "md4",
            "hash": {
                "value": "AbuUujgF0pPPkJPSFRTpmA==",
                "encoding": "base64"
            }
        }
    },
    {
        "email": "mary@contoso.com",
        "email_verified": false,
        "custom_password_hash": {
            "algorithm": "sha256",
            "hash": {
                "value": "d24e794fce503c3ddb1cd1ba1dd5d9b250cf9917336a0316fefd87fecf79200f",
                "encoding": "hex"
            },
            "salt": {
                "value": "abc123",
                "position": "prefix"
            }
        }
    },
    {
        "email": "velma@contoso.com",
        "email_verified": false,
        "custom_password_hash": {
            "algorithm": "bcrypt",
            "hash": {
                "value": "$2b$10$C9hB01.YxRSTcn/ZOOo4j.TW7xCKKFKBSF.C7E0xiUwumqIDqWUXG"
            }
        }
    },
    {
        "email": "edward@contoso.com",
        "email_verified": false,
        "custom_password_hash": {
            "algorithm": "argon2",
            "hash": {
                "value": "$argon2id$v=19$m=65536,t=2,p=1$J6Q/82PCyaNpYKRELJyTZg$m04qUAB8rexWDR4+/0f+SFB+4XMFxt7YAvAq2UycYos"
            }
        }
    },
    {
        "email": "terrell@contoso.com",
        "email_verified": false,
        "custom_password_hash": {
            "algorithm": "pbkdf2",
            "hash": {
                "value": "$pbkdf2-md4$i=100000,l=64$+N375B8q0Fw$fp2R9KAM4hK/votGHC5Fu+jhqbxUD8+Nic/EMSGvNC3UP/k7wSHI0uXluHRSkZfl/BOheYqNOemayG90ZaSSQw",
                "encoding": "utf8"
            }
        }
    },
    {
        "email": "cecil@contoso.com",
        "email_verified": false,
        "custom_password_hash": {
            "algorithm": "pbkdf2",
            "hash": {
                "value": "$pbkdf2-sha512$i=100000,l=64$KNyFsA2rWoE$I2CQGI9H0JxdDf3kERRI97kPCGxh0KWBIV3MxyaS191gDGfzVBGyS4BibhgqWQ0/ails8mHuU9ckASxHOOq58w"
            }
        }
    },
    {
        "email": "sean@contoso.com",
        "email_verified": false,
        "custom_password_hash": {
            "algorithm": "ldap",
            "hash": {
                "value": "{SSHA384}/cgEjdoZh85DhurDeOQEMO1rMlAur93SVPbYe5XSD4lF7nNuvrBju5hUeg9A6agRemgSXGl5YuE=",
                "encoding": "utf8"
            }
        }
    },
    {
        "email": "peter@contoso.com",
        "email_verified": false,
        "custom_password_hash": {
            "algorithm": "hmac",
            "hash": {
                "value": "cg7f42jH39/2EaAU4wNd4s2lKIk=",
                "encoding": "base64",
                "digest": "sha1",
                "key": {
                    "value": "736868",
                    "encoding": "hex"
                }
            }
        }
    }
]
```

::: note
The file size limit for a bulk import is 500KB. You will need to start multiple imports if your data exceeds this size.
:::

## Keep reading

* [User Migration Overview](/users/concepts/overview-user-migration)
* [Configure Automatic Migration](/users/guides/configure-automatic-migration)
* [Bulk User Imports](/users/guides/bulk-user-imports)
* [User Import/Export Extension](/extensions/user-import-export)
* [User Migration Scenarios](/users/references/user-migration-scenarios)
* [Migrating Stormpath Users to Auth0 Demo](https://github.com/auth0-blog/migrate-stormpath-users-to-auth0)
