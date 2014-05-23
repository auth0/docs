# Connecting Provider Hosted Apps to SharePoint Online

Auth0 can help radically simplify the authentication process for SharePoint Apps. Auth0 will negotiate an access token you can the use to cal SharePoint APIs.

You won't need any special libraries. You can use any of the SDKs supported by Auth0.

##1. Register your app in Auth0

Just register a new app in Auth0 as you would normally do: __Applications > NEW__. Pick up any of the SDKs available for detailed instructions. Keep the `client_id` handy, as you will need in the next step.

##2. Create a Package for your app

You need to obtain an __App ID__ and an __App Secret__ for your app. The simples way today is to use Visual Studio or the SharePoint Online tools.

At one point you will be asked for the app's URL. Since Auth0 is in between your app and Office 365 infrastructure, you need to use this URL for the app:

	https://@@account.namespace@@/login/callback?{SpAppToken}&connection={CONNECTION NAME}&client_id={YOUR APP CLIENT ID}&redirect_uri={YOUR REDIRECT URL}

* `connection` is just the name you will use in Auth0's connections (e.g. "sharepoint").
* `client_id` identifies your app in Auth0 (created in steps 1).
* `redirect_uri` is the location in your app you want users to land eventually, after all negotiations complete. If you don't specify it, it will always be the app's callback URL.

##3. Create the Connection in Auth0

The last step in the integration is to add a SharePoint connection in Auth0:

![](http://puu.sh/8XoVl.png)

You will need:

* `Connection Name`: this is an arbitrary name. It has to match with what you entered in step 2.
* `App Id` & `App Secret`. Also need to match what you entered in step 2.
* `Test SharePoint Site Url`. This is the SP site URL used to test the connection. (when pressing the 'Try' button here on the dashboard). This is never used at runtime because users will always follow the link to your site from within SharePoint.

---

Users will install your app from the Office Marketplace. When they click on the link, they will be directed to Auth0, which will negotiate the access token for you, and finally to your app. Your app will receive a `User Profile` that will look like this:

![](http://puu.sh/8Xp6x.png) 

> Notice that the following properties will be included: `cacheKey`, `refresh_token`, `host` and `site`. These will allow you to call back SharePoint APIs (e.g. lists, etc.). 

