---
title: Add Authorization to Your Go Application
description: This tutorial demonstrates how to add authorization to a Go API.
interactive:  true
files:
 - files/middleware/jwt
 - files/main
github:
  path: 01-Authorization-RS256
locale: en-US
---

# Add Authorization to Your Go Application


<p>This guide demonstrates how to integrate Auth0 with any new or existing Go API application using the <a href="https://github.com/auth0/go-jwt-middleware" target="_blank" rel="noreferrer noopener">go-jwt-middleware</a> package.</p><p>If you have not created an API in your Auth0 dashboard yet, use the interactive selector to create a new Auth0 API or select an existing API for your project.</p><p>To set up your first API through the Auth0 dashboard, review <a data-contentfulid="450QmC9wuUtjlt8UQzRgPd-en-US">our getting started guide</a>.</p><p>Each Auth0 API uses the API Identifier, which your application needs to validate the access token.</p><p><div class="alert-container" severity="default"><p><b>New to Auth0?</b> Learn <a data-contentfulid="43RIpZkDhzyy40WfzZvz4y-en-US">how Auth0 works</a> and read about <a data-contentfulid="6eZFaxxcNpFYwyEI05AXXA-en-US">implementing API authentication and authorization</a> using the OAuth 2.0 framework.</p></div></p><p></p>

## Define permissions


<p>Permissions let you define how resources can be accessed on behalf of the user with a given access token. For example, you might choose to grant read access to the <code>messages</code> resource if users have the manager access level, and a write access to that resource if they have the administrator access level.</p><p>You can define allowed permissions in the <b>Permissions</b> view of the Auth0 Dashboard&#39;s <a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">APIs</a> section. The following example uses the <code>read:messages</code> scope.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/e61793a2822d095666002c3f65c71ac2/configure-permissions.png" alt="Auth0 Dashboard> Applications > APIs > [Specific API] > Permissions tab" /><p></p>

## Install dependencies


<p>Add a <code>go.mod</code> file to list all the necessary dependencies.</p><p><pre><code>// go.mod



module 01-Authorization-RS256



go 1.21



require (

	github.com/auth0/go-jwt-middleware/v2 v2.2.0

	github.com/joho/godotenv v1.5.1

)

</code></pre>

</p><p>Download dependencies by running the following shell command:</p><p><pre><code>go mod download

</code></pre>

</p>

## Configure your application


<p>Create a <code>.env</code> file within the root of your project directory to store the app configuration. Then, fill in the environment variables:</p><p><pre><code># The URL of our Auth0 Tenant Domain.

# If you're using a Custom Domain, be sure to set this to that value instead.

AUTH0_DOMAIN='${account.namespace}'



# Our Auth0 API's Identifier.

AUTH0_AUDIENCE='${apiIdentifier}'

</code></pre>

</p>

## Create a middleware to validate access tokens {{{ data-action="code" data-code="middleware/jwt.go" }}}


<p>The <code>EnsureValidToken</code> middleware function validates the access token. You can apply this function to any endpoints you wish to protect. If the token is valid, the endpoint releases the resources. If the token is not valid, the API returns a <code>401 Authorization</code> error.</p><p>Set up the <b>go-jwt-middleware</b> middleware to verify access tokens from incoming requests.</p><p>By default, your API will be set up to use RS256 as the algorithm for signing tokens. Since RS256 works by using a private/public keypair, tokens can be verified against the public key for your Auth0 account. This public key is accessible at <code>https://${account.namespace}/.well-known/jwks.json</code>.</p><p>Include a mechanism to check that the token has sufficient <b>scope</b> to access the requested resources.</p><p>Create a function <code>HasScope</code> to check and ensure the access token has the correct scope before returning a successful response.</p>

## Protect API endpoints {{{ data-action="code" data-code="main.go" }}}


<p>In this example, create an <code>/api/public</code> endpoint that does not use the <code>EnsureToken</code> middleware as it is accessible to non-authenticated requests.</p><p>Create an <code>/api/private</code> endpoint that requires the <code>EnsureToken</code> middleware as it is only available to authenticated requests containing an access token with no additional scope.</p><p>Create an <code>/api/private-scoped</code> endpoint that requires the <code>EnsureToken</code> middleware and <code>HasScope</code> as it is only available for authenticated requests containing an access token with the <code>read:messages</code> scope granted.</p><p><div class="alert-container" severity="default"><p>Only the <code>read:messages</code> scope is checked by the <code>HasScope</code> function. You may want to extend it or make it a standalone middleware that accepts multiple scopes to fit your use case.</p></div></p><h3>Make a Call to Your API</h3><p>To make calls to your API, you need an Access Token. You can get an Access Token for testing purposes from the <b>Test</b> view in your <a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">API settings</a>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/6jeVBuypOGX5qMRXeJn5ow/5e79037f6c852d2043789d622bdb9562/Quickstart_Example_App_-_English.png" alt="Auth0 Dashboard> Applications > API > [Specific API] > Test tab" /><p>Provide the Access Token as an <code>Authorization</code> header in your requests.</p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#f066434ee3cf409eb166618b4c611170_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#f066434ee3cf409eb166618b4c611170_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#f066434ee3cf409eb166618b4c611170_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#f066434ee3cf409eb166618b4c611170_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#f066434ee3cf409eb166618b4c611170_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#f066434ee3cf409eb166618b4c611170_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#f066434ee3cf409eb166618b4c611170_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#f066434ee3cf409eb166618b4c611170_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#f066434ee3cf409eb166618b4c611170_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#f066434ee3cf409eb166618b4c611170_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="f066434ee3cf409eb166618b4c611170_shell"><pre><code class="language-text no-lines">curl --request get \

  --url 'http:///${account.namespace}/api_path' \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'</code></pre></div><div role="tabpanel" class="tab-pane " id="f066434ee3cf409eb166618b4c611170_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;http:///${account.namespace}/api_path&quot;);

var request = new RestRequest(Method.GET);

request.AddHeader(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="f066434ee3cf409eb166618b4c611170_go"><pre><code class="language-go no-lines">package main



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



}</code></pre></div><div role="tabpanel" class="tab-pane " id="f066434ee3cf409eb166618b4c611170_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.get(&quot;http:///${account.namespace}/api_path&quot;)

  .header(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="f066434ee3cf409eb166618b4c611170_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'get',

  url: 'http:///${account.namespace}/api_path',

  headers: {authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="f066434ee3cf409eb166618b4c611170_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="f066434ee3cf409eb166618b4c611170_php"><pre><code class="language-php no-lines">$curl = curl_init();



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

}</code></pre></div><div role="tabpanel" class="tab-pane " id="f066434ee3cf409eb166618b4c611170_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPConnection(&quot;&quot;)



headers = { 'authorization': &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot; }



conn.request(&quot;get&quot;, &quot;/${account.namespace}/api_path&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="f066434ee3cf409eb166618b4c611170_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'



url = URI(&quot;http:///${account.namespace}/api_path&quot;)



http = Net::HTTP.new(url.host, url.port)



request = Net::HTTP::Get.new(url)

request[&quot;authorization&quot;] = 'Bearer YOUR_ACCESS_TOKEN_HERE'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="f066434ee3cf409eb166618b4c611170_swift"><pre><code class="language-swift no-lines">import Foundation



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



</p><p><div class="checkpoint">Go API Quickstart - Step 5 Checkpoint <div class="checkpoint-default"><p>Now that you have configured your application, run your application and verify that:</p><ul><li><p><code>GET /api/public </code>is available for non-authenticated requests.</p></li><li><p><code>GET /api/private </code>is available for authenticated requests.</p></li><li><p><code>GET /api/private-scoped </code>is available for authenticated requests containing an access token with the <code>read:messages </code>scope.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not start successfully:</p><ul><li><p>Verify you added the token as the <code>Authorization</code> header</p></li><li><p>Ensure the token has the correct scopes. Verify with <a href="https://jwt.io/" target="_blank" rel="noreferrer noopener">jwt.io</a>.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p><p></p>
