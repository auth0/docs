# Blacklisting Attributes

In the event that there are user fields that should not be stored by Auth0 due to privacy reasons, you can blacklist the attributes you do not want persisting in Auth0 databases.

## Blacklisting Attributes via the Management API

You may blacklist selected attributes by making a `PATCH /api/v2/connections/{id}` call to the Management API.

To assist you in creating the appropriate request, you may use the [Update a Connection](/api/v2#!/Connections/patch_connections_by_id) section of the [APIv2 Explorer Page](/api/v2).

Prior to beginning, please ensure that you are logged in to an account that is permitted to make changes to your Auth0 configuration. This will allow the API Explorer to dynamically generate the required API token with the necessary API Key and Secret.

### Making a Test Call or Generating the cURL Command via the API Explorer Page

1.  Under Scopes, click on "update:connections" to add the scope required for this particular endpoint to the [API token](/api/v2/tokens).
2. Populate the `id` field with ID of the connection you would like to update.
3. Populate the `body` field with the JSON snippet that contains the information that will be used to update your configuration.
4.  Click on "TRY" to get a test response to your input.
5.  If you are satisfied with the results of your test call to the API, click "get curl command" to get the constructed call.

Sample cURL command:

```text
curl -H "Authorization: Bearer YOUR_TOKEN" -X PATCH  -H "Content-Type: application/json" -d '{REQUEST BODY}' https://${account.namespace}/api/v2/tenants/settings
```

When updating the JSON that will be included in the `body`, please note that the fields you would like to blacklist are included in `options`:

```text
{
  "options": {
    "non_persistent_attrs": ["", ""]
  },
  "enabled_clients": [
    ""
  ]
}
```

HTTP Request:

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/tenants/settings",
  "httpVersion": "HTTP/1.1",
  "cookies": [],
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_TOKEN" }
  ],
  "queryString" : [],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"options\": {\"non_persistent_attrs\": [\"\", \"\"]}\", \"enabled_clients\": [\"\"]}"
  },
  "headersSize" : -1,
  "bodySize" : -1,
  "comment" : ""
}
```

## Limitations

Only root fields (e.g. `user.name` or `user.email`) may be blacklisted.

When you blacklist attributes, they will be still be available via:

- rules;
- outgoing tokens.

However, if any of the following apply, the blacklist attributes will *not* be included in tokens:
- You have enabled multifactor authentication;
- You have performed a redirect via rules;
- Your app is using delegation (and you haven't set `scope = passthrough`);
- Your app is using impersonation;
- You have enabled the `Use Auth0 instead of the IdP to do Single Sign On` setting.

For `SAMLP` connections, if you enable 'Debug' mode, your logs will contain information on the blacklisted attributes.

### Working with the Limitations

If any of the above limitations regarding blacklisted attributes are unacceptable, you may write a [rule](/rules) to encrypt the data and have the data persist the `user.app_metadata` object.
