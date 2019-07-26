---
description: Describes how to implement progressive profiling in your website or application.
topics:
    - users
    - user-management
    - user-profiles
    - progressive-profiling
contentType: concept
useCase: manage-users
v2: true
---
# Progressive Profiling

Rather than asking your users to fill out extensive registration forms, you can implement **progressive profiling**, a technique to collect user information as users interact with your system, on your website or application. For example, you might collect just the user's name, email, and password on initial signup. At a later point in time, you might ask for the name of their company and their title. When asking users for additional information, avoid asking for information you already have. For example, if a user signs up using a social network you may already have demographic information.

::: note
Users logging in with social networks will typically **consent** to disclose their information.
:::

You can get information for your progressive profile from Auth0. Every user that authenticates through Auth0 gets a User Profile and the profile's contents can come from different sources:

* Properties supplied by the identity provider (such as properties coming from LinkedIn, Facebook, or any [connection](/identityproviders)).
* Attributes that are dynamically created in [Auth0 Rules](/rules) .
* Attributes obtained by calling APIs such as [FullContact](https://www.fullcontact.com/) and [Clearbit](https://clearbit.com/).
* Application-specific attributes that developers can collect in their apps and save. In Auth0, this information is called **user metadata**.

![Progressive Profiling](/media/articles/user-profile/progressive-profiling.png)

The first two sources are generally not directly relevant to **progressive profiling** however they do supply some user information. You can use redirect Rules to collect additional information such as: 

* Core information that was missing during the actual sign-up (like first and last name)
* Additional first-party data that you'd like to collect progressively (like the user's birthday)

Using the Auth0 [Users API](/api/v2#!/Users/patch_users_by_id), you can augment the profile of any authenticated user with any information. Auth0 metadata objects can contain any serializable data structure. 

Auth0 provides two [metadata](/users/concepts/overview-user-metadata) attributes: **user metadata** and **app metadata**. You can update the contents of your metadata fields with the [Management APIv2](/api/management/v2). It is up to you what information to collect, when to collect it, and how to collect it. Each application implements progressive profiling differently. Your application may already do so, in fact. 

The use of progressive profiling within your application makes it very easy to control what information gets collected and when. As this happens, you can enrich the user profile with the data you've collected:

![Progressive profiling example](/media/articles/user-profile/progressive-profiling-example.png)

In the example above, the application collects **last name** and **first name** on signup. It then collects the user's **title** and **company** at a later point. Finally, in the context of an article that might interest the user, the app adds information to the **subscribed** property.

## Keep reading

* [How Rules Handle the Data](https://github.com/auth0/rules/blob/master/redirect-rules/progressive-profiling/continue-from-update-profile-website.js)
* [Progressive Profiling Example](/rules/guides/redirect#progressive-profiling-example)
* [Resume Authentication](/rules/guides/redirect#resume-authentication)