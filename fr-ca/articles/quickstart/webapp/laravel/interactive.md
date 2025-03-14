---
title: Ajouter une connexion à votre application Laravel
description: Ce guide montre comment intégrer Auth0 avec une nouvelle (ou existante) application Laravel 9 ou 10.
interactive:  true
files:
 - files/routes/web
github:
  path: https://github.com/auth0-samples/laravel/tree/bf356d877b5dae566286fc8400da94b8b4b0ac76/sample
locale: fr-CA
---

# Ajouter une connexion à votre application Laravel


<p>La <a href="https://github.com/auth0/laravel-auth0">trousse SDK Laravel Auth0 </a> vous permet d’ajouter rapidement l’authentification, la gestion du profil utilisateur et le contrôle d’accès au routage à votre application Laravel. Ce guide montre comment intégrer Auth0 avec une nouvelle (ou existante) application <a href="https://github.com/auth0/laravel-auth0#support-policy">Laravel 9 ou 10</a>.</p><p></p>

## Installation de Laravel


<p><b>Si vous n’avez pas déjà configuré une application Laravel</b>, ouvrez un terminal dans un répertoire approprié pour un nouveau projet et exécutez la commande suivante :</p><p><code>composer create-project --prefer-dist laravel/laravel auth0-laravel-app ^9.0</code></p><p>Toutes les commandes de ce guide supposent que vous les exécutez à partir du répertoire racine de votre projet Laravel, donc vous devriez <code>cd</code> dans le nouveau répertoire du projet :</p><p><code>cd auth0-laravel-app</code></p>

## Installation de la trousse SDK


<p>Exécutez la commande suivante dans le répertoire de votre projet pour installer la trousse <a href="https://github.com/auth0/laravel-auth0">SDK Laravel Auth0</a>:</p><p><code>composer require auth0/login:^7.8 --update-with-all-dependencies</code></p><p>Puis, générez un fichier de configuration pour la trousse SDK pour votre application :</p><p><code>php artisan vendor:publish --tag auth0</code></p>

## Configuration de la trousse SDK


<p>Exécutez la commande suivante à partir du répertoire de votre projet pour télécharger le CLI Auth0 :</p><p><code>curl -sSfL https://raw.githubusercontent.com/auth0/auth0-cli/main/install.sh | sh -s -- -b .</code></p><p>Ensuite, authentifiez l&#39;interface de ligne de commande avec votre compte Auth0 en choisissant « as a user (en tant qu’utilisateur) » lorsque vous y êtes invité :</p><p><code>./auth0 login</code></p><p>Ensuite, créez une nouvelle application avec Auth0 :</p><p></p><p>Vous devez également créer une nouvelle API :</p><p></p><p>Cela produit deux fichiers qui configurent la trousse SDK dans votre répertoire de projet.</p><p>Comme ces fichiers contiennent des renseignements personnels, il est important de les traiter comme étant sensibles. Vous devez vous assurer de ne pas les soumettre au contrôle de version. Si vous utilisez Git, vous devez les ajouter à votre fichier <code>.gitignore</code> :</p><p><code>echo &quot;.auth0.*.json&quot; &gt;&gt; .gitignore</code></p>

## Routes de connexion


<p>La trousse SDK enregistre automatiquement toutes les routes nécessaires pour que les utilisateurs de votre application s’authentifient.</p><p></p><p>Si vous avez besoin d’un plus grand contrôle sur les utilisateurs, ou s’ils entrent en conflit avec les routes existantes dans votre application, vous pouvez enregistrer manuellement les contrôleurs de la trousse SDK. Veuillez consulter le <a href="https://github.com/auth0/laravel-auth0">le fichier de mise à jour de la trousse SDK</a> pour les intégrations avancées.</p>

## Contrôle d’accès {{{ data-action="code" data-code="routes/web.php#6:12" }}}


<p>Les installations d’authentification de Laravel utilisent des « gardes » pour définir comment les utilisateurs sont authentifiés pour chaque demande. Vous pouvez utiliser la protection d’authentification de la trousse SDK Auth0 pour restreindre l’accès aux routes de votre application.</p><p>Pour exiger que les utilisateurs s’authentifient avant d’accéder à une route, vous pouvez utiliser l’intergiciel <code>auth</code> de Laravel.</p><p></p><p>Vous pouvez également exiger que les utilisateurs authentifiés aient des <a href="https://auth0.com/docs/manage-users/access-control/rbac">autorisations</a> spécifiques en combinant cela avec l&#39;intergiciel <code>can</code> de Laravel.</p><p></p>

## Renseignements de l’utilisateur {{{ data-action="code" data-code="routes/web.php#14:24" }}}


<p>Les renseignements de l’utilisateur authentifié sont disponibles via la Facade  <code>Auth</code> de Laravel, ou de la fonction helper <code>auth()</code>.</p><p>Par exemple, pour récupérer l’identifiant et l’adresse courriel de l’utilisateur :</p><p></p>

## Gestion des utilisateurs {{{ data-action="code" data-code="routes/web.php#26:43" }}}


<p>Vous pouvez mettre à jour les informations utilisateur en utilisant le <a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md">Management API Auth0</a>. Tous les terminaux de gestion sont accessibles via la méthode <code>management()</code> de la trousse SDK.</p><p><b>Avant de faire des appels au Management API, vous devez permettre à votre application de communiquer avec le Management API.</b> Cela peut être fait à partir de la <a href="%24%7Bmanage_url%7D/#/apis/">page API du Auth0 Dashboard</a>, en choisissant <code>Auth0 Management API</code> et en sélectionnant l’onglet « Machine to Machine Applications » (Communications de machine à machine). Autorisez votre application Laravel, puis cliquez sur la flèche vers le bas pour choisir les permissions que vous souhaitez accorder.</p><p>Pour l’exemple suivant, dans lequel nous allons mettre à jour les métadonnées d’un utilisateur et attribuer une couleur préférée aléatoire, vous devez accorder les permissions <code>read:users</code> et <code>update:users</code> . Une liste des points de terminaison API et des permissions requises peuvent être trouvées dans <a href="https://auth0.com/docs/api/management/v2">la documentation de la Management API</a>.</p><p></p><p>Un guide de référence rapide de toutes les méthodes du Management API de la trousse SDK est <a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md">disponible ici</a>.</p>

## Exécuter l'application


<p>Vous êtes maintenant prêt à lancer votre application Laravel, de sorte qu&#39;elle puisse accepter les demandes.</p><p><code>php artisan serve</code></p><p><div class="checkpoint">Laravel - Étape 8 - Exécuter l’application - Point de contrôle <div class="checkpoint-default"><p>Ouvrez votre navigateur Web et essayez d’accéder aux routes suivantes :</p><ul><li><p><a href="http://localhost:8000/">http://localhost:8000</a> pour voir la route publique.</p></li><li><p><a href="http://localhost:8000/private">http://localhost:8000/private</a> pour être invité à s&#39;authentifier.</p></li><li><p><a href="http://localhost:8000/">http://localhost:8000</a> pour voir la route publique, maintenant authentifiée.</p></li><li><p><a href="http://localhost:8000/scope">http://localhost:8000/scope</a> pour vérifier si vous avez <a href="https://auth0.com/docs/manage-users/access-control/rbac">l’autorisation</a><code>read:messages</code>.</p></li><li><p><a href="http://localhost:8000/update">http://localhost:8000/update</a> pour mettre à jour le profil utilisateur.</p></li><li><p><a href="http://localhost:8000/logout">http://localhost:8000/logout</a> pour vous déconnecter.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p><h3>Lecture supplémentaire</h3><ul><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Users.md">User Repositories and Models (Référentiels et modèles d’utilisateurs)</a> étend la trousse SDK Laravel Auth0 pour utiliser des modèles d’utilisateurs personnalisés, et comment stocker et récupérer les utilisateurs à partir d’une base de données.</p></li><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Events.md">Hooking Events (Événements de rappel)</a> explique comment intercepter les événements déclenchés par la trousse SDK Auth0 pour Laravel, afin de personnaliser entièrement le comportement de votre intégration.</p></li><li><p>Le support du <a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md">Management API</a> est intégré à la trousse SDK Laravel Auth0, vous permettant d’interagir avec le Management API à partir de votre application Laravel.</p></li></ul><p></p>
