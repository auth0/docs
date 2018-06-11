---
description: How to blacklist user attributes that you do not want to save in Auth0 databases
toc: true
crews: crew-2
tags:
  - security
  - security-bulletins
  - blacklisting
  - users
---
# Blacklist User Attributes

If there are user fields that should not be stored in Auth0 databases due to privacy reasons, you can blacklist them.

## Use the Management API

To blacklist attributes make a `PATCH` call to the [Update Connection](/api/management/v2#!/Connections/patch_connections_by_id) endpoint of the Management API.

### Step 1. Get a token

First, you need a valid Access Token in order to access that endpoint. The token must include the `update:connections` scope. 

You can either get one manually from the Dashboard, or automate the process (for example, by building a simple command line tool that generates tokens). For detailed steps on how to do either, refer to  [The Auth0 Management APIv2 Token](/api/management/v2/tokens).

### Step 2. Call the API

One you have the token (and the list of attributes to be blacklisted), you are ready to call the API. 

Here is a sample HTTP request that blacklists two attributes: `ethnicity` and `gender`.


```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/connections/YOUR_CONNECTION_ID",
  "httpVersion": "HTTP/1.1",
  "cookies": [],
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_TOKEN" }
  ],
  "queryString" : [],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"options\": {\"non_persistent_attrs\": [\"ethnicity\", \"gender\"]}\", \"enabled_clients\": [\"\"]}"
  },
  "headersSize" : -1,
  "bodySize" : -1,
  "comment" : ""
}
```

Where:

- `YOUR_CONNECTION_ID` is the Id of the connection for which these attributes will be blacklisted
- `YOUR_TOKEN` is the Access Token you got in the previous step
- The `options.non_persistent_attrs` object holds an array of the attributes that will be blacklisted

## Limitations

- Only root fields (such as `user.name` or `user.email`) can be blacklisted
- When you blacklist attributes, they will be still be available via rules and outgoing tokens. However, if any of the following apply, the blacklist attributes will **not** be included in tokens:
  - You have enabled multifactor authentication
  - You have performed a redirect via rules
  - Your app is using delegation (and you haven't set `scope = passthrough`)
  - Your app is using impersonation
  - You have enabled the **Use Auth0 instead of the IdP to do Single Sign On** setting
- For SAMLP connections, if you enable Debug mode, your logs will contain information on the blacklisted attributes

:::panel Working around the limitations
If any of these limitations are unacceptable, you can write a [rule](/rules) to encrypt the data and have the data persist to the `user.app_metadata` object.
:::
