You can choose to have users return to any URL in your application that you like; however, it is recommended that you create a dedicated callback route to serve as a central location that the user will be returned to upon successful authentication. Having a single callback route is beneficial for two main reasons:
* It prevents the need to whitelist multiple (and sometimes unknown) callback URLs
* It serves as a place to show a loading indicator while your application sets the user's client-side session
