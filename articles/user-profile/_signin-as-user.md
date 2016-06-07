Navigate to the [Users](${uiURL}/#/users) page in the Management Dashboard and select the user you want to login as. Click on the _Sign in as User_ and select the app you want to log into using the dropdown menu.

![](/media/articles/user-profile/signin-as-user-01.png)

> Can't see the button? Check the following conditions; they should apply for the button to be displayed:
> - The applications registered in the account must have at least one callback URL listed.
> - The applications must have the connections turned on that the users who are to be impersonated belong to.

A popup displays the URL to be used in order to impersonate the user. You can choose either to copy the URL into the clipboard (white button) or open it in a separate browser tab/window (blue button).

![](/media/articles/user-profile/signin-as-user-02.png)

> You can also use the [Impersonation API](api/authentication#!#post--users--user_id--impersonate). The API generates a link that can be used once to log in as a specific user. To distinguish between real logins and impersonation logins, the profile of the impersonated user will contain additional `impersonated` and `impersonator` properties.
