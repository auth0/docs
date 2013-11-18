# Using Auth0 in Ruby APIs

Install the following gem

    sudo gem install jwt

Create a middleware that checks the token like this

    # validate the token (this will throw if invalid)
    token = request.env['Authorization'].gsub('Bearer ', '')
    secret = "@@account.clientSecret@@"
    decoded_token = JWT.decode(token, Base64.decode64(secret.gsub('-', '+').gsub('_','/')))
    
    # validates that this token was made for us
    if decoded_token["aud"] !=  "@@account.clientId@@"
      401
    end
