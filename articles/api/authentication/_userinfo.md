# User Profile
## Get User Info

```http
GET https://${account.namespace}/userinfo
Authorization: 'Bearer {ACCESS_TOKEN}'
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/userinfo' \
  --header 'Authorization: Bearer {ACCESS_TOKEN}' \
  --header 'Content-Type: application/json'
```

```javascript
// Script uses auth0.js. See Remarks for details.
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  // Initialize the Auth0 application
  var webAuth = new auth0.WebAuth({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}'
  });

  // Parse the URL and extract the Access Token
  webAuth.parseHash(window.location.hash, function(err, authResult) {
    if (err) {
      return console.log(err);
    }
    webAuth.client.userInfo(authResult.accessToken, function(err, user) {
        // This method will make a request to the /userinfo endpoint
        // and return the user object, which contains the user's information,
        // similar to the response below.
    });
  });
</script>
```

> RESPONSE SAMPLE:

```json
{
  "sub": "248289761001",
  "name": "Jane Josephine Doe",
  "given_name": "Jane",
  "family_name": "Doe",
  "middle_name": "Josephine",
  "nickname": "JJ",
  "preferred_username": "j.doe",
  "profile": "http://exampleco.com/janedoe",
  "picture": "http://exampleco.com/janedoe/me.jpg",
  "website": "http://exampleco.com",
  "email": "janedoe@exampleco.com",
  "email_verified": true,
  "gender": "female",
  "birthdate": "1972-03-31",
  "zoneinfo": "America/Los_Angeles",
  "locale": "en-US",
  "phone_number": "+1 (111) 222-3434",
  "phone_number_verified": false,
  "address": {
    "country": "us"
  },
  "updated_at": "1556845729"
}
```

<%= include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": "/userinfo",
  "link": "#get-user-info"
}) %>

Given the Auth0 <dfn data-key="access-token">Access Token</dfn> obtained during login, this endpoint returns a user's profile.

This endpoint will work only if `openid` was granted as a <dfn data-key="scope">scope</dfn> for the Access Token. The user profile information included in the response depends on the scopes requested. For example, a scope of just `openid` may return less information than a a scope of `openid profile email`.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `access_token` <br/><span class="label label-danger">Required</span> | The Auth0 Access Token obtained during login. |


### Remarks

- The sample auth0.js script uses the library version 8. If you are using auth0.js version 7, please see this [reference guide](/libraries/auth0js/v7).
- The auth0.js `parseHash` method, requires that your tokens are signed with `RS256`, rather than `HS256`.
- To return `user_metadata` or other custom information from this endpoint, add a custom claim to the ID token with an [Action](/secure/tokens/json-web-tokens/create-custom-claims#create-custom-claims). For more information refer to [User profile claims and scope](/api-auth/tutorials/adoption/scope-custom-claims).
- This endpoint will return three HTTP Response Headers, that provide relevant data on its rate limits:
  - `X-RateLimit-Limit`: Number of requests allowed per minute.
  - `X-RateLimit-Remaining`: Number of requests available. Each new request reduces this number by 1. For each minute that passes, requests are added back, so this number increases by 1 each time.
  - `X-RateLimit-Reset`: Remaining time until the rate limit (`X-RateLimit-Limit`) resets. The value is in [UTC epoch seconds](https://en.wikipedia.org/wiki/Unix_time).
- The `Email` claim returns a snapshot of the email at the time of login
- Standard claims (other than `email`) return the latest value (unless the value comes from an external IdP)
- Custom claims always returns the latest value of the claim
- To access the most up-to-date values for the `email` or custom claims, you must get new tokens. You can log in using silent authentication (where the `prompt` parameter for your call to the [`authorize` endpoint](/api/authentication#authorization-code-grant) equals `none`)
- To access the most up-to-date values for standard claims that were changed using an external IdP (for example, the user changed their email address in Facebook)., you must get new tokens. Log in again using the external IdP, but *not* with silent authentication.

### Learn More

- [Auth0.js v8 Reference: Extract the authResult and get user info](/libraries/auth0js#extract-the-authresult-and-get-user-info)

- [Auth0 API Rate Limit Policy](/policies/rate-limits)
