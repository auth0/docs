---
  description: Factors to consider when configuring your SAML integration
---

# SAML Design Considerations

When you are implementing and configuring your SAML integration with Auth0, there are several things you should consider to ensure that your setup is optimal.

## SAML Provisioning

When designing a SAML SSO implementation, consider:

* Which sources or systems you want to serve as authoritative sources for user profile information;
* What user profile attributes each application will need;
* How you will distribute the user profile information to the systems that need it.

### Auth0 as the SAML Service Provider

If Auth0 acts as the service provider in a SAML federation, you don't need any additional processes to create Auth0 user accounts in advance of user authentication.

Auth0 can route authentication requests to an identity provider without a needing pre-created accounts. Auth0 will then capture user profile information from the identity providers' assertions and use those details to create an Auth0 user (this process is sometimes called just-in-time provisioning).

There are [several methods you can choose from to implement just-in-time provisioning](/hrd) and route a request to an identity provider. For example, one popular option is to specify email domains as part of the identity provider configuration so that all users with that email domain get routed to the the identity provider.

#### Work with Applications Requiring Existing User Accounts

While Auth0 does not require pre-created user accounts, you might integrate Auth0 with an application that does require that the accounts exist. If this is the case, you have several options:

* When the identity provider creates the user, an out-of-band process can then create the user in the application or in Auth0 and add user profile attributes based on the SAML assertion. After the user authentications, the application can obtain any necessary, but missing, attributes from the appropriate source and store the values in the Auth0 user profile. When the user next logs in, Auth0 sends these extra attributes to the application in addition to those of the identity provider.
* You can use a [rule](/rules) to call an API to retrieve missing information and add it dynamically to the Auth0 user profile. Rules execute after each successful authentication, and you can choose to save the information retrieved to the user profile or to retrieve it everytime the user logs in. Because Auth0 shares user profiles with the application, the application has access to the profile's attributes.
* Auth0 can pass the user profile information from the identity provider to the application, and the application can retrieve any necessary, but mission information, from another source to populate a profile that's local to the application.

When you're selecting an option, consider carefully which source you'll consider as the authoritative source for user profile attributes. For example, the identity provider might be able to supply basic user profile attributes such as name or email address, but administrative functions and who has rights to them might come from elsewhere. You'll need to know which is the ultimate source of truth if there's ever a conflict.

### Auth0 as the SAML Identity Provider

If Auth0 is the identity provider in a SAML federation, you can create user accounts in any number of ways:

* Using a back-end authentication system used by Auth0, such as an LDAP directory, database, or another SAML identity provider;
* Using the [Auth0 dashboard](${manage_url}/#/users);
* Making calls to the [Auth0 API](/api/management/v2#!/Users/post_users);
* Implementing user signup so that users create their own accounts.

Once you've created user accounts in Auth0 (or any authentication system it uses in a Connection), you might need to create an account/user profile for users

If your application retrieves profile information from a local storage area, you might need to create accounts/user profiles for users with Auth0 as an identity provider, even if you've already created accounts in Auth0 (or any authentication system used by the Connection). Some methods for doing this include:

* Using an out-of-band process that creates use profiles from application information;
* Using an Auth0 [rule] that executes when the user logs in for the first time to call the application's API and create a profile;
* Modifying the application to create user profiles dynamically based on information in the SAML assertion.
