So far, the API is only checking for whether the incoming request has valid authentication information. This solves the case of restricting endpoints such that only authenticated users can access them; however, it doesn't currently provide any way to check for **authorization**.

Authorization can be added to your authentication flow by use of a **scope** claim in the Access Token which provides some indication of what that token allows access to. For more information on how to add scopes to an Access Token, see the [Scopes documentation](/scopes).
