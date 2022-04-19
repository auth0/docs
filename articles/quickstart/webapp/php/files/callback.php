<?php

  declare(strict_types=1);

  /**
   * Upon returning from the Auth0 Universal Login, we need to perform a code exchange using the `exchange()` method
   * to complete the authentication flow. This process configures the session for use by the application.
   *
   * If successful, the user will be redirected back to the index route.
   */

   $hasAuthenticated = isset($_GET['state']) && isset($_GET['code']);
   $hasAuthenticationFailure = isset($_GET['error']);

  // The end user will be returned with ?state and ?code values in their request, when successful.
  if ($hasAuthenticated) {
    try {
      $sdk->exchange();
    } catch (\Throwable $th) {
      printf('Unable to complete authentication: %s', $th->getMessage());
      exit;
    }
  }

  // When authentication was unsuccessful, the end user will be returned with an ?error in their request.
  if ($hasAuthenticationFailure) {
    printf('Authentication failure: %s', htmlspecialchars(strip_tags(filter_input(INPUT_GET, 'error'))));
    exit;
  }

  // Nothing to do: redirect to index route.
  header('Location: /');
