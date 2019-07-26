Understanding your application is key to understanding how Auth0 can be leveraged to meet your needs. From experience, our most successful customers start with a visualization of their proposed - or in many cases existing - architecture and use this as a basis for reference as they progress. Understanding where your application fits within your organization is also important; Auth0 [Accounts and Tenants](/getting-started/the-basics#account-and-tenants) form the basis for the grouping and structuring of Auth0 assets, and it may be that you’ll need to leverage an existing Auth0 deployment in order to integrate with <dfn data-key="single-sign-on">[Single Sign-on (SSO)](/sso/current/introduction)</dfn>, centralized user [Profile Management](/architecture-scenarios/implementation/${platform}/${platform}-profile-mgmt), consolidated billing, or the like.

::: panel Best Practice
If you do have multiple applications, and you need to leverage SSO, then we recommend you check out our [How to Implement Single Sign-On](https://auth0.com/learn/how-to-implement-single-sign-on/) training guidance before continuing.
:::

The value of investing time on the landscape of the architecture up-front is something that we have found pays dividends in the long run, and there are a number of things you will want to consider when looking at functionality and workflow:

* What should the URL look like when Auth0 needs to present a web page to a user?
* How can Auth0 be structured to support your SDLC (Software Development Lifecycle)?
* How can you ensure that your Auth0 tenants are appropriately associated with your contract?
* What do you need to consider if there are other projects in your organization integrating with Auth0? Particularly projects that target their own, or a different domain of users (for example, applications that only employees will use)? 
<% if (platform === "b2b") { %>
* How can you align the structure and domain of your customers’ organization with your Auth0 deployment?
<%  } %>

Organizations often service more than one domain of user - customers, employees, and affiliates being the most frequently encountered, with typically little to no cross-over: employees, say, don’t use the same applications as customers and vice-versa. In some cases there can also be a need to partition further within a domain - separate groups of customers, say, who use different and unconnected products. Auth0 provides a way to segregate your users and the associated collateral, and [tenant provision](#tenant-provision) covers this in more detail. If you need to provision an independent tenant then you’ll also want to [associate this with your existing Auth0 account](#tenant-association), so that you can take full advantage of the benefits provided at your organization’s contracted subscription level.

::: panel Best Practice
It’s not uncommon for companies to have identity requirements that address multiple user communities: customers, partners, employees, etc. So be sure to consider other projects or future requirements when designing your architecture.
:::

In addition, you’ll undoubtedly have an established set of processes and procedures as part of your Software Development Lifecycle (SDLC). So you’ll want to check out our [SDLC support](#sdlc-support) guidance regarding Auth0 Tenant provision in support of that too. 

For customer-facing applications, we typically see <dfn data-key="openid">[OpenID Connect (OIDC)](/protocols/oidc)</dfn> as being the most frequently used protocol. OIDC makes use of web based workflows with browser URLs that are presented to the user. Out-of-the-box, client facing URLs as part of Auth0 OIDC support are Auth0 branded, however we recommend using the Auth0 [custom domain](#custom-domains) capability to provide for consistent corporate identity and to also address potential user confidence concerns before they arise. 

::: panel Best Practice
Other groups within your organization may also be working with Auth0; it’s not uncommon for our customers to have disparate departments that serve different user communities. Identifying these will potentially influence your design choices, and doing so early could mitigate decisions that might prove costly later on.
:::

<% if (platform === "b2b") { %>
If your customers' organizations support the use of mutliple IdPs, then we recommend that you can create separate Auth0 tenants for that organization; see [Tenant provision for complex organizations](#tenant-provision-for-complex-organizations) for further details. This allows you to keep the rest of your setup much simpler by maintaining a one-to-one connection relationship between your organization and all your customer organizations within your main tenant. 
<%  } %>

::: panel Get Started with Auth0 Video
Watch this short video [Architecture: Your Tenant](/videos/get-started/01-architecture-your-tenant) to learn what an Auth0 tenant is and how to configure it in the Auth0 Dashboard. Understand why you may want more than one tenant if you have different user communities, and also how you can use more than one tenant to support your Software Development Life Cycle (SDLC). Understand the importance of tenant naming and custom domain usage best practices. Also learn how to set up additional tenant administrators and how to associate tenants with your Auth0 account.
:::