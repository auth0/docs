---
title: Ajouter une connexion à votre application Ruby on Rails
description: Ce tutoriel explique comment ajouter la connexion utilisateur à une application Ruby on Rails.
interactive:  true
files:
 - files/config/auth0
 - files/auth0
 - files/auth0_controller
 - files/routes
 - files/secured
github:
  path: sample
locale: fr-CA
---

# Ajouter une connexion à votre application Ruby on Rails


<p></p><p></p>

## Configuration d’Auth0


<p>Pour utiliser les services Auth0, vous devez avoir une application installée dans Auth0 Dashboard. L’application Auth0 est l’endroit où vous allez configurer le fonctionnement de l’authentification pour le projet que vous développez.</p><h3>Configurer une application</h3><p>Utilisez le sélecteur interactif pour créer une nouvelle application Auth0 ou sélectionner une application existante qui représente le projet avec lequel vous souhaitez effectuer l’intégration. Dans Auth0, il est attribué à chaque application un identifiant client unique alphanumérique que votre code d’application utilisera pour appeler les API Auth0 via la trousse SDK.</p><p>Tous les paramètres que vous configurez à l’aide de ce guide rapide seront automatiquement mis à jour pour votre application dans le <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, qui est l’endroit où vous pourrez gérer vos applications à l’avenir.</p><p>Si vous préférez explorer une configuration complète, consultez plutôt un exemple d’application.</p><h3>Configurer les URL de rappel</h3><p>Une URL de rappel est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur authentification. Si elle n’est pas définie, les utilisateurs ne seront pas redirigés vers votre application après s’être connectés.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, définissez cette URL comme suit : <code>http://localhost:3000/auth/auth0/callback</code>.</p></div></p><h3>Configuration des URL de déconnexion</h3><p>Une URL de déconnexion est une URL intégrée dans votre application vers laquelle vous souhaitez qu’Auth0 redirige les utilisateurs après leur déconnexion. Si elle n’est pas définie, les utilisateurs ne pourront pas se déconnecter de votre application et recevront un message d’erreur.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, définissez cette URL comme suit : <code>http://localhost:3000</code>.</p></div></p><h3>Configurer les origines Web autorisées</h3><p>Une origine Web autorisée est une URL que vous souhaitez autoriser à accéder à votre flux d’authentification. Elle doit contenir l’URL de votre projet. Si elle n’est pas configurée adéquatement, votre projet ne pourra pas actualiser silencieusement les jetons d’authentification, ce qui entraînera la déconnexion de vos utilisateurs lorsque prochainement ils visiteront votre application ou lors de l’actualisation d’une page.</p><p><div class="alert-container" severity="default"><p>Si vous suivez notre exemple de projet, définissez cette URL comme suit : <code>http://localhost:3000</code>.</p></div></p>

## Ajouter des dépendances


<p>Utilisez <code>omniauth-auth0</code>, une <a href="https://github.com/intridea/omniauth#omniauth-standardized-multi-provider-authentication" target="_blank" rel="noreferrer noopener">stratégie OmniAuth</a> personnalisée, pour gérer le flux d’authentification.</p><p>Ajoutez les dépendances suivantes à votre <code>Gemfile</code> :</p><p><pre><code class="language-ruby">gem 'omniauth-auth0', '~&gt; 3.0'

gem 'omniauth-rails_csrf_protection', '~&gt; 1.0' # prevents forged authentication requests

</code></pre>

</p><p>Une fois vos gems ajoutés, installez-les avec la commande <code>bundle install</code>.</p>

## Configuration de la trousse SDK {{{ data-action="code" data-code="config/auth0.yml" }}}


<p>Créez un fichier de configuration <code>./config/auth0.yml</code> pour préciser votre domaine Auth0, votre identifiant client et vos valeurs de secret client situées dans votre Auth0 Dashboard sous les <b>paramètres</b> de l’application.</p>

## Configurer l’intergiciel OmniAuth {{{ data-action="code" data-code="auth0.rb" }}}


<p>Créez le fichier d’initialisation suivant <code>./config/initializers/auth0.rb</code> et <a href="https://github.com/auth0/omniauth-auth0/blob/master/EXAMPLES.md#send-additional-authentication-parameters" target="_blank" rel="noreferrer noopener">configurez</a> l’intergiciel <b>OmniAuth</b> avec le fichier de configuration que vous avez créé à l’étape précédente.</p><p>Assurez-vous que <code>callback_path</code> correspond à la valeur donnée dans le paramètre des URL de rappel autorisées de votre application Auth0.</p>

## Ajouter un contrôleur Auth0 {{{ data-action="code" data-code="auth0_controller.rb" }}}


<p>Créez un contrôleur Auth0 pour gérer le rappel d’authentification, l’action <code>logout</code> et les méthodes pour créer l’URL de déconnexion.</p><p>Exécutez la commande <code>rails generate controller auth0 callback failure logout --skip-assets --skip-helper --skip-routes --skip-template-engine</code>.</p><p>Dans la méthode de rappel, assignez le hachage des informations utilisateur, renvoyé en tant que <code>request.env[’omniauth.auth’]</code> à la session active.</p><p>Pour configurer la déconnexion, effacez tous les objets stockés dans la session en appelant la méthode <code>reset_session</code> dans l’action <code>logout</code>. Ensuite, redirigez vers le point de terminaison de déconnexion Auth0. Pour en savoir plus sur <code>reset_session</code>, consultez <a href="http://api.rubyonrails.org/classes/ActionController/Base.html#M000668" target="_blank" rel="noreferrer noopener">Documentation relative au ActionController Ruby on Rails</a>.</p>

## Configurer les routes {{{ data-action="code" data-code="routes.rb" }}}


<p>Ajoutez ces routes à votre fichier <code>./config/routes.rb</code>.</p><p>Les routes doivent être en place afin que Rails sache comment diriger les différentes URL de rappel Auth0 vers le contrôleur Auth0 que vous avez créé à l’étape précédente.</p><p><div class="checkpoint">Démarrage rapide Ruby on Rails - Étape 6 - Point de contrôle <div class="checkpoint-default"><p>Exécutez votre application pour vérifier qu’elle fonctionne toujours comme prévu et que vous ne recevez aucun message d’erreur lié à Auth0.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Veuillez vérifier que les étapes précédentes se sont déroulées sans erreur.</p><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>

## Ajouter une fonctionnalité de connexion à votre application


<p>Un utilisateur peut maintenant se connecter à votre application en visitant le point de terminaison <code>/auth/auth0</code>.</p><p><div class="alert-container" severity="warning"><p>Pour <a href="https://github.com/cookpad/omniauth-rails_csrf_protection" target="_blank" rel="noreferrer noopener">prévenir les requêtes d’authentification falsifiées</a>, utilisez les méthodes d’assistance <code>link_to</code> ou <code>button_to</code> avec la méthode <code>:post</code>.</p></div></p><p><pre><code class="language-ruby">&lt;!-- Place a login button anywhere on your application --&gt;

\${ "<\%= button_to 'Login', '/auth/auth0', method: :post %>" }

</code></pre>

</p><p><div class="checkpoint">Démarrage rapide Ruby on Rails - Étape 7 - Point de contrôle <div class="checkpoint-default"><p>Ajoutez un bouton à votre application qui redirige l’utilisateur vers le point de terminaison <code>/auth/auth0</code> lorsqu’il est sélectionné. Observez si vous êtes redirigé vers Auth0 pour vous connecter, puis renvoyé vers votre application après une authentification réussie.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>Assurez-vous que les bonnes URL ont été définies dans votre application Auth0 conformément à la première étape de ce démarrage rapide</p></li><li><p>Vérifiez que toutes les gems requis sont correctement installés</p></li><li><p>Vérifiez que les routes ont été configurées et que la configuration Auth0 a été définie dans votre application</p></li><li><p><a href="https://manage.auth0.com/#/logs" target="_blank" rel="noreferrer noopener">Consultez les journaux</a> pour y trouver d’autres erreurs ou messages qui auraient pu empêcher la connexion de fonctionner</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>

## Ajoutez une fonctionnalité de déconnexion à votre application


<p>Maintenant que vous pouvez vous connecter à votre application Rails, vous avez besoin d’un <a data-contentfulid="FhVnaWoVSOQXM0Uxq1nre-fr-CA">moyen de vous déconnecter</a>. Déconnectez un utilisateur en le redirigeant vers l’action <code>auth/logout</code> qui le redirige vers le point de terminaison de déconnexion d’Auth0.</p><p><div class="alert-container" severity="default"><p>Pour tester cela après l’étape précédente, vous devez peut-être effacer votre session, puis rediriger l’utilisateur vers le point de terminaison de déconnexion d’Auth0.</p></div></p><p><pre><code class="language-ruby">&lt;!-- Place a logout button anywhere on your application --&gt;

\${"<%= button_to 'Logout', 'auth/logout', method: :get %>"}

</code></pre>

</p><p><div class="checkpoint">Démarrage rapide Ruby on Rails – Étape 8 – Point de contrôle <div class="checkpoint-default"><p>Ajoutez un bouton à votre application qui redirige l’utilisateur vers le point de terminaison <code>/auth/logout</code> lorsqu’il est sélectionné. Vérifiez que vous êtes redirigé vers Auth0, puis renvoyé rapidement vers votre application, et que vous n’êtes plus connecté.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>Assurez-vous que les bonnes URL ont été définies dans votre client Auth0 conformément à la première étape de ce démarrage rapide</p></li><li><p>Vérifiez que les routes ont été configurées et que la configuration Auth0 a été définie dans votre application</p></li><li><p><a href="https://manage.auth0.com/#/logs" target="_blank" rel="noreferrer noopener">Consultez les journaux</a> pour toute autre erreur ou message qui aurait pu empêcher la connexion</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>

## Afficher les informations du profil utilisateur {{{ data-action="code" data-code="routes.rb" }}}


<p>Pour afficher le profil utilisateur, votre application doit fournir une route protégée. Vous pouvez utiliser une <a href="https://guides.rubyonrails.org/getting_started.html#using-concerns" target="_blank" rel="noreferrer noopener">préoccupation</a> pour contrôler l’accès aux routes qui peuvent être partagées entre plusieurs contrôleurs. La préoccupation devrait rediriger automatiquement vers Auth0 lorsque l’utilisateur n’est pas authentifié. Au cas contraire, la préoccupation  devrait renvoyer le profil utilisateur actuel.</p><p>Une fois que vous avez une préoccupation, incluez-la dans tout contrôleur qui nécessite un utilisateur connecté. Vous pouvez ensuite accéder à l’utilisateur à partir de la session <code>session[:userinfo]</code> comme dans l’exemple suivant :</p><p><pre><code class="language-ruby">class DashboardController &lt; ApplicationController

  include Secured



  def show

    @user = session[:userinfo]

  end

end

</code></pre>

</p><p>Une fois que l’utilisateur a chargé la session, utilisez-la pour afficher des informations dans votre système frontal :</p><p><pre><code class="language-xml">&lt;div&gt;

  &lt;p&gt;Normalized User Profile:\${"<%= JSON.pretty_generate(@user[:info])%>"}&lt;/p&gt;

  &lt;p&gt;Full User Profile:\${"<%= JSON.pretty_generate(@user[:extra][:raw_info])%>"}&lt;/p&gt;

&lt;/div&gt;

</code></pre>

</p><p><div class="checkpoint">Démarrage rapide Ruby on Rails – Étape 9 – Point de contrôle <div class="checkpoint-default"><p>Ajoutez le concern <code>Secured</code> à votre application, puis incluez-le dans le contrôleur qui nécessite un utilisateur authentifié pour y accéder. Vérifiez qu’un utilisateur authentifié a accès aux actions de ce contrôleur et que les utilisateurs non authentifiés sont redirigés vers Auth0 pour l’authentification.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>
