---
description: How to Set up an Auth0 SAML Connection Against ADFS
---

# Set up an Auth0 SAML Connection Against ADFS

Auth0 allows you to create a custom SAML connection to Microsoft's Active Directory Federation Services. In addition to getting a bit more flexibility when configuring your mappings, the SAML Connection allows you identity provider-initiated flows (this is something that you cannot do with WS-Fed).

## Step 1: Configure ADFS

Begin by launching your instance of ADFS. Start the **Add Relying Party Trust** wizard.

![](/media/articles/protocols/saml-adfs/saml1.png)

On the **Welcome** page, choose **Claims aware** and click **Start**.

![](/media/articles/protocols/saml-adfs/saml2.png)

You'll see the **Select Data Source** page at this point. Select **Enter data about the relying party manually** and click Next to proceed.

![](/media/articles/protocols/saml-adfs/saml3.png)

On the **Specify Display Name** page, provide a descriptive name for your relying party (the typical format is `urn:auth0:${account.namespace}`) and a brief description under **Notes**. Click **Next**.

![](/media/articles/protocols/saml-adfs/saml4.png)

Next up is the **Configure Certificate** page. For now, we will skip this step, so click **Next** to proceed.

![](/media/articles/protocols/saml-adfs/saml5.png)

On the **Configure URL** page, check the box for **Enable support for the SAML 2.0 WebSSO protocol**. The wizard then asks for a **Relying party SAML 2.0 SSO service URL**. For the time being, provide a placeholder URL; we will return to this step at a later point. Click **Next**.

![](/media/articles/protocols/saml-adfs/saml6.png)

On the **Configure Identifiers** page, indicate that the **Relying party trust identifier** is `urn:auth0:${account.namespace}` (or whatever value you used as the display name when you started using the wizard). Click **Next**.

![](/media/articles/protocols/saml-adfs/saml7.png)

On the **Choose Access Control Policy** page, select **Permit everyone** and click **Next**.

![](/media/articles/protocols/saml-adfs/saml8.png)

Finally, review the settings you provided on the **Ready to Add Trust** page and click **Next** to save your information.

![](/media/articles/protocols/saml-adfs/saml9.png)

If you were successfully, you'll see a message indicating such on the **Finish** page. Make sure that the **Configure claims issuance policy for this application** checkbox is selected, and click **Close**.

![](/media/articles/protocols/saml-adfs/saml10.png)

## Step 2: Configure Auth0

Follow the tutorial on creating a SAML connection where [Auth0 acts as the service provider](/protocols/saml/saml-sp-generic). Where prompted, upload the signing certificate you exported from ADFS.

::: note
The sign in and sign out URLs are usually in the form of `https://your.adfs.server/adfs/ls`.
:::

Click **Save**.

## Step 3: Create the Relying Party Trust

Once you have set the required parameters for creating your Auth0 connection and clicked **Save**, you'll see a page with instructions on creating a new relying party trust in ADFS. You'll need the following parameters:

| Parameter | Sample Value |
| - | - |
| Post-back URL | `https://{yourAuth0accountdomain}/login/callback}/login/callback?connection={your new SAML connection}` |
| Entity ID | `urn:auth0:account:connection` |

The set of instructions presented to you after you've created your new connection with have the exact values required for your Auth0 account/connection.

In the ADFS console, select the relying party trust you created in step 1 and click **Properties**. 

Switch over to the **Identifiers** tab, and populate the **Relying Party Identifier** with the **Entity ID** value.

Switch over to the **Endpoints** tab, edit the **SAML Endpoint** field, and populate the **Trusted URL** with the **Post-back URL** value.

You'll now need to map your claims; for assistance on which LDAP attributes map to which Outgoing Claim Type, see [Connect Your App to ADFS](/connections/enterprise/adfs).

## Step 4: Enable and Test Your Integration.

Before you can test your Auth0-ADFS integration, you'll need to make sure that you've completed the following steps:

1. Create a user for your newly-created Connection.
2. Enable your Connection for at least one Client.

## Troubleshooting 