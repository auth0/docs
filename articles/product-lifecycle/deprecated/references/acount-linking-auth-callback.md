---
description: Describes the deprecation of the ability to perform account linking for authorization callback.
contentType: reference
useCase:
  - migrate
---
# Deprecation Notice: Account Linking for Authorization Callback

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2017-01-03 |  2017-03-01 |

As part of Auth0's efforts to improve security and standards compliance, we will stop supporting account linking as part of the authorization callback (that is, accepting an <dfn data-key="access-token">Access Token</dfn> as part of the [authorize](/api/authentication#authorization-code-grant) call as stated [in the account linking section](/api/authentication?http#account-linking).

## Are you affected?

If you received an email notification about it, then you are impacted by this change. 

## Next steps

As you work to update your applications to [use the Management API to link accounts](/api/management/v2#!/Users/post_identities), you can check if you are still impacted, by checking your tenant logs for warnings indicating Account linking via /authorize is being deprecated. 

Refer to https://auth0.com/docs/link-accounts for supported ways to link an account. These entries will be logged if you are sending an Access Token in your [authorize](/api/authentication#authorization-code-grant) calls.

## Migration

If you need help with the migration, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT})
