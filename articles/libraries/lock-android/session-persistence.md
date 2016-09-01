# Lock Android: Session Persistence

In most of your apps, you want your users to be kept logged in, so that they don't have to enter their credentials once and again every time they re-launch the app. This management is known as *session persistence*, and there are many ways to achieve it.

This document exposes how to persist your users' sessions by using *tokens*.

## Tokens

A *token* is an identifier which is meant to validate authentication. 

Lock handles three types of tokens:

- `accessToken`: Used for authenticating requests against [Auth0 API](https://auth0.com/docs/api/info).
- `idToken`: A [JWT Token](https://jwt.io/) used for identifying the user.
- `refreshToken`: A special token used for obtaining new `idToken`s.

> All of these tokens are included within an instance of the [Credentials](https://github.com/auth0/Auth0.Android/blob/master/auth0/src/main/java/com/auth0/android/result/Credentials.java) class, check out its documentation for further reference.

We're going to focus on the `idToken` and `refreshToken` regarding how to achieve session persistence.

## The Process

You will use the users' `idToken` as a replacement for their credentials when performing a login, in order to prevent them from having to enter their credentials once and again.

These are the recommended steps you should perform for a full session persistence management:

1. Store the user's `idToken` upon login (we suggest you to at least, using a private [SharedPreference](https://developer.android.com/reference/android/content/SharedPreferences.html) for storing tokens securely).
2. Check the existence of an `idToken` each time the app is launched:
   - If it does not exist, [present the Lock login dialog](the-basics-of-using-lock#usage), as you used to do when not persisting sessions.
   - If it **does** exist:
     - Fetch the user profile, using that `idToken`.
       - If the `idToken` is valid, your user profile will be fetched. At this point, log your user into your app, by navigating the user through to the proper screen.
       - If the `idToken` is not valid, it means that it has expired. You have two choices here. Which one you choose is up to you:
         - [Present the Lock login dialog](the-basics-of-using-lock#usage) and make the user enter his credentials again.
         - Or, [use a refresh token](/refresh-token) to get a new valid `idToken` and user profile, in order to keep the user logged in.
3. Remove all the stored tokens upon user's logout.


## Example

You will find complete examples with the whole process in detail in the [Session handling quickstart for Android](/quickstart/native/android/03-session-handling)