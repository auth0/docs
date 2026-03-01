---
title: Ajouter une autorisation à votre application API Flask
description: Ce guide explique comment intégrer Auth0 à n’importe quelle API Python, nouvelle ou ancienne, développée avec Flask.
interactive:  true
files:
 - files/validator
 - files/server
github:
  path: 00-Starter-Seed
locale: fr-CA
---

# Ajouter une autorisation à votre application API Flask


<p>Ce guide explique comment intégrer Auth0 à n’importe quelle API Python, nouvelle ou ancienne, développée avec <a href="https://flask.palletsprojects.com/" target="_blank" rel="noreferrer noopener">Flask</a>.</p><p>Si vous n’avez pas encore créé d’API dans votre Auth0 Dashboard, vous pouvez utiliser le sélecteur interactif pour créer une nouvelle API Auth0 ou sélectionner une API existante qui représente le projet avec lequel vous souhaitez vous intégrer.</p><p>Vous pouvez également lire <a href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis" target="_blank" >notre guide de démarrage</a> qui vous aide à configurer votre première API via Auth0 Dashboard.</p><p>Toute API dans Auth0 est configurée à l’aide d’un identificateur d’API que votre code d’application utilisera comme Audience (Public) pour valider le jeton d’accès.</p><p><div class="alert-container" severity="default"><p><b>Vous ne connaissez pas Auth0?</b> Découvrez <a href="https://auth0.com/docs/overview" target="_blank" >Auth0</a> et <a href="https://auth0.com/docs/api-auth" target="_blank" >l’implémentation de l’authentification et de l’autorisation d’API</a> en utilisant le cadre d’applications OAuth 2.0.</p></div></p><p></p>

## Définir les autorisations


<p>Les autorisations vous permettent de définir comment les ressources peuvent être accessibles au nom de l’utilisateur avec un jeton d’accès en particulier. Par exemple, vous pouvez choisir d’accorder un accès en lecture à la ressource <code>messages</code> si les utilisateurs ont le niveau d’accès gestionnaire et un accès en écriture à cette ressource s’ils ont le niveau d’accès administrateur.</p><p>Vous pouvez définir les autorisations autorisées dans la vue <b>Permissions (Autorisations)</b> de la section <a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">APIs (API)</a> d&#39;Auth0 Dashboard.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/677a3405b2853f5fdf9e42f6e83ceba7/Quickstarts_API_-_French.png" alt="Auth0 Dashboard> Applications > APIs (API) > [Specific API (API précise)] > Onglet Permissions (Autorisations)" /><p><div class="alert-container" severity="default"><p>Cet exemple utilise la permission <code>read:messages</code>.</p></div></p>

## Installer des dépendances


<p>Ajoutez les dépendances suivantes à votre fichier <code>requirements.txt</code> :</p><p><pre><code class="language-powershell"># /requirements.txt



    flask

    Authlib

</code></pre>

</p>

## Créer le validateur JWT {{{ data-action="code" data-code="validator.py" }}}


<p>Nous allons utiliser une bibliothèque appelée <a href="https://github.com/lepture/authlib" target="_blank" rel="noreferrer noopener">Authlib</a> pour créer un <a href="https://docs.authlib.org/en/latest/flask/1/resource-server.html" target="_blank" rel="noreferrer noopener">ResourceProtector</a>, qui est un type de <a href="https://flask.palletsprojects.com/patterns/viewdecorators/" target="_blank" rel="noreferrer noopener">Flask decorator</a> qui protège nos ressources (routes API) avec un validateur donné.</p><p>Le validateur validera le jeton d’accès que nous transmettons à la ressource en vérifiant qu’il a une signature et des demandes valides.</p><p>Nous pouvons utiliser le validateur <code>JWTBearerTokenValidator</code> d’AuthLib avec quelques ajustements pour nous assurer qu’il est conforme à nos exigences de <a href="https://auth0.com/docs/secure/tokens/access-tokens/validate-access-tokens" target="_blank" >validation des jetons d’accès</a>.</p><p>Pour créer notre <code>Auth0JWTBearerTokenValidator</code>, nous devons lui transmettre notre <code>domain</code> et notre <code>audience</code> (Identificateur API). Il obtiendra alors la clé publique nécessaire pour vérifier la signature du jeton et la transmettra à la classe <code>JWTBearerTokenValidator</code>.</p><p>Nous remplacerons ensuite les <code>claims_options</code> de la classe pour nous assurer que les demandes d’échéance, de public et d’émission du jeton sont validées selon nos exigences.</p>

## Créer une application Flask {{{ data-action="code" data-code="server.py" }}}


<p>Ensuite, nous allons créer une application Flask avec 3 routes API :</p><ul><li><p><code>/api/public </code>Un point de terminaison public qui ne nécessite aucune authentification.</p></li><li><p><code>/api/private </code>Un point de terminaison privé qui nécessite un jeton d’accès JWT valide.</p></li><li><p><code>/api/private-scoped </code>Un point de terminaison privé qui nécessite un jeton d’accès JWT valide contenant la <code>scope</code> donnée.</p></li></ul><p>Les routes protégées auront un décorateur <code>require_auth</code>, qui est un <code>ResourceProtector</code> qui utilise le <code>Auth0JWTBearerTokenValidator</code> que nous avons créé précédemment.</p><p>Pour créer <code>Auth0JWTBearerTokenValidator</code>, nous devons lui transmettre le domaine de notre locataire et l’identificateur de l’API que nous avons créée précédemment.</p><p>Le decorator <code>require_auth</code> sur la route <code>private_scoped</code> prend en charge un argument supplémentaire <code>&quot;read:messages&quot;</code>, qui vérifie la permission du jeton d’accès que nous avons créé précédemment.</p><h3>Faire un appel à votre API</h3><p>Pour appeler votre API, vous avez besoin d’un jeton d’accès. Vous pouvez obtenir un jeton d’accès à des fins de test dans la vue <b>Test</b> dans vos <a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">API settings (Paramètres API)</a>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/6jeVBuypOGX5qMRXeJn5ow/8aa621c6d95e3f21115493a19ab05f7a/Quickstart_Example_App_-_API.png" alt="Auth0 Dashboard> Applications > API > [API specifique] > Onglet Test" /><p>Fournir le jeton d’accès comme un en-tête <code>Authorization</code> dans vos demandes.</p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#932791437b3a4a1fa7e7e06376be8773_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#932791437b3a4a1fa7e7e06376be8773_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#932791437b3a4a1fa7e7e06376be8773_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#932791437b3a4a1fa7e7e06376be8773_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#932791437b3a4a1fa7e7e06376be8773_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#932791437b3a4a1fa7e7e06376be8773_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#932791437b3a4a1fa7e7e06376be8773_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#932791437b3a4a1fa7e7e06376be8773_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#932791437b3a4a1fa7e7e06376be8773_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#932791437b3a4a1fa7e7e06376be8773_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="932791437b3a4a1fa7e7e06376be8773_shell"><pre><code class="language-text no-lines">curl --request get \

  --url 'http:///${account.namespace}/api_path' \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'</code></pre></div><div role="tabpanel" class="tab-pane " id="932791437b3a4a1fa7e7e06376be8773_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;http:///${account.namespace}/api_path&quot;);

var request = new RestRequest(Method.GET);

request.AddHeader(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="932791437b3a4a1fa7e7e06376be8773_go"><pre><code class="language-go no-lines">package main



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



}</code></pre></div><div role="tabpanel" class="tab-pane " id="932791437b3a4a1fa7e7e06376be8773_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.get(&quot;http:///${account.namespace}/api_path&quot;)

  .header(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="932791437b3a4a1fa7e7e06376be8773_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'get',

  url: 'http:///${account.namespace}/api_path',

  headers: {authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="932791437b3a4a1fa7e7e06376be8773_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="932791437b3a4a1fa7e7e06376be8773_php"><pre><code class="language-php no-lines">$curl = curl_init();



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

}</code></pre></div><div role="tabpanel" class="tab-pane " id="932791437b3a4a1fa7e7e06376be8773_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPConnection(&quot;&quot;)



headers = { 'authorization': &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot; }



conn.request(&quot;get&quot;, &quot;/${account.namespace}/api_path&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="932791437b3a4a1fa7e7e06376be8773_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'



url = URI(&quot;http:///${account.namespace}/api_path&quot;)



http = Net::HTTP.new(url.host, url.port)



request = Net::HTTP::Get.new(url)

request[&quot;authorization&quot;] = 'Bearer YOUR_ACCESS_TOKEN_HERE'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="932791437b3a4a1fa7e7e06376be8773_swift"><pre><code class="language-swift no-lines">import Foundation



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



</p>
