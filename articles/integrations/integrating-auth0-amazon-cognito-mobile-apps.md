---
description: How to integrate Auth0 with Amazon Cognito using an OpenID Connect Provider.
tags:
  - integrations
  - amazon
  - cognito
  - oidc
---
# Integrate Auth0 with Amazon Cognito

**Amazon Cognito** is a backend as a service that lets you focus on writing a fantastic user experience for your application (native or web).

This document will explain how you can integrate your app with two solutions: Auth0 to get authentication with either [Social Providers](/identityproviders#social) (Facebook, Twitter, and so on), [Enterprise providers](/identityproviders#enterprise) or regular Username and Password, and [Amazon Cognito](http://aws.amazon.com/cognito/), to get a backend for your app without writing a line of code.

## Configure Amazon Web Services

### Create a new OpenID Connect Provider

The first step is to create an OpenID Connect Provider pointing to your Auth0 account. Please take a note of your Auth0 **domain** (`${account.namespace}`) and your **applicationId** these values can be found in the [Settings of your chosen Application](${manage_url}/#/clients/). These values will be used to create the Identity Pool in the [IAM Console](https://console.aws.amazon.com/iam/home).

1. In the [IAM Console](https://console.aws.amazon.com/iam/home) click on the **Identity Providers** link in the left sidebar. Click the **Create Provider** button.

    ![Create Provider](/media/articles/scenarios/amazon-cognito/create-provider.png)

1. Next you will choose the provider type, select **OpenID Connect** from the dropdown. For the **Provider URL** enter: `https://YOUR_ACCOUNT_NAME.auth0.com` and for **Audience** enter your **ClientId** ([find your ClientID](${manage_url}#/applications/)).

    ![Configure Provider](/media/articles/scenarios/amazon-cognito/configure-provider.png)

1. This will bring you to the **Verify Provider Information** screen, click the **Create** button.

    ![Verify Provider](/media/articles/scenarios/amazon-cognito/verify-provider.png)

1. Then you will be able to click on your newly created provider to find the **Provider ARN** which will be used in a later step.

1. Use the Thumbprint to verify the server certificate of your IdP. To learn how, see [Obtaining the Thumbprint for an OpenID Connect Identity Provider](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc_verify-thumbprint.html). 

::: note
It's not necessary to set up an IAM role after creating the identity provider. If you don't have one already, Cognito will create a default IAM role in the next step.
:::

To obtain the Auth0 Dashboard's Thumbprint value:

1. [Retrieve your Auth0 Domain's certificate chain.](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc_verify-thumbprint.html?icmpid=docs_iam_console)
2. Once you've obtained the certificate chain, isolate the last certificate in the chain.
3. Using the last certificate in the chain, [compute the fingerprint](https://www.samltool.com/fingerprint.php).
4. Convert the fingerprint to a thumbprint by removing all of the `:` characters.
5. Use the computed thumbprint when calling the `aws iam create-open-id-connect-provider` command.

### Create a Cognito Identity Pool

Now, you need to create an Identity Pool in the [Cognito Console](https://console.aws.amazon.com/cognito/home). This will be used to log in to Amazon Cognito using the Auth0 Identity Provider that you created in the previous step.

1. Sign in to the [Cognito Console.](https://console.aws.amazon.com/cognito/home)

1. Click **Manage Federated Identities** to start creating a new identity pool.

1. For **Identity Pool Name**, specify a name for the pool e.g. `Auth0`. Under **Authentication Providers**, click the **OpenID** tab and select the name of the provider you created in the previous steps. Click **Create Pool**.

    ![Create Identity Pool](/media/articles/scenarios/amazon-cognito/identity-pool.png)

1. This will bring up a confirmation page for allowing access to your resources. By default, Amazon Cognito creates a new role with limited permissions - end users only have access to Cognito Sync and Mobile Analytics. You can modify the roles if your application needs access to other AWS resources, such as S3 or DynamoDB. Click **Allow** to finish creating the new identity pool.

    ![Confirmation page](/media/articles/scenarios/amazon-cognito/allow-role.png)

1. Click **Edit Identity Pool** to view the the Identity Pool ID.

    ![View the Identity Pool ID](/media/articles/scenarios/amazon-cognito/pool-id.png)

1. Finally, grab the ARN of the role that was automatically created in the previous step from the [IAM console](https://console.aws.amazon.com/iam/home) this value will be used when sending credentials to Cognito.

    ![Role ARN](/media/articles/scenarios/amazon-cognito/role-arn.png)

## Auth0 Configuration

Amazon will use the public signing key from the [OpenID Provider Metadata](https://subscription.auth0.com/.well-known/jwks.json) to validate the signature of the JSON Web Token.

By default Auth0 will use the HS256 signature algorithm which is not supported in this scenario (this will result in "Invalid login token" errors). Go to your application in the [dashboard](${manage_url}/#/applications), click the **Show Advanced Settings** link and then **OAuth** and change the algorithm to **RS256**.

![Change to RS256](/media/articles/scenarios/amazon-cognito/jwt-algorithm.png)

## Implementation

You can use [Auth0 Lock](https://github.com/auth0/lock) to log the user in. You can read detailed instructions on how to implement Lock in [the libraries documentation](/libraries#lock-login-signup-widgets).

Once the user is successfully logged in with Auth0, the next step is to send their credentials to Amazon Cognito [see the Cognito docs](http://docs.aws.amazon.com/cognito/latest/developerguide/open-id.html) to see how to implement this with depending on the platform.

Cognito takes the ID Token that you obtain from the OIDC identity provider and uses it to manufacture unique Cognito IDs for each person who uses your app. When the user is logged in to Cognito through Auth0 you can store information in Cognito that only this user will be able to access. 

For example (with Swift):

```swift
let cognitoSync = AWSCognito.defaultCognito()
let dataset = cognitoSync.openOrCreateDataset("MainDataset")
// Get an existing value
dataset.synchronize().continueWithBlock { (task) -> AnyObject! in
    dispatch_async(dispatch_get_main_queue(), { () -> Void in
        self.textValue.text = dataset.stringForKey("value")
    })
    return nil
}

// Set a new value
dataset.setString(self.textValue.text, forKey: "value")
dataset.synchronize()
```

## Keep reading

::: next-steps
* [Amazon Cognito: Open ID Connect Providers](http://docs.aws.amazon.com/cognito/latest/developerguide/open-id.html)
* [Amazon IAM: Creating OpenID Connect (OIDC) Identity Providers](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html)
:::
