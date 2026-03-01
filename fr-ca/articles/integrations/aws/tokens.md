---
description: How to call AWS APIs and Resources Using Tokens
toc: true
topics:
  - integrations
  - aws
  - tokens
contentType: tutorial
useCase:
  - secure-an-api
  - integrate-third-party-apps
  - integrate-saas-sso
---
# Call AWS APIs and Resources Securely with Tokens

<%= include('../../_includes/_uses-delegation') %>

Auth0 integrates with the AWS Security Token Service (STS) to obtain an limited-privilege credentials for AWS Identity and Access Management (IAM) users or for users that you authenticate (federated users). These credentials can then be used to call the AWS API of any Auth0-supported [identity provider](/identityproviders).

## Sample Configuration

![](/media/articles/integrations/aws/aws-sts.png)

1. The web app authenticates its users via Social providers, such as [Facebook](/connections/social/facebook), [LinkedIn](/connections/social/linkedin), or [Twitter](/connections/social/twitter), or corporate credentials, such as [Active Directory](/connections/social/active-directory), [Azure Active Directory](/connections/enterprise/azure-active-directory), or [Salesforce](connections/social/salesforce).
2. The app calls Auth0's **delegation** endpoint to request a token for use with AWS.
3. Auth0 obtains the token from AWS on behalf of the app.
4. The app uses the newly-obtained token to connect with any AWS API.

### Set Up Delegation

::: note
For detailed instructions on configuring delegation, see [How to Set Up AWS for Delegated Authentication](/aws-api-setup).
:::

Log in to Auth0's Management Dashboard, navigate to the [Applications](${manage_url}/#/applications) area, and find the [application](/applications) associated with your app. Click on **Settings** and click over to the **Addons** tab. Enable the **Amazon Web Services** addon.

![](/media/articles/integrations/aws/aws-addon.png)

::: panel Username Length with AWS
Users of Auth0's database or a custom database should note that [AWS usernames must be between 2-64 characters in length](http://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_saml.html#troubleshoot_saml_invalid-rolesessionname). If you're using an Auth0 database, you can enforce this by setting your [username length settings](/connections/database/require-username#length) accordingly. If you're using a custom database, you can implement a similar policy within your application.
:::

#### IAM policy

The following is a sample AWS IAM policy:

```text
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Action": [
              "s3:DelObject",
              "s3:GetObject",
              "s3:PutObject",
              "s3:PutObjectAcl"
          ],
          "Resource": [
              "arn:aws:s3:::YOUR_BUCKET_NAME/<%= "${saml:sub}" %>/*"
          ],
          "Effect": "Allow"
      }
  ]
}
```

The IAM policy is a dynamic policy that gives access to a folder in a bucket. The folder name is set based on an attribute of the digitally-signed <dfn data-key="security-assertion-markup-language">SAML</dfn> token that Auth0 exchanges with AWS on your behalf.

The `<%= "${saml:sub}" %>` will be automatically mapped from the authenticated user (`sub` means `subject` and is equal to the user identifier), which allows the *original* identity of the user to be used throughout your app and AWS.

### Get the AWS Token for an Authenticated User

When a user successfully authenticates, Auth0 returns an ID Token, which is a [JWT](/tokens/concepts/jwts)). This ID Token is then used to request an Auth0 and AWS token using the delegation endpoint.

Here is a sample request on the delegation endpoint:

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/delegation",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"client_id\": \"${account.clientId}\", \"grant_type\": \"urn:ietf:params:oauth:grant-type:jwt-bearer\", \"id_token\": \"YOUR_ID_TOKEN\", \"target\": \"${account.clientId}\", \"api_type\": \"aws\" }"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

| Parameters | Description |
| - | - |
| `client_id` | The ID of your Auth0 application |
| `grant_type` | Set as `urn:ietf:params:oauth:grant-type:jwt-bearer` |
| `id_token` | The existing ID Token for the user requesting access |
| `target` | The target application's ID |
| `api_type` | The API the user wants to call (this must be `aws`) |

AWS also requires the **role** and **principal** ARN values. You can set these values using [rules](/rules). The following is a sample rule that you can use. [Copy the provider  (for use as the principle ARN) and role ARN values](/aws-api-setup#copy-the-arn-values), and paste them into the sample where it currently says `[omitted]`:

```js
function (user, context, callback) {
  if (context.clientID === 'CLIENT_ID' &&
      context.protocol === 'delegation') {
    // set AWS settings
    context.addonConfiguration = context.addonConfiguration || {};
    context.addonConfiguration.aws = context.addonConfiguration.aws || {};
    context.addonConfiguration.aws.principal = 'arn:aws:iam::[omitted]:saml-provider/auth0-provider';
    context.addonConfiguration.aws.role = 'arn:aws:iam::[omitted]:role/auth0-role';
  }

  callback(null, user, context);
}
```

Optionally, you can set `context.addonConfiguration.aws.region` to target a specific AWS region. For example, `region: 'cn-north-1'` will direct requests to the Chinese north region. Temporary credentials from AWS GovCloud (US) and China (Beijing) can be used only in the region from which they originated.

The `context.addonConfiguration.aws.mappings` variable allows you to specify parameters that are sent to AWS to assume a Role. By default, Auth0 will use these mappings:

```text
    mappings: {
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': 'name',
          'https://aws.amazon.com/SAML/Attributes/Role':                          'awsrole',
          'https://aws.amazon.com/SAML/Attributes/RoleSessionName':               'rolesessionname'
    }
```

[Other mappings are available in AWS](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_saml_assertions.html), so if you wanted to use the `eduPersonAffiliation` AWS Context Key, you can set this mapping in a rule as follows:

```js
function(user, context, callback){

    context.addonConfiguration.aws.mappings: {
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': 'name',
          'https://aws.amazon.com/SAML/Attributes/Role':                          'awsrole',
          'https://aws.amazon.com/SAML/Attributes/RoleSessionName':               'rolesessionname',
          'urn:oid:1.3.6.1.4.1.5923.1.1.1.1':                                     'awsGroup'
    };

    callback(null,user,context);
}
```

The example above assumes the `user` object contains an `awsGroup` property with the expected value.

The result of calling the delegation endpoint will contain the AWS token in the `Credentials` field:

```js
{
  "ResponseMetadata":{
    "RequestId":"ec4cb90f-8a17-11e5-84bf-a9c4083f50c5"
  },
  "Credentials":{
    "AccessKeyId":"ASIAIJGOICAGFNVWAENA",
    "SecretAccessKey":"mRXhJySQHYZVg8...iCh+JeyBQ==",
    "Expiration":"2015-11-13T16:05:05.000Z"
  },
  "AssumedRoleUser":{
    "AssumedRoleId":"AROAID6UVEPILQXDCMMWK:johndoe",
    "Arn":"arn:aws:sts::010616021751:assumed-role/access-to-s3-per-user/johndoe"
  },
  "Subject":"google-oauth2|113015401123457192604",
  "SubjectType":"persistent",
  "Issuer":"urn:matugit.auth0.com",
  "Audience":"https://signin.aws.amazon.com/saml",
  "NameQualifier":"z32keR+u/IrT0MrUVEfqYUGiqvE="
}
```

:::panel Auth0 Libraries
The [Auth0 application libraries](/libraries) simplify the process of calling these endpoints. See an example for client-side JavaScript at [Delegation Token Request](/libraries/auth0js/v7#delegation-token-request). Please note that this example is for **version 7** of the `auth0js` library; delegation is *not* supported in version 8 of `auth0js`.

Additionally, AWS requires two additional parameters: **role** and **principal**. To modify the `role` and `principal` strings, specify the appropriate ARN values where the sample currently says `[omitted]` via [Rules](${manage_url}/#/rules). If you do not have these values, please see [Copy the ARN Values](/aws-api-setup#copy-the-arn-values) section of the AWS setup doc.
:::

Here is an example of client-side code used to obtain the token:

```html
<script src="${auth0js_urlv7}"></script>
<script type="text/javascript">

  var auth0 = new Auth0({
    clientID: '${account.clientId}',
    domain: '${account.namespace}',
    callbackURL: 'dummy'
  });

  var options = {
    id_token: LOGGED_IN_USER_ID_TOKEN,
    api: 'aws'
  };

  auth0.getDelegationToken(options, function(err, delegationResult){
    if (!err){
      // Use delegationResult.Credentials to access AWS API
    }
  });
}
</script>
```
