---
title: Android - Facebook Login
description: This tutorial demonstrates how to add user login to an Android application using native Facebook Login.
interactive:  true
files:
 - files/performLogin + SimpleCallback
 - files/onCreate
 - files/fetchSessionToken
 - files/fetchUserProfile
 - files/exchangeTokens
 - files/performLogin
github:
  path: https://github.com/auth0-samples/auth0-android-native-social-sample/tree/master/00-login-facebook
locale: en-US
---

# Android - Facebook Login


<p>This tutorial demonstrates how to add user login to an Android application using native Facebook Login. We recommend that you log in to follow this quickstart with examples configured for your account.</p><h2>System requirements </h2><ul><li><p>Android Studio 3.6.1</p></li><li><p>Android SDK 25</p></li><li><p>Emulator - Nexus 5X - Android 6.0</p></li></ul><p>This tutorial describes how to implement login with the <a href="https://developers.facebook.com/docs/">Facebook SDK</a>.​</p><h2>Before You Start</h2><ul><li><p>Install and configure the <a href="https://developers.facebook.com/docs/facebook-login/">Facebook Login SDK</a>. You’ll also go through the process of creating a Facebook app in <a href="https://developers.facebook.com/">https://developers.facebook.com</a>. <b>When you finish this step, you should have a mobile app running with Facebook Login integrated.</b></p></li></ul><p>Configure your Auth0 application in the dashboard to use Facebook Native Sign In. See <a href="https://auth0.com/docs/connections/nativesocial/facebook">Add Facebook Login to Native Apps</a>. <b>When you finish this step, your application will be able to implement Facebook Native Login.</b></p><p><b></b></p>

## Request Facebook permissions


<p>Your application is already able to sign in with Facebook. However, to ensure you have a rich user profile, you need to update the permissions with which the Facebook Login Button was set up.</p><p>Set the requested permissions to <code>public_profile</code> and <code>email</code>. This way, the user email will also be included as part of the response, provided the access request is accepted by the user.</p><p><code>loginButton.setPermissions(Arrays.asList(&quot;public_profile&quot;, &quot;email&quot;));</code></p>

## Create performLogin method {{{ data-action="code" data-code="performLogin + SimpleCallback" }}}


<p>Now, to kick off the authentication process with Auth0, create a new method in which you will prepare the payload to be sent.</p><p>You will make use of a small interface to handle our internal callbacks.</p><p>In the sample, the method was named <code>performLogin</code> and the interface <code>SimpleCallback</code>. Go ahead and add both.</p>

## Call performLogin method {{{ data-action="code" data-code="onCreate" }}}


<p>Now, call the method from the Facebook login callback&#39;s <code>onSuccess</code> method.</p>

## Integrate Facebook


<p>When you sign in with Facebook at Auth0, the backend will perform some checks in the background to ensure the user is who they say they are. To achieve this, it needs to be provided with a Session Access Token.</p><p>Furthermore, if a user needs to be created on Auth0 to represent this Facebook user, the backend will require some of their information, such as their name, last name, and email. The email, if provided, will be flagged as non-verified on the Auth0 user profile.</p><p>To obtain the Session Access Token and the user profile, two additional requests need to be made against the Facebook API.</p>

## Fetch Facebook session Access Token {{{ data-action="code" data-code="fetchSessionToken" }}}


<p>Make a new GET request against the Facebook API&#39;s <code>/oauth/access_token</code> endpoint. Use the following query parameters:</p><ul><li><p><code>grant_type</code>: <code>fb_attenuate_token</code>.</p></li><li><p><code>fb_exchange_token</code>: the access token received upon login.</p></li><li><p><code>client_id</code>: your App ID. This value comes from the Facebook Developer&#39;s dashboard and should already be in use in your application if you have integrated Facebook Login successfully.</p></li></ul><p>Put the logic from this step in its own method. You will be calling it later from the previously-added method.</p><p>The sample uses the Facebook SDK&#39;s <code>GraphRequest</code> class to perform this request.</p>

## Fetch Facebook user profile {{{ data-action="code" data-code="fetchUserProfile" }}}


<p>Now make another GET request, just like in the step above. The endpoint path will be the User ID value from the Facebook login result (for example, <code>/904636746222815</code>). Use the following parameters:</p><ul><li><p><code>access_token</code>: the access token received upon login.</p></li><li><p><code>fields</code>: the fields from the user profile that you&#39;d like to get back in the response. These are directly tied to the Facebook Login Button permissions that were configured at the beginning. When a permission is optional, the user must first consent to give access to it. For the purpose of signing up a user at Auth0, their full name and email will suffice.</p></li></ul><p></p>

## Integrate Auth0


<p>Now that the required artifacts have been obtained, you are ready to trade them for Auth0 user credentials, such as the ID and Access Tokens. But first, you must set up the Auth0 SDK to make that last request.</p><h3>Get your application keys</h3><ol><li><p>Go to the <b>Applications</b> section of the <a href="https://manage.auth0.com/">Auth0 Dashboard</a> and select the existing application in which you enabled <b>Sign in with Facebook</b>. If you need help with this step, please check the requirements section at the top of this article.</p></li><li><p>Copy the <b>Domain</b> and <b>Client ID</b> values from the application settings page. These are required by the SDK.</p></li><li><p>Create two new resources in your Android application&#39;s strings.xml file to store them. The name of the keys must match the ones used below:

<pre><code>&lt;resources&gt;

    &lt;string name=&quot;com_auth0_domain&quot;&gt;${account.namespace}&lt;/string&gt;

    &lt;string name=&quot;com_auth0_client_id&quot;&gt;${account.clientId}&lt;/string&gt;

&lt;/resources&gt;

</code></pre>

</p></li></ol><h3>Install the Auth0 SDK</h3><p>In your Android application, add this line to the app/build.gradle file:</p><p><pre><code>dependencies {

    implementation 'com.auth0.android:auth0:1.+'

}

</code></pre>

</p><p>Now is time to run the Gradle Sync task to refresh the project and its dependencies.</p><h3>Update manifest for web authentication</h3><p>If your application does not plan to make use of the Web Authentication module provided by the SDK, you will need to remove the unused activity from the AndroidManifest.xml file to prevent Manifest Placeholder issues. This can be achieved by adding an activity declaration and annotating it with tools:node=&quot;remove&quot;.</p><p><pre><code>&lt;application&gt;

  &lt;!-- Add the activity declaration line below --&gt;

   &lt;activity

    android:name=&quot;com.auth0.android.provider.AuthenticationActivity&quot;

    tools:node=&quot;remove&quot; /&gt;



&lt;/application&gt;

</code></pre>

</p><p>However, if you do plan to support Web Authentication, head over <a href="https://auth0.com/docs/libraries/auth0-android#authentication-via-universal-login">here</a> to learn how to declare the Manifest Placeholders.</p>

## Exchange the received data for Auth0 tokens {{{ data-action="code" data-code="exchangeTokens" }}}


<p>The SDK must be instantiated before use. Define a field at the class level and initialize it on the <code>onCreate</code> method. Note how the credentials defined in the step above are passed to the <code>Auth0</code> constructor and then a new instance of the <code>AuthenticationAPIClient</code> is created with it.</p><p><pre><code>private AuthenticationAPIClient auth0Client;



@Override

public void onCreate(Bundle savedInstanceState) {

    super.onCreate(savedInstanceState);



    setContentView(R.layout.activity_login);



    Auth0 account = new Auth0(getString(R.string.com_auth0_client_id), getString(R.string.com_auth0_domain));

    auth0Client = new AuthenticationAPIClient(account);



    //...

}

</code></pre>

</p><p>Create the method that will hold the logic to exchange the two obtained artifacts for Auth0 user credentials. In the sample, this method is named <code>exchangeTokens</code>.</p><p>The API client declares the method <code>loginWithNativeSocialToken</code> that receives a token and a subject type. The former corresponds to the session token, and the latter indicates what type of connection the backend will attempt to authenticate with.</p><p>For native Facebook Login, you will use the following value: <code>&quot;http://auth0.com/oauth/token-type/facebook-info-session-access-token&quot;</code></p><p>Other values that need to be configured are the user profile (using the <code>user_profile</code> key) and the scope you request the Auth0 tokens contain.</p><p><div class="alert-container" severity="default"><p>It&#39;s a good practice to keep all the values that you know won&#39;t change as constants at the top of the class. The sample makes use of constants for the subject token type, the Facebook permissions, and the Auth0 scopes. You can read more about Auth0 scopes in the dedicated <a data-contentfulid="78W9Q6R2zt6VRY0BouhtYG-en-US">article</a>.</p></div></p>

## Update performLogin method {{{ data-action="code" data-code="performLogin" }}}


<p>Now that every step is defined in its own method, it&#39;s time to put everything together inside the <code>performLogin</code> method.</p><p>If everything went well, you should now be able to authenticate natively with the Facebook Login SDK. This means that if the Facebook app is installed on the device, the authentication will be handled via the application and not a browser app.</p>
