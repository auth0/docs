---
title: Ajouter une connexion à votre application WPF ou WinForms
description: Ce tutoriel explique comment ajouter la connexion utilisateur avec Auth0 à une application WPF et WinForms.
interactive:  true
files:
 - files/MainWindow.xaml
github:
  path: https://github.com/auth0-samples/auth0-WinFormsWPF-oidc-samples/tree/master/Quickstart/00-Starter-Seed
locale: fr-CA
---

# Ajouter une connexion à votre application WPF ou WinForms


<p>Auth0 vous permet d’ajouter rapidement l’authentification à presque tous les types d’application. Ce guide explique comment intégrer Auth0, ajouter l’authentification et afficher les informations de profil utilisateur dans n’importe quelle application WPF et WinForms à l’aide des SDK Auth0 de <a href="https://www.nuget.org/packages/Auth0.OidcClient.WPF/">WPF</a> et <a href="https://www.nuget.org/packages/Auth0.OidcClient.WinForms">WinForms</a>.</p><p>Pour utiliser ce guide rapide, vous devez:</p><ul><li><p>Vous inscrire pour avoir un compte Auth0 gratuit ou vous connecter à Auth0.</p></li><li><p>Disposer d’un projet WPF ou WinForms fonctionnel avec lequel vous souhaitez vous intégrer. Vous pouvez également consulter ou télécharger une application faisant office d’exemple lorsque vous vous connectez.</p></li></ul><p></p><p></p>

## Configurer Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer le fonctionnement de l’authentification pour le projet que vous développez.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application existante qui représente le projet avec lequel vous souhaitez effectuer l’intégration. Dans Auth0, il est attribué à chaque application un identifiant client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce guide rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/#/">Dashboard</a>, qui est l’endroit où vous pourrez gérer vos applications à l’avenir.</p><p>Si vous préférez explorer une configuration complète, vous pouvez plutôt consulter une application faisant office d’exemple.</p><h3>Configuration des callback URL</h3><p>Une callback URL est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur authentification. Si elle n’est pas définie, les utilisateurs ne seront pas redirigés vers votre application après s’être connectés.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, définissez cette URL comme suit : <code>http://{yourDomain}:4200/mobile</code>.</p></div></p><h3>Configurer les URL de déconnexion</h3><p>Une URL de déconnexion est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après qu’ils se sont déconnectés. Si elle n’est pas définie, les utilisateurs ne pourront pas se déconnecter de votre application et recevront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, définissez cette URL comme suit : <code>http://{yourDomain}:4200/mobile</code>.</p></div></p>

## Installer la trousse SDK Auth0


<p>Auth0 propose une trousse SDK <a href="https://www.nuget.org/packages/Auth0.OidcClient.WPF/">WPF</a> et <a href="https://www.nuget.org/packages/Auth0.OidcClient.WinForms">WinForms</a> pour simplifier le processus d’implémentation de l’authentification Auth0 dans les applications WPF et WinForms.</p><p>Utilisez le gestionnaire de packages NuGet (Outils -&gt; Gestionnaire de packages de bibliothèque -&gt; Console du gestionnaire de packages) pour installer le package <code>Auth0.OidcClient.WPF</code> ou <code>Auth0.OidcClient.WinForms</code> en fonction de si vous générez une application WPF ou Windows Forms.</p><p>Sinon, vous pouvez utiliser la Package Manager Console (Console du gestionnaire de packages) NuGet (<code>Install-Package</code>) ou l’interface de ligne de commande <code>dotnet</code> (<code>dotnet add</code>).</p><p><pre><code>Install-Package Auth0.OidcClient.WPF

Install-Package Auth0.OidcClient.WinForms

</code></pre>

</p><p><pre><code>dotnet add Auth0.OidcClient.WPF

dotnet add Auth0.OidcClient.WinForms

</code></pre>

</p>

## Instancier Auth0Client. {{{ data-action="code" data-code="MainWindow.xaml.cs#13:22" }}}


<p>Pour intégrer Auth0 dans votre application, instanciez une instance de la classe Auth0Client en passant une instance de Auth0ClientOptions qui contient votre domaine Auth0 et votre ID client.</p><p>Par défaut, la trousse SDK exploitera <a href="https://learn.microsoft.com/en-us/microsoft-edge/webview2/">WebView2</a> pour .NET6 et les versions ultérieures, tout en s’appuyant sur l’ancien WebView pour les applications utilisant une version antérieure à .NET6.</p><p><div class="checkpoint">Démarrage rapide WPF/WinForms – Étape 3 – Point de contrôle <div class="checkpoint-default"><p>Votre <code>Auth0Client</code> devrait maintenant être correctement instancié. Exécutez votre application pour vérifier que :</p><ul><li><p>L’ <code>Auth0Client </code>est correctement instancié.</p></li><li><p>Votre application ne génère aucune erreur liée à Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple things to double-check:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>make sure the domain and client ID are imported correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Ajouter une fonctionnalité de connexion à votre application {{{ data-action="code" data-code="MainWindow.xaml.cs#24:35" }}}


<p>À présent que vous avez configuré votre application Auth0 et la trousse SDK Auth0, vous devez configurer la connexion pour votre projet. Pour ce faire, vous utiliserez la méthode <code>LoginAsync()</code> de la trousse SDK pour créer un bouton de connexion qui redirige les utilisateurs vers la page de connexion universelle Auth0. Une fois un utilisateur authentifié avec succès, il est redirigé vers la callback URL que vous avez configurée précédemment dans ce démarrage rapide.</p><p>S’il n’y a pas d’erreur, vous pouvez accéder à <code>User</code>, <code>IdentityToken</code>, <code>AccessToken</code> et <code>RefreshToken</code> dans le <code>LoginResult</code> renvoyé par <code>LoginAsync()</code>.</p><p><div class="checkpoint">Démarrage rapide WPF/WinForms – Étape 4 – Point de contrôle <div class="checkpoint-default"><p>Vous devez désormais pouvoir vous connecter ou vous inscrire en utilisant un nom d’utilisateur et un mot de passe.</p><p>Appuyez sur le bouton de connexion et vérifiez que :</p><ul><li><p>Votre application WPF ou WinForms vous redirige vers la page de connexion universelle d’Auth0.</p></li><li><p>Vous pouvez vous connecter ou vous inscrire.</p></li><li><p>Auth0 vous redirige vers votre application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s something to double-check:</p><ul><li><p>you called <code>LoginAsync</code> as expected</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Ajouter une fonctionnalité de déconnexion à votre application {{{ data-action="code" data-code="MainWindow.xaml.cs#37:40" }}}


<p>Les utilisateurs qui se connectent à votre projet auront également besoin d’un moyen de se déconnecter. Créez un bouton de déconnexion en utilisant la méthode <code>LogoutAsync()</code> de la trousse SDK. Lorsque les utilisateurs se déconnectent, ils seront redirigés vers votre point de terminaison de déconnexion Auth0, qui par la suite les redirigera immédiatement vers l’URL de déconnexion que vous avez configurée précédemment dans ce démarrage rapide.</p><p><div class="checkpoint">Démarrage rapide WPF/WinForms – Étape 5 – Point de contrôle <div class="checkpoint-default"><p>Éxecutez votre application et cliquez sur le bouton de déconnexion, vérifiez que :</p><ul><li><p>Votre application WPF ou WinForms vous redirige vers l’adresse que vous avez indiquée comme l’une des URL de déconnexion autorisées dans les paramètres de votre application.</p></li><li><p>Vous n’êtes plus connecté à votre application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple things to double-check:</p><ul><li><p>you configured the correct Logout URL</p></li><li><p>you called <code>LogoutAsync</code> as expected.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Afficher les informations du profil utilisateur {{{ data-action="code" data-code="MainWindow.xaml.cs#30:33" }}}


<p>Vu que vos utilisateurs peuvent désormais se connecter et se déconnecter, vous voudrez probablement pouvoir récupérer les <a data-contentfulid="2ClGWANGeRoTkg5Ax2gOVK-fr-CA">profile information [informations de profil]</a> associées aux utilisateurs authentifiés. Par exemple, vous voudrez peut-être afficher le nom ou la photo de profil d’un utilisateur connecté dans votre projet.</p><p>La trousse SDK Auth0 de WPF et WinForms fournit des informations sur l’utilisateur par l’intermédiaire de la propriété <code>LoginResult.User</code>.</p><p><div class="checkpoint">Démarrage rapide WPF/WinForms – Étape 6 – Point de contrôle <div class="checkpoint-default"><p>Vérifiez que vous pouvez afficher le nom de l’utilisateur ou une autre propriété de l’utilisateur après vous être connecté.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple things to double-check:</p><ul><li><p>the <code>LoginResult.IsError</code> is false</p></li><li><p>if the <code>LoginResult.IsError</code> isn&#39;t false, be sure to check <code>LoginResult.Error</code> for details.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
