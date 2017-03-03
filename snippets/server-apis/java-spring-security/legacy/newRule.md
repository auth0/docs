```javascript
function (user, context, callback) {

  // make this rule run only for a specific CLIENT_ID
   if (context.clientID !== '{{${account.clientId}}}') {
     return callback(null, user, context);
   }

  user.app_metadata = user.app_metadata || {};
  // Edit the logic of the Roles assignment based on your requirements
  var addRolesToUser = function(user, cb) {
      cb(null, ['ROLE_ADMIN', 'ROLE_USER']);
  };

  addRolesToUser(user, function(err, roles) {
    if (err) {
      callback(err);
    } else {
      user.app_metadata.roles = roles;
      auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
        .then(function(){
          callback(null, user, context);
        })
        .catch(function(err){
          callback(err);
        });
    }
  });
}
```
