```ruby
Rails.application.config.middleware.use OmniAuth::Builder do
  provider(
    :auth0,
    '@@account.clientId@@',
    '@@account.clientSecret@@',
    '@@account.namespace@@',
    callback_path: "/auth/auth0/callback"
  )
end
```
