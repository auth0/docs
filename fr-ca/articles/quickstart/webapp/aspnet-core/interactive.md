---
title: Ajouter une fonctionnalité de connexion à votre application ASP.NET MVC
description: Ce guide explique comment intégrer Auth0 à n’importe quelle application ASP.NET MVC, nouvelle ou existante, à l’aide de la trousse SDK Auth0.AspNetCore.Authentication.
interactive:  true
files:
 - files/Program
 - files/appsettings
 - files/AccountController
github:
  path: https://github.com/auth0-samples/auth0-aspnetcore-mvc-samples/tree/master/Quickstart/Sample
locale: fr-CA
---

# Ajouter une fonctionnalité de connexion à votre application ASP.NET MVC


<p>Auth0 vous permet d’ajouter rapidement l’authentification et de pouvoir accéder aux informations relatives au profil utilisateur dans votre application. Ce guide explique comment intégrer Auth0 à n’importe quelle application ASP.NET MVC, nouvelle ou existante, à l’aide de la trousse SDK <b>Auth0.AspNetCore.Authentication</b>.</p><p></p>

## Configurer Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer le fonctionnement de l’authentification pour le projet que vous développez.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application existante qui représente le projet avec lequel vous souhaitez vous intégrer. Dans Auth0, il est attribué à chaque application un identificateur client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce guide rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/#/">Dashboard</a>, qui vous permettra de gérer vos applications.</p><p>Si vous préférez explorer une configuration complète, vous pouvez plutôt consulter une application faisant office d’exemple.</p><h3>Configuration des Callback URL</h3><p>Une Callback URL est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après qu’ils se sont authentifiés. Si elle n’est pas définie, les utilisateurs ne seront pas redirigés vers votre application après s’être connectés.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur <code>http://localhost:3000/callback</code>.</p></div></p><h3>Configuration des URL de déconnexion</h3><p>Une URL de déconnexion est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après qu’ils se sont déconnectés. Si elle n’est pas définie, les utilisateurs ne pourront pas se déconnecter de votre application et recevront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre projet à titre d’exemple, définissez ceci sur <code>http://localhost:3000</code>.</p><p></p></div></p>

## Installer et configurer la trousse SDK {{{ data-action="code" data-code="Program.cs" }}}


<h3>Installer à partir de Nuget</h3><p>Pour intégrer Auth0 à ASP.NET Core, vous pouvez utiliser notre trousse SDK en installant le <a href="https://www.nuget.org/packages/Auth0.AspNetCore.Authentication/">package Nuget</a><code>Auth0.AspNetCore.Authentication</code> dans votre application.</p><p></p><h3>Configurer le logiciel médiateur</h3><p>Pour activer l’authentification dans votre application ASP.NET Core, utilisez le logiciel médiateur fourni par la trousse SDK. Allez dans le fichier <code>Program.cs</code> et appelez <code>builder.Services.AddAuth0WebAppAuthentication()</code> pour enregistrer le logiciel médiateur de la trousse SDK.</p><p>Assurez-vous de configurer le <code>Domain</code> et <code>ClientId</code>, car il s&#39;agit de champs requis pour garantir que la trousse SDK sache quel locataire Auth0 et quelle application elle doit utiliser.</p><p>Assurez-vous d’avoir activé l’authentification et l’autorisation dans votre fichier <code>Program.cs</code>.</p>

## Connexion {{{ data-action="code" data-code="AccountController.cs" }}}


<p>Pour permettre aux utilisateurs de se connecter à votre application ASP.NET MVC, ajoutez une action <code>Login</code> à votre contrôleur.</p><p>Appelez <code>HttpContext.ChallengeAsync()</code> et transmettez <code>Auth0Constants.AuthenticationScheme</code> comme schéma d’authentification. Cela fera appel au gestionnaire d’authentification OIDC que notre trousse SDK enregistre en interne. Assurez-vous également de spécifier les <code>authenticationProperties</code> correspondantes, que vous pouvez développer en utilisant <code>LoginAuthenticationPropertiesBuilder</code>.</p><p>Après avoir appelé avec succès <code>HttpContext.ChallengeAsync()</code>, l’utilisateur sera redirigé vers Auth0 et connecté à la fois au logiciel médiateur OIDC et au logiciel médiateur de témoins après avoir été redirigé vers votre application. Cela permettra aux utilisateurs d’être authentifiés lors des requêtes suivantes.</p><p><div class="checkpoint">ASP.NET MWC – Étape 3 – Point de contrôle <div class="checkpoint-default"><p>Maintenant que vous avez configuré la fonction de connexion, lancez votre application pour vérifier que :</p><ul><li><p>naviguer vers votre action <code>Login</code> vous redirigera vers Auth0,</p></li><li><p>saisir vos identifiants vous redirigera vers votre application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>make sure the domain and client ID are configured correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Afficher le profil utilisateur


<p>Une fois que le logiciel médiateur a réussi à récupérer les jetons auprès d’Auth0, il extrait les informations et les demandes de l’utilisateur du jeton d’identification et les met à disposition en tant que propriété <code>User.Claims</code> sur le contrôleur.</p><p>Vous pouvez créer une page de profil utilisateur personnalisée pour afficher le nom, l’adresse électronique et l’image de profil d’un utilisateur, en récupérant les informations correspondantes de <code>User</code> et en les visualisant à partir de votre contrôleur.</p><p><div class="checkpoint">ASP.NET MWC – Étape 4 – Point de contrôle <div class="checkpoint-default"><p>Maintenant que vous avez configuré votre action pour afficher le profil de l’utilisateur, lancez votre application pour vérifier que :</p><ul><li><p>le profil de l’utilisateur s&#39;affiche après avoir navigué vers votre action <code>Profile</code> après vous être connecté avec succès.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>make sure the domain and client ID are configured correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Déconnexion


<p>Déconnecter l’utilisateur de votre propre application peut se faire en appelant <code>HttpContext.SignOutAsync</code> avec le schéma d’authentification <code>CookieAuthenticationDefaults.AuthenticationScheme</code> à partir de l’action de votre contrôleur.</p><p>En outre, si vous souhaitez également déconnecter l’utilisateur d’Auth0 (cette action peut également le déconnecter d’autres applications qui utilisent l’authentification unique), appelez <code>HttpContext.SignOutAsync</code> avec le schéma d’authentification <code>Auth0Constants.AuthenticationScheme</code> ainsi que les <code>authenticationProperties</code> appropriées qui peuvent être développées en utilisant <code>LogoutAuthenticationPropertiesBuilder</code>.</p><p></p><p><div class="checkpoint">ASP.NET MWC – Étape 5 – Point de contrôle <div class="checkpoint-default"><p>Maintenant que vous avez configuré la fonction de déconnexion, executez votre application pour vérifier que :</p><ul><li><p>Naviguer vers votre action <code>Logout</code> garantit que l’utilisateur est déconnecté.</p></li><li><p>Lorsque vous vous déconnectez également d’Auth0, vous devriez être redirigé vers Auth0, puis immédiatement renvoyé vers votre propre application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>make sure the domain and client ID are configured correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
