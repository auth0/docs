---
title: Flux d’autorisation de l’appareil
description: Ce tutoriel explique comment appeler votre API à partir d’un appareil dont les entrées sont limitées, à l’aide du flux d’autorisation de l’appareil.
interactive:  true

github:
  path: https://auth0.github.io/device-flow-playground/
locale: fr-CA
---

# Flux d’autorisation de l’appareil


<p>Ce tutoriel explique comment appeler votre API à partir d’un appareil dont les entrées sont limitées, à l’aide du <a data-contentfulid="5o0Q0sUAtzV8S0YFfXblat-fr-CA">flux d’autorisation de l’appareil</a>. Nous vous recommandons de vous connecter pour suivre ce démarrage rapide avec les exemples configurés pour votre compte.</p><p>Pour une expérience interactive, vous pouvez utiliser <a href="https://auth0.github.io/device-flow-playground/">Terrain de jeu du flux de l’appareil</a>.</p><h2>Prérequis</h2><ul><li><p><a data-contentfulid="TvuCRosEZ2Kpx1WdFwWJt-fr-CA">Enregistrer une application native</a></p></li><li><p>Assurez-vous que l’option <b>OIDC Conformant (Conforme à l’OIDC)</b> est activée. Pour plus d’informations, consultez <a data-contentfulid="5X6PoWErJuO1unXQymQsu3-fr-CA">Authentification conforme à l’OIDC</a>.</p></li><li><p>Ajoutez <b>Device Code (Code de l’appareil)</b> aux types d’autorisation de l’application. Pour plus d’informations, consultez <a data-contentfulid="16N6CjkAtEzcGypwOkPItT-fr-CA">Mise à jour des types d’autorisation</a>.</p></li><li><p>Ajoutez <b>Refresh Token (Jeton d’actualisation)</b> aux types d’autorisation de l’application si vous souhaitez activer les <a data-contentfulid="2qqZWFtyjsJXT1R47diXIM-fr-CA">jetons d’actualisation</a>.</p></li><li><p><a data-contentfulid="1Ye7SV0H0QbFUqZ9SsxJxl-fr-CA">Configurez et activez au moins une connexion</a> pour l’application.</p></li><li><p><a data-contentfulid="450QmC9wuUtjlt8UQzRgPd-fr-CA">Enregistrez votre API auprès d’Auth0</a>.</p><ul><li><p>Activez l’option <b>Allow Offline Access (Autoriser l’accès hors ligne)</b> si vous utilisez des jetons d’actualisation. Pour en savoir plus, veuillez consulter <a data-contentfulid="302dVhVAcFGQAMcUS8ymHS-fr-CA">Paramètres API</a>.</p></li></ul></li><li><p><a data-contentfulid="31DLcdiccXFyevXAtvjX5d-fr-CA">Configurez les paramètres du code utilisateur de l’appareil</a> pour définir le jeu de caractères, le format et la longueur de votre code utilisateur généré de manière aléatoire.</p></li></ul><p></p>

## Recevoir le code de l’appareil


<p>Lorsque l’utilisateur démarre l’application de l’appareil et souhaite l’autoriser, votre application doit demander un code d’appareil à Auth0 Authentication API pour l’associer à la session de l’utilisateur.</p><p>Pour obtenir le code de l’appareil, votre application doit appeler le <a href="/docs/api/authentication#-post-oauth-device-code-">point de terminaison d’autorisation</a> de Authentication API du flux d’autorisation de l’appareil :</p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#3ec26e90d67147bf8f3104be317dc6a4_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#3ec26e90d67147bf8f3104be317dc6a4_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#3ec26e90d67147bf8f3104be317dc6a4_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#3ec26e90d67147bf8f3104be317dc6a4_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#3ec26e90d67147bf8f3104be317dc6a4_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#3ec26e90d67147bf8f3104be317dc6a4_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#3ec26e90d67147bf8f3104be317dc6a4_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#3ec26e90d67147bf8f3104be317dc6a4_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#3ec26e90d67147bf8f3104be317dc6a4_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#3ec26e90d67147bf8f3104be317dc6a4_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="3ec26e90d67147bf8f3104be317dc6a4_shell"><pre><code class="language-text no-lines">curl --request post \

  --url 'https://${account.namespace}/oauth/device/code' \

  --header 'content-type: application/x-www-form-urlencoded'</code></pre></div><div role="tabpanel" class="tab-pane " id="3ec26e90d67147bf8f3104be317dc6a4_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;https://${account.namespace}/oauth/device/code&quot;);

var request = new RestRequest(Method.POST);

request.AddHeader(&quot;content-type&quot;, &quot;application/x-www-form-urlencoded&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="3ec26e90d67147bf8f3104be317dc6a4_go"><pre><code class="language-go no-lines">package main



import (

 &quot;fmt&quot;

 &quot;net/http&quot;

 &quot;io/ioutil&quot;

)



func main() {



 url := &quot;https://${account.namespace}/oauth/device/code&quot;



 req, _ := http.NewRequest(&quot;post&quot;, url, nil)



 req.Header.Add(&quot;content-type&quot;, &quot;application/x-www-form-urlencoded&quot;)



 res, _ := http.DefaultClient.Do(req)



 defer res.Body.Close()

 body, _ := ioutil.ReadAll(res.Body)



 fmt.Println(res)

 fmt.Println(string(body))



}</code></pre></div><div role="tabpanel" class="tab-pane " id="3ec26e90d67147bf8f3104be317dc6a4_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.post(&quot;https://${account.namespace}/oauth/device/code&quot;)

  .header(&quot;content-type&quot;, &quot;application/x-www-form-urlencoded&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="3ec26e90d67147bf8f3104be317dc6a4_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'post',

  url: 'https://${account.namespace}/oauth/device/code',

  headers: {'content-type': 'application/x-www-form-urlencoded'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="3ec26e90d67147bf8f3104be317dc6a4_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



NSDictionary *headers = @{ @&quot;content-type&quot;: @&quot;application/x-www-form-urlencoded&quot; };



NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@&quot;https://${account.namespace}/oauth/device/code&quot;]

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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="3ec26e90d67147bf8f3104be317dc6a4_php"><pre><code class="language-php no-lines">$curl = curl_init();



curl_setopt_array($curl, [

  CURLOPT_URL =&gt; &quot;https://${account.namespace}/oauth/device/code&quot;,

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

}</code></pre></div><div role="tabpanel" class="tab-pane " id="3ec26e90d67147bf8f3104be317dc6a4_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPSConnection(&quot;&quot;)



headers = { 'content-type': &quot;application/x-www-form-urlencoded&quot; }



conn.request(&quot;post&quot;, &quot;/${account.namespace}/oauth/device/code&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="3ec26e90d67147bf8f3104be317dc6a4_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'

require 'openssl'



url = URI(&quot;https://${account.namespace}/oauth/device/code&quot;)



http = Net::HTTP.new(url.host, url.port)

http.use_ssl = true

http.verify_mode = OpenSSL::SSL::VERIFY_NONE



request = Net::HTTP::Post.new(url)

request[&quot;content-type&quot;] = 'application/x-www-form-urlencoded'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="3ec26e90d67147bf8f3104be317dc6a4_swift"><pre><code class="language-swift no-lines">import Foundation



let headers = [&quot;content-type&quot;: &quot;application/x-www-form-urlencoded&quot;]



let request = NSMutableURLRequest(url: NSURL(string: &quot;https://${account.namespace}/oauth/device/code&quot;)! as URL,

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



</p>

## Recevoir le code de l’appareil


<p>L’application de l’appareil devrait recevoir une réponse HTTP 200 et une charge utile similaire à celle-ci :</p><p><pre><code>{

  &quot;device_code&quot;: &quot;GmRh...k9eS&quot;,

  &quot;user_code&quot;: &quot;WDJB-MJHT&quot;,

  &quot;verification_uri&quot;: &quot;https://my-tenant.auth0.com/device&quot;,

  &quot;verification_uri_complete&quot;: &quot;https://my-tenant.auth0.com/device?user_code=WDJB-MJHT&quot;,

  &quot;expires_in&quot;: 900,

  &quot;interval&quot;: 5

}

</code></pre>

</p>

## Demande d’activation de l’appareil


<p>Après avoir reçu le <code>device_code</code> et le <code>user_code</code>, votre application doit demander à l’utilisateur de se rendre au <code>verification_uri</code> et de saisir le <code>user_code</code>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/3Q9q41wocl6SojRoiGefXT/a98582a3c86740aaeb3d957f2dc4afe6/request-device-activation.png" alt="null" /><p><div class="alert-container" severity="warning"><p>Le <code>device_code</code> n’est pas destiné directement à l’utilisateur et ne doit pas être affiché pendant l’interaction afin de ne pas créer de confusion chez l’utilisateur.</p></div></p><p><div class="alert-container" severity="default"><p>Lorsque vous créez une CLI, vous pouvez ignorer cette étape et ouvrir directement le navigateur avec <code>verification_uri_complete</code>.</p></div></p>

## Interrogation du point de terminaison du jeton


<p>Pendant que votre application attend que l’utilisateur l’active, elle doit appeler le <a href="/docs/api/authentication#-post-oauth-token-">point de terminaison POST /oauth/token</a> de Authentication API de manière intermittente et traiter la réponse de manière appropriée.</p><p><div class="alert-container" severity="default"><p>Assurez-vous que votre application attend la durée de <code>interval</code> (en secondes) ou jusqu’à ce qu’elle reçoive une réponse positive, la durée la plus longue étant retenue, afin d’éviter les problèmes de latence du réseau.</p></div></p><p><pre><code>curl --request POST \ 

--url 'https://${account.namespace}/oauth/token' \ 

--header 'content-type: application/x-www-form-urlencoded' \ 

--data grant_type=urn:ietf:params:oauth:grant-type:device_code \ 

--data device_code=__AUTH0_SCOPES__ \ 

--data 'client_id=${account.clientId}'

</code></pre>

</p>

## Autorisation de l’utilisateur


<p>L’utilisateur peut soit balayer le code QR, soit ouvrir la page d’activation et saisir le code d’utilisateur :</p><img src="//images.ctfassets.net/cdy7uua7fh8z/7IwrVX4s5a36CvfY95rKCo/e0d5c2d9f1cb83993ee77d6e9499cfa7/Device_Activation_-_French.png" alt="null" /><p>Une page de confirmation s’affiche pour que l’utilisateur confirme qu’il s’agit du bon appareil :</p><img src="//images.ctfassets.net/cdy7uua7fh8z/5dwhOyM1HRNwfV3Co4Da2o/cb6d7a9cbf5c43baece40b0d394fc522/Device_Confirmation_-_French.png" alt="null" /><p>L’utilisateur terminera la transaction en se connectant. Cette étape peut comprendre un ou plusieurs des procédés suivant :</p><ul><li><p>Authentifier l’utilisateur</p></li><li><p>Redirection de l’utilisateur vers un fournisseur d’identité pour gérer l’authentification</p></li><li><p>Vérification des sessions actives d’authentification unique (SSO)</p></li><li><p>Obtenir le consentement de l’utilisateur pour l’appareil, à moins qu’il n’ait été donné au préalable.</p></li></ul><img src="//images.ctfassets.net/cdy7uua7fh8z/3GqqaNB7sjcAYTQiTnEEsn/15dcb8ab5d7979ad360f9ab96e9a7fa1/Login_screen_-_French.png" alt="null" /><p>Une fois l’authentification et le consentement obtenus, la demande de confirmation s’affiche :</p><img src="//images.ctfassets.net/cdy7uua7fh8z/2TsQpMa8fzifiojuEXLvDo/3335aa9e4e17d63a97b5240884193dd2/Success_message_-_French.png" alt="null" /><p>À ce stade, l’utilisateur s’est authentifié et l’appareil a été autorisé.</p>

## Recevoir les jetons


<p>Une fois que l’utilisateur a autorisé l’application, celle-ci reçoit une réponse HTTP 200 et la charge utile suivante :</p><p><pre><code class="language-json">{

  &quot;access_token&quot;: &quot;eyJz93a...k4laUWw&quot;,

  &quot;refresh_token&quot;: &quot;GEbRxBN...edjnXbL&quot;,

  &quot;id_token&quot;: &quot;eyJ0XAi...4faeEoQ&quot;,

  &quot;token_type&quot;: &quot;Bearer&quot;,

  &quot;expires_in&quot;: 86400

}

</code></pre>

</p><p><div class="alert-container" severity="warning"><p>Vous devez valider vos jetons avant de les enregistrer. Pour en savoir plus, consultez <a data-contentfulid="6DnVGunP9ZOQvZjFZE0EOP-fr-CA"><b>Validation des jetons d’accès</b></a> et <a data-contentfulid="1O5WNRhzrz1R0n4xFQtM8j-fr-CA"><b>Validation des jetons d’ID</b></a>.</p></div></p><p>Les <a data-contentfulid="48OqDR4wWZTFo8FZw7tSMj-fr-CA">jetons d’accès</a> sont utilisés pour appeler le <a href="/docs/api/authentication#get-user-info">point de terminaison Get User Info</a> de Authentication API (si l’application de votre appareil a demandé la permission <code>openid</code>) ou l’API définie par le paramètre <code>audience</code>. Si vous appelez votre propre API, votre application doit <a data-contentfulid="6DnVGunP9ZOQvZjFZE0EOP-fr-CA">vérifier le jeton d’accès</a> avant de l’utiliser.</p><p>Les <a data-contentfulid="7eGepxAjz89d1F7i1aP4ch-fr-CA">jetons d’ID</a> contiennent des informations sur l’utilisateur qui doivent être <a href="/docs/tokens/id-tokens#id-token-payload">décodées et extraites</a>. Authentication API ne renvoie un <code>id_token</code> que si l’application de votre appareil a demandé la permission <code>openid</code>.</p><p>Les <a data-contentfulid="2qqZWFtyjsJXT1R47diXIM-fr-CA">jetons d’actualisation</a> sont utilisés pour obtenir un nouveau jeton d’accès ou un nouveau jeton d’ID après l’expiration du précédent. Authentication API ne renvoie un <code>refresh_token</code> que si le paramètre <b>Allow Offline Access (Autoriser l’accès hors ligne)</b> est activé pour l’API indiquée par le paramètre <code>audience</code> et que l’application de votre appareil a demandé la permission <code>offline_access</code>.</p>

## Appeler votre API


<p>Pour appeler votre API, votre application doit transmettre le jeton d’accès en tant que jeton du porteur dans l’en-tête <code>Authorization</code> de votre requête HTTP.</p><p><pre><code>curl --request GET \

  --url https://myapi.com/api \

  --header 'authorization: Bearer __AUTH0_API_ACCESS_TOKEN__' \

  --header 'content-type: application/json'

</code></pre>

</p>

## Jetons d’actualisation


<p>Pour obtenir un nouveau jeton d’accès pour un utilisateur, votre application peut appeler le <a href="/docs/api/authentication#-post-oauth-token-">point de terminaison POST /oauth/token</a> de Authentication API avec le paramètre <code>refresh_token</code>.</p><p><pre><code>curl --request POST \

  --url 'https://${account.namespace}/oauth/token' \

  --header 'content-type: application/x-www-form-urlencoded' \

  --data grant_type=refresh_token \

  --data 'client_id=${account.clientId}' \

  --data 'client_secret=${account.clientSecret}' \

  --data refresh_token=__AUTH0_REFRESH_TOKEN__

</code></pre>

</p><p>Si la requête a réussi, l’application de votre appareil reçoit une réponse HTTP 200 avec la charge utile suivante :</p><p><pre><code class="language-json">{

  &quot;access_token&quot;: &quot;eyJ...MoQ&quot;,

  &quot;expires_in&quot;: 86400,

  &quot;scope&quot;: &quot;openid offline_access&quot;,

  &quot;id_token&quot;: &quot;eyJ...0NE&quot;,

  &quot;token_type&quot;: &quot;Bearer&quot;

}

</code></pre>

</p><p>Pour en savoir plus sur les jetons d’actualisation, consultez <a href="https://auth0.com/docs/secure/tokens/refresh-tokens">Jetons d’actualisation</a>.</p>

## Dépannage


<p><a data-contentfulid="1rqQVgWhfq0S0rUKL86J1i-fr-CA">Les journaux de locataires</a> sont créés pour toutes les interactions qui ont lieu et peuvent être utilisés pour résoudre les problèmes.</p><p><div class="tablew"><table class="table"><thead>

<tr>

<th>**Code**</th>

<th>**Nom**</th>

<th>**Description**</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>fdeaz</code></td>

<td>Échec de la demande d’autorisation de l’appareil</td>

<td></td>

</tr>

<tr>

<td><code>fdeac</code></td>

<td>Échec de l’activation de l’appareil</td>

<td></td>

</tr>

<tr>

<td><code>fdecc</code></td>

<td>L’utilisateur a annulé la confirmation de l’appareil</td>

<td></td>

</tr>

<tr>

<td><code>fede</code></td>

<td>Échec de l’échange</td>

<td>Code d’appareil contre un jeton d’accès</td>

</tr>

<tr>

<td><code>sede</code></td>

<td>Échange réussi</td>

<td>code d’appareil contre un jeton d’accès</td>

</tr>

</tbody>

</table></div></p><h3>Réponses des jetons</h3><p>Il est possible de recevoir plusieurs réponses HTTP 4xx différentes pendant que vous attendez que l’utilisateur autorise l’appareil.</p><h4>Autorisation en attente</h4><p>Vous verrez cette erreur pendant que vous attendez que l’utilisateur agisse. Poursuivez l’interrogation en utilisant <code>interval</code> suggéré dans l’étape précédente de ce tutoriel.</p><p><pre><code>`HTTP 403`



{ 

  &quot;error&quot;: &quot;authorization_pending&quot;, 

  &quot;error_description&quot;: &quot;...&quot; 

}

</code></pre>

</p><h4>Ralentissement</h4><p>L’interrogation est trop rapide. Ralentissez et utilisez l’intervalle suggéré dans l’étape précédente de ce tutoriel. Pour éviter de recevoir cette erreur en raison de la latence du réseau, vous devez commencer à compter chaque intervalle après la réception de la réponse de la dernière demande d’interrogation.</p><p><pre><code>`HTTP 429`



{

  &quot;error&quot;: &quot;slow_down&quot;,

  &quot;error_description&quot;: &quot;...&quot;

}

</code></pre>

</p><h4>Jeton expiré</h4><p>L’utilisateur n’a pas autorisé l’appareil assez rapidement, le <code>device_code</code> a donc expiré. Votre application doit avertir l’utilisateur que le flux a expiré et l’inviter à le réinitialiser.</p><p><div class="alert-container" severity="default"><p>Le <code>expired_token</code> n’est renvoyé qu’une seule fois. Ensuite, le point de terminaison renvoie l’erreur <code>invalid_grant</code>.</p></div></p><p><pre><code>`HTTP 403`



{ 

  &quot;error&quot;: &quot;expired_token&quot;,

  &quot;error_description&quot;: &quot;...&quot;

}

</code></pre>

</p><h4>Accès refusé</h4><p>Si l’accès est refusé, vous recevez :</p><p><pre><code>`HTTP 403`



{

  &quot;error&quot;: &quot;access_denied&quot;,

  &quot;error_description&quot;: &quot;...&quot;

}

</code></pre>

</p><p>Cela peut se produire pour diverses raisons, notamment :</p><ul><li><p>L’utilisateur a refusé d’autoriser l’appareil.</p></li><li><p>Le serveur d’autorisation a refusé la transaction.</p></li><li><p>Une <a data-contentfulid="43AE9LshgFKVjmxuAVSgPW-fr-CA">Action</a> configurée a refusé l’accès.</p></li></ul><p></p>

## Exemples de mises en œuvre


<p>Consultez les exemples ci-dessous pour savoir comment mettre en œuvre ce flux dans des applications réelles.</p><ul><li><p><a href="https://auth0.github.io/device-flow-playground/">Terrain de jeu du flux de l’appareil</a></p></li><li><p><a href="https://github.com/pushpabrol/auth0-device-flow-appletv">AppleTV (Swift)</a> : application simple qui montre comment Auth0 peut être utilisé avec le flux d’autorisation d’un appareil AppleTV.</p></li><li><p><a href="https://gist.github.com/panva/652c61e7d847e0ed99926c324fa91b36">CLI (Node.js)</a> : exemple de mise en œuvre d’une CLI qui utilise le flux d’autorisation de l’appareil au lieu du flux du code d’autorisation. La principale différence est que votre CLI n’a pas besoin d’héberger un serveur Web et d’écouter sur un port.</p></li></ul><p></p>

## Limites


<p>Pour utiliser le flux d’autorisation de l’appareil, l’application de l’appareil doit :</p><ul><li><p>Prendre en charge l’indication du nom du serveur (SNI)</p></li><li><p>Être une <a data-contentfulid="TvuCRosEZ2Kpx1WdFwWJt-fr-CA">application native</a></p></li><li><p>Avoir la <a href="/docs/secure/application-credentials#application-authentication-methods">méthode d’authentification</a> est définie sur <b>None (Aucun)</b></p></li><li><p>Être <a href="/docs/dashboard/reference/settings-application#oauth">conforme à l’OIDC</a></p></li><li><p>Ne pas être créée au moyen de l’<a data-contentfulid="4j9m9maYJHkXDgcqaijdWZ-fr-CA">enregistrement dynamique des clients</a></p></li></ul><p>En outre, le flux d’autorisation de l’appareil ne permet pas :</p><ul><li><p>Les <a data-contentfulid="3rAo4RBG7KOC6hpe0WLi1u-fr-CA">connexions via réseau social</a> qui utilisent les <a data-contentfulid="3R5dpsFZe4Hnk90zDjYIoi-fr-CA">clés de développeur Auth0</a>, sauf si vous utilisez la <a data-contentfulid="E0ZVoNC39TumW12W7LanM-fr-CA">nouvelle expérience de connexion universelle</a></p></li><li><p>Les paramètres de la chaîne de requête doivent être accessibles à partir d’une page de connexion ou d’actions hébergées.</p></li></ul><p></p>
