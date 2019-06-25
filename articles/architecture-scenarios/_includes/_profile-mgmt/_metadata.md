In addition to the Normalized User Profile information, [Metadata](/users/concepts/overview-user-metadata) can be stored in an Auth0 user profile. Metadata provides a way to store information that did not originate from an identity provider, or can be used as a way to store information that overrides what an identity provider supplied. 

::: panel Best Practice
Use of Metadata should follow Auth0 [best practice guidance](/best-practices/user-data-storage-best-practices#metadata). Metadata storage is not designed to be a general purpose data store, and you should still use your own external storage facility when possible. Metadata size and complexity should also be kept to a minimum, and the Auth0 Management API has a strict set of guidance when it comes to updating and/or deleting metadata associated with a user.
:::

Metadata can be manipulated via both the Auth0 Management API and the Auth0 Authentication API. See [Manage User Metadata](/users/guides/manage-user-metadata) for more information. As is the case when managing the Normalized User Profile, calls to the Management API for manipulating Metadata will require use of an [Access Token](api/management/v2/tokens).

::: warning
<%= include('../../_includes/_rate-limit-policy.md') %>
:::

### User metadata

User metadata (also referred to as `user_metadata`) is information that can be stored against a user profile and that a user can read and update as part of any self-service profile management. Metadata of this nature may be something like salutation for a user, or a user’s preferred language (which could be used to [customize the emails](/email/templates#common-variables) sent by Auth0).

::: panel Best Practice
Any information that will be used to customize Auth0 emails, such as information used to determine the language for an email, should be stored in metadata and preferably `user_metadata` if the user is allowed to change it.   
:::

### App metadata

App metadata (also referred to as `app_metadata`) is, on the other hand, information that can be stored with a user profile but can **only be read or updated with appropriate authorization**; `app_metadata` is not directly accessible to a user. This type of metadata might be something like a flag to indicate that the last set of valid terms and conditions was accepted by the user, and a date to indicate when the user accepted them.
