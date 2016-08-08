---
title: "Safari: Auth0 SSO Drives B2B Expansion"
type: case-study
sitemap: false
description: Safari needed a flexible SSO platform to simplify enterprise customer integrations. Auth0 provided just the ticket - enabling Safari's enterprise ambitions, adding a critical new feature to their platform and lowering support costs. Find out how.
hash: safari
pdf: http://google.com/link-to.pdf
fourKeyConcepts:
  -
    text: 'Challenge: Package Enterprise Content Access'
    icon: budicon-72
  -
    text: 'Solution: Adaptable SSO to SAML, ADFS, Google Apps - Any Enterprise IdP'
    icon: budicon-297
  -
    text: 'Benefits: Speed, Mobility, Standards, Security'
    icon: budicon-693
  -
    text: 'Result: Fast Customer On-boarding, More Enterprise Opportunity'
    icon: budicon-362
longDescription: "Safari saw an opportunity to deliver their unique content to enterprise customers but these customers expected their employees to access that content using their already established credentials. Safari needed an SSO solution that could handle a broad range of SSO standards such as SAML, ADFS, and Google Apps, eliminating the need to do custom integrations and making new customer on-boarding a snap. Auth0's developer-centric design and built-in standards support handled this SSO challenge without a hitch, and as an added benefit, made Safari's mobile apps for Android and IOS instantly enterprise-aware. Read the case study and learn how Auth0 partnered with Safari to help them build out their enterprise business."
---
![Safari Logo](/media/articles/email-wall/case-studies/safari-case-study-2015-09-23/logo-safari-books.svg)
# Safari: Auth0 SSO Drives B2B Expansion

* * *
<div class="toc-box"></div>
> *"Setting up our application to integrate with one partner and then having that partner act as a service hub for dozens of identity systems helps simplify work for our core development teams, while allowing our customer base to grow exponentially."*
> **– Cris Concepcion, ‎Engineering Manager at Safari Books Online**

## OVERVIEW
Safari, a subsidiary of O’Reilly Media, Inc., provides online and mobile access to a vast array of technical, business, and design resources—from books to training to videos. This unique learning portal has hundreds of corporate clients including Amazon, Tesla, Blizzard Entertainment, Yahoo! and Google, who purchase subscriptions to enable access by small teams or by users company-wide.

| Safari At A Glance
| ------------------
| *	A wholly owned subsidiary of O’Reilly Media, Inc.
| *	Launched in 2001.
| *	A digital learning platform that offers 30,000 books, videos, training courses, and conference resources on technology, business, and design.
| *	Global presence with four offices worldwide.


Safari started out as a digital library platform focused on individual developers and corporate teams, with cutting-edge technical books and content drawn from a wide array of publishers aimed at accelerating developer productivity.  As their offerings branched out to include more diverse titles for design, business, and strategy, and as software becomes central to nearly every business, Safari saw the opportunity to expand their user base into all levels of the enterprise.

The goal: package and deliver content for enterprise consumption, land larger deals and expand Safari’s user base. Customers made it clear that enterprise single sign-on (SSO) is vital to this goal, and the company launched an initiative to add this feature to their product.

With SSO, corporate users don’t need a registration process, nor do they need to set up separate user names or passwords. An SSO solution can also cut costs for both Safari and their customers by reducing or eliminating expensive support calls for password resets and user account management—a win-win.

The rollout of a new enterprise client with more than 2,000 users provided the perfect opportunity for Safari to build out an initial SSO solution using Auth0.

## THE CHALLENGE
### Stringent Customer and Technical Criteria
With its emphasis on the B2B market, Safari needed a core single sign-on (SSO) platform that could easily be adapted to customers’ preferred corporate identity technologies - Security Assertion Markup Language (SAML), Active Directory Federation Services (ADFS), Google Apps, etc.

With customers in regulated industries and the need to comply with the US-EU Safe Harbor Framework — a privacy policy agreement between the US and the EU — ironclad privacy and security was paramount.

Safari’s technical criteria included:

-   Easy integration with Python/Django.

-   Simple support for Android and iOS native mobile apps.

-   Support for multiple SAML implementations, mapping attributes from customer Identity Providers (IdPs) to Safari user profiles.

-   Role-based authentication workflows that guide users with specific roles to different content landing pages.

-   Security and privacy safeguards that meet enterprise customer requirements.

### Build or Buy?
At the outset, Safari considered building its own authentication service. Safari Engineering Manager Cris Concepcion and his team researched several open source identity and access management (IAM) and SSO technologies. This was a natural path to take, as Safari’s parent company, O’Reilly Media, is a thought leader in OSS communities and the founder of OSCON, a popular open source conference.
> *"Compared to the costs and resources required to build, host, and secure a custom solution, the investment associated with a third-party authentication service like Auth0 was a sensible choice."*
> **– Cris Concepcion, ‎Engineering Manager at Safari**

Concepcion and his team soon realized that building their own authentication middleware would demand a lot of effort and expense. While researching options, Concepcion and his team discovered Auth0 through the company’s open source SDKs on GitHub. After understanding the potential of Auth0’s platform, the team embraced a decision to buy, rather than invest in building a solution from scratch.

Safari realized that building and maintaining their own authentication infrastructure would require one or two full-time engineering resources dedicated to support and customization. “I am proud of working with a bunch of smart people at an excellent company, but part of that excellence is derived from knowing what our core business is,” said Concepcion. “Compared to the costs and resources required to build, host, and secure a custom solution, the investment associated with a third-party authentication service like Auth0 was a sensible choice.”

## THE SOLUTION
### The Proof is in the POC
Safari’s Proof of Concept used the Django OAuth toolkit to leverage OAuth2 for both authentication and authorization. Auth0 delivers a complete, compatible OAuth2 implementation right out of the box, and in the POC, Safari leveraged the Python Social Auth SDK they were already using. No additional coding was needed: the POC proved Auth0’s simplicity and compatibility with Safari’s existing software.

Safari’s system handles B2C and enterprise users differently, routing logins by comparing the user’s email to a known list of SSO email domains. If there is a match, Safari routes the request to Auth0 with the corporate account’s connection string. Auth0 then authenticates the user to the enterprise IdP. When the user is authenticated, Auth0 routes the user back to the Safari system.

After the POC, it took Safari just three weeks to complete a pilot with a customer. The customer sent users to Safari from a corporate landing page rather than from the Web. The pilot users didn’t have to log in to Safari if they were already logged into their company’s system. Safari’s SSO, enabled by Auth0, invisibly authenticated them and redirected them automatically to Safari’s content with just a click.

### A Quick and Seamless Path to Mobile SSO
At first, Safari focused on SSO for corporate users accessing content from their desks. But users also like to read on mobile devices, so Safari also has powerful mobile applications on both IOS and Android—a major differentiator for the company in the B2B market.

The mobile development team quickly got up to speed, and mobile integration required only a few changes. “The Auth0 solution was used pretty much as is for our mobile implementation,” said Concepcion. “It all came together within the timeframe that we expected, with no major surprises or roadblocks. Auth0 made it easy to provision new users right within our mobile app. There’s no need for a user to go to the Web first to create an account and then download the app.”

## BENEFITS
### SAML Variations Made Easy with Auth0
| Realized Benefits
| -------------------
| *	Multiple authentication partners are supported quickly and easily and with minimal effort.
| *	Developers can define the workflow in one environment and have it work seamlessly on the Web or on mobile devices.
| *	IT can access to logs and reports to troubleshoot customer issues.
| *	Rules-based workflows are supported to handle additional customer authentication requirements.
| *	Safari’s B2B and B2C customers enjoy a secure SSO experience.
| *	The SSO process is simple and transparent to the user.
| *	The development cycle is short, thanks to outstanding support from Auth0.
| *	Safari has the potential for expanding its enterprise customer base and future customized applications for the mobile environment.

Auth0 stands apart from other SSO technologies, focused on simplifying a complex development process. Based on past experience, Concepcion noted that integrating SSO with a B2B customer’s identity architecture could present technical and business challenges. “While there are standards for formats like SAML, the implementation of those standards varies widely. The more often you engage your core developers to support variations in your customers’ identity systems, the slower you will be to sign deals and support the growth of your business,” he said.

But Auth0 solved all that for Safari. The entire implementation, from Web POC to mobile implementation to the pilot, took less than two months. Concepcion attributes the rapid development cycle to the elegant way Auth0 handles variations in SAML.

Auth0 rules and mapping also provided Safari with a high degree of flexibility, making it easy to customize SSO for its customers. Auth0 can easily map SAML attributes to a standard format for email addresses. This allows Safari to use the customer data as is, making Safari much easier to work with as a Software-as-a-Service (SaaS) provider integrated with enterprise SSO.

“The combination of the rules and mapping capabilities in the Auth0 platform makes it easy for us to work with any data in any format. Best of all, we don’t have to ask our customers to send data in a different format, and we can customize the SSO to meet their needs,” remarked Concepcion. Rules also come in handy if customers want to monitor usage by logging user access to an application. Auth0 also makes it possible to redirect users to specified URLs after logout, such as a corporate homepage.

### A Collaborative Partner
Concepcion appreciates Auth0’s commitment to its customers, the collaborative spirit of its support team, and its responsiveness. “We are grateful for the help Auth0 provided while we were working through the initial integration points. The Customer Success team was always accommodating and made time for us when we had an issue,” noted Concepcion. “Having Auth0 around to provide immediate answers to our questions saved our developers a great deal of time.” He found the whole experience “quick and efficient,” largely because the Auth0 Customer Success team worked side by side with the Safari developer team and truly spoke their language.

| What To Look For In An IAM Partner
| ----------------------------------
| *	Strong presence in the developer community
| *	Support for OAuth2
| *	Ability to support SAML variations
| *	Excellent support and follow-through
| *	Open, transparent, and forward-thinking

In one instance, a large Safari customer wanted to use their own signing certificate rather than use the Auth0’s certificate to validate the authentication flow, including SAML assertions. This was a feature not yet part of Auth0, but the company quickly jumped on this requirement. In a four-hour, three-way working videoconference between Auth0, Safari, and the customer, the new feature was implemented and verified against Auth0, Safari, and customer test environments. Additional tests proved that the SAML assertion signing was working correctly in production. “Even if there is something Auth0 can’t currently do, the company provides workarounds or implements new functionality. It was a very happy ending for all of us,” said Concepcion.

## CONCLUSION: A BRIGHT FUTURE
> *“Having Auth0 around to provide immediate answers to our questions saved our developers a great deal of time.”*
> **– Cris Concepcion, ‎Engineering Manager at Safari**

With Auth0 SSO as the service hub for dozens of identity systems, Safari’s development team can now easily set up B2B clients with SSO and provision users. Currently, Safari has five enterprise accounts and thousands of active users on Auth0—and Safari has dozens of B2B customers that are transitioning to the new SSO capabilities, including enterprises wanting to scale up, engaging Safari’s services company-wide. Safari recognized that implementing SSO was not just about landing more customers, but also expanding usage within existing customers. This insight was key to Safari's decision to invest in this strategy.

Concepcion is confident that SSO will have a positive impact on Safari sales. “There are definitely a lot of new customers that we will be able to bring in as a result of SSO. For any enterprise implementation, SSO is the key to making those deals happen,” said Concepcion.

Looking to the future, Concepcion envisions the development of a broader family of mobile apps, including customized mobile apps that will enable corporate users access to a wider range of content, confident that Auth0 can handle these new use cases and help Safari accelerate their B2B momentum.
