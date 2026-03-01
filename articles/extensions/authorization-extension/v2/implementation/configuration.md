---
title: Configuring the Authorization Extension
description: How to configure the Authorization Extension
toc: true
topics:
  - extensions
  - authorization_v2
contentType:
  - how-to
  - concept
useCase: extensibility-extensions
---

# Authorization Extension: Configuration

::: note
<%= include('../../../../_includes/_rbac_methods') %>
:::

Before the extension can enforce your authorization logic, you'll need to configure how it will behave during the login transaction. Your configuration settings will be captured in a [rule](/rules) that's executed during runtime.

## Configure the Extension

Open up the Authorization Extension, and click **Configuration** on the drop-down menu in the top right of the **Authorization Dashboard**.

![Click Configuration](/media/articles/extensions/authorization/click-configuration.png)

This brings you to the **Rule Configuration** section of the **Configuration** page.

![Configuration page](/media/articles/extensions/authorization/configuration.png)

All of the changes you make in the sections under **Token Contents**, such as those related to groups, <dfn data-key="role">roles</dfn>, and permissions, will be reflected in the rule you export at the completion of this step. 

### ApiKey

The rule is using ApiKey to communicate with the Authorization Extension API and can be used only to get the policy. ApiKey is stored as a rule config and it will be created automatically when the rule is published. You can rotate the ApiKey by pressing the "Rotate" button. It will update the rule config automatically.

![ApiKey config](/media/articles/extensions/authorization/apikey-config.png)

## Add Authorization Information to the Token Issued

You can store authorization data like groups, roles, or permissions in the outgoing token issued by Auth0. Your application can then consume this information by inspecting the token and take appropriate actions based on the user's current authorization context.

To add groups, roles, and/or permissions information to the outgoing token, simply enable the slider next to the option you want included.

![Set token contents](/media/articles/extensions/authorization/user-info.png)

::: panel-warning Data Limitations
Storing too much data in the token may cause performance issues or even prevent the issuance of the token. Be sure to store only what you need. If you need a large amount of user data readily available, consider using [persistence](#store-authorization-information-in-the-users-profiles) instead of adding the data to the token.
:::

### Merge Authorization Data from the IdP

You might have users that receive groups, roles, or permissions from the identity provider (IdP) you're using, such as Active Directory. If you want to merge these items (to preserve them) with the ones defined in the Authorization Extension, make sure you enable the appropriate **Passthrough** options. Simply enable the slider next to the appropriate merges you want enabled.

![Enable passthroughs](/media/articles/extensions/authorization/passthrough.png)

### Store Authorization Information in the Users' Profiles

If your authorization context is large (for example, the user might belong to many groups or have been granted many permissions), you might find it useful to store some of the authorization content in the users' profiles. This allows you to store less information in the token, which means you're less likely to see performance-related issues or even problems with token issuance. **Persistence** is the process by which you store groups, roles, and permissions information in the users' profiles.

The data will be stored in the user's `app_metadata` field, and you can then use the [Management API](/api/management/v2) or the [Dashboard](${manage_url}/#/users) to retrieve this information after the user has logged in.

![Enable persistence](/media/articles/extensions/authorization/persistence.png)

## Save Changes to Your Rule

Once you've configured your rule, click **Publish Rule**. This creates a rule for your tenant that executes after each user login.

### View Your Rule

If you'd like to see the rule you've created, you can do so using the [Dashboard](${manage_url}/#/rules).

![](/media/articles/extensions/authorization/auth-ext-rule-list.png)

You can open it up to see the exact rules configuration.

![](/media/articles/extensions/authorization/edit-rule.png)

## Keep Reading

::: next-steps
* [Import and Exporting Data](/extensions/authorization-extension/v2/import-export-data)
* [Enable API Access to the Extension](/extensions/authorization-extension/v2/api-access)
* [Use the Authorization Extension's Data in Rules](/extensions/authorization-extension/v2/rules)
* [Troubleshoot Errors](/extensions/authorization-extension/v2/troubleshooting)
* [Set Up the Authorization Extension](/extensions/authorization-extension/v2/implementation/setup)
:::
