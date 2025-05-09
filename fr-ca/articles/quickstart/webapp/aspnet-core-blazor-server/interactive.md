---
title: Ajouter une fonctionnalité de connexion à votre application Blazor Server
description: Ce guide explique comment intégrer Auth0 à n’importe quelle application Blazor Server, nouvelle ou existante, à l’aide de la trousse SDK Auth0.AspNetCore.Authentication.
interactive:  true
files:
 - files/Login.cshtml
 - files/Logout.cshtml
 - files/Profile
 - files/Program
github:
  path: Quickstart/Sample
locale: fr-CA
---

# Ajouter une fonctionnalité de connexion à votre application Blazor Server


<p>Auth0 vous permet d’ajouter rapidement l’authentification et de pouvoir accéder aux informations relatives au profil utilisateur dans votre application. Ce guide explique comment intégrer Auth0 à n’importe quelle application Blazor Server, nouvelle ou existante, à l’aide de la trousse SDK <b>Auth0.AspNetCore.Authentication</b>.</p><p></p>

## Configuration d’Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer le fonctionnement de l’authentification pour le projet que vous développez.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application existante qui représente le projet avec lequel vous souhaitez effectuer l’intégration. Dans Auth0, il est attribué à chaque application un identifiant client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce démarrage rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/dashboard/us/auth0-dsepaid/" target="_blank" rel="noreferrer noopener">Dashboard</a>, qui est l’endroit où vous pourrez gérer vos Applications à l’avenir.</p><p>Si vous préférez explorer une configuration complète, consultez plutôt un exemple d’application.</p><h3>Configuration des URL de rappel</h3><p>Une URL de rappel est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur authentification. Si elle n’est pas définie, les utilisateurs ne seront pas redirigés vers votre application après s’être connectés.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, définissez cette URL comme suit : <code>http://localhost:3000</code><code>/callback</code>.</p></div></p><h3>Configuration des URL de déconnexion</h3><p>Une URL de déconnexion est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur déconnexion. Si elle n’est pas définie, les utilisateurs ne pourront pas se déconnecter de votre application et recevront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, définissez cette URL comme suit : <code>http://localhost:3000</code>.</p></div></p>

## Installer et configurer la trousse SDK {{{ data-action="code" data-code="Program.cs" }}}


<h3>Installer à partir de Nuget</h3><p>Pour intégrer Auth0 à Blazor Server vous pouvez utiliser notre trousse SDK en installant le <a href="https://www.nuget.org/packages/Auth0.AspNetCore.Authentication/" target="_blank" rel="noreferrer noopener">package Nuget</a><code>Auth0.AspNetCore.Authentication</code>dans votre application.</p><p></p><h3>Configurer le logiciel médiateur</h3><p>Pour activer l’authentification dans votre application Blazor Server, utilisez le logiciel médiateur fourni par la trousse SDK. Allez dans le fichier <code>Program.cs</code> et appelez <code>builder.Services.AddAuth0WebAppAuthentication()</code> pour enregistrer le logiciel médiateur de la trousse SDK.</p><p>Assurez-vous de configurer <code>Domain</code> et <code>ClientId</code>, car ce sont des champs requis pour garantir que la trousse SDK sache quel locataire Auth0 et quelle application utiliser.</p><p>Assurez-vous d’avoir activé l’authentification et l’autorisation dans votre fichier <code>Program.cs</code>.</p>

## Connexion {{{ data-action="code" data-code="Login.cshtml.cs" }}}


<p>Pour permettre aux utilisateurs de se connecter à votre application Blazor Server, ajoutez un <code>LoginModel</code> à votre répertoire <code>Pages</code>.</p><p>Dans le cadre de la méthode <code>OnGet</code> de <code>LoginModel</code>, appelez <code>HTTPContext.ChallengeAsync()</code> et passez <code>Auth0Constants.AuthenticationScheme</code> comme schéma d’authentification. Cela fera appel au gestionnaire d’authentification OIDC que notre trousse SDK enregistre en interne. Assurez-vous également d’indiquer les <code>authenticationProperties</code> correspondantes, que vous pouvez construire en utilisant <code>LoginAuthenticationPropertiesBuilder</code>.</p><p>Après avoir appelé avec succès <code>HttpContext.ChallengeAsync()</code>, l’utilisateur est redirigé vers Auth0 et est connecté à la fois au logiciel médiateur OIDC et au logiciel médiateur de témoin après avoir été redirigé vers votre application. Cela permettra aux utilisateurs d’être authentifiés lors des requêtes suivantes.</p><p><div class="checkpoint">ASP.NET Core Blazor Server - Étape 3 - Point de contrôle <div class="checkpoint-default"><p>Maintenant que vous avez configuré la fonction de connexion, lancez votre application pour vérifier que :</p><ul><li><p>naviguer vers votre page <code>Login</code> vous redirigera vers Auth0,</p></li><li><p>saisir vos identifiants vous redirigera vers votre application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>assurez-vous que la bonne application est sélectionnée</p></li><li><p>avez-vous procédé à un enregistrement après avoir saisi vos URL?</p></li><li><p>assurez-vous que le domaine et l’identifiant client sont correctement configurés</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>

## Afficher le profil utilisateur {{{ data-action="code" data-code="Profile.razor" }}}


<p>Une fois que le logiciel médiateur a réussi à récupérer les jetons auprès d’Auth0, il extrait les informations et les demandes de l’utilisateur du jeton d’ID et les met à disposition via <code>AuthenticationState</code>, que vous pouvez ajouter en tant que <code>CascadingParameter</code>.</p><p>Vous pouvez créer une page de profil utilisateur personnalisée pour afficher le nom de l’utilisateur, ainsi que des demandes supplémentaires (comme le courriel et la photo), en récupérant les informations correspondantes à partir de la propriété <code>User</code> de <code>AuthenticationState</code> et en les visualisant à partir du code Blazor.</p><p><div class="checkpoint">ASP.NET Core Blazor Server - Étape 4 - Point de contrôle <div class="checkpoint-default"><p>Maintenant que vous avez effectué la configuration pour afficher le profil utilisateur, lancez votre application pour vérifier que :</p><ul><li><p>la navigation vers le point de terminaison contenant le profil après une connexion réussie permet d’afficher le profil utilisateur.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>assurez-vous que la bonne application est sélectionnée</p></li><li><p>avez-vous procédé à un enregistrement après avoir saisi vos URL?</p></li><li><p>assurez-vous que le domaine et l’identifiant client sont correctement configurés</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>

## Déconnexion {{{ data-action="code" data-code="Logout.cshtml.cs" }}}


<p>Déconnecter l’utilisateur de votre propre application peut se faire en appelant <code>HttpContext.SignOutAsync</code> avec le schéma d’authentification <code>CookieAuthenticationDefaults.AuthenticationScheme</code> à partir de la méthode <code>OnGet</code>de <code>LogoutModel</code>.</p><p>En outre, si vous souhaitez également déconnecter l’utilisateur d’Auth0 (cette action peut également le déconnecter d’autres applications qui utilisent l’authentification unique), appelez <code>HttpContext.SignOutAsync</code> avec le schéma d’authentification <code>Auth0Constants.AuthenticationScheme</code> ainsi que l’<code>authenticationProperties</code> approprié qui peut être construit en utilisant <code>LogoutAuthenticationPropertiesBuilder</code>.</p><p></p><p><div class="checkpoint">ASP.NET Core Blazor Server – Étape 5 – Point de contrôle <div class="checkpoint-default"><p>Maintenant que vous avez configuré la fonction de déconnexion, exécutez votre application pour vérifier que :</p><ul><li><p>Naviguer vers votre page <code>Logout</code> garantira que l’utilisateur est déconnecté.</p></li><li><p>Lorsque vous vous déconnectez également d’Auth0, vous devriez être redirigé vers Auth0, puis immédiatement renvoyé vers votre propre application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>assurez-vous que la bonne application est sélectionnée</p></li><li><p>avez-vous procédé à un enregistrement après avoir saisi vos URL?</p></li><li><p>assurez-vous que le domaine et l’identifiant client sont correctement configurés</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>
