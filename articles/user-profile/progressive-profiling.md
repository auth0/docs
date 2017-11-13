---
description: This page details how to implement progressive profiling with Auth0.
---
# Progressive Profiling

Rather than asking your users to fill out extensive registration forms, you can use **progressive profiling**, a technique to collect user information as users interact with your system.

For example, you might collect just the user's name, email, and password on initial signup. At a later point in time, you might ask for the name of their company and their title.

::: note
Golden Rule: Never ask what you already know. If a user signs-up using a social network, you might already have demographic information on that user.
:::

## Implementing Progressive Profiling with Auth0

You can very easily implement **progressive profiling** with Auth0. Every user that authenticates through Auth0 gets a User Profile, and profile's contents can come from three different sources:

* Properties supplied by the identity provider properties (e.g. any user property coming from LinkedIn, Facebook, or any [connection](/identityproviders)).
* Attributes that are dynamically created in [Auth0 Rules](/rules), by calling APIs such as [FullContact](https://www.fullcontact.com/) or [Clearbit](https://clearbit.com/), for example.
* Application-specific attributes that developers can collect in their apps and save. Auth0 calls this `metadata` for users.

![Progressive Profiling](/media/articles/user-profile/progressive-profiling.png)

The first two sources are generally not directly relevant to **progressive profiling** (though they do supply information you won't need to ask the user for).

::: note
Users logging in with social networks will typically **consent** to disclose their information.
:::

Using the Auth0 [Users API](/api/v2#!/Users/patch_users_by_id), you can augment the profile of any authenticated user with any information. Auth0 metadata objects can contain any serializable data structure. The choice of what to collect, when to collect it, and how to collect it, are up to you. Each application will implement progressive profiling differently. Your application might already do so, in fact, as the practice isn't at all unique to Auth0. However, the Auth0 metadata does provide a nice vehicle via which to store and interact with that profile data.

::: note
Auth0 provides two [metadata](/metadata) attributes: `user_metadata` and `app_metadata`. You may update the contents of metadata with the [Management APIv2](/api/management/v2).
:::

The use of progressive profiling within your application makes it very easy to control what information gets collected and when, and to slowly enrich the user profile with all that data, as illustrated below:

![](/media/articles/user-profile/progressive-profiling-example.png)

In the example above, the application collects `last_name` and `first_name` on signup. It then collects, at a later interaction, the user's `title` and `company`. Finally, in the context of an article that might interest the user, a `subscribed` property is added.
