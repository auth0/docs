---
title: Ajouter une autorisation à votre application API Express.js
description: Ce guide explique comment intégrer Auth0 à n’importe quelle application API Express.js, nouvelle ou existante, en utilisant le package express-oauth2-jwt-bearer .
interactive:  true
files:
 - files/server
github:
  path: https://github.com/auth0-samples/auth0-express-api-samples/tree/master/01-Authorization-RS256
locale: fr-CA
---

# Ajouter une autorisation à votre application API Express.js


<p>Ce guide explique comment intégrer Auth0 à n’importe quelle application API Express.js, nouvelle ou existante, en utilisant le package <code>express-oauth2-jwt-bearer</code> .</p><p>Si vous n’avez pas encore créé d’API dans votre Auth0 Dashboard, utilisez le sélecteur interactif pour créer une nouvelle API Auth0 ou sélectionner une API existante pour votre projet.</p><p>Pour configurer votre première API via Auth0 Dashboard, consultez <a href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis">notre guide de démarrage</a>. Chaque API Auth0 utilise l’identificateur API, dont votre application a besoin pour valider le jeton d’accès.</p><p><div class="alert-container" severity="default"><p><b>Vous ne connaissez pas Auth0?</b> Découvrez <a href="https://auth0.com/docs/overview">Auth0</a> et <a href="https://auth0.com/docs/api-auth">l’implémentation de l’authentification et de l’autorisation d’API</a> en utilisant le cadre d’applications OAuth 2.0.</p></div></p><p></p>

## Définir les autorisations


<p>Les autorisations vous permettent de définir comment les ressources peuvent être accessibles au nom de l’utilisateur avec un jeton d’accès en particulier. Par exemple, vous pouvez choisir d’accorder un accès en lecture à la ressource <code>messages</code> si les utilisateurs ont le niveau d’accès gestionnaire et un accès en écriture à cette ressource s’ils ont le niveau d’accès administrateur.</p><p>Vous pouvez définir les autorisations autorisées dans la vue <b>Permissions (Autorisations)</b> de la section <a href="https://manage.auth0.com/#/apis">APIs (API)</a> d&#39;Auth0 Dashboard.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/5EnGfdqLVZ8fuIxbUn7gm1/41998b8778fe7ad02b23131643b5ba95/Quickstarts_API_-_Permissions.png" alt="null" /><p><div class="alert-container" severity="default"><p>Cet exemple utilise la permission <code>read:messages</code>.</p></div></p>

## Installer les dépendances


<p>Tout d’abord, installez la trousse SDK avec <code>npm</code>.</p><p><pre><code class="language-powershell">npm install --save express-oauth2-jwt-bearer

</code></pre>

</p>

## Configurer le logiciel médiateur {{{ data-action="code" data-code="server.js#1:10" }}}


<p>Configurez <code>express-oauth2-jwt-bearer</code> avec votre domaine et votre identificateur API.</p><p>Le logiciel médiateur <code>checkJwt</code> présenté à droite vérifie si le jeton d’accès de l’utilisateur inclus dans la demande est valide. Si le jeton n’est pas valide, l’utilisateur reçoit une erreur 401 Authorization (Autorisation 401) lorsqu’il tente d’accéder aux points de terminaison.</p><p>Le logiciel médiateur ne vérifie pas si le jeton dispose d’une permission suffisante pour accéder aux ressources demandées.</p>

## Protéger les points de terminaison des API {{{ data-action="code" data-code="server.js#12:32" }}}


<p>Pour protéger une route individuelle en exigeant un JWT valide, configurez la route avec le logiciel médiateur <code>checkJwt</code> développé à partir de <code>express-oauth2-jwt-bearer</code>.</p><p>Vous pouvez configurer des routes individuelles pour qu’elles recherchent une permission particulière. Pour ce faire, configurez un autre logiciel médiateur avec la méthode <code>requiresScope</code>. Fournissez les permissions requises et appliquez le logiciel médiateur à toutes les routes auxquelles vous souhaitez ajouter une autorisation.</p><p>Transmettez les logiciels médiateurs <code>checkJwt</code> et <code>requiredScopes</code> à la route que vous souhaitez protéger.</p><p>Dans cette configuration, seuls les jetons d’accès avec la permission <code>read:messages</code> peuvent accéder au point de terminaison.</p><h3>Faire un appel à votre API</h3><p>Pour appeler votre API, vous avez besoin d’un jeton d’accès. Vous pouvez obtenir un jeton d’accès à des fins de test dans la vue <b>Test</b> de vos <a href="https://manage.auth0.com/#/apis">API settings (Paramètres API)</a>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/5HUMcKGXoNOvdJNXFI73oi/46c9a2dff462708e855bc1073e601f80/Tokens_-_French.png" alt="null" /><p>Fournir le Jeton d’accès comme un en-tête <code>Authorization</code> dans vos demandes.</p><p><pre><code>curl --request GET \

  --url http://${account.namespace}/api_path \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'

</code></pre>

</p><p><div class="checkpoint">API Node JS - Étape 4 - Point de contrôle <div class="checkpoint-default"><p>Maintenant que vous avez configuré votre application, exécutez-la pour vérifier que :</p><ul><li><p><code>GET /api/public</code>est disponible pour les demandes non authentifiées.</p></li><li><p><code>GET /api/private </code>est disponible pour les demandes authentifiées.</p></li><li><p><code>GET /api/private-scoped </code>est disponible pour les demandes authentifiées contenant un jeton d’accès avec la permission <code>read:messages </code>.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not start successfully:</p><ul><li><p>Verify you added the token as the <code>Authorization</code> header</p></li><li><p>Ensure the token has the correct scopes. Verify with <a href="https://jwt.io/">jwt.io</a>.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
