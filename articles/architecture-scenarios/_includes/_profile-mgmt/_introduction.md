At some point, you may need to change the information stored in a user’s [profile](/users/concepts/overview-user-profile). A user’s profile (also known as the user’s account) is stored in Auth0, and changes to the information it contains may need to happen for a number of different reasons:

* Self-served information updates
* Mandatory updates concerning your organizations T's & C’s
* Changes due to regulatory compliance

::: warning
You cannot directly access a user profile across multiple Auth0 tenants. If you’re deploying multiple Auth0 tenants to production then this is something you need to be aware of.
:::

An [Identity Provider](/identityproviders) populates a user’s profile using data supplied during the login process, and this is referred to as the [Normalized User Profile](/users/normalized/auth0).

::: note
The Normalized User Profile is updated from the identity provider during login, and you can change the limited set of the information it contains through the Auth0 Management API. You can also use Auth0 extensibility, such as [Rules](/rules), as an alternative to override information in the Normalized User Profile. See [User Profile Data Modification](/users/concepts/overview-user-profile#user-profile-data-modification) for more information.
:::

By default, there is one user profile created for each user identity, and there are a number of things to consider:

* What should you do if you need to store information to help customize a user’s experience?
* What if you need to store user information that didn’t originate from an identity provider?
* Why would you need to store user-related information that a user cannot modify?
* What do you do if you need to store user-related information that a user cannot modify?
* What happens if a user forgets their password?
* What should a user do if they want to change their password?
<% if (platform === "b2b") { %>
* How do you provide an administrator from a third-party organization with the ability to manage their users?
<%  } %>

Auth0 provides for the storage of [Metadata](#metadata) against a user’s profile, which allows for the capture of additional information, such as preference for language and/or accessibility in order to enhance the user experience. Metadata can be used to store both information that a user can change, and also information they can’t; the latter giving you the capability of associating, for example, a user profile with records in your existing systems without modifying existing implementation.

For users who forget their passwords or who are allowed to change their password via some existing self-service mechanism (or self-service mechanism you have planned), you can leverage Auth0-provided [Password Reset](#password-reset) functionality. This can be integrated with your existing implementation and comes already incorporated with any out-of-box Auth0 UI widgets including [Universal Login](/universal-login).

You’ll also want to make sure that you are working with a [verified user account](#account-verification) at all times. Auth0 provides out-of-box mechanisms for doing that too. You should also consider [regulatory compliance](/compliance) such as ([GDPR](https://eugdpr.org/) which has very specific requirements when it comes to protecting EU citizens from privacy and data breaches.

Though Auth0 doesn’t currently provide a centralized profile management portal out-of-the-box, for the purpose of self-serviced profile management, you can use the Auth0 Management API to build your own or utilize an already built UI. See our Auth0 [community guidance](https://community.auth0.com/t/how-to-allow-the-end-user-to-update-their-own-profile-information/6228)which describes the Management API endpoint. All calls to the Management API will require use of an <dfn data-key="Access Token">[Access Token](/tokens/concepts/access-tokens)</dfn>.

::: warning
Self-service profile management can raise security as well as data privacy concerns. For example, you may want to allow a user to change their email address, however, doing so without following best practice security guidance could result in a user locking themselves out of their account, leaking Personally Identifiable Information (PII), or worse, opening up a potential breach in security.
:::

Alternatively, you can use the Auth0 Dashboard to [manage aspects of a user’s profile](users/guides/manage-users-using-the-dashboard). Managing a user’s profile via the Auth0 Dashboard is more of an administrative provision and **should not** be used for self-serviced profile management in a production environment. However, the interface provided by the Dashboard can be extremely useful during development as it provides a quick and simple way of manipulating a user’s profile information.

<% if (platform === "b2b") { %>
If you need to provide a way for your customers to have an administrator manage their own users when they are storing those credentials in your system, you can either build something yourself or use an Auth0 Extension. See [Admin Portal](#admin-portal) for more information.
<%  } %>

::: panel Get Started with Auth0 Video
Watch this video [User Profiles](/videos/get-started/06-user-profiles) to learn what Auth0 User Profiles are used for and what they contain. Understand how Auth0 normalizes user profile data from various identity providers and uses metadata and root attributes. You can manage user profiles with the Auth0 Dashboard.
:::
