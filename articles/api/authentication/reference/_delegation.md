# Delegation

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/delegation
Content-Type: 'application/json'
{
  "client_id":  "${account.client_id}",
  "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
  "id_token" or "refresh_token" : "",
  "target":     "",
  "scope":      "",
  "api_type":   "",
  ""
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/delegation' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.client_id}", "grant_type":"urn:ietf:params:oauth:grant-type:jwt-bearer", "id_token or refresh_token":"", "target":"", "scope":"", "api_type":""}'
```

```javascript
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '{YOUR APP URL}',
    responseType: 'token'
  });
</script>

//get a delegation token
var options = {
  id_token: "your id token", // The id_token you have now
  api: 'firebase', // This defaults to the first active addon if any or you can specify this
  "scope": "openid profile"         // default: openid
};

auth0.getDelegationToken(options, function (err, delegationResult) {
    // Call your API using delegationResult.id_token
});

//get the token for another API or App
var options = {
  id_token: "your id token", // The id_token you have now
  api: 'auth0' // This is default when calling another app that doesn't have an addon
  targetClientId: 'The other client id'
};

auth0.getDelegationToken(options, function (err, delegationResult) {
  // Call your API using delegationResult.id_token
});
```

> RESPONSE SAMPLE:

```json
{
  "token_type": "Bearer",
  "expires_in": 36000,
  "id_token": "eyJ0eXAi..."
}
```

<%= include('../../../_includes/_http-method', {
  "http_method": "POST",
  "path": "/delegation",
  "link": "#delegation"
}) %>

Delegated authentication is used when an entity wants to call another entity on behalf of the user. For example, a user logs into an application and then calls an API. The application exchanges the token of the logged in user with a token that is signed with the API secret to call the API.

Given an existing token, this endpoint will generate a new token signed with the `target` client's secret. This is used to flow the identity of the user from the application to an API or across different APIs that are secured with different secrets.

### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id`      | the `client_id` of your client |
| `grant_type`     | |
| `id_token` or `refresh_token` | |
| `target `        | the target `client_id` |
| `scope `         | `openid` or `openid profile email` |
| `api_type`       | |


### Remarks

- The `profile` scope value requests access to the End-User's default profile Claims, which are: `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, and `updated_at`.
- The `email` scope value requests access to the `email` and `email_verified` Claims.

### More Information
- [Delegation Tokens](/tokens/delegation)
