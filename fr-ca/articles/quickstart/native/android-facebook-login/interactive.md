---
title: Android – Connexion Facebook
description: Ce tutoriel explique comment ajouter la connexion utilisateur à une application Android à l’aide de la fonction native Facebook Login (Connexion Facebook).
interactive:  true
files:
 - files/performLogin + SimpleCallback
 - files/onCreate
 - files/fetchSessionToken
 - files/fetchUserProfile
 - files/exchangeTokens
 - files/performLogin
github:
  path: https://github.com/auth0-samples/auth0-android-native-social-sample/tree/master/00-login-facebook
locale: fr-CA
---

# Android – Connexion Facebook


<p>Ce tutoriel explique comment ajouter la connexion utilisateur à une application Android à l’aide de la fonction native Facebook Login (Connexion Facebook). Nous vous recommandons de vous connecter pour suivre ce guide rapide avec les exemples configurés pour votre compte.</p><h2>Configuration requise</h2><ul><li><p>Android Studio 3.6.1</p></li><li><p>Trousse SDK Android 25</p></li><li><p>Émulateur - Nexus 5X - Android 6.0</p></li></ul><p>Ce tutoriel décrit comment mettre en œuvre la connexion avec la trousse <a href="https://developers.facebook.com/docs/">SDK Facebook</a>.​</p><h2>Avant de commencer</h2><ul><li><p>Installez et configurez la trousse <a href="https://developers.facebook.com/docs/facebook-login/">Facebook Login (Connexion à Facebook)</a>. Vous découvrirez également le processus de création d’une application Facebook sur <a href="https://developers.facebook.com/">https://developers.facebook.com</a>. <b>À la fin de cette étape, vous devriez avoir une application mobile fonctionnant avec la fonction intégrée Facebook Login (Connexion Facebook).</b></p></li></ul><p>Configurez votre application Auth0 dans Dashboard pour utiliser la fonction Facebook Login (Connexion Facebook) en mode natif. Voir <a href="https://auth0.com/docs/connections/nativesocial/facebook">Ajouter une connexion Facebook aux applications natives</a>. <b>À la fin de cette étape, votre application sera en mesure d’implémenter la fonction native Facebook Login (Connexion Facebook).</b></p><p></p>

## Demande d'autorisations Facebook


<p>Votre application est déjà capable de se connecter à Facebook. Cependant, pour garantir un profil utilisateur riche, vous devez mettre à jour les autorisations avec lesquelles le bouton de connexion Facebook a été configuré.</p><p>Définissez les autorisations demandées sur <code>public_profile</code> et <code>email</code>. De cette manière, l’adresse électronique de l’utilisateur sera également incluse dans la réponse, à condition que la demande d’accès soit acceptée par l’utilisateur.</p><p><code>loginButton.setPermissions(Arrays.asList(&quot;public_profile&quot;, &quot;email&quot;));</code></p>

## Créer la méthode performLogin {{{ data-action="code" data-code="performLogin + SimpleCallback" }}}


<p>Pour lancer le processus d’authentification avec Auth0, créez une nouvelle méthode dans laquelle vous préparerez la charge utile à envoyer.</p><p>Vous utiliserez une interface simple pour gérer nos callbacks internes.</p><p>Dans l’exemple, la méthode s’appelle <code>performLogin</code> et l’interface <code>SimpleCallback</code>. Ajoutez les deux.</p>

## Appeler la méthode performLogin {{{ data-action="code" data-code="onCreate" }}}


<p>Maintenant, appelez la méthode de la méthode <code>onSuccess</code> de callback de connexion à Facebook.</p>

## Intégrer Facebook


<p>Lorsque vous vous connectez à Facebook avec Auth0, l&#39;ordinateur dorsal effectue des vérifications en arrière-plan pour s’assurer que l’utilisateur est bien celui qu’il prétend être. Pour ce faire, il faut lui fournir un jeton d’accès à la session.</p><p>En outre, si un utilisateur doit être créé sur Auth0 pour représenter cet utilisateur Facebook, l&#39;ordinateur dorsal aura besoin de certaines de ses informations, comme le nom, le nom de famille et l’adresse électronique. L’adresse électronique, si elle est fournie, sera signalée comme non vérifiée dans le profil utilisateur Auth0.</p><p>Pour obtenir le jeton d’accès de session et le profil utilisateur, deux requêtes supplémentaires doivent être effectuées auprès de l’API Facebook.</p>

## Récupérer le jeton d’accès à la session Facebook {{{ data-action="code" data-code="fetchSessionToken" }}}


<p>Effectuez une nouvelle requête GET vers le point de terminaison <code>/oauth/access_token</code> de l’API Facebook. Utilisez les paramètres de requête suivants :</p><ul><li><p><code>grant_type</code>: <code>fb_attenuate_token</code>.</p></li><li><p><code>fb_exchange_token</code>: le jeton d’accès reçu lors de la connexion.</p></li><li><p><code>client_id</code>: l’identificateur de votre application. Cette valeur provient du tableau de bord du développeur Facebook et devrait déjà être utilisée dans votre application si vous avez réussi à intégrer la connexion Facebook.</p></li></ul><p>Placez la logique de cette étape dans sa propre méthode. Vous effectuerez cet appel plus tard, à partir de la méthode ajoutée précédemment.</p><p>L’exemple utilise la classe <code>GraphRequest</code> de la trousse SDK Facebook pour effectuer cette demande.</p>

## Récupérer le profil utilisateur Facebook {{{ data-action="code" data-code="fetchUserProfile" }}}


<p>Effectuez à présent une autre demande GET, comme dans l’étape précédente. Le chemin du point de terminaison correspondra à la valeur de l’identificateur de l’utilisateur figurant dans le résultat de la connexion Facebook (par exemple, <code>/904636746222815</code>). Utilisez les paramètres suivants :</p><ul><li><p><code>access_token</code> : le jeton d’accès reçu lors de la connexion.</p></li><li><p><code>fields</code> : les champs du profil utilisateur que vous souhaitez récupérer dans la réponse. Ces champs sont directement liés aux autorisations du bouton de connexion Facebook qui ont été configurées au début. Lorsqu’une autorisation est facultative, l’utilisateur doit d’abord consentir à y donner accès. Pour inscrire un utilisateur à Auth0, le nom complet et l’adresse électronique suffisent.</p></li></ul><p></p>

## Intégrer Auth0


<p>Maintenant que les artefacts requis ont été obtenus, vous êtes prêt à les échanger contre les identifiants utilisateur Auth0, comme l’identificateur et les jetons d’accès. Mais d’abord, vous devez configurer la trousse SDK Auth0 pour qu’il effectue cette dernière demande.</p><h3>Obtenir les clés de votre application</h3><ol><li><p>Allez dans la section <b>Applications</b> du <a href="https://manage.auth0.com/">Auth0 Dashboard</a> et sélectionnez l’application existante dans laquelle vous avez activé la fonction <b>Sign in with Facebook (Se connecter avec Facebook)</b>. Si vous avez besoin d’aide pour cette étape, veuillez consulter la section des exigences en haut de cet article.</p></li><li><p>Copiez les valeurs <b>Domain (Domaine)</b> et <b>Client ID (Identificateur client)</b> de la page des paramètres de l’application. Ces valeurs sont requises par la trousse SDK.</p></li><li><p>Créez deux nouvelles ressources dans le fichier strings.xml de votre application Android pour les stocker. Les noms des clés doivent correspondre à ceux utilisés ci-dessous :

<pre><code>&lt;resources&gt;

    &lt;string name=&quot;com_auth0_domain&quot;&gt;${account.namespace}&lt;/string&gt;

    &lt;string name=&quot;com_auth0_client_id&quot;&gt;${account.clientId}&lt;/string&gt;

&lt;/resources&gt;

</code></pre>

</p></li></ol><h3>Installer la trousse SDK Auth0</h3><p>Dans votre application Android, ajoutez cette ligne au fichier app/build.gradle :</p><p><pre><code>dependencies {

    implementation 'com.auth0.android:auth0:1.+'

}

</code></pre>

</p><p>Il est maintenant temps d’exécuter la tâche Gradle Sync pour actualiser le projet et ses dépendances.</p><h3>Mise à jour du manifeste pour l’authentification Web</h3><p>Si votre application ne prévoit pas d’utiliser le module d’authentification Web fourni par la trousse SDK, vous devrez supprimer l’activité inutilisée du fichier AndroidManifest.xml pour éviter les problèmes liés aux paramètres fictifs dans le manifeste. Pour ce faire, il suffit d’ajouter une déclaration d’activité et de l’annoter avec tools:node=&quot;remove&quot;.</p><p><pre><code>&lt;application&gt;

  &lt;!-- Add the activity declaration line below --&gt;

   &lt;activity

    android:name=&quot;com.auth0.android.provider.AuthenticationActivity&quot;

    tools:node=&quot;remove&quot; /&gt;



&lt;/application&gt;

</code></pre>

</p><p>Toutefois, si vous envisagez de prendre en charge l’authentification Web, rendez-vous <a href="https://auth0.com/docs/libraries/auth0-android#authentication-via-universal-login">ici</a> pour savoir comment déclarer les paramètres fictifs du manifeste.</p>

## Échange des données reçues contre des jetons Auth0 {{{ data-action="code" data-code="exchangeTokens" }}}


<p>Vous devez instancier la trousse SDK avant de l&#39;utiliser. Définissez un champ au niveau de la classe et initialisez-le dans la méthode <code>onCreate</code>. Remarque : Les identifiants définis à l&#39;étape précédente sont transmis au développeur <code>Auth0</code> et une nouvelle instance de <code>AuthenticationAPIClient</code> est créée avec lui.</p><p><pre><code>private AuthenticationAPIClient auth0Client;



@Override

public void onCreate(Bundle savedInstanceState) {

    super.onCreate(savedInstanceState);



    setContentView(R.layout.activity_login);



    Auth0 account = new Auth0(getString(R.string.com_auth0_client_id), getString(R.string.com_auth0_domain));

    auth0Client = new AuthenticationAPIClient(account);



    //...

}

</code></pre>

</p><p>Créez la méthode qui contiendra la logique d&#39;échange des deux artefacts obtenus contre les identifiants de l&#39;utilisateur Auth0. Dans l&#39;exemple, cette méthode s&#39;appelle <code>exchangeTokens</code>.</p><p>Le client de l&#39;API déclare la méthode <code>loginWithNativeSocialToken</code> qui reçoit un jeton et un type de sujet. Le premier correspond au jeton de session et le second indique le type de connexion avec lequel le programme dorsal tentera de s&#39;authentifier.</p><p>Pour la fonction native Connexion Facebook, vous devez utiliser la valeur suivante : <code>&quot;http://auth0.com/oauth/token-type/facebook-info-session-access-token&quot;</code></p><p>Les autres valeurs à configurer sont le profil utilisateur (en utilisant la clé <code>user_profile</code>) et la permission que vous demandez aux jetons Auth0 de contenir.</p><p><div class="alert-container" severity="default"><p>Nous recommandons de conserver toutes les valeurs immuables en tant que constantes au début de la classe. L’exemple utilise des constantes pour le type de jeton sujet, les permissions Facebook et les permissions Auth0. Pour en savoir plus sur les permissions Auth0, lisez <a data-contentfulid="78W9Q6R2zt6VRY0BouhtYG-fr-CA">cet article</a>.</p></div></p>

## Mettre à jour la méthode performLogin {{{ data-action="code" data-code="performLogin" }}}


<p>Maintenant que chaque étape est définie dans sa propre méthode, il est temps de tout regrouper dans la méthode <code>performLogin</code>.</p><p>Si tout a bien fonctionné, vous devriez maintenant être en mesure de vous authentifier de manière native avec la trousse SDK de connexion à Facebook. Cela signifie que si l’application Facebook est installée sur l’appareil, l’authentification sera gérée par l’application et non par une application de navigateur.</p>
