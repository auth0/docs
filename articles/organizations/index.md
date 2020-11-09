---
url: /organizations
section: articles
title: "Organizations - Beta"
description: Learn about Auth0's Organizations feature, which is currently in beta.
topics:
  - organizations
contentType: index
useCase:
  - build-an-app
toc: true
---

# Organizations - Beta

The Organizations feature represents a broad update to the Auth0 platform that allows our Business-to-Business (B2B) customers to better manage their partners and customers, and customize the ways that end-users in those organizations access their applications. Auth0 customers can use Organizations to:

* manage the businesses that access their applications.
* build administration dashboards in their products that allow those businesses to manage their organizations, invite users, and define users’ roles within organizations.

## Business cases

Organizations best supports customers who are building applications that end-users access in the context of the customer’s business.

![B2B Business Case](/media/articles/organizations/b2b-business-case.png)

Common features of B2B implementations include:

* A product that is licensed to another business for use by their employees.
* The end-user specifies their Organization before logging in.
* Each organization requires its own federation and lightweight branding of the authentication experience.
* Access levels in the application can be represented by roles that are assigned to members of each organization.

Let’s explore some example business cases to highlight the ways in which Organizations can help.

### Sample scenario

Travel0 is a fictitious company that offers online travel services and has set up an Auth0 tenant. Travel0 has several applications, but we’ll focus on one application that could benefit from using Organizations.

**Travel0 Adventure Management**: An online application that allows its customers to create and market adventures, such as whitewater rafting, horseback riding, and zip lining. Each adventure is led by a guide who can use the application to sign up and manage scheduling. Guides may be either employed by the customer directly or freelance.

Customers of the application include:

* **Granite Outpost Rafting and Ziplines**: An established company that directly employs their large staff of guides, but sometimes also reaches out to freelance guides. They have their own IdP that they use for their employees.
* **AdventureZ**: A large event company that directly employs a large number of guides, but also uses freelancers, though rarely. They also facilitate their direct employees’ ability to freelance for other companies who are in need of guides. They have their own IdP that they use for their employees.
* **Rocky Mountain High Adventures**: A new company just coming to market. The co-founders run most of their tours, and they reach out to freelancers for help during busy times. They don’t have an IT staff, and have neither the time nor inclination to set up their own identity provider (IdP). They have a contract with AdventureZ that allows any AdventureZ employees to freelance for them.

#### Planning
When setting up organizations, consider the following:

* **Login experience**: Will users be required to select an organization when logging in? Will users see the application’s default login page or a customized login page for their organization?
* **Connection model**: Will any users be shared between organizations? Do users need to be able to log in using an organization’s own internal identity provider?
* **Roles**: Does the application need users to have specific roles assigned within their organizations? Do we intend to build a custom dashboard that allows administrators to self-manage their organizations using assigned roles?

##### Login experience

First, we must decide what the user should experience when they log in to an organization. We can choose to send the end-user directly to a specific Organization’s login prompt in Auth0, or we can send them to a prompt in which they can enter the name of the Organization with which they want to log in.

Additionally, we must choose whether to use the default Universal Login page that is configured for our application or to customize a login page specific to each organization using page templates. To learn more, see [Configure organization login page](/organizations/configure-organizations#customize-page-and-email-templates).

##### Connection model

Each organization will usually map directly to one of our business customers or partners, but users can be members of multiple organizations. Understanding how users map to customer organizations will help us determine how to model our organizations and connections. There are two user scenarios:

* **Users are isolated to an organization**: Every user is a member of exactly one organization. Either users will never need to be part of multiple organizations, or it would make more sense for users to create a separate identity for each organization.
* **Users are shared between organizations**: Any user may belong to multiple organizations and should be able to use the same identity to navigate between organizations.

Using our Travel0 Adventure Management example, let’s assume the following users:

* **Jonno**: A guide who is directly employed by Rocky Mountain High Adventures and who should be able to log in to only Rocky Mountain’s organization.

  Because Rocky Mountain does not have its own IdP, Jonno’s credentials are stored in the Travel0 database connection and Jonno is assigned membership to the Rocky Mountain organization.
* **Hiroko**: A guide who is directly employed by Granite Outpost Rafting and Ziplines and who should be able to log in to only Granite Outpost’s organization. 

  Because Granite Outpost has its own IdP, Hiroko’s credentials may be stored in either the Travel0 database connection or an enterprise connection that Granite Outpost has set up to represent their IdP, and then Hiroko must also be assigned membership in Granite Outpost’s organization. If using Granite Outpost’s IdP, then the enterprise connection must also be enabled for the organization.
* **Emilio**: A guide who freelances for both Rocky Mountain High Adventures and Granite Outpost Rafting and Ziplines and should be able to log in to both organizations. 

  If we want Emilio to be able to use the same credentials for both organizations, then Emilio’s credentials should be stored in the Travel0 database connection, and Emilio should be assigned membership in both Rocky Mountain and Granite Outpost organizations. 

  Otherwise, Emilio will need to set up one set of credentials in the Travel0 database connection for Rocky Mountain High Adventures and be assigned membership in the Rocky Mountain High organization, then set up another set of credentials in either the Travel0 database connection or Granite Outpost’s enterprise connection and be assigned membership in the Granite Outpost organization. Finally, if using Granite Outpost’s IdP, the configured enterprise connection must be enabled for the Granite Outpost organization.
* **Sumana**: A guide who is directly employed by AdventureZ, but sometimes freelances for Rocky Mountain High Adventures under the contract Rocky Mountain has with AdventureZ. AdventureZ and Rocky Mountain have rating systems for their guides, and Sumana’s ratings need to carry over from AdventureZ to Rocky Mountain and be combined between organizations. 

  Either Sumana’s credentials should be stored in the Travel0 database connection and membership should be assigned for both the Rocky Mountain and AdventureZ organizations, or if AdventureZ wants to share their IdP, then Sumana’s credentials should be stored in an enterprise connection that AdventureZ has set up to represent their IdP and the configured enterprise connection must be enabled for both the Rocky Mountain and AdventureZ organizations.

  If Sumana is also invited to freelance for Granite Outpost Rafting and Ziplines, then her credentials could be stored in the Travel0 database connection or she could be added to Granite Outpost’s IdP, and membership should be assigned to the Granite Outpost organization.

Once you have determined how many organizations you will have and what your connection model should look like, you can set up [database](/connections/database), [social](/connections/identity-providers-social), or [enterprise](/connections/identity-providers-enterprise) connections; [configure organizations](/organizations/configure-organizations); and [configure organization membership](/organizations/configure-membership) or [enable organization connections](/organizations/configure-connections#enable-connections).

##### Roles

Members of organizations can be [assigned roles](/organizations/configure-membership#add-roles-to-members), which are added to the member’s Access Token. You can use these roles to define access control for your application. For example, if you built a dashboard for your users using our API and SDKs, you could assign an administrator role to certain members and allow them to self-manage their organizations through your dashboard.

::: warning
If you build a custom dashboard for your product, note that API use is subject to Auth0 Management API rate limits.
:::

## Limitations

Organizations currently has the following limitations:

* Supported in only new Universal Login (cannot be used with classic Universal Login or Lock.js)
* Does not support:
  * custom domains per organization (For example, using the sample scenario, if Rocky Mountain High Adventures and Granite Outpost Rafting and Ziplining could both use `login.travel0.com` as login domains, then Organizations would be useful. Alternatively, if Rocky Mountain High Adventures wanted to use `login.rockymountain.com` and Granite Outpost wanted to use `login.graniteoutpost.com`, then we would need to use multiple Auth0 tenants instead.)
  * the following grants and protocols: Client Credentials, SAML (Auth0 as IdP, WS-Fed (Auth0 as IdP)
  * integration with the Delegated Administration extension
  * integration with the Authorization Extension

### Entity limits

* Each organization may have a maximum of 10 metadata properties.
* Each organization may have a maximum of 10 enabled connections.
* Each organization member may have a maximum of 50 roles.
* Up to 1000 organizations can be displayed using the Auth0 Dashboard or Management API, though more may exist.

## Upcoming changes

Organizations is currently in beta, and based on customer feedback, we have already identified several areas that will change:

* **Organization connections on the Login prompt**: Currently, connections defined at the application-level and connections defined at the organization-level are merged and displayed on the organization Login prompt. Eventually, only the connections defined at the organization level will be displayed.
* **Application URI parameters**: We plan to allow for parameterized application URIs (for example, callback URLs, login/logout URLs) that enable developers to allow-list URIs that contain organizations’ names in their subdomains.
* **User invitation redirect URLs**: To allow custom redirection after an end-user has accepted a membership invitation, we plan to allow organizations to be assigned their own redirect URLs.
* **Just-In-Time (JIT) organization membership**: We plan to add a configuration option to connections enabled at the organization level that will automatically assign membership in the organization to any user that is able to successfully log in via the connection.
