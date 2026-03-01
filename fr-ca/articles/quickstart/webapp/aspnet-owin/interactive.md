---
title: Ajouter une fonctionnalité de connexion à votre application ASP.NET OWIN
description: Ce guide explique comment intégrer Auth0 à n’importe quelle application ASP.NET OWIN, nouvelle ou ancienne, à l’aide du package NuGet Microsoft.Owin.Security.OpenIdConnect.
interactive:  true
files:
 - files/Web
 - files/Startup
 - files/AccountController
github:
  path: Quickstart/Sample
locale: fr-CA
---

# Ajouter une fonctionnalité de connexion à votre application ASP.NET OWIN


<p>Auth0 vous permet d’ajouter rapidement l’authentification et de pouvoir accéder aux informations relatives au profil utilisateur dans votre application. Ce guide explique comment intégrer Auth0 à n’importe quelle application ASP.NET OWIN, nouvelle ou ancienne, en utilisant le package Nuget <code>Microsoft.Owin.Security.OpenIdConnect</code>.</p><p></p>

## Configuration d’Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer le fonctionnement de l’authentification pour le projet que vous développez.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application existante qui représente le projet avec lequel vous souhaitez effectuer l’intégration. Dans Auth0, il est attribué à chaque application un identifiant client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce démarrage rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, qui est l’endroit où vous pourrez gérer vos Applications à l’avenir.</p><p>Si vous préférez explorer une configuration complète, consultez plutôt un exemple d’application.</p><h3>Configuration des URL de rappel</h3><p>Une URL de rappel est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur authentification. Si elle n’est pas définie, les utilisateurs ne seront pas redirigés vers votre application après s’être connectés.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, définissez cette URL comme suit : <code>http://localhost:3000</code><code>/callback</code>.</p></div></p><h3>Configuration des URL de déconnexion</h3><p>Une URL de déconnexion est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur déconnexion. Si elle n’est pas définie, les utilisateurs ne pourront pas se déconnecter de votre application et recevront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, définissez cette URL comme suit : <code>http://localhost:3000</code>.</p></div></p>

## Configurer le projet {{{ data-action="code" data-code="Web.config" }}}


<h3>Installer à partir de Nuget</h3><p>Pour intégrer Auth0 avec ASP.NET OWIN, vous pouvez utiliser les packages Nuget <code>Microsoft.Owin.Security.OpenIdConnect</code> et <code>Microsoft.Owin.Security.Cookies</code>.</p><p><pre><code>Install-Package Microsoft.Owin.Security.OpenIdConnect

Install-Package Microsoft.Owin.Security.Cookies

</code></pre>

</p><p><div class="alert-container" severity="default"><p>Des problèmes surviennent lorsque vous configurez l’intergiciel de témoin OWIN et les témoins System.Web en même temps. Pour en savoir plus, consultez <a href="https://github.com/aspnet/AspNetKatana/wiki/System.Web-response-cookie-integration-issues" target="_blank" rel="noreferrer noopener">la documentation sur les problèmes d’intégration des témoins System.Web</a> afin d’atténuer ces problèmes.</p></div></p><h3>Configurer les identifiants</h3><p>Pour que la trousse SDK fonctionne correctement, définissez les propriétés suivantes dans <code>Web.config</code> :</p><ul><li><p><code>auth0:Domain</code> : Le domaine de votre locataire Auth0. Celui-ci figure dans Auth0 Dashboard, dans les <b>Settings (Paramètres)</b> de votre application dans le champ Domaine. Si vous utilisez un <a href="https://auth0.com/docs/custom-domains" target="_blank" >domaine personnalisé</a>, définissez ceci plutôt sur la valeur de votre domaine personnalisé.</p></li><li><p><code>auth0:ClientId</code> : L’identifiant de l’application Auth0 que vous avez créée dans Auth0 Dashboard. Celui-ci figure dans Auth0 Dashboard, dans les <b>Settings (Paramètres)</b> de votre application dans le champ Identifiant client.</p></li></ul><p></p>

## Configurer le logiciel médiateur {{{ data-action="code" data-code="Startup.cs#18:74" }}}


<p>Pour activer l’authentification dans votre application ASP.NET OWIN, reportez-vous à la méthode de configuration de votre classe de démarrage et configurez le témoin, ainsi que le logiciel médiateur OIDC.</p><p>Il est essentiel d’enregistrer à la fois le logiciel médiateur de témoin et le logiciel médiateur OpenID Connect, car les deux sont nécessaires (dans cet ordre) pour que l’authentification fonctionne. le logiciel médiateur OpenID Connect gère l’authentification avec Auth0. Une fois que les utilisateurs se sont authentifiés, leur identité est sauvegardée dans le logiciel médiateur de témoin.</p><p>Dans l’extrait de code, AuthenticationType est défini sur <b>Auth0</b>. Utilisez AuthenticationType dans la section suivante pour lancer un défi au logiciel médiateur OpenID Connect et commencer le flux d’authentification. L’événement de notification RedirectToIdentityProvider génère la bonne <a data-contentfulid="5sl85ipAFaf8i4CH9wD6VA-fr-CA">Logout URL (URL de déconnexion)</a>.</p>

## Ajouter une fonctionnalité de connexion à votre application {{{ data-action="code" data-code="AccountController.cs#7:16" }}}


<p>Pour permettre aux utilisateurs de se connecter à votre application ASP.NET OWIN, ajoutez une action <code>Login</code>à votre contrôleur.</p><p>Appelez <code>HttpContext.GetOwinContext().Authentication.Challenge</code> et passez <code>Auth0</code> comme schéma d’authentification. Cette action fait appel au gestionnaire d’authentification OIDC qui a été enregistré plus tôt. Veillez à préciser les <code>AuthenticationProperties</code>, y compris un <code>RedirectUri</code>i.</p><p>Après avoir appelé avec succès <code>HttpContext.GetOwinContext().Authentication.Challenge</code>, l’utilisateur est redirigé vers Auth0 et est connecté à la fois au logiciel médiateur OIDC et au logiciel médiateur de témoin après avoir été redirigé vers votre application. Cela permettra aux utilisateurs d’être authentifiés lors des requêtes suivantes.</p><p><div class="checkpoint">ASP.NET (OWIN) - Étape 4 - Point de contrôle <div class="checkpoint-default"><p>Maintenant que vous avez configuré la fonction de connexion, lancez votre application pour vérifier que :</p><ul><li><p>naviguer vers votre action <code>Login</code> vous redirigera vers Auth0,</p></li><li><p>saisir vos identifiants vous redirigera vers votre application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>assurez-vous que la bonne application est sélectionnée</p></li><li><p>avez-vous procédé à un enregistrement après avoir saisi vos URL?</p></li><li><p>assurez-vous que le domaine et l’identifiant client sont correctement configurés</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>

## Ajouter une fonctionnalité de déconnexion à votre application {{{ data-action="code" data-code="AccountController.cs#34:39" }}}


<p>À partir de l’action de votre contrôleur, appelez <code>HttpContext.GetOwinContext().Authentication.SignOut</code> avec le schéma d’authentification <code>CookieAuthenticationDefaults.AuthenticationType</code> pour déconnecter l’utilisateur de votre application.</p><p>De plus, si vous souhaitez déconnecter l’utilisateur d’Auth0 (cette action pourrait également le déconnecter d’autres applications qui dépendent de l’authentification unique), appelez <code>HttpContext.GetOwinContext().Authentication.SignOut</code> avec le schéma d’authentification <code>&quot;Auth0&quot;</code>.</p><p><div class="checkpoint">ASP.NET (OWIN) – Étape 5 – Point de contrôle <div class="checkpoint-default"><p>Maintenant que vous avez configuré la fonction de déconnexion, exécutez votre application pour vérifier que :</p><ul><li><p>Naviguer vers votre action <code>Logout</code> garantit que l’utilisateur est déconnecté.</p></li><li><p>Lors de la déconnexion, vous êtes redirigé vers Auth0 puis immédiatement renvoyé vers votre application pendant la déconnexion.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>assurez-vous que la bonne application est sélectionnée</p></li><li><p>avez-vous procédé à un enregistrement après avoir saisi vos URL?</p></li><li><p>assurez-vous que le domaine et l’identifiant client sont correctement configurés</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>

## Afficher les informations du profil utilisateur {{{ data-action="code" data-code="AccountController.cs#18:32" }}}


<p>Après que l’intergiciel a réussi à récupérer les jetons d’Auth0, il extraira les informations et les demandes de l’utilisateur à partir du jeton d’ID et les met à disposition en tant que <code>ClaimsIdentity</code>. Accédez aux informations extraites en utilisant la propriété <code>User</code> dans le contrôleur.</p><p>Pour créer un profil utilisateur, récupérez le nom, l’adresse courriel et l’image de profil de l’utilisateur à partir de <code>User</code> et visualisez-les à partir de votre contrôleur.</p><p><div class="checkpoint">ASP.NET (OWIN) - Étape 6 - Point de contrôle <div class="checkpoint-default"><p>Maintenant que vous avez configuré votre action pour afficher le profil de l’utilisateur, lancez votre application pour vérifier que :</p><ul><li><p>naviguer vers votre action <code>Profile</code> après vous être connecté avec succès affiche le profil de l’utilisateur.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>assurez-vous que la bonne application est sélectionnée</p></li><li><p>assurez-vous que le domaine et l’identifiant client sont correctement configurés</p></li><li><p>Avez-vous défini <code>openid profile email</code> comme permission?</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>
