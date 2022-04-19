<?php

  declare(strict_types=1);

  /**
   * Prepare application session and redirect to the Auth0 Universal Login page.
   *
   * The user will be redirected to your callback route to complete the authentication flow.
   */

  header(sprintf('Location: %s', $sdk->login()));
