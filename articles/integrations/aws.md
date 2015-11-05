# AWS Integration in Auth0

Auth0 ships with AWS IAM integration that allows you to:

 * Login to the AWS Dashboard with any of the supported [Identity Providers](/identityproviders).
 * Obtain AWS Tokens to securely call AWS APIs and resources.

## SSO with the AWS Dashboard

To configure Auth0 for federation with AWS using SAML, follow the steps below:

1. On the Auth0 [Dashboard](${uiURL}/#/applications), add a new app. In the **Addons** tab of the app settings page, enable the **SAML2 Web App** add-on.

  ![](/media/articles/integrations/aws/addons.png)

2. Under the **Settings** tab of the **SAML2 Web App Addon** page, enter `https://signin.aws.amazon.com/saml` for the **Application Callback URL** and paste the following default SAML configuration code into the *Settings* box:

  ```
    {
     "audience":  "https://signin.aws.amazon.com/saml",
     "mappings": {
     "email":       "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
     "name":        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
     },
    "createUpnClaim":       false,
    "passthroughClaimsWithNoMapping": false,
    "mapUnknownClaimsAsIs": false,
    "mapIdentities":        false,
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
    1. From the [IAM console](https://console.aws.amazon.com/iam/home#home), select **Identity Providers** in the left menu and click **Create Provider**.
    2. Select **SAML** in the **Provider Type** dropdown, enter a name for your provider and browse for the metadata document you downloaded in the previous step. Click **Next Step**.

      ![](/media/articles/integrations/aws/aws-configure-provider.png)
    3. Verify your settings and click **Create**.

5. Now you must create a role in AWS in a specific way to allow its use to gain access to AWS. (For more information on creating roles, see [Creating SAML Identity Providers](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_saml.html).

  The steps are:

    1. From the [IAM console](https://console.aws.amazon.com/iam/home#home), select **Roles** in the left menu, then click **Create New Role**:
      ![](/media/articles/integrations/aws/iam-new-role.png)
    2. Enter a name for the role and click **Next Step**.
    3. Select **Role for Identity Provider Access**.
  Then select **Grant Web Single Sign-On (WebSSO) access to SAML providers**:
      ![](/media/articles/integrations/aws/iam-role-type.png)
    4. On the next screen, accept the default `SAML:aud` value of `https://signin.aws.amazon.com/saml`, and click **Next Step**.
    5. Accept the **Role Trust** proposed. (This policy tells IAM to trust the Auth0 SAML IDP.) Click **Next Step**.
    6. Choose an appropriate access policy for this role. This defines the permissions that the user granted this role will have with AWS. For example, to only let users read information in the console, select the `ReadOnlyAccess` policy. Click **Next Step**.
    7. Review the role information, then click **Create Role**:
      ![](/media/articles/integrations/aws/iam-review-role.png)

6. Write a [Rule](/rules) to map the AWS role to a user.

  The **AWS roles** you send will be associated to an **AWS IAM Policy** that will enforce the type of access allowed for a resource, including the AWS dashboard. (For more information on roles and policies, see [Creating IAM Roles](http://docs.aws.amazon.com/IAM/latest/UserGuide/roles-creatingrole.html)) Notice the **AWS Role** has a structure of `{Fully qualified Role name},{Fully qualified identity provider}`. The IdP is identified as `arn:aws:iam::951887872838:saml-provider/MyAuth0` in the sample below:

  ```js
function (user, context, callback) {

	user.awsRole = 'arn:aws:iam::951887872838:role/TestSAML,arn:aws:iam::951887872838:saml-provider/MyAuth0';
    user.awsRoleSession = 'eugeniop';

    context.samlConfiguration.mappings = {
      "https://aws.amazon.com/SAML/Attributes/Role": "awsRole",
      "https://aws.amazon.com/SAML/Attributes/RoleSessionName": "awsRoleSession"
    };
    callback(null, user, context);
    }
  ```

  Notice that you can obtain these 2 values in multiple ways. The above example hardcodes them. You could store these in the *User Profile*, or you could derive them from other attributes. For example, you might use Active Directory and have properties already associated with users (e.g. `groups`). You can then define a map between `groups` and `AWS roles`:

  ```
    ...
    var awsRoles = {
    'DomainUser': 'arn:aws:iam::951887872838:role/TestSAML,arn:aws:iam::95123456838:saml-provider/MyAuth0',
    'DomainAdmins': arn:aws:iam::957483571234:role/SysAdmins,arn:aws:iam::95123456838:saml-provider/MyAuth0'
    };

    context.samlConfiguration.mappings = {
    "https://aws.amazon.com/SAML/Attributes/Role": awsRoles[user.group],
    "https://aws.amazon.com/SAML/Attributes/RoleSessionName": user.name,

    };
    ...
  ```

7. You are now setup for single sign-on to AWS. You can find the `Identity Provider Login URL` on the Auth0 Dashboard. Go to the **SAML2 Addon** settings page of your app, and select the **Usage** tab.

  To use the single sign-on, navigate to that URL, and you will be brought to the Auth0 login. After signing in, you will be redirected to AWS.

  ![](/media/articles/integrations/aws/idp-url.png)

## Delegation scenarios

This second scenario is even more powerful. Auth0 can interact with **AWS STS** directly, and obtain an **AWS token** that can be used to call any AWS API.

This works with any supported [Identity Provider](/identityproviders) in Auth0:

![](/media/articles/integrations/aws/aws-sts.png)

In the example above, a web application authenticates users with social providers (e.g. GitHub, LinkedIn, Facebook, Twitter) or with corporate credentials (e.g. Active Directory, Office365 and Salesforce) in step 1.

It then calls the **Identity delegation** endpoint in Auth0 (step 2) and requests an AWS Token. Auth0 obtains the token from AWS STS (step 3).

The app can then use the AWS Token to connect with S3 or EC2 or any AWS API.

As an example of an IAM policy:

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

This is a *dynamic* policy that gives access to a folder in a bucket. The folder name will be set based on an attribute of a SAML token digitally signed that Auth0 exchanges with AWS on your behalf (step 3).

The `<%= "${saml:sub}" %>` will be automatically mapped from the authenticated user (`sub` means `subject`, that will equal the user identifier). This means that the **original** identity of the user can be used throughout the system: your app, S3, etc.

## Getting the AWS token for an authenticated user

When a user authenticates with Auth0, you will get back an `id_token` (as a [JWT](/jwt)). You then use this `id_token` to request an Auth0 and AWS Token using the delegation endpoint.

This is a sample Request on the delegation endpoint:

    POST https://${account.namespace}/delegation

    grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer
    &id_token=THE_ID_TOKEN_OF_LOGGED_IN_USER
    &target=CLIENT_ID_OF_API_TO_CALL
    &client_id=THE_CLIENT_ID_OF_CALLER
    &role=arn:aws:iam::010616021751:role/foo
    &principal=arn:aws:iam::010616021751:saml-provider/idpname

Notice the 2 additional parameters used for AWS:

    &role=arn:aws:iam::010616021751:role/foo
    &principal=arn:aws:iam::010616021751:saml-provider/idpname

The Response will contain the AWS Token:

```
{
  Credentials: {
    SessionToken: 'AQoDYXdzENf//////...Pz02lt4FSCY6L+WBQ==',
    SecretAccessKey: 'zYaN30nMf/9uV....Zx9Em7xQzcCc9/PPl',
    Expiration: Fri Jan 10 2014 11:22:32 GMT-0300 (ART),
    AccessKeyId: 'ASIAI5PCTTOC6APKKXLQ'
  }
}
```

**NOTE:** The Auth0 client libraries simplify calling these endpoints. See our [GitHub repo](https://github.com/auth0/) for the latest SDKs. Here is an example for client-side JavaScript: [Delegation Token Request](https://github.com/auth0/auth0.js#delegation-token-request).

## Client-side sample code

```
  var targetClientId = "{TARGET_CLIENT_ID}";

  var options = {
    "id_token":  "USER_ID_TOKEN",        // MANDATORY!
    "client_id": "THE_CLIENT_ID_OF_CALLER",
    "role":      "arn:aws:iam::010616021751:role/foo",
    "principal": "arn:aws:iam::010616021751:saml-provider/idpname"
  };

  auth0.getDelegationToken(targetClientId, options, function (err, delegationResult) {
    uploadFileToS3(delegationResult.Credentials, done);
  });

  function uploadFileToS3 (awsToken, callback) {
    $('#upload').on('click', function() {
      var params = {
          Key: user.id + '/' + file.name,
          ContentType: fileChooser.files[0].type,
          Body: fileChooser.files[0]};

      var bucket = new AWS.S3({params: {Bucket: 'THE_BUCKET'}});
      bucket.config.credentials =
        new AWS.Credentials(awsToken.AccessKeyId,
                            awsToken.SecretAccessKey,
                            awsToken.SessionToken);
      bucket.putObject(params, callback);
    });
  }
```
