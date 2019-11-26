::: warning
Auth0 recommends that you use the Resource Owner Password Grant (ROPG) method **only** in rare cases such as: 
- The application is **absolutely trusted** with the user's credentials. 
- When using a redirect-based flow is not possible. 

If redirects are possible in your application, you should use
* For confidential clients, use the [Authorization Code Flow](/flows/concepts/auth-code)
* For public clients, use the [Authorization Code Flow with PKCE](/flows/concepts/auth-code-pkce)
* For[Single-Page Applications](/flows/concepts/implicit) and [Native/Mobile Apps](/flows/concepts/auth-code-pkce), use web flows.
:::