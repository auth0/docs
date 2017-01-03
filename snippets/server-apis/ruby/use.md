```ruby
require 'jwt'
def authenticate!
  # Extract <token> from the 'Bearer <token>' value of the Authorization header
  supplied_token = String(request.env['HTTP_AUTHORIZATION']).slice(7..-1)

  JWT.decode supplied_token, '${account.clientSecret}',
    true, # Verify the signature of this token
    algorithm: 'HS256',
    iss: 'https://${account.namespace}',
    verify_iss: true,
    aud: '${account.clientId}',
    verify_aud: true

rescue JWT::DecodeError => e
  halt 401, json(error: e.class, message: e.message)
end

before do
  @auth_payload, @auth_header = authenticate!
end
```
