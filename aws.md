# AWS Integration in Auth0

Auth0 ships with AWS IAM integration out of the box that allows you to:

1. Login to AWS Dashboard with any of the [supported Identity Providers](identityproviders). 
2. Obtain AWS Tokens to securely call AWS APIs and resources.

###SSO with AWS Dashboard

It's straight forward to configure Auth0 for federation with AWS using SAML. 

1. Add a new App  in Auth0 of type __SAML__
2. Use the `https://signin.aws.amazon.com/saml` for the __Application Callback URL__
3. Use this default __SAML configuration__:

```
{ 
   "audience":             "https://signin.aws.amazon.com/saml",
   "mappings": {
     "email":       "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
     "name":        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
   },
   "createUpnClaim":       false,
   "passthroughClaimsWithNoMapping": false,
   "mapUnknownClaimsAsIs": false,
   "mapIdentities":        false,
   "nameIdentifierFormat": "urn:oasis:names:tc:SAML:2.0:nameid-format:persistent",
   "nameIdentifierProbes": [
     "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
   ],
}
```
4. Configure your IdP to send __AWS roles__ or write a Rule to map values to it, like this example:

```
function (user, context, callback) {

	user.awsRole = 'arn:aws:iam::951887872838:role/TestSAML,arn:aws:iam::951887872838:saml-provider/MyAuth0';
  user.awsRoleSession = 'eugeniop';
  
  context.samlConfiguration.mappings = {
      "https://aws.amazon.com/SAML/Attributes/Role": "awsRole",
      "https://aws.amazon.com/SAML/Attributes/RoleSessionName": "awsRoleSession" 
      //"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress" : "email"
  };
  callback(null, user, context);
}
```

The __AWS roles__ you send will be associated to an __AWS IAM Policy__ that will enforce the type of access allowed for a resource, including the AWS dashboard. Notice the __AWS Role__ has structure of `{Fully qualified Role name},{Fully qualified identity provider}`. In the sample above the IdP is identified as `arn:aws:iam::951887872838:saml-provider/MyAuth0`.

5. Use the Federation Metadata available on the Auth0 App Dashboard to configure the IdP in AWS.

More information on roles, policies see [here]().

---

###Delegation Scenarios

This second scenario is even more powerful. Auth0 can interact with __AWS STS__ directly, and obtain an __AWS token__ that can be used to call any AWS API.

This works with any supported [Identity Provider](identityproviders) in Auth0:

<img src="https://docs.google.com/drawings/d/1fNzgOGyONXBnj2Oe197N2ZdLNNs6W5gfQWyMHNNQEc4/pub?w=960&amp;h=720"/>

In the example above, a web application authenticates users with social providers (e.g. GitHub, LinkedIn, Facebook, Twitter) and with corporate credentials (e.g. Active Directory, Office365 and Salesforce) in step 1.

It then calls the __Identity delegation__ endpoint in Auth0 (step 2), and requests an AWS Token. Auth0 obtains the token from AWS STS (step 3).

The app can then use the AWS Token to connect with S3 or EC2 or any AWS API. 

As an example of an IAM policy:

    {  
      "Version": "2012-10-17", 
      "Statement": [
          { 
             "Action": [
                  "s3:DelObject",
                  "s3:GetObject",
                  "s3:PutObject",
                  "s3:PutObjectAcl"
              ],
              "Resource": [
                  "arn:aws:s3:::YOUR_BUCKET_NAME/${SAML:sub}/*"
              ],
              "Effect": "Allow"
          }
      ]
    }

This is a *dynamic* policy that gives access to a folder in a bucket. The folder name will be set based on an attribute of a SAML token digitally signed that Auth0 exchanges with AWS on your behalf (step 3). 

The `${SAML:sub}` will be automagically mapped from the authenticated user (`sub` means `subject` that will equal to the user identifier). This means that the __original__ identity of the user can be used throughout the system.


###The Delegation endpoint

This is a sample Request on the delegation endpoint
    
    POST https://@@account.namespace@@/delegation
    grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&id_token=THE_ID_TOKEN_OF_LOGGED_IN_USER&target=CLIENT_ID_OF_API_TO_CALL&client_id=THE_CLIENT_ID_OF_CALLER 
    
The Response will contain the AWS Token.
    
> The Auth0 client libraries simplify calling these endpoint. Check [our GitHub repo](https://github.com/auth0/) for the latest SDKa. Here's [one for client side JavaScript](https://github.com/auth0/auth0.js#delegation-token-request).

###Client Side sample code

    var awsToken;
    function getToken(callback) {
      $.post('/token', function(err, result) {
        // typically stored in local/session storage or cookie
        awsToken = result; 
        callback();
      });
        
    }

    function upload(callback)
      $('#upload').on('click', function() {
        var params = {
            Key: user.id + '/' + file.name, 
            ContentType: fileChooser.files[0].type, 
            Body: fileChooser.files[0]}; 
        
        var bucket = new AWS.S3({params: {Bucket: 'THE_BUCKET'}});
        bucket.config.credentials = 
          new AWS.Credentials(awsToken.AccessKeyId,
                              awsToken.SecretAccessKey,
                              awsToken.SessionToken);
        bucket.putObject(params, callback); 
      });
    });

    getToken(function(err) {
      upload(function(err, result) {
        // 
      });
    });


