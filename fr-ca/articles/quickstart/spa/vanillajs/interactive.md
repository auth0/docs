---
title: Ajouter une fonctionnalité de connexion à votre application JavaScript
description: Ce guide explique comment intégrer Auth0, ajouter l’authentification et afficher les informations de profil utilisateur dans une application à page unique (SPA) qui utilise du simple JavaScript, en utilisant la trousse SDK Auth0 SPA.
interactive:  true
files:
 - files/app
github:
  path: 01-Login
locale: fr-CA
---

# Ajouter une fonctionnalité de connexion à votre application JavaScript


<p>Auth0 vous permet d’ajouter rapidement l’authentification à presque tous les types d’application. Ce guide explique comment intégrer Auth0, ajouter l’authentification et afficher les informations de profil utilisateur dans une application à page unique (SPA) qui utilise du simple JavaScript, en utilisant la trousse <a href="https://github.com/auth0/auth0-spa-js" target="_blank" rel="noreferrer noopener">SDK Auth0 SPA</a>.</p><p>Pour utiliser ce guide rapide, vous devez :</p><ul><li><p>Vous inscrire à un compte Auth0 gratuit ou vous connecter à Auth0.</p></li><li><p>Disposer d’un projet fonctionnel avec lequel vous souhaitez vous intégrer. Vous pouvez également consulter ou télécharger une application faisant office d’exemple lorsque vous vous connectez.</p></li></ul><p><div class="alert-container" severity="default"><p>Ce guide rapide suppose que vous ajoutez Auth0 à une application simple JavaScript, par opposition à l’utilisation d’un cadre d’applications comme React ou Angular.</p></div></p><p></p><p></p>

## Configuration d’Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer le fonctionnement de l’authentification pour le projet que vous développez.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application existante qui représente le projet avec lequel vous souhaitez effectuer l’intégration. Dans Auth0, il est attribué à chaque application un identifiant client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce guide rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, qui est l’endroit où vous pourrez gérer vos applications à l’avenir.</p><p>Si vous préférez explorer une configuration complète, consultez plutôt un exemple d’application.</p><h3>Configurer les URL de rappel</h3><p>Une URL de rappel est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur authentification. Si elle n’est pas définie, les utilisateurs ne seront pas redirigés vers votre application après s’être connectés.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur <code>http://localhost:3000</code>.</p></div></p><h3>Configuration des URL de déconnexion</h3><p>Une URL de déconnexion est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur déconnexion. Si elle n’est pas définie, les utilisateurs ne pourront pas se déconnecter de votre application et recevront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur <code>http://localhost:3000</code>.</p></div></p><h3>Configurer les origines Web autorisées</h3><p>Une origine Web autorisée est une URL que vous souhaitez autoriser à accéder à votre flux d’authentification. Elle doit contenir l’URL de votre projet. Si elle n’est pas configurée adéquatement, votre projet ne pourra pas actualiser silencieusement les jetons d’authentification, ce qui entraînera la déconnexion de vos utilisateurs lorsque prochainement ils visiteront votre application ou lors de l’actualisation d’une page.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur <code>http://localhost:3000</code>.</p></div></p>

## Ajouter la trousse SDK Auth0 SPA


<p>Auth0 propose une trousse SDK SPA (auth0-spa-js) pour simplifier le processus de mise en œuvre de l’authentification et de l’autorisation Auth0 dans les applications JavaScript. Vous pouvez installer la trousse SDK Auth0 SPA en tant que paquet NPM ou à partir du CDN. Pour les besoins de ce démarrage rapide, nous utiliserons le CDN. Incluez cette balise de script dans votre page HTML :</p><p><pre><code class="language-javascript">&lt;script src=&quot;https://cdn.auth0.com/js/auth0-spa-js/2.0/auth0-spa-js.production.js&quot;&gt;&lt;/script&gt;

</code></pre>

</p>

## Créer le client Auth0 {{{ data-action="code" data-code="app.js#1:7" }}}


<p>Créez une nouvelle instance du client Auth0 fourni par la trousse SDK Auth0 SPA et fournissez les détails de l’application Auth0 que vous avez créée plus tôt dans ce guide rapide.</p><p>Si un utilisateur s’est déjà connecté, le client actualisera l’état d’authentification lors du chargement de la page; l’utilisateur restera connecté après l’actualisation de la page.</p>

## Ajouter une fonctionnalité de connexion à votre application {{{ data-action="code" data-code="app.js#8:14" }}}


<p>À présent que vous avez configuré votre application Auth0, ajouté la trousse SDK Auth0 SPA et créé le client Auth0, vous devez configurer la connexion pour votre projet. Pour ce faire, vous utiliserez la méthode <code>loginWithRedirect()</code> de la trousse SDK pour rediriger les utilisateurs vers la page de connexion universelle Auth0 où Auth0 peut les authentifier. Une fois un utilisateur authentifié avec succès, il est redirigé vers l’URL de rappel que vous avez configurée précédemment dans ce démarrage rapide.</p><p>Créez un bouton de connexion dans votre application qui appelle <code>loginWithRedirect()</code> lorsqu’il est sélectionné.</p><p><div class="checkpoint">Guide rapide Javascript - Étape 4 - Point de contrôle <div class="checkpoint-default"><p>Vous devriez maintenant pouvoir vous connecter à votre application.</p><p>Exécutez votre application et sélectionnez le bouton de connexion. Vérifiez que :</p><ul><li><p>Vous pouvez vous connecter ou vous inscrire en utilisant un nom d’utilisateur et un mot de passe</p></li><li><p>Votre application vous redirige vers la page <a href="https://auth0.com/universal-login" target="_blank" >Connexion universelle Auth0</a>.</p></li><li><p>Vous êtes redirigé vers Auth0 pour l’authentification</p></li><li><p>Auth0 redirige bien vers votre application après l’authentification</p></li><li><p>Vous ne recevez aucun message d’erreur dans la console lié à Auth0</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>assurez-vous que la bonne application est sélectionnée</p></li><li><p>assurez-vous d&#39;effectuer un enregistrement après avoir saisi vos URL</p></li><li><p>assurez-vous que le client Auth0 a été correctement configuré avec votre domaine Auth0 et votre identifiant client</p></li></ul><p>Vous rencontrez toujours des problèmes? Pour obtenir de l’aide, consultez notre <a href="https://auth0.com/docs/" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a>.</p></div>

  </div></p>

## Gérer le rappel de Auth0 {{{ data-action="code" data-code="app.js#16:21" }}}


<p>Lorsque le navigateur est redirigé vers votre processus d’application, votre application doit appeler la fonction <code>handleRedirectCallback()</code> sur le client Auth0 uniquement lorsqu’elle détecte un rappel provenant d’Auth0. Une façon de procéder consiste à appeler <code>handleRedirectCallback()</code> uniquement lorsque des paramètres de requête <code>code</code> et <code>state</code> sont détectés.</p><p>Si la gestion du rappel a réussi, les paramètres doivent être supprimés de l’URL afin d’éviter que le gestionnaire du rappel ne soit déclenché lors du prochain chargement de la page.</p><p><div class="checkpoint">Démarrage rapide Javascript - Étape 5 - Point de contrôle <div class="checkpoint-default"><p>Votre rappel provenant d’Auth0 devrait maintenant être correctement traité.</p><p>Exécutez votre application et sélectionnez le bouton de connexion. Veuillez vérifiez que :</p><ul><li><p>Auth0 redirige avec succès vers votre application après l’authentification.</p></li><li><p>les paramètres de requête sont supprimés de l’URL.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>vérifiez que l’option <code>redirect_uri</code> a été configurée sur l’URL de votre application</p></li><li><p>si vous avez un paramètre de requête <code>error</code>, inspectez-le pour connaître la cause de l’erreur</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs/" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>

## Ajouter une fonctionnalité de déconnexion à votre application {{{ data-action="code" data-code="app.js#23:29" }}}


<p>Les utilisateurs qui se connectent à votre projet auront également besoin de <a href="https://auth0.com/docs/logout/guides/logout-auth0" target="_blank" >a way to log out (un moyen de se déconnecter)</a>. Le client Auth0 fournit une méthode <code>logout()</code> que vous pouvez utiliser pour déconnecter un utilisateur de votre application. Lorsque les utilisateurs se déconnectent, ils seront redirigés vers votre <a href="https://auth0.com/docs/api/authentication?javascript#logout" target="_blank" >Auth0 logout endpoint (Point de terminaison de déconnexion Auth0)</a>, qui par la suite les redirigera immédiatement vers votre application et l’URL de déconnexion que vous avez configurée précédemment dans ce démarrage rapide.</p><p>Créez un bouton de déconnexion dans votre application qui appelle <code>logout()</code> lorsqu’il est sélectionné.</p><p><div class="alert-container" severity="default"><p>La trousse SDK présente une fonction <code>isAuthenticated()</code> qui permet de vérifier si un utilisateur est authentifié ou non. Vous pouvez produire les boutons de connexion et de déconnexion de manière conditionnelle en fonction de la valeur de la fonction <code>isAuthenticated()</code>. Vous pouvez également utiliser un seul bouton pour combiner les boutons de connexion et de déconnexion ainsi que leur rendu conditionnel.</p></div></p><p><div class="checkpoint">Guide rapide Javascript - Étape 6 - Point de contrôle <div class="checkpoint-default"><p>Vous devriez maintenant pouvoir vous connecter à votre application.</p><p>Exécutez votre application, connectez-vous et sélectionnez le bouton de déconnexion. Vérifiez que :</p><ul><li><p>vous êtes redirigé vers le point de terminaison de déconnexion Auth0.</p></li><li><p>Auth0 redirige bien vers votre application et l’URL de déconnexion correcte.</p></li><li><p>vous n’êtes plus connecté à votre application.</p></li><li><p>Vous ne recevez aucun message d’erreur dans la console lié à Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>assurez-vous d’avoir configuré l’URL de déconnexion comme l’une des <b>URL de déconnexion autorisées </b>dans les <b>Paramètres</b> de votre application</p></li><li><p>inspectez les <a href="https://manage.auth0.com/#/logs" target="_blank" rel="noreferrer noopener">journaux de l’application</a> pour y trouver d’autres erreurs éventuelles</p></li></ul><p>Vous rencontrez toujours des problèmes? Pour obtenir de l’aide, consultez notre <a href="https://auth0.com/docs/" target="_blank" >documentation</a> ou visitez la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a>.</p></div>

  </div></p>

## Afficher les informations du profil utilisateur {{{ data-action="code" data-code="app.js#31:45" }}}


<p>Vu que vos utilisateurs peuvent désormais se connecter et se déconnecter, vous voudrez probablement pouvoir récupérer les <a href="https://auth0.com/docs/users/concepts/overview-user-profile" target="_blank" >informations de profil</a> associées aux utilisateurs authentifiés. Par exemple, vous voudrez peut-être pouvoir personnaliser l’interface utilisateur en affichant le nom ou la photo de profil d’un utilisateur connecté.</p><p>La trousse SDK Auth0 SPA fournit des informations sur les utilisateurs par l’intermédiaire de la fonction <code>getUser()</code> exposée par le client Auth0. Le client Auth0 expose également une fonction <code>isAuthenticated()</code> qui vous permet de vérifier si un utilisateur est authentifié ou non, ce qui vous permet de déterminer s’il faut afficher ou masquer des éléments de l’interface utilisateur, par exemple. Examinez le code dans le panneau interactif pour voir des exemples d’utilisation de ces fonctions.</p><p><div class="checkpoint">Démarrage rapide JavaScript - Étape 7 - Point de contrôle <div class="checkpoint-default"><p>Vous devriez maintenant être en mesure d’afficher les informations relatives au profil utilisateur.</p><p>Exécutez votre application et vérifiez que :</p><ul><li><p>Les informations sur l’utilisateur s’affichent correctement après la connexion.</p></li><li><p>Les informations sur l’utilisateur ne s’affichent pas après la déconnexion.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>assurez-vous que toutes les étapes précédentes fonctionnent sans problème</p></li><li><p>vérifiez votre code qui gère l’interface utilisateur en réponse à l’état d’authentification</p></li><li><p>inspectez les <a href="https://manage.auth0.com/#/logs" target="_blank" rel="noreferrer noopener">journaux de l’application</a> pour y chercher d’autres erreurs liées à l’authentification silencieuse</p></li></ul><p>Vous rencontrez toujours des problèmes? Pour obtenir de l’aide, consultez notre <a href="https://auth0.com/docs/" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a>.</p></div>

  </div></p>
