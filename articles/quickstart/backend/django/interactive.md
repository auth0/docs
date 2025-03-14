---
title: Add Authorization to Your Django API Application
description: This tutorial demonstrates how to add authorization to a Python API built with Django.
interactive:  true
files:
 - files/apiexample/validator
 - files/apiexample/views
 - files/apiexample/urls
github:
  path: https://github.com/auth0-samples/auth0-django-api/tree/master/01-Authorization
locale: en-US
---

# Add Authorization to Your Django API Application


<p>This guide demonstrates how to integrate Auth0 with any new or existing Python API built with <a href="https://www.djangoproject.com/">Django</a>.</p><p>If you haven&#39;t created an API in your Auth0 Dashboard yet, you can use the interactive selector to create a new Auth0 API or select an existing API that represents the project you want to integrate with.</p><p>Alternatively, you can read our <a data-contentfulid="450QmC9wuUtjlt8UQzRgPd-en-US">getting started guide</a>, which will help you set up your first API through the Auth0 Dashboard.</p><p>Every API in Auth0 is configured using an API Identifier that your application code will use as the Audience to validate the Access Token.</p><p><div class="alert-container" severity="default"><p><b>New to Auth0?</b> Learn <a data-contentfulid="43RIpZkDhzyy40WfzZvz4y-en-US">how Auth0 works</a> and read about <a data-contentfulid="6eZFaxxcNpFYwyEI05AXXA-en-US">implementing API authentication and authorization</a> using the OAuth 2.0 framework.</p></div></p><p></p>

## Define permissions


<p>Permissions let you define how resources can be accessed on behalf of the user with a given access token. For example, you might choose to grant read access to the <code>messages</code> resource if users have the manager access level, and grant write access to that resource if they have the administrator access level.</p><p>You can define allowed permissions in the <b>Permissions</b> view of the Auth0 Dashboard&#39;s <a href="https://manage.auth0.com/#/apis">APIs</a> section. The following example uses the <code>read:messages</code> scope.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/e61793a2822d095666002c3f65c71ac2/configure-permissions.png" alt="Auth0 Dashboard> Applications > APIs > [Specific API] > Permissions tab" /><p></p>

## Configure Django to use Auth0


<h3>Install dependencies</h3><ol><li><p>Add the following dependencies to your <code>requirements.txt</code>:

</p></li><li><p>Run <code>pip install -r requirements.txt</code></p></li></ol><h3>Create a Django application</h3><p></p><p></p>

## Create the JWT validator {{{ data-action="code" data-code="apiexample/validator.py" }}}

You're going to use a library called <a href="https://github.com/lepture/authlib" target="_blank" rel="noreferrer">Authlib</a> to create a <a href="https://docs.authlib.org/en/latest/flask/1/resource-server.html" target="_blank" rel="noreferrer">ResourceProtector</a>, which is a type of <a href="https://docs.djangoproject.com/en/5.1/topics/http/decorators/" target="_blank" rel="noreferrer">Django view decorator</a> that protects your resources (API views) with a given validator.

The validator will verify the Access Token that you pass to the resource by checking that it has a valid signature and claims.

You can use AuthLib's `JWTBearerTokenValidator` validator with a few tweaks to make sure it conforms to our requirements on <a href="https://auth0.com/docs/secure/tokens/access-tokens/validate-access-tokens" target="_blank" rel="noreferrer">validating Access Tokens</a>.

To create your `Auth0JWTBearerTokenValidator`, you need to pass it your `domain` and `audience` (API Identifier). It will then get the public key required to verify the token's signature and pass it to the `JWTBearerTokenValidator` class.

You'll then override the class's `claims_options` to make sure the token's `expiry`, `audience`, and `issue` claims are validated according to our requirements.

Create the file `apiexample/validator.py` using the code from the interactive panel.

## Create the API views {{{ data-action="code" data-code="apiexample/views.py" }}}


<p>Next, you&#39;ll create three API views in <code>apiexample/views.py</code>:</p><ul><li><p><code>/api/public</code>: A public endpoint that requires no authentication.</p></li><li><p><code>/api/private</code>: A private endpoint that requires a valid Access Token JWT.</p></li><li><p><code>/api/private-scoped</code>: A private endpoint that requires a valid Access Token JWT containing the given <code>scope</code>.</p></li></ul><p>The protected routes will have a <code>require_auth</code> decorator, which is a <code>ResourceProtector</code> that uses the <code>Auth0JWTBearerTokenValidator</code> you created earlier.</p><p>To create the <code>Auth0JWTBearerTokenValidator</code>, you&#39;ll pass it to your tenant&#39;s domain and the API Identifier of the API you created earlier.</p><p>The <code>require_auth</code> decorator on the <code>private_scoped</code> route accepts an additional argument <code>&quot;read:messages&quot;</code>, which checks the Access Token for the Permission (Scope) you created earlier.</p>

## Add URL mappings {{{ data-action="code" data-code="apiexample/urls.py#8:10" }}}


<p>In previous steps, you added methods to the <code>views.py</code> file. Next, map those methods to URLs using Django&#39;s <a href="https://docs.djangoproject.com/en/4.0/topics/http/urls/">URL dispatcher</a>, which lets you map URL patterns to views. </p><p>Add the URL patterns to your <code>apiexample/urls.py</code> file. </p><h3>Make a Call to Your API</h3><p>To make calls to your API, you will need an access token. You can retrieve an access token for testing purposes from the <b>Test</b> view in your <a href="https://manage.auth0.com/#/apis">API settings</a>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/6jeVBuypOGX5qMRXeJn5ow/5e79037f6c852d2043789d622bdb9562/Quickstart_Example_App_-_English.png" alt="Auth0 Dashboard> Applications > API > [Specific API] > Test tab" /><p>Provide the access token as an <code>Authorization</code> header in your requests.</p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#b642099a970043efacbf995e79c60c4c_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#b642099a970043efacbf995e79c60c4c_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#b642099a970043efacbf995e79c60c4c_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#b642099a970043efacbf995e79c60c4c_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#b642099a970043efacbf995e79c60c4c_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#b642099a970043efacbf995e79c60c4c_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#b642099a970043efacbf995e79c60c4c_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#b642099a970043efacbf995e79c60c4c_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#b642099a970043efacbf995e79c60c4c_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#b642099a970043efacbf995e79c60c4c_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="b642099a970043efacbf995e79c60c4c_shell"><pre><code class="language-text no-lines">curl --request get \

  --url 'http:///${account.namespace}.com/api_path' \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'</code></pre></div><div role="tabpanel" class="tab-pane " id="b642099a970043efacbf995e79c60c4c_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;http:///${account.namespace}.com/api_path&quot;);

var request = new RestRequest(Method.GET);

request.AddHeader(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="b642099a970043efacbf995e79c60c4c_go"><pre><code class="language-go no-lines">package main



import (

 &quot;fmt&quot;

 &quot;net/http&quot;

 &quot;io/ioutil&quot;

)



func main() {



 url := &quot;http:///${account.namespace}.com/api_path&quot;



 req, _ := http.NewRequest(&quot;get&quot;, url, nil)



 req.Header.Add(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;)



 res, _ := http.DefaultClient.Do(req)



 defer res.Body.Close()

 body, _ := ioutil.ReadAll(res.Body)



 fmt.Println(res)

 fmt.Println(string(body))



}</code></pre></div><div role="tabpanel" class="tab-pane " id="b642099a970043efacbf995e79c60c4c_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.get(&quot;http:///${account.namespace}.com/api_path&quot;)

  .header(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="b642099a970043efacbf995e79c60c4c_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'get',

  url: 'http:///${account.namespace}.com/api_path',

  headers: {authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="b642099a970043efacbf995e79c60c4c_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



NSDictionary *headers = @{ @&quot;authorization&quot;: @&quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot; };



NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@&quot;http:///${account.namespace}.com/api_path&quot;]

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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="b642099a970043efacbf995e79c60c4c_php"><pre><code class="language-php no-lines">$curl = curl_init();



curl_setopt_array($curl, [

  CURLOPT_URL =&gt; &quot;http:///${account.namespace}.com/api_path&quot;,

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

}</code></pre></div><div role="tabpanel" class="tab-pane " id="b642099a970043efacbf995e79c60c4c_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPConnection(&quot;&quot;)



headers = { 'authorization': &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot; }



conn.request(&quot;get&quot;, &quot;/${account.namespace}.com/api_path&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="b642099a970043efacbf995e79c60c4c_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'



url = URI(&quot;http:///${account.namespace}.com/api_path&quot;)



http = Net::HTTP.new(url.host, url.port)



request = Net::HTTP::Get.new(url)

request[&quot;authorization&quot;] = 'Bearer YOUR_ACCESS_TOKEN_HERE'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="b642099a970043efacbf995e79c60c4c_swift"><pre><code class="language-swift no-lines">import Foundation



let headers = [&quot;authorization&quot;: &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;]



let request = NSMutableURLRequest(url: NSURL(string: &quot;http:///${account.namespace}.com/api_path&quot;)! as URL,

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



</p><p></p>
