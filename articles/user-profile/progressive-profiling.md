# Progressive Profiling

Rather than asking your users to fill out extensive registration forms, you can use **progressive profiling**, a technique to collect user information as users interact with your system.

For example, you might collect just the user's name, email, and password on initial signup. At a later point in time, you might ask for the name of their company and their title.

> Golden Rule: Never ask what you already know. If a user signs-up using a social network, you might already have demographic information on that user.

## Implementing Progressive Profiling with Auth0

You can very easily implement **progressive profiling** with Auth0. Every user that authenticates through Auth0 gets User Profile, and its contents can come from three different sources:

* Properties supplied by the identity provider properties (e.g. any user property coming from LinkedIn, Facebook, or any [connection](/identityproviders));
* Attributes that are dynamically created in [Auth0 Rules](/rules), e.g. calling APIs like [FullContact](https://www.fullcontact.com/) or [Clearbit](https://clearbit.com/);
* Application-specific attributes that developers can collect on their apps. Auth0 calls this `metadata` for users.

![](/media/articles/user-profile/progressive-profiling.png)

The first two sources are generally not directly relevant to **progressive profiling** (though they do supply information you won't need to ask the user for).

> Users logging in with social networks will typically _consent_ to disclose their information.

Using the Auth0 [Users API](/api/v2#!/Users/patch_users_by_id), you can augment the profile of any authenticated user with any information. Auth0 metadata objects can contain any serializable data structure.

> Auth0 provides two metadata attributes: `user_metadata` and `app_metadata`. You may update the contents of `user_metadata` with the user token obtained after authentication, but you will need a server-side APIv1 token to modify the contents of `app_metadata`.

This feature makes it very easy to control what information gets collected and when, and then through the [Users API](/api/v2#!/Users/patch_users_by_id), enriches the user profile with all that data:

![](/media/articles/user-profile/progressive-profiling-example.png)

In the example above, we collect `last_name` and `first_name` on signup. We then collect, on a later interaction, the user's `title` and `company`. Finally, in the context of an article that might interest the user, we add a `subscribed` property.
