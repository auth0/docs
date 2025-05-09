---
title: Flask APIアプリケーションに認可を追加する
description: このガイドは、Flaskを使ってビルドされた新規または既存のPython APIにAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/validator
 - files/server
github:
  path: 00-Starter-Seed
locale: ja-JP
---

# Flask APIアプリケーションに認可を追加する


<p>このガイドは、<a href="https://flask.palletsprojects.com/" target="_blank" rel="noreferrer noopener">Flask</a>を使ってビルドされた新規または既存のPython APIにAuth0を統合する方法を説明します。</p><p>Auth0 DashboardでAPIをまだ作成していない場合は、対話型のセレクターを使ってAuth0 APIを新規作成します。そうでない場合は、統合したいプロジェクトを表す既存のAPIを選択することができます。</p><p>または、Auth0 Dashboardを使って初めてAPIをセットアップする方法を<a href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis" target="_blank" >使用の開始ガイド</a>で確認することもできます。</p><p>Auth0にあるAPIはそれぞれAPI識別子を使って構成され、アプリケーションのコードはAPI識別子をオーディエンスとしてアクセストークンを検証します。</p><p><div class="alert-container" severity="default"><p><b>Auth0を初めてご利用ですか？</b><a href="https://auth0.com/docs/overview" target="_blank" >Auth0の仕組み</a>と、OAuth 2.0フレームワークを用いた<a href="https://auth0.com/docs/api-auth" target="_blank" >API認証と認可の実装</a>について説明します。</p></div></p><p></p>

## アクセス許可を定義する


<p>アクセス許可は、ユーザーの代わりに、提供されたアクセストークンを使ってどのようにしてリソースにアクセスできるのかを定義できるようにします。たとえば、ユーザーがマネージャーアクセスレベルを持つ場合には、<code>messages</code>リソースに対して読み出しアクセスを付与し、管理者アクセスレベルを持つ場合には、書き込みアクセスを付与することができます。</p><p>Auth0 Dashboardの<a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">［APIs］</a>セクションにある<b>［Permissions（権限）］</b>ビューで使用可能なアクセス許可を定義することができます。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/acef814282795bef6921535f044f96e9/Quickstarts_API.png" alt="［Auth0 Dashboard］>［Applications（アプリケーション）］>［APIs］>［Specific API（特定のAPI］>［Permissions（権限）］タブ" /><p><div class="alert-container" severity="default"><p>以下の例では<code>read:messages</code>スコープを使用します。</p></div></p>

## 依存関係をインストールする


<p><code>requirements.txt</code>に次の依存関係を追加します：</p><p><pre><code class="language-powershell"># /requirements.txt



    flask

    Authlib

</code></pre>

</p>

## JWTバリデーターを作成する {{{ data-action="code" data-code="validator.py" }}}


<p><a href="https://github.com/lepture/authlib" target="_blank" rel="noreferrer noopener">Authlib</a>という名前のライブラリーを使用して、<a href="https://docs.authlib.org/en/latest/flask/1/resource-server.html" target="_blank" rel="noreferrer noopener">ResourceProtector</a>を作成します。これは<a href="https://flask.palletsprojects.com/patterns/viewdecorators/" target="_blank" rel="noreferrer noopener">Flaskデコレーター</a>の一種で、該当するバリデーターを使ってリソース（APIルート）を保護します。</p><p>バリデーターは、リソースに渡すアクセストークンに有効な署名とクレームがあることを検証します。</p><p>AuthLibの<code>JWTBearerTokenValidator</code>バリデーターに多少の変更を加えて、<a href="https://auth0.com/docs/secure/tokens/access-tokens/validate-access-tokens" target="_blank" >アクセストークンの検証</a>要件が満たされるようにします。</p><p><code>Auth0JWTBearerTokenValidator</code>を作成するには、<code>domain</code>と<code>audience</code>（API識別子）に渡すことが必要です。そうすると、トークンの署名を検証するのに必要な公開鍵が取得され、<code>JWTBearerTokenValidator</code>クラスに渡されます。</p><p>そして、クラスの<code>claims_options</code>をオーバーライドし、トークンのexpiry、audience、issueクレームが要件を満たして有効であることを確認します。</p>

## Flaskアプリケーションを作成する {{{ data-action="code" data-code="server.py" }}}


<p>次に、3つのAPIルートを使ってFlaskアプリケーションを作成します。</p><ul><li><p><code>/api/public</code>：認証を必要としないパブリックエンドポイントです。</p></li><li><p><code>/api/private</code>：有効なJWTアクセストークンを必要とするプライベートエンドポイントです。</p></li><li><p><code>/api/private-scoped</code>：与えられた<code>scope</code>を含む有効なJWTアクセストークンを必要とするプライベートエンドポイントです。</p></li></ul><p>保護されたルートには<code>require_auth</code>デコレーターがあり、これは、以前に作成した<code>Auth0JWTBearerTokenValidator</code>を使用する<code>ResourceProtector</code>です。</p><p><code>Auth0JWTBearerTokenValidator</code>を作成するには、テナントのドメインと以前に作成したAPIのAPI識別子に渡します。</p><p><code>private_scoped</code>ルートの<code>require_auth</code>デコレーターは、追加の引数である<code>&quot;read:messages&quot;</code>を受け付けます。これは、以前に作成したアクセス許可（スコープ）について、アクセストークンをチェックします。</p><h3>APIを呼び出す</h3><p>APIを呼び出すにはアクセストークンが必要です。テスト用のアクセストークンは、<a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">API設定</a>の<b>［Test（テスト）］</b>ビューから取得することができます。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/6jeVBuypOGX5qMRXeJn5ow/dd20eb74e1e9079287762ce33dcf8e2d/Quickstart_Example_App_API.png" alt="［Auth0 Dashboard］>［Applications（アプリケーション）］>［API］>［Specific API（特定のAPI］>［Test（テスト）］タブ" /><p>要求の<code>Authorization</code>ヘッダーにアクセストークンを指定します。</p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#29145f0a7ed643c190443058e9ceb68b_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#29145f0a7ed643c190443058e9ceb68b_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#29145f0a7ed643c190443058e9ceb68b_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#29145f0a7ed643c190443058e9ceb68b_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#29145f0a7ed643c190443058e9ceb68b_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#29145f0a7ed643c190443058e9ceb68b_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#29145f0a7ed643c190443058e9ceb68b_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#29145f0a7ed643c190443058e9ceb68b_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#29145f0a7ed643c190443058e9ceb68b_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#29145f0a7ed643c190443058e9ceb68b_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="29145f0a7ed643c190443058e9ceb68b_shell"><pre><code class="language-text no-lines">curl --request get \

  --url 'http:///${account.namespace}/api_path' \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'</code></pre></div><div role="tabpanel" class="tab-pane " id="29145f0a7ed643c190443058e9ceb68b_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;http:///${account.namespace}/api_path&quot;);

var request = new RestRequest(Method.GET);

request.AddHeader(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="29145f0a7ed643c190443058e9ceb68b_go"><pre><code class="language-go no-lines">package main



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



}</code></pre></div><div role="tabpanel" class="tab-pane " id="29145f0a7ed643c190443058e9ceb68b_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.get(&quot;http:///${account.namespace}/api_path&quot;)

  .header(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="29145f0a7ed643c190443058e9ceb68b_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'get',

  url: 'http:///${account.namespace}/api_path',

  headers: {authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="29145f0a7ed643c190443058e9ceb68b_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="29145f0a7ed643c190443058e9ceb68b_php"><pre><code class="language-php no-lines">$curl = curl_init();



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

}</code></pre></div><div role="tabpanel" class="tab-pane " id="29145f0a7ed643c190443058e9ceb68b_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPConnection(&quot;&quot;)



headers = { 'authorization': &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot; }



conn.request(&quot;get&quot;, &quot;/${account.namespace}/api_path&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="29145f0a7ed643c190443058e9ceb68b_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'



url = URI(&quot;http:///${account.namespace}/api_path&quot;)



http = Net::HTTP.new(url.host, url.port)



request = Net::HTTP::Get.new(url)

request[&quot;authorization&quot;] = 'Bearer YOUR_ACCESS_TOKEN_HERE'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="29145f0a7ed643c190443058e9ceb68b_swift"><pre><code class="language-swift no-lines">import Foundation



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
