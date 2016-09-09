---
title: Auth0 Overview
description: Learn the basics of Auth0 including how it can help secure your application, how you can extend Auth0 to meet the exact needs of your project, and about the flexible deployment options in both the cloud and even your own datacenter.
---
# Auth0 Overview

Auth0 is a service that abstracts how users authenticate to applications.

![](/media/articles/overview/overview.png)

You can connect any application (written in any language or on any stack) to Auth0 and define its **Connection**, the method used to authenticate the users of that application:

* **Custom** credentials: username + passwords
* **Social** network logins: Google, Facebook, Twitter, and any OAuth2, OAuth1 or OpenID Connect provider
* **Enterprise** directories: LDAP, Google Apps, Office 365, ADFS, AD, SAML-P, WS-Federation, etc.
* **Passwordless** systems: TouchID, one time codes on SMS, or email

## Video: Developer Overview
This video will give you a quick walkthrough of Auth0 and how it will help save you time adding identity to your application.

<%= include('../videos/_video', { id: 's15ysw45uy' }) %>

## Integrating Auth0 Into Your Application

The default [protocol](/protocols) between your application(s) and Auth0 is **OpenID Connect**, a modern, lightweight, simple to use, and simple to integrate protocol.

Auth0 ships SDKs for all major platforms (.NET, Java, PHP, Python, node, iOS, and many more), but the use of Auth0 SDKs is not mandatory.

> Virtually anything able to send HTTP requests can integrate with Auth0.

Auth0 also supports other common identity protocols, such as WS-Federation and SAML. Applications that are already "claims enabled" can easily connect to Auth0.

## An Extensible Platform
You can extend the functionality of Auth0 using any JavaScript or C# code through the use of [rules](/rules). Rules are custom functions that are executed just after successful authentication and before control returns to the app. They can be used for **Access Control**, **Webhooks**, **Profile Enrichment**, **Multi-factor Authentication**, and many other things.

## Flexible Deployment Models
Auth0 is a service usually running in the [public cloud](${uiURL}), but it can also be deployed in **Private Instances** (PI). PIs are dedicated installations of Auth0. You may choose to run PIs in Auth0's datacenters (which are separate from those that run the multi-tenant services), in your own cloud hosting environments (e.g. AWS, Azure, Rackspace, DigitalOcean), or even on-premises. Customers often opt for a hybrid model. For example, some use the cloud service for their **development** and **test** environments and a PI for their **production** environment.
