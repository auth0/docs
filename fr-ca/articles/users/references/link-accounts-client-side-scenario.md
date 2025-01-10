---
title: User Initiated Account Linking - Client-Side Implementation
description: Learn how to provide a client-side UI that allows users to authenticate to their other accounts and link these to their primary account using a SPA.
crews: crew-2
topics:
  - account-linking
  - client-side
contentType:
  - reference
useCase:
  - manage-accounts
---

# User Initiated Account Linking - Client-Side Implementation

Auth0 supports the linking of user accounts from various identity providers. One way to implement this functionality is to enable the user to explicitly link accounts. In this scenario, the user authenticates through the UI of your Single Page Application (SPA) and can later use a link or button to link another account to the first one. When the user clicks on this link/button, your application makes a call so that when the user logs in with the second provider, the second account is linked with the first.

When you initiate account linking, you can select which identity to use as the primary account and which to use as the secondary. This choice depends on which set of attributes you want to retain in the primary profile, as you will only retain the attributes from the primary account.

You can find the full source of this sample application [on GitHub](https://github.com/auth0-samples/auth0-link-accounts-sample/tree/master/SPA).

1. Log the user in to your application. 

    The user authenticates to your SPA using using [Universal Login](/universal-login), requesting an [Access Token for the Management API](/api/management/v2/get-access-tokens-for-spas).

    In the typical SPA login, the callback is handled client-side by the same page, and a JWT is received after successful authentication. For details, see the [Single-Page App Quickstarts](/quickstart/spa).

2. The user initiates account linking. Your SPA must provide a UI for the user to initiate a link to their other accounts. For example, your SPA could contain a user's settings page:

    ![SPA User Settings Example](/media/articles/link-accounts/account-linking-spa.png)

    When the user clicks on the **Link Account** button, your app redirects the user to the Universal Login page, when they log in with the connection they want to link to. After successful authentication, use the obtained token to link the accounts.

    You could also add a button for each connection (e.g. 'Link Facebook Account', 'Link Google Account') and redirect the user to `/authorize` with the `connection` parameter set (e.g. `/authorize?connection=facebook`).

3. Link accounts by calling the Auth0 Management API's [Link a User Account endpoint](/api/v2#!/Users/post_identities).

    ::: warning
    To retain and merge the `user_metadata` from the secondary account, you must retrieve and merge it into the metadata for the primary account before calling the API endpoint. After the accounts are linked, the metadata for the secondary account is discarded. 
    
    When you initiate account linking, you can select which identity will be used as the primary account and which as the secondary. This choice will depend on which set of attributes you want to retain in the primary profile.
    :::

    In the `linkAccount` function, call the Management API. Authenticate with the API using the primary JWT, which is the Access Token, and link using the primary user's ID and the secondary JWT, which is the secondary user's ID Token.

```
  const linkAccount = async () => {
  const accessToken = await auth0.getTokenSilently();
  const { sub } = await auth0.getUser();
  const {
    __raw: targetUserIdToken,
    email_verified,
    email,
  } = await authenticateUser();

  if (!email_verified) {
    throw new Error(
      `Account linking is only allowed to a verified account. Please verify your email <%= "${email}" %>.`
    );
  }

  await fetch(`https://${account.namespace}/api/v2/users/<%= "${sub}" %>/identities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer <%= "${accessToken}" %>`,
    },
    body: JSON.stringify({
      link_with: targetUserIdToken,
    }),
  });
};
```

<%= include('../_includes/_account-linking-id-tokens.md') %>

## Keep reading

* [User Account Linking Overview](/users/concepts/overview-user-account-linking)
* [Link User Accounts](/users/guides/link-user-accounts)
* [Unlink User Accounts](/users/guides/unlink-user-accounts)
* [Suggested Account Linking - Server-Side Implementation](/users/references/link-accounts-server-side-scenario)
