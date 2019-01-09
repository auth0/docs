---
title: Implement the profile page
description: This quickstart will teach the fundamentals of protecting parts of a Node.js application. We'll use Auth0 to greatly speed up the implementation of a user system.
budicon: 448
topics:
  - quickstarts
  - webapp
  - login
  - user profile
  - logout
  - nodejs
  - Express
contentType: tutorial
useCase: quickstart
github:
    path: 02-Implement-profile-page
---

If your existing Node.js application already has a user profile page that you would like to protect you can skip to the next section: [Protecting the profile page](/quickstart/webapp/nodejs2/03-Protect-profile-page).

Following from the previous stage you should now have a working Node.js server that renders a basic Welcome home page.

One of the great things about Express Generator is that it has already configured a couple of routes for our application. We are going to enhance the existing `/users` route to show a profile screen for the currently logged in user.

## Configure the users route

Let's start by editing the `routes/users.js` file to render a profile user template. This file handles all calls the any url starting with `/users`.

```javascript
// routes/users.js

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', 
  function(req, res, next) {
    res.send('User data here');
  });

/* GET profile listing. */
router.get('/profile', 
  function(req, res, next) {
    res.render('profile');
  });


module.exports = router;

```

The `users.js` router file is ereferenced any time a user hits the `/users` URL of our application. Within this file we have designated a `/profile` route which will be called when the user navigates to the `/users/profile` URL.

The router will render a `profile` view as designated in our `/views` folder. 

:::note
There is no profile template yet, so restarting the server and navigating to `/users/profile` right now should display an error. Let's fix that.
:::

## Create the user profile template in pug

Now we need to create a user profile template. Inside the `/views` folder create a new file called `profile.pug`. This page will make use of user data that we'll implement in a later step.

```pug
//- views/profile.pug

extends layout

block content
  a(href='/') Home
  .w3-container
    .w3-card-4
      header
      h1 Welcome #{user.nickname}
      img(src=user.picture style={
        'width': '100px', 
        'border-radius': '50px'
      })

      hr
      h2 User profile

      pre
        code #{userProfile}
      hr
      p This is the content of <code>req.user</code>.
      p Note: <code>_raw</code> and <code>_json</code> properties have been ommited.
``` 

Here we created a simple page that displays a link back to the home page, a message to welcome the user with their `user.nickname`, their profile `user.picture`, and a representation of the `user.profile` data. None of these user objects exist for our template yet, so we will need to include them from the router file.

## Include the user object on the page

Head back to `router/users.js` and let's include a user object to populate the fields on the pug template we just created.

```javascript
// ...
/* GET profile listing. */
router.get('/profile', 
  function(req, res, next) {
    res.render('profile', {
      title: 'Profile page',
      user: req.user
    });
  });
// ...
```

## Link to the users page

Now we just need to make a link to the profile page from the home page. Inside the `views/index.pug` template Let's add a link to our new `/users/profile` route.
```pug
//- views/index.pug

extends layout

block content
  h1= title
  p Welcome to #{title}
  a(href='/users/profile') Profile
```

Restart the node application and navigate to `localhost:3000/users`. You should now see the user profile page (with no user information currently being displayed).

**Insert image here empty profile page**

In the next section we will protect this route by making the `users/profile` URL only accessible to users that are authenticated. Head over to [Protecting the profile page to get started](/quickstart/webapp/nodejs2/03-Protect-profile-page)

