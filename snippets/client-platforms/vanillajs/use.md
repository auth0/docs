```js
document.getElementById('btn-login').addEventListener('click', function() {
  lock.show(function(err, profile, token) {
    if (err) {
      // Error callback
      console.error("Something went wrong: ", err);
      alert("Something went wrong, check the Console errors");
    } else {
      // Success calback  

      // Save the JWT token.
      localStorage.setItem('userToken', token);
  
      // Save the profile
      userProfile = profile;

      document.getElementById('nick').textContent = profile.nickname;
    }
  });
});
```
