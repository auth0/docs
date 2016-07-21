---
title: Ruby
---

```ruby
hmac_secret = '${"<%= api.signing_secret %>"}'

decoded_token = JWT.decode token, hmac_secret, true, { :iss => '${"https://<%= tenantDomain %>"}/', :verify_iss => true, :aud => '${"<%= api.identifier %>"}', :verify_aud => true, :algorithm => 'HS256' }
```
