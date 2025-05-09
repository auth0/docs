---
title: Express.js APIアプリケーションに認可を追加する
description: このガイドは、新規または既存のExpress.js APIアプリケーションにexpress-oauth2-jwt-bearerパッケージを使ってAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/server
github:
  path: 01-Authorization-RS256
locale: ja-JP
---

# Express.js APIアプリケーションに認可を追加する


<p>このガイドは、新規または既存のExpress.js APIアプリケーションに<code>express-oauth2-jwt-bearer</code>パッケージを使ってAuth0を統合する方法を説明します。</p><p>Auth0 DashboardでAPIをまだ作成していない場合は、対話型のセレクターを使ってAuth0 APIを新規作成します。そうでない場合は、既存のプロジェクトAPIを選択します。</p><p>Auth0 Dashboardを使って初めてAPIをセットアップする場合には、<a href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis" target="_blank" >使用の開始ガイド</a>を確認してください。それぞれのAuth0 APIにはAPI識別子があり、アプリケーションにアクセストークンの検証で使用されます。</p><p><div class="alert-container" severity="default"><p><b>Auth0を初めてご利用ですか？</b><a href="https://auth0.com/docs/overview" target="_blank" >Auth0の仕組み</a>と、OAuth 2.0フレームワークを用いた<a href="https://auth0.com/docs/api-auth" target="_blank" >API認証と認可の実装</a>について説明します。</p></div></p><p></p>

## アクセス許可を定義する


<p>アクセス許可は、ユーザーの代わりに、提供されたアクセストークンを使ってどのようにしてリソースにアクセスできるのかを定義できるようにします。たとえば、ユーザーがマネージャーアクセスレベルを持つ場合には、<code>messages</code>リソースに対して読み出しアクセスを付与し、管理者アクセスレベルを持つ場合には、書き込みアクセスを付与することができます。</p><p>Auth0 Dashboardの<a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">［APIs］</a>セクションにある<b>［Permissions（権限）］</b>ビューで使用可能なアクセス許可を定義することができます。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/5EnGfdqLVZ8fuIxbUn7gm1/ee4278d6ae1910497771f3b9762c86f8/Quickstarts_API.png" alt="null" /><p><div class="alert-container" severity="default"><p>以下の例では<code>read:messages</code>スコープを使用します。</p></div></p>

## 依存関係をインストールする


<p>まず、<code>npm</code>でSDKをインストールします。</p><p><pre><code class="language-powershell">npm install --save express-oauth2-jwt-bearer

</code></pre>

</p>

## ミドルウェアを構成する {{{ data-action="code" data-code="server.js#1:10" }}}


<p>ドメインとAPI識別子を使って、<code>express-oauth2-jwt-bearer</code>を構成します。</p><p>右に示した<code>checkJwt</code>ミドルウェアは、要求に含まれるユーザーのアクセストークンが有効かを確認します。トークンが有効でない場合、ユーザーがエンドポイントにアクセスしようとすると、「401 Authorization」というエラーが発生します。</p><p>ミドルウェアは、トークンに要求されたリソースにアクセスするだけの十分なスコープがあるかを確認しません。</p>

## APIエンドポイントを保護する {{{ data-action="code" data-code="server.js#12:32" }}}


<p>有効なJWTを必須して個々のルートを保護するには、<code>express-oauth2-jwt-bearer</code>から構築された<code>checkJwt</code>ミドルウェアでルートを構成します。</p><p>特定のスコープを検索するために、個々のルートを構成することができます。これを実現するには、<code>requiresScope</code>メソッドで別のミドルウェアをセットアップします。必要なスコープを提供し、認可を追加したいルートにミドルウェアを適用します。</p><p><code>checkJwt</code>と<code>requiredScopes</code>ミドルウェアを保護したいルートに渡します。</p><p>この構成では、<code>read:messages</code>スコープを持つアクセストークンのみがエンドポイントにアクセスすることができます。</p><h3>APIを呼び出す</h3><p>APIを呼び出すにはアクセストークンが必要です。テスト用のアクセストークンは、<a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">API設定</a>の<b>［Test（テスト）］</b>ビューから取得することができます。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/5HUMcKGXoNOvdJNXFI73oi/f50dd78093814054a81903d1e478f3aa/API_access_tokens.png" alt="null" /><p>要求の<code>Authorization</code>ヘッダーにアクセストークンを指定します。</p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#95a43bd4ec0849f9a7e536e11599f45c_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#95a43bd4ec0849f9a7e536e11599f45c_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#95a43bd4ec0849f9a7e536e11599f45c_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#95a43bd4ec0849f9a7e536e11599f45c_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#95a43bd4ec0849f9a7e536e11599f45c_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#95a43bd4ec0849f9a7e536e11599f45c_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#95a43bd4ec0849f9a7e536e11599f45c_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#95a43bd4ec0849f9a7e536e11599f45c_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#95a43bd4ec0849f9a7e536e11599f45c_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#95a43bd4ec0849f9a7e536e11599f45c_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="95a43bd4ec0849f9a7e536e11599f45c_shell"><pre><code class="language-text no-lines">curl --request get \

  --url http:///%7ByourDomain%7D/api_path \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'</code></pre></div><div role="tabpanel" class="tab-pane " id="95a43bd4ec0849f9a7e536e11599f45c_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;http:///%7ByourDomain%7D/api_path&quot;);

var request = new RestRequest(Method.GET);

request.AddHeader(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="95a43bd4ec0849f9a7e536e11599f45c_go"><pre><code class="language-go no-lines">package main



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



}</code></pre></div><div role="tabpanel" class="tab-pane " id="95a43bd4ec0849f9a7e536e11599f45c_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.get(&quot;http:///%7ByourDomain%7D/api_path&quot;)

  .header(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="95a43bd4ec0849f9a7e536e11599f45c_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'get',

  url: 'http:///%7ByourDomain%7D/api_path',

  headers: {authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="95a43bd4ec0849f9a7e536e11599f45c_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="95a43bd4ec0849f9a7e536e11599f45c_php"><pre><code class="language-php no-lines">$curl = curl_init();



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

}</code></pre></div><div role="tabpanel" class="tab-pane " id="95a43bd4ec0849f9a7e536e11599f45c_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPConnection(&quot;&quot;)



headers = { 'authorization': &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot; }



conn.request(&quot;get&quot;, &quot;%7ByourDomain%7D/api_path&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="95a43bd4ec0849f9a7e536e11599f45c_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'



url = URI(&quot;http:///%7ByourDomain%7D/api_path&quot;)



http = Net::HTTP.new(url.host, url.port)



request = Net::HTTP::Get.new(url)

request[&quot;authorization&quot;] = 'Bearer YOUR_ACCESS_TOKEN_HERE'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="95a43bd4ec0849f9a7e536e11599f45c_swift"><pre><code class="language-swift no-lines">import Foundation



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



</p><p><div class="checkpoint">Node JS API手順4「チェックポイント」 <div class="checkpoint-default"><p>アプリケーションの構成が完了したら、アプリケーションを実行して次の点を確認します：</p><ul><li><p><code>GET /api/public</code>が認証を必要としない要求に使用できる。</p></li><li><p><code>GET /api/private</code>が認証された要求に使用できる。</p></li><li><p><code>GET /api/private-scoped</code>が<code>read:messages</code>スコープが付与されたアクセストークンを含む認証された要求に使用できる。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>アプリケーションが正常に起動しなかった場合は以下を行います。</p><ul><li><p>トークンを<code>Authorization</code>ヘッダーに含めて追加したことを確認します。</p></li><li><p>トークンに正しいスコープがあることを確認します。確認には<a href="https://jwt.io/" target="_blank" rel="noreferrer noopener">jwt.io</a>を使用します。</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>
