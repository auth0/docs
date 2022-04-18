<?php

  declare(strict_types=1);

  /**
   * Clear application session and redirect to the Auth0 logout endpoint.
   *
   * The user will be redirected to your index route afterward.
   */

  header(sprintf('Location: %s', $sdk->logout()));
