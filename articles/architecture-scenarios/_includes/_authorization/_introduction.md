Let's start by taking a step back and talking about Access Control. There isn't one clear cut definition of Access Control in the industry, but if you spend some time searching and reading you'll see that most authoritative sources agree that it is the umbrella concept that puts all of Authentication, Authorization, Consent, and Policy Enforcement together to ensure that only the right people and services have access to your applications and APIs.  Next, let's look more closely into the distinctions between Authentication, Authorization, Consent, and Policy Enforcement. Your Auth0 tenant (your Authorization Server) is typically responsible for Authentication and Consent, and some or all of Authorization and Policy Enforcement. Additionally, an Application or API itself almost always is the primary enforcer of policies, especially where contextual access is required:

* **Authentication**: the process of determining if a principal (a user or application) is who or what they say they are.
* **Authorization**: the process of determining what is allowed, based on the principal, what permissions they have been given, and/or the set of contextually specific access criteria.
* **Consent**: what permissions the user (Resource Owner) has given permission to an application to do on its behalf. This is generally a requirement of delegated authorization.  The user has to give permission to the Client to access the user's data in a different system.
* **Policy Enforcement**: The act of enforcing the policies of the application or API, rejecting or allowing access based on a user's authentication and/or authorization information.

In general we typically group different types of access control into three distinct categories so that it's easier to understand a) which actor is responsible for storing the information, b) which actor is responsible for making decisions, and c) which is responsible for enforcing the restrictions.

* The first category is where access is either granted or denied to an application or an API in its entirety. Both the data required to enforce this and the enforcement process is typically defined in the context of the Authorization Server For example, by using [`app_metadata`](/users/concepts/overview-user-metadata) associated with a user and a [Rule](/rules) defined in your Auth0 tenant.

* The second category is where access is either granted or denied to a specific subset of application or API functionality. The data required to enforce this is typically stored in the Authorization Server For example, by using [`app_metadata`](/users/concepts/overview-user-metadata) on a user in your Auth0 tenant with the enforcement process performed in the application or API itself. In this scenario, the data is typically communicated as one or more custom claims in an [`id`](/tokens/concepts/id-tokens) or [`access`](/tokens/concepts/access-tokens) token.

* The third category is where access is either granted or denied depending on what the principal (subject) can operate on within the context of an application or API. Both the data required to enforce this, and the enforcement process is typically defined in the context of the application or API. In this scenario, the data communicated as one or more custom claims in an [`id`](/tokens/concepts/id-tokens) or [`access`](/tokens/concepts/access-tokens) token may be consumed with or without data from an external source that is not Auth0.

In addition, Role-based Access Control (RBAC) and Attribute-based Access Control (ABAC) mechanisms can be applied in any of the Access Control categories described above. Whatever your use case then, there are a number of things you will want to consider when looking at the functionality and workflow you require:

* Are there scenarios where access to an entire application or API should be rejected?
* Will you be providing APIs that can be accessed by third-party applications?
* Will your APIs also be accessed by your own (first-party) applications?
* Will your application be calling a third-party API?
* Should your applications and/or APIs be enforcing access control based on user claims?
<% if (platform === "b2b") { %>
* What if I need to know which organization an access token or id token is associated with?
<%  } %>

Auth0 supports access restriction for either applications or APIs based on certain conditions. In certain scenarios, you may want to create a [Rule](/rules) that returns an `UnauthorizedError` when, for example, a user attempts access to an application or an API at an incorrect time (as described in this [example](/authorization/concepts/sample-use-cases-rules#allow-access-only-on-weekdays-for-a-specific-application)) - or if the user doesn’t have the right claim(s) contained in their [`app_metadata`](/users/concepts/overview-user-metadata). For an _application_ using <dfn data-key="openid">[OpenID Connect (OIDC)](/protocols/oidc)</dfn>, this would prevent the allocation of the [ID Token](/tokens/concepts/id-tokens) used to authorize access. Similarly, for an _API_, allocation of any OAuth2 <dfn data-key="Access Token">[Access Token](/tokens/concepts/access-tokens)</dfn> (used when calling the API), could be prevented as described in this [example](/api-auth/restrict-access-api#example-deny-access-to-anyone-calling-the-api).

::: panel Best Practice
In the main, we have found that [OIDC](/protocols/oidc) is the most commonly used industry-standard protocol used by Auth0 customers when it comes to authentication in their applications. We have also found that, even though [OAuth2](protocols/oauth2) was created as a delegation protocol, it is commonly used within first party applications when there is an API that does not have a shared session with the application.
:::

Auth0 also can provide the information needed so that an application can enforce restrictions. For [application level integration](#application-integration), Auth0 allows you to add [custom claims](#id-token-claims) to an ID Token, which your application can then verify and subsequently use to perform policy enforcement. In this case you will need to decide what information you require for your application to make enforcement decisions.  If you need to make decisions at an API instead of in your application, you will likely need to use an Access Token instead of an ID token.  Continue reading for more information.

::: warning
When deciding what data to include in your ID token and/or access token, consider token size, especially if you are passing the token in the URL. Even if you are not passing tokens in the URL, you will also need to consider the potential of exposing sensitive PII (Personally Identifiable Information). Token information is not encrypted, so although it isn't generally a security issue for an ID token to be leaked, it can become a privacy issue depending on the data that is included in the token.
:::

For [API level integration](#api-integration), Auth0 supports both [custom claims](#access-token-claims) as well as [scope](#access-token-scopes) re-configuration, both within the context of an Access Token. Again, you will need to decide what information will be required in order for your API to make access decisions, and your API will need to enforce that by validating the contents of the Access Token.

::: panel Best Practice
When deciding whether you should use permissions through custom claims or scopes, you should make sure you understand the nature and purpose of scopes.  There is a nice [blog post](https://auth0.com/blog/on-the-nature-of-oauth2-scopes/) on that which is easy to read and helps clear up the topic.
:::

<% if (platform === "b2b") { %>
For multi-organization scenarios, it can often be important to know which organization an access token (or even an ID token) applies to. Taking care to follow the [best practices](#organization-data-in-an-access-token) can save you time and effort. 
<% } %>
