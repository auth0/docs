---
description: Explains how to use the state parameter in authentication requests to help prevent XSRF attacks.
---

# Using the State Parameter

The `state` parameter is one of the supported Auth0 [Authentication Parameters](/libraries/lock/v10/sending-authentication-parameters). This page is to help you understand how to utilize this this parameter which is useful to help mitigate [XSRF attacks](https://en.wikipedia.org/wiki/Cross-site_request_forgery) and for providing any contextual information (such as a return url) that you might need after the authentication process is finished.

For the most basic cases the `state` parameter should be a [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) as shown in the example below.  **But this field can also be a [Base64](https://en.wikipedia.org/wiki/Base64) encoded json object that can hold multiple values [such as a return URL](/tutorials/redirecting-users).**

**Here is a basic use case scenario:**

Note: Depending on the application type or framework this may be included for the developer. Also the exact structure of the requests may differ.

1. Before redirecting a request to the [IdP](/identityproviders), have the client generate a random string.

```
xyzABC123
```

2. Save this string to a variable in [web storage.](/security/store-tokens#web-storage-localstorage-sessionstorage-)

```
auth0-authorize = xyzABC123
```

3. Encode this value and set it as the `state` parameter in the request.

```
// Encode the String
var encodedString = Base64.encode(string);
tenant.auth0.com/authorize?...&state=encodedString
```

4. After the request is sent and when the user is redirected back by Auth0 to the client and the state value will be included. Note that depending on the type of connection used, this value might be in the body of the request or in the query string.

```
/login/callback?...&state=encodedString
```

5.  Decode this returned state value to compare to the previously stored value. If the values match then approve the request, else deny the request. Using this field can help prevent cross-site request forgery

```
// Decode the String
var decodedString = Base64.decode(encodedString);
if(decodedString == auth0-authorize) {
	// Authorized request
} else {
	// Request Denied
}
```
## Further Reading:

[Protecting against other common threats.](/security/common-threats)

[Using the `state` paramter for redirecting users.](/tutorials/redirecting-users#using-the-state-parameter)

