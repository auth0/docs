---
description: How to connect provider hosted apps to SharePoint Online.
---

# Connecting Provider Hosted Apps to SharePoint Online

Auth0 can help radically simplify the authentication process for SharePoint Apps. Auth0 will negotiate an access token you can the use to call SharePoint APIs.

You won't need any special libraries. You can use any of the SDKs supported by Auth0.

## 1. Register your app in Auth0

Just register a new app in Auth0 as you would normally do: __Applications > NEW__. Pick up any of the SDKs available for detailed instructions. Keep the `client_id` handy, as you will need it in the next step.

---

## 2. Create a Package for your app

You need to obtain a __Client ID__ and a __Client Secret__ for your app. There are many ways of registering your app depending on the expected usage. 

> [This article](http://msdn.microsoft.com/en-us/library/office/jj687469(v=office.15).aspx) explains all different ways of registering your app in SharePoint. This step in the tutorial will use the simplest form: using self-registration in a specific tenant (yours).

#### Open SharePoint Online

The URL for the dashboard is `https://{your Office365 tenant}.sharepoint.com/_layouts/15/appregnew.aspx`

#### Generate a __Client_Id__ and __ClientSecret__:

![](/media/articles/integrations/sharepoint-apps/90SvG.png)

#### Complete the information in the form:

Since Auth0 is in between your app and the Office 365 infrastructure, you need to use this URL for the app:

**App Domain**: 
  
  ${account.namespace}

**Redirect URI**:

  https://${account.namespace}/login/callback?{SpAppToken}&connection={CONNECTION NAME}&client_id={YOUR APP CLIENT ID}&redirect_uri={YOUR REDIRECT URL}

* `connection` is just the name you will use in Auth0's connections (e.g. "sharepoint").
* `client_id` identifies your app in Auth0 (created in steps 1).
* `redirect_uri` is the location in your actual app, where your users will land eventually after all negotiations complete. If you don't specify it, it will always be the app's callback URL defined in Auth0 (it could be localhost)

#### Package the app and upload to SharePoint:

Complete the information in your app manifest in Visual Studio:

![](/media/articles/integrations/sharepoint-apps/90SEc.png)

Notice the `Query string` will be exactly like the `Redirect URI` you completed before. Then right-click on the project and select `Publish`:

![](/media/articles/integrations/sharepoint-apps/90SUB.png)

Create a __Publishing Profile__ (you will have to enter the same __Client Id__ & __Client Secret__ obtained in the SharePoint dashboard).

Click on __Package__ and upload the resulting file to SharePoint.

---

## 3. Create the Connection in Auth0

The last step in the integration is to add a SharePoint connection in Auth0:

![](/media/articles/integrations/sharepoint-apps/8XoVl.png)

You will need:

* `Connection Name`. This is an arbitrary name. It has to match with what you entered in step 2.
* `Client Id` & `Client Secret`. Also need to match what you entered in step 2.
* `Test SharePoint Site Url`. This is the SP site URL used to test the connection. (e.g. when pressing the 'Try' button on the dashboard). This is never used at runtime because users will always follow the link to your site from within SharePoint.

---

Users will install your app from the Office Marketplace. When they click on the link, they will be directed to Auth0, which will negotiate the access token for you, and finally to your app. Your app will receive a `User Profile` that will look like this:

![](/media/articles/integrations/sharepoint-apps/8Xp6x.png) 

> Notice that the following properties will be included: `cacheKey`, `refresh_token`, `host` and `site`. These will allow you to call back SharePoint APIs (e.g. lists, etc.). 

  GET https://yoursite.sharepoint.com/_api/web/lists
  Accept: application/json;odata=verbose
  Authorization: Bearer {the access_token}