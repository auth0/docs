<?php

  declare(strict_types=1);

  $session = $sdk->getCredentials();
  $authenticated = $session !== null;

  $template = [
    'name' => $authenticated ? $session->user['email'] : 'guest',
    'picture' => $authenticated ? $session->user['picture'] : null,
    'session' => $authenticated ? print_r($session, true) : '',
    'auth:route' => $authenticated ? 'logout' : 'login',
    'auth:text' => $authenticated ? 'out' : 'in',
  ];

  printf('<p>Welcome, %s.</p>', $template['name']);
  printf('<p><pre>%s</pre></p>', $template['session']);
  printf('<p><a href="/%s">Log %s</a></p>', $template['auth:route'], $template['auth:text']);
