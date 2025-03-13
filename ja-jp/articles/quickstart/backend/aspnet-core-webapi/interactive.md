---
title: ASP.NET Core Web APIアプリケーションに認可を追加する
description: このチュートリアルは、標準のJWTミドルウェアを使ってASP.NET Core Web APIアプリケーションに認可を追加する方法を説明します。
interactive:  true
files:
 - files/appsettings
 - files/Program
 - files/HasScopeHandler
 - files/HasScopeRequirement
 - files/ApiController
github:
  path: https://github.com/auth0-samples/auth0-aspnetcore-webapi-samples/tree/master/Quickstart/01-Authorization
locale: ja-JP
---

# ASP.NET Core Web APIアプリケーションに認可を追加する


<p>Auth0を使用すると、アプリケーションに認証を追加して、アプリケーションの種類にかかわらず、ユーザープロファイル情報に手軽にアクセスすることができます。このガイドは、新規または既存のASP.NET Web APIアプリケーションに<code>Microsoft.AspNetCore.Authentication.JwtBearer</code>パッケージを使ってAuth0を統合する方法を説明します。</p><p>Auth0 DashboardでAPIをまだ作成していない場合は、対話型のセレクターを使ってAuth0 APIを新規作成します。そうでない場合は、統合したいプロジェクトを表す既存のAPIを選択することができます。</p><p>または、Auth0 Dashboardを使って初めてAPIをセットアップする方法を<a data-contentfulid="450QmC9wuUtjlt8UQzRgPd-ja-JP">使用の開始ガイドで確認</a>することもできます。</p><p>Auth0にあるAPIはそれぞれAPI識別子を使って構成され、アプリケーションのコードはAPI識別子をオーディエンスとしてアクセストークンを検証します。</p><p><div class="alert-container" severity="default"><p><b>Auth0を初めてご利用ですか？</b><a data-contentfulid="43RIpZkDhzyy40WfzZvz4y-ja-JP">Auth0の仕組み</a>と、OAuth 2.0フレームワークを用いた<a data-contentfulid="6eZFaxxcNpFYwyEI05AXXA-ja-JP">API認証と認可の実装</a>について説明します。</p></div></p><p></p><p></p>

## アクセス許可を定義する


<p>アクセス許可は、ユーザーの代わりに、提供されたアクセストークンを使ってどのようにしてリソースにアクセスできるのかを定義できるようにします。たとえば、ユーザーがマネージャーアクセスレベルを持つ場合には、<code>messages</code>リソースに対して読み取りアクセスを付与し、管理者アクセスレベルを持つ場合には、書き込みアクセスを付与することができます。</p><p>Auth0 Dashboardの<a href="https://manage.auth0.com/#/apis">［API］</a>セクションにある<b>［Permissions（権限）］</b>ビューで使用可能なアクセス許可を定義することができます。以下の例では<code>read:messages</code>スコープを使用します。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/acef814282795bef6921535f044f96e9/Quickstarts_API.png" alt="［Auth0 Dashboard］>［Applications（アプリケーション）］>［APIs］>［Specific API（特定のAPI］>［Permissions（権限）］タブ" /><p></p>

## 依存関係をインストールする


<p>アプリケーションがアクセストークンを検証できるようにするには、<code>Microsoft.AspNetCore.Authentication.JwtBearer</code> NuGetパッケージへの参照を追加します。</p><p><pre><code class="language-powershell">Install-Package Microsoft.AspNetCore.Authentication.JwtBearer

</code></pre>

</p>

## ミドルウェアを構成する {{{ data-action="code" data-code="Program.cs" }}}


<p>アプリケーションの<code>Program.cs</code>ファイルを構成して、認証ミドルウェアをセットアップします：</p><ol><li><p><code>AddAuthentication</code>メソッドを呼び出して、認証サービスを登録します。<code>JwtBearerDefaults.AuthenticationScheme</code>をデフォルトのスキームとして構成します。</p></li><li><p><code>AddJwtBearer</code>メソッドを呼び出して、JWTベアラー認証スキームを登録します。Auth0ドメインをオーソリティ、Auth0 API識別子をオーディエンスとして構成し、Auth0ドメインとAPI識別子がアプリケーションの<b>appsettings.json</b>ファイル内で設定されていることを確認します。<div class="alert-container" severity="default"><p>場合によっては、アクセストークンに<code>sub</code>クレームが含まれないことがあります。この場合には、<code>User.Identity.Name</code>が<code>null</code>になります。別のクレームを<code>User.Identity.Name</code>にマッピングしたい場合には、それを<code>AddJwtBearer()</code>への呼び出しの中で<code>options.TokenValidationParameters</code>に追加します。</p></div></p></li><li><p><code>UseAuthentication</code>メソッドと<code>UseAuthorization</code>メソッドの呼び出しを<code>var app = builder.Build();</code>メソッドの下に追加して、ミドルウェアパイプラインに認証ミドルウェアと認可ミドルウェアを追加します。</p></li></ol><p></p><p></p>

## スコープを検証する {{{ data-action="code" data-code="HasScopeHandler.cs" }}}


<p>アクセストークンに正しいスコープが含まれていることを確認するには、ASP.NET Coreの<a href="https://docs.microsoft.com/en-us/aspnet/core/security/authorization/policies">ポリシーベースの認可</a>を使用します。</p><ol><li><p><code>HasScopeRequirement</code>という名前の新しい認可要求を作成します。これは、Auth0テナント発行の<code>scope</code>クレームが存在するかを確認し、存在する場合には、要求されたスコープがそのクレームに含まれているかを確認します。</p></li><li><p><code>Program.cs</code>ファイルにある<code>var builder = WebApplication.CreateBuilder(args);</code>メソッドの下に、<code>app.AddAuthorization</code>メソッドへの呼び出しを追加します。</p></li><li><p>スコープのポリシーを追加するには、各スコープに<code>AddPolicy</code>を呼び出します。</p></li><li><p><code>HasScopeHandler</code>クラスのシングルトンを登録します。</p></li></ol><p></p>

## APIエンドポイントを保護する {{{ data-action="code" data-code="ApiController.cs" }}}


<p>JWTミドルウェアは、ASP.NET Coreの標準の<a href="https://docs.microsoft.com/en-us/aspnet/core/security/authentication/">認証</a>および<a href="https://docs.microsoft.com/en-us/aspnet/core/security/authorization/">認可</a>メカニズムと統合します。</p><p>エンドポイントのセキュリティを保護するには、<code>[Authorize]</code>属性をコントローラーのアクション（すべてのアクションのセキュリティを保護するには、コントローラー）に追加します。</p><p>特定のスコープが必要なエンドポイントのセキュリティを保護するには、正しいスコープが<code>access_token</code>に存在することを確認します。そのためには、<code>Authorize</code>属性を<code>Scoped</code>アクションに追加し、<code>read:messages</code>を<code>policy</code>パラメーターとして渡します。</p>

## APIを呼び出す


<p>APIの呼び出し方は、開発しているアプリケーションの種類と使用しているフレームワークに依存します。詳細については、該当するアプリケーションのクイックスタートをお読みください。</p><ul><li><p><a href="/quickstart/spa">シングルページアプリケーション</a></p></li><li><p><a href="/quickstart/native">モバイル / ネイティブアプリケーション</a></p></li></ul><h3>アクセストークン取得する</h3><p>開発しているアプリケーションの種類や使用しているフレームワークが何であったとしても、APIを呼び出すにはアクセストークンが必要です。</p><p>シングルページアプリケーション（SPA）またはネイティブアプリケーションからAPIを呼び出すと、認可フローの完了後にアクセストークンを受け取ります。</p><p>コマンドラインツールや他のサービスなど、ユーザーが資格情報を入力しないものからAPIを呼び出す際には、<a href="https://auth0.com/docs/api/authentication#client-credentials">OAuthクライアントの資格情報フロー</a>を使用します。そのためには、<a href="https://manage.auth0.com/#/applications">マシンツーマシンアプリケーション</a>を登録し、要求内で以下の値を渡します。</p><ul><li><p><b>クライアントID</b>を<code>client_id</code>パラメーターとして渡す。</p></li><li><p><b>クライアントシークレット</b>を<code>client_secret</code>パラメーターとして渡す。</p></li><li><p><b>API 識別子</b>（このクイックスタートで以前にミドルウェアの構成に使用したのと同じ値）を<code>audience</code>パラメーターとして渡す。</p></li></ul><p><div class="alert-container" severity="default"><p>マシンツーマシンアプリケーションにクライアントIDとクライアントシークレットを取得する詳細については、<a data-contentfulid="7wT5jc2JhV8eABLmTN4Dhe">アプリケーションの設定</a>をお読みください。</p></div></p><p><b>要求例</b></p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#f1e4d6c64307489faf2d2dac1ba45ffb_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#f1e4d6c64307489faf2d2dac1ba45ffb_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#f1e4d6c64307489faf2d2dac1ba45ffb_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#f1e4d6c64307489faf2d2dac1ba45ffb_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#f1e4d6c64307489faf2d2dac1ba45ffb_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#f1e4d6c64307489faf2d2dac1ba45ffb_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#f1e4d6c64307489faf2d2dac1ba45ffb_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#f1e4d6c64307489faf2d2dac1ba45ffb_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#f1e4d6c64307489faf2d2dac1ba45ffb_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#f1e4d6c64307489faf2d2dac1ba45ffb_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="f1e4d6c64307489faf2d2dac1ba45ffb_shell"><pre><code class="language-text no-lines">curl --request post \

  --url 'https://${account.namespace}/oauth/token' \

  --header 'content-type: application/x-www-form-urlencoded'</code></pre></div><div role="tabpanel" class="tab-pane " id="f1e4d6c64307489faf2d2dac1ba45ffb_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;https://${account.namespace}/oauth/token&quot;);

var request = new RestRequest(Method.POST);

request.AddHeader(&quot;content-type&quot;, &quot;application/x-www-form-urlencoded&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="f1e4d6c64307489faf2d2dac1ba45ffb_go"><pre><code class="language-go no-lines">package main



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



}</code></pre></div><div role="tabpanel" class="tab-pane " id="f1e4d6c64307489faf2d2dac1ba45ffb_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.post(&quot;https://${account.namespace}/oauth/token&quot;)

  .header(&quot;content-type&quot;, &quot;application/x-www-form-urlencoded&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="f1e4d6c64307489faf2d2dac1ba45ffb_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'post',

  url: 'https://${account.namespace}/oauth/token',

  headers: {'content-type': 'application/x-www-form-urlencoded'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="f1e4d6c64307489faf2d2dac1ba45ffb_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="f1e4d6c64307489faf2d2dac1ba45ffb_php"><pre><code class="language-php no-lines">$curl = curl_init();



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

}</code></pre></div><div role="tabpanel" class="tab-pane " id="f1e4d6c64307489faf2d2dac1ba45ffb_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPSConnection(&quot;&quot;)



headers = { 'content-type': &quot;application/x-www-form-urlencoded&quot; }



conn.request(&quot;post&quot;, &quot;/${account.namespace}/oauth/token&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="f1e4d6c64307489faf2d2dac1ba45ffb_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'

require 'openssl'



url = URI(&quot;https://${account.namespace}/oauth/token&quot;)



http = Net::HTTP.new(url.host, url.port)

http.use_ssl = true

http.verify_mode = OpenSSL::SSL::VERIFY_NONE



request = Net::HTTP::Post.new(url)

request[&quot;content-type&quot;] = 'application/x-www-form-urlencoded'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="f1e4d6c64307489faf2d2dac1ba45ffb_swift"><pre><code class="language-swift no-lines">import Foundation



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



</p><h3>セキュリティ保護されたエンドポイントを呼び出す</h3><p>取得したアクセストークン使用すると、セキュリティ保護されたAPIエンドポイントを呼び出すことができます。セキュリティ保護されたエンドポイントを呼び出す際には、アクセストークンをベアラートークンとして要求の<b>認可</b>ヘッダーに含める必要があります。たとえば、<code>/api/private</code>エンドポイントに要求を送信することができます：</p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#297ec1e06006442cba69997b1bf43221_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#297ec1e06006442cba69997b1bf43221_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#297ec1e06006442cba69997b1bf43221_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#297ec1e06006442cba69997b1bf43221_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#297ec1e06006442cba69997b1bf43221_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#297ec1e06006442cba69997b1bf43221_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#297ec1e06006442cba69997b1bf43221_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#297ec1e06006442cba69997b1bf43221_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#297ec1e06006442cba69997b1bf43221_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#297ec1e06006442cba69997b1bf43221_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="297ec1e06006442cba69997b1bf43221_shell"><pre><code class="language-text no-lines">curl --request get \

  --url http://localhost:3010/api/private \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN'</code></pre></div><div role="tabpanel" class="tab-pane " id="297ec1e06006442cba69997b1bf43221_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;http://localhost:3010/api/private&quot;);

var request = new RestRequest(Method.GET);

request.AddHeader(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="297ec1e06006442cba69997b1bf43221_go"><pre><code class="language-go no-lines">package main



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



}</code></pre></div><div role="tabpanel" class="tab-pane " id="297ec1e06006442cba69997b1bf43221_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.get(&quot;http://localhost:3010/api/private&quot;)

  .header(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="297ec1e06006442cba69997b1bf43221_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'get',

  url: 'http://localhost:3010/api/private',

  headers: {authorization: 'Bearer YOUR_ACCESS_TOKEN'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="297ec1e06006442cba69997b1bf43221_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="297ec1e06006442cba69997b1bf43221_php"><pre><code class="language-php no-lines">$curl = curl_init();



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

}</code></pre></div><div role="tabpanel" class="tab-pane " id="297ec1e06006442cba69997b1bf43221_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPConnection(&quot;localhost:3010&quot;)



headers = { 'authorization': &quot;Bearer YOUR_ACCESS_TOKEN&quot; }



conn.request(&quot;get&quot;, &quot;/api/private&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="297ec1e06006442cba69997b1bf43221_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'



url = URI(&quot;http://localhost:3010/api/private&quot;)



http = Net::HTTP.new(url.host, url.port)



request = Net::HTTP::Get.new(url)

request[&quot;authorization&quot;] = 'Bearer YOUR_ACCESS_TOKEN'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="297ec1e06006442cba69997b1bf43221_swift"><pre><code class="language-swift no-lines">import Foundation



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



</p><p><code>/api/private-scoped</code>エンドポイントも同様の方法で呼び出しますが、APIのアクセス許可が正しく構成され、アクセストークンに<code>read:messages</code>スコープがあることを確認してください。</p><p><div class="checkpoint">ASP.NET APIクイックスタート - 手順6「チェックポイント」 <div class="checkpoint-default"><p><code>/api/private</code>と<code>/api/private-scoped</code>エンドポイントを呼び出すことができるはずです。</p><p>アプリケーションを実行して次の点を確認します：</p><ul><li><p><code>GET /api/private</code>が認証された要求に使用できる。</p></li><li><p><code>GET /api/private-scoped</code>が<code>read:messages</code>スコープが付与されたアクセストークンを含む認証された要求に使用できる。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a few things to double check:</p><ul><li><p>make sure <code>ValidIssuer</code> and <code>ValidAudience</code> are configured correctly</p></li><li><p>make sure the token is added as the <code>Authorization</code> header</p></li><li><p>check that the token has the correct scopes (you can use <a href="https://jwt.io/">jwt.io</a> to verify)</p></li></ul><p>Still having issues? To get more help, check out our <a href="/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a>.</p></div>

  </div></p>
