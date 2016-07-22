---
title: Ruby
---

```ruby
rsa_public = OpenSSL::PKey.read(File.read(File.join(CERT_PATH, 'cert.pem')))

decoded_token = JWT.decode token, rsa_public, true, { :iss => '${"https://<%= tenantDomain %>"}/', :verify_iss => true, :aud => '${"<%= api.identifier %>"}', :verify_aud => true, :algorithm => 'RS256' }
```
