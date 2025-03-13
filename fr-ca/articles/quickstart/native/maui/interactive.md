---
title: Ajouter une connexion à votre application MAUI
description: Ce tutoriel explique comment ajouter une connexion utilisateur avec Auth0 à une application .NET MAUI.
interactive:  true
files:
 - files/MainPage.xaml
github:
  path: https://github.com/auth0-samples/auth0-maui-samples/tree/master/Sample
locale: fr-CA
---

# Ajouter une connexion à votre application MAUI


<p>Auth0 vous permet d’ajouter rapidement l’authentification à presque tous les types d’application. Ce guide explique comment intégrer Auth0, ajouter l’authentification et afficher les informations de profil utilisateur dans n’importe quelle application .NET MAUI à l’aide des SDK Auth0 de <a href="https://www.nuget.org/packages/Auth0.OidcClient.MAUI/">MAUI</a>.</p><p><div class="alert-container" severity="default"><p>La trousse SDK MAUI prend en charge Android, iOS, macOS et Windows. Poursuivez la lecture pour en savoir plus sur la configuration propre à chaque plateforme.</p></div></p><p></p>

## Configurer Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer le fonctionnement de l’authentification pour le projet que vous développez.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application existante qui représente le projet avec lequel vous souhaitez effectuer l’intégration. Dans Auth0, il est attribué à chaque application un identifiant client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce guide rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/#/">Dashboard</a>, qui est l’endroit où vous pourrez gérer vos applications à l’avenir.</p><p>Si vous préférez explorer une configuration complète, vous pouvez plutôt consulter une application faisant office d’exemple.</p><h3>Configuration des callback URL</h3><p>Une callback URL est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur authentification. Si elle n’est pas définie, les utilisateurs ne seront pas redirigés vers votre application après s’être connectés.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple, définissez cette URL comme suit : <code>myapp://callback</code>.</p></div></p><h3>Configurer les URL de déconnexion</h3><p>Une URL de déconnexion est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après qu’ils se sont déconnectés. Si elle n’est pas définie, les utilisateurs ne pourront pas se déconnecter de votre application et recevront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple, définissez cette URL comme suit : <code>myapp://callback</code>.</p></div></p>

## Installer la trousse SDK Auth0


<p>Auth0 propose une trousse SDK <a href="https://www.nuget.org/packages/Auth0.OidcClient.MAUI/">MAUI</a> pour simplifier le processus d’implémentation de l’authentification Auth0 dans les applications MAUI.</p><p>Utilisez le Gestionnaire de packages NuGet (Tools [Outils] -&gt; Library Package Manager [Gestionnaire de packages de bibliothèque] -&gt; Package Manager Console [Console du gestionnaire de package]) pour installer le package <code>Auth0.OidcClient.MAUI</code>.</p><p>Sinon, vous pouvez utiliser la Console du gestionnaire de packages NuGet (<code>Install-Package</code>) ou le <code>dotnet</code> CLI (<code>dotnet add</code>).</p><p><pre><code>Install-Package Auth0.OidcClient.MAUI

</code></pre>

</p><p><pre><code>dotnet add package Auth0.OidcClient.MAUI

</code></pre>

</p>

## Configuration particulière de la plateforme


<p>Une configuration particulière à la plateforme est nécessaire pour utiliser la trousse SDK avec Android et Windows.</p><h3>Android</h3><p>Créer une nouvelle activité qui étend  <code>WebAuthenticatorCallbackActivity</code>:</p><p><pre><code class="language-csharp">[Activity(NoHistory = true, LaunchMode = LaunchMode.SingleTop, Exported = true)]

[IntentFilter(new[] { Intent.ActionView },

              Categories = new[] { Intent.CategoryDefault, Intent.CategoryBrowsable },

              DataScheme = CALLBACK_SCHEME)]

public class WebAuthenticatorActivity : Microsoft.Maui.Authentication.WebAuthenticatorCallbackActivity

{

    const string CALLBACK_SCHEME = &quot;myapp&quot;;

}

</code></pre>

</p><p>L’activité ci-dessus garantira que l’application peut gérer l’URL <code>myapp://callback</code> lorsque Auth0 redirige de nouveau vers l’application Android après la connexion.</p><h3>Windows</h3><p>Pour garantir la réactivation correcte de votre application après la redirection vers Auth0, vous devez faire deux choses :</p><ul><li><p>Ajouter le protocole correspondant au <code>Package.appxmanifest</code>. Dans ce cas, il est défini sur <code>myapp</code>, mais vous pouvez le changer à votre guise (veillez également à mettre à jour toutes les URL Auth0 correspondantes).</p></li></ul><p><pre><code class="language-xml">&lt;Applications&gt;

  &lt;Application Id=&quot;App&quot; Executable=&quot;$targetnametoken$.exe&quot; EntryPoint=&quot;$targetentrypoint$&quot;&gt;

    &lt;Extensions&gt;

      &lt;uap:Extension Category=&quot;windows.protocol&quot;&gt;

        &lt;uap:Protocol Name=&quot;myapp&quot;/&gt;

      &lt;/uap:Extension&gt;

    &lt;/Extensions&gt;

  &lt;/Application&gt;

&lt;/Applications&gt;

</code></pre>

</p><ul><li><p>Appeler <code>Activator.Default.CheckRedirectionActivation()</code> dans le fichier propre à Windows <code>App.xaml.cs</code>.</p></li></ul><p><pre><code class="language-csharp">public App()

{

  if (Auth0.OidcClient.Platforms.Windows.Activator.Default.CheckRedirectionActivation())

    return;



  this.InitializeComponent();

}

</code></pre>

</p>

## Instancier Auth0Client. {{{ data-action="code" data-code="MainPage.xaml.cs#3:10" }}}


<p>Pour intégrer Auth0 dans votre application, instanciez une instance de la classe <code>Auth0Client</code> en passant une instance de <code>Auth0ClientOptions</code> qui contient votre domaine Auth0, votre ID client et les permissions requises. De plus, vous devez également configurer <code>RedirectUri</code> et <code>PostLogoutRedirectUri</code> pour garantir qu’Auth0 peut rediriger vers l’application en utilisant les URL configurées.</p><p><pre><code class="language-csharp">using Auth0.OidcClient;



var client = new Auth0Client(new Auth0ClientOptions

{

    Domain = &quot;${account.namespace}&quot;,

    ClientId = &quot;${account.clientId}&quot;,

    RedirectUri = &quot;myapp://callback&quot;,

    PostLogoutRedirectUri = &quot;myapp://callback&quot;,

    Scope = &quot;openid profile email&quot;

});

</code></pre>

</p><p>Par défaut, la trousse SDK utilisera les onglets personnalisés Chrome pour Android, ASWebAuthenticationSession pour iOS et macOS, et utilisera le navigateur par défaut de votre système sur Windows.</p><p><div class="checkpoint">Démarrage rapide MAUI – Étape 4 – Point de contrôle <div class="checkpoint-default"><p>Votre <code>Auth0Client</code> devrait maintenant être correctement instancié. Éxecutez votre application pour vérifier que :</p><ul><li><p>L’ <code>Auth0Client </code>est correctement instancié dans la <code>MainPage</code>.</p></li><li><p>Votre application ne génère aucune erreur liée à Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple things to double-check:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>make sure the domain and client ID are imported correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Ajouter une fonctionnalité de connexion à votre application {{{ data-action="code" data-code="MainPage.xaml.cs#25:25" }}}


<p>À présent que vous avez configuré votre application Auth0 et la trousse SDK Auth0, vous devez configurer la connexion pour votre projet. Pour ce faire, vous utiliserez la méthode <code>LoginAsync()</code> de la trousse SDK pour créer un bouton de connexion qui redirige les utilisateurs vers la page de connexion universelle Auth0.</p><p><pre><code class="language-csharp">var loginResult = await client.LoginAsync();

</code></pre>

</p><p>S’il n’y a pas d’erreur, vous pouvez accéder à <code>User</code>, <code>IdentityToken</code>, <code>AccessToken</code> et <code>RefreshToken</code> dans le <code>LoginResult</code> renvoyé par <code>LoginAsync()</code>.</p><p><div class="checkpoint">Démarrage rapide MAUI – Étape 5 – Point de contrôle <div class="checkpoint-default"><p>Vous devez désormais pouvoir vous connecter ou vous inscrire en utilisant un nom d’utilisateur et un mot de passe.</p><p>Appuyez sur le bouton de connexion et vérifiez que :</p><ul><li><p>Votre application vous redirige vers la page de connexion universelle d’Auth0.</p></li><li><p>Vous pouvez vous connecter ou vous inscrire.</p></li><li><p>Auth0 vous redirige vers votre application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s something to double-check:</p><ul><li><p>you called <code>LoginAsync</code> as expected</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Ajouter une fonctionnalité de déconnexion à votre application {{{ data-action="code" data-code="MainPage.xaml.cs#32:32" }}}


<p>Les utilisateurs qui se connectent à votre projet auront également besoin d’un moyen de se déconnecter. Créez un bouton de déconnexion en utilisant la méthode <code>LogoutAsync()</code> de la trousse SDK. Lorsque les utilisateurs se déconnectent, ils seront redirigés vers votre point de terminaison de déconnexion Auth0, qui par la suite les redirigera immédiatement vers l’URL de déconnexion que vous avez configurée précédemment dans ce démarrage rapide.</p><p><pre><code class="language-csharp">await client.LogoutAsync();

</code></pre>

</p><p><div class="checkpoint">Démarrage rapide MAUI – Étape 6 – Point de contrôle <div class="checkpoint-default"><p>Executez votre application et cliquez sur le bouton de déconnexion, vérifiez que :</p><ul><li><p>Votre application vous redirige vers l’adresse que vous avez précisée comme l’une des URL de déconnexion autorisées dans les paramètres de votre application.</p></li><li><p>Vous n’êtes plus connecté à votre application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple things to double-check:</p><ul><li><p>you configured the correct Logout URL</p></li><li><p>you called <code>LogoutAsync</code> as expected.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Afficher les informations du profil utilisateur {{{ data-action="code" data-code="MainPage.xaml.cs#55:58" }}}


<p>Maintenant que vos utilisateurs peuvent se connecter et se déconnecter, vous voulez probablement pouvoir récupérer et utiliser les <a href="https://auth0.com/docs/users/concepts/overview-user-profile">informations de profil</a> associées aux utilisateurs authentifiés. Par exemple, vous voudrez peut-être pouvoir afficher le nom ou la photo de profil d’un utilisateur connecté dans votre projet.</p><p>La trousse SDK Auth0 de MAUI fournit des informations sur l’utilisateur par l’intermédiaire de la propriété <code>LoginResult.User</code> .</p>
