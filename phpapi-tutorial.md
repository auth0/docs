# Using Auth0 in PHP APIs

@@includes.apinote@@

Install the following package from composer

    firebase/php-jwt

On your protected APIs, add a check like the following:

    //get authorisation header - this works for Apache, but you may have to customise this if you are using another platform.  If you are using a framework like Zend or Symfony, it might have inbuilt methods for getting hold of the headers, e.g. $request->getHeader('Authorization') for Zend
    $requestHeaders = apache_request_headers();
    $authorizationHeader = $requestHeaders['Authorization'];

    // validate the token
    $token = str_replace('Bearer ', '', $authorizationHeader);
    $secret = "@@account.clientSecret@@";
    $decoded_token = JWT::decode($token, base64_decode(strtr($secret, '-_', '+/')) );

    // validate that this token was made for us
    if ($decoded_token->aud != "@@account.clientId@@") {
      header('HTTP/1.0 401 Unauthorized');
    }

@@includes.callapi@@
