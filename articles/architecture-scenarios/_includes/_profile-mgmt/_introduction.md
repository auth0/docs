At some point, you’ll need to manage change to the information stored in a user’s [Profile](/users/concepts/overview-user-profile). A user’s profile--also known as the user’s Account--is stored in Auth0, and changes to the information it contains can be required for a number of different reasons: self-served information update, mandatory updates concerning your organizations T's & C’s, and changes due to regulatory compliance are just some of the things you’ll need to consider.

::: warning
A user profile cannot be directly accessed across multiple Auth0 tenants, so if you’re deploying multiple Auth0 tenants to production then this is something you need to be aware of.
:::

A user’s profile is populated from data supplied by an [Identity Provider](/identityproviders) during the login process, and this is referred to as the [Normalized User Profile](/users/normalized/auth0). By default, there is one user profile created for each user identity, and there are a number of things to consider when looking at the management of it:

::: note
The Normalized User Profile is updated from the identity provider during login, and a limited set of the information it contains can be changed through the Auth0 Management API. Auth0 extensibility, such as Rules, can be used as an alternative to override information in the Normalized User Profile as described in the [Auth0 guidance](/users/concepts/overview-user-profile#user-profile-data-modification) provided.
:::

* What should I do if I need to store information to help customize a user’s experience?
* What if I need to store user information that didn’t originate from an identity provider?
* Why would I need to store user-related information that a user cannot modify?
* What do I do if I need to store user-related information that a user cannot modify?
* What happens if a user forgets their password?
* What should a user do if they want to change their password?
<% if (platform === "b2b") { %>
* How do I provide an administrator from a third-party organization with the ability to manage their users?
<%  } %>

Auth0 provides for the storage of [Metadata](#metadata) against a user’s profile, which allows for the capture of additional information, such as preference for language and/or accessibility in order to enhance the user experience. Metadata can be used to store both information that a user can change, and also information they can’t; the latter giving you the capability of associating, for example, a user profile with records in your existing systems without modifying existing implementation. 

For users who forget their passwords or who are allowed to change their password via some existing self-service mechanism (or self-service mechanism you have planned), Auth0-provided [Password Reset](#password-reset) functionality can be leveraged. This can be integrated with your (existing) implementation and comes already incorporated with any out-of-box Auth0 UI widgets included as part of [Universal Login](/universal-login).  

You’ll also want to make sure that you are working with a [verified user account](#account-verification) at all times, and Auth0 provides out-of-box mechanisms for doing that too. There is also regulatory compliance to be considered ([GDPR](https://eugdpr.org/), for example, has some very specific requirements when it comes to protecting all EU citizens from privacy and data breaches) and [guidance concerning this](/compliance) is also provided.  

Though Auth0 doesn’t currently provide any form of centralized profile management portal out-of-the-box, for the purpose of self-serviced profile management, the Auth0 Management API can be leveraged to build your own (or utilize an already built) UI, and Auth0 [community guidance](https://community.auth0.com/t/how-to-allow-the-end-user-to-update-their-own-profile-information/6228) describes in further detail the Management API endpoint for doing this. N.B. calls to the Management API will require use of an [Access Token](/api/management/v2/tokens).

::: warning
Self-service profile management can raise security as well as data privacy concerns. For example, you may want to allow a user to change their email address; however, doing so without following best practice security guidance could result in a user locking themselves out of their account, leaking Personally Identifiable Information (PII), or worse, opening up a potential breach in security.
:::

Alternatively, the Auth0 Dashboard can be used to [manage aspects of a user’s profile](users/guides/manage-users-using-the-dashboard). Managing a user’s profile via the Auth0 Dashboard is more of an administrative provision and **should not** be used for self-serviced profile management in a production environment. However, the interface provided by the Dashboard can be extremely useful during development as it provides a quick and simple way of manipulating a user’s profile information.

<% if (platform === "b2b") { %>
* If you need to provide a way for your customers to have an administrator that can manage their own users when they are storing those credentials in your system, you can either build something yourself or use an Auth0 Extension. See [Admin Portal](#admin-portal) for more details. 
<%  } %>
