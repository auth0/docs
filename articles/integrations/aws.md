# AWS Integration in Auth0

Auth0 ships with AWS IAM integration that allows you to:

 * [Perform SSO with the AWS Dashboard](#sso-with-the-aws-dashboard)
 * [Obtain AWS Tokens to securely call AWS APIs and resources](#obtain-aws-tokens-to-securely-call-aws-apis-and-resources)

## SSO with the AWS Dashboard

By integrating Auth0 and AWS you will be able to login to the AWS Dashboard with any of the supported [Auth0 Identity Providers](/identityproviders). To configure Auth0 for federation with AWS using SAML, follow the steps below:

1. On the Auth0 [Dashboard](${uiURL}/#/applications), add a new app. In the **Addons** tab of the app settings page, enable the **SAML2 Web App** add-on.

    ![](/media/articles/integrations/aws/addons.png)

2. Under the **Settings** tab of the **SAML2 Web App Addon** page, enter `https://signin.aws.amazon.com/saml` for the **Application Callback URL** and paste the following default SAML configuration code into the *Settings* box:

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

    Scroll to the bottom of the page and click **Save**:

    ![](/media/articles/integrations/aws/configure.png)

3. Auth0 needs to be configured as the identity provider (IdP) for AWS. AWS requires an **IdP Metadata** file to import.
  Select the **Usage** tab and click the **Identity Provider Metadata** download link to save the file:

    ![](/media/articles/integrations/aws/idp-download.png)

4. Create a SAML provider.

    4.1. From the [IAM console](https://console.aws.amazon.com/iam/home#home), select **Identity Providers** in the left menu and click **Create Provider**.

    4.2. Select **SAML** in the **Provider Type** dropdown, enter a name for your provider and browse for the metadata document you downloaded in the **Step 3**. Click **Next Step**.

      ![](/media/articles/integrations/aws/aws-configure-provider.png)

    4.3. Verify your settings and click **Create**.

5. Now you must create a role in AWS in a specific way to allow its use to gain access to AWS. For more information on creating roles, see [Creating SAML Identity Providers](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_saml.html).

    5.1. From the [IAM console](https://console.aws.amazon.com/iam/home#home), select **Roles** in the left menu, then click **Create New Role**:

      ![](/media/articles/integrations/aws/iam-new-role.png)

    5.2. Enter a name for the role and click **Next Step**.

    5.3. Select **Role for Identity Provider Access**. Then select **Grant Web Single Sign-On (WebSSO) access to SAML providers**:

      ![](/media/articles/integrations/aws/iam-role-type.png)

    5.4. On the next screen, accept the default `SAML:aud` value of `https://signin.aws.amazon.com/saml`, and click **Next Step**.

    5.5. Accept the **Role Trust** proposed. (This policy tells IAM to trust the Auth0 SAML IDP.) Click **Next Step**.

    5.6. Choose an appropriate access policy for this role. This defines the permissions that the user granted this role will have with AWS. For example, to only let users read information in the console, select the `ReadOnlyAccess` policy. Click **Next Step**.

    5.7. Review the role information, then click **Create Role**:

      ![](/media/articles/integrations/aws/iam-review-role.png)

6. Write a [Rule](/rules) to map the AWS role to a user.

  The **AWS roles** you send will be associated to an **AWS IAM Policy** that will enforce the type of access allowed for a resource, including the AWS dashboard. (For more information on roles and policies, see [Creating IAM Roles](http://docs.aws.amazon.com/IAM/latest/UserGuide/roles-creatingrole.html)) Notice the **AWS Role** has a structure of `{Fully qualified Role name},{Fully qualified identity provider}`. The IdP is identified as `arn:aws:iam::951887872838:saml-provider/MyAuth0` in the sample below:

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

  Notice that you can obtain these 2 values in multiple ways. The above example hardcodes them. You could store these in the *User Profile*, or you could derive them from other attributes. For example, you might use Active Directory and have properties already associated with users (e.g. `groups`). You can then define a map between `groups` and `AWS roles`:

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

You are now setup for single sign-on to AWS. You can find the `Identity Provider Login URL` on the Auth0 Dashboard. Go to the **SAML2 Addon** settings page of your app, and select the **Usage** tab.

![](/media/articles/integrations/aws/idp-url.png)

To use the single sign-on, navigate to that URL, and you will be brought to the Auth0 login. After signing in, you will be redirected to AWS.

**NOTE:** For an example of how to define a server-side rule for assigning a role in an advanced-use case, see the [Amazon API Gateway tutorial](/integrations/aws-api-gateway).

## Obtain AWS Tokens to securely call AWS APIs and resources

This delegation scenario is more versatile. Auth0 interacts with **AWS STS** directly to obtain an **AWS token** that can be used to call the AWS API of any Auth0-supported [Identity Provider](/identityproviders).

![](/media/articles/integrations/aws/aws-sts.png)

In **Step 1** of the example above, a web application authenticates users with social providers (e.g. GitHub, LinkedIn, Facebook, Twitter) or with corporate credentials (e.g. Active Directory, Office365 and Salesforce).

In **Step 2**, the app calls the **Identity delegation** endpoint in Auth0 and requests an AWS Token.

Auth0 obtains the token from AWS STS in **Step 3**.

The app can then use the AWS Token to connect with S3 or EC2 or any AWS API.

### Setup delegation

On the Auth0 [Dashboard](${uiURL}/#/applications), select your app. In the **Addons** tab of the app settings page, enable the **Amazon Web Services** add-on.

![](/media/articles/integrations/aws/aws-addon.png)

**NOTE:** For more detailed instructions on delegation, see [How to Setup AWS to do Delegated Authentication with APIs](/aws-api-setup).

### IAM policy

Here is an example of an IAM policy:

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

This is a *dynamic* policy that gives access to a folder in a bucket. The folder name will be set based on an attribute of the digitally signed SAML token that Auth0 exchanges with AWS on your behalf (**Step 3** in the graphic).

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

Additionally, AWS requires two additional parameters, **role** and **principal**. To modify the `role` and `principal` strings, specify the appropriate values via [Rules](${uiURL}/#/rules):

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

**NOTE:** Copy the Provider ARN, and use this as the Principal ARN when obtaining the delegation token.

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

**NOTE:** The Auth0 client libraries simplify calling these endpoints. See our [GitHub repo](https://github.com/auth0/) for the latest SDKs. See an example for client-side JavaScript at: [Delegation Token Request](https://github.com/auth0/auth0.js#delegation-token-request).

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

> Checkout a complete sample for S3 on GitHub: [https://github.com/auth0/auth0-s3-sample](https://github.com/auth0/auth0-s3-sample).
