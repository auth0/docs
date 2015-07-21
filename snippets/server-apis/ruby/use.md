```ruby
class InvalidTokenError < StandardError; end

def validate_token
  begin
    auth0_client_id = '<%= account.clientId %>'
    auth0_client_secret = '<%= account.clientSecret %>'
    authorization = request.headers['Authorization']
    raise InvalidTokenError if authorization.nil?

    token = request.headers['Authorization'].split(' ').last
    decoded_token = JWT.decode(token,
      JWT.base64url_decode(auth0_client_secret))

    raise InvalidTokenError if auth0_client_id != decoded_token[0]["aud"]
  rescue JWT::DecodeError
    raise InvalidTokenError
  end
end
```
