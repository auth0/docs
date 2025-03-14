In this scenario, your Auth0 tenant provides a token as an indicator of authorized access to an application. For applications utilizing <dfn data-key="openid">[OpenID Connect (OIDC)](/protocols/oidc)</dfn>, the industry-standard protocol we typically find most utilized when it comes to customer facing applications, this would be an ID Token expressed as a [JWT](/tokens/concepts/jwts).

### ID Token claims 

Using Rule extensibility, Auth0 allows you to easily [add custom claims to an ID Token](/scopes/current/sample-use-cases#add-custom-claims-to-a-token) based on, for example, a user’s [Metadata](/users/concepts/overview-user-metadata) content. Your application can then verify the ID Token for the necessary claims, and either allow or prevent access to certain functionality as required. Note that though the process of adding custom claims via Rule is streamlined, the Rule engine is flexible and allows you to write custom code that may have negative effects. Therefore it’s important to follow our [rules best practice](/best-practices/rules) guidance anytime you use this extensibility feature.  

::: panel Best Practice
When you are considering adding custom claims, we recommend that you store any access control data you may need to include within claims as part of the user's [`app_metadata`](/users/concepts/overview-user-metadata). Firstly, this prevents you from needing to call an external API to fetch the data, which can negatively impact the performance and scalability of the login sequence. Secondly `app_metadata` **cannot** be modified by a user - so the user cannot directly circumvent any access control restrictions by modifying their own metadata. Also remember to check out our [metadata best practices](architecture-scenarios/implementation/${platform}/${platform}-profile-mgmt#metadata) guidance too.
:::

<% if (platform === "b2b") { %>
If you are creating different instances of your application for your customer organizations, a common practice is to create a custom claim in your ID token to represent the user's organization. For example, `context.idToken["http://yourdomain.com/claims/organization"]= "organization A";`
<%  } %>

### ID Token scopes

[OIDC Scopes](/scopes/current/oidc-scopes) are typically used by an application to obtain consent for authorized access to a user's details during authentication. Each of the pre-defined scopes returns the set of [standard claims](/scopes/current/oidc-scopes#standard-claims) where defined, and as described in the [OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). The scopes an application requests depend on which user attributes the application needs. Once the requested scopes are authorized by the user, the claims are returned in the ID Token and are also made available via the [/userinfo](https://auth0.com/docs/api/authentication#get-user-info) endpoint.
