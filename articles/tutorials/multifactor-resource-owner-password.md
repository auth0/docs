---
description: Using Resource Owner Password Grant together with MFA
---

# Multifactor authentication and Resource Owner Password

Highly trusted apps can use the (Resource Owner Password Grant)[https://auth0.com/docs/api-auth/grant/password] to access an API.
This flow allows highly trusted apps to get access tokens, id tokens and refresh tokens by asking the end-user to enter username and password.
For some use cases, username and password might not be enough to authenticate the user, and so Multifactor Authentication might be required
to get an stronger authentication. MFA grant types together with (Resource Owner Password Grant)[https://auth0.com/docs/api-auth/grant/password]
allows you to use MFA on highly trusted apps.

## Prerequisites
1. Enabling MFA with a supported provider: to use MFA with password grant flows you need to enable one of the supported providers from Auth0 dashboard. Currently the supported providers are (Google Authenticator)[https://auth0.com/docs/multifactor-authentication/google-auth/admin-guide#enabling-google-authenticator-for-mfa] and (Guardian)[https://auth0.com/docs/multifactor-authentication/administrator#guardian-basics]. DUO provider does not support this flow and you will get an
error if you try to use it.

2. At least a client ready to execute one of the resource owner password grant flows as described [here](https://auth0.com/docs/api-auth/tutorials/password-grant).

3. End users must have already enrolled to MFA. This might be achieved in various ways depending on the provider.
   a. For Guardian: the recommended way to start enrollment is using an (enrollment ticket)[https://auth0.com/docs/multifactor-authentication/administrator/guardian-enrollment-email#sending-a-guardian-enrollment-email-to-a-user].

   b. For Google Authenticator provider: Google Authenticator provider supports self-enrollment as the single enrollment method, you will need to start an
   authentication flow using a flow that support enrollment (e.g. (Authorization)[https://auth0.com/docs/api/authentication#database-ad-ldap-passive-])

## Normal Flow
The flow starts collecting end-user credentials and sending them to the Authorization Server as described for (Resource Owner Password Grant)[https://auth0.com/docs/api-auth/grant/password]. Both (password)[https://auth0.com/docs/api-auth/tutorials/password-grant] and (password-realm)[https://auth0.com/docs/api-auth/tutorials/password-grant#realm-support] grant types are available:

1. The end-user enters the credentials into the client application
2. The client forwards the Resource Owner's credentials to the Authorization Server
3. The Authorization server validates the credentials and executes the (rules)[https://auth0.com/docs/rules].
4. If any of the rules states that MFA must be enabled for current user `mfa_required` error is returned.
The error will contain a `mfa_token` property.
5. The client executes a request to get an (MFA challenge)[#link-to-the-api] specifying the challenge types it supports.
6. The authorization server resolves the preferred challenge type based on the ones available for the user and the ones supported by client application and sends the response containing the `challenge_type` and, optionally, extra information needed to resolved the challenge and display the right ui to the user.

### For `challenge_type=otp`
This challenge type means that the client must get an `otp` code from a OTP Generator app such as Google Authenticator, Microsoft Authenticator, etc.

7. The client prompts the end-user to enter otp code.
8. End user enters otp into the client application.
9. Client application forwards otp code to the authorization server using (`grant_type=http://auth0.com/oauth/grant-type/mfa-otp`)[#link to api] and including the `mfa_token` got on step 4.
10. Authorization server validates the provided otp and returns the access/refresh token.

### For `challenge_type=oob` and `binding_method=prompt`
This challenge type together with `prompt` binding method means that the challenge will be delivered to the user using a side channel (such as SMS) and that a `binding_code` is needed to bing the side channel to the one you are using to authenticate. The binding code is sent as part of the challenge message and it is usually an otp-like code made of 6 numeric digits.

7. The client application prompts the user for the `binding_code` and keeps the `oob_code` got in step 6 for future usage.
8. End user receives the challenge onto the side channel and enters the `binding_code` into the client application.
9. Client application forwards `binding_code` to the authorization server using (`grant_type=http://auth0.com/oauth/grant-type/mfa-oob`)[#link to api] and including the `mfa_token` (got on step 4) and `oob_code` (got on step 6).
10. Authorization server validates the provided `binding_code` and `oob_code` and returns the access/refresh token.

### For `challenge_type=oob` and no `binding_method`
This challenge type means that the challenge was sent using a side channel, however, in this case there
is no need for a `binding_code`, the only mechanism supported right now for this kind of `oob` challenge is Push Notification.

7. The client application asks the user to accept the delivered challenge and keeps the `oob_code` got in step 6 for future usage.
8. The client application start polling the authorization server using grant type (`grant_type=http://auth0.com/oauth/grant-type/mfa-oob`)[#link to api] and including the `mfa_token` (got on step 4) and `oob_code` (got on step 6).
10. Authorization server validates the provided `oob_code`, the `mfa_token` and returns:
  a. `pending_authentication` error: if the challenge has not been accepted nor rejected.
  d. `slow_down` error: if you are polling too fast; you must slow down polling rate.
  b. access/refresh token: if the challenge has been accepted; you must stop polling, this is a final state.
  c. `invalid_grant` error: if the challenge has been rejected; you must stop polling, this is a final state.

## Recovery flow
