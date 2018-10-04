

# Protect My API: Validate an Access Token

So your API is configured with Auth0 and applications are now sending you requests using Access Tokens. Let’s make sure that the sender of a token is who it says it is and ensure that the message wasn't changed along the way.

Prerequisites
Register your API with Auth0
To Do
Extract the Access Token
Check that the Access Token is well formed
Retrieve and filter your Auth0 JSON Web Key Set (JWKS)
Verify the Access Token's signature
Verify the claims found inside the Access Token
Compare permissions included in the Access Token with scopes configured for your API

If any of these steps fail, then you must reject the request.

Validate an Access Token
Are you ready to validate an Access Token? Let's go!

Extract the Access Token
There are three ways by which your users can send the golden ticket...er, Access Token that grants them the right to call your API. The OAuth 2.0 specification calls for its inclusion in the HTTP Authorization Header whenever possible, so this is the method we recommend accepting. For code samples, choose your technology in our Auth0 Backend/API Quickstarts.

Check that the Access Token is well formed
For your API, Auth0 will generate the Access Token in JSON Web Token (JWT) format. Before doing anything else, your API should parse the Access Token to make sure it conforms to the structure of a JWT.

A well-formed JWT consists of three concatenated Base64-encoded strings, separated by dots: 

Header: contains metadata about the type of token and the cryptographic algorithms used to secure its contents.
Payload (set of claims): contains verifiable security statements such as the identity of the user and the permissions they are allowed.
Signature: used to validate that the token is trustworthy and has not been tampered with.
To see for yourself what is inside a JWT, use the JWT.io Debugger. It will allow you to quickly check that a JWT is well formed and manually inspect the values of the various claims.
