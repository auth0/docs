## Customizing the Login Page

When you integrate Universal Login in your application, you redirect the user to the `/authorize` endpoint of your Auth0 tenant. If Auth0 needs to authenticate the user, it will show the default login page.

You can customize the login page in your [Dashboard](${manage_url}/#/login_page) under Hosted Pages, by enabling the **Customize Login Page** toggle.

![Login Page](/media/articles/hosted-pages/login.png)

## Customize Lock in the Login Page

The default login page for Universal Login with your tenant is a template that will use [Lock](/libraries/lock) to provide your users with an attractive interface and smooth authentication process. You can look over that template and use it as a starting point if you choose to customize it in any way.

If you want to change any of Lock's [configurable options](/libraries/lock/configuration), you can do so using the editor [Dashboard](${manage_url}/#/login_page) under Hosted Pages. These options can alter the behavior of Lock itself, or the look and feel of the widget using the theming options. See the [configuration documentation](/libraries/lock/configuration) for details on how to customize Lock.

When you're done making changes to the code, click **Save** to persist the changes.

![Login Page](/media/articles/hosted-pages/hlp-lock.png)
