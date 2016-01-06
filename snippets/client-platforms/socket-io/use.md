```js
var userProfile;
var userToken;
$('#login button').click(function(e){
	e.preventDefault();
	lock.show(function(err, profile, token) {
		if (err) {
			//Error callback
			alert('There was an error');
			alert(err);
		} else {
			//Success callback
			userToken = token;

			//Save the JWT token
			localStorage.setItem('userToken', token);

			//Save the profile
			userProfile = profile;

						
		}
	})
});
```
