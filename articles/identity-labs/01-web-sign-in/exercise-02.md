---
section: exercises
description: Auth0 digital identity Lab 1, Exercise 2: Using Network Traces
topics:
  - digital identity
  - OIDC
  - OpenId Connect
  - OAuth2
contentType:
    - index
    - concept
---
# Lab 1, Exercise 2: Using Network Traces

::: warning
If you came to this page directly, go to the [first page of this lab](/identity-labs/01-web-sign-in) and read through the instructions before getting started.
:::

In this exercise, you will sign up for your application (which will also log you in) while exploring some of the relevant network traces of the authentication process.

1. Using Chrome, open **Developer Tools**. Switch to the **Network** tab then open your local application. You should immediately be redirected to Auth0 to login.

2. The first request you should see is a GET request to your application homepage:

![Network request for application homepage](/media/articles/identity-labs/lab-01-network-trace-01.png)

3. After that, you should see a GET request to `https://your-tenant-name.auth0.com/authorize`. This is the middleware added in exercise 1 taking over. The middleware checks if the user is logged in and, because they are not, it builds the OpenID Connect request to the authorization server URL and forwards the user to it. In this case, the complete GET request URL will look something like this (line breaks added for clarity):

```text
https://YOUR_DOMAIN/authorize
?client_id=YOUR_CLIENT_ID
&scope=openid%20profile%20email
&response_type=id_token
&nonce=71890cc63567e17b
&state=85d5152581b310e3389b
&redirect_uri=http%3A%2F%2Flocalhost%3A3000
&response_mode=form_post
```

---

The middleware sends several parameters. The important ones for this lab are:

- `client_id`: the unique identifier of your app at the authorization server
- `response_type`: the requested artifacts; in this case, you are requesting an ID token
- `scope`: why the artifacts are required, i.e. what content and capabilities are needed
- `redirect_uri`: where the results are to be sent after the login operation, i.e. the callback URL.
- `response_mode`: how the response from the server is to be sent to the app; in this case, the response we want is a POST request.

![Network request for authorization server](/media/articles/identity-labs/lab-01-network-trace-02.png)

::: note
If you scroll down while on the **Headers** tab in Chrome Developer Tools to the **Query String Parameters** section, you can see the different URL parameters in a more-readable table format.
:::

4. If you already have a user created, enter your credentials and continue below. If not, click the **Sign Up** link at the bottom (if you're using the classic page, this will be a tab at the top) and enter an email and password.

5. A consent dialog will be shown requesting access to your profile and email. Click the green button to accept and continue.

6. The authorization server will log you in and POST the response - an error if something went wrong or the ID token if not - back to the callback URL for your application. Once you’ve successfully logged in, you should see your user name on the page. This means authentication has been configured properly!

![Network request for application callback](/media/articles/identity-labs/lab-01-network-trace-03.png)

The complete trace of the callback request is:

```text
Request URL: `http://localhost:3000/callback`
Request Method: POST
Status Code: 302 Found
Remote Address: [::1]:3000
Referrer Policy: no-referrer-when-downgrade
Connection: keep-alive
Content-Length: 46
Content-Type: text/html; charset=utf-8
Date: Mon, 12 Nov 2018 23:00:08 GMT
Location: /
Set-Cookie: identity102-lab=eyJyZX[..]; path=/; httponly
Set-Cookie: identity102-lab.sig=wld5z7[..]; path=/; httponly
Vary: Accept
X-Powered-By: Express
id_token: eyJ0eX[..].eyJuaW[..].IEpcS5[..]
state: 85d5152581b310e3389b
```

::: note
If you see an error in your console about an ID token used too early, this is likely a clock skew issue in your local environment. Try restarting your machine and walking through the login steps again from the beginning.
:::

7. Click on the callback request, then search for the Form Data section of the Headers tab of the Developer Console. Copy the complete `id_token` value.

![Network request for ID token form post](/media/articles/identity-labs/lab-01-network-trace-04.png)

8. Go to [jwt.io](https://jwt.io) and paste the ID token copied from the last step into the text area on the left. Notice that as soon as you paste it, the contents of the text area on the right are updated. This is because the site decodes your ID token and displays its contents (claims) in that panel.

![Decoded ID token](/media/articles/identity-labs/lab-01-id-token-in-jwt-io.png)

Note the following:

- The token structure: it consists of the header (information about the token), the payload (the token’s claims and user profile information), and the signature.
- The claim `iss` is for the issuer of the token. It denotes who created and signed it. The value should match your Auth0 Domain value with an `https://` prefixed.
- The claim `sub` is the subject of the token. It denotes to whom the token refers. In our case, the value matches the ID of the Auth0 user.
- The claim `aud` is the audience of the token. It denotes for which app the token is intended. In our case, this matches the Client ID of the application that made the authentication request.
- The claim `iat` shows when the token was issued (seconds since Unix epoch) and can be used to determine the token’s age.
- The claim `exp` shows when the token expires (seconds since Unix epoch).

🎉 **You have completed Lab 1 by building a web application with sign-on using OpenID Connect!** 🎉

<a href="/identity-labs/" class="btn btn-transparent">← All Identity Labs</a>
