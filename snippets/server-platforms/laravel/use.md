```html
<script src="${widget_url}"></script>
<script type="text/javascript">

    var lock = new Auth0Lock('{{ $auth0Config['client_id'] }}', '{{ $auth0Config['domain'] }}');

    function signin() {
        lock.show({
            callbackURL: '{{ $auth0Config['redirect_uri'] }}'
            , responseType: 'code'
            , authParams: {
                scope: 'openid name email' //Details: https://auth0.com/docs/scopes
            });
    }
</script>

<button onclick="signin()">Login</button>
```
