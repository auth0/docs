## Persisting Application State

Lock uses [redirect mode](/libraries/lock) by default, meaning that a full page refresh will occur when users go through the authentication process in your application. This can be undesirable for single page apps, especially if the application contains state that should be displayed to the user again after they authenticate. For example, it may be the case that your users can initiate authentication from an arbitrary route within your single page app and you may want to return them to that location (along with any relevant state) after authentication is complete.

The recommended solution for this is to persist any necessary application state in local storage or a cookie before the user logs in or signs up. With this data, you can provide some custom post-authentication logic in the listener for the `authenticated` event to allow the user to pick up from where they left off.

In cases where storing application state is not possible, Lock's [popup mode](/libraries/lock/v10/popup-mode) can be used. Please note that popup mode is **not** recommended. Known bugs in certain browsers prevent popup mode from functioning as expected under some circumstances.
