---
title: Goアプリケーションに認可を追加する
description: このチュートリアルは、Go APIに認可を追加する方法を説明します。
interactive:  true
files:
 - files/middleware/jwt
 - files/main
github:
  path: https://github.com/auth0-samples/auth0-golang-api-samples/tree/master/01-Authorization-RS256
locale: ja-JP
---

# Goアプリケーションに認可を追加する


<p>このガイドは、新規または既存のGo APIアプリケーションに<a href="https://github.com/auth0/go-jwt-middleware">go-jwt-middleware</a>パッケージを使ってAuth0を統合する方法を説明します。</p><p>Auth0 DashboardでAPIをまだ作成していない場合は、対話型のセレクターを使ってAuth0 APIを新規作成します。そうでない場合は、プロジェクトに既存のAPIを選択することができます。</p><p>Auth0 Dashboardを使って初めてAPIをセットアップする場合には、<a data-contentfulid="450QmC9wuUtjlt8UQzRgPd-ja-JP">使用の開始ガイド</a>を確認してください。</p><p>それぞれのAuth0 APIにはAPI識別子があり、アプリケーションにアクセストークンの検証で使用されます。</p><p><div class="alert-container" severity="default"><p><b>Auth0を初めてご利用ですか？</b><a data-contentfulid="43RIpZkDhzyy40WfzZvz4y-ja-JP">Auth0の仕組み</a>と、OAuth 2.0フレームワークを用いた<a data-contentfulid="6eZFaxxcNpFYwyEI05AXXA-ja-JP">API認証と認可の実装</a>について説明します。</p></div></p><p></p>

## アクセス許可を定義する


<p>アクセス許可は、ユーザーの代わりに、提供されたアクセストークンを使ってどのようにしてリソースにアクセスできるのかを定義できるようにします。たとえば、ユーザーがマネージャーアクセスレベルを持つ場合には、<code>messages</code>リソースに対して読み取りアクセスを付与し、管理者アクセスレベルを持つ場合には、書き込みアクセスを付与することができます。</p><p>Auth0 Dashboardの<a href="https://manage.auth0.com/#/apis">［API］</a>セクションにある<b>［Permissions（権限）］</b>ビューで使用可能なアクセス許可を定義することができます。以下の例では<code>read:messages</code>スコープを使用します。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/acef814282795bef6921535f044f96e9/Quickstarts_API.png" alt="［Auth0 Dashboard］>［Applications（アプリケーション）］>［APIs］>［Specific API（特定のAPI］>［Permissions（権限）］タブ" /><p></p>

## 依存関係をインストールする


<p><code>go.mod</code>ファイルを追加して、必要な依存関係をすべてリストします。</p><p><pre><code>// go.mod



module 01-Authorization-RS256



go 1.21



require (

	github.com/auth0/go-jwt-middleware/v2 v2.2.0

	github.com/joho/godotenv v1.5.1

)

</code></pre>

</p><p>次のシェルコマンドを実行して、依存関係をダウンロードします：</p><p><pre><code>go mod download

</code></pre>

</p>

## アプリケーションを構成する


<p>アプリの構成を保存するために、<code>.env</code>ファイルをプロジェクトディレクトリのルート内に作成します。その後、環境変数を入力します：</p><p><pre><code># The URL of our Auth0 Tenant Domain.

# If you're using a Custom Domain, be sure to set this to that value instead.

AUTH0_DOMAIN='${account.namespace}'



# Our Auth0 API's Identifier.

AUTH0_AUDIENCE='${apiIdentifier}'

</code></pre>

</p>

## アクセストークンを検証するミドルウェアを作成する {{{ data-action="code" data-code="middleware/jwt.go" }}}


<p><code>EnsureValidToken</code>ミドルウェア関数はアクセストークンを検証します。この関数は、保護したいすべてのエンドポイントに適用することができます。トークンが有効であれば、エンドポイントがリソースを開放します。トークンが無効であれば、APIが<code>401 Authorization</code>エラーを返します。</p><p>受信する要求のアクセストークンを検証するには、<b>go-jwt-middleware</b>ミドルウェア をセットアップします。</p><p>APIはデフォルトで、RS256をトークン署名アルゴリズムとしてセットアップします。RS256は秘密鍵と公開鍵のペアで機能するため、トークンはAuth0アカウントの公開鍵を使用して検証することができます。この公開鍵には、<a href="https://%7Byourdomain%7D/.well-known/jwks.json">https://{yourDomain}/.well-known/jwks.json</a>でアクセスすることができます。</p><p>トークンが要求されたリソースへのアクセスに十分な<b>スコープ</b>を持っているか確認する機能を含めてください。</p><p><code>HasScope</code>関数を作成して、応答を返す前に、アクセストークンに正しいスコープがあることを確認します。</p>

## APIエンドポイントを保護する {{{ data-action="code" data-code="main.go" }}}


<p>この例では、<code>EnsureToken</code>ミドルウェアを使用しない<code>/api/public</code>エンドポイントを作成して、未認証の要求にも対応できるようにします。</p><p><code>EnsureToken</code>ミドルウェアを必要とする<code>/api/private</code>エンドポイントを作成して、追加スコープのないアクセストークンを含む認証済み要求にのみ利用できるようにします。</p><p><code>EnsureToken</code>ミドルウェアと<code>HasScope</code>を必要とする<code>/api/private-scoped</code>エンドポイントを作成して、<code>read:messages</code>スコープを付与されたアクセストークンを含む認証済み要求にのみ利用できるようにします。</p><p><div class="alert-container" severity="default"><p><code>read:messages</code>スコープのみが<code>HasScope</code>関数で検査されます。状況に応じて、複数のスコープを受け付けるように拡張するか、スタンドアローンのミドルウェアにすることをお勧めします。</p></div></p><h3>APIを呼び出す</h3><p>APIを呼び出すにはアクセストークンが必要です。テスト用のアクセストークンは、<a href="https://manage.auth0.com/#/apis">API設定</a>の<b>［Test（テスト）］</b>ビューから取得することができます。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/6jeVBuypOGX5qMRXeJn5ow/dd20eb74e1e9079287762ce33dcf8e2d/Quickstart_Example_App_API.png" alt="［Auth0 Dashboard］>［Applications（アプリケーション）］>［API］>［Specific API（特定のAPI］>［Test（テスト）］タブ" /><p>要求の<code>Authorization</code>ヘッダーにアクセストークンを指定します。</p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#40a4d0f9ed1448aa868b87c1d742add7_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#40a4d0f9ed1448aa868b87c1d742add7_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#40a4d0f9ed1448aa868b87c1d742add7_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#40a4d0f9ed1448aa868b87c1d742add7_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#40a4d0f9ed1448aa868b87c1d742add7_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#40a4d0f9ed1448aa868b87c1d742add7_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#40a4d0f9ed1448aa868b87c1d742add7_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#40a4d0f9ed1448aa868b87c1d742add7_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#40a4d0f9ed1448aa868b87c1d742add7_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#40a4d0f9ed1448aa868b87c1d742add7_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="40a4d0f9ed1448aa868b87c1d742add7_shell"><pre><code class="language-text no-lines">curl --request get \

  --url 'http:///${account.namespace}/api_path' \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'</code></pre></div><div role="tabpanel" class="tab-pane " id="40a4d0f9ed1448aa868b87c1d742add7_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;http:///${account.namespace}/api_path&quot;);

var request = new RestRequest(Method.GET);

request.AddHeader(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="40a4d0f9ed1448aa868b87c1d742add7_go"><pre><code class="language-go no-lines">package main



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



}</code></pre></div><div role="tabpanel" class="tab-pane " id="40a4d0f9ed1448aa868b87c1d742add7_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.get(&quot;http:///${account.namespace}/api_path&quot;)

  .header(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="40a4d0f9ed1448aa868b87c1d742add7_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'get',

  url: 'http:///${account.namespace}/api_path',

  headers: {authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="40a4d0f9ed1448aa868b87c1d742add7_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="40a4d0f9ed1448aa868b87c1d742add7_php"><pre><code class="language-php no-lines">$curl = curl_init();



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

}</code></pre></div><div role="tabpanel" class="tab-pane " id="40a4d0f9ed1448aa868b87c1d742add7_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPConnection(&quot;&quot;)



headers = { 'authorization': &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot; }



conn.request(&quot;get&quot;, &quot;/${account.namespace}/api_path&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="40a4d0f9ed1448aa868b87c1d742add7_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'



url = URI(&quot;http:///${account.namespace}/api_path&quot;)



http = Net::HTTP.new(url.host, url.port)



request = Net::HTTP::Get.new(url)

request[&quot;authorization&quot;] = 'Bearer YOUR_ACCESS_TOKEN_HERE'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="40a4d0f9ed1448aa868b87c1d742add7_swift"><pre><code class="language-swift no-lines">import Foundation



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



</p><p><div class="checkpoint">Go APIクイックスタート - 手順5「チェックポイント」 <div class="checkpoint-default"><p>アプリケーションの構成が完了したら、アプリケーションを実行して次の点を確認します：</p><ul><li><p><code>GET /api/public</code>が認証を必要としない要求に使用できる。</p></li><li><p><code>GET /api/private</code>が認証された要求に使用できる。</p></li><li><p><code>GET /api/private-scoped</code>が<code>read:messages</code>スコープが付与されたアクセストークンを含む認証された要求に使用できる。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not start successfully:</p><ul><li><p>Verify you added the token as the <code>Authorization</code> header</p></li><li><p>Ensure the token has the correct scopes. Verify with <a href="https://jwt.io/">jwt.io</a>.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p><p></p>
