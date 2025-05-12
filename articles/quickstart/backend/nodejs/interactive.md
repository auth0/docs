---
title: Add Authorization to Your Express.js API Application
description: This guide demonstrates how to integrate Auth0 with any new or existing Express.js API application using the express-oauth2-jwt-bearer package.
interactive:  true
files:
 - files/server
github:
  path: 01-Authorization-RS256
locale: en-US
---

# Add Authorization to Your Express.js API Application


<p>This guide demonstrates how to integrate Auth0 with any new or existing Express.js API application using the <code>express-oauth2-jwt-bearer</code> package.</p><p>If you have not created an API in your Auth0 dashboard yet, use the interactive selector to create a new Auth0 API or select an existing project API.</p><p>To set up your first API through the Auth0 dashboard, review <a href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis" target="_blank" >our getting started guide</a>. Each Auth0 API uses the API Identifier, which your application needs to validate the access token.</p><p><div class="alert-container" severity="default"><p><b>New to Auth0?</b> Learn <a href="https://auth0.com/docs/overview" target="_blank" >how Auth0 works</a> and read about <a href="https://auth0.com/docs/api-auth" target="_blank" >implementing API authentication and authorization</a> using the OAuth 2.0 framework.</p></div></p><p></p>

## Define permissions


<p>Permissions let you define how resources can be accessed on behalf of the user with a given access token. For example, you might choose to grant read access to the <code>messages</code> resource if users have the manager access level, and a write access to that resource if they have the administrator access level.</p><p>You can define allowed permissions in the <b>Permissions</b> view of the Auth0 Dashboard&#39;s <a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">APIs</a> section.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/5EnGfdqLVZ8fuIxbUn7gm1/7e6b2fb38a7452b2b540099a4a888822/configure-permissions.png" alt="" /><p><div class="alert-container" severity="default"><p>This example uses the <code>read:messages</code> scope.</p></div></p>

## Install dependencies


<p>First, install the SDK with <code>npm</code>.</p><p><pre><code class="language-powershell">npm install --save express-oauth2-jwt-bearer

</code></pre>

</p>

## Configure the middleware {{{ data-action="code" data-code="server.js#1:10" }}}


<p>Configure <code>express-oauth2-jwt-bearer</code> with your Domain and API Identifier.</p><p>The <code>checkJwt</code> middleware shown to the right checks if the user&#39;s access token included in the request is valid. If the token is not valid, the user gets a 401 Authorization error when they try to access the endpoints.</p><p>The middleware does not check if the token has sufficient scope to access the requested resources.</p>

## Protect API endpoints {{{ data-action="code" data-code="server.js#12:32" }}}


<p>To protect an individual route by requiring a valid JWT, configure the route with the <code>checkJwt</code> middleware constructed from <code>express-oauth2-jwt-bearer</code>.</p><p>You can configure individual routes to look for a particular scope. To achieve that, set up another middleware with the <code>requiresScope</code> method. Provide the required scopes and apply the middleware to any routes you want to add authorization to.</p><p>Pass the <code>checkJwt</code> and <code>requiredScopes</code> middlewares to the route you want to protect.</p><p>In this configuration, only access tokens with the <code>read:messages</code> scope can access the endpoint.</p><h3>Make a Call to Your API</h3><p>To make calls to your API, you need an Access Token. You can get an Access Token for testing purposes from the <b>Test</b> view in your <a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">API settings</a>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/5HUMcKGXoNOvdJNXFI73oi/46a590997c56f9ca9aaf4d7da916575a/Tokens_-_English.png" alt="" /><p>Provide the Access Token as an <code>Authorization</code> header in your requests.</p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#ea896d7b80eb4fbeaa7e61cd69f4515c_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#ea896d7b80eb4fbeaa7e61cd69f4515c_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#ea896d7b80eb4fbeaa7e61cd69f4515c_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#ea896d7b80eb4fbeaa7e61cd69f4515c_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#ea896d7b80eb4fbeaa7e61cd69f4515c_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#ea896d7b80eb4fbeaa7e61cd69f4515c_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#ea896d7b80eb4fbeaa7e61cd69f4515c_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#ea896d7b80eb4fbeaa7e61cd69f4515c_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#ea896d7b80eb4fbeaa7e61cd69f4515c_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#ea896d7b80eb4fbeaa7e61cd69f4515c_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="ea896d7b80eb4fbeaa7e61cd69f4515c_shell"><pre><code class="language-text no-lines">curl --request get \

  --url http:///%7ByourDomain%7D/api_path \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'</code></pre></div><div role="tabpanel" class="tab-pane " id="ea896d7b80eb4fbeaa7e61cd69f4515c_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;http:///%7ByourDomain%7D/api_path&quot;);

var request = new RestRequest(Method.GET);

request.AddHeader(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="ea896d7b80eb4fbeaa7e61cd69f4515c_go"><pre><code class="language-go no-lines">package main



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



}</code></pre></div><div role="tabpanel" class="tab-pane " id="ea896d7b80eb4fbeaa7e61cd69f4515c_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.get(&quot;http:///%7ByourDomain%7D/api_path&quot;)

  .header(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="ea896d7b80eb4fbeaa7e61cd69f4515c_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'get',

  url: 'http:///%7ByourDomain%7D/api_path',

  headers: {authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="ea896d7b80eb4fbeaa7e61cd69f4515c_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="ea896d7b80eb4fbeaa7e61cd69f4515c_php"><pre><code class="language-php no-lines">$curl = curl_init();



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

}</code></pre></div><div role="tabpanel" class="tab-pane " id="ea896d7b80eb4fbeaa7e61cd69f4515c_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPConnection(&quot;&quot;)



headers = { 'authorization': &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot; }



conn.request(&quot;get&quot;, &quot;%7ByourDomain%7D/api_path&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="ea896d7b80eb4fbeaa7e61cd69f4515c_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'



url = URI(&quot;http:///%7ByourDomain%7D/api_path&quot;)



http = Net::HTTP.new(url.host, url.port)



request = Net::HTTP::Get.new(url)

request[&quot;authorization&quot;] = 'Bearer YOUR_ACCESS_TOKEN_HERE'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="ea896d7b80eb4fbeaa7e61cd69f4515c_swift"><pre><code class="language-swift no-lines">import Foundation



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



</p><p><div class="checkpoint">Node JS API Step 4 Checkpoint <div class="checkpoint-default"><p>Now that you have configured your application, run your application to verify that:</p><ul><li><p><code>GET /api/public </code>is available for non-authenticated requests.</p></li><li><p><code>GET /api/private </code>is available for authenticated requests.</p></li><li><p><code>GET /api/private-scoped </code>is available for authenticated requests containing an access token with the <code>read:messages </code>scope.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not start successfully:</p><ul><li><p>Verify you added the token as the <code>Authorization</code> header</p></li><li><p>Ensure the token has the correct scopes. Verify with <a href="https://jwt.io/" target="_blank" rel="noreferrer noopener">jwt.io</a>.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>
