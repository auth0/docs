---
title: Suggested Account Linking - Server-Side Implementation
description: Describes how to link user accounts with a regular web app using server-side code using a sample scenario.
crews: crew-2
topics:
  - account-linking
  - server-side
contentType:
  - reference
useCase:
  - manage-accounts
---

# Suggested Account Linking - Server-Side Implementation

Auth0 supports the linking of user accounts from various identity providers. You can use server-side code to link accounts on a regular web application, engaging the user and asking them for permission before proceeding. Your code will authenticate users and search for and identify users using their email addresses. Your application will then prompt the user to link their accounts by authenticating with the target account's credentials, and later link the accounts.

You can find the full source of this sample application [on GitHub](https://github.com/auth0-samples/auth0-link-accounts-sample/tree/master/RegularWebApp).

1. Log the user in to your application.

    The user authenticates to your application using [Universal Login](/universal-login). For details, see the [Regular Web App Quickstarts](/quickstart/webapp), asking for a token for the Auth0 Management API audience (audience=`https://${account.namespace}/api/v2/`).

2. Search for users with identical email addresses.

    In the `/user` route implementation, we'll get the user profile and the list of users with the same verified email/

```js
router.get("/", async (req, res) => {
  const { sub, email_verified } = req.openid.user;
  //fetch user profile containing the user_metadata and app_metadata properties
  try {
    let getUsersWithSameVerifiedEmail = [];
    const getUserProfile = auth0Client.getUser(sub);
    if (email_verified)
      // account linking is only offered verified email
      getUsersWithSameVerifiedEmail = auth0Client.getUsersWithSameVerifiedEmail(
        req.openid.user
      );

    const [user, suggestedUsers] = await Promise.all([
      getUserProfile,
      getUsersWithSameVerifiedEmail,
    ]);

    const flashError = clear(req);
    res.render("user", {
      user,
      suggestedUsers,
      wrongAccountError: flashError && flashError === Errors.WrongAccount,
    });
  } catch (err) {
    debug("GET /user[s] failed: %o", err);
    res.render("error", err);
  }
});
```

  To get a list of all of the user records with the same email address, your application calls the Auth0 Management API's [Get Users By Email endpoint](/api/v2#!/users-by-email/) using a [Management API Access Token](/api/management/v2/tokens) with the `read:users` scope.

  ```js
  const request = require('request');
  class Auth0Client {
    ...
    async getUsersWithSameVerifiedEmail({ sub, email }) {
      return await this.request({
        url: `${process.env.ISSUER_BASE_URL}/api/v2/users`,
        qs: {
          search_engine: "v3",
          q: `email:"<%= "${email}" %>" AND email_verified:true -user_id:"<%= "${sub}" %>"`,
      } ,
    });
  }
  ```

3. Prompt the user to link accounts. 

    If Auth0 returns one or more records with matching email addresses, the user will see the list along with the following message prompting them to link the accounts.

    If the user wants to link a given account, they can click **Link** next to the appropriate account.

![WebApp User Settings Example](/media/articles/link-accounts/account-linking-webapp-small.png)

4. When the user clicks **Link**, your application will ask the user to authenticate with the target account, and then perform account linking. 

    ::: warning
    To retain and merge the `user_metadata` from the secondary account, you must retrieve and merge it into the metadata for the primary account before calling the API endpoint. After the accounts are linked, the metadata for the secondary account is discarded. 
    
    When calling account linking, you can select which identity will be used as the primary account and which as the secondary. This choice will depend on which set of attributes you want to retain in the primary profile.
    :::

    The following code snippet shows how to verify and merge metadata:

  ```js
  async function accountLink(req, res, next) {
    const {
      linking: { targetUserId },
    } = req.appSession;
    const { sub: authenticatedTargetUserId } = req.openidTokens.claims();
    if (authenticatedTargetUserId !== targetUserId) {
      debug(
        "Skipping account linking as the authenticated user(%s)  is different than target linking user (%s)",
        authenticatedTargetUserId,
        targetUserId
      );
      set(req, Errors.WrongAccount);
      return next();
    }

    debug(
      "User %s succesfully authenticated. Account linking with %s... ",
      authenticatedTargetUserId,
      targetUserId
    );
    const { id_token: targetIdToken } = req.openidTokens;
    const { sub: primaryUserId } = req.appSession.claims;

    try {
      await mergeMetadata(primaryUserId, authenticatedTargetUserId);
      await auth0Client.linkAccounts(primaryUserId, targetIdToken);
      debug("Accounts linked.");
    } catch (err) {
      debug("Linking failed %o", err);
    } finally {
      next();
    }
  }
  ```

5. Your application calls the Auth0 Management API's [Link a User Account endpoint](/api/v2#!/Users/post_identities) using a [Management API Access Token](/api/management/v2/tokens) with the `update:users` scope.

```js
async function accountLink(req, res, next) {
  const {
    linking: { targetUserId },
  } = req.appSession;
  const { sub: authenticatedTargetUserId } = req.openidTokens.claims();
  if (authenticatedTargetUserId !== targetUserId) {
    set(req, Errors.WrongAccount);
    return next();
  }

  const { id_token: targetIdToken } = req.openidTokens;
  const { sub: primaryUserId } = req.appSession.claims;

  try {
    await mergeMetadata(primaryUserId, authenticatedTargetUserId);
    await auth0Client.linkAccounts(primaryUserId, targetIdToken);
  } catch (err) {
    debug("Linking failed %o", err);
  } finally {
    next();
  }
}
```

## Metadata merge example

The following example shows explicitly how the `user_metadata` and `app_metadata` from the secondary account gets merged into the primary account using the [Node.js Auth0 SDK for API V2](https://github.com/auth0/node-auth0/tree/v2).

```js
/*
 * Recursively merges user_metadata and app_metadata from secondary into primary user.
 * Data of primary user takes preponderance.
 * Array fields are joined.
 */
async function mergeMetadata(primaryUserId, secondaryUserId) {
  // load both users with metedata.
  const [primaryUser, secondaryUser] = await Promise.all(
    [primaryUserId, secondaryUserId].map((uid) => auth0Client.getUser(uid))
  );

  const customizerCallback = function (objectValue, sourceValue) {
    if (_.isArray(objectValue)) {
      return sourceValue.concat(objectValue);
    }
  };
  const mergedUserMetadata = _.merge(
    {},
    secondaryUser.user_metadata,
    primaryUser.user_metadata,
    customizerCallback
  );
  const mergedAppMetadata = _.merge(
    {},
    secondaryUser.app_metadata,
    primaryUser.app_metadata,
    customizerCallback
  );
  await auth0Client.updateUser(primaryUserId, {
    user_metadata: mergedUserMetadata,
    app_metadata: mergedAppMetadata,
  });
}
```

<%= include('../_includes/_account-linking-id-tokens.md') %>

## Keep reading

* [User Account Linking Overview](/users/concepts/overview-user-account-linking)
* [Link User Accounts](/users/guides/link-user-accounts)
* [Unlink User Accounts](/users/guides/unlink-user-accounts)
* [User Initiated Account Linking - Client-Side Implementation](/users/references/link-accounts-client-side-scenario)
