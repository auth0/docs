---
description: Understand how progressive profiling can gather more information about your users over time as they engage with your website or application thereby enhancing their experience by not asking them too many questions up front.
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

Progressive profiling is the act of collecting more information about your users over time as they engage with your website or application. This way, you can gather just the right amount of information at just the right time and enhance your users' experience by not asking them too many questions at signup. For example, you might collect just the user's name, email, and password on initial signup. At the next login, you might ask for the name of their company and their title or their birth date. When asking users for additional information, avoid asking for information that you may already have. For example, if a user signs up using a social network you may already have some of the information you need. 

Progressive profiling provides the following benefits:

* Shorter registration forms
* Higher conversion rates
* Collecting more relevant information about your users
* Enhancing the user experience by avoiding repetitious questions

::: note
Users logging in with social networks will typically **consent** to disclose their information.
:::

## How progressive profiling works with Auth0

Every time a user authenticates through Auth0, Auth0 updates their user profile and with data that can come from different sources:

* Properties supplied by the identity provider (such as LinkedIn, Facebook, or any [connection](/identityproviders)).
* Attributes that are dynamically created in [Auth0 Rules](/rules) .
* Attributes obtained by calling APIs such as [FullContact](https://www.fullcontact.com/) and [Clearbit](https://clearbit.com/).
* Application-specific attributes that developers can collect in their apps and save. In Auth0, this information is called **user metadata**.

![Progressive Profiling](/media/articles/user-profile/progressive-profiling.png)

The first source is generally not directly related to **progressive profiling** however it can supply some user information. 

You can use redirect Rules to collect more information than was given at initial signup like the user's birthday. For an example of how to create rules to implement progressive profiling, see [Progressive Profiling example](/rules/guides/redirect#progressive-profiling-example).

You can use the Auth0 [Users API](/api/v2#!/Users/patch_users_by_id) to augment the profile of any authenticated user with any information. Auth0 metadata objects can contain any serializable data structure. Auth0 provides two [metadata](/users/concepts/overview-user-metadata) attributes: **user metadata** and **app metadata**. You can update the contents of your metadata fields with the [Management APIv2](/api/management/v2). It is up to you what information to collect, when to collect it, and how to collect it. Each application implements progressive profiling differently. Your application may already do so, in fact. 

The use of progressive profiling within your application makes it very easy to control what information gets collected and when. As this happens, you can enrich the user profile with the data you've collected:

![Progressive profiling example](/media/articles/user-profile/progressive-profiling-example.png)

In the example above, the application collects **last name** and **first name** on signup. It then collects the user's **title** and **company** at a later point. Finally, in the context of an article that might interest the user, the app adds information to the **subscribed** property. 

## Keep reading

* [Redirect Users After Login Authentication](/users/guides/redirect-users-after-login)
* [Redirect Users From Within Rules](/rules/guides/redirect)
* [Redirect Rule Best Practices](/best-practices/rules#redirection)
* [Blog: How Profile Enrichment and Progressive Profiling Can Boost Your Marketing](https://auth0.com/blog/how-profile-enrichment-and-progressive-profiling-can-boost-your-marketing/)
