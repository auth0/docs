---
description: Describes the deprecation of the ability to perform account linking with ID Tokens and provides migration options.
contentType: reference
useCase:
  - migrate
---
# Account Linking with ID Tokens Deprecation

| Severity| EOL Date |
| --- | --- |
| Medium | 2018-10-19 |

We have identified a weakness in a particular account linking flow that could allow it to be misused in specific circumstances. We have found no evidence that this has been used maliciously but have decided to deprecate the flow to prevent that ever happening.

Therefore, Auth0 requires customers using the affected account linking flow to migrate to a more secure implementation before October 19th, 2018. Migration paths are provided in this guide, which should not result in any lost functionality.

On October 19th, 2018 or anytime after, the affected account linking flow will be disabled and customers using it will experience run-time errors.

## Are you affected?

You are impacted if you call the [/api/v2/users/{USER_ID}/identities](/api/management/v2#!/Users/post_identities) endpoint using a token (ID or <dfn data-key="access-token">Access Token</dfn>) with the <dfn data-key="scope">scope</dfn> `update:current_user_identities` in the Authorization header and include the secondary account's `user_id` in the payload.

No other use cases are impacted.

## Next steps

You should review all your calls to the account linking endpoint ([/api/v2/users/{USER_ID}/identities](/api/management/v2#!/Users/post_identities)) and update those that make use of the vulnerable flow described above. You can update your calls to either of the following:

1. **Client-side / user-initiated linking scenarios**: For client-side linking scenarios, make the call to the [/api/v2/users/{USER_ID}/identities](/api/management/v2#!/Users/post_identities) using an Access Token with the `update:current_user_identities` scope, and provide the ID Token of the secondary account in the payload (`link_with`). This ID Token must be obtained through an OAuth/OIDC-conformant flow. See the [guide on client-side account linking](/link-accounts/user-initiated-linking) for more details.
2. **Server-side linking scenarios**: For server-side linking scenarios, make the call to the [/api/v2/users/{USER_ID}/identities](/api/management/v2#!/Users/post_identities) endpoint using an Access Token with the `update:users` scope and provide the `user_id` of the secondary account in the payload. See the [guide on server-side account linking](/link-accounts/suggested-linking) for more details.

## Migration

This migration is specifically targeted to mitigate a security vulnerability. At this point, you are not required to take further action beyond that described in this guide. However, it is strongly recommended that you update your code as soon as possible. Auth0 will notify customers in advance, with a prudent time frame to migrate, before that migration is enforced.

See the security considerations in the [Account Linking Migration Guide](/product-lifecycle/migration/account-linking) for details. 

<%= include('./_contact-support') %>
