---
title: Add Authorization to Your ASP.NET Core Web API Application
description: This tutorial demonstrates how to add authorization to an ASP.NET Core Web API application using the standard JWT middleware.
interactive:  true
files:
 - files/appsettings
 - files/Program
 - files/HasScopeHandler
 - files/HasScopeRequirement
 - files/ApiController
github:
  path: https://github.com/auth0-samples/auth0-aspnetcore-webapi-samples/tree/master/Quickstart/01-Authorization
locale: en-US
---

# Add Authorization to Your ASP.NET Core Web API Application


<p>Auth0 allows you to add authentication and access user profile information in almost any application type quickly. This guide demonstrates how to integrate Auth0 with any new or existing ASP.NET Web API application using the <code>Microsoft.AspNetCore.Authentication.JwtBearer</code> package.</p><p>If you haven&#39;t created an API in your Auth0 dashboard yet, you can use the interactive selector to create a new Auth0 API or select an existing API that represents the project you want to integrate with.</p><p>Alternatively, you can <a data-contentfulid="450QmC9wuUtjlt8UQzRgPd-en-US">read our getting started guide</a>, which will help you set up your first API through the Auth0 Dashboard.</p><p>Note that every API in Auth0 is configured using an API Identifier; your application code will use the API Identifier as the Audience to validate the access token.</p><p><div class="alert-container" severity="default"><p><b>New to Auth0?</b> Learn <a data-contentfulid="43RIpZkDhzyy40WfzZvz4y-en-US">how Auth0 works</a> and read about <a data-contentfulid="6eZFaxxcNpFYwyEI05AXXA-en-US">implementing API authentication and authorization</a> using the OAuth 2.0 framework.</p></div></p><p></p><p></p>

## Define permissions


<p>Permissions let you define how resources can be accessed on behalf of the user with a given access token. For example, you might choose to grant read access to the <code>messages</code> resource if users have the manager access level, and grant write access to that resource if they have the administrator access level.</p><p>You can define allowed permissions in the <b>Permissions</b> view of the Auth0 Dashboard&#39;s <a href="https://manage.auth0.com/#/apis">APIs</a> section. The following example uses the <code>read:messages</code> scope.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/e61793a2822d095666002c3f65c71ac2/configure-permissions.png" alt="Auth0 Dashboard> Applications > APIs > [Specific API] > Permissions tab" /><p></p>

## Install dependencies


<p>To allow your application to validate access tokens, add a reference to the <code>Microsoft.AspNetCore.Authentication.JwtBearer</code> NuGet package:</p><p><pre><code class="language-powershell">Install-Package Microsoft.AspNetCore.Authentication.JwtBearer

</code></pre>

</p>

## Configure the middleware {{{ data-action="code" data-code="Program.cs" }}}


<p>Set up the authentication middleware by configuring it in your application&#39;s <code>Program.cs</code> file:</p><ol><li><p>Register the authentication services by making a call to the <code>AddAuthentication</code> method. Configure <code>JwtBearerDefaults.AuthenticationScheme</code> as the default scheme.</p></li><li><p>Register the JWT Bearer authentication scheme by making a call to the <code>AddJwtBearer</code> method. Configure your Auth0 domain as the authority and your Auth0 API Identifier as the audience, and be sure that your Auth0 domain and API Identifier are set in your application&#39;s <b>appsettings.json</b> file.

<div class="alert-container" severity="default"><p>In some cases, the access token will not have a <code>sub</code> claim; in this case, the <code>User.Identity.Name</code> will be <code>null</code>. If you want to map a different claim to <code>User.Identity.Name</code>, add it to <code>options.TokenValidationParameters</code> within the <code>AddJwtBearer()</code> call.</p></div></p></li><li><p>Add the authentication and authorization middleware to the middleware pipeline by adding calls to the <code>UseAuthentication </code>and <code>UseAuthorization </code>methods under the <code>var app = builder.Build(); </code>method.</p></li></ol><p></p><p></p>

## Validate scopes {{{ data-action="code" data-code="HasScopeHandler.cs" }}}


<p>To ensure that an access token contains the correct scopes, use <a href="https://docs.microsoft.com/en-us/aspnet/core/security/authorization/policies">Policy-Based Authorization</a> in the ASP.NET Core:</p><ol><li><p>Create a new authorization requirement called <code>HasScopeRequirement</code>, which will check whether the <code>scope </code>claim issued by your Auth0 tenant is present, and if so, will check that the claim contains the requested scope.</p></li><li><p>Under your <code>Program.cs </code>file&#39;s <code>var builder = WebApplication.CreateBuilder(args); </code>method, add a call to the <code>app.AddAuthorization </code>method.</p></li><li><p>Add policies for scopes by calling <code>AddPolicy </code>for each scope.</p></li><li><p>Register a singleton for the <code>HasScopeHandler </code>class.</p></li></ol><p></p>

## Protect API endpoints {{{ data-action="code" data-code="ApiController.cs" }}}


<p>The JWT middleware integrates with the standard ASP.NET Core <a href="https://docs.microsoft.com/en-us/aspnet/core/security/authentication/">Authentication</a> and <a href="https://docs.microsoft.com/en-us/aspnet/core/security/authorization/">Authorization</a> mechanisms.</p><p>To secure an endpoint, add the <code>[Authorize]</code> attribute to your controller action (or the entire controller if you want to protect all of its actions).</p><p>When securing endpoints that require specific scopes, make sure that the correct scope is present in the <code>access_token</code>. To do so, add the <code>Authorize</code> attribute to the <code>Scoped</code> action and pass <code>read:messages</code> as the <code>policy</code> parameter.</p>

## Call your API


<p>The way in which you call your API depends on the type of application you are developing and the framework you are using. To learn more, read the relevant application Quickstart:</p><ul><li><p><a href="/quickstart/spa">Single-Page Applications</a></p></li><li><p><a href="/quickstart/native">Mobile / Native Application</a></p></li></ul><h3>Get an access token</h3><p>Regardless of the type of application you are developing or the framework you are using, to call your API, you need an access token.</p><p>If you call your API from a Single-Page Application (SPA) or Native application, you will receive an access token after the authorization flow completes.</p><p>If you call the API from a command-line tool or other service where a user entering credentials does not exist, use the <a href="https://auth0.com/docs/api/authentication#client-credentials">OAuth Client Credentials Flow</a>. To do so, register a <a href="https://manage.auth0.com/#/applications">Machine-to-Machine Application</a> and pass the following values in your request: </p><ul><li><p><b>Client ID</b> as the <code>client_id</code> parameter.</p></li><li><p><b>Client Secret</b> as the <code>client_secret</code> parameter.</p></li><li><p><b>API Identifier</b> (the same value used to configure the middleware earlier in this quickstart) as the <code>audience</code> parameter. </p></li></ul><p><div class="alert-container" severity="default"><p>To learn more about getting the Client ID and Client Secret for your machine-to-machine application, read <a data-contentfulid="7wT5jc2JhV8eABLmTN4Dhe">Application Settings</a>.</p></div></p><p><b>Example request</b></p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#58efdf02d14b4e6882a62f0e91e57a89_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#58efdf02d14b4e6882a62f0e91e57a89_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#58efdf02d14b4e6882a62f0e91e57a89_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#58efdf02d14b4e6882a62f0e91e57a89_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#58efdf02d14b4e6882a62f0e91e57a89_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#58efdf02d14b4e6882a62f0e91e57a89_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#58efdf02d14b4e6882a62f0e91e57a89_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#58efdf02d14b4e6882a62f0e91e57a89_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#58efdf02d14b4e6882a62f0e91e57a89_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#58efdf02d14b4e6882a62f0e91e57a89_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="58efdf02d14b4e6882a62f0e91e57a89_shell"><pre><code class="language-text no-lines">curl --request post \

  --url 'https://${account.namespace}/oauth/token' \

  --header 'content-type: application/x-www-form-urlencoded'</code></pre></div><div role="tabpanel" class="tab-pane " id="58efdf02d14b4e6882a62f0e91e57a89_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;https://${account.namespace}/oauth/token&quot;);

var request = new RestRequest(Method.POST);

request.AddHeader(&quot;content-type&quot;, &quot;application/x-www-form-urlencoded&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="58efdf02d14b4e6882a62f0e91e57a89_go"><pre><code class="language-go no-lines">package main



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



}</code></pre></div><div role="tabpanel" class="tab-pane " id="58efdf02d14b4e6882a62f0e91e57a89_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.post(&quot;https://${account.namespace}/oauth/token&quot;)

  .header(&quot;content-type&quot;, &quot;application/x-www-form-urlencoded&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="58efdf02d14b4e6882a62f0e91e57a89_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'post',

  url: 'https://${account.namespace}/oauth/token',

  headers: {'content-type': 'application/x-www-form-urlencoded'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="58efdf02d14b4e6882a62f0e91e57a89_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="58efdf02d14b4e6882a62f0e91e57a89_php"><pre><code class="language-php no-lines">$curl = curl_init();



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

}</code></pre></div><div role="tabpanel" class="tab-pane " id="58efdf02d14b4e6882a62f0e91e57a89_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPSConnection(&quot;&quot;)



headers = { 'content-type': &quot;application/x-www-form-urlencoded&quot; }



conn.request(&quot;post&quot;, &quot;/${account.namespace}/oauth/token&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="58efdf02d14b4e6882a62f0e91e57a89_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'

require 'openssl'



url = URI(&quot;https://${account.namespace}/oauth/token&quot;)



http = Net::HTTP.new(url.host, url.port)

http.use_ssl = true

http.verify_mode = OpenSSL::SSL::VERIFY_NONE



request = Net::HTTP::Post.new(url)

request[&quot;content-type&quot;] = 'application/x-www-form-urlencoded'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="58efdf02d14b4e6882a62f0e91e57a89_swift"><pre><code class="language-swift no-lines">import Foundation



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



</p><h3>Call a secure endpoint</h3><p>Now that you have an access token, you can use it to call secure API endpoints. When calling a secure endpoint, you must include the access token as a Bearer token in the <b>Authorization</b> header of the request. For example, you can make a request to the <code>/api/private</code> endpoint:</p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#5146f5f81aa547f8bab2819ae14982c3_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#5146f5f81aa547f8bab2819ae14982c3_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#5146f5f81aa547f8bab2819ae14982c3_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#5146f5f81aa547f8bab2819ae14982c3_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#5146f5f81aa547f8bab2819ae14982c3_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#5146f5f81aa547f8bab2819ae14982c3_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#5146f5f81aa547f8bab2819ae14982c3_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#5146f5f81aa547f8bab2819ae14982c3_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#5146f5f81aa547f8bab2819ae14982c3_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#5146f5f81aa547f8bab2819ae14982c3_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="5146f5f81aa547f8bab2819ae14982c3_shell"><pre><code class="language-text no-lines">curl --request get \

  --url http://localhost:3010/api/private \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN'</code></pre></div><div role="tabpanel" class="tab-pane " id="5146f5f81aa547f8bab2819ae14982c3_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;http://localhost:3010/api/private&quot;);

var request = new RestRequest(Method.GET);

request.AddHeader(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="5146f5f81aa547f8bab2819ae14982c3_go"><pre><code class="language-go no-lines">package main



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



}</code></pre></div><div role="tabpanel" class="tab-pane " id="5146f5f81aa547f8bab2819ae14982c3_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.get(&quot;http://localhost:3010/api/private&quot;)

  .header(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="5146f5f81aa547f8bab2819ae14982c3_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'get',

  url: 'http://localhost:3010/api/private',

  headers: {authorization: 'Bearer YOUR_ACCESS_TOKEN'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="5146f5f81aa547f8bab2819ae14982c3_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="5146f5f81aa547f8bab2819ae14982c3_php"><pre><code class="language-php no-lines">$curl = curl_init();



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

}</code></pre></div><div role="tabpanel" class="tab-pane " id="5146f5f81aa547f8bab2819ae14982c3_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPConnection(&quot;localhost:3010&quot;)



headers = { 'authorization': &quot;Bearer YOUR_ACCESS_TOKEN&quot; }



conn.request(&quot;get&quot;, &quot;/api/private&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="5146f5f81aa547f8bab2819ae14982c3_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'



url = URI(&quot;http://localhost:3010/api/private&quot;)



http = Net::HTTP.new(url.host, url.port)



request = Net::HTTP::Get.new(url)

request[&quot;authorization&quot;] = 'Bearer YOUR_ACCESS_TOKEN'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="5146f5f81aa547f8bab2819ae14982c3_swift"><pre><code class="language-swift no-lines">import Foundation



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



</p><p>Call the <code>/api/private-scoped</code> endpoint in a similar way, but ensure that the API permissions are configured correctly and that the access token includes the <code>read:messages</code> scope.</p><p><div class="checkpoint">ASP.NET API Quickstart - Step 6 Checkpoint <div class="checkpoint-default"><p>You should now be able to call the <code>/api/private</code> and <code>/api/private-scoped</code> endpoints.</p><p>Run your application and verify that:</p><ul><li><p><code>GET /api/private </code>is available for authenticated requests.</p></li><li><p><code>GET /api/private-scoped </code>is available for authenticated requests containing an access token with the <code>read:messages </code>scope.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a few things to double check:</p><ul><li><p>make sure <code>ValidIssuer</code> and <code>ValidAudience</code> are configured correctly</p></li><li><p>make sure the token is added as the <code>Authorization</code> header</p></li><li><p>check that the token has the correct scopes (you can use <a href="https://jwt.io/">jwt.io</a> to verify)</p></li></ul><p>Still having issues? To get more help, check out our <a href="/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a>.</p></div>

  </div></p>
