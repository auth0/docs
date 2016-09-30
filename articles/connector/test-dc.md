---
description: How to create and test an Active Directory Domain Controller.
---

# Creating a Test Active Directory Domain Controller

While Auth0's Active Directory/LDAP integration is powerful and relatively easy to set up, it does require you have access to an existing directory service and sufficient privileges to [install and configure the Connector](/connector/install) - which is something that is usually done by a network administrator.  But what if you'd just like to try out the Connector or maybe set up a separate dev or test environment?  The following steps will guide you in creating a minimal Active Directory Domain Controller installation on your own cloud-deployed virtual machine for just that purpose.

In these instructions you will:
* [Create a new Windows Server VM on Azure](#create-a-new-windows-server-vm-on-azure)
* [Install Active Directory Domain Services](#install-active-directory-domain-services)
* [Promote the server to a Domain Controller](#promote-the-server-to-a-domain-controller)
* [Add a few test groups and users](#add-a-few-test-groups-and-users)
* [Install and configure the AD/LDAP Connector](#add-a-few-test-groups-and-users)
* [Test an authentication flow from Auth0](#test-an-authentication-flow-from-auth0)

## Create a new Windows Server VM on Azure

The VM can run on any cloud platform, but we're going to walk through how to set it up on Azure.

1. If you don't have an account with Azure, [create one here](https://azure.microsoft.com).
1. Log into [Azure Management](https://manage.windowsazure.com).
1. At the bottom/left corner, click **NEW**, then **COMPUTE** > **VIRTUAL MACHINE** > **QUICK CREATE**
1. Complete the form:
  * Choose a DNS name. Example: `auth0-test-ad`
  * Image: **Windows Server 2012 R2 Datacenter**
  * Size: **D1**
  * User name: `ad-admin`
  * Password: (generate your own secure password)
  * Region: your choice  
1. Click the **CREATE A VIRTUAL MACHINE** button.
1. It will take a few minutes for the VM to be provisioned.
1. Click on the **ENDPOINTS** tab of the new VM and take note of the public port for the **Remote Desktop** endpoint.  In the screenshot below, that port is `64467`:  
![](/media/articles/connector/test-dc/remote-desktop-port.png)
1. Open up the Microsoft Remote Desktop client app on your local machine (Windows or Mac) and create a new connection to your VM that points to the hostname and port of your new VM and uses the user name and password you specified earlier:  
![](/media/articles/connector/test-dc/remote-desktop-connection.png)
1. Open the connection and disregard any certificate warnings presented by the Remote Desktop client.
1. You should automatically be logged in and eventually see a desktop that looks like this:  
![](/media/articles/connector/test-dc/new-vm-desktop.png)
1. If you're prompted to find PC's, devices, and content on the local network, choose **No**.

## Install Active Directory Domain Services

1. Click the PowerShell icon ![](/media/articles/connector/test-dc/powershell-icon.png) in the Windows Task Bar to open the **PowerShell Command Prompt**:  
![](/media/articles/connector/test-dc/powershell-command-prompt.png)
1. Install Active Directory Domain Services (ADDS) using this command:  
```powershell
Install-windowsfeature -name AD-Domain-Services –IncludeManagementTools
```

## Promote the server to a Domain Controller

1. Promote the server to a domain controller that manages a FQDN of `mycompany.local` using this command:  
```powershell
Install-ADDSForest –DomainName mycompany.local
```
1. You will prompted to enter the **SafeModeAdministratorPassword**, which is the same as the Administrator password you used when creating the VM.
1. You will also be prompted to confirm whether or not you want to continue.  Type Enter to do so.  The promotion script will run and the VM will automatically reboot.

## Add a few test groups and users

1. When the VM has finished rebooting, log back in again using the Remote Desktop client.
1. Open the PowerShell Command Prompt.
1. Run the following script, which will:
  * Create two groups: **Accounting** and **IT**
  * Create two users: **Bob Johnson** and **Mary Smith**
  * Add Bob to the **Accounting** group and Mary to both the **Account** and **IT** groups

  ```powershell
  New-ADGroup -Name "Accounting" -GroupScope "DomainLocal"
  New-ADGroup -Name "IT" -GroupScope "DomainLocal"

  New-ADUser -GivenName Bob -Surname Johnson -Name "Bob Johnson" -SamAccountName bob.johnson -Enabled $True -AccountPassword (ConvertTo-SecureString "Pass@word1!" -AsPlainText -force) -PasswordNeverExpires $True
  New-ADUser -GivenName Mary -Surname Smith -Name "Mary Smith" -SamAccountName mary.smith -Enabled $True -AccountPassword (ConvertTo-SecureString "Pass@word1!" -AsPlainText -force) -PasswordNeverExpires $True

  Add-ADGroupMember -Identity Accounting -Members "bob.johnson", "mary.smith"
  Add-ADGroupMember -Identity IT -Members "mary.smith"
  ```

## Install and configure the AD/LDAP Connector

1. In your Auth0 account, create a new **Active Directory/LDAP** connection with the name `auth0-test-ad` by following [these steps](/connections/enterprise/active-directory).  
  **NOTE**: Be sure to copy the **Ticket URL** that is generated at the end of those instructions.
1. On the VM, disable **Internet Explorer Enhanced Security Configuration** by following [these steps](http://blog.blksthl.com/2012/11/28/how-to-disable-ie-enhanced-security-in-windows-server-2012/).
1. Open **Internet Explorer** with the **Ticket URL** from above.
1. Follow the instructions in the browser to download, install, and configure the **Connector**.
1. Per those instructions, you will be prompted for the LDAP service account. Just use the admin account we created for the VM:
  * Username: `mycompany\ad-admin`
  * Password: (same as before)
1. When you're done with the instructions, reboot the server.
1. Log back into the VM using Remote Desktop.
1. Open the Connector configuration site again: http://localhost:8357/
1. Test that the **Connector** is able to find a user by clicking on the **Search** tab and under "Find User by Login", type `mary.smith` and click **Search**.
1. You should get JSON back that contains that user's AD profile data:  
![](/media/articles/connector/test-dc/test-find-user.png)

## Test an authentication flow from Auth0

To easily test that everything is working using your Auth0 account, we're going to configure your **Default App** in Auth0 to use your new **Active Directory / LDAP** connection and then use the `/authorize` endpoint to initiate an authentication flow.

1. In Auth0's Management Dashboard, browse to [your applications](${manage_url}/#/applications).
1. Click the **Settings** gear of your **Default App**
1. Make sure that `http://jwt.io` is in the list of the app's **Allowed Callback URLs**.
1. Click the **Connections** tab.
1. Under **Enterprise** make sure the `auth0-test-ad` **Active Directory / LDAP** connection is enabled.
1. Test the authentication flow by opening the following link in your browser:  
```
https://${account.namespace}/authorize?response_type=token&scope=openid%20profile&client_id=${account.clientId}&redirect_uri=http://jwt.io&connection=auth0-test-ad
```

1. Log in with one of the test users that was created in the directory.  For example:
  * Username: `mary.smith`
  * Password: `Pass@word1!`
  ![](/media/articles/connector/test-dc/auth-flow-login.png)
1. If everything is working, you should get redirected to the JWT.io website and be looking at the contents of the resulting JWT:  
  ![](/media/articles/connector/test-dc/auth-success.png)
