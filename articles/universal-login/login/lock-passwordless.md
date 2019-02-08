---
description: How to use Lock Passwordless with Universal Login
topics:
  - login
  - universal-login
  - passwordless
  - hosted-pages
  - lock
contentType: how-to
useCase: customize-hosted-pages
---
# Universal Login with Lock Passwordless

Using Lock Passwordless in a Universal Login page is the easiest and most secure implementation of [passwordless authentication](/connections/passwordless) that can be achieved. Additionally, Universal Login is the **only** way to perform passwordless authentication with native applications at this time.

## Lock Passwordless Template

You can start out with a basic template that will provide you with a working, ready-to-use example of Lock with Passwordless Mode in the login page. 

In the [dashboard](${manage_url}), go to **Hosted Pages**, and then to the **Login** page section. 

At the top of the code editor for the page contents, you'll see a dropdown, titled **Default Templates**. Here you can choose from `Lock`, `Lock Passwordless`, or `Custom UI`. 

Choose `Lock Passwordless` to get started.

![Login Page](/media/articles/hosted-pages/hlp-lock-passwordless.png)

<%= include('./_custom-domains') %>

## Next Steps

Are you looking for more information about Lock? Or are you ready to get started with your own login page?

::: next-steps
* [Read more about Lock](/libraries/lock)
* [Get started on your own login page](${manage_url}/#/login_page)
:::
