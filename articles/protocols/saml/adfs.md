---
description: How to Set up an Auth0 SAML Connection Against ADFS
toc: true
tags:
  - saml
  - adfs
---

# ADFS SAML Connection

Auth0 allows you to create a custom SAML connection to Microsoft's Active Directory Federation Services. In addition to getting a bit more flexibility when configuring your mappings, the SAML Connection allows you identity provider-initiated flows (this is something that you cannot do with WS-Fed).

## Step 1: Configure ADFS

To get your ADFS server ready, you'll need to:

1. Add a relying party trust
2. Edit your claim issuance policy
3. Obtain your federation metadata
4. Export the signing certificate to upload to Auth0 

### Add a Relying Party Trust

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

### Edit the Claim Issuance Policy

Immediately after you've closed out of the Add Relying Party Trust wizard, you'll see the **Edit Claim Issuance Policy** window pop up.

![](/media/articles/protocols/saml-adfs/saml11.png)

Click **Add Rule...** to launch the wizard. Use **Send LDAP Attributes as Claims** for your **Claim rule template**, and click **Next** to proceed.

![](/media/articles/protocols/saml-adfs/saml12.png)

Provide a value for the **Claim rule name**, such as LDAP Attributes (it can be anything you want). Choose **Active Directory** as your **Attribute Store**. Map your LDAP attributes to outgoing claim types as shown below. The only mandatory mapping you need is for the email address, but you can add as many as you'd like. Click **Finish**.

![](/media/articles/protocols/saml-adfs/saml13.png)

Back on the **Edit Claim Issuance Policy** window, click **Apply**. 

![](/media/articles/protocols/saml-adfs/saml14.png)

You can now exit out of this window.

### Obtain the Federation Metadata

To get your Federation Metadata, navigate to the following URL:

`https://your-server/FederationMetadata/2007-06/FederationMetadata.xml`

Your file will looking something like this:

![](/media/articles/protocols/saml-adfs/saml21.png)

Save the file for later use.

### Export the Signing Certificate

Finally, you'll need to export the signing certificate from the ADFS console to upload it to Auth0 at a later point.

Using the left-hand navigation pane, go to **ADFS > Service > Certificates**. Select the **Token-signing** certificate, and right click to select **View Certificate**.

![](/media/articles/protocols/saml-adfs/saml15.png)

On the **Details** tab, click **Copy to File...**.

![](/media/articles/protocols/saml-adfs/saml16.png)

This launches the Certificate Export Wizard. Click **Next** to proceed.

![](/media/articles/protocols/saml-adfs/saml17.png)

Choose **Base-64 encoded X.509 (.CER)** as the format you'd like to use. Click **Next**.

![](/media/articles/protocols/saml-adfs/saml18.png)

Provide the location to where you want the certificate exported. Click **Next**.

![](/media/articles/protocols/saml-adfs/saml19.png)

Verify that the settings for your certificate are correct. If they are, click **Finish** to proceed with the export process.

![](/media/articles/protocols/saml-adfs/saml20.png)

## Step 2: Configure Auth0

Follow the tutorial on creating a SAML connection where [Auth0 acts as the service provider](/protocols/saml/saml-sp-generic). Where prompted, upload the signing certificate you exported from ADFS.

::: note
The sign in and sign out URLs are usually in the form of `https://your.adfs.server/adfs/ls`.
:::

Click **Save**.

## Step 3: Edit the Relying Party Trust

Once you have set the required parameters for creating your Auth0 connection and clicked **Save**, you'll see a page with instructions on creating a new relying party trust in ADFS. You'll need the following parameters:

| Parameter | Sample Value |
| - | - |
| Post-back URL | `https://{yourAuth0accountdomain}/login/callback}/login/callback?connection={your new SAML connection}` |
| Entity ID | `urn:auth0:account:connection` |

The set of instructions presented to you after you've created your new connection will also have the exact values required for your Auth0 account/connection.

In the ADFS console, go to **ADFS > Relying Party Trusts** using the left-hand navigation pane. Select the relying party trust you created in step 1 and click **Properties** (located on the right-hand navigation pane). 

![](/media/articles/protocols/saml-adfs/saml22.png)

Switch over to the **Identifiers** tab, and populate the **Relying Party Identifier** with the **Entity ID** value. Be sure to click **Add** to add the identifier to your list.

![](/media/articles/protocols/saml-adfs/saml23.png)

Switch over to the **Endpoints** tab, and select the placeholder URL you provided earlier. Click **Edit...**.

![](/media/articles/protocols/saml-adfs/saml24.png)

Populate the **Trusted URL** with the **Post-back URL** value.

![](/media/articles/protocols/saml-adfs/saml25.png)

Click **OK**. Finally, click **Apply** and exit the Properties window.

### Map Your Claims

You can add additional claims mappings if necessary; for assistance on which LDAP attributes map to which Outgoing Claim Type, see [Connect Your App to ADFS](/connections/enterprise/adfs).

## Step 4: Enable and Test Your Integration.

Before you can test your Auth0-ADFS integration, you'll need to make sure that you've completed the following steps:

1. [Create a user](/tutorials/creating-users-in-the-management-portal) for your newly-created Connection.
2. [Enable your Connection](/applications/connections) for at least one Application.

To test your connection, navigate to **Connections > Enterprise > ADFS**. Click the ADFS row (or the hamburger icon to the right) to bring up a list of your ADFS connections. Identify the one you're testing, and click the **play** button to test the connection.

## Troubleshooting

If you have any issues with your SAML ADFS configuration, please see our [troubleshooting docs](/protocols/saml/saml-configuration/troubleshoot).
