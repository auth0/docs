For users who forget their passwords or who are allowed to change their password via some existing self-service mechanism, Auth0 provides [Password Reset](/connections/database/password-change) functionality. You can integrate this with your existing implementation and comes already incorporated with out-of-the-box Auth0 UI widgets included as part of [Universal Login](/universal-login). 

::: warning
Password change and password reset is only supported for Auth0 [Database Connection](/connections/database) types. 
:::

Auth0 Universal Login widgets provide built-in UX support for password reset using Auth0 Authentication API functionality. Alternatively, you can use the [Auth0 Authentication API](/connections/database/password-change#use-the-authentication-api), through one of the Auth0 SDKs appropriate to your development environment if you are using Universal Login [advanced customization](/universal-login#advanced-customization). Email templates used during password reset workflow can also be fully customized whether you use Auth0 out-of-box UI widgets or customized Universal Login.  

You can use the Auth0 Management API, on the other hand, to [directly change the password](/connections/database/password-change#directly-set-the-new-password) for a user identity defined using a Database Connection type. You can use the Auth0 Management API as part of any self-service profile management implementation, and also as part of any [Change Password page customization](/architecture-scenarios/implementation/${platform}/${platform}-branding#change-password-page-customization). 
