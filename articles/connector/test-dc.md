---
description: How to create and test an Active Directory Domain Controller.
toc: true
topics:
  - connector
  - ad/ldap
contentType: how-to
useCase:
  - add-login
  - customize-connections
  - add-idp
---
# Creating a Test Active Directory Domain Controller

Auth0's AD/LDAP integration is relatively easy to set up, but it does require that you have access to an existing AD service and sufficient privileges to [install and configure the Connector](/connector/install). What if, however, you'd just like to try out the Connector or set up a dev/test environment? The following steps guides you in creating a minimal AD Domain Controller installation on a cloud-deployed virtual machine for these purposes.

## Create a New Windows Server VM on Azure

You can run your VM on any cloud platform, but this guide will walk through how to set one up on Microsoft Azure.

1. If you don't have an account with Azure, [create one](https://azure.microsoft.com) before proceeding.
1. Log into the [Azure Management](https://manage.windowsazure.com) console.
1. At the bottom left corner, click **NEW**, then **COMPUTE** > **VIRTUAL MACHINE** > **QUICK CREATE**
1. Complete the form:
    * Choose a DNS name. Example: `auth0-test-ad`
    * Image: **Windows Server 2012 R2 Datacenter**
    * Size: **D1**
    * User name: `ad-admin`
    * Password: (generate your own secure password)
    * Region: (your choice)
1. Click the **CREATE A VIRTUAL MACHINE** button. It will take a few minutes for the VM to provision.
1. Click on the **ENDPOINTS** tab of the new VM, and take note of the **PUBLIC PORT** for the **Remote Desktop** endpoint.

    ![](/media/articles/connector/test-dc/remote-desktop-port.png)

1. Open up Microsoft Remote Desktop client (Windows or Mac) or the client of your choice (such as [rdesktop](http://www.rdesktop.org/) for Linux systems). Create a new connection to your VM:

    ![](/media/articles/connector/test-dc/remote-desktop-connection.png)

1. Open the connection, disregarding any certificate warnings presented by the Remote Desktop client. You should be logged in automatically and eventually see a desktop that looks like this:

    ![](/media/articles/connector/test-dc/new-vm-desktop.png)

1. If you're prompted to find PC's, devices, and content on the local network, choose **No**.

## Install Active Directory Domain Services

1. Click the PowerShell icon ![](/media/articles/connector/test-dc/powershell-icon.png) in the Windows Task Bar to open the **PowerShell Command Prompt**.

    ![](/media/articles/connector/test-dc/powershell-command-prompt.png)

1. Install Active Directory Domain Services (ADDS) using this command:
    ```powershell
    > Install-windowsfeature -name AD-Domain-Services –IncludeManagementTools
    ```

    ::: note
    Note that the `Install-windowsfeature` command first became available in Windows Server 2012. In Windows Server 2008, the equivalent command was `Add-windowsfeature` (See [MSDN](https://msdn.microsoft.com/en-us/library/ee662309.aspx) for more information).
    :::

## Promote the Server to a Domain Controller

1. Promote the server to a domain controller that manages a FQDN of `mycompany.local`:
    ```powershell
    > Install-ADDSForest –DomainName mycompany.local
    ```
1. When prompted for the **SafeModeAdministratorPassword**, enter the Administrator password you used when creating the VM.
1. You will also be prompted to confirm whether or not you want to continue. Click Enter to do so. The promotion script will run and the VM will automatically reboot.

## Add Test Groups and Users

1. Once the VM finishes rebooting, log in to the VM using the Remote Desktop client.
1. Open the PowerShell Command Prompt.
1. Run the following script, which will:
    * Create two groups: **Accounting** and **IT**
    * Create two users: **Bob Johnson** and **Mary Smith**
    * Add Bob to the **Accounting** group and Mary to the **Account** *and* **IT** groups

```powershell
> New-ADGroup -Name "Accounting" -GroupScope "DomainLocal"
> New-ADGroup -Name "IT" -GroupScope "DomainLocal"

> New-ADUser -GivenName Bob -Surname Johnson -Name "Bob Johnson" -SamAccountName bob.johnson -Enabled $True -AccountPassword (ConvertTo-SecureString "Pass@word1!" -AsPlainText -force) -PasswordNeverExpires $True
> New-ADUser -GivenName Mary -Surname Smith -Name "Mary Smith" -SamAccountName mary.smith -Enabled $True -AccountPassword (ConvertTo-SecureString "Pass@word1!" -AsPlainText -force) -PasswordNeverExpires $True

> Add-ADGroupMember -Identity Accounting -Members "bob.johnson", "mary.smith"
> Add-ADGroupMember -Identity IT -Members "mary.smith"

```

## Install and Configure the AD/LDAP Connector

1. Using the [Auth0 Management Dashboard](${manage_url}), create a new **Active Directory/LDAP** connection with the name `auth0-test-ad` by following [these steps](/connections/enterprise/active-directory-ldap).
    ::: note
    Be sure to copy the **Ticket URL** that is generated at the end of those instructions.
    :::
1. On the VM, [disable **Internet Explorer Enhanced Security Configuration**](http://blog.blksthl.com/2012/11/28/how-to-disable-ie-enhanced-security-in-windows-server-2012/).
1. Open **Internet Explorer** with the **Ticket URL** you saved in step 1.
1. Follow the instructions in the browser to download, install, and configure the **Connector**. When you are prompted for the LDAP service account, use the admin account you created for the VM:
    * Username: `mycompany\ad-admin`
    * Password: (same as before)
1. When you're done configuring and installing the Connector, reboot the server.
1. Log back into the VM using Remote Desktop.
1. Open the Connector configuration site by navigating to `http://localhost:8357/`.
1. Check that the **Connector** is able to find a user:
    * Click on the **Search** tab.
    * Under "Find User by Login", type `mary.smith`.
    * Click **Search**. You should get JSON back that contains that user's AD profile data:

    ![](/media/articles/connector/test-dc/test-find-user.png)

## Test an Authentication Flow from Auth0

To ensure that everything is working using your Auth0 account, we're going to configure your **Default App** in Auth0 to use your new **Active Directory / LDAP** Connection, and use the `/authorize` endpoint to initiate an authentication flow.

1. Using the [Auth0 Management Dashboard](${manage_url}), navigate to your [Applications](${manage_url}/#/applications).
1. Click the **Settings** icon of your **Default App**
1. Add `http://jwt.io` to the list of the Application's **Allowed Callback URLs**.
1. Click the **Connections** tab.
1. Under **Enterprise**, enable the `auth0-test-ad` **Active Directory / LDAP** connection.
1. Test the authentication flow by opening the following link in your browser:
    ```html
    https://${account.namespace}/authorize?response_type=token&scope=openid%20profile&client_id=${account.clientId}&redirect_uri=http://jwt.io&connection=auth0-test-ad
    ```

1. Log in with one of the test users that was created in the directory:
    * Username: `mary.smith` or `bob.johnson`
    * Password: `Pass@word1!`

    ![](/media/articles/connector/test-dc/auth-flow-login.png)
1. If everything is working, you should be redirected to the JWT.io website to see the contents of the resulting JWT:
    ![](/media/articles/connector/test-dc/auth-success.png)
