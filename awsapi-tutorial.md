# Using Auth0 in AWS APIs

Auth0 can interact with __AWS STS__ directly, and obtain an __AWS token__ that can be used to call any AWS API.

When a user authenticates with Auth0 you will get back an `id_token` (a [JWT](jwt)). You would then use this `id_token` to request Auth0 and AWS Token using the delegation endpoint:

    POST https://@@account.namespace@@/delegation

    grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer
    &id_token=`THE_ID_TOKEN_OF_LOGGED_IN_USER`
    &client_id=`THE_CLIENT_ID_OF_CALLER`
    &target=@@account.clientId@@
    &role=`THE_ROLE_ARN`
    &principal=`THE_PRINCIPAL_ARN`

* __Role:__ The Amazon Resource Name (ARN) of the role that the caller will assume.
* __Principal:__ The Amazon Resource Name (ARN) of the SAML provider in AWS IAM that describes the IdP.


The Response will contain the AWS Token:

```
{
  Credentials: {
    SessionToken: 'AQoDYXdzENf//////...Pz02lt4FSCY6L+WBQ==',
    SecretAccessKey: 'zYaN30nMf/9uV....Zx9Em7xQzcCc9/PPl',
    Expiration: Fri Jan 10 2014 11:22:32 GMT-0300 (ART),
    AccessKeyId: 'ASIAI5PCTTOC6APKKXLQ' 
  }
}
```

> The Auth0 client libraries simplify calling these endpoint. Check [our GitHub repo](https://github.com/auth0/) for the latest SDKs. Here's [one for client side JavaScript](https://github.com/auth0/auth0.js#delegation-token-request).

## How it works / Samples

You can find more details about how to obtain AWS Tokens to securely call AWS APIs and resources [here](/aws#2).