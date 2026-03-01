---
title: Device Authorization Flow
description: This tutorial demonstrates how to call your API from an input-constrained device using the Device Authorization Flow.
interactive:  true

locale: en-US
---

# Device Authorization Flow


<p>This tutorial demonstrates how to call your API from an input-constrained device using the <a data-contentfulid="5o0Q0sUAtzV8S0YFfXblat-en-US">Device Authorization Flow</a>. We recommend that you log in to follow this quickstart with examples configured for your account.</p><p>For an interactive experience, you can use the <a href="https://auth0.github.io/device-flow-playground/" target="_blank" rel="noreferrer noopener">Device Flow Playground</a>.</p><h2>Prerequisites</h2><ul><li><p><a data-contentfulid="TvuCRosEZ2Kpx1WdFwWJt-en-US">Register a Native Application</a>.</p></li><li><p>Ensure the <b>OIDC Conformant</b> toggle is enabled. For more information, read <a data-contentfulid="5X6PoWErJuO1unXQymQsu3-en-US">OIDC-Conformant Authentication</a>.</p></li><li><p>Add <b>Device Code</b> to the Application&#39;s grant types. For more information, read <a data-contentfulid="16N6CjkAtEzcGypwOkPItT-en-US">Update Grant Types</a>.</p></li><li><p>Add <b>Refresh Token</b> to the Application’s grant types if you want to enable <a data-contentfulid="2qqZWFtyjsJXT1R47diXIM-en-US">Refresh Tokens</a>.</p></li><li><p><a data-contentfulid="1Ye7SV0H0QbFUqZ9SsxJxl-en-US">Configure and enable at least one connection</a> for the application.</p></li><li><p><a data-contentfulid="450QmC9wuUtjlt8UQzRgPd-en-US">Register your API with Auth0</a>.</p><ul><li><p>Enable <b>Allow Offline Access</b> if you are using refresh tokens. For more information, read <a data-contentfulid="302dVhVAcFGQAMcUS8ymHS-en-US">API Settings</a>.</p></li></ul></li><li><p><a data-contentfulid="31DLcdiccXFyevXAtvjX5d-en-US">Configure Device User Code Settings</a> to define the character set, format, and length of your randomly-generated user code.</p></li></ul><p></p>

## Request device code


<p>When the user starts the device application and wants to authorize it, your application must request a device code from the Auth0 Authentication API to associate with the user session.</p><p>To get the device code, your application must call the Authentication API Device Authorization Flow <a href="/docs/api/authentication#-post-oauth-device-code-" target="_self" >Authorize endpoint</a>:</p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#fd6fb45b6d3b418ab9811258e74d9c82_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#fd6fb45b6d3b418ab9811258e74d9c82_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#fd6fb45b6d3b418ab9811258e74d9c82_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#fd6fb45b6d3b418ab9811258e74d9c82_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#fd6fb45b6d3b418ab9811258e74d9c82_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#fd6fb45b6d3b418ab9811258e74d9c82_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#fd6fb45b6d3b418ab9811258e74d9c82_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#fd6fb45b6d3b418ab9811258e74d9c82_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#fd6fb45b6d3b418ab9811258e74d9c82_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#fd6fb45b6d3b418ab9811258e74d9c82_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="fd6fb45b6d3b418ab9811258e74d9c82_shell"><pre><code class="language-text no-lines">curl --request post \

  --url 'https://${account.namespace}/oauth/device/code' \

  --header 'content-type: application/x-www-form-urlencoded'</code></pre></div><div role="tabpanel" class="tab-pane " id="fd6fb45b6d3b418ab9811258e74d9c82_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;https://${account.namespace}/oauth/device/code&quot;);

var request = new RestRequest(Method.POST);

request.AddHeader(&quot;content-type&quot;, &quot;application/x-www-form-urlencoded&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="fd6fb45b6d3b418ab9811258e74d9c82_go"><pre><code class="language-go no-lines">package main



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



}</code></pre></div><div role="tabpanel" class="tab-pane " id="fd6fb45b6d3b418ab9811258e74d9c82_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.post(&quot;https://${account.namespace}/oauth/device/code&quot;)

  .header(&quot;content-type&quot;, &quot;application/x-www-form-urlencoded&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="fd6fb45b6d3b418ab9811258e74d9c82_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'post',

  url: 'https://${account.namespace}/oauth/device/code',

  headers: {'content-type': 'application/x-www-form-urlencoded'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="fd6fb45b6d3b418ab9811258e74d9c82_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="fd6fb45b6d3b418ab9811258e74d9c82_php"><pre><code class="language-php no-lines">$curl = curl_init();



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

}</code></pre></div><div role="tabpanel" class="tab-pane " id="fd6fb45b6d3b418ab9811258e74d9c82_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPSConnection(&quot;&quot;)



headers = { 'content-type': &quot;application/x-www-form-urlencoded&quot; }



conn.request(&quot;post&quot;, &quot;/${account.namespace}/oauth/device/code&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="fd6fb45b6d3b418ab9811258e74d9c82_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'

require 'openssl'



url = URI(&quot;https://${account.namespace}/oauth/device/code&quot;)



http = Net::HTTP.new(url.host, url.port)

http.use_ssl = true

http.verify_mode = OpenSSL::SSL::VERIFY_NONE



request = Net::HTTP::Post.new(url)

request[&quot;content-type&quot;] = 'application/x-www-form-urlencoded'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="fd6fb45b6d3b418ab9811258e74d9c82_swift"><pre><code class="language-swift no-lines">import Foundation



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

## Receive device code


<p>The device application should receive an HTTP 200 response and a payload similar to this:</p><p><pre><code>{

  &quot;device_code&quot;: &quot;GmRh...k9eS&quot;,

  &quot;user_code&quot;: &quot;WDJB-MJHT&quot;,

  &quot;verification_uri&quot;: &quot;https://my-tenant.auth0.com/device&quot;,

  &quot;verification_uri_complete&quot;: &quot;https://my-tenant.auth0.com/device?user_code=WDJB-MJHT&quot;,

  &quot;expires_in&quot;: 900,

  &quot;interval&quot;: 5

}

</code></pre>

</p>

## Request device activation


<p>After your device application receives the <code>device_code</code> and the <code>user_code</code>, it should instruct the user to go to the <code>verification_uri</code> and enter the <code>user_code</code>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/3Q9q41wocl6SojRoiGefXT/a98582a3c86740aaeb3d957f2dc4afe6/request-device-activation.png" alt="" /><p><div class="alert-container" severity="warning"><p>The <code>device_code</code> is not intended for the user directly and should not be displayed during the interaction to avoid confusing the user.</p></div></p><p><div class="alert-container" severity="default"><p>When building a CLI, you could skip this step and immediately open the browser with <code>verification_uri_complete</code>.</p></div></p>

## Poll the token endpoint


<p>While your device application waits for the user to activate it, it should call the Authentication API <a href="/docs/api/authentication#-post-oauth-token-" target="_self" >POST /oauth/token endpoint</a> intermittently and handle the response appropriately.</p><p><div class="alert-container" severity="default"><p>Ensure your device application waits for the length of the <code>interval</code> (in seconds) or until it receives a successful response, whichever is longer, to avoid network latency issues.</p></div></p><p><pre><code>curl --request POST \ 

--url 'https://${account.namespace}/oauth/token' \ 

--header 'content-type: application/x-www-form-urlencoded' \ 

--data grant_type=urn:ietf:params:oauth:grant-type:device_code \ 

--data device_code=__AUTH0_SCOPES__ \ 

--data 'client_id=${account.clientId}'

</code></pre>

</p>

## User authorization


<p>The user will either scan the QR code, or else will open the activation page and enter the user code:</p><img src="//images.ctfassets.net/cdy7uua7fh8z/7IwrVX4s5a36CvfY95rKCo/dfc962ecde65502945741b1dc8b5c879/Device_Activation_-_English.png" alt="" /><p>A confirmation page will be shown to have the user confirm that this is the right device:</p><img src="//images.ctfassets.net/cdy7uua7fh8z/5dwhOyM1HRNwfV3Co4Da2o/424a2bc1a1bb44a54c587a0bcddd8222/Device_Confirmation_-_English.png" alt="" /><p>The user will complete the transaction by signing in. This step may include one or more of the following processes:</p><ul><li><p>Authenticating the user</p></li><li><p>Redirecting the user to an Identity Provider to handle authentication</p></li><li><p>Checking for active SSO sessions</p></li><li><p>Obtaining user consent for the device, unless consent has been previously given</p></li></ul><img src="//images.ctfassets.net/cdy7uua7fh8z/3GqqaNB7sjcAYTQiTnEEsn/7199a9b319283686057ca32c853f7a05/Login_screen_-_English.png" alt="" /><p>Upon successful authentication and consent, the confirmation prompt will be shown:</p><img src="//images.ctfassets.net/cdy7uua7fh8z/2TsQpMa8fzifiojuEXLvDo/484a49b775ec5a6b3522983a425599fe/Success_message_-_English.png" alt="" /><p>At this point, the user has authenticated and the device has been authorized.</p>

## Receive tokens


<p>After the user authorizes the device application, it receives an HTTP 200 response and the following payload:</p><p><pre><code class="language-json">{

  &quot;access_token&quot;: &quot;eyJz93a...k4laUWw&quot;,

  &quot;refresh_token&quot;: &quot;GEbRxBN...edjnXbL&quot;,

  &quot;id_token&quot;: &quot;eyJ0XAi...4faeEoQ&quot;,

  &quot;token_type&quot;: &quot;Bearer&quot;,

  &quot;expires_in&quot;: 86400

}

</code></pre>

</p><p><div class="alert-container" severity="warning"><p>You should validate your tokens before saving them. To learn how, read <a data-contentfulid="6DnVGunP9ZOQvZjFZE0EOP-en-US"><b>Validate Access Tokens</b></a> and <a data-contentfulid="1O5WNRhzrz1R0n4xFQtM8j-en-US"><b>Validate ID Tokens</b></a>.</p></div></p><p><a data-contentfulid="48OqDR4wWZTFo8FZw7tSMj-en-US">Access tokens</a> are used to call the Authentication API <a href="/docs/api/authentication#get-user-info" target="_self" >Get User Info endpoint</a> (if your device application requested the <code>openid</code> scope) or the API that was specified by the <code>audience</code> parameter. If you are calling your own API, your device application must <a data-contentfulid="6DnVGunP9ZOQvZjFZE0EOP-en-US">verify the access token</a> before using it.</p><p><a data-contentfulid="7eGepxAjz89d1F7i1aP4ch-en-US">ID tokens</a> contain user information that must be <a href="/docs/tokens/id-tokens#id-token-payload" target="_self" >decoded and extracted</a>. The Authentication API only returns an <code>id_token</code> if your device application requested the <code>openid</code> scope.</p><p><a data-contentfulid="2qqZWFtyjsJXT1R47diXIM-en-US">Refresh tokens</a> are used to obtain a new access token or ID token after the previous one has expired. The Authentication API only returns a <code>refresh_token</code> if the <b>Allow Offline Access</b> setting is enabled for the API specified by the <code>audience</code> parameter, and your device application requested the <code>offline_access</code> scope.</p>

## Call your API


<p>To call your API, your device application must pass the access token as a Bearer token in the <code>Authorization</code> header of your HTTP request.</p><p><pre><code>curl --request GET \

  --url https://myapi.com/api \

  --header 'authorization: Bearer __AUTH0_API_ACCESS_TOKEN__' \

  --header 'content-type: application/json'

</code></pre>

</p>

## Refresh tokens


<p>To get a new access token for a user, your device application can call the Authentication API <a href="/docs/api/authentication#-post-oauth-token-" target="_self" >POST /oauth/token endpoint</a> with the <code>refresh_token</code> parameter.</p><p><pre><code>curl --request POST \

  --url 'https://${account.namespace}/oauth/token' \

  --header 'content-type: application/x-www-form-urlencoded' \

  --data grant_type=refresh_token \

  --data 'client_id=${account.clientId}' \

  --data 'client_secret=${account.clientSecret}' \

  --data refresh_token=__AUTH0_REFRESH_TOKEN__

</code></pre>

</p><p>If the request was successful, your device application receives an HTTP 200 response with the following payload:</p><p><pre><code class="language-json">{

  &quot;access_token&quot;: &quot;eyJ...MoQ&quot;,

  &quot;expires_in&quot;: 86400,

  &quot;scope&quot;: &quot;openid offline_access&quot;,

  &quot;id_token&quot;: &quot;eyJ...0NE&quot;,

  &quot;token_type&quot;: &quot;Bearer&quot;

}

</code></pre>

</p><p>To learn more about refresh tokens, read <a href="https://auth0.com/docs/secure/tokens/refresh-tokens" target="_blank" >Refresh Tokens</a>.</p>

## Troubleshooting


<p><a data-contentfulid="1rqQVgWhfq0S0rUKL86J1i-en-US">Tenant logs</a> are created for any interaction that takes place and can be used to troubleshoot issues.</p><p><div class="tablew"><table class="table"><thead>

<tr>

<th>**Code**</th>

<th>**Name**</th>

<th>**Description**</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>fdeaz</code></td>

<td>Failed device authorization request</td>

<td></td>

</tr>

<tr>

<td><code>fdeac</code></td>

<td>Failed device activation</td>

<td></td>

</tr>

<tr>

<td><code>fdecc</code></td>

<td>User canceled the device confirmation</td>

<td></td>

</tr>

<tr>

<td><code>fede</code></td>

<td>Failed Exchange</td>

<td>Device Code for Access Token</td>

</tr>

<tr>

<td><code>sede</code></td>

<td>Success Exchange</td>

<td>Device Code for Access Token</td>

</tr>

</tbody>

</table></div></p><h3>Token responses</h3><p>While you wait for the user to authorize the device, you may receive a few different HTTP 4xx responses.</p><h4>Authorization pending</h4><p>You will see this error while waiting for the user to take action. Continue polling using the suggested <code>interval</code> retrieved in the previous step of this tutorial.</p><p><pre><code>`HTTP 403`



{ 

  &quot;error&quot;: &quot;authorization_pending&quot;, 

  &quot;error_description&quot;: &quot;...&quot; 

}

</code></pre>

</p><h4>Slow down</h4><p>You are polling too fast. Slow down and use the suggested interval retrieved in the previous step of this tutorial. To avoid receiving this error due to network latency, you should start counting each interval after receipt of the last polling request&#39;s response.</p><p><pre><code>`HTTP 429`



{

  &quot;error&quot;: &quot;slow_down&quot;,

  &quot;error_description&quot;: &quot;...&quot;

}

</code></pre>

</p><h4>Expired token</h4><p>The user has not authorized the device quickly enough, so the <code>device_code</code> has expired. Your application should notify the user that the flow has expired and prompt them to reinitiate the flow.</p><p><div class="alert-container" severity="default"><p>The <code>expired_token</code> error is returned exactly once. After that, the endpoint returns the <code>invalid_grant</code> error.</p></div></p><p><pre><code>`HTTP 403`



{ 

  &quot;error&quot;: &quot;expired_token&quot;,

  &quot;error_description&quot;: &quot;...&quot;

}

</code></pre>

</p><h4>Access Denied</h4><p>If access is denied, you receive:</p><p><pre><code>`HTTP 403`



{

  &quot;error&quot;: &quot;access_denied&quot;,

  &quot;error_description&quot;: &quot;...&quot;

}

</code></pre>

</p><p>This can occur for a variety of reasons, including:</p><ul><li><p>The user refused to authorize the device.</p></li><li><p>The authorization server denied the transaction.</p></li><li><p>A configured <a data-contentfulid="43AE9LshgFKVjmxuAVSgPW-en-US">Action</a> denied access.</p></li></ul><p></p>

## Sample implementations


<p>Refer to the samples below to learn how to implement this flow in real-world applications.</p><ul><li><p><a href="https://auth0.github.io/device-flow-playground/" target="_blank" rel="noreferrer noopener">Device Authorization Playground</a></p></li><li><p><a href="https://github.com/pushpabrol/auth0-device-flow-appletv" target="_blank" rel="noreferrer noopener">AppleTV (Swift)</a>: Simple application that shows how Auth0 can be used with the Device Authorization Flow from an AppleTV.</p></li><li><p><a href="https://gist.github.com/panva/652c61e7d847e0ed99926c324fa91b36" target="_blank" rel="noreferrer noopener">CLI (Node.js)</a>: Sample implementation of a CLI that uses the Device Authorization Flow instead of the Authorization Code Flow. The major difference is that your CLI does not need to host a webserver and listen on a port.</p></li></ul><p></p>

## Limitations


<p>To use the Device Authorization Flow, a device application must:</p><ul><li><p>Support Server Name Indication (SNI)</p></li><li><p>Be a <a data-contentfulid="TvuCRosEZ2Kpx1WdFwWJt-en-US">Native Application</a></p></li><li><p>Have the <a href="/docs/secure/application-credentials#application-authentication-methods" target="_self" >Authentication Method</a> set to <b>None</b></p></li><li><p>Be <a href="/docs/dashboard/reference/settings-application#oauth" target="_self" >OIDC-conformant</a></p></li><li><p>Not be created through <a data-contentfulid="4j9m9maYJHkXDgcqaijdWZ-en-US">Dynamic Client Registration</a></p></li></ul><p>In addition, the Device Authorization Flow does not allow:</p><ul><li><p><a data-contentfulid="3rAo4RBG7KOC6hpe0WLi1u-en-US">Social Connections</a> using <a data-contentfulid="3R5dpsFZe4Hnk90zDjYIoi-en-US">Auth0 developer keys</a> unless you are using <a data-contentfulid="E0ZVoNC39TumW12W7LanM-en-US">New Universal Login Experience</a></p></li><li><p>Query string parameters to be accessed from a hosted login page or Actions.</p></li></ul><p></p>
