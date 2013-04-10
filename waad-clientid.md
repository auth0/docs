# Obtaining a ClientId and Client Secret for a Windows Azure Active Directory

To allow users to login using a Windows Azure Active Directory account you have to register your application through the Windows Azure portal. If you don't have a Windows Azure account, you can signup for one, free, here <http://www.windowsazure.com/en-us/pricing/free-trial>.

> NOTE: there is no way to create an application that integrates with Windows Azure AD without having **your own** Windows Azure AD instance.

## 1. Create a new Windows Azure Active Directory instance

After signing up on Windows Azure, click on **Active Directory** item on the Dashboard.

![](img/waad-0.png)

Click on **CREATE YOUR DIRECTORY**

![](img/waad-1.png)

Enter the subdomain, e.g.: **@@account.tenant@@** (this could be anything, does not have to match with Auth0 subdomain and it will be used in the next step). Enter also your country and a friendly name for the organization.

![](img/waad-2.png)

## 2. Create a new Integrated Application

Once the Windows Azure AD was created, go to **INTEGRATED APPS** and click on **ADD AN APP**

![](img/waad-3.png)

Enter a friendly name for the application and select either **SINGLE SIGN ON** or **SINGLE SIGN ON, READ DIRECTORY DATA**. The permission to **READ DIRECTORY DATA** will allow you to do things like a query of "users in the Windows Azure AD domain".

![](img/waad-4.png)

Enter the following:

* **APP URL**: your application URL (completely arbitrary)
* **APP ID URI**: https://**@@account.tenant@@**.onmicrosoft.com/yourapp

> NOTE: The APP ID URI is just a logical identifier, not a real URL. It is important to use the value as specified above in APP ID URI. For instance, if the Windows Azure AD you've just created is **myorg.onmicrosoft.com**, here you would enter https://**myorg.onmicrosoft.com**/yourapp.

![](img/waad-5.png)

## 3. Configure the Integrated Application

Once the application has been created, you will have to configure a couple of things. Click on **CONFIGURE** to continue.

![](img/waad-6.png)

First, make sure to turn on **EXTERNAL ACCESS**. You can also customize the logo here and the application URL that you entered before.

![](img/waad-7.png)

Then, enter the following values on **KEYS** and **REPLY URL**, and click **Save**.

* **KEYS**: Select 1 or 2 years (when you save it will show the key)
* **REPLY URL**: https://@@account.namespace@@/login/callback

![](img/waad-8.png)

Make sure to copy the value of the secret before leaving this screen.

![](img/waad-9.png)

## 4. Copy the Client ID and Secret in Auth0

Finally, copy and paste the Client ID and the Key in Auth0.

![](img/waad-10.png)

**Congratulations!** You are now ready to accept Windows Azure AD users.
