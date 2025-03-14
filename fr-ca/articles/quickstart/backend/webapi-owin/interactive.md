---
title: Ajouter une autorisation à votre application API ASP.NET OWIN Web
description: Ce tutoriel explique comment ajouter une autorisation à une API ASP.NET OWIN en utilisant le logiciel médiateur JWT standard.
interactive:  true
files:
 - files/Startup
 - files/OpenIdConnectSigningKeyResolver
 - files/ScopeAuthorizeAttribute
 - files/ApiController
github:
  path: https://github.com/auth0-samples/auth0-aspnet-owin-webapi-samples/tree/master/Quickstart/Sample
locale: fr-CA
---

# Ajouter une autorisation à votre application API ASP.NET OWIN Web


<p>Auth0 vous permet d’ajouter une autorisation à n’importe quel type d’application. Ce guide explique comment intégrer Auth0 à n’importe quelle application API ASP.NET Owin Web, nouvelle ou ancienne, à l’aide du package <code>Microsoft.Owin.Security.Jwt</code>.</p><p>Si vous n’avez pas encore créé d’API dans votre Auth0 dashboard, vous pouvez utiliser le sélecteur interactif pour créer une nouvelle API Auth0 ou sélectionner une API existante pour votre projet.</p><p>Pour configurer votre première API via Auth0 dashboard, consultez <a data-contentfulid="450QmC9wuUtjlt8UQzRgPd-fr-CA">notre guide de démarrage</a>.</p><p>Chaque API Auth0 utilise l’identifiant d’API, dont votre application a besoin pour valider le jeton d’accès.</p><p><div class="alert-container" severity="default"><p><b>Vous ne connaissez pas Auth0 ?</b> Découvrez <a data-contentfulid="43RIpZkDhzyy40WfzZvz4y-fr-CA">Auth0</a> et <a data-contentfulid="6eZFaxxcNpFYwyEI05AXXA-fr-CA">l’implémentation de l’authentification et de l’autorisation d’API</a> en utilisant le cadre d&#39;applications OAuth 2.0.</p></div></p><p></p>

## Définir les autorisations


<p>Les autorisations vous permettent de définir comment les ressources peuvent être accessibles au nom de l’utilisateur avec un jeton d’accès donné. Par exemple, vous pouvez choisir d’accorder un accès en lecture à la ressource <code>messages</code> si les utilisateurs ont le niveau d’accès gestionnaire et un accès en écriture à cette ressource s’ils ont le niveau d’accès administrateur.</p><p>Vous pouvez définir les autorisations autorisées dans la vue <b>Permissions (Autorisations)</b> de la section <a href="https://manage.auth0.com/#/apis">API</a> du Auth0 Dashboard. L’exemple suivant utilise la permission <code>read:messages</code>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/677a3405b2853f5fdf9e42f6e83ceba7/Quickstarts_API_-_French.png" alt="Auth0 Dashboard> Applications > APIs (API) > [Specific API (API précise)] > Onglet Permissions (Autorisations)" /><p></p>

## Installer des dépendances


<p>Installez le NuGetPackage <code>Microsoft.Owin.Security.Jwt</code>. Ce package contient le logiciel médiateur OWIN JWT nécessaire pour utiliser les jetons d’accès Auth0 dans l’API Web ASP.NET Owin.</p><p><pre><code class="language-powershell">Install-Package Microsoft.Owin.Security.Jwt

</code></pre>

</p><p></p>

## Configurer le logiciel médiateur {{{ data-action="code" data-code="Startup.cs" }}}


<p>Allez dans la méthode de <code>Configuration</code> de votre classe de <code>Startup</code> et ajoutez un appel à <code>UseJwtBearerAuthentication</code> passant dans les <code>JwtBearerAuthenticationOptions</code> configurées.</p><p><code>JwtBearerAuthenticationOptions</code> doit indiquer votre identificateur API Auth0 dans la propriété <code>ValidAudience</code> et le chemin complet vers votre domaine Auth0 en tant que <code>ValidIssuer</code>. Vous devrez configurer l’instance <code>IssuerSigningKeyResolver</code> pour utiliser l’instance <code>OpenIdConnectSigningKeyResolver</code> afin de résoudre la clé de connexion.</p><p><div class="alert-container" severity="warning"><p><b>N’oubliez pas la barre oblique finale</b>.</p><p>Assurez-vous que l’URL précisée pour <code>ValidIssuer</code> contient une barre oblique (<code>/</code>) finale. Cela doit correspondre exactement à la demande de l’émetteur JWT. Les appels d’API ne s’authentifieront pas correctement si vous avez mal configuré cette valeur.</p><p><b></b></p></div></p><p></p>

## Vérifier la signature du jeton {{{ data-action="code" data-code="OpenIdConnectSigningKeyResolver.cs" }}}


<p>Le logiciel médiateur OWIN JWT n’utilise pas Open ID Connect Discovery par défaut, vous devez donc fournir un <code>IssuerSigningKeyResolver</code> personnalisé.</p><p>Créez la classe <code>OpenIdConnectSigningKeyResolver</code> et assurez-vous de retourner la bonne <code>SecurityKey</code> en implémentant <code>GetSigningKey</code>. Cette classe est ensuite utilisée comme <code>TokenValidationParameters.IssuerSigningKeyResolver</code> lors de la configuration du logiciel médiateur dans <code>Startup.cs</code>.</p><p></p>

## Valider les permissions {{{ data-action="code" data-code="ScopeAuthorizeAttribute.cs" }}}


<p>Le logiciel médiateur JWT vérifie que le jeton d’accès inclus dans la demande est valide; cependant, il n’inclut pas encore de mécanisme pour vérifier que le jeton a une <b>permission</b> suffisante pour accéder aux ressources demandées.</p><p>Créez une classe appelée <code>ScopeAuthorizeAttribute</code> qui hérite de <code>System.Web.Http.AuthorizeAttribute</code>. Cet attribut vérifiera que la demande de <code>scope</code> émise par votre locataire Auth0 est présente, et si oui, il assurera que la demande de <code>scope</code> contient la permission demandée.</p>

## Protéger les points de terminaison des API {{{ data-action="code" data-code="ApiController.cs" }}}


<p>Les routes ci-dessous sont disponibles pour les requêtes suivantes :</p><ul><li><p><code>GET /api/public</code> : disponible pour les requêtes non authentifiées.</p></li><li><p><code>GET /api/private</code> : disponible pour les requêtes authentifiées contenant un jeton d’accès sans permission supplémentaire.</p></li><li><p><code>GET /api/private-scoped</code> : disponible pour les requêtes authentifiées contenant un jeton d’accès dont la permission <code>read:messages </code>est accordée.</p></li></ul><p>Le logiciel médiateur JWT s’intègre aux mécanismes d’authentification et d’autorisation standard d’ASP.NET, vous n’avez donc qu’à décorer votre action de contrôleur avec l’attribut <code>[Authorize]</code> pour sécuriser un point de terminaison.</p><p>Mettez à jour l’action avec l’attribut <code>ScopeAuthorize</code> et passez le nom de la <code>scope</code> requise dans le paramètre <code>scope</code>. Cela garantit que la permission adéquate est disponible pour appeler un point de terminaison d’API donné.</p><p><div class="checkpoint">Guide rapide ASP.NET API OWIN - Étape 6 Point de contrôle <div class="checkpoint-default"><p>Maintenant que vous avez configuré votre application, lancez votre application et vérifiez que :</p><ul><li><p><code>GET /api/public</code> est disponible pour les demandes non authentifiées.</p></li><li><p><code>GET /api/private</code> est disponible pour les demandes authentifiées.</p></li><li><p><code>GET /api/private-scoped</code> est disponible pour les demandes authentifiées contenant un jeton d’accès avec la permission <code>read:messages </code>.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not start successfully:</p><ul><li><p>Ensure your configured the <code>ValidIssuer</code> and <code>ValidAudience</code> values correctly</p></li><li><p>Verify you added the token as the <code>Authorization</code> header</p></li><li><p>Ensure the token has the correct scopes. Verify with <a href="https://jwt.io/">jwt.io</a>.</p></li></ul><p>Still having issues? Check out our <a href="/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
