```js
var userProfile;
var userToken;

var hash = lock.parseHash();
if(hash) {
    if(hash.error) {
        console.log("There was an error logging in", hash.error);
    }
    else {
        lock.getProfile(hash.id_token, function(err, profile) {
            if(err) { 
                console.log('Cannot get user', err);
                return;
            }
            userProfile = profile;
            localStorage.setItem('userToken', hash.id_token);
            userToken = hash.id_token;
         });
     }
}

$('#login button').click(function(e){
	e.preventDefault();
	lock.show();
});
```
