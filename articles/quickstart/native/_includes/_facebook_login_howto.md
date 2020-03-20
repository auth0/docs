## Setup the “Continue with Facebook” Button

### Requesting Facebook permissions

Your application is already able to sign in with Facebook. But in order to have a rich user profile, the permissions with which the Facebook Login Button is set up need to be updated.

${snippet(meta.snippets.facebook_button_permissions)}

Now, in order to kick off the authentication process with Auth0, create a new method where you will prepare the payload to be sent. 

${snippet(meta.snippets.facebook_button_config)}

## Integrate Facebook

When you sign in with Facebook at Auth0, the backend will perform some checks in the background to ensure the user is who they say they are. To achieve this, it needs to be provided with a "Session Access Token". 

Furthermore, if a user needs to be created on Auth0 to represent this Facebook user, it will require some of their information such as their name, last name and email. The email, if provided, can be automatically verified by the backend and marked as such on the Auth0 user profile. 

In order to obtain the Session Access Token and the user profile, two additional requests need to be made against the Facebook API.

### Fetch Facebook session access token

Make a new GET request against the Facebook API's `/oauth/access_token` endpoint.
Use the following query parameters:
- `grant_type`: `fb_attenuate_token`.
- `fb_exchange_token`: the access token received upon login.
- `client_id`: your App ID. This value comes from the Facebook Developer's dashboard and should already be in use in your application in order to have integrated Facebook Sign In successfully.

Put the logic from this step on its own method. You will be calling it later from the previously added method.

${snippet(meta.snippets.facebook_fetch_session_token)}

### Fetch Facebook user profile

Now make another GET request, just like in the step above. The endpoint path will be the User ID value from the Facebook login result, e.g. `/904636746222815`.
Use the following parameters:
- `access_token`: the access token received upon login.
- `fields`: the fields from the user profile that you'd like to obtain back in the response. These are directly tied to the Facebook Login Button permissions that were configured at the begginning. When a permission is optional, the user must first consent to give access to it. For the purpose of signing up a user at Auth0, their full name and email will suffice. 

${snippet(meta.snippets.facebook_fetch_profile)}

## Integrate Auth0

Now that the required artifacts have been obtained you are ready to trade them for Auth0 user credentials, such as the ID and Access Tokens. Before getting there, you must set up the Auth0 SDK to make that last request.

### Get your application keys

Go to the **Applications** section of the [Auth0 Dashboard](https://manage.auth0.com/) and select the existing application in which you had enabled **Sign in with Facebook**. If you need help with this step, please check the requirements section at the top of this article.

Take the **Domain** and **Client ID** values from the application settings page. These are required by the SDK to properly initialize and communicate against Auth0.

${snippet(meta.snippets.facebook_app_credentials)}

### Install the Auth0 SDK

${snippet(meta.snippets.facebook_install_auth0_sdk)}

### Exchange the received data for Auth0 tokens

${snippet(meta.snippets.facebook_token_exchange)}