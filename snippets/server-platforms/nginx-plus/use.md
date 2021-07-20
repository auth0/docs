<!-- markdownlint-disable MD041 -->

```
# frontend.conf
# auth_jwt_claim_set $claim_name https://namespace/key;

server {
    include conf.d/openid_connect.server_conf; # Authorization code flow and Relying Party processing
    error_log /var/log/nginx/error.log debug;  # Reduce severity level as required

    listen 8010; # Use SSL/TLS in production
    
    location / {
        # This site is protected with OpenID Connect
        auth_jwt "" token=$session_jwt;
        error_page 401 = @do_oidc_flow;

        #auth_jwt_key_file $oidc_jwt_keyfile; # Enable when using filename
        auth_jwt_key_request /_jwks_uri; # Enable when using URL

        # Successfully authenticated users are proxied to the backend,
        # with 'sub' claim passed as HTTP header
        proxy_set_header username $jwt_claim_sub;
        proxy_set_header x-email $jwt_claim_email;
        #proxy_set_header x-custom $claim_name;             # namespaced claim

        proxy_pass http://my_backend; # The backend site/app

        access_log /var/log/nginx/access.log main_jwt;
    }
}
```
