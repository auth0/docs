---
title: Ajouter l’autorisation à votre application Laravel
description: Ce guide montre comment intégrer Auth0 avec une nouvelle (ou existante) application Laravel 9 ou 10.
interactive:  true
files:
 - files/routes/api
github:
  path: https://github.com/auth0-samples/laravel/tree/7.x/sample
locale: fr-CA
---

# Ajouter l’autorisation à votre application Laravel


<p>La <a href="https://github.com/auth0/laravel-auth0">trousse SDK Laravel Auth0</a> vous permet d’ajouter rapidement une autorisation basée sur un jeton et un contrôle d’accès au routage à votre application Laravel. Ce guide montre comment intégrer Auth0 avec une nouvelle (ou existante) application <a href="https://github.com/auth0/laravel-auth0#support-policy">Laravel 9 ou 10</a>.</p><hr/><p><b>Les applications dorsales diffèrent des applications Web traditionnelles en ce sens qu’elles ne gèrent pas l’authentification des utilisateurs et n’ont pas d’interface utilisateur. Elles fournissent une API avec laquelle d’autres applications peuvent interagir. Elles acceptent les </b><a href="https://auth0.com/docs/secure/tokens/access-tokens"><b>jetons d&#39;accès</b></a><b> des en-têtes </b><b><code>Authorization</code></b><b> dans les requêtes pour contrôler l&#39;accès aux routes.</b></p><p>Des applications frontales distinctes sont généralement créées pour interagir avec ces types d’applications dorsales. Il peut s’agir d’<a href="https://auth0.com/docs/quickstart/spa">applications à page unique</a> ou d’<a href="https://auth0.com/docs/quickstart/native">applications natives ou mobiles</a> (pour lesquelles Auth0 fournit également des trousses SDK).</p><p>Pour interagir avec votre application dorsale, les utilisateurs doivent d’abord s’authentifier auprès d’Auth0 à l’aide de l’application frontale. L’application frontale récupère ensuite un jeton d’accès auprès d’Auth0, qu’elle peut utiliser pour adresser des demandes à votre application dorsale au nom de l’utilisateur.</p><p>Comme leur nom l’indique, les <a href="https://auth0.com/docs/secure/tokens/access-tokens">jetons d’accès</a> sont conçus pour traiter les questions de contrôle d’accès (autorisation) et ne contiennent pas d’informations sur l’utilisateur. <b>Les applications dorsales fonctionnent exclusivement avec des jetons d’accès.</b> Vous pouvez récupérer des informations sur l’utilisateur créateur du jeton à l’aide de la <a href="https://auth0.com/docs/api/management/v2">Management API</a>, que nous présenterons plus loin.</p><p></p>

## Installer Laravel


<p><b>Si vous n’avez pas déjà configuré une application Laravel</b>, ouvrez un shell dans un répertoire approprié pour un nouveau projet et exécutez la commande suivante :</p><p><pre><code class="language-bash">composer create-project --prefer-dist laravel/laravel auth0-laravel-api ^9.0

</code></pre>

</p><p>Toutes les commandes de ce guide supposent que vous les exécutez à partir de la racine de votre projet Laravel, donc vous devez bous placer <code>cd</code> dans le nouveau répertoire du projet :</p><p><pre><code class="language-bash">cd auth0-laravel-api

</code></pre>

</p>

## Installation de la trousse SDK


<p>Exécutez la commande suivante dans le répertoire de votre projet pour installer la <a href="https://github.com/auth0/laravel-auth0">trousse SDK Laravel Auth0</a> :</p><p><pre><code class="language-bash">composer require auth0/login:^7.8 --update-with-all-dependencies

</code></pre>

</p><p>Générez ensuite un fichier de configuration pour la trousse SDK pour votre application :</p><p><pre><code class="language-bash">php artisan vendor:publish --tag auth0

</code></pre>

</p>

## Configuration de la trousse SDK


<p>Exécuter la commande suivante à partir du répertoire de votre projet pour télécharger le <a href="https://github.com/auth0/auth0-cli">CLI Auth0</a> :</p><p><pre><code class="language-bash">curl -sSfL https://raw.githubusercontent.com/auth0/auth0-cli/main/install.sh | sh -s -- -b .

</code></pre>

</p><p>Ensuite, authentifiez le CLI avec votre compte Auth0 en choisissant « as a user (en tant qu’utilisateur) » lorsque vous y êtes invité :</p><p><pre><code class="language-bash">./auth0 login

</code></pre>

</p><p>Ensuite, créez une nouvelle application avec Auth0 :</p><p><pre><code class="language-bash">./auth0 apps create \

--name &quot;My Laravel Backend&quot; \

--type &quot;regular&quot; \

--auth-method &quot;post&quot; \

--callbacks &quot;http://localhost:8000/callback&quot; \

--logout-urls &quot;http://localhost:8000&quot; \

--reveal-secrets \

--no-input \

--json &gt; .auth0.app.json

</code></pre>

</p><p>Vous devez également créer une nouvelle API :</p><p><pre><code class="language-bash">./auth0 apis create \

--name &quot;My Laravel Backend API&quot; \

--identifier &quot;https://github.com/auth0/laravel-auth0&quot; \

--offline-access \

--no-input \

--json &gt; .auth0.api.json

</code></pre>

</p><p>Cela produit deux fichiers qui configurent la trousse SDK dans votre répertoire de projet.</p><p>Comme ces fichiers contiennent des renseignements personnels, il est important de les traiter comme étant sensibles. Vous devez vous assurer de ne pas les soumettre au contrôle de version. Si vous utilisez Git, vous devez les ajouter à votre fichier <code>.gitignore</code> :</p><p><pre><code class="language-bash">echo &quot;.auth0.*.json&quot; &gt;&gt; .gitignore

</code></pre>

</p>

## Contrôle d’accès {{{ data-action="code" data-code="routes/api.php#6:16" }}}


<p>La trousse SDK enregistre automatiquement son gardien d’autorisation avec votre application Laravel pour l’utiliser avec le logiciel médiateur <code>api</code>, que Laravel applique par défaut à toutes les routes dans le fichier <code>routes/api.php</code> de votre application.</p><p><div class="alert-container" severity="warning"><p>Pour que la trousse SDK fonctionne comme prévu sans configuration supplémentaire, <b>vous devez définir vos routes dans le</b><b>fichier</b><b><code>routes/api.php</code></b>.</p></div></p><p>Vous pouvez utiliser la protection d’autorisation de la trousse SDK Auth0 pour restreindre l’accès aux routes de votre application.</p><p>Pour rejeter les demandes qui ne contiennent pas de jeton d’accès valide dans l’en-tête <code>Authorization</code>, vous pouvez utiliser le logiciel médiateur <code>auth</code> de Laravel :</p><p><pre><code class="language-php">Route::get('/private', function () {

 return response()-&gt;json([

 'message' \=&gt; 'Your token is valid; you are authorized.',

 ]);

})-&gt;middleware('auth');

</code></pre>

</p><p>Vous pouvez également exiger que le jeton fourni dispose des <a href="https://auth0.com/docs/manage-users/access-control/rbac">permissions</a> spécifiques en le combinant avec le logiciel médiateur <code>can</code> de Laravel :</p><p><pre><code class="language-php">Route::get('/scope', function () {

 return response()-&gt;json([

 'message' =&gt; 'Your token is valid and has the `read:messages` permission; you are authorized.',

 ]);

})-&gt;middleware('auth')-&gt;can('read:messages');

</code></pre>

</p>

## Informations de jeton {{{ data-action="code" data-code="routes/api.php#18:30" }}}


<p>Les informations sur le jeton d’accès fourni sont disponibles via la façade <code>Auth</code> de Laravel, ou la fonction d’assistance <code>auth()</code>.</p><p>Par exemple, pour récupérer l’identificateur et l’adresse électronique de l’utilisateur :</p><p><pre><code class="language-php">Route::get('/', function () {

 if (! auth()-&gt;check()) {

 return response()-&gt;json([

 'message' =&gt; 'You did not provide a valid token.',

 ]);

 }



 return response()-&gt;json([

 'message' =&gt; 'Your token is valid; you are authorized.',

 'id' =&gt; auth()-&gt;id(),

 'token' =&gt; auth()?-&gt;user()?-&gt;getAttributes(),

 ]);

});

</code></pre>

</p>

## Récupérer des informations sur l’utilisateur {{{ data-action="code" data-code="routes/api.php#32:51" }}}


<p>Vous pouvez récupérer des informations sur l’utilisateur créateur du jeton d’accès à partir d’Auth0 en utilisant la <a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md">Management API Auth0</a>. La trousse SDK fournit une enveloppe pratique pour cette API, accessible par le biais de la méthode <code>management()</code> de la trousse SDK.</p><p><b>Avant de faire des appels Management API, vous devez permettre à votre application de communiquer avec la Management API.</b> Cela peut être fait à partir de la <a href="https://manage.auth0.com/#/apis/">page API du Auth0 Dashboard</a>, en choisissant la <code>Auth0 Management API</code> et en sélectionnant l’onglet Machine to Machine Applications (Communication entre machines). Autoriser votre application Laravel, puis cliquez sur la flèche vers le bas pour choisir les permissions que vous souhaitez accorder.</p><p>Dans l’exemple suivant, vous devez accorder la permission <code>read:users</code>. Une liste des points de terminaison API et les permissions requises peuvent être trouvées dans <a href="https://auth0.com/docs/api/management/v2">la documentation de la Management API</a>.</p><p><pre><code class="language-php">use Auth0\Laravel\Facade\Auth0;



Route::get('/me', function () {

 $user = auth()-&gt;id();

 $profile = cache()-&gt;get($user);



 if (null === $profile) {

 $endpoint = Auth0::management()-&gt;users();

 $profile = $endpoint-&gt;get($user);

 $profile = Auth0::json($profile);



 cache()-&gt;put($user, $profile, 120);

 }



 $name = $profile['name'] ?? 'Unknown';

 $email = $profile['email'] ?? 'Unknown';



 return response()-&gt;json([

 'name' =&gt; $name,

 'email' =&gt; $email,

 ]);

})-&gt;middleware('auth');

</code></pre>

</p><p><div class="alert-container" severity="default"><p><b>Vous devez mettre en cache les informations relatives aux utilisateurs dans votre application pendant de brèves périodes.</b> Cela réduit le nombre de requêtes que votre application adresse à Auth0 et améliore les performances. Vous devez éviter de stocker des informations sur les utilisateurs dans votre application pendant de longues périodes, car cela peut conduire à des données obsolètes. Vous devez également éviter de stocker dans des bases de données persistantes des informations autres que l’identifiant de l’utilisateur.</p></div></p>

## Exécuter l’application


<p>Vous êtes maintenant prêt à lancer votre application Laravel, de sorte qu’elle puisse accepter les demandes :</p><p><pre><code class="language-php">php artisan serve

</code></pre>

</p>

## Récupérer un jeton de test


<p>Pour en savoir plus sur la <a href="https://auth0.com/docs/secure/tokens/access-tokens/get-access-tokens">récupération des jetons d’accès, cliquez ici</a>. Pour ce guide rapide, cependant, vous pouvez simplement utiliser un jeton d’accès à partir de la <a href="https://manage.auth0.com/#/apis">vue « test » des paramètres de votre API</a>.</p><p><div class="alert-container" severity="default"><p>La route <code>/me</code> que nous avons créée ci-dessus ne fonctionnera pas avec un jeton de test car aucun utilisateur réel n’y est associé.</p></div></p><p><div class="checkpoint">Guide rapide Laravel - Étape 8 - Point de contrôle <div class="checkpoint-default"><p>Ouvrez un shell et essayez d’envoyer des requêtes à votre application.</p><p>Commencez par demander la route publique :</p><p><code>curl --request GET \ --url http://localhost:8000/api \ --header &#39;Accept: application/json&#39;</code></p><p>Ensuite, utilisez votre jeton d’accès dans un en-tête <code>Authorization</code> pour demander une route protégée :</p><p><code>curl --request GET \ --url http://localhost:8000/api/private \ --header &#39;Accept: application/json&#39; \ --header &#39;Authorization: Bearer YOUR_ACCESS_TOKEN&#39;</code></p><p>Enfin, essayez de demander la route protégée par des permissions, qui n’aboutira que si le jeton d’accès dispose de la permission <code>read:messages</code> :</p><p><code>curl --request GET \ --url http://localhost:8000/api/scope \ --header &#39;Accept: application/json&#39; \ --header &#39;Authorization: Bearer YOUR_ACCESS_TOKEN&#39;</code></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Here are a couple of things to try:</p><ul><li><p>Try running <code>php artisan optimize:clear</code> to clear Laravel&#39;s cache.</p></li><li><p>Ensure your <code>.auth0.app.json</code> and <code>.auth0.api.json</code> files are at the root of your project.</p></li><li><p>Ensure you have enabled your Laravel application as a Machine-to-Machine application and granted it all the necessary scopes for the <code>Auth0 Management API</code> from the <a href="https://manage.auth0.com/#/apis/">Auth0 Dashboard</a>.</p></li></ul><p>Encountering problems? Check the SDK&#39;s <a href="https://github.com/auth0/laravel-auth0">documentation</a> or our <a href="https://auth0.com/docs">documentation hub</a>. You should also consider visiting <a href="https://community.auth0.com/">the community</a> where our team and other community members can help answer your questions.</p></div>

  </div></p><h3>Lecture supplémentaire</h3><ul><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Users.md">Référentiels et modèles d’utilisateurs</a> étend la trousse SDK Laravel Auth0 pour utiliser des modèles d’utilisateurs personnalisés, et comment stocker et récupérer les utilisateurs à partir d’une base de données.</p></li><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Events.md">Événements d&#39;appels</a> explique comment écouter les événements soulevés par la trousse SDK Laravel Auth0, pour personnaliser pleinement le comportement de votre intégration.</p></li><li><p>Le support de la <a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md">Management API</a> est intégré à la trousse SDK Laravel Auth0, vous permettant d’interagir avec la Management API à partir de votre application Laravel.</p></li></ul><p></p>
