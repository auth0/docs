---
section: oauth
description: This document shows how to create a JIRA OAuth connection.
---

# Add JIRA as an OAuth Provider to Your Management Dashboard

This document will show you how to add JIRA as a Connection in you [Auth0 Management Dashboard](${manage_url}).

### Step 1: Generate an RSA Keypair

Generate an RSA keypair with the following command (or any equivalent method):

```bash
$ openssl genrsa -out EXAMPLE.key 2048 && openssl rsa -pubout -in EXAMPLE.key -out EXAMPLE.pub
```

### Step 2: Create a JIRA Application Link


From JIRA, go to **Administration** > **Application** > **Application Links**, and [create an Application Link](https://confluence.atlassian.com/display/APPLINKS-050/Application+Links+Documentation) with the following settings:

* **Application URL**: Any arbitrary URL (you can ignore the `No response was received from the URL` warnings);
* **Application Name**: Any arbitrary name;
* **Application Type**: Generic Application;
* **Create incoming link**: *checked*.

Leave all other options left blank.

To create the incoming link, use the following settings:

  * **Consumer Key**: Any arbitrary URL-friendly name (for example, `auth0-jira`)
  * **Consumer Name**: Any arbitrary name
  * **Public Key**: The RSA keypair previously generated in step 1 (copy and paste the entire `.pub` file)
  * **Consumer Callback URL**: `https://${account.namespace}/login/callback`

:::panel-info Updating Settings
If you need to modify these settings after you've created the application link, you can do so via the **Incoming Authentication** section of the link's settings.
:::

### Step 3: Add the Connection to the Auth0 Dashboard

You can do this by making the appropriate `POST` call to the [Auth0 APIv2's Connections endpoint](/api/v2#!/Connections/post_connections). Please note that doing so requires an [APIv2 token](/api/v2/tokens) with `create:connections` scope.

In the JSON below, replace all instances of the following placeholders:
  * `JIRA_URL`: The root URL of your JIRA instance (for example, `https://foo.atlassian.net`)
  * `CONSUMER_KEY`: The chosen Consumer Key for your application link
  * `CONSUMER_SECRET`: The previously generated private key (as a JSON string). You can convert `EXAMPLE.key` to a valid JSON string using the following command:

```bash
node -p -e 'JSON.stringify(require("fs").readFileSync("EXAMPLE.key").toString("ascii"));'
```

```har
{
	"method": "POST",
	"url": "https://YOURACCOUNT.auth0.com/api/v2/connections",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer ABCD"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"name\": \"jira\", \"strategy\": \"oauth1\", \"options\": { \"consumerKey\", \"CONSUMER_KEY\", \"consumerSecret\": \"CONSUMER_SECRET\", \"requestTokenURL\": \"JIRA_URL/plugins/servlet/oauth/request-token\", \"accessTokenURL\": \"JIRA_URL/plugins/servlet/oauth/access-token\", \"userAuthorizationURL\": \"JIRA_URL/plugins/servlet/oauth/authorize\", \"signatureMethod\": \"RSA-SHA1\", \"scripts\": { \"fetchUserProfile\": \"function(token, tokenSecret, ctx, cb) {\n  // Based on passport-atlassian-oauth\n  // https://github.com/tjsail33/passport-atlassian-oauth/blob/a2e444b0c3969dfd7caf4524ce4a4c379656ba2e/lib/passport-atlassian-oauth/strategy.js\n  var jiraUrl = 'JIRA_URL';\n  var OAuth = new require('oauth').OAuth;\n  var oauth = new OAuth(ctx.requestTokenURL, ctx.accessTokenURL, ctx.client_id, ctx.client_secret, '1.0', null, 'RSA-SHA1');\n  function oauthRequest(url, cb) {\n    return oauth._performSecureRequest(token, tokenSecret, 'GET', url, null, '', 'application/json', cb);\n  }\n  oauthRequest(jiraUrl + '/rest/auth/1/session', function(err, body, res) {\n    if (err) return cb(err);\n    if (res.statusCode !== 200) return cb(new Error('StatusCode: ' + r.statusCode));\n    var json;\n    try {\n      json = JSON.parse(body);\n    } catch(ex) {\n      return cb(new Error('Invalid JSON returned from JIRA', ex));\n    }\n    var profileUrl = jiraUrl + '/rest/api/2/user?expand=groups&username=' + encodeURIComponent(json.name);\n    oauthRequest(profileUrl, function(err, body, res) {\n      if (err) return cb(err);\n      if (res.statusCode !== 200) return cb(new Error('StatusCode: ' + r.statusCode));\n      try {\n        json = JSON.parse(body);\n      } catch(ex) {\n        return cb(new Error('Invalid JSON returned from JIRA', ex));\n      }\n      // Auth0-specific mappings, customize as n:qeeded\n      // https:///user-profile/normalized\n      return cb(null, {\n        user_id: json.name,\n        username: json.name,\n        email: json.emailAddress,\n        name: json.displayName,\n        groups: json.groups,\n        picture: json.avatarUrls['48x48'],\n        active: json.active,\n        self: json.self,\n        timezone: json.timeZone,\n        locale: json.locale\n      });\n    });\n  });\n}\n"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```
