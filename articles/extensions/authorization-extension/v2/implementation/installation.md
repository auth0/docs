---
title: Installing the Authorization Extension
description: How to install the Authorization Extension
toc: true
topics:
  - extensions
  - authorization_v2
contentType:
  - how-to
  - concept
useCase: extensibility-extensions
---
# Authorization Extension: Installation

::: note
<%= include('../../../../_includes/_rbac_methods') %>
:::

This doc walks you through the process of installing the Authorization Extension.

Before you begin, make sure that you have an existing [application](/application) that can be used with the Authorization Extension. Currently, you can use the following types of applications:

* Native
* Regular Web Applications
* Single-Page Applications

Applications without an assigned type or Machine to Machine Applications cannot be used with this extension.

## Install the Extension

To install the Authorization Extension, click on the **Auth0 Authorization** box located on the [Extensions](${manage_url}/#/extensions) page of the dashboard. 

You will be prompted to install the extension and to choose where you would like to store your data. You can choose between Webtask Storage and an Amazon S3 bucket.

### Webtask Storage

The extension will use Webtask Storage by default, and you are limited to 500 KB of data. This is equivalent to:

 - 1000 groups and 3000 users, where each user is member of 3 groups
 - 20 groups and 7000 users, where each user is member of 3 groups

### Amazon S3

Alternatively, you can use Amazon S3 as a storage provider.

::: warning
This extension has limitations in terms of performance and is not meant to be used with large data sets. Before you choose Amazon S3 for data storage, we recommend that you test and see how it performs for your case. Performance degradation is also a possibility as more data is added to S3.
:::

 To use Amazon S3 you need to:

 1. Create an S3 bucket
 2. Create an IAM user and get the Key ID and Key for that user
 3. Create a policy for the IAM user which allows the user to make changes to the bucket

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:DeleteObject",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:PutObject"
            ],
            "Resource": [
                "arn:aws:s3:::NAME-OF-YOUR-BUCKET/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::NAME-OF-YOUR-BUCKET"
            ],
            "Condition": {}
        }
    ]
}
```

::: note
Amazon S3 is a file-based storage platform, which means it writes in parallel. This may cause issues, but the extension's storage logic attempts to take this into account. However, if you automate the creation of groups/<dfn data-key="role">roles</dfn>/permissions, we suggest that you do so using sequential calls to the API.
:::

![Install Authorization Extension](/media/articles/extensions/authorization/app-install-v2.png)

Once the extension is installed, you will see it listed under **Installed Extensions**.

![Installed Extensions](/media/articles/extensions/authorization/installed-extensions-v2.png)

::: warning
Installing this extension creates an `auth0-authz` application for your account. **Do not delete this application!** If you uninstall the extension at a later date, this application will be deleted automatically.
:::

When you click the link to open the extension for the first time, you will be asked to provide permission for the extension to access your Auth0 account. If you do, you will be redirected to the Authorization Dashboard.

![Authorization Dashboard](/media/articles/extensions/authorization/auth-dashboard-v2.png)

## Keep Reading

::: next-steps
* [Configure the Authorization Extension](/extensions/authorization-extension/v2/implementation/configuration)
* [Set Up the Authorization Extension](/extensions/authorization-extension/v2/implementation/setup)
:::
