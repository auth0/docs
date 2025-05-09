---
title: Ajouter une autorisation à votre application Go
description: Ce tutoriel explique comment ajouter une autorisation à une API Go.
interactive:  true
files:
 - files/middleware/jwt
 - files/main
github:
  path: 01-Authorization-RS256
locale: fr-CA
---

# Ajouter une autorisation à votre application Go


<p>Ce guide explique comment intégrer Auth0 à n’importe quelle application API Go, nouvelle ou ancienne, en utilisant le package <a href="https://github.com/auth0/go-jwt-middleware" target="_blank" rel="noreferrer noopener">go-jwt-middleware</a>.</p><p>Si vous n’avez pas encore créé d’API dans votre Auth0 Dashboard, vous pouvez utiliser le sélecteur interactif pour créer une nouvelle API Auth0 ou sélectionner une API existante pour votre projet.</p><p>Pour configurer votre première API via Auth0 Dashboard, consultez notre <a data-contentfulid="450QmC9wuUtjlt8UQzRgPd-fr-CA">guide de démarrage</a>.</p><p>Chaque API Auth0 utilise l’identificateur API, dont votre application a besoin pour valider le jeton d’accès.</p><p><div class="alert-container" severity="default"><p><b>Vous ne connaissez pas Auth0 ?</b> Découvrez <a data-contentfulid="43RIpZkDhzyy40WfzZvz4y-fr-CA">Auth0</a> et <a data-contentfulid="6eZFaxxcNpFYwyEI05AXXA-fr-CA">l’implémentation de l’authentification et de l’autorisation d’API</a> en utilisant le cadre d’applications OAuth 2.0.</p></div></p><p></p>

## Définir les autorisations


<p>Les autorisations vous permettent de définir comment les ressources peuvent être accessibles au nom de l’utilisateur avec un jeton d’accès donné. Par exemple, vous pouvez choisir d’accorder un accès en lecture à la ressource <code>messages</code> si les utilisateurs ont le niveau d’accès gestionnaire et un accès en écriture à cette ressource s’ils ont le niveau d’accès administrateur.</p><p>Vous pouvez définir les autorisations autorisées dans la vue <b>Permissions (Autorisations)</b> de la section <a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">API</a> d’Auth0 Dashboard. L’exemple suivant utilise la permission <code>read:messages</code>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/677a3405b2853f5fdf9e42f6e83ceba7/Quickstarts_API_-_French.png" alt="Auth0 Dashboard> Applications > APIs (API) > [Specific API (API précise)] > Onglet Permissions (Autorisations)" /><p></p>

## Installer les dépendances


<p>Ajoutez un fichier <code>go.mod</code> pour répertorier toutes les dépendances nécessaires.</p><p><pre><code>// go.mod



module 01-Authorization-RS256



go 1.21



require (

	github.com/auth0/go-jwt-middleware/v2 v2.2.0

	github.com/joho/godotenv v1.5.1

)

</code></pre>

</p><p>Téléchargez les dépendances en exécutant la commande shell suivante :</p><p><pre><code>go mod download

</code></pre>

</p>

## Configuration de votre application


<p>Créez un fichier <code>.env</code> à la racine de votre répertoire de projet pour stocker la configuration de l’application. Renseignez ensuite les variables d’environnement :</p><p><pre><code># The URL of our Auth0 Tenant Domain.

# If you're using a Custom Domain, be sure to set this to that value instead.

AUTH0_DOMAIN='${account.namespace}'



# Our Auth0 API's Identifier.

AUTH0_AUDIENCE='${apiIdentifier}'

</code></pre>

</p>

## Créer un logiciel médiateur pour valider les jetons d’accès {{{ data-action="code" data-code="middleware/jwt.go" }}}


<p>La fonction de logiciel médiateur <code>EnsureValidToken</code> valide le jeton d’accès. Vous pouvez appliquer cette fonction à tous les points de terminaison que vous souhaitez protéger. Si le jeton est valide, le point de terminaison libère les ressources. Si le jeton n’est pas valide, l’API renvoie une erreur <code>401 Authorization (Autorisation 401)</code>.</p><p>Configurez le logiciel médiateur <b>go-jwt-middleware</b> pour vérifier les jetons d’accès des demandes entrantes.</p><p>Par défaut, votre API sera configurée pour utiliser RS256 comme algorithme de signature des jetons. Puisque RS256 fonctionne en utilisant une paire de clés privée/publique, les jetons peuvent être vérifiés par rapport à la clé publique pour votre compte Auth0. Cette clé publique est accessible à <a href="https://%7Byourdomain%7D/.well-known/jwks.json" target="_blank" rel="noreferrer noopener">https://{yourDomain}/.well-known/jwks.json</a>.</p><p>Inclure un mécanisme pour vérifier que le jeton a une <b>scope (permission)</b> suffisante pour accéder aux ressources demandées.</p><p>Créer une fonction <code>HasScope</code> pour vérifier et s’assurer que le jeton d’accès a la bonne permission avant de renvoyer une réponse réussie.</p>

## Protéger les points de terminaison des API {{{ data-action="code" data-code="main.go" }}}


<p>Dans cet exemple, vous allez créer un point de terminaison <code>/api/public</code> qui n’utilise pas le logiciel médiateur <code>EnsureToken</code> car il est accessible aux requêtes non authentifiées.</p><p>Créez un point de terminaison <code>/api/private</code> qui nécessite le logiciel médiateur <code>EnsureToken</code> car il n’est disponible que pour les requêtes authentifiées contenant un jeton d’accès, sans permission supplémentaire.</p><p>Créez un point de terminaison <code>/api/private</code> qui nécessite le logiciel médiateur <code>EnsureToken</code> et <code>HasScope</code> car il n’est disponible que pour les requêtes authentifiées contenant un jeton d’accès dont la permission <code>read:messages</code> est accordée.</p><p><div class="alert-container" severity="default"><p>Seule la portée <code>read:messages</code> est vérifiée par la fonction <code>HasScope</code>. Vous pouvez l’étendre ou en faire un logiciel médiateur autonome qui accepte plusieurs permissions pour s’adapter à votre cas d’utilisation.</p></div></p><h3>Faire un appel à votre API</h3><p>Pour appeler votre API, vous avez besoin d’un jeton d’accès. Vous pouvez obtenir un jeton d’accès à des fins de test dans la vue <b>Test</b> dans vos <a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">API settings (Paramètres API)</a>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/6jeVBuypOGX5qMRXeJn5ow/8aa621c6d95e3f21115493a19ab05f7a/Quickstart_Example_App_-_API.png" alt="Auth0 Dashboard> Applications > API > [API specifique] > Onglet Test" /><p>Fournissez le Jeton d’accès comme un en-tête <code>Authorization (Autorisation)</code> dans vos requêtes.</p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#8962f747767740d5ad5014a783b2f2bc_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#8962f747767740d5ad5014a783b2f2bc_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#8962f747767740d5ad5014a783b2f2bc_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#8962f747767740d5ad5014a783b2f2bc_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#8962f747767740d5ad5014a783b2f2bc_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#8962f747767740d5ad5014a783b2f2bc_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#8962f747767740d5ad5014a783b2f2bc_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#8962f747767740d5ad5014a783b2f2bc_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#8962f747767740d5ad5014a783b2f2bc_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#8962f747767740d5ad5014a783b2f2bc_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="8962f747767740d5ad5014a783b2f2bc_shell"><pre><code class="language-text no-lines">curl --request get \

  --url 'http:///${account.namespace}/api_path' \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'</code></pre></div><div role="tabpanel" class="tab-pane " id="8962f747767740d5ad5014a783b2f2bc_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;http:///${account.namespace}/api_path&quot;);

var request = new RestRequest(Method.GET);

request.AddHeader(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="8962f747767740d5ad5014a783b2f2bc_go"><pre><code class="language-go no-lines">package main



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



}</code></pre></div><div role="tabpanel" class="tab-pane " id="8962f747767740d5ad5014a783b2f2bc_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.get(&quot;http:///${account.namespace}/api_path&quot;)

  .header(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="8962f747767740d5ad5014a783b2f2bc_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'get',

  url: 'http:///${account.namespace}/api_path',

  headers: {authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="8962f747767740d5ad5014a783b2f2bc_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="8962f747767740d5ad5014a783b2f2bc_php"><pre><code class="language-php no-lines">$curl = curl_init();



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

}</code></pre></div><div role="tabpanel" class="tab-pane " id="8962f747767740d5ad5014a783b2f2bc_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPConnection(&quot;&quot;)



headers = { 'authorization': &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot; }



conn.request(&quot;get&quot;, &quot;/${account.namespace}/api_path&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="8962f747767740d5ad5014a783b2f2bc_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'



url = URI(&quot;http:///${account.namespace}/api_path&quot;)



http = Net::HTTP.new(url.host, url.port)



request = Net::HTTP::Get.new(url)

request[&quot;authorization&quot;] = 'Bearer YOUR_ACCESS_TOKEN_HERE'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="8962f747767740d5ad5014a783b2f2bc_swift"><pre><code class="language-swift no-lines">import Foundation



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



</p><p><div class="checkpoint">Démarrage rapide Go API - Étape 5 - Point de contrôle <div class="checkpoint-default"><p>Maintenant que vous avez configuré votre application, lancez votre application et vérifiez que :</p><ul><li><p><code>GET /api/public</code> est disponible pour les demandes non authentifiées.</p></li><li><p><code>GET /api/private</code> est disponible pour les demandes authentifiées.</p></li><li><p><code>GET /api/private-scoped</code> est disponible pour les demandes authentifiées contenant un jeton d’accès avec la permission <code>read:messages</code>.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Si votre application n’a pas démarré :</p><ul><li><p>Vérifiez que vous avez ajouté le jeton en tant qu’en-tête d&#39;<code>autorisation</code></p></li><li><p>Assurez-vous que le jeton est doté des permissions appropriées. Vérifiez avec <a href="https://jwt.io/" target="_blank" rel="noreferrer noopener">jwt.io</a>.</p></li></ul><p>Vous rencontrez toujours des problèmes? Consultez notre <a href="https://auth0.com/docs" target="_blank" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a> pour obtenir de l’aide.</p></div>

  </div></p><p></p>
