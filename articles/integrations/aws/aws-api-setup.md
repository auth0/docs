---
description: How to enable delegated authentication with AWS APIs.
url: /aws-api-setup
toc: true
---
# Delegated Authentication with AWS APIs

The doc will walk you through creating a SAML Provider and its accompanying role(s) for use with delegated authentication with AWS APIs.

## Step 1: Create a SAML Provider

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

## Step 2: Create a Role for Your SAML Provider

To use the provider, you must create an IAM role using the provider in the role's trust policy. 

In the IAM console, navigate to [Roles](https://console.aws.amazon.com/iam/home#/roles). Click **Create New Role**.

![](/media/articles/integrations/aws/iam-new-role.png)

On the **Select role type** page, select **Role for identity provider access**. 

![](/media/articles/integrations/aws/select-role-type.png)

Click **Select** for the **Grant Web Single Sign-On (WebSSO) access to SAML providers** option. Set the following values:

| Parameter | Value |
| - | - |
| SAML Provider | Select the provider you created in the previous step |
| Attribute | `SAML:iss` |
| Value | `urn:${account.namespace}` |

![](/media/articles/tutorials/aws/establish-trust.png)

Click **Next Step** to proceed.

On the Verify Role Trust page, accept the **Policy Document** as provided and click **Next Step**. 

![](/media/articles/tutorials/aws/verify-role-trust.png)

When asked to **Attach Policy**, either select a pre-defined policy or [define a custom policy](#create-a-custom-policy). These define the permissions that users granted this role will have with AWS. Click **Next Step**

Finally, set the role name and review your settings. Provide values for the following parameters:

| Parameter | Definition | 
| - | - |
| Role name | A descriptive name for your role |
| Role description | A description of what your role is used for |

Review the **Trusted entities** and **Policies** information, then click **Create Role**.

![](/media/articles/integrations/aws/iam-review-role.png)

At this point, you'll have created the necessary role to associate with your provider.

## Create a Custom Policy

In this example, you will create a policy that grants full access to the S3 resource `YOUR_BUCKET/<%= '${saml:sub}' %>`. AWS evaluates this policy at run-time and replaces the placeholder with the `user_id` of the user that's logged in.

In the IAM console, navigate to [Roles](https://console.aws.amazon.com/iam/home#/roles). Select the role you just created to open up it's summary page.

On the **Permissions** tab click the carrot to expand the **Inline Policies** area.

![](/media/articles/tutorials/aws/role-summary.png)

Click the provided link to create an inline policy.

You'll be creating a **Custom Policy**. Provide a **Policy Name** and populate the **Policy Document** field with the following:

```text
{
  "Version": "2012-10-17",
  "Statement": [{
      "Effect": "Allow",
      "Action": [
        "*"
      ],
      "Resource": [
      "arn:aws:s3:::YOUR_BUCKET/<%= '${saml:sub}' %>",
      "arn:aws:s3:::YOUR_BUCKET/<%= '${saml:sub}' %>/*"]
  }]
}
```

Click **Validate Policy** to check your syntax.

![](/media/articles/tutorials/aws/review-validate-policy.png)

Click **Apply Policy** to proceed.

## Copy the ARN Values

The following instructions will show you where you can find the Provider and Role ARN values.

### Provider ARN

In the IAM console, navigate to [Identity providers](https://console.aws.amazon.com/iam/home#/providers). Select the role in which you're interested to open up its summary page. Copy the **Provider ARN** value, which is listed first under **Summary**.

![](/media/articles/tutorials/aws/provider-summary.png)

### Role ARN

In the IAM console, navigate to [Roles](https://console.aws.amazon.com/iam/home#/roles). Select the role in which you're interested to open up its summary page. Copy the **Role ARN** value, which is listed first under **Summary**.

![](/media/articles/tutorials/aws/role-summary2.png)

### Next Steps

* [AWS Services Supported by IAM](http://docs.aws.amazon.com/IAM/latest/UserGuide/Using_SpecificProducts.html).
