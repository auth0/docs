It’s important to start by distinguishing between Authentication, Authorization, and Access Control. Your Auth0 tenant (your Authorization Server) is typically responsible for Authentication and some or all of Authorization and Access Control. Additionally, an Application or API itself may need to share Access Control responsibility, especially where contextual access is required: 

* **Authentication**: the process of determining if a principal (a user or application) is who or what they say they are.
* **Authorization**: the proceess of determining what is allowed, based on the principal, the consent they provide, what permissions they have been given, and/or the set of contextually specific access criteria.
* **Consent**: what can be done on the behalf of a user principal (subject) or, in the case of an application principal authenticating via [Client Credentials](/flows/concepts/client-credentials) grant, what an administrative authority has authorized an application to do.
* **Access Control**: the access that is permitted. In general we typically group different types of access control into three distinct categories so that it's easier to understand a) which actor is responsible for storing the information, b) which actor is responsible for making decisions, and c) which is responsible for enforcing the restrictions. 
  
  * The first category of access control is where access is either granted or denied to an application or an API in its entirety. Both the data required to enforce this and the enforcement process is typically defined in the context of the Authorization Server For example, by using [`app_metadata`](/users/concepts/overview-user-metadata) associated with a user and a [Rule](/rules) defined in your Auth0 tenant.
    
  * The second category is where access is either granted or denied to a specific subset of application or API functionality. The data required to enforce this is typically stored in the Authorization Server For example, by using [`app_metadata`](/users/concepts/overview-user-metadata) on a user in your Auth0 tenant with the enforcement process performed in the application or API itself. In this scenario, the data is typically communicated as one or more custom claims in an [`id`](/tokens/id-token) or [`access`](/tokens/overview-access-tokens) token.
    
  * The third category is where access is either granted or denied depending on what the principal (subject) can operate on within the context of an application or API. Both the data required to enforce this, and the enforcement process is typically defined in the context of the application or API. In this scenario, the data communicated as one or more custom claims in an [`id`](/tokens/id-token) or [`access`](/tokens/overview-access-tokens) token may be consumed with or without data from an external source that is not Auth0.

In addition, Role-based Access Control (RBAC) and Attribute-based Access Control (ABAC) mechanisms can be applied in any of the Access Control categories described above. Whatever your use case then, there are a number of things you will want to consider when looking at the functionality and workflow you require:

* Are there scenarios where access to an entire application or API should be rejected?
* Will you be providing APIs that can be accessed by third-party applications?
* Will your APIs also be accessed by your own (first-party) applications?
* Will your application be calling a third-party API?
* Should your applications and/or APIs be enforcing access control based on user information?
 
Auth0 supports access restriction for either applications or APIs based on certain conditions. In certain scenarios, you may want to create a [Rule](/rules) that returns an `UnauthorizedError` when, for example, a user attempts access to an application or an API at an incorrect time (as described in this [example](/authorization/concepts/sample-use-cases-rules#allow-access-only-on-weekdays-for-a-specific-application)) - or if the user doesn’t have the right claim(s) contained in their [`app_metadata`](/users/concepts/overview-user-metadata). For an _application_ using <dfn data-key="openid">[OpenID Connect (OIDC)](/protocols/oidc)</dfn>, this would prevent the allocation of the [ID Token](/tokens/id-token) used to authorize access. Similarly, for an _API_, allocation of any OAuth2 <dfn data-key="Access Token">[Access Token](/tokens/overview-access-tokens)</dfn> (used when [calling the API](/api-auth/why-use-access-tokens-to-secure-apis)), could be prevented as described in this [example](/api-auth/restrict-access-api#example-deny-access-to-anyone-calling-the-api).

::: panel Best Practice
In the main, we have found that [OIDC](/protocols/oidc) is the most commonly used industry-standard protocol used by Auth0 customers when it comes to authentication in their applications. We have also found that, even though [OAuth2](protocols/oauth2) was created as a delegation protocol, it is commonly used within first party applications when there is an API that does not have a shared session with the application.
:::

Auth0 also can provide the information needed so that an application or API can enforce restrictions. For [application level integration](#application-integration), Auth0 allows you to add [custom claims](#id-token-claims) to an ID Token, which your application can then verify and subsequently use to enforce access control. In this case you will need to decide what information you require for your application to make access control decisions.

::: warning
ID Tokens should only be used within the application itself, it should not be used as a Bearer token to call an API.  If you need a token to call an API you should request an Access token instead.  See [API level integration](#api-integration) for more information.
:::

::: warning
When deciding what data to include in your ID token and/or access token, consider token size, especially if you are passing the token in the URL. Even if you are not passing tokens in the URL, you will also need to consider the potential of exposing sensitive PII (Personally Identifiable Information). Token information is not encrypted, so although it isn't generally a security issue for an ID token to be leaked, it can become a privacy issue depending on the data that is included in the token.
:::

For [API level integration](#api-integration), Auth0 supports both [custom claims](#access-token-claims) as well as [scope](#access-token-scopes) re-configuration, both within the context of an Access Token. Again, you will need to decide what information will be required in order for your API to make access decisions, and your API will need to enforce that by validating the contents of the Access Token.
