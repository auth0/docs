```js
var userProfile;
var userToken = localStorage.getItem('userToken');;

lock.on('authenticated', function(authResult) {
    lock.getProfile(authResult.idToken, function(error, profile) {
        if (error) {
            // Handle error
            return;
        }
        localStorage.setItem('userToken', authResult.idToken);
        userProfile = profile;
        userToken = authResult.idToken;
    });
});

if (userToken) {
    lock.getProfile(userToken, function (err, profile) {
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
