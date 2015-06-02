# Auth0 Overview

Auth0 is a service that abstracts how users authenticate to applications:

![](https://docs.google.com/drawings/d/1yZhoSFzCaqUpYOYDSeGfJI_lUrZ2ApMqzHaeJ7lk5OU/pub?w=713&amp;h=216)

You can connect any application, written on any language or stack to Auth0, and separately define how users of that application authenticate:

* **Custom** credentials: username/passwords.
* **Social** network logins: Google, Facebook, Twitter and any OAuth2 or OAuth1 provider.
* **Enterprise** directories: LDAP, Google Apps, Office 365, ADFS, AD, SAML-P, WS-Federation, etc.,
* **password-less** systems: TouchID, one time codes on SMS.

Each of these systems surface in Auth0 as a __Connection__.

The default [protocol](/protocols) between __Apps__ and Auth0 is __OpenID Connect__: a modern, lightweight, simple to use and integrate protocol.

We ship SDKs for all major platforms (.NET, Java, PHP, Python, node, iOS, and many more), but use of our SDKs is not mandatory.

> Virtually anything able to send HTTPs requests can integrate with Auth0.  

Auth0 also supports other common identity protocols too, such as WS-Federation and SAML. Applications that are already "claims enabled", can easily connect to Auth0.

Developers can extend Auth0 using any JavaScript or C# code through [rules](/rules). Rules are custom functions that are executed just after successful authentication and can be used for __Access Control__, __Web-hooks__, __Profile Enrichment__, __Multi-factor Authentication__ and many other things.

Auth0 is offered as a service, running in the [public cloud](https://@@uiURL@@). <-- problematic link -->

It can also be deployed in __Private Instances__ (PI). PIs are dedicated installations of Auth0. Customers can choose to run PIs in Auth0's datacenters (separate from the multi-tenant service), in their own cloud environments (e.g. AWS, Azure, Rackspace, DigitalOcean) or even on-premises. There's no difference in functionality or features.

Often customers opt for a hybrid model. For example, some use the cloud service for __development__ and __test__, and a PI for __production__.
