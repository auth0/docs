---
title: Ajouter une connexion à votre application Laravel
description: Ce guide montre comment intégrer Auth0 avec une nouvelle (ou existante) application Laravel 9 ouº10.
interactive:  true
files:
 - files/routes/web
github:
  path: sample
locale: fr-CA
---

# Ajouter une connexion à votre application Laravel


<p>La <a href="https://github.com/auth0/laravel-auth0" target="_blank" rel="noreferrer noopener">Auth0’s Laravel SDK (trousse SDK Laravel Auth0)</a> vous permet d’ajouter rapidement l’authentification, la gestion du profil utilisateur et le contrôle d’accès au routage à votre application Laravel. Ce guide explique comment intégrer Auth0 avec une nouvelle (ou existante) application <a href="https://github.com/auth0/laravel-auth0#support-policy" target="_blank" rel="noreferrer noopener">Laravel 9 or 10 (Laravel 9 ou 10)</a>.</p><p></p>

## Installer Laravel


<p><b>Si vous n’avez pas déjà configuré une application Laravel</b>, ouvrez un shell dans un répertoire approprié pour un nouveau projet et exécutez la commande suivante :</p><p><code>composer create-project --prefer-dist laravel/laravel auth0-laravel-app ^9.0</code></p><p>Toutes les commandes de ce guide supposent que vous les exécutez à partir de la racine de votre projet Laravel, donc vous devez placer <code>cd</code> dans le nouveau répertoire du projet :</p><p><code>cd auth0-laravel-app</code></p>

## Installation de la trousse SDK


<p>Exécutez la commande suivante dans le répertoire de votre projet pour installer la trousse <a href="https://github.com/auth0/laravel-auth0" target="_blank" rel="noreferrer noopener">Auth0 Laravel SDK</a> :</p><p><code>composer require auth0/login:^7.8 --update-with-all-dependencies</code></p><p>Générez ensuite un fichier de configuration pour la trousse SDK pour votre application :</p><p><code>php artisan vendor:publish --tag auth0</code></p>

## Configuration SDK


<p>Exécutez la commande suivante à partir du répertoire de votre projet pour télécharger l’interface de ligne de commande (CLI) Auth0 :</p><p><code>curl -sSfL HTTPs://raw.githubusercontent.com/auth0/auth0-cli/main/install.sh | sh -s -- -b .</code></p><p>Ensuite, authentifiez la CLI avec votre compte Auth0 en choisissant « as a user (en tant qu’utilisateur) » lorsque vous y êtes invité :</p><p><code>./auth0 login</code></p><p>Ensuite, créez une nouvelle application avec Auth0 :</p><p><pre><code class="language-bash">./auth0 apps create \

  --name &quot;My Laravel Application&quot; \

  --type &quot;regular&quot; \

  --auth-method &quot;post&quot; \

  --callbacks &quot;http://localhost:8000/callback&quot; \

  --logout-urls &quot;http://localhost:8000&quot; \

  --reveal-secrets \

  --no-input \

  --json &gt; .auth0.app.json

</code></pre>

</p><p>Vous devez également créer une nouvelle API :</p><p><pre><code class="language-bash">./auth0 apis create \

  --name &quot;My Laravel Application's API&quot; \

  --identifier &quot;https://github.com/auth0/laravel-auth0&quot; \

  --offline-access \

  --no-input \

  --json &gt; .auth0.api.json

</code></pre>

</p><p>Cela produit deux fichiers qui configurent la trousse SDK dans votre répertoire de projet.</p><p>Comme ces fichiers contiennent des renseignements personnels, il est important de les traiter comme étant sensibles. Vous devez vous assurer de ne pas les soumettre au contrôle de version. Si vous utilisez Git, vous devez les ajouter à votre fichier <code>.gitignore</code> :</p><p><code>echo &quot;.auth0.*.json&quot; &gt;&gt; .gitignore</code></p>

## Routes de connexion


<p>La trousse SDK enregistre automatiquement toutes les routes nécessaires pour que les utilisateurs de votre application s’authentifient.</p><p><div class="tablew"><table class="table"><thead>

<tr>

<th>**Routes**</th>

<th>**Objet**</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>/login</code></td>

<td>Initie le flux d’authentification.</td>

</tr>

<tr>

<td><code>/logout</code></td>

<td>Déconnecte l’utilisateur.</td>

</tr>

<tr>

<td><code>/callback</code></td>

<td>Gère le rappel de Auth0.</td>

</tr>

</tbody>

</table></div></p><p>Si vous avez besoin d’un plus grand contrôle sur les utilisateurs, ou s’ils entrent en conflit avec les routes existantes dans votre application, vous pouvez enregistrer manuellement les contrôleurs de la trousse SDK. Veuillez consulter le fichier de mise à jour de la trousse <a href="https://github.com/auth0/laravel-auth0" target="_blank" rel="noreferrer noopener">SDK README</a> pour les intégrations avancées.</p>

## Contrôle d’accès {{{ data-action="code" data-code="routes/web.php#6:12" }}}


<p>Les installations d’authentification de Laravel utilisent des « gardes » pour définir comment les utilisateurs sont authentifiés pour chaque demande. Vous pouvez utiliser la protection d’authentification de la trousse SDK Auth0 pour restreindre l’accès aux routes de votre application.</p><p>Pour exiger que les utilisateurs s’authentifient avant d’accéder à une route, vous pouvez utiliser l’intergiciel <code>auth</code> de Laravel.</p><p><pre><code class="language-php">Route::get('/private', function () {

  return response('Welcome! You are logged in.');

})-&gt;middleware('auth');

</code></pre>

</p><p>Vous pouvez également exiger que les utilisateurs authentifiés aient des <a href="https://auth0.com/docs/manage-users/access-control/rbac" target="_blank" >autorisations</a> spécifiques en combinant cela avec l&#39;intergiciel <code>can</code> de Laravel.</p><p><pre><code class="language-php">Route::get('/scope', function () {

    return response('You have `read:messages` permission, and can therefore access this resource.');

})-&gt;middleware('auth')-&gt;can('read:messages');

</code></pre>

</p>

## Renseignements de l’utilisateur {{{ data-action="code" data-code="routes/web.php#14:24" }}}


<p>Les renseignements de l’utilisateur authentifié sont accessibles à partir de la Facade <code>Auth</code> de Laravel, ou de la fonction d’assistance <code>auth()</code>.</p><p>Par exemple, pour récupérer l’identificateur et l’adresse courriel de l’utilisateur :</p><p><pre><code class="language-php">Route::get('/', function () {

  if (! auth()-&gt;check()) {

    return response('You are not logged in.');

  }



  $user = auth()-&gt;user();

  $name = $user-&gt;name ?? 'User';

  $email = $user-&gt;email ?? '';



  return response(&quot;Hello {$name}! Your email address is {$email}.&quot;);

});;

</code></pre>

</p>

## Gestion des utilisateurs {{{ data-action="code" data-code="routes/web.php#26:43" }}}


<p>Vous pouvez mettre à jour les informations utilisateur en utilisant la <a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md" target="_blank" rel="noreferrer noopener">Auth0 Management API</a>. Tous les terminaux de gestion sont accessibles via la méthode <code>management()</code> de la trousse SDK.</p><p><b>Avant de faire des appels à la Management API, vous devez permettre à votre application de communiquer avec la Management API.</b> Cela peut être fait à partir de la <a href="%24%7Bmanage_url%7D/#/apis/" target="_blank" rel="noreferrer noopener">page API du Auth0 Dashboard</a>, en choisissant la <code>Auth0 Management API</code> et en sélectionnant l’onglet Machine to Machine Applications (Communication entre machines). Autoriser votre application Laravel, puis cliquez sur la flèche vers le bas pour choisir les permissions que vous souhaitez accorder.</p><p>Pour l’exemple suivant, dans lequel nous allons mettre à jour les métadonnées d’un utilisateur et attribuer une couleur préférée aléatoire, vous devez accorder les permissions <code>read:users</code> et <code>update:users</code>. Une liste des points de terminaison API et les permissions requises peuvent être trouvées dans <a href="https://auth0.com/docs/api/management/v2" target="_blank" >la documentation de la Management API</a>.</p><p><pre><code class="language-php">use Auth0\Laravel\Facade\Auth0;



Route::get('/colors', function () {

  $endpoint = Auth0::management()-&gt;users();



  $colors = ['red', 'blue', 'green', 'black', 'white', 'yellow', 'purple', 'orange', 'pink', 'brown'];



  $endpoint-&gt;update(

    id: auth()-&gt;id(),

    body: [

        'user_metadata' =&gt; [

            'color' =&gt; $colors[random_int(0, count($colors) - 1)]

        ]

    ]

  );



  $metadata = $endpoint-&gt;get(auth()-&gt;id());

  $metadata = Auth0::json($metadata);



  $color = $metadata['user_metadata']['color'] ?? 'unknown';

  $name = auth()-&gt;user()-&gt;name;



  return response(&quot;Hello {$name}! Your favorite color is {$color}.&quot;);

})-&gt;middleware('auth');

</code></pre>

</p><p>Un guide de référence rapide de toutes les méthodes de la Management API de la trousse SDK est <a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md" target="_blank" rel="noreferrer noopener">disponible ici</a>.</p>

## Exécuter l’application


<p>Vous êtes maintenant prêt à lancer votre application Laravel, de sorte qu’elle puisse accepter les demandes :</p><p><code>php artisan serve</code></p><p><code></code><div class="checkpoint">Laravel – Étape 8 – Exécuter l’application – Point de contrôle <div class="checkpoint-default"><p>Ouvrez votre navigateur Web et essayez d’accéder aux routes suivantes :</p><ul><li><p><a href="http://localhost:8000/" target="_blank" rel="noreferrer noopener">http://localhost:8000</a> pour voir la route publique.</p></li><li><p><a href="http://localhost:8000/private" target="_blank" rel="noreferrer noopener">http://localhost:8000/private</a> pour être invité à s’authentifier.</p></li><li><p><a href="http://localhost:8000/" target="_blank" rel="noreferrer noopener">http://localhost:8000</a> pour voir la route publique, maintenant authentifiée.</p></li><li><p><a href="http://localhost:8000/scope" target="_blank" rel="noreferrer noopener">http://localhost:8000/scope</a> pour vérifier si vous avez <a href="https://auth0.com/docs/manage-users/access-control/rbac" target="_blank" >l’autorisation</a><code>read:messages </code>.</p></li><li><p><a href="http://localhost:8000/update" target="_blank" rel="noreferrer noopener">http://localhost:8000/update</a> pour mettre à jour le profil utilisateur.</p></li><li><p><a href="http://localhost:8000/logout" target="_blank" rel="noreferrer noopener">http://localhost:8000/logout</a> pour vous déconnecter.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p><h3>Lecture supplémentaire</h3><ul><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Users.md" target="_blank" rel="noreferrer noopener">Référentiels et modèles d’utilisateurs</a> étend la trousse SDK Laravel Auth0 pour utiliser des modèles d’utilisateurs personnalisés, et comment stocker et récupérer les utilisateurs à partir d’une base de données.</p></li><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Events.md" target="_blank" rel="noreferrer noopener">Événements d’appels</a> explique comment écouter les événements soulevés par la trousse SDK Laravel Auth0, pour personnaliser pleinement le comportement de votre intégration.</p></li><li><p>Le soutien de la <a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md" target="_blank" rel="noreferrer noopener">Management API</a> est intégré à la trousse SDK Laravel Auth0, vous permettant d’interagir avec Management API à partir de votre application Laravel.</p></li></ul><p></p>
