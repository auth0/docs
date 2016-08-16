```javascript
function (user, context, callback) {
    user.app_metadata = user.app_metadata || {};
    var addRolesToUser = function(user, cb) {
        if (user.email.indexOf('@gmail.com') > -1) {
            cb(null, ['ROLE_ADMIN']);
        } else if (user.email.indexOf('@auth0.com') > -1) {
            cb(null, ['ROLE_ADMIN']);
        } else {
            cb(null, ['ROLE_USER']);
        }
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