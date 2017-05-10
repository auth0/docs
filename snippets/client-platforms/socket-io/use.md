```js
var userProfile;
var userToken = localStorage.getItem('userToken');
var accessToken = localStorage.getItem('accessToken');

lock.on('authenticated', function(authResult) {
    lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
            // Handle error
            return;
        }
        localStorage.setItem('userToken', authResult.idToken);
        localStorage.setItem('accessToken', authResult.accessToken);
        userProfile = profile;
        userToken = authResult.idToken;
    });
});

if (userToken && accessToken) {
    lock.getUserInfo(accessToken, function (err, profile) {
        if (err) {
            return alert('There was an error getting the profile: ' + err.message);
        }        
        userProfile = profile;
    });
}

$('#login button').click(function(e){
  e.preventDefault();
  lock.show();
});
```
