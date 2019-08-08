Determining how users get signed up is important to address early, and the decisions you make here will influence many of the decisions you will need to make going forward. We’ve found there are a typical set of patterns for how users will get added to your system, and things to take note of when considering workflow design too.

::: panel Best Practice
Whilst Auth0 supports numerous workflows, web based workflows using Auth0 [Universal Login](/hosted-pages/login) for sign up are considered both industry and Auth0 best practice as they provide for optimal functionality and the best security.
:::

Auth0 supports user sign up via a number of different [identity providers](/identityproviders). During sign up, Auth0 provisions the [user profile](/users/concepts/overview-user-profile) so that it contains the user’s account information. There are a number of things to consider when looking at functionality and workflow:

<% if (platform==="b2b") { %>
* Does a user get added to your company's domain or do they belong to or remain in their organization's domain?
* If the user stays in their own domain, do they belong to a single organization or can they belong to multiple organizations?
* How do you provision the organization itself in your system?
<% } %>
* Should you use Auth0 as an identity store?
* Can you use your own (legacy) identity store with Auth0?
* How do you migrate user identities from your identity store to Auth0?
<% if (platform==="b2c") { %>
* Can your users sign up using their existing social accounts such as Google and Facebook?
<% } %>
<% if (platform==="b2b") { %>
* Can your users sign up using their organization's identity provider?
* Can your users be invited or self register?

One of the first determinations to make when providing your service(s) to other businesses is identifying to which domain users belong. Based on the answer to that question, there are a couple of different approaches you can take to provision those users. See [Provisioning organization users](#provisioning-organization-users) for more information.  Once you know how you want organizations to be represented in your system, you will want too consider how you are going to provision the organization itself.  See [Provisioning organizations](#provisioning-organizations) for more information.
<% } %>

Auth0 provides out-of-the-box identity storage that can be leveraged to store user credentials safely and securely. See [Self Sign Up](#self-sign-up) for more information. If you already have a legacy identity store and you want to offload the management of it, then the [User Migration](#user-migration) capabilities provide you with a number of options to do so.

Alternatively, if you have to maintain your legacy identity store - perhaps because you’ve got applications which you aren’t ready to migrate or which can’t be migrated - then you can use the [identity store proxy](#identity-store-proxy) capability. Allowing your customers to use “bring their own identity” is also an attractive proposition and though we find our customers don’t initially do so, you can use the [Social Sign Up](#social-sign-up) capability to provide it. 

::: panel Get Started with Auth0 Videos
Watch these two short videos [Provision: Users Stores](/videos/get-started/02-provision-user-stores) and [Provision: Import Users](/videos/get-started/03-provision-import-users) to learn how user profiles are provisioned within an Auth0 tenant and how Auth0 allows you to move your existing users to an Auth0 user store.
:::
