## Specify a `profile` Scope

After the user has authenticated, every express request has a `user` object with the entire user profile. 
By default, it is a minimal profile.

## Display User Information

Modify the `/user` endpoint to display the user object. Update the `views/user.pug` template.

```pug
// views/user.pug

extends layout

block content
  img(src=user.picture)
  h2 Welcome #{user.nickname}!
  br
  h2 User Profile
  pre #{userProfile}
  br
  a(href='/logout') Logout
```

To have full access to the user profile on `userProfile`, stringify the `user` object. Modify the `/` endpoint in `routes/user.js` to include `userProfile`.

```js
// routes/user.js

// Get the user profile
router.get('/', ensureLoggedIn, function(req, res, next) {
  res.render('user', {
    user: req.user,
    userProfile: JSON.stringify(req.user, null, '  ')
  });
});

```

You can now present a basic user profile.
