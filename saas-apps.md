# Using Auth0 in SaaS, multi-tenant Apps

> This article is under development. Feedback very welcome.

Freshbooks is a software company that offers a SaaS accounting package for a broad range of clients: from individual contractors, small businesses and larger corporations.

## Requirements

### User authentication

Freshbooks customers use a wide variety of systems to authenticate users. This is a reflection of their diversity, maturity and sophistication. 

1. Many clients signup to Freshbooks with a custom __username/password__. Especially during trial periods.
2. Some customers login with their existing __Google__, __LinkedIn__ & __Yahoo!__ credentials.
3. Small businesses with employees directories based on __Office365__ or __Google Apps__ have a preference for login using these credentials.
4. Bigger companies often have already one or many identity systems for employees. Many rely on __Active Directory__, or __LDAP__. Some have deployed systems for identity federation based on __ADFS__, __PingFederate__, __Okta__, __OneLogin__, __CA Siteminder__, or even custom __SAML-P providers__.

![]()

Freshbooks wants to offer as many options as possible without the hassle of dealing with all these different options themselves. If possible, they want their app to be completely isolated from any of this.

---

### Applications

Freshbooks is primarily a web app, built as a __Single Page App__ (SPA) using __AngularJS__ with a backend API built with __nodejs__. They also have a mobile app for __Android__ and __iOS__ with a subset of the web app functionality. 

Freshbooks leverages AWS S3 for storing historical reports and other documents for each customer. 

![]()

Freshbooks wants to use a common architecture for all components of their solution. They also want user identity to flow through all layers of the system: when __bob@customer.com__ logs in on the website, they want him to be identified as such in the API and in S3.

---

### Authorization & Security Features

Being a system that deals with money, Freshbooks is always concerned with maintaining high level of trust and security. As such they want to implement these features:


