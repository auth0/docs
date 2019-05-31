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

* **Authentication**: the process of determining if a user is who they say they are.
* **Authorization**: the proceess of determining what is allowed, based on who a user is, what permissions they have been given, and/or the consent they provide.
* **Access Control**: the process of limiting the specific set of actions, based on the combination of who the user is, what is allowed, and the set of contextually specific access criteria.

Access Control is essentially a super-set of the authorization process; authorization in it's fundemantal form can be thought of as a coarse-grained operation, whereas Access Control provides much more fine-grained control. Whatever your use case, there are a number of things you will want to consider when looking at functionality and workflow:

* Are there scenarios where access to an application or API should be rejected?
* Will I be providing APIs that can be accessed by third-party applications?
* Will my APIs also be accessed by our own (first-party) applications?
* Will my application be calling a third-party API?
* Should my applications and/or APIs be enforcing role or permission based access control?
 
Auth0 provides coarse-grained authorization by restricting access to certain applications or APIs based on certain conditions. In a coarse-grained authorization scenario, a [Rule](/rules) can be built that returns an `UnauthorizedError` when, for example, a user attempts access to an application or an API at an incorrect time (as described in this [example](/authorization/concepts/sample-use-cases-rules#allow-access-only-on-weekdays-for-a-specific-application)) - or if the user doesn’t have the right claim(s) contained in their [Metadata](/users/concepts/overview-user-metadata). For an _application_ using OpenID Connect ([OIDC](/protocols/oidc)), this would prevent the allocation of the [ID Token](/tokens/id-token) used to authorize access. Similarly, for an _API_, allocation of any OAuth2 [Access Tokens](/tokens/overview-access-tokens) (used when [calling the API](/api-auth/why-use-access-tokens-to-secure-apis)), could be prevented as described in this [example](/api-auth/restrict-access-api#example-deny-access-to-anyone-calling-the-api).

::: panel Best Practice
In the same way that [OIDC](/protocols/oidc) is the most commonly used industry-standard protocol for authentication in customer facing applications, we find that [OAuth2](protocols/oauth2) is the most commonly used industry-standard protocol for authorization.
:::

Auth0 also can provide the authorization information needed so the application or API can apply fine-grained access control. For [application level integration](#application-integration), Auth0 allows you to add [custom claims](#id-token-claims) to an ID Token, which your application can then verify and subsequently use to enforce access control. In this case you will need to decide what information you require for your application to make access control decisions.

::: warning
When deciding what data to include in OIDC tokens, consider token size, especially if you are passing the token in the URL. Even if you are not passing tokens in the URL, you will also need to consider the potential of exposing sensitive PII (Personally Identifiable Information). Token information is not encrypted, so although it isn't generally a security issue for an ID token to be leaked, it can become a privacy issue depending on the data that is included in the token.
:::

For [API level integration](#api-integration), Auth0 supports both [custom claims](#access-token-claims) as well as [scope](#access-token-scopes) re-configuration, both within the context of an Access Token. Again, you will need to decide what information will be required in order for your API to make access control decisions, and then your API will need to enforce that access control by validating the contents of the Access Token.

Additionally, Auth0 has out-of-box support for Role Based Access Control ([RBAC](/authorization/concepts/rbac)). RBAC refers to assigning permissions to users based on their role within an organization. RBAC provides for simpler fine-grained access control by offering a more manageable approach that is less prone to error. 

## Application integration

In this scenario, your Auth0 tenant provides a token as an indicator of authorized access to an application. For applications utilizing OpenID Connect ([OIDC](/protocols/oidc)) - the industry-standard protocol we typically find most utilized when it comes to customer facing applications - this would be an ID Token expressed as a [JWT](/jwt).

### ID Token claims 

Using Rule extensibility, Auth0 allows you to easily [add custom claims to an ID Token](/tokens/add-custom-claims) based on, for example, a user’s [Metadata](/users/concepts/overview-user-metadata) content. Your application can then verify the ID Token for the necessary claims, and either allow or prevent access to certain functionality as required. Note that though the process of adding custom claims via Rule is streamlined, the Rule engine is flexible and allows you to write custom code that may have negative effects. Therefore it’s important to follow our [rules best practice](/best-practices/rules) guidance anytime you use this extensibility feature.  

::: panel Best Practice
When you are considering adding custom claims, we recommend that you store any data you may need to include within the claims in the user's `user` or `app` [Metadata](/users/concepts/overview-user-metadata). This prevents you from needing to call an external API to fetch the data, which can negatively impact the performance and scalability of the login sequence. Remember to check out our [metadata best practices](architecture-scenarios/implementation/b2c/b2c-profile-mgmt#metadata) guidance too.
:::

### ID Token scopes

[OIDC Scopes](/scopes/current/oidc-scopes) are typically used by an application to authorize access to a user's details during authentication. Each of the pre-defined scopes returns the set of [standard claims](/scopes/current/oidc-scopes#standard-claims) where defined, and as described in the [OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). The scopes an application requests depend on which user attributes the application needs.  Once the requested scopes are authorized by the user, the claims are returned in the ID Token and are also made available via the [/userinfo](https://auth0.com/docs/api/authentication#get-user-info) endpoint.


## API integration

In this scenario, Auth0 provides support for both first-party and third-party applications. Acting as the authorization server, and with the approval of the user (the resource owner), your Auth0 tenant can provide an Access Token (typically expressed as a [JWT](/jwt)) to an application (client) so that it can access a protected resources hosted by a resource server on behalf of the resource owner. The issued Access Token typically is passed as the Bearer token in the HTTP Authorization header sent to an [API](/api-auth/why-use-access-tokens-to-secure-apis).

Whether you have a single API, or perhaps a suite of logically related [microservice APIs](/api-auth/tutorials/represent-multiple-apis), you can leverage the Access Tokens that Auth0 provides in order to [secure access to your service(s)](/api-auth/why-use-access-tokens-to-secure-apis). Though relatively easy to set this up in the [Auth0 Dashboard](/apis) or through the [Auth0 Management API](/api/management/v2#!/Resource_Servers/post_resource_servers), it's important to review the different application scenarios and API layouts to determine the best architecture for your system.

OAuth2 was designed specifically with third-party access in mind, For example, a scenario might be that a user (resource owner) wants to use an application (a client) that does not belong to the same organization as the service that provides the user's data (the reseource server). In this case, when the application needs to access data that the user owns, it redirects to the organization where the user’s data resides, which in turn authenticates the user and then prompts the user to give the application permission to access their data. This prompting for permission is referred to as providing *[consent](/api-auth/user-consent)* and is a large part of what providing support for [third party applications](/scopes/current/api-scopes#example-an-api-called-by-a-third-party-application) entails. If you are planning to integrate third-party applications, then it's important you [mark them as third-party](/api-auth/user-consent) early on so that Auth0 will handle prompting for user consent.

On the other hand, if your organization *owns* the application(s), the user data itself and the API(s) through which that data is accessed, then consent is not typically required as the interactions are all [first-party](/scopes/current/api-scopes#example-an-api-called-by-a-first-party-application). If you're only creating first-party applications, then you can ensure that you are not presenting your users with any unnecessary consent screen(s) by [allowing user consent to be skipped](/apis#api-settings) as part of any resource service definition.

::: warning
Though you can configure your applications to be first-party and subsequently configure your APIs to allow first-party clients to ignore consent, if you are using `localhost` then Auth0 cannot verify that the application is truly a first-party app so your users will be prompted for consent anyway. To work around this constraint, when testing on your local machine during development, create a [fake local hostname and use that instead](https://community.auth0.com/t/how-do-i-skip-the-consent-page-for-my-api-authorization-flow/6035).
:::

Alternatively, you may have data relating to a user for which additional [functionality is provided](/scopes/current/api-scopes#example-an-api-called-by-a-back-end-service) and for which explicit user consent cannot be obtained (i.e. there is no authenticated user who can provide it). In this scenario, a [list of applications for which Client Credentials grant is enabled](docs/flows/concepts/client-credentials) can be defined. 


### Access Token claims

As is the case with ID Tokens, you can [add custom claims to Access Tokens](/tokens/add-custom-claims) using Auth0 Rule extensibility. Once added, your API can then verify an Access Token for the necessary claims and either allow or prevent access to certain functionality as required. 

### Access Token scopes

[OAuth2 Scopes](/scopes/current/api-scopes) are typically used as the mechanism by which an API can determine what actions can be performed on behalf of a user. Scopes can be added on a per API basis to [define specifc access permissions](/dashboard/guides/apis/add-permissions-apis) in the Auth0 Dashboard or through the Auth0 Management API). Scopes can also be manipulated via Auth0 extensibility (e.g. via a Rule, as in this [example](/architecture-scenarios/spa-api/part-2#create-a-rule-to-validate-token-scopes)). The scopes an application requests for accessing an API should depend on what functionality the application needs the user to give permission for the application to use. Once the requested scopes are authorized, they will be returned in the Access Token which can be subsequently verified by said [API](/api-auth/tutorials/verify-access-token). A good example of this is when you log in to an application that is using a social provider for login: the social provider API requires that the application specifies whether the user will want the application to post items on your behalf. This allows the user to accept or deny this request. This example demonstrates how the user is delegating permission to the application - which is different than the API restricting access based on a user's role and should be handled differently.

::: panel Best Practice
Even though you have the ability to fully manipulate Access Token Scopes via Auth0 extensibility, as a security best practice you should only remove scopes which are not authorized and refrain from adding scopes that were not requested.
:::

Though scopes are often used as a way to enforce access permissions for a user, there are situations where it can become [tricky when you use them in this manner](https://auth0.com/blog/on-the-nature-of-oauth2-scopes/). We therefore recommend that you use scopes for their intended purpose (i.e. delegating permission to an application) and use [custom claims](#access-token-claims) for your role-based or other access control scenarios.

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
