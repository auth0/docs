::: panel Session Timeout
Token expiration time is 10 hours by default. but for Delegated Administration, Auth0 doesn't save a token to cookies or `sessionStorage` for security reasons, so you will need to start a new session on each page reload.
:::