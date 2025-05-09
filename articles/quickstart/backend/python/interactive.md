---
title: Add Authorization to Your Flask API Application
description: This guide demonstrates how to integrate Auth0 with any new or existing Python API built with Flask.
interactive:  true
files:
 - files/validator
 - files/server
github:
  path: 00-Starter-Seed
locale: en-US
---

# Add Authorization to Your Flask API Application


<p>This guide demonstrates how to integrate Auth0 with any new or existing Python API built with <a href="https://flask.palletsprojects.com/" target="_blank" rel="noreferrer noopener">Flask</a>.</p><p>If you haven&#39;t created an API in your Auth0 dashboard yet, you can use the interactive selector to create a new Auth0 API or select an existing API that represents the project you want to integrate with.</p><p>Alternatively, you can read <a href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis" target="_blank" >our getting started guide</a> that helps you set up your first API through the Auth0 dashboard.</p><p>Every API in Auth0 is configured using an API Identifier that your application code will use as the Audience to validate the Access Token.</p><p><div class="alert-container" severity="default"><p><b>New to Auth0?</b> Learn <a href="https://auth0.com/docs/overview" target="_blank" >how Auth0 works</a> and read about <a href="https://auth0.com/docs/api-auth" target="_blank" >implementing API authentication and authorization</a> using the OAuth 2.0 framework.</p></div></p><p></p>

## Define permissions


<p>Permissions let you define how resources can be accessed on behalf of the user with a given access token. For example, you might choose to grant read access to the <code>messages</code> resource if users have the manager access level, and a write access to that resource if they have the administrator access level.</p><p>You can define allowed permissions in the <b>Permissions</b> view of the Auth0 Dashboard&#39;s <a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">APIs</a> section.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/e61793a2822d095666002c3f65c71ac2/configure-permissions.png" alt="Auth0 Dashboard> Applications > APIs > [Specific API] > Permissions tab" /><p><div class="alert-container" severity="default"><p>This example uses the <code>read:messages</code> scope.</p></div></p>

## Install dependencies


<p>Add the following dependencies to your <code>requirements.txt</code>:</p><p><pre><code class="language-powershell"># /requirements.txt



    flask

    Authlib

</code></pre>

</p>

## Create the JWT validator {{{ data-action="code" data-code="validator.py" }}}


<p>We&#39;re going to use a library called <a href="https://github.com/lepture/authlib" target="_blank" rel="noreferrer noopener">Authlib</a> to create a <a href="https://docs.authlib.org/en/latest/flask/1/resource-server.html" target="_blank" rel="noreferrer noopener">ResourceProtector</a>, which is a type of <a href="https://flask.palletsprojects.com/patterns/viewdecorators/" target="_blank" rel="noreferrer noopener">Flask decorator</a> that protects our resources (API routes) with a given validator.</p><p>The validator will validate the Access Token that we pass to the resource by checking that it has a valid signature and claims.</p><p>We can use AuthLib&#39;s <code>JWTBearerTokenValidator</code> validator with a few tweaks to make sure it conforms to our requirements on <a href="https://auth0.com/docs/secure/tokens/access-tokens/validate-access-tokens" target="_blank" >validating Access Tokens</a>.</p><p>To create our <code>Auth0JWTBearerTokenValidator</code> we need to pass it our <code>domain</code> and <code>audience</code> (API Identifier). It will then get the public key required to verify the token&#39;s signature and pass it to the <code>JWTBearerTokenValidator</code> class.</p><p>We&#39;ll then override the class&#39;s <code>claims_options</code> to make sure the token&#39;s expiry, audience and issue claims are validated according to our requirements.</p>

## Create a Flask application {{{ data-action="code" data-code="server.py" }}}


<p>Next we&#39;ll create a Flask application with 3 API routes:</p><ul><li><p><code>/api/public </code>A public endpoint that requires no authentication.</p></li><li><p><code>/api/private </code>A private endpoint that requires a valid Access Token JWT.</p></li><li><p><code>/api/private-scoped </code>A private endpoint that requires a valid Access Token JWT that contains the given <code>scope</code>.</p></li></ul><p>The protected routes will have a <code>require_auth</code> decorator which is a <code>ResourceProtector</code> that uses the <code>Auth0JWTBearerTokenValidator</code> we created earlier.</p><p>To create the <code>Auth0JWTBearerTokenValidator</code> we&#39;ll pass it our tenant&#39;s domain and the API Identifier of the API we created earlier.</p><p>The <code>require_auth</code> decorator on the <code>private_scoped</code> route accepts an additional argument <code>&quot;read:messages&quot;</code>, which checks the Access Token for the Permission (Scope) we created earlier.</p><h3>Make a Call to Your API</h3><p>To make calls to your API, you need an Access Token. You can get an Access Token for testing purposes from the <b>Test</b> view in your <a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">API settings</a>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/6jeVBuypOGX5qMRXeJn5ow/5e79037f6c852d2043789d622bdb9562/Quickstart_Example_App_-_English.png" alt="Auth0 Dashboard> Applications > API > [Specific API] > Test tab" /><p>Provide the Access Token as an <code>Authorization</code> header in your requests.</p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#93c82a3a533244298e9b2c2fbcdeaf78_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#93c82a3a533244298e9b2c2fbcdeaf78_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#93c82a3a533244298e9b2c2fbcdeaf78_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#93c82a3a533244298e9b2c2fbcdeaf78_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#93c82a3a533244298e9b2c2fbcdeaf78_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#93c82a3a533244298e9b2c2fbcdeaf78_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#93c82a3a533244298e9b2c2fbcdeaf78_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#93c82a3a533244298e9b2c2fbcdeaf78_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#93c82a3a533244298e9b2c2fbcdeaf78_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#93c82a3a533244298e9b2c2fbcdeaf78_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="93c82a3a533244298e9b2c2fbcdeaf78_shell"><pre><code class="language-text no-lines">curl --request get \

  --url 'http:///${account.namespace}/api_path' \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'</code></pre></div><div role="tabpanel" class="tab-pane " id="93c82a3a533244298e9b2c2fbcdeaf78_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;http:///${account.namespace}/api_path&quot;);

var request = new RestRequest(Method.GET);

request.AddHeader(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="93c82a3a533244298e9b2c2fbcdeaf78_go"><pre><code class="language-go no-lines">package main



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



}</code></pre></div><div role="tabpanel" class="tab-pane " id="93c82a3a533244298e9b2c2fbcdeaf78_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.get(&quot;http:///${account.namespace}/api_path&quot;)

  .header(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="93c82a3a533244298e9b2c2fbcdeaf78_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'get',

  url: 'http:///${account.namespace}/api_path',

  headers: {authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="93c82a3a533244298e9b2c2fbcdeaf78_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="93c82a3a533244298e9b2c2fbcdeaf78_php"><pre><code class="language-php no-lines">$curl = curl_init();



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

}</code></pre></div><div role="tabpanel" class="tab-pane " id="93c82a3a533244298e9b2c2fbcdeaf78_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPConnection(&quot;&quot;)



headers = { 'authorization': &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot; }



conn.request(&quot;get&quot;, &quot;/${account.namespace}/api_path&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="93c82a3a533244298e9b2c2fbcdeaf78_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'



url = URI(&quot;http:///${account.namespace}/api_path&quot;)



http = Net::HTTP.new(url.host, url.port)



request = Net::HTTP::Get.new(url)

request[&quot;authorization&quot;] = 'Bearer YOUR_ACCESS_TOKEN_HERE'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="93c82a3a533244298e9b2c2fbcdeaf78_swift"><pre><code class="language-swift no-lines">import Foundation



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
