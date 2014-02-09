# Using Auth0 in PHP APIs

@@includes.apinote@@

Install the following package from composer

    firebase/php-jwt

On your protected APIs, add a check like the following:

    // validate the token
    $token = str_replace($_SERVER['Authorization'], 'Bearer ', '')
    $secret = "@@account.clientSecret@@"
    $decoded_token = JWT::decode($token, base64_decode(strtr($secret, '-_', '+/')) );

    // validate that this token was made for us
    if ($decoded_token->aud == "@@account.clientId@@") {
      header('HTTP/1.0 401 Unauthorized');
    }

@@includes.callapi@@
