## Check for an Admin Role

When the user authenticates in your application, their ID Token will be modified with the appropriate role. The next step is to check for this role in your app. Since your app will need to make decisions based on whether a user has a `role` of `admin`, a method to explicitly check this is advisable.
