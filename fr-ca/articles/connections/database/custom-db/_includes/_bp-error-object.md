::: panel Best practice
When indicating an error, we recommend using the `Error` object to provide Auth0 with a clear indication of the error condition. For example, use `callback(new Error(“an error message”))` when a problems occurs with communication to your database. See [Types of errors](/connections/database/custom-db/error-handling#types-of-errors) for more information.
:::
