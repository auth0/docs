# Obtaining a ClientId and Client Secret for a Windows Azure Active Directory

To allow users to login using a Windows Azure Active Directory account you have to register your application through the Windows Azure portal. If you don't have a Windows Azure account, you can signup for one, free, here <http://www.windowsazure.com/en-us/pricing/free-trial>.

> NOTE: there is no way to create an application that integrates with Windows Azure AD without having **your own** Windows Azure AD instance.

## 1. Create a new Windows Azure Active Directory instance

After signing up on Windows Azure, click on **Active Directory** item on the Dashboard.

<img src="img/waad-0.png" style="width: 60%;  border: 2px solid #eee;" />

Click on **ADD+** at the bottom of the screen:

<img src="img/waad-1.png" style="width: 60%;  border: 2px solid #eee;" />

Enter a subdomain, e.g.: **@@account.tenant@@** (this could be anything, does not have to match with Auth0 subdomain and it will be used in the next step). Enter also your country and a friendly name for the organization.

<img src="img/waad-2.png" style="width: 60%;  border: 2px solid #eee;" />

## 2. Create a new Application

Once the Windows Azure AD was created, go to **APPLICATIONS** and click on **ADD AN APPLICATION**:

<img src="img/waad-3.png" style="width: 60%;  border: 2px solid #eee;" />

Select "Add an application my organization is developing":

<img src="img/waad-3b.png" style="width: 60%;  border: 2px solid #eee;" />

Enter a friendly name for the application and select "WEB APPLICATION AND/OR WEB API":

<img src="img/waad-4.png" style="width: 60%;  border: 2px solid #eee;" />

Proceed to the next screen and enter the following:

* **SIGN-ON URL**: your application URL (completely arbitrary)
* **APP ID URI**: https://**@@account.tenant@@**.onmicrosoft.com/yourapp

> NOTE: The APP ID URI is just a logical identifier, not a real URL. It is important to use the value as specified above in APP ID URI. For instance, if the Windows Azure AD you've just created is **myorg.onmicrosoft.com**, here you would enter https://**myorg.onmicrosoft.com**/yourapp.

<img src="img/waad-5.png" style="width: 60%;  border: 2px solid #eee;" />

## 3. Configure the Application

Once the application has been created, you will have to configure a couple of things. Click **CONFIGURE** to continue. On this screen you can customize the logo and the application URL that you entered before if needed.

Enter the following values on **KEYS** and **REPLY URL**, and click **Save**.

* **KEYS**: Select 1 or 2 years (when you save it will show the key)
* **REPLY URL**: https://@@account.namespace@@/login/callback

<img src="img/waad-8.png" style="width: 60%;  border: 2px solid #eee;" />

The last step: modify permissions so your app can read the directory and click on **SAVE** at the bottom of the screen.

<img src="img/waad-8b.png" style="width: 60%;  border: 2px solid #eee;" />

Make sure to copy the value of the secret before leaving this screen.

<img src="img/waad-9.png" style="width: 60%;  border: 2px solid #eee;" />

## 4. Copy the Client ID and Secret Auth0

Finally, copy and paste the Client ID and the Key in Auth0.

<img src="img/waad-10.png" style="width: 60%;  border: 2px solid #eee;" />

**Congratulations!** You are now ready to accept Windows Azure AD users.
