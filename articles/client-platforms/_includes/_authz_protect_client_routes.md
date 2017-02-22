## Protect Client-Side Routes

The `isAdmin` method is useful for hiding and showing various UI elements based on the presence of that role in the user's `id_token`. The example above hides the button used to access the admin area, but this route can still be navigated to manually.