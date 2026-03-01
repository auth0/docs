---
title: Add Authorization to Your Ruby on Rails API
description: This tutorial performs access token validation using the jwt Gem within a custom Auth0Client class.
interactive:  true
files:
 - files/app/controllers/application_controller
 - files/app/lib/auth0_client
 - files/app/controllers/concerns/secured
 - files/app/controllers/public_controller
 - files/app/controllers/private_controller
github:
  path: 01-Authentication-RS256
locale: en-US
---

# Add Authorization to Your Ruby on Rails API


<p>This tutorial performs access token validation using the <a href="https://github.com/jwt/ruby-jwt" target="_blank" rel="noreferrer noopener"><b>jwt</b></a> Gem within a custom <code>Auth0Client</code> class. A Concern called <code>Secured</code> is used to authorize endpoints which require authentication through an incoming access token.</p><p>If you have not created an API in your Auth0 dashboard yet, use the interactive selector to create a new Auth0 API or select an existing API for your project.</p><p>To set up your first API through the Auth0 dashboard, review <a href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis" target="_blank" >our getting started guide</a>.</p><p>Each Auth0 API uses the API Identifier, which your application needs to validate the access token.</p><p><div class="alert-container" severity="default"><p><b>New to Auth0?</b> Learn <a href="https://auth0.com/docs/overview" target="_blank" >how Auth0 works</a> and read about <a href="https://auth0.com/docs/api-auth" target="_blank" >implementing API authentication and authorization</a> using the OAuth 2.0 framework.</p></div></p><p></p>

## Define permissions


<p>Permissions let you define how resources can be accessed on behalf of the user with a given access token. For example, you might choose to grant read access to the <code>messages</code> resource if users have the manager access level, and a write access to that resource if they have the administrator access level.</p><p>You can define allowed permissions in the <b>Permissions</b> view of the Auth0 Dashboard&#39;s <a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">APIs</a> section.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/e61793a2822d095666002c3f65c71ac2/configure-permissions.png" alt="Auth0 Dashboard> Applications > APIs > [Specific API] > Permissions tab" /><p><div class="alert-container" severity="default"><p>This example uses the <code>read:messages</code> scope.</p></div></p>

## Install dependencies


<p>Install the <b>jwt </b>Gem.</p><p><pre><code class="language-powershell">gem 'jwt'

    bundle install

</code></pre>

 </p><p></p>

## Create an Auth0Client class {{{ data-action="code" data-code="app/controllers/concerns/secured.rb" }}}


<p>Create a class called <code>Auth0Client</code>. This class decodes and verifies the incoming access token taken from the <code>Authorization</code> header of the request.</p><p>The <code>Auth0Client</code> class retrieves the public key for your Auth0 tenant and then uses it to verify the signature of the access token. The <code>Token</code> struct defines a <code>validate_permissions</code> method to look for a particular <code>scope</code> in an access token by providing an array of required scopes and check if they are present in the payload of the token.</p>

## Define a Secured concern {{{ data-action="code" data-code="app/controllers/concerns/secured.rb" }}}


<p>Create a Concern called <code>Secured</code> which looks for the access token in the <code>Authorization</code> header of an incoming request.</p><p>If the token is present, the <code>Auth0Client.validate_token</code> will use the <code>jwt</code> Gem to verify the token&#39;s signature and validate the token&#39;s claims.</p><p>In addition to verifying that the access token is valid, the Concern also includes a mechanism for confirming the token has the sufficient <b>scope</b> to access the requested resources. In this example we define a <code>validate_permissions</code> method that receives a block and checks the permissions by calling the <code>Token.validate_permissions</code> method from the <code>Auth0Client</code> class.</p><p>For the <code>/private-scoped</code> route, the scopes defined will be intersected with the scopes coming in the payload, to determine if it contains one or more items from the other array.</p>

## Include the Secure concern in your ApplicationController {{{ data-action="code" data-code="app/controllers/application_controller.rb" }}}


<p>By adding the <code>Secure</code> concern to your application controller, you&#39;ll only need to use a <code>before_action</code> filter in the controller that requires authorization.</p>

## Create the public endpoint {{{ data-action="code" data-code="app/controllers/public_controller.rb" }}}


<p>Create a controller to handle the public endpoint <code>/api/public</code>.</p><p>The <code>/public</code> endpoint does not require any authorization so no <code>before_action</code> is needed.</p>

## Create the private endpoints {{{ data-action="code" data-code="app/controllers/private_controller.rb" }}}


<p>Create a controller to handle the private endpoints: <code>/api/private</code> and <code>/api/private-scoped</code>.</p><p><code>/api/private</code> is available for authenticated requests containing an access token with no additional scopes.</p><p><code>/api/private-scoped</code> is available for authenticated requests containing an access token with the <code>read:messages</code> scope granted</p><p>The protected endpoints need to call the <code>authorize</code> method from the <code>Secured</code> concern, for that you use <code>before_action :authorize</code>, this ensure the <code>Secured.authorize</code> method is called before every action in the <code>PrivateController</code>.</p><h3>Make a Call to Your API</h3><p>To make calls to your API, you need an Access Token. You can get an Access Token for testing purposes from the <b>Test</b> view in your <a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">API settings</a>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/6jeVBuypOGX5qMRXeJn5ow/5e79037f6c852d2043789d622bdb9562/Quickstart_Example_App_-_English.png" alt="Auth0 Dashboard> Applications > API > [Specific API] > Test tab" /><p>Provide the Access Token as an <code>Authorization</code> header in your requests.</p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#c65c7c01784a40fd8e8ab4e2feaa6a5e_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#c65c7c01784a40fd8e8ab4e2feaa6a5e_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#c65c7c01784a40fd8e8ab4e2feaa6a5e_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#c65c7c01784a40fd8e8ab4e2feaa6a5e_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#c65c7c01784a40fd8e8ab4e2feaa6a5e_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#c65c7c01784a40fd8e8ab4e2feaa6a5e_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#c65c7c01784a40fd8e8ab4e2feaa6a5e_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#c65c7c01784a40fd8e8ab4e2feaa6a5e_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#c65c7c01784a40fd8e8ab4e2feaa6a5e_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#c65c7c01784a40fd8e8ab4e2feaa6a5e_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="c65c7c01784a40fd8e8ab4e2feaa6a5e_shell"><pre><code class="language-text no-lines">curl --request get \

  --url 'http:///${account.namespace}/api_path' \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'</code></pre></div><div role="tabpanel" class="tab-pane " id="c65c7c01784a40fd8e8ab4e2feaa6a5e_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;http:///${account.namespace}/api_path&quot;);

var request = new RestRequest(Method.GET);

request.AddHeader(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="c65c7c01784a40fd8e8ab4e2feaa6a5e_go"><pre><code class="language-go no-lines">package main



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



}</code></pre></div><div role="tabpanel" class="tab-pane " id="c65c7c01784a40fd8e8ab4e2feaa6a5e_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.get(&quot;http:///${account.namespace}/api_path&quot;)

  .header(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="c65c7c01784a40fd8e8ab4e2feaa6a5e_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'get',

  url: 'http:///${account.namespace}/api_path',

  headers: {authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="c65c7c01784a40fd8e8ab4e2feaa6a5e_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="c65c7c01784a40fd8e8ab4e2feaa6a5e_php"><pre><code class="language-php no-lines">$curl = curl_init();



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

}</code></pre></div><div role="tabpanel" class="tab-pane " id="c65c7c01784a40fd8e8ab4e2feaa6a5e_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPConnection(&quot;&quot;)



headers = { 'authorization': &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot; }



conn.request(&quot;get&quot;, &quot;/${account.namespace}/api_path&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="c65c7c01784a40fd8e8ab4e2feaa6a5e_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'



url = URI(&quot;http:///${account.namespace}/api_path&quot;)



http = Net::HTTP.new(url.host, url.port)



request = Net::HTTP::Get.new(url)

request[&quot;authorization&quot;] = 'Bearer YOUR_ACCESS_TOKEN_HERE'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="c65c7c01784a40fd8e8ab4e2feaa6a5e_swift"><pre><code class="language-swift no-lines">import Foundation



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



</p><p><div class="checkpoint">Ruby on rails Step 7 Checkpoint <div class="checkpoint-default"><p>Now that you have configured your application, run your application to verify that:</p><ul><li><p><code>GET /api/public </code>is available for non-authenticated requests.</p></li><li><p><code>GET /api/private </code>is available for authenticated requests.</p></li><li><p><code>GET /api/private-scoped </code>is available for authenticated requests containing an Access Token with the <code>read:messages </code>scope.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not start successfully:</p><ul><li><p>Verify you added the token as the <code>Authorization</code> header</p></li><li><p>Ensure the token has the correct scopes. Verify with <a href="https://jwt.io/" target="_blank" rel="noreferrer noopener">jwt.io</a>.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>
