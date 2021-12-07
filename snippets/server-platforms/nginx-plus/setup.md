```bash
./configure.sh --auth_jwt_key request \
  --client_id ${account.clientId} \
  --pkce_enable \
  https://${account.namespace}/.well-known/openid-configuration
```
