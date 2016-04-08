# Progressive Profiling

It is tempting to have extensive registration forms for users, asking for all kinds of information: names and addresses, phone number, where they work, how big is that company, etc. 

The problem is that you either turn away users by asking too much upfront or at best you end up with a lot of low quality information. 

__Progressive profiling__ is a technique to collect user information as users interact with your system. For example: 

* On `signup`, you just collect `email` (the username), the `password` (if you are using custom credentials), and `name` of the user (e.g. last name and first name).
* When users return to your app later on, you ask for `Company` and `Title`.
* Later on, you request `phone`.

> One golden rule of course is never ask what you already know. So, if a user signs-up using a social network, it is likely that a lot of demographic is already there (and with high quality: people keep their Facebook or LinkedIN profiles up to date).

## Implementing Progressive Profiling with Auth0

You can very easily implement __Progressive Profiling__ with Auth0. Every user that authenticates through Auth0 gets a `Profile` record. Contents of the user profile come from 3 different sources:

* Properties supplied by the identity provider properties (e.g. any user property coming from LinkedIN, Facebook, or any [connection](/identityproviders)).
* Attributes that are dynamically created in [Auth0 Rules](/rules). For example calling APIs like [FullContact](https://www.fullcontact.com/), or [Clearbit](https://clearbit.com/). 
* Application specific attributes that developers can collect on their apps. Auth0 calls this `metadata` for users.

![](/media/articles/user-profile/progressive-profiling.png)

The first 2 sources are straightforward, and generally not directly relevant to __Progressive Profiling__ (except that they supply information you won't need to ask the user for).

> Users logging in with social networks will typically _consent_ to disclose their information. The fact that you request Facebook users to provide their `birthday` doesn't automatically guarantee you will get it. They have to approve to disclosing it.

Using the Auth0 [Users API](https://auth0.com/docs/api/v2#!/Users/patch_users_by_id), you can augment the profile of any user (authenticated in any way) with any information. Auth0 metadata objects can contain any serializable data structure.

> Auth0 provides two "buckets" for metadata: `user_metadata` and `app_metadata`. The user token (obtained after authentication), is sufficient to modify the contents of `user_metadata`. You need a server side, APIv2 token to change the contents of `app_metadata`. With these different permissions scopes, you can protect metadata content from being changed by the user (making it appropriate for sensitive info, like roles).

This feature makes it very easy to control what information gets collected and when, and then through the [Users API](https://auth0.com/docs/api/v2#!/Users/patch_users_by_id), enrich the user profile with all that data:

![](/media/articles/user-profile/progressive-profiling-example.png)

In the example above, we collect `last_name` and `first_name` on signup, then on a later interaction `title` and `company`, finally in the context of an article that might interest the user, a `subscribed` property.



