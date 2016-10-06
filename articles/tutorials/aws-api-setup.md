---
description: How to enable delegated authentication with AWS APIs.
url: /aws-api-setup
---
# Setup AWS for Delegated Authentication with APIs

To enable delegated authentication with AWS APIs, you must create a **SAML Provider** and one or more **Roles**.

## Create a SAML Provider

To create a SAML provider, follow these steps:

1. Go to the [AWS IAM Console](https://console.aws.amazon.com/iam/home#home). Click on **Identity Providers** in the left menu and then click **Create Provider**:

  ![](/media/articles/aws-api-setup/aws-api-setup-1.png)

2. Select **SAML** as the **Provider Type** and enter a name for your provider:

  ![](/media/articles/aws-api-setup/aws-api-setup-2.png)

3. Download your metadata document from <% if (account.userName) { %><https://${account.namespace}/samlp/metadata/${account.clientId}><% } else { %>`https://${account.namespace}/samlp/metadata/${account.clientId}`<% } %>.

  Click **Choose File** and browse to the metadata document you just downloaded. Click **Next Step**:

  ![](/media/articles/aws-api-setup/aws-api-setup-3.png)

4. Verify your provider information and click **Create**:

  ![](/media/articles/aws-api-setup/aws-api-setup-4.png)

## Create a Role

Now create a role with one or more associated policies. (You can create as many roles as required.)

1. On the AWS IAM Console, click on **Roles** in the left menu and then click **Create New Role**:

  ![](/media/articles/aws-api-setup/aws-api-setup-5.png)

2. Provide a name for your new role and click **Next Step**:

  ![](/media/articles/aws-api-setup/aws-api-setup-6.png)

3. Select **Role for Identity Provider Access**. Then select **Grant API access to SAML providers** and click **Next Step**:

  ![](/media/articles/aws-api-setup/aws-api-setup-7.png)

4. Select or enter the following values:

  * **SAML Provider**: the provider you just created
  * **Attribute**: `SAML:iss`
  * **Value**: `urn:${account.namespace}`

  and click **Next Step**:

  ![](/media/articles/aws-api-setup/aws-api-setup-8.png)

5. On the Verify Role Trust page, accept the Policy Document as provided. Click **Next Step**:

  ![](/media/articles/aws-api-setup/aws-api-setup-9.png)

6.  At **Attach Policy**, either select a pre-defined policy to attach or define a custom policy as defined in the [next section](#create-a-custom-policy). Click **Next Step**

7. Review the information and click **Create Role**:

  ![](/media/articles/aws-api-setup/aws-api-setup-10.png)

## Create a Custom Policy

In this example, you will create a policy that grants full access to the S3 resource: `YOUR_BUCKET/<%= '${saml:sub}' %>`. This will be evaluated at run-time and replaced with the `user_id` of the logged-in user.

1. On the **Roles** page, select the role you just created.

  On the **Permissions** tab under **Inline Policies**, click the link to create an inline policy:

  ![](/media/articles/aws-api-setup/aws-api-setup-11.png)

2. Name your policy and enter the following code in the **Policy Document** field:

  ```
  {
    "Version": "2012-10-17",
    "Statement": [{
        "Effect": "Allow",
        "Action": [
          "*"
        ],
        "Resource": [
        "arn:aws:s3:::YOUR_BUCKET/$[saml:sub}",
        "arn:aws:s3:::YOUR_BUCKET/$[saml:sub}/*"]
    }]
  }
  ```

3. Click **Validate Policy** to check your syntax, then click **Apply Policy**.

  ![](/media/articles/aws-api-setup/aws-api-setup-12.png)

## Copy the ARN values

1. From the summary page of the role you just created, copy the **Role ARN** value. You will use this value later when calling the `/delegation` endpoint in Auth0.

  ![](/media/articles/aws-api-setup/aws-api-setup-13.png)

2. From the summary page of the identity provider you created previously, copy the **Provider ARN** value. You will use this value as the **Principal ARN** in the [Rule you will build to be used in conjunction with the call to Auth0's `/delegation` endpoint](/integrations/aws#get-the-aws-token-for-an-authenticated-user).

  ![](/media/articles/aws-api-setup/aws-api-setup-14.png)

**NOTE:** For more information on supported AWS APIs, see: [AWS Services That Work with IAM](http://docs.aws.amazon.com/IAM/latest/UserGuide/Using_SpecificProducts.html).
