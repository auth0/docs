---
title: Ajouter une autorisation à votre API Ruby on Rails
description: Ce tutoriel effectue la validation des jetons d’accès en utilisant le gem jwt dans une classe Auth0Client personnalisée.
interactive:  true
files:
 - files/app/controllers/application_controller
 - files/app/lib/auth0_client
 - files/app/controllers/concerns/secured
 - files/app/controllers/public_controller
 - files/app/controllers/private_controller
github:
  path: 01-Authentication-RS256
locale: fr-CA
---

# Ajouter une autorisation à votre API Ruby on Rails


<p>Ce tutoriel effectue la validation des jetons d’accès en utilisant le gem <a href="https://github.com/jwt/ruby-jwt" target="_blank" rel="noreferrer noopener"><b>jwt</b></a> dans une classe <code>Auth0Client</code> personnalisée. Un concern appelé <code>Secured</code> est utilisé pour autoriser les points de terminaison qui nécessitent une authentification par le biais d’un jeton d’accès entrant.</p><p>Si vous n’avez pas encore créé d’API dans votre Auth0 Dashboard, vous pouvez utiliser le sélecteur interactif pour créer une nouvelle API Auth0 ou sélectionner une API existante pour votre projet.</p><p>Pour configurer votre première API via Auth0 Dashboard, consultez <a href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis" target="_blank" >notre guide de démarrage</a>.</p><p>Chaque API Auth0 utilise l’identificateur API, dont votre application a besoin pour valider le jeton d’accès.</p><p><div class="alert-container" severity="default"><p><b>Vous ne connaissez pas Auth0?</b> Découvrez <a href="https://auth0.com/docs/overview" target="_blank" >Auth0</a> et <a href="https://auth0.com/docs/api-auth" target="_blank" >l’implémentation de l’authentification et de l’autorisation d’API</a> en utilisant le cadre d’applications OAuth 2.0.</p></div></p><p></p>

## Définir les autorisations


<p>Les autorisations vous permettent de définir comment les ressources peuvent être accessibles au nom de l’utilisateur avec un jeton d’accès donné. Par exemple, vous pouvez choisir d’accorder un accès en lecture à la ressource <code>messages</code> si les utilisateurs ont le niveau d’accès gestionnaire et un accès en écriture à cette ressource s’ils ont le niveau d’accès administrateur.</p><p>Vous pouvez définir les autorisations autorisées dans la vue <b>Permissions (Autorisations)</b> de la section <a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">API</a> d’Auth0 Dashboard.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/677a3405b2853f5fdf9e42f6e83ceba7/Quickstarts_API_-_French.png" alt="Auth0 Dashboard> Applications > APIs (API) > [Specific API (API précise)] > Onglet Permissions (Autorisations)" /><p><div class="alert-container" severity="default"><p>Cet exemple utilise la permission <code>read:messages</code>.</p></div></p>

## Installer les dépendances


<p>Installer le gem <b>jwt</b>.</p><p><pre><code class="language-powershell">gem 'jwt'

    bundle install

</code></pre>

</p><p></p>

## Créer une classe Auth0Client {{{ data-action="code" data-code="app/controllers/concerns/secured.rb" }}}


<p>Créez une classe appelée <code>Auth0Client</code>. Cette classe décode et vérifie le jeton d’accès entrant provenant de l’en-tête <code>Authorization </code> de la requête.</p><p>La classe <code>Auth0Client</code> récupère la clé publique de votre locataire Auth0 et l’utilise pour vérifier la signature du jeton d’accès. La structure <code>Token</code> définit une méthode <code>validate_permissions</code> pour rechercher une <code>scope</code> particulière dans un jeton d’accès en fournissant un tableau des permissions requises et en vérifiant si elles sont présentes dans la charge utile du jeton.</p>

## Définir un concern Secured {{{ data-action="code" data-code="app/controllers/concerns/secured.rb" }}}


<p>Créez un concern appelé <code>Secured</code> qui recherche le jeton d’accès dans l’en-tête <code>Authorization</code> d’une requête entrante.</p><p>Si le jeton est présent, <code>Auth0Client.validate_token</code> utilisera le gem <code>jwt</code> pour vérifier la signature du jeton et valider les demandes du jeton.</p><p>Outre la vérification de la validité du jeton d’accès, concern possède un mécanisme permettant de confirmer que le jeton dispose d’une <b>permission</b> suffisante pour accéder aux ressources demandées. Dans cet exemple, nous définissons une méthode <code>validate_permissions</code> qui reçoit un bloc et vérifie les autorisations en appelant la méthode <code>Token.validate_permissions</code> de la classe <code>Auth0Client</code>.</p><p>Pour la route <code>/private-scoped</code>, les permissions définies seront croisées avec les permissions provenant de la charge utile, afin de déterminer si elle contient un ou plusieurs éléments de l’autre tableau.</p>

## Inclure la préoccupation Secure dans votre ApplicationController {{{ data-action="code" data-code="app/controllers/application_controller.rb" }}}


<p>En ajoutant la préoccupation <code>Secure</code> à votre contrôleur d’application, vous n’aurez plus qu’à utiliser un filtre <code>before_action</code> dans le contrôleur qui requiert une autorisation.</p>

## Créer le point de terminaison public {{{ data-action="code" data-code="app/controllers/public_controller.rb" }}}


<p>Créez un contrôleur pour gérer le point de terminaison public <code>/api/public</code>.</p><p>Le point de terminaison <code>/public</code> ne requiert aucune autorisation et aucune <code>before_action</code> n’est donc nécessaire.</p>

## Créer les points de terminaison privés {{{ data-action="code" data-code="app/controllers/private_controller.rb" }}}


<p>Créez un contrôleur pour traiter les points de terminaison privés : <code>/api/private</code> et <code>/api/private-scoped</code>.</p><p><code>/api/private</code> est disponible pour les requêtes authentifiées contenant un jeton d’accès sans permission supplémentaire.</p><p><code>/api/private-scoped</code> est disponible pour les requêtes authentifiées contenant un jeton d’accès dont la permission <code>read:messages</code> est accordée.</p><p>Les points de terminaison protégés doivent appeler la méthode <code>authorize</code> du concern <code>Secured</code>; vous devez pour cela utiliser <code>before_action :authorize</code>, ce qui assure que la méthode <code>Secured.authorize</code> est appelée avant chaque action dans le <code>PrivateController</code>.</p><h3>Faire un appel à votre API</h3><p>Pour appeler votre API, vous avez besoin d’un jeton d’accès. Vous pouvez obtenir un jeton d’accès à des fins de test dans la vue <b>Test</b> dans vos <a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">API settings (Paramètres API)</a>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/6jeVBuypOGX5qMRXeJn5ow/8aa621c6d95e3f21115493a19ab05f7a/Quickstart_Example_App_-_API.png" alt="Auth0 Dashboard> Applications > API > [API specifique] > Onglet Test" /><p>Fournissez le jeton d’accès comme un en-tête <code>Authorization</code> dans vos demandes.</p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#a9e4af0322f44c32b4373fa06b59e7ce_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#a9e4af0322f44c32b4373fa06b59e7ce_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#a9e4af0322f44c32b4373fa06b59e7ce_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#a9e4af0322f44c32b4373fa06b59e7ce_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#a9e4af0322f44c32b4373fa06b59e7ce_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#a9e4af0322f44c32b4373fa06b59e7ce_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#a9e4af0322f44c32b4373fa06b59e7ce_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#a9e4af0322f44c32b4373fa06b59e7ce_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#a9e4af0322f44c32b4373fa06b59e7ce_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#a9e4af0322f44c32b4373fa06b59e7ce_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="a9e4af0322f44c32b4373fa06b59e7ce_shell"><pre><code class="language-text no-lines">curl --request get \

  --url 'http:///${account.namespace}/api_path' \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'</code></pre></div><div role="tabpanel" class="tab-pane " id="a9e4af0322f44c32b4373fa06b59e7ce_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;http:///${account.namespace}/api_path&quot;);

var request = new RestRequest(Method.GET);

request.AddHeader(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="a9e4af0322f44c32b4373fa06b59e7ce_go"><pre><code class="language-go no-lines">package main



import (

 &quot;fmt&quot;

 &quot;net/http&quot;

 &quot;io/ioutil&quot;

)



func main() {



 url := &quot;http:///${account.namespace}/api_path&quot;



 req, _ := http.NewRequest(&quot;get&quot;, url, nil)



 req.Header.Add(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;)



 res, _ := http.DefaultClient.Do(req)



 defer res.Body.Close()

 body, _ := ioutil.ReadAll(res.Body)



 fmt.Println(res)

 fmt.Println(string(body))



}</code></pre></div><div role="tabpanel" class="tab-pane " id="a9e4af0322f44c32b4373fa06b59e7ce_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.get(&quot;http:///${account.namespace}/api_path&quot;)

  .header(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="a9e4af0322f44c32b4373fa06b59e7ce_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'get',

  url: 'http:///${account.namespace}/api_path',

  headers: {authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="a9e4af0322f44c32b4373fa06b59e7ce_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



NSDictionary *headers = @{ @&quot;authorization&quot;: @&quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot; };



NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@&quot;http:///${account.namespace}/api_path&quot;]

                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy

                                                   timeoutInterval:10.0];

[request setHTTPMethod:@&quot;get&quot;];

[request setAllHTTPHeaderFields:headers];



NSURLSession *session = [NSURLSession sharedSession];

NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request

                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {

                                                if (error) {

                                                    NSLog(@&quot;%@&quot;, error);

                                                } else {

                                                    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;

                                                    NSLog(@&quot;%@&quot;, httpResponse);

                                                }

                                            }];

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="a9e4af0322f44c32b4373fa06b59e7ce_php"><pre><code class="language-php no-lines">$curl = curl_init();



curl_setopt_array($curl, [

  CURLOPT_URL =&gt; &quot;http:///${account.namespace}/api_path&quot;,

  CURLOPT_RETURNTRANSFER =&gt; true,

  CURLOPT_ENCODING =&gt; &quot;&quot;,

  CURLOPT_MAXREDIRS =&gt; 10,

  CURLOPT_TIMEOUT =&gt; 30,

  CURLOPT_HTTP_VERSION =&gt; CURL_HTTP_VERSION_1_1,

  CURLOPT_CUSTOMREQUEST =&gt; &quot;get&quot;,

  CURLOPT_HTTPHEADER =&gt; [

    &quot;authorization: Bearer YOUR_ACCESS_TOKEN_HERE&quot;

  ],

]);



$response = curl_exec($curl);

$err = curl_error($curl);



curl_close($curl);



if ($err) {

  echo &quot;cURL Error #:&quot; . $err;

} else {

  echo $response;

}</code></pre></div><div role="tabpanel" class="tab-pane " id="a9e4af0322f44c32b4373fa06b59e7ce_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPConnection(&quot;&quot;)



headers = { 'authorization': &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot; }



conn.request(&quot;get&quot;, &quot;/${account.namespace}/api_path&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="a9e4af0322f44c32b4373fa06b59e7ce_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'



url = URI(&quot;http:///${account.namespace}/api_path&quot;)



http = Net::HTTP.new(url.host, url.port)



request = Net::HTTP::Get.new(url)

request[&quot;authorization&quot;] = 'Bearer YOUR_ACCESS_TOKEN_HERE'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="a9e4af0322f44c32b4373fa06b59e7ce_swift"><pre><code class="language-swift no-lines">import Foundation



let headers = [&quot;authorization&quot;: &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;]



let request = NSMutableURLRequest(url: NSURL(string: &quot;http:///${account.namespace}/api_path&quot;)! as URL,

                                        cachePolicy: .useProtocolCachePolicy,

                                    timeoutInterval: 10.0)

request.httpMethod = &quot;get&quot;

request.allHTTPHeaderFields = headers



let session = URLSession.shared

let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -&gt; Void in

  if (error != nil) {

    print(error)

  } else {

    let httpResponse = response as? HTTPURLResponse

    print(httpResponse)

  }

})



dataTask.resume()</code></pre></div></div></div>



</p><p><div class="checkpoint">Ruby on Rails - Étape 7- Point de contrôle <div class="checkpoint-default"><p>Maintenant que vous avez configuré votre application, exécutez-la pour vérifier que :</p><ul><li><p><code>GET /api/public</code> est disponible pour les demandes non authentifiées.</p></li><li><p><code>GET /api/private</code> est disponible pour les demandes authentifiées.</p></li><li><p><code>GET /api/private-scoped</code> est disponible pour les demandes authentifiées contenant un jeton d’accès avec la permission <code>read:messages</code>.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Si votre application n’a pas démarré avec succès :</p><ul><li><p>Vérifiez que vous avez ajouté le jeton en tant qu’en-tête d&#39;<code>autorisation</code></p></li><li><p>Assurez-vous que le jeton est doté des permissions appropriées. Vérifiez avec <a href="https://jwt.io/" target="_blank" rel="noreferrer noopener">jwt.io</a>.</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>
