---
title: Bulk User Import Database Schema and Example 
description: How to perform bulk user imports with the Management API.
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
# Bulk User Import Database Schema and Example

::: note
For a list of user profile fields that can be imported, see [User Profile Attributes](/users/references/user-profile-structure#user-profile-attributes).
:::

The users file must have an array with the users' information in JSON format.

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

## User `app_metadata` schema

Additionally, the `app_metadata` should **not** contain any of these properties:

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

::: note
The `app_metadata` stores information that can impact how an application functions or what the user can access (for example, a user's support plan or <dfn data-key="role">roles</dfn> and access groups). For more information, refer to [User Metadata](/metadata).
:::

## `custom_password_hash` schema

In addition to the constraints described by the above schema, please consider the following when providing a `custom_password_hash`.

### `md*` or `sha*` family of algorithms

- `hash.encoding` must be either `hex` or `base64`.

### `hmac`

- `hash.encoding` must be either `hex` or `base64`.
- `hash.digest` is mandatory and must be one of these:
  - `md4`
  - `md5`
  - `ripemd160`
  - `sha1`
  - `sha224`
  - `sha256`
  - `sha384`
  - `sha512`
  - `whirlpool`
- `hash.key.value` is mandatory.
- `hash.key.encoding` must be either `base64` or `hex` or `utf8`.

### `bcrypt|argon2|pbkdf2|ldap`

- `hash.encoding` must be `utf8`.
- `salt` is not allowed.
- When `algorithm` is `bcrypt` the hash must be prefixed with either `$2a$` or `$2b$`. Other prefixes such as `$2$`, `$sha1$`, `$2x$`, etc. are not supported at this time. For instance, `$2b$10$nFguVi9LsCAcvTZFKQlRKeLVydo8ETv483lkNsSFI/Wl1Rz1Ypo1K` was generated from the string `hello` using with a cost parameter of 10.
- When `algorithm` is `ldap`, `hash.value` must adhere to the format outlined in [`RFC-2307 section-5.3`](https://tools.ietf.org/html/rfc2307#section-5.3). The scheme should be one of `md5|smd5|sha*|ssha*` — see [here](https://www.openldap.org/faq/data/cache/347.html) for more info.
  - Note that the [`crypt`](https://www.openldap.org/faq/data/cache/344.html) scheme is **not supported** due to system/implementation dependent behavior. See also [Open LDAP Admin Guide - 14.4.2. CRYPT password storage scheme](https://www.openldap.org/doc/admin24/guide.html#CRYPT%20password%20storage%20scheme).
- When the `algorithm` is either `argon2` or `pbkdf2`, `hash.value` field should be in [PHC string format](https://github.com/P-H-C/phc-string-format/blob/master/phc-sf-spec.md). Note that for these algorithms, `hash.value` must include the base64 encoded salt (as specified in the `PHC` documentation).
  - For `argon2`, the hash value should conform to the requirements described [here](https://github.com/auth0/magic#magicpasswordhash--magicverifypassword).
  - For `pbkdf2`, the hash value should include `i` (iterations) and `l` (keylen) parameters. If these parameters are omitted, they will default to `i=100000` and `l=64`. The `id` should be in a `pbkdf2-<digest>` format (e.g `pbkdf2-sha512`, `pbkdf2-md5`, etc). The supported digests are:
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

### Supported hash algorithms

As described above, the supported hash algorithms are:
* [`argon2`](https://github.com/p-h-c/phc-winner-argon2)
* [`bcrypt`](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/)
* [`ldap`](https://tools.ietf.org/html/rfc2307#section-5.3) (`RFC-2307 "userPassword"`)
* [`hmac`](https://tools.ietf.org/html/rfc2104)
* [`md4`](https://tools.ietf.org/html/rfc1320)
* [`md5`](https://tools.ietf.org/html/rfc1321)
* [`sha1`](https://tools.ietf.org/html/rfc3174)
* [`sha256` and `sha512`](https://tools.ietf.org/html/rfc4634)
* [`pbkdf2`](https://tools.ietf.org/html/rfc2898#section-5.2)

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
