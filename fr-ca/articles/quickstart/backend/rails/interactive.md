---
title: Ajouter une autorisation à votre API Ruby on Rails
description: Ce tutoriel effectue la validation des jetons d’accès en utilisant le Gem jwt dans une classe Auth0Client personnalisée.
interactive:  true
files:
 - files/app/controllers/application_controller
 - files/app/lib/auth0_client
 - files/app/controllers/concerns/secured
 - files/app/controllers/public_controller
 - files/app/controllers/private_controller
github:
  path: https://github.com/auth0-samples/auth0-rubyonrails-api-samples/tree/master/01-Authentication-RS256
locale: fr-CA
---

# Ajouter une autorisation à votre API Ruby on Rails


<p>Ce tutoriel effectue la validation des jetons d’accès en utilisant le Gem <a href="https://github.com/jwt/ruby-jwt"><b>jwt</b></a> dans une classe <code>Auth0Client</code> personnalisée. Un Concern appelé <code>Secured</code> est utilisé pour autoriser les points de terminaison qui nécessitent une authentification par le biais d’un jeton d’accès entrant.</p><p>Si vous n’avez pas encore créé d’API dans votre Auth0 Dashboard, vous pouvez utiliser le sélecteur interactif pour créer une nouvelle API Auth0 ou sélectionner une API existante pour votre projet.</p><p>Pour configurer votre première API via Auth0 Dashboard, consultez <a href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis">notre guide de démarrage</a>.</p><p>Chaque API Auth0 utilise l’identifiant d’API, dont votre application a besoin pour valider le jeton d’accès.</p><p><div class="alert-container" severity="default"><p><b>Vous ne connaissez pas Auth0?</b> Découvrez <a href="https://auth0.com/docs/overview">Auth0</a> et <a href="https://auth0.com/docs/api-auth">l’implémentation de l’authentification et de l’autorisation d’API</a> en utilisant le cadre d’applications OAuth 2.0.</p></div></p><p></p>

## Définir les autorisations


<p>Les autorisations vous permettent de définir comment les ressources peuvent être accessibles au nom de l’utilisateur avec un jeton d’accès en particulier. Par exemple, vous pouvez choisir d’accorder un accès en lecture à la ressource <code>messages</code> si les utilisateurs ont le niveau d’accès gestionnaire et un accès en écriture à cette ressource s’ils ont le niveau d’accès administrateur.</p><p>Vous pouvez définir les autorisations autorisées dans la vue <b>Permissions (Autorisations)</b> de la section <a href="https://manage.auth0.com/#/apis">APIs (API)</a> d&#39;Auth0 Dashboard.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/677a3405b2853f5fdf9e42f6e83ceba7/Quickstarts_API_-_French.png" alt="Auth0 Dashboard> Applications > APIs (API) > [Specific API (API précise)] > Onglet Permissions (Autorisations)" /><p><div class="alert-container" severity="default"><p>Cet exemple utilise la permission <code>read:messages</code>.</p></div></p>

## Installer les dépendances


<p>Installer le Gem <b>jwt</b>.</p><p><pre><code class="language-powershell">gem 'jwt'

    bundle install

</code></pre>

</p><p></p>

## Créer une classe Auth0Client {{{ data-action="code" data-code="app/controllers/concerns/secured.rb" }}}


<p>Créez une classe appelée <code>Auth0Client</code>. Cette classe décode et vérifie le jeton d’accès entrant provenant de l’en-tête <code>Authorization</code> de la demande.</p><p>La classe <code>Auth0Client</code> récupère la clé publique de votre locataire Auth0 et l’utilise pour vérifier la signature du jeton d’accès. La structure <code>Token</code> définit une méthode <code>validate_permissions</code> pour rechercher une <code>scope</code> particulière dans un jeton d’accès en fournissant un tableau des permissions requises et en vérifiant si elles sont présentes dans la charge utile du jeton.</p>

## Définir un concern Secured {{{ data-action="code" data-code="app/controllers/concerns/secured.rb" }}}


<p>Créez un Concern appelé <code>Secured</code> qui recherche le jeton d’accès dans l’en-tête <code>Authorization</code> d’une requête entrante.</p><p>Si le jeton est présent, <code>Auth0Client.validate_token</code> utilisera le Gem <code>jwt</code> pour vérifier la signature du jeton et valider les demandes du jeton.</p><p>Outre la vérification de la validité du jeton d’accès, Concern possède un mécanisme permettant de confirmer que le jeton dispose d’une <b>permission</b> suffisante pour accéder aux ressources demandées. Dans cet exemple, nous définissons une méthode <code>validate_permissions</code> qui reçoit un bloc et vérifie les autorisations en appelant la méthode <code>Token.validate_permissions</code> de la classe <code>Auth0Client</code>.</p><p>Pour la route <code>/private-scoped</code>, les permissions définies seront croisées avec les permissions provenant de la charge utile, afin de déterminer si elle contient un ou plusieurs éléments de l’autre tableau.</p>

## Inclure le concern Secure dans votre ApplicationController {{{ data-action="code" data-code="app/controllers/application_controller.rb" }}}


<p>En ajoutant le concern <code>Secure</code> à votre contrôleur d’application, vous n’aurez plus qu’à utiliser un filtre <code>before_action</code> dans le contrôleur qui requiert une autorisation.</p>

## Créer le point de terminaison public {{{ data-action="code" data-code="app/controllers/public_controller.rb" }}}


<p>Créez un contrôleur pour gérer le point de terminaison public <code>/api/public</code>.</p><p>Le point de terminaison <code>/public</code> ne requiert aucune autorisation et aucune <code>before_action</code> n’est donc nécessaire.</p>

## Créer les points de terminaison privés {{{ data-action="code" data-code="app/controllers/private_controller.rb" }}}


<p>Créez un contrôleur pour gérer les points de terminaison privés : <code>/api/private</code> et <code>/api/private-scoped</code>.</p><p><code>/api/private</code> est disponible pour les requêtes authentifiées contenant un jeton d’accès sans permission supplémentaire.</p><p><code>/api/private-scoped</code> est disponible pour les requêtes authentifiées contenant un jeton d’accès dont la permission <code>read:messages</code> est accordée.</p><p>Les points de terminaison protégés doivent appeler la méthode <code>authorize</code> du concern <code>Secured</code>; vous devez pour cela utiliser <code>before_action :authorize</code>, ce qui assure que la méthode <code>Secured.authorize</code> est appelée avant chaque action dans le <code>PrivateController</code>.</p><h3>Faire un appel à votre API</h3><p>Pour appeler votre API, vous avez besoin d’un jeton d’accès. Vous pouvez obtenir un jeton d’accès à des fins de test dans la vue <b>Test</b> dans vos <a href="https://manage.auth0.com/#/apis">API settings (Paramètres API)</a>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/6jeVBuypOGX5qMRXeJn5ow/8aa621c6d95e3f21115493a19ab05f7a/Quickstart_Example_App_-_API.png" alt="Auth0 Dashboard> Applications > API > [API specifique] > Onglet Test" /><p>Fournir le Jeton d’accès comme un en-tête <code>Authorization</code> dans vos demandes.</p><p><pre><code class="language-bash">curl --request GET \

  --url http://${account.namespace}/api_path \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'

</code></pre>

</p><p><div class="checkpoint">Ruby on Rails - Étape 7- Point de contrôle <div class="checkpoint-default"><p>Maintenant que vous avez configuré votre application, exécutez-la pour vérifier que :</p><ul><li><p><code>GET /api/public</code> est disponible pour les demandes non authentifiées.</p></li><li><p><code>GET /api/private </code> est disponible pour les demandes authentifiées.</p></li><li><p><code>GET /api/private-scoped </code> est disponible pour les demandes authentifiées contenant un jeton d’accès avec la permission <code>read:messages </code>.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not start successfully:</p><ul><li><p>Verify you added the token as the <code>Authorization</code> header</p></li><li><p>Ensure the token has the correct scopes. Verify with <a href="https://jwt.io/">jwt.io</a>.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
