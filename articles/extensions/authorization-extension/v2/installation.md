---
title: Installing the Authorization Extension
description: How to install the Authorization Extension
---

# Authorization Extension: Installation

This doc walks you through the process of installing the Authorization Extension.

Before you begin, make sure that you have an existing [client](/client) that can be used with the Authorization Extension. Currently, you can use the following types of clients:

* Native
* Regular Web Applications
* Single Page Applications

Clients without an assigned type or Non Interactive Clients cannot be used with this extension.

::: warning
Installing this extension creates an `auth0-authz` client for your account. **Do not delete this client!** If you uninstall the extension at a later date, this client will be deleted automatically.
:::

## Install the Extension

To install the Authorization Extension, click on the "Auth0 Authorization" box located on the [Extensions](${manage_url}/#/extensions) page of the Management Dashboard. 

You'll be prompted to install the extension and to choose [where you'd like your data stored]. You can choose between Webtask Storage and an Amazon S3 bucket.

### Webtask Storage

The extension will use Webtask Storage by default, and you're limited to 500 KB of data. This is equivalent to:

 - 1000 groups and 3000 users, where each user is member of 3 groups
 - 20 groups and 7000 users, where each user is member of 3 groups

### Amazon S3

Alternatively, you can use Amazon S3 as a storage provider. To do so, you'll need to:

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
Amazon S3 is a file-based storage platform, which means it writes in parallel. This may cause issues, but the extension's storage logic attempts to take this into account. However, if you automate the creation of groups/roles/permissions, we suggest that you do so using sequential calls to the API.
:::

![Install Authorization Extension](/media/articles/extensions/authorization/app-install-v2.png)

Once the extension is installed, you'll see it listed under **Installed Extensions**.

![Installed Extensions](/media/articles/extensions/authorization/installed-extensions-v2.png)

When you click the link to open the extension for the first time, you'll be asked to provide permission for the extension to access your Auth0 account. If you do, you'll be redirected to the Authorization Dashboard.

![Authorization Dashboard](/media/articles/extensions/authorization/auth-dashboard-v2.png)

You can now use the Authorization Extension.