Determining how users get signed up is important to address early, and the decisions you make here will influence many of the decisions you will need to make going forward. We’ve found there are a typical set of patterns for how users will get added to your system, and things to take note of when considering workflow design too.

::: panel Best Practice
Whilst Auth0 supports numerous workflows, web based workflows using Auth0 [Universal Login](/hosted-pages/login) for sign up are considered both industry and Auth0 best practice as they provide for optimal functionality and the best security.
:::

Auth0 supports user sign up via a number of different [identity providers](/identityproviders). During sign up, Auth0 will also provision the [profile](/users/concepts/overview-user-profile) for the user (a.k.a. the user’s Account), and there are a number of things to consider when looking at functionality and workflow:

<% if (platform==="b2b") { %>
* Does a user get added to my company's domain or do they belong to or remain in their organization's domain?
* If the user stays in their own domain, do they belong to a single organization or can they belong to multiple organizations?
* How do I provision the organization itself in my system?
<% } %>
* Can I use Auth0 as an identity store?
* Can I use my own (legacy) identity store with Auth0?
* Can I migrate user identities from my identity store to Auth0?
<% if (platform==="b2c") { %>
* Can my users sign up using their existing social - e.g. Facebook or Google - accounts?
<% } %>
<% if (platform==="b2b") { %>
* Can your users sign up using their organization's identity provider?
* Can your users be invited or self register?

One of the first decisions to make when providing your service(s) to other businesses is identifying to which domain users belong. Based on the answer to that question, there are a couple of different approaches you can take to provision those users. See [Provisioning organization users](#provisioning-organization-users) for more information.  Once you know how you want organizations to be represented in your system, you will want too consider how you are going to provision the organization itself.  See [Provisioning organizations](#provisioning-organizations) for more info on that.
<% } %>

Auth0 provides out-of-the-box identity storage that can be leveraged to store user credentials safely and securely (see Auth0 [Self Sign Up](#self-sign-up) for further discussion). If you already have a legacy identity store, and you want to offload the management of it, then Auth0’s [User Migration](#user-migration) capabilities provide you with a number of options to do so.

Alternatively, if you have to stick with your legacy identity store - perhaps because you’ve got applications which you aren’t ready to migrate or which can’t be migrated - then Auth0’s [identity store proxy](#identity-store-proxy) capability is exactly what you need. Allowing your customers to use “bring your own identity” is also an attractive proposition. Though we find our customers don’t typically do so from the get-go, Auth0’s [Social Sign Up](#social-sign-up) capability is exactly what you’ll need when you’re ready to provide it. 
