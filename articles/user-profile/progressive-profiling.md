---
description: This page details how Auth0 can help you implement progressive profiling in your website or application.
tags:
    - users
    - user-management
    - user-profiles
    - progressive-profiling
---
# Progressive Profiling

Rather than asking your users to fill out extensive registration forms, you can implement **progressive profiling**, a technique to collect user information as users interact with your system, on your website or application.

For example, you might collect just the user's name, email, and password on initial signup. At a later point in time, you might ask for the name of their company and their title.

::: note
Golden Rule: Never ask what you already know. If a user signs-up using a social network, you might already have demographic information on that user.
:::

## Progressive Profiling and Auth0

One of the places you can get information for your progressive profile is Auth0. Every user that authenticates through Auth0 gets a User Profile, and the profile's contents can come from three different sources:

* Properties supplied by the identity provider properties (such as any user property coming from LinkedIn, Facebook, or any [connection](/identityproviders)).
* Attributes that are dynamically created in [Auth0 Rules](/rules) or by calling APIs such as [FullContact](https://www.fullcontact.com/) and [Clearbit](https://clearbit.com/)
* Application-specific attributes that developers can collect in their apps and save. In Auth0, this information is called **user metadata**.

![Progressive Profiling](/media/articles/user-profile/progressive-profiling.png)

The first two sources are generally not directly relevant to **progressive profiling** (though they do supply information you won't need to ask the user for).

::: note
Users logging in with social networks will typically **consent** to disclose their information.
:::

Using the Auth0 [Users API](/api/v2#!/Users/patch_users_by_id), you can augment the profile of any authenticated user with any information. Auth0 metadata objects can contain any serializable data structure.

The choice of what to collect, when to collect it, and how to collect it, are up to you. Each application will implement progressive profiling differently. Your application might already do so, in fact.

::: note
Auth0 provides two [metadata](/metadata) attributes: **user metadata** and **app metadata**. You can update the contents of your metadata fields with the [Management APIv2](/api/management/v2).
:::

The use of progressive profiling within your application makes it very easy to control what information gets collected and when. As this happens, you can enrich the user profile with the data you've collected:

![Progressive profiling example](/media/articles/user-profile/progressive-profiling-example.png)

In the example above, the application collects **last name** and **first name** on signup. It then collects the user's **title** and **company** at a later point. Finally, in the context of an article that might interest the user, the app adds information to the **subscribed** property.
