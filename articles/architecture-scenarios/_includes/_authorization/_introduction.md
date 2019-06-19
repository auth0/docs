It’s important to start by distinguishing between Authentication, Authorization, and Access Control. Your Auth0 tenant (your Authorization Server) is typically responsible for Authentication and some or all of Authorization. Access Control however must be the responsibility of the Application or API itself, because access control is almost always contextual: 

* **Authentication**: the process of determining if a principal - a user or application - is who/what they say they are.
* **Authorization**: the proceess of determining what is allowed, based on the principal, the consent they provide, what permissions they have been given, and/or the set of contextually specific access criteria. Broadly speaking, authorization in Auth0 breaks down into the following categories:
  * **Consent**: what can be done on the behalf of a user principal (subject) or, in the case of an application principal authenticating via [Client Credentials](/flows/concepts/client-credentials) grant, what an administrative authority has authorized an application to do.
  * **Access Control**: the access that is permitted. In general this can be thought of as breaking down into three sub-categories of granularity: 
  
    * **Coarse grained Access Control**. This is where access is either granted or denied to an Application or an API in its entirety. Both the data required to enforce this, and the enforcement process, is defined in the context the Authorization Server (e.g. via use of [`app_metadata`](/users/concepts/overview-user-metadata) associated with a user, and a [Rule](/rules) defined in your Auth0 tenant). Coarse grained access control is effectively "_identity as the new perimeter_".
    
    * **Medium grained Access Control**. This is where access is either granted or denied to a specific subset of Application or API functionality. The data required to enforce this is typically stored in the Authorization Server (i.e. as [`app_metadata`](/users/concepts/overview-user-metadata) on a user in your Auth0 tenant), and the enforcement process is performed in the Application or API itself. In this sceanario, the data is typically communicated as one or more custom claims in an [`id`](/tokens/id-token) or [`access`](/tokens/overview-access-tokens) token.
    
    * **Fine grained Access Control**. Again, this is where access is either granted or denied depending on what the principal (subject) can operate on within the context of an Application or API. However both the data required to enforce this, and the enforcement process, is defined in the context of the Application or API. In this scenario, the data communicated as one or more custom claims in an [`id`](/tokens/id-token) or [`access`](/tokens/overview-access-tokens) token may be consumed, with or wthout data from an external source that is not Auth0.

In addition, Role-based Access Control (a.k.a. [RBAC](#role-based-access-control-rbac-)) and Attribute-based Access Control (a.k.a. ABAC) mechanisms can be applied in any of the Access Control categories described above. Whatever your use case then, there are a number of things you will want to consider when looking at the functionality and workflow you require:

* Are there scenarios where access to an entire application or API should be rejected?
* Will I be providing APIs that can be accessed by third-party applications?
* Will my APIs also be accessed by our own (first-party) applications?
* Will my application be calling a third-party API?
* Should my applications and/or APIs be enforcing access control based on medium or fine-grained permissions?
 
Auth0 provides multi-grained authorization by restricting access to certain applications or APIs based on certain conditions. In a coarse-grained authorization scenario, a [Rule](/rules) can be built that returns an `UnauthorizedError` when, for example, a user attempts access to an application or an API at an incorrect time (as described in this [example](/authorization/concepts/sample-use-cases-rules#allow-access-only-on-weekdays-for-a-specific-application)) - or if the user doesn’t have the right claim(s) contained in their [`app_metadata`](/users/concepts/overview-user-metadata). For an _application_ using <dfn data-key="openid">[OpenID Connect (OIDC)](/protocols/oidc)</dfn>, this would prevent the allocation of the [ID Token](/tokens/id-token) used to authorize access. Similarly, for an _API_, allocation of any OAuth2 [Access Tokens](/tokens/overview-access-tokens) (used when [calling the API](/api-auth/why-use-access-tokens-to-secure-apis)), could be prevented as described in this [example](/api-auth/restrict-access-api#example-deny-access-to-anyone-calling-the-api).

::: panel Best Practice
In the same way that [OIDC](/protocols/oidc) is the most commonly used industry-standard protocol for authentication in customer facing applications, we find that [OAuth2](protocols/oauth2) is the most commonly used industry-standard protocol for authorization.
:::

Auth0 also can provide the authorization information needed so that the application or API can apply medium or fine-grained access control. For [application level integration](#application-integration), Auth0 allows you to add [custom claims](#id-token-claims) to an ID Token, which your application can then verify and subsequently use to enforce access control. In this case you will need to decide what information you require for your application to make access control decisions.

::: warning
When deciding what data to include in OIDC tokens, consider token size, especially if you are passing the token in the URL. Even if you are not passing tokens in the URL, you will also need to consider the potential of exposing sensitive PII (Personally Identifiable Information). Token information is not encrypted, so although it isn't generally a security issue for an ID token to be leaked, it can become a privacy issue depending on the data that is included in the token.
:::

For [API level integration](#api-integration), Auth0 supports both [custom claims](#access-token-claims) as well as [scope](#access-token-scopes) re-configuration, both within the context of an Access Token. Again, you will need to decide what information will be required in order for your API to make access control decisions, and then your API will need to enforce that access control by validating the contents of the Access Token.
