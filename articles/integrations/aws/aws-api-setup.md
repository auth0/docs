---
description: How to Set Up AWS for Delegated Authentication
url: /aws-api-setup
toc: true
topics:
  - integrations
  - aws
contentType: how-to
useCase: secure-an-api
---
# How to Set Up AWS for Delegated Authentication

This doc will walk you through setting up AWS for delegated authentication. You'll need to perform these steps any time you want to use Auth0 with AWS. Note that this tutorial does not walk you through a full integration. See the [Configure Single Sign-on (SSO) with the AWS Console](/integrations/aws/sso) or [API Gateway](/integrations/aws-api-gateway) tutorials for complete examples.

## Step 1: Create a SAML Provider in AWS

Log in to AWS, and navigate to the [IAM console](https://console.aws.amazon.com/iam). Using the left-hand navigation menu, select **Identity Providers**. Click **Create Provider**. 

![](/media/articles/integrations/aws/create-provider.png)

Set the following parameters:

| Parameter | Description and Sample Value |
| - | - |
| Provider Type | The type of provider. Set as <dfn data-key="security-assertion-markup-language">`SAML`</dfn> |
| Provider Name | A descriptive name for the provider, such as `auth0SamlProvider` |
| Metadata Document | Upload the file containing the Auth0 metadata, found in **Dashboard > Applications > Application Settings > Advanced Settings > Endpoints > SAML Metadata URL** |

![](/media/articles/integrations/aws/aws-configure-provider.png)

Click **Next Step**. Verify your settings and click **Create** if everything is correct.

![](/media/articles/integrations/aws/create-provider-confirm.png)

## Step 2: Create a Role for Your SAML Provider

To use the provider, you must create an IAM role using the provider in the role's trust policy. 

In the IAM console, navigate to [Roles](https://console.aws.amazon.com/iam/home#/roles). Click **Create role**.

![](/media/articles/tutorials/aws/roles1.png)

You'll be redirected to the **Trust** page. Indicate **Saml 2.0 federation** under **Select type of trusted entity**. 

![](/media/articles/tutorials/aws/roles3.png)

Provide the following values:

| Parameter | Value |
| - | - |
| SAML Provider | The name for your new role |
| Attribute | `SAML:iss` |
| Value | `urn:${account.namespace}` |

![](/media/articles/tutorials/aws/roles4.png)

Click **Next: Permissions** to proceed.

You will need to attach permissions policies to your new role. You'll attach a custom policy. To create one, click **Create Policy**.

![](/media/articles/tutorials/aws/roles5.png)

In the **Create policy** editor that launches, switch over to the **JSON** tab. 

![](/media/articles/tutorials/aws/roles6.png)

Provide a custom policy. 

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

This defines the permissions that users granted this role will have with AWS. Click **Review policy**.

![](/media/articles/tutorials/aws/roles7.png)

Review the policy that you've created. Be sure to provide a **Name** for your policy and (optionally) a **Description**.

Click **Create policy** when done.

![](/media/articles/tutorials/aws/roles8.png)

If successful, you'll see the following message confirming the creation of your new policy.

![](/media/articles/tutorials/aws/roles9.png)

Returning to the role creation wizard (you should be on step **2 - Permissions**), find the new policy you just create and click its checkbox to attach the policy to your role. We recommend using the **Customer managed** filter to find your policy.

Click **Next: Review** to proceed.

![](/media/articles/tutorials/aws/roles11.png)

Review the information about your role, provide a **Role name** and (optionally) a **Role description**. You'll see the policy you attached as well. If everything looks correct, click **Create role** to proceed.

![](/media/articles/tutorials/aws/roles12.png)

Once created, you can find your roles located on the primary **Roles** page.

![](/media/articles/tutorials/aws/roles13.png)

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
