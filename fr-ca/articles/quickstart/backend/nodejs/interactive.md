---
title: Ajouter une autorisation à votre application API Express.js
description: Ce guide explique comment intégrer Auth0 à n’importe quelle application API Express.js, nouvelle ou existante, en utilisant le package express-oauth2-jwt-bearer.
interactive:  true
files:
 - files/server
github:
  path: 01-Authorization-RS256
locale: fr-CA
---

# Ajouter une autorisation à votre application API Express.js


<p>Ce guide explique comment intégrer Auth0 à n’importe quelle application API Express.js, nouvelle ou existante, en utilisant le package <code>express-oauth2-jwt-bearer</code>.</p><p>Si vous n’avez pas encore créé d’API dans votre Auth0 Dashboard, utilisez le sélecteur interactif pour créer une nouvelle API Auth0 ou sélectionner une API existante pour votre projet.</p><p>Pour configurer votre première API via Auth0 Dashboard, consultez <a href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis" target="_blank" >notre guide de démarrage</a>. Chaque API Auth0 utilise l’identificateur API, dont votre application a besoin pour valider le jeton d’accès.</p><p><div class="alert-container" severity="default"><p><b>Vous ne connaissez pas Auth0?</b> Découvrez <a href="https://auth0.com/docs/overview" target="_blank" >Auth0</a> et <a href="https://auth0.com/docs/api-auth" target="_blank" >l’implémentation de l’authentification et de l’autorisation d’API</a> en utilisant le cadre d’applications OAuth 2.0.</p></div></p><p></p>

## Définir les autorisations


<p>Les autorisations vous permettent de définir comment les ressources peuvent être accessibles au nom de l’utilisateur avec un jeton d’accès donné. Par exemple, vous pouvez choisir d’accorder un accès en lecture à la ressource <code>messages</code> si les utilisateurs ont le niveau d’accès gestionnaire et un accès en écriture à cette ressource s’ils ont le niveau d’accès administrateur.</p><p>Vous pouvez définir les autorisations autorisées dans la vue <b>Permissions (Autorisations)</b> de la section <a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">API</a> d’Auth0 Dashboard.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/5EnGfdqLVZ8fuIxbUn7gm1/41998b8778fe7ad02b23131643b5ba95/Quickstarts_API_-_Permissions.png" alt="null" /><p><div class="alert-container" severity="default"><p>Cet exemple utilise la permission <code>read:messages</code>.</p></div></p>

## Installer les dépendances


<p>Tout d’abord, installez la trousse SDK avec <code>npm</code>.</p><p><pre><code class="language-powershell">npm install --save express-oauth2-jwt-bearer

</code></pre>

</p>

## Configurer l’intergiciel {{{ data-action="code" data-code="server.js#1:10" }}}


<p>Configurez <code>express-oauth2-jwt-bearer</code> avec votre domaine et votre identificateur API.</p><p>L’intergiciel <code>checkJwt</code> présenté à droite vérifie si le jeton d’accès de l’utilisateur inclus dans la demande est valide. Si le jeton n’est pas valide, l’utilisateur reçoit une erreur « 401 Authorization » (Autorisation 401) lorsqu’il tente d’accéder aux points de terminaison.</p><p>L’intergiciel ne vérifie pas si le jeton dispose d’une permission suffisante pour accéder aux ressources demandées.</p>

## Protéger les points de terminaison des API {{{ data-action="code" data-code="server.js#12:32" }}}


<p>Pour protéger une route individuelle en exigeant un JWT valide, configurez la route avec le logiciel médiateur <code>checkJwt</code> développé à partir de <code>express-oauth2-jwt-bearer</code>.</p><p>Vous pouvez configurer des routes individuelles pour qu’elles recherchent une permission particulière. Pour ce faire, configurez un autre logiciel médiateur avec la méthode <code>requiresScope</code>. Fournissez les permissions requises et appliquez le logiciel médiateur à toutes les routes auxquelles vous souhaitez ajouter une autorisation.</p><p>Transmettez les logiciels médiateurs <code>checkJwt</code> et <code>requiredScopes</code> à la route que vous souhaitez protéger.</p><p>Dans cette configuration, seuls les jetons d’accès avec la permission <code>read:messages</code> peuvent accéder au point de terminaison.</p><h3>Faire un appel à votre API</h3><p>Pour appeler votre API, vous avez besoin d’un jeton d’accès. Vous pouvez obtenir un jeton d’accès à des fins de test dans la vue <b>Test</b> dans vos <a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">API settings (Paramètres API)</a>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/5HUMcKGXoNOvdJNXFI73oi/46c9a2dff462708e855bc1073e601f80/Tokens_-_French.png" alt="null" /><p>Fournir le Jeton d’accès comme un en-tête <code>Authorization</code> dans vos demandes.</p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#2e0efa174f464a16b03d37d39325db02_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#2e0efa174f464a16b03d37d39325db02_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#2e0efa174f464a16b03d37d39325db02_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#2e0efa174f464a16b03d37d39325db02_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#2e0efa174f464a16b03d37d39325db02_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#2e0efa174f464a16b03d37d39325db02_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#2e0efa174f464a16b03d37d39325db02_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#2e0efa174f464a16b03d37d39325db02_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#2e0efa174f464a16b03d37d39325db02_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#2e0efa174f464a16b03d37d39325db02_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="2e0efa174f464a16b03d37d39325db02_shell"><pre><code class="language-text no-lines">curl --request get \

  --url http:///%7ByourDomain%7D/api_path \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'</code></pre></div><div role="tabpanel" class="tab-pane " id="2e0efa174f464a16b03d37d39325db02_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;http:///%7ByourDomain%7D/api_path&quot;);

var request = new RestRequest(Method.GET);

request.AddHeader(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="2e0efa174f464a16b03d37d39325db02_go"><pre><code class="language-go no-lines">package main



import (

 &quot;fmt&quot;

 &quot;net/http&quot;

 &quot;io/ioutil&quot;

)



func main() {



 url := &quot;http:///%7ByourDomain%7D/api_path&quot;



 req, _ := http.NewRequest(&quot;get&quot;, url, nil)



 req.Header.Add(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;)



 res, _ := http.DefaultClient.Do(req)



 defer res.Body.Close()

 body, _ := ioutil.ReadAll(res.Body)



 fmt.Println(res)

 fmt.Println(string(body))



}</code></pre></div><div role="tabpanel" class="tab-pane " id="2e0efa174f464a16b03d37d39325db02_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.get(&quot;http:///%7ByourDomain%7D/api_path&quot;)

  .header(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="2e0efa174f464a16b03d37d39325db02_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'get',

  url: 'http:///%7ByourDomain%7D/api_path',

  headers: {authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="2e0efa174f464a16b03d37d39325db02_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



NSDictionary *headers = @{ @&quot;authorization&quot;: @&quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot; };



NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@&quot;http:///%7ByourDomain%7D/api_path&quot;]

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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="2e0efa174f464a16b03d37d39325db02_php"><pre><code class="language-php no-lines">$curl = curl_init();



curl_setopt_array($curl, [

  CURLOPT_URL =&gt; &quot;http:///%7ByourDomain%7D/api_path&quot;,

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

}</code></pre></div><div role="tabpanel" class="tab-pane " id="2e0efa174f464a16b03d37d39325db02_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPConnection(&quot;&quot;)



headers = { 'authorization': &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot; }



conn.request(&quot;get&quot;, &quot;%7ByourDomain%7D/api_path&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="2e0efa174f464a16b03d37d39325db02_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'



url = URI(&quot;http:///%7ByourDomain%7D/api_path&quot;)



http = Net::HTTP.new(url.host, url.port)



request = Net::HTTP::Get.new(url)

request[&quot;authorization&quot;] = 'Bearer YOUR_ACCESS_TOKEN_HERE'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="2e0efa174f464a16b03d37d39325db02_swift"><pre><code class="language-swift no-lines">import Foundation



let headers = [&quot;authorization&quot;: &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;]



let request = NSMutableURLRequest(url: NSURL(string: &quot;http:///%7ByourDomain%7D/api_path&quot;)! as URL,

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



</p><p><div class="checkpoint">API Node JS - Étape 4 - Point de contrôle <div class="checkpoint-default"><p>Maintenant que vous avez configuré votre application, exécutez-la pour vérifier que :</p><ul><li><p><code>GET /api/public</code> est disponible pour les demandes non authentifiées.</p></li><li><p><code>GET /api/private</code> est disponible pour les demandes authentifiées.</p></li><li><p><code>GET /api/private-scoped</code> est disponible pour les demandes authentifiées contenant un jeton d’accès avec la permission <code>read:messages</code>.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Si votre application n’a pas démarré avec succès :</p><ul><li><p>Vérifiez que vous avez ajouté le jeton en tant qu’en-tête d&#39;<code>autorisation</code></p></li><li><p>Assurez-vous que le jeton est doté des permissions appropriées. Vérifiez avec <a href="https://jwt.io/" target="_blank" rel="noreferrer noopener">jwt.io</a>.</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p>
