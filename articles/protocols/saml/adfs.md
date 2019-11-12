---
description: How to Set up an Auth0 SAML Connection Against ADFS
toc: true
topics:
  - saml
  - adfs
  - active-directory-federation-services
contentType:
  - how-to
useCase:
  - add-idp
  - saml-adfs
---

# Set Up an ADFS SAML Connection

Create a custom <dfn data-key="security-assertion-markup-language">SAML</dfn> connection to Microsoft's Active Directory Federation Services (ADFS) to get more flexibility when configuring your mappings. 

To create the custom connection, you will need to:

1. Configure ADFS.
2. Create a SAML connection where Auth0 acts as the service provider.
3. Edit the Relying Party Trust in ADFS.
4. Enable and test your integration.

The following sections will guide you through this process. 

## Configure ADFS

### Add a Relying Party Trust

See [Create a relying party trust](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/operations/create-a-relying-party-trust) for complete details.

1. Launch your instance of ADFS and start the **Add Relying Party Trust** wizard.
2. On the **Welcome** page, choose **Claims aware** and click **Start**. 
3. On the **Select Data Source** page, select **Enter data about the relying party manually** and click **Next**.
4. On the **Specify Display Name** page, provide a descriptive name for your relying party (the typical format is `urn:auth0:${account.tenant}:YOUR_CONNECTION_NAME`) and a brief description under **Notes**. Be sure to replace `YOUR_CONNECTION_NAME` with a unique name you will also use to create a connection in Auth0 in a [later step](#Create-a-SAML-connection-with-Auth0-as-the-service-provider). If you are unsure of the connection name at this time, you can always edit the connection name later. Click **Next**.
5. On the **Configure Certificate** page, click **Next**. (We will come back to configure the certificate later.)
6. On the **Configure URL** page, check the box for **Enable support for the SAML 2.0 WebSSO protocol**. The wizard then asks for a **Relying party SAML 2.0 SSO service URL**. For the time being, provide a placeholder URL; we will return to this step later. Click **Next**.
7. On the **Configure Identifiers** page, indicate that the **Relying party trust identifier** is `urn:auth0:${account.tenant}:YOUR_CONNECTION_NAME` (or whatever value you used as the display name when you started using the wizard). Click **Next**.
8. On the **Choose Access Control Policy** page, select **Permit everyone** and click **Next**.
9. Review the settings you provided on the **Ready to Add Trust** page and click **Next** to save your information. If you were successful, you'll see a message indicating that on the **Finish** page. 
10. Make sure that the **Configure claims issuance policy for this application** checkbox is selected, and click **Close**.

### Edit the Claim Issuance Policy

After you close the **Add Relying Party Trust** wizard, the **Edit Claim Issuance Policy** window appears.

1. Click **Add Rule...** to launch the wizard. 
2. Select **Send LDAP Attributes as Claims** for your **Claim rule template**, and click **Next**.
3. Provide a value for the **Claim rule name**, such as "LDAP Attributes" (it can be anything you want). 
4. Choose **Active Directory** as your **Attribute Store**. 
5. Map your LDAP attributes to the following outgoing claim types:

    | LDAP Attribute | Outgoing Claim |
    | - | - |
    | E-Mail-Addresses | E-Mail Address |
    | Display-Name | Name |
    | User-Principal-Name | Name ID |
    | Given-Name | Given Name |
    | Surname | Surname |

    ::: note
    The `Name ID` outgoing claim should always be present to ensure correct session handling. We strongly recommend adding all of the claims listed above, especially `E-Mail Address`, since they are the ones most commonly used.
    :::

    You can add additional claim mappings if necessary. See [Connect Your Application to Microsoft ADFS](/connections/enterprise/adfs#add-additional-ldap-attributes) for details.

6. Click **Finish**.
7. In the **Edit Claim Issuance Policy** window, click **Apply**. You can now exit out of this window.

### Export the Signing Certificate

Finally, you'll need to export the signing certificate from the ADFS console to upload it to Auth0.

1. Using the left-hand navigation pane, go to **ADFS > Service > Certificates**. Select the **Token-signing** certificate, and right click to select **View Certificate**.
2. On the **Details** tab, click **Copy to File...**. This launches the **Certificate Export Wizard**. Click **Next**.
3. Choose **Base-64 encoded X.509 (.CER)** as the format you'd like to use. Click **Next**.
4. Provide the location to where you want the certificate exported. Click **Next**.
5. Verify that the settings for your certificate are correct and  click **Finish**.

## Create a SAML connection with Auth0 as the service provider

1. Follow the tutorial on creating a SAML connection where [Auth0 acts as the service provider](/protocols/saml/saml-sp-generic). Where prompted, upload the signing certificate you exported from ADFS.

    The sign in and sign out URLs are usually in the form of `https://your.adfs.server/adfs/ls`.

2. Click **Save**. A page with instructions for creating a new Relying Party Trust in ADFS appears displaying the exact values required for your Auth0 account/connection. Make a note of these values. 

    Here is an example: 
    
    | Parameter | Example Value |
    | - | - |
    | Post-back URL | `https://<YOUR CUSTOM DOMAIN>/login/callback?connection=YOUR_CONNECTION_NAME` if a [custom domain](/custom-domains) is configured |
    | --- | `https://${account.namespace}/login/callback?connection=YOUR_CONNECTION_NAME` if not using custom domains |
    | Entity ID | `urn:auth0:${account.tenant}:YOUR_CONNECTION_NAME` |
    
## Edit the Relying Party Trust

1. In the ADFS console, go to **ADFS > Relying Party Trusts** using the left-hand navigation pane. Select the Relying Party Trust you created earlier and click **Properties** (located on the right-hand navigation pane). 
2. Select the **Identifiers** tab, and populate the **Relying Party Identifier** with the **Entity ID** value from the previous screen. Be sure to click **Add** to add the identifier to your list.
3. Select the **Endpoints** tab, and select the placeholder URL you provided earlier. Click **Edit...**.
4. Populate the **Trusted URL** with the **Post-back URL** value.
5. Click **OK**. Finally, click **Apply** and exit the Properties window.

## Optional: Enable sign requests

Optionally, you can sign your SAML requests to the ADFS server.

1. Go to the **Settings** page for your SAMLP Identity Provider in the Auth0 Dashboard.
2. Enable **Sign Requests**.
3. Just below the **Sign Requests** toggle is a link to download your certificate.
4. Return to ADFS and load the downloaded certificate using the **Signatures** tab of the Relying Party properties dialog.

## Enable and test your integration

Before you test your integration, make sure that you've completed the following steps:

* Create a user on the IdP that you can use to test your new connection.
* [Enable your Connection](/connections) for at least one application.

1. To test your connection, navigate to **Connections > Enterprise > ADFS**. 
2. Click the ADFS row (or the hamburger icon to the right) to bring up a list of your ADFS connections. 
3. Select the one you want to test and click the **play** button to test the connection.

## Keep reading

* [Troubleshooting SAML Configuration](/protocols/saml/saml-configuration/troubleshoot)
* [How SAML Authentication Works](https://auth0.com/blog/how-saml-authentication-works/)
