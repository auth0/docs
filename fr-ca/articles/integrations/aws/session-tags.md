---
title: Use AWS Session Tags with AWS APIs and Resources
description: Learn how to use AWS Session Tags to implement role-based access control (RBAC) for AWS APIs and Resources.
toc: true
topics:
  - integrations
  - aws
  - session-tags
  - rbac
contentType: how-to
useCase:
  - secure-an-api
  - integrate-third-party-apps
  - integrate-saas-sso
---
# Use AWS Session Tags with AWS APIs and Resources

With AWS Session Tags, you can tag resources and assign users key/value pairs, which allows you to implement role-based access control (RBAC) for AWS APIs and Resources.

In the example included in this guide, we will tag our AWS resources with AWS Session Tags, then create a policy for an AWS IAM role that will allow users with this role and the appropriate tags to perform specific actions on our AWS resources. We will then create a rule in Auth0 that will attach our AWS IAM role and appropriate AWS Session Tags to an Auth0 user and pass them through SAML assertions in the token. This example builds on the example provided in our [Configure Single-Sign-on (SSO) with the AWS Console](/integrations/aws/sso) guide.

## Prerequisites

::: panel Amazon Web Services (AWS) Account
Before proceeding, you will need a valid [Amazon Web Services (AWS) account](https://portal.aws.amazon.com/billing/signup#/start) for which you are an administrator.
:::

**Before beginning this guide:**

* [Configure Single Sign-on (SSO) with the AWS Console](/integrations/aws/sso)
* [Set up some AWS VM Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html#ec2-launch-instance). For the example in this guide, we use three separate instances.

## Steps

To use AWS Session Tags with AWS APIs and Resources, you must:

1. [Tag AWS instances](#tag-aws-instances)
2. [Create a specialized AWS IAM role](#create-a-specialized-AWS-IAM-role)
3. [Create an Auth0 rule](#create-an-auth0-rule)
4. [Test your setup](#test-your-setup)

### Tag AWS instances

First, you'll need to add tags to your AWS resources. To learn how to do so, follow instructions in [Amazon Elastic Compute Cloud User Guide for Linux Instances: Adding and Deleting Tags on an Individual Resource](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html#adding-or-deleting-tags).

For the example in this guide, you should have created three instances. Add the following tags:

| Instance | Tags |
| -------- | ---- |
| 1        | Key: `CostCenter`, Value: `marketing`.<br />Key: `Project`, Value: `website`. |
| 2        | Key: `CostCenter`, Value: `engineering`.<br />Key: `Project`, Value: `management_dashboard`. |
| 3        | Key: `CostCenter`, Value: `marketing`.<br />Key: `Project`, Value: `community_site`. |

### Create a specialized AWS IAM role

Now, create an IAM role using the AWS SAML identity provider you set up during the [prerequisites for this guide](#prerequisites). 

To learn how to set up an IAM user role with AWS, follow [AWS Identity and Access Management User Guide: Creating a Role for SAML 2.0 Federation (Console)](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp_saml.html).

While setting up your role, make sure you use the following parameters:

| Parameter | Description and Sample Value |
| --------- | ---------------------------- |
| SAML&nbsp;Provider | Name of the identity provider you created in the prerequisites, such as `auth0SamlProvider`. Select **Allow programmatic and AWS Management Console access**. |

When asked to **Attach permissions policies**, create a policy with the following JSON and name it `VirtualMachineAccessByCostCenter`.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeInstances"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:StartInstances",
                "ec2:StopInstances"
            ],
            "Resource": "*",
            "Condition": {
                "StringEquals": {
                    "ec2:ResourceTag/CostCenter": "<%= "${aws:PrincipalTag/CostCenter}" %>"
                }
            }
        }
    ]
}
```

Once the policy has been created, refresh the policy list for the role, then filter and select the new policy.

When reviewing your settings, make sure you use the following parameters:

| Parameter | Description | 
| --------- | ----------- |
| Role name | Descriptive name for your role, such as `AccessByCostCenter`. |
| Role description | Description of the purpose for which your role is used. |

### Create an Auth0 rule

To map the AWS role and tags to a user, you'll need to create a [rule](/rules) in Auth0. These values will then be passed through the SAML assertions in the token. 

For the example in this guide, [create the following rule](/dashboard/guides/rules/create-rules): 

::: note
Notice that you'll need to replace the `awsAccount` variable value with your own account number.
:::

```js
function(user, context, callback) {
  var awsAccount = '013823792818';
  var rolePrefix = `arn:aws:iam::` + awsAccount; 
  var samlIdP = rolePrefix + `:saml-provider/auth0SamlProvider`;

  user.awsRole = rolePrefix + `:role/AccessByCostCenter,` + samlIdP;
  user.awsRoleSession = user.email;
  user.awsTagKeys = ['CostCenter', 'Project'];
  user.CostCenter = 'marketing';
  user.Project = 'website';

  context.samlConfiguration.mappings = {
    'https://aws.amazon.com/SAML/Attributes/Role': 'awsRole',
    'https://aws.amazon.com/SAML/Attributes/RoleSessionName': 'awsRoleSession',
    'https://aws.amazon.com/SAML/Attributes/PrincipalTag:CostCenter': 'CostCenter',
    'https://aws.amazon.com/SAML/Attributes/PrincipalTag:Project': 'Project'
  };

  callback(null, user, context);
}
```

### Test your setup

You should now be able to log in to the AWS Console using an Auth0 user and test your implementation. 

To log in, you will need the SSO login for the AWS Console. To find it:

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the Application to view.

2. Click **Add-ons**, then the **SAML2 Web App** add-on.

3. Click the **Usage** tab, and locate **Identity Provider Login URL**. Navigate to the indicated URL.

Once you have signed in, from **EC2**, select **Instances**. Click one of the instances tagged with a `CostCenter` of `marketing`, and click **Actions** > **Instance State** > **Stop**. Notice that the action completes successfully.

Next, click the instance tagged with a `CostCenter` of `engineering`, and click **Actions** > **Instance State** > **Stop**. Notice that the action fails with an error.
