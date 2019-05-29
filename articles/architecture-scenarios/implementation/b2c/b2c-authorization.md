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

It’s important to start by distinguishing between Authentication, Authorization, and Access Control. Your Auth0 tenant (your Authorization Server) is typically responsible for Authentication and some or all of Authorization. Access Control however must be the responsibility of the Application or API itself, because access control is almost always contextual: 

* **Authentication**: the process of determining if the user is who they say they are.
* **Authorization**: the proceess of determining what the user is allowed to do in the system based on their consent.
    * **Access Control**: the process of limiting a user to only the actions permitted, based on a combination of who the user is, what they are allowed to do in the system, and their consent.

Whatever your use case, there are a number of things you will want to consider when looking at functionality and workflow:

* Are there scenarios where a user could be rejected access to an entire application or API?
* Will I be providing APIs that can be accessed by third-party applications?
* Will my APIs also be accessed by our own (first-party) applications?
* Will my application be calling a third-party API?
* Will my Applications and/or APIs be enforcing role or permission based access control?
 
Auth0 can provide for corse grained authorization by restricting access to certain applications or APIs based on a user's attribute(s): a [Rule](/rules) can be built that returns an `UnauthorizedError` when, say, a user attempts to log in to a particular application at the incorrect time (as in [this](/authorization/concepts/sample-use-cases-rules#allow-access-only-on-weekdays-for-a-specific-application) example) or doesn’t, say, have the right claim(s) contained in their [Metadata](/users/concepts/overview-user-metadata). 

For an application utilizing OpenID Connect ([OIDC](/protocols/oidc)) - the most frequently used industry standard protocol when it comes to customer facing applications - this would prevent the allocation of the [ID Token](/tokens/id-token) (the token allocated to provide an indication of authorized access). In a similar fashion this would also prevent the allocation of any Open Authorization 2 (OAuth2) [Access Tokens](/tokens/overview-access-tokens) used when calling an API (as in the example shown [here](/api-auth/restrict-access-api#example-deny-access-to-anyone-calling-the-api)).

::: panel Best Practice
As OpenID Connect ([OIDC](/protocols/oidc)) is the most frequently used industry standard protocol for authentication when it comes to customer facing applications, we have typically found that Open Authorization 2 ([OAuth2](protocols/oauth2)) is the most commonly used industry-standard protocol for authorization.
:::

Auth0 can also provide for fine grained access control at both an application and an API level. For [application level integration](#application-integration), one option can be to [add custom claims](#id-token-claims) to the ID Token. You will need to decide what information will be required in order for your application to make access control decisions, and then your application will need to enforce that access control by checking the ID Token for those claims.

::: warning
When deciding what data to include in OIDC tokens, you need to consider token size, especially if you are passing the token in the URL. Even if you are not passing tokens in the URL, there are other things that you will also need to consider - such as the potential of exposing sensitive PII (Personally Identifiable Information).
:::

For [API level integration](#api-integration), Auth0 supports a couple of differnt options using the Access Token. Again, you will need to decide what information will be required in order for your API to make access control decisions, and then your API will need to enforce that access control by checking the Access Token claims.

In addition, Auth0 has out-of-box support for [Role Based Access Control (RBAC)](#role-based-access-control-(rbac)). Role-based access control (RBAC) refers to the idea of assigning permissions to users based on their role within an organization. RBAC provides for fine-grained control and offers a simple, manageable approach to access management that is less prone to error than assigning permissions and/or custom claims to users individually. 

## Application Integration

In this scenario, your Auth0 tenant provides a token as an indicator of authorized access to an application. For applications utilizing OpenID Connect ([OIDC](/protocols/oidc)) - the industry-standard protocol we've found most used when it comes to customer facing applications - this would be an ID Token, typically expressed as a [JWT](/jwt).

## ID Token Claims 

Through the use of Rule extensibility, Auth0 allows you to easily [add custom claims to an ID Token](/tokens/add-custom-claims) based on a user’s metadata. Though the process of adding custom claims via Rule is streamlined, because the rules engine is flexible and allows you to write custom code you can also do things that may have negative effects. So it’s important to follow our [rules best practice](/best-practices/rules) guidance anytime you utilize this extensibility feature.

::: panel Best Practice
When you are considering adding custom claims, we recommend that you choose to store any data you may need to include within the claims in the user's `user` or `app` [Metadata](/users/concepts/overview-user-metadata). Doing so prevents you from needing to call out to an external API to fetch the data, which can negatively impact the performance and scalability of the login sequence. Remember to check out our [metadata best practices](architecture-scenarios/implementation/b2c/b2c-profile-mgmt#metadata) too.
:::

## ID Token Scopes

[OIDC Scopes](/scopes/current/oidc-scopes) are typically used by an application to authorize access to a user's details during authentication. Each of the pre-defined scopes returns the set of [standard claims](/scopes/current/oidc-scopes#standard-claims) where defined, and as described in the [OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). The scopes an application should request depend on which user attributes the application needs; once the requested scopes are authorized, the claims are returned in the ID Token and are also made available via the [/userinfo](https://auth0.com/docs/api/authentication#get-user-info) endpoint.


## API Integration

In this scenario, Auth0 provides support for both first-party and third-party applications. Acting as the authorization server, and with the approval of the user (the resource owner), your Auth0 tenant can provide an Access Token (typically expressed as a [JWT](/jwt)) to either a first-party or a third-party application (client) so that it can access a protected resources hosted by a resource server on behalf of the resource owner. The issued Access Token typically being passed as the Bearer token in the HTTP Authorization header sent to an [API](/api-auth/why-use-access-tokens-to-secure-apis).

Whether you have a single API, or a suite of microservice APIs, you can leverage the Access Tokens that Auth0 can provide in order to [secure access to your service(s)](/api-auth/why-use-access-tokens-to-secure-apis). Though relatively easy to set this up - via the [Auth0 Dashboard](/apis) and also via the [Auth0 Management API] (/api/management/v2#!/Resource_Servers/post_resource_servers) - it's important to review the different application scenarios and API layouts to determine the best architecture for your system.

OAuth2 was designed specifically with third-party access in mind, that is: a user (resource owner) who wants to use an application (a client) that does not belong to the same organization as the service that provides the user's data (the reseource server). In this scenario, when the application needs to access data that the user owns it redirects to the organization where the user’s data resides, which in turn authenticates the user and then prompts the user to give the application permission to access their data. This prompting for permission is typically referred to as providing "[consent](/api-auth/user-consent)" and is a large part of what providing support for ["third party" application interaction](/scopes/current/api-scopes#example-an-api-called-by-a-third-party-application) entails.

If you are planning to integrate third-party applications, then it's important you [mark them as third-party] (/api-auth/user-consent) early on so that Auth0 will handle prompting for user consent (using the scopes that those applications request as pat of the consent message).

On the other hand however, if your organization "owns" the application(s), the user data itself and the API(s) through which that is accessed, then consent is not typically required as the interactions are all [“first-party”](/scopes/current/api-scopes#example-an-api-called-by-a-first-party-application). If you're only creating first-party applications, then you can ensure that you are not presenting your users with any "consent" screen(s) by [allowing user consent to be skipped](/apis#api-settings) as part of any resource server definition.

::: warning
Though you can configure your applications to be first-party, and configure your APIs to allow first-party clients to ignore consent, if you are using `localhost` Auth0 can not verify that this application is truly a first-party app so your users will be prompted for consent anyway. To work around this constraint when testing on your local machine during development simply create a [fake local hostname and use that instead](https://community.auth0.com/t/how-do-i-skip-the-consent-page-for-my-api-authorization-flow/6035).
:::

Alternatively, you may have data relating to a user for which additional [functionality is provided](/scopes/current/api-scopes#example-an-api-called-by-a-back-end-service) and for which explicit user consent cannot be obtained (i.e. there is no authenticated user per-se who can provide it). In this scenario the [list of applications for which Client Credentials grant is enabled](docs/flows/concepts/client-credentials) can be defined. 


### Access Token Claims


### Access Token Scopes

[OAuth2 Scopes](/scopes/current/api-scopes) are typically used as the mechanism by which an API can determine what actions can be performed on behalf of a user. Scopes can be added on a per API basis (via either the Auth0 Dashboard or the Auth0 Management API) in order to [define specifc access permissions](/dashboard/guides/apis/add-permissions-apis), and can be manipulated via Auth0 Rule extensibility  Again, the scopes an application should request should depend on what functionality the application requires; once the requested scopes are authorized, they will be returned in the access token and can be subsequently verified by the [API](/api-auth/tutorials/verify-access-token).


## Role Based Access Control (RBAC)

Role-based access control (RBAC) refers to the idea of assigning authorization permissions to users based on their role within an organization. RBAC provides for more fine-grained control and offers a simple, manageable approach to access management that is less prone to error than assigning permissions to users individually.

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
