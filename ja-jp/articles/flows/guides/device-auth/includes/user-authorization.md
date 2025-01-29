## User Authorization

The user will either scan the QR code, or else will open the activation page and enter the user code:

![Enter User Code](/media/articles/flows/guides/device-auth/enter-user-code.png)

A confirmation page will be shown to have the user confirm that this is the right device:

![Confirm Device](/media/articles/flows/guides/device-auth/confirm-device.png)

The user will complete the transaction by signing in. This step may include one or more of the following processes:

* Authenticating the user;
* Redirecting the user to an Identity Provider to handle authentication;
* Checking for active SSO sessions;
* Obtaining user consent for the device, unless consent has been previously given.

![Authenticate User](/media/articles/flows/guides/device-auth/user-auth.png)

Upon successful authentication and consent, the confirmation prompt will be shown:

![User Confirmation](/media/articles/flows/guides/device-auth/user-confirmation.png)

At this point, the user has authenticated, and the device has been authorized.