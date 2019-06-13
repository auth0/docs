# Auth0 Style Guide

This style guide covers the terminology and content specific to Auth0, along with some comments on common writing issues.

For general software-industry styles and terminology, see the [Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/).

## Voice

* Address the reader directly: "you". Use "we" only for Auth0's recommendations.
* Use the active voice.
* For instructions, use the imperative mood.

| **Incorrect** | **Correct** |
| --- | --- |
| User authentication data should be saved.| Save user authentication data. |
| Saving user authentication data is recommended. | We recommend that you save user authentication data. |

* Use gender-neutral pronouns: "they", "their".

| **Incorrect** | **Correct** |
| --- | --- |
| The user enters his password. | The user enters their password. |

* Avoid gerunds in headings and the main body.

| **Incorrect** | **Correct** |
| --- | --- |
| Saving User Authentication Data. | Save User Authentication Data. |
| Setting up the authorization process requires an ID Token and a valid Access Token. | To set up the authorization process, you need an ID Token and a valid Access Token. |

## Body text

* Keep paragraphs short for internet reading.
* Provide only the information necessary to understand and perform the steps.

| **Incorrect** | **Correct** |
| --- | --- |
| Authentication using JSON Web Tokens is stateless by nature, meaning that there is no information about the user's session stored on your server.| Authentication using JSON Web Tokens is stateless. This means that when you use it, no information about user session is stored on your server. |
| In this way, setting up a session for the user on the client side is simply a matter of saving the Access Token, ID Token, and a time that the Access Token expires at in browser storage. | To set up a session for the user on the client side, save the following information in browser storage: `access_token`, `id_token`, `expires_in`. |

* When mentioning several elements, use bulleted lists.
* Subheads are not independent statements. Repeat the information from the subhead in the paragraph.
* Avoid abbreviations.

| **Incorrect** | **Correct** |
| --- | --- |
| Don't hardcode paths in your application, e.g., the callback URL. | Don't hardcode paths in your application, for example, the callback URL. |
| Save all the important credentials: the Access Token, the Refresh Token, etc. in a safe location. | Save all the important credentials, such as the Access and Refresh Token, in a safe location. |

* Avoid contractions. Use complete words to be more authoritative.

| **Incorrect** | **Correct** |
| --- | --- |
| Can't | Cannot |

* Don't overuse adjectives. Never use more than two in a sentence.
* Don't overuse adverbs.

| **Incorrect** | **Correct** |
| --- | --- |
| The easiest way to enable authentication with Auth0 in your application is to use the OpenID Connect middleware. | To enable authentication in your application, use the OpenID Connect (OIDC) middleware. |
| Once a user has signed in, you can simply go to `/Account/Claims` to see these claims. | Once a user has logged in, you can go to `/Account/Claims` to see these claims. |

## Punctuation

* Use colons to introduce code or examples: "Install the dependencies using yarn: `code_snippet`"
* Use hyphens between adjectives and the verbs they modify. Don't use a hyphen if the adjective ends with "ly".

| **Incorrect** | **Correct** |
| --- | --- |
| "an easy to remember rule" | "an easy-to-remember rule" |
| "commonly-used adjectives" | "commonly used adjectives" |

* When you are quoting something in a sentence, keep the punctuation inside the quotation marks.
* When you are quoting code, do not add any punctuation inside the quotation marks.

## Formatting

* Use title case for first-level headings: "Log In with a Social Identity"
* Use sentence case for subheads: "About the login process"
* Use **Bold** for UI elements, such as menu items and field names.

| **Incorrect** | **Correct** |
| --- | --- |
| Click "Save". | Click **Save**. |
| You **must** save these values securely. | You must save these values securely. |

* Use `code_formatting` to refer to parameters and values. Avoid code formatting when mentioning types of objects.

| **Incorrect** | **Correct** |
| --- | --- |
| Save the "idToken" value in your client properties. | Save the `idToken` value in your client properties. |
| An `idToken` helps you identify the user. | An ID Token helps you identify the user. |

* The text of a link must include the title of the linked page. This helps the reader decide if they want to click on the link.

| **Incorrect** | **Correct** |
| --- | --- |
| You can read more about this feature [here](/rules). | Read more about this feature in the [Rules documentation](/rules). |

* Use blockquotes only for quotes. Don't use them for component styles.
* When you are referring to specific dates, abbreviate the following months: January (Jan.), February (Feb.), August (Aug.), September (Sept.), October (Oct.), November (Nov.), December (Dec.).
* When you are referring to a month alone or a month and a year, don't abbreviate the month.

| **Incorrect** | **Correct** |
| --- | --- |
| December 21 | Dec. 21|
| 21. December 2018 | Dec. 21, 2048 |
| Dec. 2048 | December 2048 |
| Mar. 15 | March 15 |
| 15 March 2048 | March 15, 2048 |

* Spell out whole numbers from zero to nine.
* Write numerically numbers from 10 up and fractions.
* Spell out any number that starts a sentence.
* If one number follows another immediately, spell out the first number.

| **Incorrect** | **Correct** |
| --- | --- |
| Save 3 items. | Save three items. |
| The password must contain at least twelve characters. | The password must contain at least 12 characters. |
| 14 plugins are available. | Fourteen plugins are available. |
| Configure 12 50GB drives | Configure twelve 50GB drives. |

* For additional information that is up to four lines long, use [notes](CONTRIBUTING.md#note).
* For additional information that is longer than four lines, use [panels](CONTRIBUTING.md#panels).
* For critical security information up to four lines long, use [warnings](CONTRIBUTING.md#warning).
* For critical security information longer than four lines, use [panel warnings](CONTRIBUTING.md#panel-warning).

## Vocabulary

* If an action is required, use "must".
* If an action is available, use "can".
* If an action is optional, use "may".

| **Incorrect** | **Correct** |
| --- | --- |
| To limit access to your resources, you should use scopes. | To limit access to your resources, you must use scopes. |
| You might want to use scopes to limit access to your resources. | To limit access to your resources, use scopes. |
| Creating more access roles is possible. | You may want to create more access roles. |

* Use "log in" and "log out" as verbs. Do not use "log into".
* Use "login" and "logout" as nouns. Do not use "login to".

| **Incorrect** | **Correct** |
| --- | --- |
| Log into the application. | Log in to the application. |
| Click the **Logout** button to activate the log-out action. | Click the **Log out** button to activate the logout action. |

* Use "set up" as a verb or "setup" as a noun.
* Use "roll out" as a verb or "rollout" as a noun. Do not use "roll-out".

| **Incorrect** | **Correct** |
| --- | --- |
| Setup the login screen. | Set up the login screen. |
| Edit the login screen set-up to display the **Log in** button. | Edit the login screen setup to display the **Log in** button. |

* Use "multi-factor authentication" instead of "multifactor authentication".
* Use "email address" instead of "e-mail address".
* Use "website" instead of "web site".
* Use "click on" when referring to text links in a webpage or UI. Use "click" when referring to a button.

| **Incorrect** | **Correct** |
| --- | --- |
| Select **Save**.| Click **Save**. |
| Click  **Go to Settings** at the bottom of the page to access the settings section. | Click on **Go to Settings** at the bottom of the page to access the settings section. |

* Depending on the situation, the reader can "gain access", "grant access", or "allow access".
* Refer to the developer's customer as the "user".
* If you need to use the name of a fictional company, use "ExampleCo".
* When you use a group of nouns as an adjective, use a hyphen.

| **Incorrect** | **Correct** |
| --- | --- |
| The method is executed at runtime. | The method is executed at run time. |
| The run-time engine must be running to execute the application.  | The runtime engine must be running to execute the application. |
| Write code for the client-side. | Write code for the client side. |
| Write the client side code. | Write the client-side code. |
| Save the logged in user's Access Token. | Save the logged-in user's Access Token. |

### The dashboard

* Dashboard: the [Auth0 management console](${manage_url}).
* The dashboard elements are called "section", "tab", "field".
* Dashboard-related terminology:
![](/media/readme/structure.png)

### The application

* Account: a user, their credentials, a profile and other attributes
* Tenant: a logical isolation unit of the products we offer. Examples of Auth0 tenants: `foo.auth0.com`, `bar.auth0.com`
* Auth0 tenants: regular cloud tenants
* Subscription: a contract or service plan. Examples of subscriptions: trial, free, developer or developer-pro
* Private Cloud/Managed Private Cloud: single-tenant deployment
