---
title: Ajouter une autorisation à votre application PHP
description: Ce guide explique comment intégrer Auth0, ajouter une autorisation basée sur un jeton et protéger les routes de l’application en utilisant la trousse SDK Auth0 PHP.
interactive:  true
files:
 - files/index
 - files/router
github:
  path: app
locale: fr-CA
---

# Ajouter une autorisation à votre application PHP


<p>Auth0 vous permet d’ajouter rapidement une autorisation de point de terminaison basée sur un jeton à presque tous les types d’application. Ce guide explique comment intégrer Auth0, ajouter une autorisation basée sur un jeton et protéger les routes de l’application en utilisant la trousse SDK Auth0 PHP.</p><p>Pour utiliser ce guide rapide, vous devez :</p><ul><li><p>Vous inscrire à un compte Auth0 gratuit ou vous connecter à Auth0.</p></li><li><p>Avoir un projet PHP fonctionnel que vous souhaitez intégrer à Auth0. Vous pouvez également consulter ou télécharger une application faisant office d’exemple lorsque vous vous connectez.</p></li></ul><p></p><p></p>

## Configuration d’Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application enregistrée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous configurez le fonctionnement de l’authentification pour votre projet.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionnez une application existante qui représente le projet que vous souhaitez intégrer. Dans Auth0, il est attribué à chaque application un identificateur client unique alphanumérique que votre code d’application utilise pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce guide rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, qui est l’endroit où vous pourrez gérer vos applications à l’avenir.</p><p>Si vous préférez explorer une configuration complète, consultez plutôt un exemple d’application.</p><h3>Configurer une API</h3><p>De même, vous devez créer une nouvelle API Auth0 ou utiliser une API existante qui représente le projet que vous intégrez à partir du <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>. Choisissez un identificateur unique pour l’API et notez-le. Cet identificateur vous sera nécessaire pour configurer votre application ci-dessous.</p>

## Installer la trousse SDK PHP Auth0 {{{ data-action="code" data-code="index.php" }}}


<p>Auth0 fournit une trousse <a href="https://github.com/auth0/auth0-PHP" target="_blank" rel="noreferrer noopener">SDK PHP</a> (Auth0-PHP) pour simplifier le processus de mise en œuvre de l’authentification et de l’autorisation Auth0 dans les applications PHP.</p><p>La trousse SDK PHP Auth0 nécessite l’installation des bibliothèques HTTP compatibles <a href="https://www.php-fig.org/psr/psr-17/" target="_blank" rel="noreferrer noopener">PSR-17</a> et <a href="https://www.php-fig.org/psr/psr-18/" target="_blank" rel="noreferrer noopener">PSR-18</a> pour la gestion des requêtes réseau. Si vous ne disposez pas de bibliothèques disponibles, vous pouvez installer des choix fiables en exécutant les commandes suivantes dans votre terminal :</p><p><pre><code class="language-powershell">cd &lt;your-project-directory&gt;

    composer require symfony/http-client nyholm/psr7

</code></pre>

</p><p>Installez maintenant la trousse SDK PHP Auth0 en exécutant la commande suivante dans votre terminal :</p><p><pre><code class="language-powershell">composer require auth0/auth0-php

</code></pre>

</p><h3>Configurer la trousse SDK Auth0</h3><p>Pour que la trousse SDK fonctionne correctement, vous devez définir les propriétés suivantes dans la trousse SDK Auth0 lors de l’initialisation :</p><ul><li><p><code>strategy</code> : La stratégie aide à orienter le comportement du SDK en ce qui concerne l’utilisation de votre application. Dans ce cas, vous souhaitez la définir sur la constante</p><p><code>Auth0\SDK\Configuration\SdkConfiguration::STRATEGY_API</code></p></li><li><p>domain : Le domaine de votre locataire Auth0. En général, vous le trouverez dans Auth0 Dashboard dans Application Settings (Paramètres d’application) dans le champ Domain (Domaine). Si vous utilisez un domaine personnalisé, définissez-le plutôt sur la valeur de votre domaine personnalisé.</p></li><li><p>clientId : L’identifiant de l’application Auth0 que vous avez configurée précédemment dans le démarrage rapide. Vous pouvez le trouver dans Auth0 Dashboard, dans la rubrique des paramètres de votre application, dans le champ Client ID (ID client).</p></li><li><p>clientSecret : Le secret de l’application Auth0 que vous avez créée plus tôt dans le démarrage rapide. Le secret client se trouve dans Auth0 Dashboard, dans Application Settings (Paramètres d’application) dans le champ Client Secret (Secret client).</p></li><li><p>public : L’identificateur de l’API Auth0 que vous avez enregistré ci-dessus. Il doit être fourni sous la forme d’un tableau.</p></li></ul><p><div class="checkpoint">API PHP - Étape 2 - Point de contrôle <div class="checkpoint-default"><p>Votre trousse SDK Auth0 est maintenant correctement configurée. Exécutez votre application pour vérifier que :</p><ul><li><p>la trousse SDK s’initialise correctement,</p></li><li><p>votre application ne génère aucune erreur liée à Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>Assurez-vous que la bonne application est sélectionnée</p></li><li><p>Avez-vous procédé à un enregistrement après avoir saisi vos URL?</p></li><li><p>Assurez-vous que le domaine et l’identifiant client ont été importés correctement.</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>

## Détecter les jetons du porteur {{{ data-action="code" data-code="index.php#20:23" }}}


<p>Développez ensuite votre application pour récupérer et traiter les jetons de porteur. Les jetons de porteur sont des jetons d’accès fournis à votre API avec des demandes de clients au nom d’un utilisateur. Les jetons d’accès approuvent ou refusent l’accès aux routes de votre application. C’est ce que l’on appelle l’autorisation de point de terminaison.</p><p>La méthode la plus simple pour récupérer les jetons d’accès à partir d’une requête est la méthode <code>getBearerToken()</code> de la trousse SDK PHP. Cette méthode récupère les jetons à partir des paramètres GET, des corps POST, des en-têtes de requête et d’autres sources. Dans ce cas, la trousse SDK PHP traite les jetons transmis par les requêtes GET dans le paramètre <code>token</code> ou dans l’en-tête HTTP <code>Authorization</code>.</p>

## Créer et configurer des routes {{{ data-action="code" data-code="router.php" }}}


<p>Maintenant, installez une bibliothèque de routage pour aider à diriger les requêtes entrantes vers votre application. Cette étape n’est pas obligatoire, mais elle simplifie la structure de l’application pour les besoins de ce guide rapide.</p><p><pre><code class="language-powershell">composer require steampixel/simple-php-router

</code></pre>

</p><p>Créez un nouveau fichier dans votre application appelé <code>router.php</code> pour définir les routes. Copiez le code du panneau interactif à droite sous l’onglet <b>router.php</b>.</p>

## Configurer l’autorisation des points de terminaison {{{ data-action="code" data-code="router.php#21:31" }}}


<p>Maintenant que vous avez configuré votre application Auth0, la trousse SDK PHP Auth0, et que votre application récupère les jetons de porteur des requêtes, l’étape suivante est de configurer l’autorisation des points de terminaison pour votre projet. La méthode <code>getBearerToken()</code> que vous avez mise en œuvre ci-dessus renvoie une classe <code>Token</code> qui contient des informations sur l’accès à la requête.</p><p>Étant donné que la méthode <code>getBearerToken()</code> valide et vérifie automatiquement la requête entrante, votre application détermine les détails du jeton d’accès en évaluant la réponse de la méthode. Si la réponse est nulle, c’est qu’aucun jeton valide n’a été fourni. Dans le cas contraire, inspectez le contenu de la réponse pour en savoir plus sur la demande.</p><p>Dans le panneau interactif à droite, une validation de la réponse (null ou non) permet de filtrer l’accès à la route <code>/api/private</code>.</p>

## Autoriser avec des permissions {{{ data-action="code" data-code="router.php#33:48" }}}


<p>Dans certains cas, vous pouvez souhaiter filtrer l’accès à une route particulière en fonction des permissions demandées dans un jeton d’accès. Comme le montre le panneau interactif de droite, évaluez le contenu de la propriété ’scope’ de la réponse de la méthode <code>getBearerToken()</code> pour vérifier les permissions accordées par le jeton d’accès.</p>
