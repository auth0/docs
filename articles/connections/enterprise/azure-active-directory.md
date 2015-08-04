---
title: Connecting Azure Active Directory with Auth0
connection: Azure Active Directory
image: /media/connections/azure.png
alias:
  - azure-ad
  - waad
  - windows-azure-ad
  - windows-azure-active-directory
  - microsoft-azure-ad
  - microsoft-azure-active-directory
---

# Obtaining a ClientId and Client Secret for a Microsoft Azure Active Directory

To allow users to login using a Microsoft Azure Active Directory account you have to register your application through the Microsoft Azure portal. If you don't have a Microsoft Azure account, you can signup for one, free, here <http://www.windowsazure.com/en-us/pricing/free-trial>.

> NOTE: there is no way to create an application that integrates with Microsoft Azure AD without having **your own** Microsoft Azure AD instance.

## 1. Create a new Microsoft Azure Active Directory instance

After signing up on Microsoft Azure, click on **Active Directory** item on the Dashboard.

<img src="https://cdn.auth0.com/docs/img/waad-0.png" style="width: 60%;  border: 2px solid #eee;" />

Click on **ADD+** at the bottom of the screen:

<img src="https://cdn.auth0.com/docs/img/waad-1.png" style="width: 60%;  border: 2px solid #eee;" />

Enter a subdomain, e.g.: **${account.tenant}** (this could be anything, does not have to match with Auth0 subdomain and it will be used in the next step). Enter also your country and a friendly name for the organization.

<img src="https://cdn.auth0.com/docs/img/waad-2.png" style="width: 60%;  border: 2px solid #eee;" />

## 2. Create a new Application

Once the Microsoft Azure AD was created, go to **APPLICATIONS** and click on **ADD AN APPLICATION**:

<img src="https://cdn.auth0.com/docs/img/waad-3.png" style="width: 60%;  border: 2px solid #eee;" />

Select "Add an application my organization is developing":

<img src="https://cdn.auth0.com/docs/img/waad-3b.png" style="width: 60%;  border: 2px solid #eee;" />

Enter a friendly name for the application and select "WEB APPLICATION AND/OR WEB API":

<img src="https://cdn.auth0.com/docs/img/waad-4.png" style="width: 60%;  border: 2px solid #eee;" />

Proceed to the next screen and enter the following:

* **SIGN-ON URL**: your application URL (completely arbitrary)
* **APP ID URI**: https://**${account.tenant}**.onmicrosoft.com/yourapp

> NOTE: The APP ID URI is just a logical identifier, not a real URL. It is important to use the value as specified above in APP ID URI. For instance, if the Microsoft Azure AD you've just created is **myorg.onmicrosoft.com**, here you would enter https://**myorg.onmicrosoft.com**/yourapp.

<img src="https://cdn.auth0.com/docs/img/waad-5.png" style="width: 60%;  border: 2px solid #eee;" />

## 3. Configure the Application

Once the application has been created, you will have to configure a couple of things. Click **CONFIGURE** to continue. On this screen you can customize the logo and the application URL that you entered before if needed.

Enter the following values on **KEYS** and **REPLY URL**, and click **Save**.

* **KEYS**: Select 1 or 2 years (when you save it will show the key)
* **REPLY URL**: https://${account.namespace}/login/callback

<img src="https://cdn.auth0.com/docs/img/waad-8.png" style="width: 60%;  border: 2px solid #eee;" />

The last step: modify permissions so your app can read the directory and click on **SAVE** at the bottom of the screen.

<img src="https://cdn.auth0.com/docs/img/waad-8b.png" style="width: 60%;  border: 2px solid #eee;" />

> NOTE: If you want to enable some extended attributes (like `Extended Profile` or `Security Groups`) you need also to enable the following permissions: **Application Permissions: Read directory data**, **Delegated Permissions: Access your organization's directory**.

Make sure to copy the value of the secret before leaving this screen.

<img src="https://cdn.auth0.com/docs/img/waad-9.png" style="width: 60%;  border: 2px solid #eee;" />

## 4. Copy the Client ID and Secret Auth0

Finally, copy and paste the Client ID and the Key in Auth0.

<img src="https://cdn.auth0.com/docs/img/waad-10.png" style="width: 60%;  border: 2px solid #eee;" />

**Congratulations!** You are now ready to accept Microsoft Azure AD users.

## Troubleshooting

* Make sure to use an Incognito/InPrivate window when granting access and use a Global Administrator user.

* If you get _Access cannot be granted to this service because the service listing is not properly configured by the publisher._ try turning on the **Application is Multi Tenant** option in the Windows Azure AD application on the Azure dashboard.
