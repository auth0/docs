```lua
# nginx.conf:

server {
    location /secure_this {
        access_by_lua '
            local jwt = require("nginx-jwt")
            jwt.auth()
        ';

        proxy_pass http://my-backend.com$uri;
    }
}
```
