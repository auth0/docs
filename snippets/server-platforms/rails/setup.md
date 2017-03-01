```ruby
Rails.application.config.middleware.use OmniAuth::Builder do
  provider(
    :auth0,
    '${account.clientId}',
    '${account.clientSecret}',
    '${account.namespace}',
    callback_path: "/auth/oauth2/callback"
  )
end
```
