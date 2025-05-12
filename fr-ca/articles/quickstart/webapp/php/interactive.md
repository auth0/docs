---
title: Ajouter une connexion à votre application PHP
description: Ce guide explique comment intégrer Auth0, ajouter l’authentification et afficher les informations de profil utilisateur dans n’importe quelle application PHP à l’aide de la trousse SDK Auth0 PHP.
interactive:  true
files:
 - files/index
 - files/login
 - files/logout
 - files/profile
 - files/router
 - files/callback
github:
  path: app
locale: fr-CA
---

# Ajouter une connexion à votre application PHP


<p>Auth0 vous permet d’ajouter rapidement l’authentification à presque tous les types d’application. Ce guide explique comment intégrer Auth0, ajouter l’authentification et afficher les informations de profil utilisateur dans n’importe quelle application PHP à l’aide de la trousse SDK Auth0 PHP.</p><p>Pour utiliser ce guide rapide, vous devez :</p><ul><li><p>Vous inscrire à un compte Auth0 gratuit ou vous connecter à Auth0.</p></li><li><p>Disposer d’un projet PHP fonctionnel avec lequel vous souhaitez vous intégrer. Vous pouvez également consulter ou télécharger une application faisant office d’exemple lorsque vous vous connectez.</p></li></ul><p></p><p></p>

## Configuration d’Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer le fonctionnement de l’authentification pour le projet que vous développez.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application existante qui représente le projet avec lequel vous souhaitez effectuer l’intégration. Dans Auth0, il est attribué à chaque application un identifiant client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce guide rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, qui est l’endroit où vous pourrez gérer vos applications à l’avenir.</p><p>Si vous préférez explorer une configuration complète, consultez plutôt un exemple d’application.</p><h3>Configurer les URL de rappel</h3><p>Une URL de rappel est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur authentification. Si elle n’est pas définie, les utilisateurs ne seront pas redirigés vers votre application après s’être connectés.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur <code>http://localhost:3000/callback</code>.</p></div></p><h3>Configuration des URL de déconnexion</h3><p>Une URL de déconnexion est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur déconnexion. Si elle n’est pas définie, les utilisateurs ne pourront pas se déconnecter de votre application et recevront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur <code>http://localhost:3000</code>.</p><p></p></div></p><h3>Configurer les origines Web autorisées</h3><p>Une origine Web autorisée est une URL que vous souhaitez autoriser à accéder à votre flux d’authentification. Elle doit contenir l’URL de votre projet. Si elle n’est pas configurée adéquatement, votre projet ne pourra pas actualiser silencieusement les jetons d’authentification, ce qui entraînera la déconnexion de vos utilisateurs lorsque prochainement ils visiteront votre application ou lors de l’actualisation d’une page.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur <code>http://localhost:3000</code>.</p><p></p></div></p>

## Installer la trousse SDK Auth0 PHP {{{ data-action="code" data-code="index.php" }}}


<p>Auth0 fournit une <a href="https://github.com/auth0/auth0-PHP" target="_blank" rel="noreferrer noopener">trousse SDK PHP</a> (Auth0-PHP) pour simplifier le processus de mise en œuvre de l’authentification et de l’autorisation Auth0 dans les applications PHP.</p><p>La trousse SDK Auth0 PHP nécessite l’installation des bibliothèques HTTP compatibles <a href="https://www.php-fig.org/psr/psr-17/" target="_blank" rel="noreferrer noopener">PSR-17</a> et <a href="https://www.php-fig.org/psr/psr-18/" target="_blank" rel="noreferrer noopener">PSR-18</a> pour la gestion des requêtes réseau. Si vous ne disposez pas de bibliothèques, vous pouvez installer des choix fiables en exécutant les commandes suivantes dans votre terminal :</p><p><pre><code class="language-powershell">cd &lt;your-project-directory&gt;

composer require symfony/http-client nyholm/psr7

</code></pre>

</p><p>Installez maintenant la trousse SDK PHP Auth0 en exécutant la commande suivante dans votre terminal :</p><p><pre><code class="language-powershell">composer require auth0/auth0-php

</code></pre>

</p><h3>Configurer la trousse SDK Auth0</h3><p>Créez un nouveau fichier dans votre application, appelé <code>index.php</code>, et copiez le code du panneau interactif à droite sous l’onglet <b>index.php</b>.</p><p>Pour que la trousse SDK fonctionne correctement, vous devez définir les propriétés suivantes dans la trousse SDK Auth0 lors de l’initialisation :</p><ul><li><p><code>domain</code> : Le domaine de votre locataire Auth0. En général, vous le trouvez dans Auth0 Dashboard sous vos paramètres d’application dans le champ Domain (Domaine). Si vous utilisez un <a href="https://auth0.com/docs/custom-domains" target="_blank" >domaine personnalisé</a>, définissez-le plutôt sur la valeur de votre domaine personnalisé.</p></li><li><p><code>clientId</code> : l’identificateur de l’application Auth0 que vous avez configurée précédemment dans ce guide rapide. Vous pouvez le trouver dans Auth0 Dashboard, dans les paramètres de votre application, dans le champ Client ID (ID client).</p></li><li><p><code>clientSecret</code> : le secret de l’application Auth0 que vous avez configurée précédemment dans ce guide rapide. Vous pouvez le trouver dans Auth0 Dashboard, dans la rubrique des paramètres de votre application, dans le champ Client Secret (Secret client).</p></li><li><p><code>redirectUri</code> : l’URL dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur authentification. Cela correspond à l’URL de rappel que vous avez configurée précédemment dans ce guide rapide. Cette valeur se trouve également dans Auth0 Dashboard, sous les paramètres de votre application, dans le champ URL de rappel. Assurez-vous que ce que vous saisissez dans votre code correspond à ce que vous avez configuré précédemment, au cas contraire, vos utilisateurs verront une erreur.</p></li><li><p><code>cookieSecret</code> : Valeur secrète longue utilisée pour chiffrer le témoin de session. Vous pouvez générer une chaîne appropriée en exécutant <code>openssl rand -hex 32</code> dans votre terminal.</p></li></ul><p><div class="checkpoint">PHP - Étape 2 - Point de contrôle <div class="checkpoint-default"><p>Votre trousse SDK Auth0 devrait maintenant être correctement configurée. Exécutez votre application pour vérifier que :</p><ul><li><p>La trousse SDK s’initialise correctement.</p></li><li><p>Votre application ne génère aucune erreur liée à Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>Assurez-vous que la bonne application est sélectionnée.</p></li><li><p>Avez-vous procédé à un enregistrement après avoir saisi vos URL?</p></li><li><p>Assurez-vous que le domaine et l&#39;identifiant client ont été importés correctement.</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l&#39;aide.</p></div>

  </div></p>

## Créer des routes {{{ data-action="code" data-code="router.php" }}}


<p>Installez maintenant une bibliothèque de routage, pour aider à diriger les requêtes entrantes vers votre application. Cette étape n’est pas obligatoire, mais elle simplifie la structure de l’application pour les besoins de ce guide rapide.</p><p><pre><code class="language-powershell">composer require steampixel/simple-php-router

</code></pre>

</p><p>Créez un nouveau fichier dans votre application, appelé <code>router.php</code>, pour définir nos routes, et copiez le code du panneau interactif à droite.</p>

## Ajouter une fonctionnalité de connexion à votre application {{{ data-action="code" data-code="login.php" }}}


<p>À présent que vous avez configuré votre application Auth0 et la trousse SDK PHP Auth0, vous devez configurer la connexion pour votre projet. Pour ce faire, vous utiliserez la méthode <code>login()</code> de la trousse SDK pour créer un bouton de connexion qui redirige les utilisateurs vers la page de connexion universelle Auth0. Une fois un utilisateur authentifié avec succès, il est redirigé vers l’URL de rappel que vous avez configurée précédemment dans ce guide de démarrage rapide.</p><p>Créez un nouveau fichier dans votre application, appelé <code>login.php</code>, pour gérer le processus de connexion, et copiez le code du panneau interactif à droite, qui contient la logique nécessaire à la connexion.</p><p><div class="checkpoint">PHP – Étape 4 – Point de contrôle <div class="checkpoint-default"><p>Vous devez désormais pouvoir vous connecter ou vous inscrire en utilisant un nom d’utilisateur et un mot de passe.</p><p>Cliquez sur le lien de connexion et vérifiez que :</p><ul><li><p>Votre application vous redirige vers la page de connexion universelle Auth0.</p></li><li><p>Vous pouvez vous connecter ou vous inscrire.</p></li><li><p>Auth0 vous redirige vers votre application en utilisant la valeur de <code>redirectUri</code> que vous avez utilisée pour configurer la trousse SDK.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>Vous avez configuré le bon <code>redirectUri</code>.</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>

## Ajouter une fonctionnalité de déconnexion à votre application {{{ data-action="code" data-code="logout.php" }}}


<p>Les utilisateurs qui se connectent à votre projet auront également besoin d’un moyen de se déconnecter. Nous allons gérer un bouton de déconnexion à l’aide de la méthode<code>logout()</code> de la trousse SDK. Lorsque les utilisateurs se déconnecteront, ils seront redirigés vers votre point de terminaison <a href="https://auth0.com/docs/api/authentication?http#logout" target="_blank" >Auth0 logout</a> qui par la suite les redirigera immédiatement vers l’URL de déconnexion que vous avez configurée précédemment dans ce guide de démarrage rapide.</p><p>Créez un nouveau fichier dans votre application, appelé <code>logout.php</code>, pour gérer le processus, et copiez le code du panneau interactif, qui contient la logique nécessaire à la déconnexion. Ensuite, mettez à jour votre fichier <code>index.php</code> pour y intégrer le nouveau bouton de déconnexion.</p><p><div class="checkpoint">PHP - Section 5 - Point de contrôle <div class="checkpoint-default"><p>Exécutez votre application et cliquez sur le bouton de déconnexion, vérifiez que :</p><ul><li><p>Votre application vous redirige vers l’adresse que vous avez précisée comme l’une des URL de déconnexion autorisées dans les paramètres de votre application.</p></li><li><p>Vous n’êtes plus connecté à votre application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>Vous avez configuré l’a bonne URL de déconnexion.</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>

## Afficher les informations du profil utilisateur {{{ data-action="code" data-code="profile.php" }}}


<p>Vu que vos utilisateurs peuvent désormais se connecter et se déconnecter, vous voudrez probablement pouvoir récupérer les <a href="https://auth0.com/docs/users/concepts/overview-user-profile" target="_blank" >informations de profil</a> associées aux utilisateurs authentifiés. Par exemple, vous voudrez peut-être pouvoir afficher le nom ou la photo de profil d’un utilisateur connecté dans votre projet.</p><p>La trousse SDK PHP Auth0 fournit des informations sur les utilisateurs via la méthode <code>getCredentials()</code>. Examinez le code <code>profile.php</code> dans le panneau interactif pour voir un exemple de la façon de l’utiliser.</p><p>Étant donné que la méthode contient des informations sensibles liées à l’identité de l’utilisateur, sa disponibilité dépend du statut d’authentification de l’utilisateur. Pour éviter les erreurs de rendu, vous devez toujours vérifier si la méthode <code>getCredentials()</code> renvoie un <code>object</code> ou <code>null</code> pour déterminer si Auth0 a authentifié l’utilisateur avant que votre application ne consomme les résultats.</p><p><div class="checkpoint">PHP - Étape 6 - Point de contrôle <div class="checkpoint-default"><p>Vérifiez que :</p><ul><li><p>vous pouvez afficher le <code>nickname</code> ou toute autre propriété de l’utilisateur adéquatement, après vous être connecté.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>Vous avez créé le fichier <code>profile.php</code> et êtes connecté.</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>
