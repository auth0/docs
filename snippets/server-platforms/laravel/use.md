```html
<script src="https://cdn.auth0.com/js/lock-7.min.js"></script>
<script type="text/javascript">

    var lock = new Auth0Lock('{{ $auth0Config['client_id'] }}', '{{ $auth0Config['domain'] }}');

    function signin() {
        lock.show({
            callbackURL: '{{ $auth0Config['redirect_uri'] }}'
            , responseType: 'code'
            , authParams: {
                scope: 'openid profile'
            });
    }
</script>

<button onclick="signin()">Login</button>
```
