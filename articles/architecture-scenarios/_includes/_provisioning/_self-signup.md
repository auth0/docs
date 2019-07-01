Self sign up leverages Auth0 [Database Connections](/connections/database) to store the user ID, password, and (optional) username identity information collected from new users during the sign up process. Database connection policies governing things such as minimum [username length](connections/database/require-username#username-length) or [password strength and complexity](/connections/database/password-options) can be configured via the Auth0 Dashboard. 

::: panel Best Practice
Auth0 [Universal Login](/hosted-pages/login) as well Auth0 widgets such as [Lock](https://auth0.com/lock) integrate with Database Connections to provide comprehensive user interface functionality for sign up out-of-the-box. These UI artifacts are fully reactive, and with feature rich configuration and comprehensive customization, you can deploy functionality for user self sign up as well as login.
:::
