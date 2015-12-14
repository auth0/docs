# How to Setup AWS to do Delegated Authentication with APIs

In order to do delegated authentication with AWS APIs you have to create a **SAML Provider** and one or more **Roles**. This document explains how to do that.

## Creating the SAML Provider

This is a one time setup

1. Go to the **AWS IAM Console** and click on **Identity Providers**

  ![](/media/articles/aws-api-setup/aws-api-setup-1.png)

2. Click on **Create SAML Provider** and give it a name.

  ![](/media/articles/aws-api-setup/aws-api-setup-2.png)

<% if (account.userName) { %>
3. Download the metadata from <a href="https://${account.namespace}/samlp/metadata/${account.clientId}">https://${account.namespace}/samlp/metadata/${account.clientId}</a> and upload it here.
<% } else { %>
3. Download the metadata from `https://${account.namespace}/samlp/metadata/${account.clientId}` and upload it here.
<% } %>

  ![](/media/articles/aws-api-setup/aws-api-setup-3.png)

4. The SAML Provider was created. You can close the modal.

  ![](/media/articles/aws-api-setup/aws-api-setup-4.png)

## Creating Roles

Now, you have to create a role that will have one or more policies associated. You can create as many roles as you want.

1. Go to **Roles**.

  ![](/media/articles/aws-api-setup/aws-api-setup-5.png)

2. Click on **Create New Role** and give it an arbitrary name.

  ![](/media/articles/aws-api-setup/aws-api-setup-6.png)

3. Select or enter the following values.

  * **SAML Provider**: the provider you've just created
  * **Attribute**: `SAML:iss`
  * **Value**: `urn:${account.namespace}`


  ![](/media/articles/aws-api-setup/aws-api-setup-7.png)

4. This is just a confirmation. Click on **Continue**.

  ![](/media/articles/aws-api-setup/aws-api-setup-8.png)

5. This is where you assign permissions to this role. In this example, we are creating a policy that give full access to the S3 resource `YOUR_BUCKET/<%= '${saml:sub}' %>`. This will be evaluated on runtime and replaced with the `user_id` of the logged in user.

  ![](/media/articles/aws-api-setup/aws-api-setup-9.png)

  > For more information about what AWS APIs are supported: <http://docs.aws.amazon.com/IAM/latest/UserGuide/Using_SpecificProducts.html>

6. Confirm the creation of the new role.

  ![](/media/articles/aws-api-setup/aws-api-setup-10.png)

7. Copy the **Role ARN** value. You will use this value later when calling the `/delegation` endpoint in Auth0.

  ![](/media/articles/aws-api-setup/aws-api-setup-11.png)

8. Copy the **Provider ARN** value. You will use this value later when calling the `/delegation` endpoint in Auth0.

  ![](/media/articles/aws-api-setup/aws-api-setup-12.png)
