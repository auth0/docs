The `AuthService` service includes a local `userProfile` member. The member holds the profile information you requested with the `getProfile` call. 

::: note
The example below shows a profile section that calls `getProfile` when the application starts. The `userProfile` member holds user information so that  `getProfile` is called only once. 
You don't have to set this behavior but it can improve your users' experience.
:::