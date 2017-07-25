---
description: How to setup AWS Integration in Auth0. How to setup SSO and obtain AWS tokens.
---

# AWS Integration in Auth0

Auth0 supports integration with AWS' Identity and Access Management (IAM) service, allowing you to:

 * [Perform SSO with the AWS Dashboard](#sso-with-the-aws-dashboard)
 * [Obtain AWS Tokens to securely call AWS APIs and resources](#obtain-aws-tokens-to-securely-call-aws-apis-and-resources)

## SSO with the AWS Dashboard

By integrating Auth0 with AWS, you'll allow your users to log in to AWS using any supported [identity provider](/identityproviders). 

### Configure Auth0

Log in to the [Management Dashboard](${manage_url}/#/applications), and create a new [Client](/client) (you can also use an existing Client if you'd like). On the **Addons** tab, enable the **SAML2 Web App** addon.

![](/media/articles/integrations/aws/addons.png)

You'll be asked to configure this add-on using the pop-up that appears immediately after you've enabled the SAML2 Web App. 

On the **Settings** tab, populate **Application Callback URL** with `https://signin.aws.amazon.com/saml` and paste the following SAML configuration code into **Settings**:

```js
{
  "audience": "https://signin.aws.amazon.com/saml",
  "mappings": {
    "email": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
    "name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
  },
  "createUpnClaim": false,
  "passthroughClaimsWithNoMapping": false,
  "mapUnknownClaimsAsIs": false,
  "mapIdentities": false,
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:2.0:nameid-format:persistent",
  "nameIdentifierProbes": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
  ]
}
```

![](/media/articles/integrations/aws/configure.png)

Scroll to the bottom and click **Save**.

Click over to the **Usage** tab. You'll need to configure Auth0 as the identity provider (IdP) for AWS, which requires you to provide the appropriate metadata to AWS. You can obtain a file containing this information by clicking **Identity Provider Metadata**.

![](/media/articles/integrations/aws/idp-download.png)

### Configure AWS

At this point, you're ready to continue the configuration process from the AWS side.

Log in to AWS, and navigate to the [IAM console](https://console.aws.amazon.com/iam). Using the left-hand navigation menu, select **Identity Providers**. Click **Create Provider**. 

![](/media/articles/integrations/aws/create-provider.png)

Set the following parameters:

| Parameter | Description and Sample Value |
| - | - |
| Provider Type | The type of provider. Set as `SAML` |
| Provider Name | A descriptive name for the provider, such as `auth0SamlProvider` |
| Metadata Document | Upload the file containing the Auth0 metadata you downloaded in the previous step here. |

![](/media/articles/integrations/aws/aws-configure-provider.png)

Click **Next Step**. Verify your settings and click **Create** if everything is correct.

![](/media/articles/integrations/aws/create-provider-confirm.png)

To use the provider, you must create an IAM role using the provider in the role's trust policy. 

In the IAM console, navigate to [Roles](https://console.aws.amazon.com/iam/home#/roles). Click **Create New Role**.

![](/media/articles/integrations/aws/iam-new-role.png)

On the **Select role type** page, select **Role for identity provider access**. 

![](/media/articles/integrations/aws/select-role-type.png)

Click **Select** for the **Grant Web Single Sign-On (WebSSO) access to SAML providers** option. When prompted, set the provider you created above as the **SAML provider** and click **Next Step** to proceed.

![](/media/articles/integrations/aws/select-saml-provider-to-trust.png)

On the **Verify Role Trust** page, accept the **Policy Document** proposed (this policy tells IAM to trust the Auth0 SAML IdP). Click **Next Step**.

On **Attach Policy**, select the appropriate policies to attach to the role. These define the permissions that users granted this role will have with AWS. For example, to grant your users read-only access to IAM, filter for and select the `IAMReadOnlyAccess` policy. Click **Next Step**.

Finally, set the role name and review your settings. Provide values for the following parameters:

| Parameter | Definition | 
| - | - |
| Role name | A descriptive name for your role |
| Role description | A description of what your role is used for |

Review the **Trusted entities** and **Policies** information, then click **Create Role**.

![](/media/articles/integrations/aws/iam-review-role.png)

At this point, you'll have created the necessary role to associate with your provider.

### Map the AWS Role to a User

::: note
For an example of how to define a server-side rule for assigning a role in an advanced-use case, see the [Amazon API Gateway tutorial](/integrations/aws-api-gateway).
:::

The **AWS roles** you send will be associated with an **IAM policy** that enforces the type of access allowed to a resource, including the AWS Consoles. To map an AWS role to a user, you'll need to create a [rule](/rule) for this purpose.

::: note
For more information on roles and policies, see [Creating IAM Roles](http://docs.aws.amazon.com/IAM/latest/UserGuide/roles-creatingrole.html).
:::

```js
function (user, context, callback) {

  user.awsRole = 'arn:aws:iam::951887872838:role/TestSAML,arn:aws:iam::951887872838:saml-provider/MyAuth0';
  user.awsRoleSession = 'eugeniop';

  context.samlConfiguration.mappings = {
    'https://aws.amazon.com/SAML/Attributes/Role': 'awsRole',
    'https://aws.amazon.com/SAML/Attributes/RoleSessionName': 'awsRoleSession'
  };

  callback(null, user, context);

}
```

In the code snippet above, `user.awsRole` identifies the AWS role and the IdP. The AWS role identifier comes before the comma, and the IdP identifier comes after the comma.

There are multiple ways by which you can obtain these two values. In the example above, both of these values are hard-coded into the rules. You might also store these values in the [user profile](/user-profile), or you might derive them using other attributes.

For example, if you're using Active Directory, you can map properties associated with users, such as `group` to the appropriate AWS role:

```js
var awsRoles = {
  'DomainUser': 'arn:aws:iam::951887872838:role/TestSAML,arn:aws:iam::95123456838:saml-provider/MyAuth0',
  'DomainAdmins': 'arn:aws:iam::957483571234:role/SysAdmins,arn:aws:iam::95123456838:saml-provider/MyAuth0'
};

context.samlConfiguration.mappings = {
  'https://aws.amazon.com/SAML/Attributes/Role': awsRoles[user.group],
  'https://aws.amazon.com/SAML/Attributes/RoleSessionName': user.name,
};
```

### Test Your Setup

You are now set up for single sign-on to AWS. You can find the `Identity Provider Login URL` on the [Management Dashboard](${manage_url}). Open up your [client](${manage_url}/#/clients) to the **SAML2 Addon** settings area, and click over to the **Usage** tab.

![](/media/articles/integrations/aws/idp-download.png)

To test the single sign-on, navigate to the URL indicated. You should be redirected to the Auth0 sign in page. If you successfully sign in, you'll be redirected again, this time to AWS.

## Obtain AWS Tokens to securely call AWS APIs and resources

::: warning
Newly-created clients may not use [legacy grant types](/clients/client-grant-types), which are required for use with the [Delegation endpoint](/api/authentication#get-token-info). If you have any questions about which alternative you should use, please contact [Support](http://support.auth0.com).
:::

This delegation scenario is more versatile. Auth0 interacts with **AWS STS** directly to obtain an **AWS token** that can be used to call the AWS API of any Auth0-supported [Identity Provider](/identityproviders).

![](/media/articles/integrations/aws/aws-sts.png)

In **Step 1** of the example above, a web application authenticates users with social providers (e.g. GitHub, LinkedIn, Facebook, Twitter) or with corporate credentials (e.g. Active Directory, Office365 and Salesforce).

In **Step 2**, the app calls the **Identity delegation** endpoint in Auth0 and requests an AWS Token.

Auth0 obtains the token from AWS STS in **Step 3**.

The app can then use the AWS Token to connect with S3 or EC2 or any AWS API.

### Setup delegation

On the Auth0 [Dashboard](${manage_url}/#/applications), select your app. In the **Addons** tab of the app settings page, enable the **Amazon Web Services** add-on.

![](/media/articles/integrations/aws/aws-addon.png)

::: note
For more detailed instructions on delegation, see [How to Setup AWS to do Delegated Authentication with APIs](/aws-api-setup).
:::

### Username Length with AWS

Auth0 DB and custom DB users should take note that AWS requires usernames to be between 2-64 characters long. If you intend to use use Auth0 DB alongside of AWS here, change your [username length settings](/connections/database/require-username#length) accordingly in your Auth0 dashboard.

Custom DB users should implement a similar username length policy in their application to ensure that this integration works. See this [AWS Troubleshooting Page](http://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_saml.html#troubleshoot_saml_invalid-rolesessionname) for more information.

### IAM policy

Here is an example of an IAM policy:

```
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

This is a dynamic policy that gives access to a folder in a bucket. The folder name will be set based on an attribute of the digitally signed SAML token that Auth0 exchanges with AWS on your behalf (**Step 3** in the graphic).

The `<%= "${saml:sub}" %>` will be automatically mapped from the authenticated user (`sub` means `subject`, and is equal to the user identifier). This means that the *original* identity of the user can be used throughout the system (in your app, S3, etc.).

### Get the AWS token for an authenticated user

When a user authenticates with Auth0, an `id_token` (as a [JWT](/jwt)) is returned. This `id_token` is then used to request an Auth0 and AWS token using the delegation endpoint.

Here is a sample request on the delegation endpoint:

```sh
POST https://${account.namespace}/delegation
Content-Type: 'application/json'
{
  "client_id":   "${account.clientId}",
  "grant_type":  "urn:ietf:params:oauth:grant-type:jwt-bearer",
  "id_token":    "{YOUR_ID_TOKEN}",
  "target":      "${account.clientId}",
  "api_type":    "aws",
}
```

Where:

* **client_id** identifies the requesting app (e.g. your website)
* **id_token** identifies the user you are requesting this on behalf-of
* **target** identifies this API endpoint in Auth0 (often the same as client_id).
* **api_type** must be aws

Additionally, AWS requires two additional parameters, **role** and **principal**. To modify the `role` and `principal` strings, specify the appropriate ARN values where the sample currently says `[omitted]` via [Rules](${manage_url}/#/rules). If you do not have these values, please see [Copy the ARN Values](/aws-api-setup#copy-the-arn-values) section of the AWS setup doc.

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

You can optionally set `context.addonConfiguration.aws.region` to specifically target an AWS region. For example, `region: 'cn-north-1'` will direct requests to the Chinese north region. Temporary credentials from AWS GovCloud (US) and China (Beijing) can be used only in the region from which they originated.

The `context.addonConfiguration.aws.mappings` variable allows you to specify parameters that are sent to AWS to assume a Role. By default, Auth0 will use these mappings:

    mappings: {
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': 'name',
          'https://aws.amazon.com/SAML/Attributes/Role':                          'awsrole',
          'https://aws.amazon.com/SAML/Attributes/RoleSessionName':               'rolesessionname'
    }

But [other mappings are available in AWS](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_saml_assertions.html). For example, if you wanted to use the `eduPersonAffiliation` AWS Context Key then you could set these mapping in a rule:

```js
    function(user,context,callback){

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

::: note
Copy the Provider ARN, and use this as the Principal ARN when obtaining the delegation token.
:::

The result of calling the delegation endpoint will contain the AWS token in the `Credentials` field. i.e.:

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
The [Auth0 client libraries](/libraries) simplify the process of calling these endpoints. See an example for client-side JavaScript at [Delegation Token Request](/libraries/auth0js/v7#delegation-token-request). Please note that this example is for **version 7** of the `auth0js` library; delegation is *not* supported in version 8 of `auth0js`.

Additionally, AWS requires two additional parameters: **role** and **principal**. To modify the `role` and `principal` strings, specify the appropriate ARN values where the sample currently says `[omitted]` via [Rules](${manage_url}/#/rules). If you do not have these values, please see [Copy the ARN Values](/aws-api-setup#copy-the-arn-values) section of the AWS setup doc.
:::

Here is an example of client-side code used to obtain the token:

```html
<script src="${auth0js_url}"></script>
<script type="text/javascript">

  var auth0 = new Auth0({
    clientID: '${account.clientId}',
    domain: '${account.namespace}',
    callbackURL: 'dummy'
  });

  var options = {
    id_token: LOGGED_IN_USER_ID_TOKEN,
    api: 'aws',
    role: AWS_ROLE_ARN,
    principal: AWS_SAML_PROVIDER_ARN
  };

  auth0.getDelegationToken(options, function(err,delegationResult){
    if (!err){
      //use delegationResult.Credentials to access AWS API
    }
  });
}
</script>
```

::: note
Checkout a complete sample for S3 on GitHub: [https://github.com/auth0/auth0-s3-sample](https://github.com/auth0/auth0-s3-sample).
:::
