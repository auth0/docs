---
title: Ajouter une connexion à votre application .NET Android ou iOS
description: Ce tutoriel explique comment ajouter une connexion utilisateur avec Auth0 à une application .NET Android ou iOS
interactive:  true
files:
 - files/MainActivity
 - files/AppDelegate
 - files/MyViewController
github:
  path: Quickstart/01-Login
locale: fr-CA
---

# Ajouter une connexion à votre application .NET Android ou iOS


<p>Auth0 vous permet d’ajouter rapidement l’authentification à presque tous les types d’application. Ce guide explique comment intégrer Auth0, ajouter l’authentification et afficher les informations de profil utilisateur dans n’importe quelle application .NET Android et iOS à l’aide des SDK Auth0 pour <a href="https://www.nuget.org/packages/Auth0.OidcClient.AndroidX/" target="_blank" rel="noreferrer noopener">Android</a> et <a href="https://www.nuget.org/packages/Auth0.OidcClient.iOS" target="_blank" rel="noreferrer noopener">iOS</a>.</p><p><div class="alert-container" severity="default"><p>Ce guide de démarrage couvre .NET Android et iOS, les futures générations de <code>Xamarin.Android</code> et de <code>Xamarin.iOS</code>. Si vous utilisez encore <code>Xamarin.Android</code> et <code>Xamarin.iOS</code>, vous pouvez suivre ce guide, car l’intégration est identique et les SDK sont compatibles.</p></div></p><p>Pour utiliser ce guide rapide, vous devez :</p><ul><li><p>Vous inscrire à un compte Auth0 gratuit ou vous connecter à Auth0.</p></li><li><p>Avoir un projet Android ou iOS fonctionnel utilisant .NET 6 (ou une version ultérieure) avec lequel vous souhaitez vous intégrer. Vous pouvez également consulter ou télécharger une application faisant office d’exemple lorsque vous vous connectez.</p></li></ul><p></p><p></p>

## Configuration d’Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer le fonctionnement de l’authentification pour votre projet.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application « Application native », ou sélectionnez une application existante qui représente le projet avec lequel vous souhaitez vous intégrer. Dans Auth0, il est attribué à chaque application un identifiant client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce démarrage rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, qui est l’endroit où vous pourrez gérer vos applications à l’avenir.</p><p>Si vous préférez explorer une configuration complète, consultez plutôt un exemple d’application.</p><h3>Configuration des URL de rappel</h3><p>Une URL de rappel est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur authentification. Si elle n’est pas définie, les utilisateurs ne seront pas redirigés vers votre application après s’être connectés.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, définissez l’une des URL suivantes selon votre plateforme :</p><ul><li><p><b>Android</b> : <code>YOUR_PACKAGE_NAME://{yourDomain}/android/YOUR_PACKAGE_NAME/callback</code></p></li><li><p><b>iOS</b> : <code>YOUR_BUNDLE_ID://{yourDomain}/ios/YOUR_BUNDLE_ID/callback</code></p></li></ul><p></p></div></p><h3>Configuration des URL de déconnexion</h3><p>Une URL de déconnexion est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur déconnexion. Si elle n’est pas définie, les utilisateurs ne pourront pas se déconnecter de votre application et recevront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, définissez l’une des URL suivantes selon votre plateforme :</p><ul><li><p><b>Android</b> : <code>YOUR_PACKAGE_NAME://{yourDomain}/android/YOUR_PACKAGE_NAME/callback</code></p></li><li><p><b>iOS</b> : <code>YOUR_BUNDLE_ID://{yourDomain}/ios/YOUR_BUNDLE_ID/callback</code></p></li></ul><p></p></div></p><p>Enfin, assurez-vous que le <b>type d’application</b> pour votre application est défini sur <b>Native</b> dans les <a href="https://manage.auth0.com/#/applications/" target="_blank" rel="noreferrer noopener">Application Settings (Paramètres d’application)</a>.</p>

## Installer la trousse SDK Auth0


<p>Auth0 propose une trousse SDK <a href="https://www.nuget.org/packages/Auth0.OidcClient.AndroidX/" target="_blank" rel="noreferrer noopener">Android</a> et <a href="https://www.nuget.org/packages/Auth0.OidcClient.iOS" target="_blank" rel="noreferrer noopener">iOS</a> pour simplifier le processus d’implémentation de l’authentification Auth0 dans les applications .NET Android et iOS.</p><p>Utilisez le gestionnaire de packages NuGet (Tools (Outils) -&gt; Library Package Manager (Gestionnaire de packages de bibliothèque) -&gt; Package Manager Console (Console du gestionnaire de packages)) pour installer le package <code>Auth0.OidcClient.AndroidX</code> ou <code>Auth0.OidcClient.iOS</code>, pour développer une application Android ou iOS.</p><p>Sinon, vous pouvez utiliser la Console du gestionnaire de packages NuGet (<code>Install-Package</code>) ou le <code>dotnet</code> CLI (<code>dotnet add</code>).</p><p><pre><code>Install-Package Auth0.OidcClient.AndroidX

Install-Package Auth0.OidcClient.iOS

</code></pre>

</p><p><pre><code>dotnet add Auth0.OidcClient.AndroidX

dotnet add Auth0.OidcClient.iOS

</code></pre>

</p>

## Instancier Auth0Client


<p>Pour intégrer Auth0 dans votre application, instanciez une instance de la classe <code>Auth0Client</code> en passant une instance de <code>Auth0ClientOptions</code> qui contient votre domaine Auth0 et votre identificateur client.</p><p><pre><code class="language-csharp">using Auth0.OidcClient;



var client = new Auth0Client(new Auth0ClientOptions {

  Domain = &quot;${account.namespace}&quot;,

  ClientId = &quot;${account.clientId}&quot;

}, this);

</code></pre>

</p><p>Par défaut, la trousse SDK utilisera les onglets personnalisés Chrome pour Android et ASWebAuthenticationSession pour iOS.</p><p><div class="checkpoint">Démarrage rapide .NET Android/iOS - Étape 3 - Point de contrôle <div class="checkpoint-default"><p>Votre <code>Auth0Client</code> devrait maintenant être correctement instancié. Exécutez votre application pour vérifier que :</p><ul><li><p>l’<code>Auth0Client </code>est instancié correctement dans <code>Activity </code>(Android) ou <code>UIViewController </code>(iOS) ;</p></li><li><p>votre application ne génère aucune erreur liée à Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>assurez-vous que la bonne application est sélectionnée</p></li><li><p>avez-vous procédé à un enregistrement après avoir saisi vos URL?</p></li><li><p>assurez-vous que le domaine et l’identifiant client sont importés correctement</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>

## Configurer Android {{{ data-action="code" data-code="MainActivity.cs#2:9" }}}


<p>Une fois un utilisateur authentifié avec succès, il est redirigé vers l’URL de rappel que vous avez configurée précédemment dans ce guide rapide.</p><p>Pour gérer la fonction Callback sur les appareils Android, vous devez enregistrer une intention qui gère cette URL de rappel. Une façon simple de le faire est d’enregistrer l’intention sur la même activité à partir de laquelle vous avez appelé la méthode LoginAsync pour instancier le flux d’authentification.</p><p>Assurez-vous de remplacer <code>YOUR_ANDROID_PACKAGE_NAME</code> dans l’exemple de code par le nom réel du package de votre application, comme <code>com.mycompany.myapplication</code>, et de vous assurer que tout le texte des champs <code>DataScheme</code>, <code>DataHostet</code> et <code>DataPathPrefix</code> est en majuscules. De plus, définissez <code>LaunchMode = LaunchMode.SingleTask</code> pour l’activité; sinon, le système créera une nouvelle instance de l’activité chaque fois que l’URL de rappel est appelée.</p><p>De plus, vous devez gérer l’intention dans l’événement <code>OnNewIntent</code> dans votre classe <code>Activity</code>. Vous devez notifier le client OIDC Auth0 pour terminer le flux d’authentification en appelant la méthode <code>Send</code> du singleton <code>ActivityMediator</code>, en transmettant l’URL qui a été envoyée.</p><p><pre><code class="language-csharp">protected override void OnNewIntent(Intent intent)

    {

        base.OnNewIntent(intent);

        ActivityMediator.Instance.Send(intent.DataString);

    }

</code></pre>

</p>

## Configurer iOS {{{ data-action="code" data-code="AppDelegate.cs#6:11" }}}


<p>Une fois un utilisateur authentifié avec succès, il est redirigé vers l’URL de rappel que vous avez configurée précédemment dans ce guide rapide.</p><p>Pour gérer la callback sur les appareils iOS :</p><ol><li><p>Ouvrez le fichier <code>Info.plist</code> de votre application dans Visual Studio, puis accédez à l’onglet <b>Advanced (Avancé)</b>.</p></li><li><p>Sous <b>URL Types (Types d’URL)</b>, cliquez sur le bouton <b>Add URL Type (Ajouter le type d’URL)</b>.</p></li><li><p>Définissez <b>Identifier (Identificateur)</b> sur Auth0, les <b>URL Schemes (Schémas d’URL)</b> identiques à Bundle Identifier<b><code>Role (Rôle)</code></b></p></li></ol><p>Voici un exemple de la représentation XML de votre fichier <code>Info.plist</code> après avoir ajouté le type d’URL :</p><p><pre><code class="language-xml">&lt;key&gt;CFBundleURLTypes&lt;/key&gt;

&lt;array&gt;

 &lt;dict&gt;

 &lt;key&gt;CFBundleTypeRole&lt;/key&gt;

 &lt;string&gt;None&lt;/string&gt;

 &lt;key&gt;CFBundleURLName&lt;/key&gt;

 &lt;string&gt;Auth0&lt;/string&gt;

 &lt;key&gt;CFBundleURLSchemes&lt;/key&gt;

 &lt;array&gt;

 &lt;string&gt;YOUR_BUNDLE_IDENTIFIER&lt;/string&gt;

 &lt;/array&gt;

 &lt;/dict&gt;

&lt;/array&gt;

</code></pre>

</p><p>De plus, vous devez gérer l’URL de rappel dans l’événement <code>OpenUrl</code> dans votre classe <code>AppDelegate</code>. Vous devez notifier le client OIDC Auth0 pour terminer le flux d’authentification en appelant la méthode <code>Send</code> du singleton <code>ActivityMediator</code>, en transmettant l’URL qui a été envoyée.</p>

## Ajouter une fonctionnalité de connexion à votre application


<p>À présent que vous avez configuré votre application Auth0 et la trousse SDK Auth0, vous devez configurer la connexion pour votre projet. Pour ce faire, vous utiliserez la méthode <code>LoginAsync()</code> de la trousse SDK pour créer un bouton de connexion qui redirige les utilisateurs vers la page de connexion universelle Auth0.</p><p><pre><code class="language-csharp">var loginResult = await client.LoginAsync();

</code></pre>

</p><p>S’il n’y a pas d’erreur, vous pouvez accéder à <code>User</code>, <code>IdentityToken</code>, <code>AccessToken</code> et <code>RefreshToken</code> dans le <code>LoginResult</code> renvoyé par <code>LoginAsync()</code>.</p><p><div class="checkpoint">Démarrage rapide .NET Android/iOS – Étape 6 – Point de contrôle <div class="checkpoint-default"><p>Vous devez désormais pouvoir vous connecter ou vous inscrire en utilisant un nom d’utilisateur et un mot de passe.</p><p>Appuyez sur le bouton de connexion et vérifiez que :</p><ul><li><p>Votre application Android ou iOS vous redirige vers la page de connexion universelle Auth0.</p></li><li><p>Vous pouvez vous connecter ou vous inscrire.</p></li><li><p>Auth0 vous redirige vers votre application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>vous avez appelé <code>LoginAsync</code> comme prévu</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>

## Ajouter une fonctionnalité de déconnexion à votre application


<p>Les utilisateurs qui se connectent à votre projet auront également besoin d’un moyen de se déconnecter. Créez un bouton de déconnexion en utilisant la méthode <code>LogoutAsync()</code> de la trousse SDK. Lorsque les utilisateurs se déconnectent, ils seront redirigés vers votre point de terminaison de déconnexion Auth0, qui par la suite les redirigera immédiatement vers l’URL de déconnexion que vous avez configurée précédemment dans ce démarrage rapide.</p><p><pre><code class="language-csharp">await client.LogoutAsync();

</code></pre>

</p><p><div class="checkpoint">Guide rapide .NET Android/iOS - Étape 7 - Point de contrôle <div class="checkpoint-default"><p>Exécutez votre application et cliquez sur le bouton de déconnexion. Veuillez vérifiez que :</p><ul><li><p>Votre application Android ou iOS vous redirige vers l’adresse que vous avez spécifiée comme l’une des URL de déconnexion autorisées dans les paramètres de votre application.</p></li><li><p>Vous n’êtes plus connecté à votre application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>vous avez configuré la bonne URL de déconnexion</p></li><li><p>vous avez appelé <code>LogoutAsync</code> comme prévu</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>

## Afficher les informations du profil utilisateur


<p>Vu que vos utilisateurs peuvent désormais se connecter et se déconnecter, vous voudrez probablement pouvoir récupérer les <a data-contentfulid="2ClGWANGeRoTkg5Ax2gOVK-fr-CA">informations de profil</a> associées aux utilisateurs authentifiés. Par exemple, vous voudrez peut-être afficher le nom ou la photo de profil d’un utilisateur connecté dans votre projet.</p><p>La trousse SDK Auth0 pour Android et iOS fournit des informations sur l’utilisateur via la propriété <code>LoginResult.User</code>.</p><p><pre><code class="language-swift">if loginResult.IsError == false {

  var user = loginResult.User

  var name = user.FindFirst(c =&gt; c.Type == &quot;name&quot;)?.Value

  var email = user.FindFirst(c =&gt; c.Type == &quot;email&quot;)?.Value

  var picture = user.FindFirst(c =&gt; c.Type == &quot;picture&quot;)?.Value

}

</code></pre>

</p>
