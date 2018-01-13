```yml
security:
    providers:
        a0:
            id:
                a0_user_provider

    firewalls:
        secured_area:
            pattern: ^/api
            stateless: true
            simple_preauth:
                authenticator: jwt_auth.jwt_authenticator

    access_control:
        - { path: ^/api/private-scoped, roles: ROLE_OAUTH_READER }
        - { path: ^/api/private, roles: ROLE_OAUTH_AUTHENTICATED }
        - { path: ^/api/public, roles: IS_AUTHENTICATED_ANONYMOUSLY }
```