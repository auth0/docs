---
title: Ajouter une autorisation à votre application API Django
description: Ce tutoriel explique comment ajouter une autorisation à une API Python développée avec Django.
interactive:  true
files:
 - files/apiexample/validator
 - files/apiexample/views
 - files/apiexample/urls
github:
  path: https://github.com/auth0-samples/auth0-django-api/tree/master/01-Authorization
locale: fr-CA
---

# Ajouter une autorisation à votre application API Django


<p>Ce guide explique comment intégrer Auth0 à n’importe quelle API Python, nouvelle ou ancienne, développée avec <a href="https://www.djangoproject.com/">Django</a>.</p><p>Si vous n’avez pas encore créé d’API dans votre Auth0 Dashboard, vous pouvez utiliser le sélecteur interactif pour créer une nouvelle API Auth0 ou sélectionner une API existante qui représente le projet avec lequel vous souhaitez vous intégrer.</p><p>Vous pouvez également lire notre <a data-contentfulid="450QmC9wuUtjlt8UQzRgPd-fr-CA">guide de démarrage</a>, qui vous aidera à configurer votre première API via Auth0 Dashboard.</p><p>Toute API dans Auth0 est configurée à l’aide d’un identifiant d’API que votre code d’application utilisera comme Audience pour valider le jeton d’accès.</p><p><div class="alert-container" severity="default"><p><b>Vous ne connaissez pas Auth0 ?</b> Découvrez <a data-contentfulid="43RIpZkDhzyy40WfzZvz4y-fr-CA">Auth0</a> et <a data-contentfulid="6eZFaxxcNpFYwyEI05AXXA-fr-CA">l’implémentation de l’authentification et de l’autorisation d’API</a> en utilisant le cadre d&#39;applications OAuth 2.0.</p></div></p><p></p>

## Définir les autorisations


<p>Les autorisations vous permettent de définir comment les ressources peuvent être accessibles au nom de l’utilisateur avec un jeton d’accès donné. Par exemple, vous pouvez choisir d’accorder un accès en lecture à la ressource <code>messages</code> si les utilisateurs ont le niveau d’accès gestionnaire et accorder un accès en écriture à cette ressource s’ils ont le niveau d’accès administrateur.</p><p>Vous pouvez définir les autorisations autorisées dans la vue <b>Permissions (Autorisations)</b> de la section <a href="https://manage.auth0.com/#/apis">API</a> du Auth0 Dashboard. L’exemple suivant utilise la permission <code>read:messages</code>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/677a3405b2853f5fdf9e42f6e83ceba7/Quickstarts_API_-_French.png" alt="Auth0 Dashboard> Applications > APIs (API) > [Specific API (API précise)] > Onglet Permissions (Autorisations)" /><p></p>

## Configurer Django pour utiliser Auth0


<h3>Installez des dépendances</h3><ol><li><p>Ajoutez les dépendances suivantes à votre <code>requirements.txt</code> :

</p></li><li><p>Exécutez <code>pip install -r requirements.txt</code></p></li></ol><h3>Créez une application Django</h3><p></p><p></p>

## Créer le validateur JWT {{{ data-action="code" data-code="apiexample/validator.py" }}}


<p>Vous utiliserez une bibliothèque appelée <a href="https://github.com/lepture/authlib">Authlib</a> pour créer un <a href="https://docs.authlib.org/en/latest/flask/1/resource-server.html">ResourceProtector</a>, qui est un type de <a href="https://docs.djangoproject.com/en/4.0/topics/http/decorators/">Django view decorator (Décorateur de vue Django)</a> qui protège vos ressources (vues API) avec un validateur donné.</p><p>Le validateur vérifiera le jeton d’accès que vous passez à la ressource en vérifiant qu’il a une signature et des demandes valides.</p><p>Vous pouvez utiliser le validateur <code>JWTBearerTokenValidator</code> d’AuthLib avec quelques ajustements pour vous assurer qu’il est conforme à nos exigences de <a href="https://auth0.com/docs/secure/tokens/access-tokens/validate-access-tokens">validation des jetons d’accès</a>.</p><p>Pour créer votre <code>Auth0JWTBearerTokenValidator</code>, vous devez le passer à votre <code>domaine</code> et à votre <code>public</code> (Identificateur API). Il obtiendra alors la clé publique nécessaire pour vérifier la signature du jeton et la passera à la classe <code>JWTBearerTokenValidator</code>.</p><p>Vous remplacerez ensuite les <code>claims_options</code> de la classe pour vous assurer que les demandes <code>expiry</code>, <code>audience</code> et <code>issue</code> du jeton sont validées selon nos exigences.</p><p>Créez le fichier <code>apiexample/validator.py</code> en utilisant le code du panneau interactif.</p>

## Créer les vues API {{{ data-action="code" data-code="apiexample/views.py" }}}


<p>Ensuite, vous allez créer trois vues API dans <code>apiexample/views.py</code> :</p><ul><li><p><code>/api/public</code> : point de terminaison public qui ne nécessite aucune authentification.</p></li><li><p><code>/api/private</code> : point de terminaison privé qui nécessite un JWT de jeton d’accès valide.</p></li><li><p><code>/api/private-scoped</code> : termpoint de terminaison inal privé qui nécessite un JWT de jeton d’accès valide contenant la <code>scope</code> donnée.</p></li></ul><p>Les routes protégées auront un &quot;decorator&quot; <code>require_auth</code>, qui est un <code>ResourceProtector</code> qui utilise le <code>Auth0JWTBearerTokenValidator</code> que vous avez créé précédemment.</p><p>Pour créer le <code>Auth0JWTBearerTokenValidator</code>, vous devez le transmettre au domaine de votre locataire et à l’identificateur de l’API que vous avez créé précédemment.</p><p>Le decorator <code>require_auth</code> sur la route <code>private_scoped</code> prend en charge un argument supplémentaire <code>&quot;read:messages&quot;</code> qui vérifie la permission du jeton d’accès que vous avez créé précédemment.</p>

## Ajouter des mappages d’URL {{{ data-action="code" data-code="apiexample/urls.py#8:10" }}}


<p>Dans les étapes précédentes, vous avez ajouté des méthodes au fichier <code>views.py</code> . Mappez à présent ces méthodes aux URL en utilisant le <a href="https://docs.djangoproject.com/en/4.0/topics/http/urls/">URL Dispatcher (Répartiteur d’URL)</a> de Django, qui vous permet de mapper les modèles d’URL aux vues.</p><p>Ajoutez les modèles d’URL à votre fichier <code>apiexample/urls.py</code>.</p><h3>Faites un appel à votre API</h3><p>Pour appeler votre API, vous aurez besoin d’un jeton d’accès. Vous pouvez récupérer un jeton d’accès à des fins de test dans la vue <b>Test</b> dans vos <a href="https://manage.auth0.com/#/apis">API Settings (Paramètres API)</a>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/6jeVBuypOGX5qMRXeJn5ow/8aa621c6d95e3f21115493a19ab05f7a/Quickstart_Example_App_-_API.png" alt="Auth0 Dashboard> Applications > API > [API specifique] > Onglet Test" /><p>Fournissez le jeton d’accès comme en-tête <code>Authorization</code> dans vos requêtes.</p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#8a33e455b8ff47d8967c5e5b45ec0fde_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#8a33e455b8ff47d8967c5e5b45ec0fde_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#8a33e455b8ff47d8967c5e5b45ec0fde_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#8a33e455b8ff47d8967c5e5b45ec0fde_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#8a33e455b8ff47d8967c5e5b45ec0fde_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#8a33e455b8ff47d8967c5e5b45ec0fde_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#8a33e455b8ff47d8967c5e5b45ec0fde_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#8a33e455b8ff47d8967c5e5b45ec0fde_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#8a33e455b8ff47d8967c5e5b45ec0fde_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#8a33e455b8ff47d8967c5e5b45ec0fde_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="8a33e455b8ff47d8967c5e5b45ec0fde_shell"><pre><code class="language-text no-lines">curl --request get \

  --url 'http:///${account.namespace}.com/api_path' \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'</code></pre></div><div role="tabpanel" class="tab-pane " id="8a33e455b8ff47d8967c5e5b45ec0fde_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;http:///${account.namespace}.com/api_path&quot;);

var request = new RestRequest(Method.GET);

request.AddHeader(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="8a33e455b8ff47d8967c5e5b45ec0fde_go"><pre><code class="language-go no-lines">package main



import (

 &quot;fmt&quot;

 &quot;net/http&quot;

 &quot;io/ioutil&quot;

)



func main() {



 url := &quot;http:///${account.namespace}.com/api_path&quot;



 req, _ := http.NewRequest(&quot;get&quot;, url, nil)



 req.Header.Add(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;)



 res, _ := http.DefaultClient.Do(req)



 defer res.Body.Close()

 body, _ := ioutil.ReadAll(res.Body)



 fmt.Println(res)

 fmt.Println(string(body))



}</code></pre></div><div role="tabpanel" class="tab-pane " id="8a33e455b8ff47d8967c5e5b45ec0fde_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.get(&quot;http:///${account.namespace}.com/api_path&quot;)

  .header(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="8a33e455b8ff47d8967c5e5b45ec0fde_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'get',

  url: 'http:///${account.namespace}.com/api_path',

  headers: {authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="8a33e455b8ff47d8967c5e5b45ec0fde_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



NSDictionary *headers = @{ @&quot;authorization&quot;: @&quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot; };



NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@&quot;http:///${account.namespace}.com/api_path&quot;]

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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="8a33e455b8ff47d8967c5e5b45ec0fde_php"><pre><code class="language-php no-lines">$curl = curl_init();



curl_setopt_array($curl, [

  CURLOPT_URL =&gt; &quot;http:///${account.namespace}.com/api_path&quot;,

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

}</code></pre></div><div role="tabpanel" class="tab-pane " id="8a33e455b8ff47d8967c5e5b45ec0fde_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPConnection(&quot;&quot;)



headers = { 'authorization': &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot; }



conn.request(&quot;get&quot;, &quot;/${account.namespace}.com/api_path&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="8a33e455b8ff47d8967c5e5b45ec0fde_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'



url = URI(&quot;http:///${account.namespace}.com/api_path&quot;)



http = Net::HTTP.new(url.host, url.port)



request = Net::HTTP::Get.new(url)

request[&quot;authorization&quot;] = 'Bearer YOUR_ACCESS_TOKEN_HERE'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="8a33e455b8ff47d8967c5e5b45ec0fde_swift"><pre><code class="language-swift no-lines">import Foundation



let headers = [&quot;authorization&quot;: &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;]



let request = NSMutableURLRequest(url: NSURL(string: &quot;http:///${account.namespace}.com/api_path&quot;)! as URL,

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



</p><p></p>
