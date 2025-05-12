---
title: Ajouter une autorisation à votre application API ASP.NET Core Web
description: Ce tutoriel explique comment ajouter une autorisation à une application API ASP.NET Core Web en utilisant le logiciel médiateur JWT standard.
interactive:  true
files:
 - files/appsettings
 - files/Program
 - files/HasScopeHandler
 - files/HasScopeRequirement
 - files/ApiController
github:
  path: Quickstart/01-Authorization
locale: fr-CA
---

# Ajouter une autorisation à votre application API ASP.NET Core Web


<p>Auth0 vous permet d’ajouter rapidement l’authentification et d’accéder aux informations relatives au profil de l’utilisateur dans presque tous les types d’applications. Ce guide explique comment intégrer Auth0 à n’importe quelle application API ASP.NET Web, nouvelle ou existante, à l’aide du package <code>Microsoft.AspNetCore.Authentication.JwtBearer</code> .</p><p>Si vous n’avez pas encore créé d’API dans votre Auth0 Dashboard, vous pouvez utiliser le sélecteur interactif pour créer une nouvelle API Auth0 ou sélectionner une API existante qui représente le projet avec lequel vous souhaitez effectuer l’intégration.</p><p>Vous pouvez également <a data-contentfulid="450QmC9wuUtjlt8UQzRgPd-fr-CA">consulter notre guide de démarrage</a>, qui vous aidera à configurer votre première API via Auth0 Dashboard.</p><p>Notez que chaque API dans Auth0 est configurée à l’aide d’un identifiant d’API; votre code d’application utilisera l’identifiant d’API comme Public pour valider le jeton d’accès.</p><p><div class="alert-container" severity="default"><p><b>Vous ne connaissez pas Auth0 ?</b> Découvrez <a data-contentfulid="43RIpZkDhzyy40WfzZvz4y-fr-CA">Auth0</a> et <a data-contentfulid="6eZFaxxcNpFYwyEI05AXXA-fr-CA">l’implémentation de l’authentification et de l’autorisation d’API</a> en utilisant le cadre d’applications OAuth 2.0.</p></div></p><p></p><p></p>

## Définir les autorisations


<p>Les autorisations vous permettent de définir comment les ressources peuvent être accessibles au nom de l’utilisateur avec un jeton d’accès donné. Par exemple, vous pouvez choisir d’accorder un accès en lecture à la ressource <code>messages</code> si les utilisateurs ont le niveau d’accès gestionnaire et accorder un accès en écriture à cette ressource s’ils ont le niveau d’accès administrateur.</p><p>Vous pouvez définir les autorisations autorisées dans la vue <b>Permissions (Autorisations)</b> de la section <a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">API</a> d’Auth0 Dashboard. L’exemple suivant utilise la permission <code>read:messages</code>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/677a3405b2853f5fdf9e42f6e83ceba7/Quickstarts_API_-_French.png" alt="Auth0 Dashboard> Applications > APIs (API) > [Specific API (API précise)] > Onglet Permissions (Autorisations)" /><p></p>

## Installer les dépendances


<p>Pour permettre à votre application de valider les jetons d’accès, ajoutez une référence au package NuGet <code>Microsoft.AspNetCore.Authentication.JwtBearer</code> :</p><p><pre><code class="language-powershell">Install-Package Microsoft.AspNetCore.Authentication.JwtBearer

</code></pre>

</p>

## Configurer le logiciel médiateur {{{ data-action="code" data-code="Program.cs" }}}


<p>Configurez le logiciel médiateur d’authentification dans le fichier <code>Program.cs</code> de votre application :</p><ol><li><p>Enregistrez les services d’authentification en appelant la méthode <code>AddAuthentication</code>. Configurez <code>JwtBearerDefaults.AuthenticationScheme</code> comme schéma par défaut.</p></li><li><p>Enregistrez le schéma d’authentification du porteur JWT en faisant un appel à la méthode <code>AddJwtBearer</code>. Configurez votre domaine Auth0 comme autorité et votre identifiant API Auth0 comme public, et assurez-vous que votre domaine Auth0 et votre identifiant API sont définis dans le fichier <b>appsettings.json</b> de votre application.

<div class="alert-container" severity="default"><p>Dans certains cas, le jeton d’accès n’aura pas de <code>sub</code> demande; dans ce cas, le nom <code>User.Identity.Name</code> sera <code>null</code>. Si vous souhaitez mapper une demande différente à <code>User.Identity.Name</code>, ajoutez-la aux <code>options.TokenValidationParameters</code> dans l’appel <code>AddJwtBearer()</code>.</p></div>.</p></li><li><p>Ajoutez l’authentification et l’autorisation de le logiciel médiateur au pipeline du logiciel médiateur en ajoutant des appels aux méthodes <code>UseAuthentication </code> et <code>UseAuthorization </code> sous la méthode <code>var app = builder.Build(); </code>.</p></li></ol><p></p><p></p>

## Valider les permissions {{{ data-action="code" data-code="HasScopeHandler.cs" }}}


<p>Pour s’assurer qu’un jeton d’accès contient les permissions adéquates, utilisez <a href="https://docs.microsoft.com/en-us/aspnet/core/security/authorization/policies" target="_blank" rel="noreferrer noopener">Policy-Based Authorization (Autorisation basée sur une politique)</a> dans ASP.NET Core :</p><ol><li><p>Créez une nouvelle exigence d’autorisation appelée <code>HasScopeRequirement</code>, qui vérifiera si la demande de <code>scope </code>émise par votre locataire Auth0 est présente et, le cas échéant, vérifiera que la demande contient la permission demandée.</p></li><li><p>Dans la méthode <code>var builder = WebApplication.CreateBuilder(args); </code> du fichier <code>Program.cs</code>, ajoutez un appel à la méthode <code>app.AddAuthorization</code>.</p></li><li><p>Ajoutez des politiques pour les permissions en appelant <code>AddPolicy </code> pour chaque permission.</p></li><li><p>Enregistrez un singleton pour la classe <code>HasScopeHandler</code>.</p></li></ol><p></p>

## Protéger les points de terminaison des API {{{ data-action="code" data-code="ApiController.cs" }}}


<p>Le logiciel médiateur JWT s’intègre aux mécanismes d’<a href="https://docs.microsoft.com/en-us/aspnet/core/security/authentication/" target="_blank" rel="noreferrer noopener">authentification</a> et d’<a href="https://docs.microsoft.com/en-us/aspnet/core/security/authorization/" target="_blank" rel="noreferrer noopener">autorisation</a> standard de ASP.NET Core.</p><p>Pour sécuriser un point de terminaison, ajoutez l’attribut <code>[Authorize]</code> à votre action de contrôleur (ou à tout le contrôleur si vous souhaitez protéger toutes ses actions).</p><p>Lors de la sécurisation des points de terminaison qui nécessitent des permissions particulières, assurez-vous que la bonne permission est présente dans <code>access_token</code>. Pour ce faire, ajoutez l’attribut <code>Authorize</code> à l’action <code>Scoped</code> et passez <code>read:messages</code> comme paramètre de la <code>policy</code>.</p>

## Appeler votre API


<p>La façon dont vous appelez votre API dépend du type d’application que vous développez et du cadre que vous utilisez. Pour en savoir plus, lire le Guide rapide de l’application concernée :</p><ul><li><p><a href="/quickstart/spa" target="_self" >Applications à page unique</a></p></li><li><p><a href="/quickstart/native" target="_self" >Application mobile/native</a></p></li></ul><h3>Obtenir un jeton d’accès</h3><p>Quel que soit le type d’application que vous développez ou le cadre que vous utilisez, vous aurez besoin d’un jeton d’accès pour appeler votre API.</p><p>Si vous appelez votre API à partir d’une application à page unique (SPA) ou native, vous recevrez un jeton d’accès une fois l’autorisation obtenue.</p><p>Si vous appelez l’API à partir d’un outil de ligne de commande ou d’un autre service sans identifiants utilisateur, utilisez le <a href="https://auth0.com/docs/api/authentication#client-credentials" target="_blank" >Flux des identifiants client d’OAuth</a>. Pour ce faire, enregistrez une <a href="https://manage.auth0.com/#/applications" target="_blank" rel="noreferrer noopener">Application de communication entre machines</a> et incluez les valeurs suivantes à votre requête :</p><ul><li><p><b>ID client</b> comme paramètre <code>client_id</code>.</p></li><li><p><b>Secret client</b> comme paramètre <code>client_secret</code>.</p></li><li><p><b>Identifiant API</b> (la même valeur utilisée pour configurer l’intergiciel plus tôt dans ce guide rapide) comme paramètre <code>audience</code>.</p></li></ul><p><div class="alert-container" severity="default"><p>Pour en savoir plus sur l’obtention de l’identificateur client et du secret client pour votre application de communication entre machines, lisez la section <a data-contentfulid="7wT5jc2JhV8eABLmTN4Dhe-en-US">Paramètres de l’application</a>.</p></div></p><p><b>Exemple de demande</b></p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#875b90eb2e6d4269b79931b5f099132b_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#875b90eb2e6d4269b79931b5f099132b_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#875b90eb2e6d4269b79931b5f099132b_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#875b90eb2e6d4269b79931b5f099132b_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#875b90eb2e6d4269b79931b5f099132b_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#875b90eb2e6d4269b79931b5f099132b_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#875b90eb2e6d4269b79931b5f099132b_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#875b90eb2e6d4269b79931b5f099132b_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#875b90eb2e6d4269b79931b5f099132b_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#875b90eb2e6d4269b79931b5f099132b_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="875b90eb2e6d4269b79931b5f099132b_shell"><pre><code class="language-text no-lines">curl --request post \

  --url 'https://${account.namespace}/oauth/token' \

  --header 'content-type: application/x-www-form-urlencoded'</code></pre></div><div role="tabpanel" class="tab-pane " id="875b90eb2e6d4269b79931b5f099132b_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;https://${account.namespace}/oauth/token&quot;);

var request = new RestRequest(Method.POST);

request.AddHeader(&quot;content-type&quot;, &quot;application/x-www-form-urlencoded&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="875b90eb2e6d4269b79931b5f099132b_go"><pre><code class="language-go no-lines">package main



import (

 &quot;fmt&quot;

 &quot;net/http&quot;

 &quot;io/ioutil&quot;

)



func main() {



 url := &quot;https://${account.namespace}/oauth/token&quot;



 req, _ := http.NewRequest(&quot;post&quot;, url, nil)



 req.Header.Add(&quot;content-type&quot;, &quot;application/x-www-form-urlencoded&quot;)



 res, _ := http.DefaultClient.Do(req)



 defer res.Body.Close()

 body, _ := ioutil.ReadAll(res.Body)



 fmt.Println(res)

 fmt.Println(string(body))



}</code></pre></div><div role="tabpanel" class="tab-pane " id="875b90eb2e6d4269b79931b5f099132b_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.post(&quot;https://${account.namespace}/oauth/token&quot;)

  .header(&quot;content-type&quot;, &quot;application/x-www-form-urlencoded&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="875b90eb2e6d4269b79931b5f099132b_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'post',

  url: 'https://${account.namespace}/oauth/token',

  headers: {'content-type': 'application/x-www-form-urlencoded'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="875b90eb2e6d4269b79931b5f099132b_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



NSDictionary *headers = @{ @&quot;content-type&quot;: @&quot;application/x-www-form-urlencoded&quot; };



NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@&quot;https://${account.namespace}/oauth/token&quot;]

                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy

                                                   timeoutInterval:10.0];

[request setHTTPMethod:@&quot;post&quot;];

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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="875b90eb2e6d4269b79931b5f099132b_php"><pre><code class="language-php no-lines">$curl = curl_init();



curl_setopt_array($curl, [

  CURLOPT_URL =&gt; &quot;https://${account.namespace}/oauth/token&quot;,

  CURLOPT_RETURNTRANSFER =&gt; true,

  CURLOPT_ENCODING =&gt; &quot;&quot;,

  CURLOPT_MAXREDIRS =&gt; 10,

  CURLOPT_TIMEOUT =&gt; 30,

  CURLOPT_HTTP_VERSION =&gt; CURL_HTTP_VERSION_1_1,

  CURLOPT_CUSTOMREQUEST =&gt; &quot;post&quot;,

  CURLOPT_HTTPHEADER =&gt; [

    &quot;content-type: application/x-www-form-urlencoded&quot;

  ],

]);



$response = curl_exec($curl);

$err = curl_error($curl);



curl_close($curl);



if ($err) {

  echo &quot;cURL Error #:&quot; . $err;

} else {

  echo $response;

}</code></pre></div><div role="tabpanel" class="tab-pane " id="875b90eb2e6d4269b79931b5f099132b_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPSConnection(&quot;&quot;)



headers = { 'content-type': &quot;application/x-www-form-urlencoded&quot; }



conn.request(&quot;post&quot;, &quot;/${account.namespace}/oauth/token&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="875b90eb2e6d4269b79931b5f099132b_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'

require 'openssl'



url = URI(&quot;https://${account.namespace}/oauth/token&quot;)



http = Net::HTTP.new(url.host, url.port)

http.use_ssl = true

http.verify_mode = OpenSSL::SSL::VERIFY_NONE



request = Net::HTTP::Post.new(url)

request[&quot;content-type&quot;] = 'application/x-www-form-urlencoded'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="875b90eb2e6d4269b79931b5f099132b_swift"><pre><code class="language-swift no-lines">import Foundation



let headers = [&quot;content-type&quot;: &quot;application/x-www-form-urlencoded&quot;]



let request = NSMutableURLRequest(url: NSURL(string: &quot;https://${account.namespace}/oauth/token&quot;)! as URL,

                                        cachePolicy: .useProtocolCachePolicy,

                                    timeoutInterval: 10.0)

request.httpMethod = &quot;post&quot;

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



</p><h3>Appeler un point de terminaison sécurisé</h3><p>Maintenant que vous avez un jeton d’accès, vous pouvez l’utiliser pour appeler des points de terminaison API sécurisés. Lorsque vous appelez un point de terminaison sécurisé, vous devez inclure le jeton d’accès en tant que jeton de porteur dans l’en-tête <b>Authorization</b> de la requête. Par exemple, vous pouvez faire une requête au point de terminaison <code>/api/private</code> :</p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#2af03a31f0c64c98b9c83358c6c4e09f_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#2af03a31f0c64c98b9c83358c6c4e09f_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#2af03a31f0c64c98b9c83358c6c4e09f_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#2af03a31f0c64c98b9c83358c6c4e09f_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#2af03a31f0c64c98b9c83358c6c4e09f_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#2af03a31f0c64c98b9c83358c6c4e09f_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#2af03a31f0c64c98b9c83358c6c4e09f_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#2af03a31f0c64c98b9c83358c6c4e09f_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#2af03a31f0c64c98b9c83358c6c4e09f_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#2af03a31f0c64c98b9c83358c6c4e09f_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="2af03a31f0c64c98b9c83358c6c4e09f_shell"><pre><code class="language-text no-lines">curl --request get \

  --url http://localhost:3010/api/private \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN'</code></pre></div><div role="tabpanel" class="tab-pane " id="2af03a31f0c64c98b9c83358c6c4e09f_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;http://localhost:3010/api/private&quot;);

var request = new RestRequest(Method.GET);

request.AddHeader(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="2af03a31f0c64c98b9c83358c6c4e09f_go"><pre><code class="language-go no-lines">package main



import (

 &quot;fmt&quot;

 &quot;net/http&quot;

 &quot;io/ioutil&quot;

)



func main() {



 url := &quot;http://localhost:3010/api/private&quot;



 req, _ := http.NewRequest(&quot;get&quot;, url, nil)



 req.Header.Add(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN&quot;)



 res, _ := http.DefaultClient.Do(req)



 defer res.Body.Close()

 body, _ := ioutil.ReadAll(res.Body)



 fmt.Println(res)

 fmt.Println(string(body))



}</code></pre></div><div role="tabpanel" class="tab-pane " id="2af03a31f0c64c98b9c83358c6c4e09f_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.get(&quot;http://localhost:3010/api/private&quot;)

  .header(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="2af03a31f0c64c98b9c83358c6c4e09f_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'get',

  url: 'http://localhost:3010/api/private',

  headers: {authorization: 'Bearer YOUR_ACCESS_TOKEN'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="2af03a31f0c64c98b9c83358c6c4e09f_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



NSDictionary *headers = @{ @&quot;authorization&quot;: @&quot;Bearer YOUR_ACCESS_TOKEN&quot; };



NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@&quot;http://localhost:3010/api/private&quot;]

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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="2af03a31f0c64c98b9c83358c6c4e09f_php"><pre><code class="language-php no-lines">$curl = curl_init();



curl_setopt_array($curl, [

  CURLOPT_PORT =&gt; &quot;3010&quot;,

  CURLOPT_URL =&gt; &quot;http://localhost:3010/api/private&quot;,

  CURLOPT_RETURNTRANSFER =&gt; true,

  CURLOPT_ENCODING =&gt; &quot;&quot;,

  CURLOPT_MAXREDIRS =&gt; 10,

  CURLOPT_TIMEOUT =&gt; 30,

  CURLOPT_HTTP_VERSION =&gt; CURL_HTTP_VERSION_1_1,

  CURLOPT_CUSTOMREQUEST =&gt; &quot;get&quot;,

  CURLOPT_HTTPHEADER =&gt; [

    &quot;authorization: Bearer YOUR_ACCESS_TOKEN&quot;

  ],

]);



$response = curl_exec($curl);

$err = curl_error($curl);



curl_close($curl);



if ($err) {

  echo &quot;cURL Error #:&quot; . $err;

} else {

  echo $response;

}</code></pre></div><div role="tabpanel" class="tab-pane " id="2af03a31f0c64c98b9c83358c6c4e09f_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPConnection(&quot;localhost:3010&quot;)



headers = { 'authorization': &quot;Bearer YOUR_ACCESS_TOKEN&quot; }



conn.request(&quot;get&quot;, &quot;/api/private&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="2af03a31f0c64c98b9c83358c6c4e09f_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'



url = URI(&quot;http://localhost:3010/api/private&quot;)



http = Net::HTTP.new(url.host, url.port)



request = Net::HTTP::Get.new(url)

request[&quot;authorization&quot;] = 'Bearer YOUR_ACCESS_TOKEN'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="2af03a31f0c64c98b9c83358c6c4e09f_swift"><pre><code class="language-swift no-lines">import Foundation



let headers = [&quot;authorization&quot;: &quot;Bearer YOUR_ACCESS_TOKEN&quot;]



let request = NSMutableURLRequest(url: NSURL(string: &quot;http://localhost:3010/api/private&quot;)! as URL,

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



</p><p>Appelez le point de terminaison <code>/api/private-scoped</code> de manière similaire, mais assurez-vous que les autorisations API sont configurées correctement et que le jeton d’accès inclut la permission <code>read:messages</code>.</p><p><div class="checkpoint">Guide rapide ASP.NET API - Étape 6 - Point de contrôle <div class="checkpoint-default"><p>Vous devriez maintenant pouvoir appeler les points de terminaison <code>/api/private</code> et <code>/api/private-scoped</code>.</p><p>Exécutez votre application et vérifiez que :</p><ul><li><p><code>GET /api/private</code> est disponible pour les demandes authentifiées.</p></li><li><p><code>GET /api/private-scoped</code> est disponible pour les demandes authentifiées contenant un jeton d’accès avec la permission <code>read:messages</code>.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Nous vous prions de nous excuser pour tout inconvénient causé. Voici quelques éléments à vérifier :</p><ul><li><p>assurez-vous que <code>ValidIssuer</code> et <code>ValidAudience</code> sont correctement configurés</p></li><li><p>assurez-vous que le jeton est ajouté en tant qu’en-tête de l&#39;<code>authorisation</code></p></li><li><p>vérifiez que le jeton a les permissions adéquates (vous pouvez utiliser <a href="https://jwt.io/" target="_blank" rel="noreferrer noopener">jwt.io</a> pour vérifier)</p></li></ul><p>Vous rencontrez toujours des problèmes? Pour obtenir de l’aide, consultez notre <a href="/docs" target="_self" >documentation</a> ou la <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">page de notre communauté</a>.</p></div>

  </div></p>
