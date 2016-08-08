---
title: "JetPrivilege: SSO Makes For A Seamless Travel Experience"
type: case-study
sitemap: false
description: JetPrivilege, the award-winning loyalty program for Jet Airways, must deliver a superb user experience for its millions of members, secure valuable personal information and rewards points, and help hundreds of partners integrate with the program. SSO with hand-off among multiple sites is central to this mission. JetPrivilege entrusts Auth0 to meet these challenges - learn how the companies worked together to deploy in mere months, propelling JetPrivilege to new heights.
hash: jetprivilege
pdf: http://google.com/link-to.pdf
fourKeyConcepts:
  -
    text: 'Goal: Secure, Scalable, Consumer SSO'
    icon: budicon-334
  -
    text: 'Selection: Meeting The Technical And Business Challenges'
    icon: budicon-360
  -
    text: 'Collaboration: The Story, The Success'
    icon: budicon-792
  -
    text: 'Conclusion: Not Even The Sky Is The Limit'
    icon: budicon-323

longDescription: "JetPrivilege, the internationally acclaimed, award winning loyalty and rewards program and the frequent flyer program of Jet Airways, had to engineer a secure, seamless login and account management user experience for members and partners across multiple sites. After a comprehensive selection process, Auth0 was the only vendor that could meet all of JetPrivilege's technical requirements. Good choice - JetPrivilege's new identity management solution was built and deployed to production in only a few months, and today is handling identity for the program's millions of engaged members. Learn from JetPrivilege's experience, and discover how Auth0's developer-centric platform handles a massive consumer SSO challenge."
---
![JetPrivilege Logo](/media/articles/email-wall/case-studies/jet-privilege-case-study-2015-11-10/logo-jet-privilege.png)
# JetPrivilege: SSO Makes For A Seamless Travel Experience

* * *
<div class="toc-box"></div>
>*“Auth0 blew our minds. The solution was development friendly, it was implemented quickly, and infrastructure requirements were held to a minimum. Their simple demo and expertise made Auth0 exceedingly attractive”*
> **– Amol Date, Product Manager, Jet Privilege Private Limited**

## OVERVIEW
Jet Privilege Private Limited (JPPL) is a specialized loyalty and rewards management company, a joint venture between Jet Airways and Etihad Airways, established to develop, manage, operate and market JetPrivilege – an internationally acclaimed, award winning loyalty and rewards program and the frequent flyer program of Jet Airways. After the formation of the joint venture, one of the challenges the company faced was engineering a secure, seamless login and account management user experience for members and partners across multiple sites.

| JetPrivilege At A Glance
| ------------------------
| * One of the most trusted and respected loyalty and rewards programs in India.
| * Winner of the coveted Freddie Award for best frequent flyer program.
| * Millions of highly engaged members.
| * Over 150 program partners.
| * A joint venture of Jet Airways and Ethiad Airways, spun off in 2014.

JPPL needed an identity management solution and partner that was up to this challenge. They chose Auth0 after a comprehensive selection process that winnowed over a dozen potential vendors down to just one. In the end, Auth0 was the only vendor considered that met all of JetPrivilege’s technical requirements. Their new identity management solution was built and deployed to production in only a few months and is today delivering on its promise, including:

-   secure, web-scale, multi-partner SSO bringing a superior experience to JetPrivilege’s millions of engaged members,

-   simplified partner relationships,

-   future integrated social profiles and partner data for sophisticated analytics and customized user journeys.

The key ingredient for success: Auth0’s flexible, developer-friendly platform. With comprehensive support for nearly any identity provider, a wide range of platform SDKs, superior documentation and customer-obsessed support, Auth0 delivered the perfect mix of features and technical help to accelerate development and tackle JetPrivilege’s complex requirements.

## THE CHALLENGE
Frequent flyer points are like cash - they have real value, and can often be the target of fraud and abuse of redemption rules. And rewards programs such as JetPrivilege engender much of their irresistible loyalty for members through attractive and varied partner arrangements, making earning and redemption of rewards both easy and fun.

For JetPrivilege to meet its business goals, the program needs an ironclad secure, but nearly invisible identity management solution. One that lets members log in once on the JetPrivilege site itself or on any participating airline or partner site, then allows members to freely move between sites while remaining authenticated. Consumer SSO on a grand scale across multiple independent partner sites, with many of the same security concerns as a financial services company safeguarding monetary accounts.

Speed was of the essence: the promise of the new joint venture depended upon quickly launching as an independent entity with the full range of rewards services and benefits, and a broad choice of partners to delight members. But the existing member database was a legacy CRM application that was not designed to deliver SSO services. JetPrivilege needed an identity solution that could integrate with this CRM system and serve as both an Identity Provider (IdP) and Service Provider (SP), securely retrofitting modern web-scale SSO into their existing member-management software.

## FROM FIFTEEN TO FIVE TO ONE - THE SELECTION PROCESS
A lot was at stake for JetPrivilege. Member goodwill, customer data, developer productivity, and partner relationships, for starters. JPPL blended appropriate caution with an overarching desire to get moving, select their technology provider, and implement the solution as quickly as could be safely accomplished. JPPL began with an RFI, and tasked Ernst and Young, the global accounting and consulting firm, with overseeing the selection process from the resulting proposals.

> *“Auth0 were given JPPL specific use cases and were asked to setup an online demo. To our surprise, Auth0 was the ONLY vendor who completely met JetPrivilege’s Identity and SSO needs.”*
> **– Amol Date, JetPrivilege**

Fifteen potential vendors were quickly reduced to five shortlisted service providers - including Auth0. In JPPL’s first meeting with Auth0, Eugenio Pace, one of Auth0’s founders and a noted expert on identity systems was on the call. He listened carefully to JetPrivilege’s requirements, including a specific demand to build the consumer SSO component using the well-known SAML protocol.

Pace challenged this requirement. While SAML is an established enterprise SSO technology, it can be cumbersome to implement in a modern web application stack. A protocol that meshes more easily with REST APIs such as OpenID Connect could help JetPrivilege get to production sooner, while simplifying the job for partners to integrate with the JetPrivilege site. Auth0 is fully SAML-compliant and could handle the requested SAML capability out of the box, no problem. But JetPrivilege was impressed with Auth0’s confident and correct technical advice, benefitting from Auth0’s expertise even during the initial selection process and getting a taste of Auth0’s commitment to customer success.

Each of the shortlisted vendors was asked to build detailed proof of concept demonstrations showing how their solution would meet JPPL’s requirements. Auth0’s platform and demonstration met every challenge:

* * *
**✔    Member SSO initiated from any partner, sessions persistent across partner sites.**

-   Auth0’s authentication API can be called from any partner site, returning an identity token good across any partner site.

> *“JetPrivilege required a partner who could be an Identity provider and Service Provider. Auth0 was able to take on both roles with a very lean infrastructure and architecture that impressed our team.”*

**✔    Secure partner access to JetPrivilege protected resources like status and points.**

-   The identity token grants access to the user’s protected data.

**✔    Add SSO to existing CRM application without substantial changes.**

-   Auth0’s custom database connection allows any identity store to be integrated into Auth0.

-   Auth0 can broker access to the custom database just as with any IdP.

> *“Auth0 brought along a host of out of the box connectors which made it very simple for Auth0 to connect with our CRM system to use the existing database as a user store and act as an Identity provider.”*

**✔    JetPrivilege as an IdP for partners, an attractive additional incentive to participate.**

-   Auth0 can federate JetPrivilege’s user database through standard protocols.

**✔    Cost-effective on-premises deployment to insure member privacy.**

-   Auth0 Appliance is available for on-premises deployments.

-   All features are fully supported, and subscription support is available.

-   Hardware resources are modest: just 3 VMs for an HA instance.

**✔    Very high availability for both member logins and partner access.**

-   The Auth0 service is designed for HA, with redundancy and fast failover.

-   Auth0 also provides online updates, with no downtime for deployment.

**✔    Flexibility, extensibility.**

-   Comprehensive support of identity providers, protocols, standards, APIs, and federations including SAML, OAuth/OIDC, and WS-Federation.

-   Social IdP integration for both logins and profile access.

-   Rules - Javascript snippets that securely execute in the authentication pipeline - offer programmatic flexibility to implement unique flows.

> *“Our evaluation team was impressed with the structured approach adopted by Auth0 to solving our challenges - however complex each use case might have seemed. Auth0 was the only vendor that supports multiple protocols and handled the translation from one protocol to another seamlessly.”*

**✔    Easy implementation and maintainability.**

-   Complete live documentation with API “try now” capabilities, samples, seed projects, and demos all available as open source code.

-   Supports nearly all common web and mobile development stacks with comprehensive SDKs.

-   Customer success team with immediate, live access to experts for help in solving challenges and understanding best practices.

-   Frequent updates to maintain compatibility, add new integrations, and prevent security breaches.

> *“While other vendors were laying down implementation timelines of months, Auth0 promised a timeline of only a few weeks.”*

* * *

The one remaining concern was about geography. JPPL wanted a vendor with a local presence in India. Experience with other vendors had made JPPL cautious about going outside the country for service providers.

“It was grueling, but important. We needed a firm that could solve our challenges AND collaborate with us. A primary concern was the geographic location of the finalists.” said Date. Auth0 mitigated this concern through demonstrated commitment to JetPrivilege’s success, as seen by the service level provided during the decision process.

> *“Auth0 is the type of partner JPPL wants to do business with.”*
> **– Amol Date, JetPrivilege**

Date elaborated: “Auth0 was willing to share information about its process instead of holding tight to its proprietary methods. This sharing powered a better solution. A solution that might not have been developed if an open conversation hadn’t taken place. That’s the type of partner JPPL wants to do business with.”

## COLLABORATING TO IMPLEMENT
Once implementation began in earnest, Auth0’s Customer Success team swung into action and was available at all hours (necessary with a 12-hour time zone difference). JetPrivilege used a development partner company to implement their identity solution using Auth0, and right away there was an interesting challenge: JetPrivilege has an iron-clad policy that no external SaaS vendor such as Auth0 may have access to their proprietary source code.

To solve the code challenge, the Auth0 team regularly met with the development partner and after understanding the tasks at hand for the implementation, Auth0 built highly customized sample code projects, such as a detailed demonstration of how custom database connections could layer Auth0 on top of the JetPrivilege legacy CRM database. These examples were then used as working templates by the team to build the actual solution for JetPrivilege.

> *“Credit goes to Auth0 for handholding our development partner all along the way during the implementation phase.”*
> **– Amol Date, JetPrivilege**

With timeframes measured in days or weeks, instead of months, Auth0’s inherent flexibility, including SDKs, broad support for identity protocols and providers, and Auth0’s powerful rules helped JetPrivilege and their development partner maintain a fast pace.

“Credit goes to Auth0 for hand-holding our development partner all along the way during the implementation phase. Auth0 proved that there were no roadblocks that could stand in the way of success. Even though the Auth0 team worked 12 hours behind Indian Standard time, our team never felt Auth0 was unavailable.” said Date.

Through this connection and collaboration, Auth0 becomes a standards-compliant identity provider for JetPrivilege, implementing multi-party SSO among all the JPPL partners - seamless for members; simple for the development team.

## CONCLUSION - EVEN THE SKY ISN’T THE LIMIT
Auth0 now handles every login/authentication of a JetPrivilege member, on the JetPrivilege and Jet Airways sites, as well as on partner sites, with SSO allowing members to enjoy a seamless user experience. JetPrivilege needs a very reliable service to prevent lost business and customer dissatisfaction. Auth0 has lived up to this high availability expectation, with Auth0 helping JetPrivilege configure appropriate monitoring and management tools for their on-premises deployment.

“Auth0 blew our minds. The solution was development friendly, it was implemented quickly, and infrastructure requirements were held to a minimum. Their simple demo and expertise made Auth0 exceedingly attractive.” said Date, summarizing JetPrivilege’s experience with Auth0.

Looking ahead, JetPrivilege is implementing social connections and user profile enhancement into their solution. This feature will reduce abandoned sign-ups, and allow JetPrivilege to customize the user experience even for users that do not yet have an account, enticing them to join.

In describing JetPrivilege’s ambitions for integrating social data, Date explained, “Using the power of Auth0, we expect to offer users a richer experience once we are able to see their social profile and personalized information. The benefit is that it will allow folks to come through our doors and see what we offer, but to interact more completely they’ll need to provide more information.”

> *“In terms of a solution design, there was nothing that Auth0 was unable to do.”*
> **– Amol Date, JetPrivilege**

JPPL did not imagine they could complete such an involved consumer SSO implementation in such a short timeframe. Their positive experience has them confident of more success using Auth0 to build out more business value through its advanced Identity-As-A-Service platform.

“It’s a continual process, but we’re doing something now that we only dreamed of before. And in terms of a solution design, there was nothing that Auth0 was unable to do.” concluded Date.
