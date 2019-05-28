---
title: Authorization
description: Understand user authorization and related planning considerations for your B2C implementation.
toc: true
topics:
    - b2c
    - ciam
    - user-authorization
contentType: concept
useCase:
  - profile-management
---
# Authorization

It’s important to start by distinguishing between Authentication, Authorization, and Access Control. Your Auth0 tenant (the Authorization Server) is typically responsible for Authentication and some or all of Authorization. Access Control however must be the responsibility of the Application or API itself, because access control is almost always contextual: 

* **Authentication**: the process of determining if the user is who they say they are.
* **Authorization**: the proceess of determining what the user is allowed to do in the system.
* **Access Control**: the process of limiting a user to only the actions permitted, based on a combination of who the user is, what they are allowed to do in the system, and their consent.

For application level Authorization, custom claims can be added to an OpenID Connect (OIDC) [ID Token](/tokens/id-token) via use of Auth0’s Rule [extensibility mechanism](#id-token-claims), and you will need to decide what that information might be required in order for your application to make access control decisions.

::: warning
When deciding what data to include in OIDC tokens, you need to consider token size, especially if you are passing the token in the URL. Even if you are not passing tokens in the URL, there are other things that you will also need to consider - such as the potential of exposing sensitive PII (Personally Identifiable Information).
:::

For API level Authorization, Auth0 supports the use of Open Authorization 2 (OAuth2) [Access Tokens](/tokens/overview-access-tokens). Essentially, an OAuth2 Access Token is allocated by an authorization server (with the approval of the user; the resource owner) and issued to a third-party application (client), so that it can access protected resources - hosted by a resource server - on behalf of the resource owner. In this case, Auth0 acts as the authorization server, and provides for easy retrieval of an access token (typically expressed as a [JWT](/jwt)) that can be then passed as the Bearer token in an HTTP Authorization header sent to a third party [API](/api-auth/why-use-access-tokens-to-secure-apis).

In either case, there are a number of things you will want to consider when looking at functionality and workflow when it comes to authorization:

* Will my application be calling a third-party API?
* Will I be providing APIs that can be accessed by third-party applications?
* Will my APIs also be accessed by our own (first-party) applications?
* Will my Applications and/or APIs be enforcing role or permission based access control?
* Are there scenarios where a user could be rejected access to an entire API or application?

Auth0 provides access control support for applications via use of [ID Token claims](#id-token-claims), and also provides for both first party and third party application access to APIs - as described in the section entitled [API Integration](#api-integration). Auth0 supports [role based access control (RBAC)](#role-based-access-control-(rbac)) as part of it's core authorization feature set, whilst support for OIDC/OAuth2 [Scopes](/scopes/current) provides authorized access to user details and API functionality.   

## ID Token claims 

Through the use of Rule extensibility, Auth0 allows you to easily [add custom claims to an ID Token](/architecture-scenarios/implementation/b2c/b2c-authorization#id-token-claims) based on a user’s metadata. Though the process of adding custom claims via Rule is streamlined, because the rules engine is flexible and allows you to write custom code you can also do things that may have negative effects. So it’s important to follow our [rules best practice](/best-practices/rules) guidance anytime you utilize this extensibility feature.

::: panel Best Practice
When you are considering adding custom claims, we recommend that you choose to store any data you may need to include within the claims in the user's `user` or `app` [Metadata](/users/concepts/overview-user-metadata). Doing so prevents you from needing to call out to an external API to fetch the data, which can negatively impact the performance and scalability of the login sequence. Remember to check out our [metadata best practices](architecture-scenarios/implementation/b2c/b2c-profile-mgmt#metadata) too.
:::

### Scopes

[OIDC Scopes](/scopes/current/oidc-scopes) are typically used by an application to authorize access to a user's details during authentication. Each of the pre-defined scopes returns the set of [standard claims](/scopes/current/oidc-scopes#standard-claims) where defined, and as described in the [OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). The scopes an application should request depend on which user attributes the application needs; once the user authorizes the requested scopes the claims are returned in the ID Token and are also made available via the [/userinfo](https://auth0.com/docs/api/authentication#get-user-info) endpoint.


## API Integration

Whether you have a single API, or a suite of microservice APIs, you can leverage the access tokens that Auth0 provides in order to [secure access to your service(s)](/api-auth/why-use-access-tokens-to-secure-apis). Though relatively easy to set this up - i.e. via the [Auth0 Dashboard](/apis] or the Auth0 Management API (/api/management/v2#!/Resource_Servers/post_resource_servers) - it's important to review the different application scenarios and API layouts to determine the best architecture for your system.

OAuth2 was designed specifically with third-party access in mind, that is: a user (resource owner) who wants to use an application (a client) that does not belong to the same organization as the service that provides user data access (the reseource server). In this scenario, when the application needs to access data that the user owns it redirects to the organization where the user’s data resides, which in turn authenticates the user and then prompts the user to give the application permission to access their data. This prompting for permission is typically referred to as providing "[consent](/api-auth/user-consent)" and is a large part of providing support for ["third party" application interactions](/scopes/current/api-scopes#example-an-api-called-by-a-third-party-application).

If however your organization "owns" the application(s), the user data itself, and the API(s) then consent is not typically required as the interactions are all [“first-party” application interactions](/scopes/current/api-scopes#example-an-api-called-by-a-first-party-application]. If you are only creating first-party applications, then you should ensure that you are not presenting those users with any "consent" screen by [allowing user consent to be skipped (/apis#api-settings).

Alternatively, you may have 


### Scopes

### Role Based Access Control (RBAC)



## Planning

To help you with planning your implementation, we've put together some [planning guidance](https://drive.google.com/a/auth0.com/file/d/1lQU-uPTfwEi58WJMKL2azUhZhvy9h1IU/view?usp=sharing) that details our recommended strategies.

## Keep reading

* [Architecture](/architecture-scenarios/implementation/b2c/b2c-architecture)
* [Provisioning](/architecture-scenarios/implementation/b2c/b2c-provisioning)
* [Authentication](/architecture-scenarios/implementation/b2c/b2c-authentication)
* [Branding](/architecture-scenarios/implementation/b2c/b2c-branding)
* [Deployment Automation](/architecture-scenarios/implementation/b2c/b2c-deployment)
* [Quality Assurance](/architecture-scenarios/implementation/b2c/b2c-qa)
* [Profile Management](/architecture-scenarios/implementation/b2c/b2c-profile-mgmt)
* [Logout](/architecture-scenarios/implementation/b2c/b2c-logout)
* [Operations](/architecture-scenarios/implementation/b2c/b2c-operations)
