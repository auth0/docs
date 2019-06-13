```ruby
Rails.application.config.middleware.use OmniAuth::Builder do
  provider(
    :auth0,
    '${account.clientId}',
    'YOUR_CLIENT_SECRET',
    '${account.namespace}',
    callback_path: '/auth/oauth2/callback',
    authorize_params: {
      scope: 'openid profile'
    }
  )
end
```
