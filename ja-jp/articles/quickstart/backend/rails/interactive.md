---
title: Ruby on Rails APIに認可を追加する
description: このチュートリアルでは、カスタムAuth0Clientクラス内のjwt Gemを使って、アクセストークンの検証を実施します。
interactive:  true
files:
 - files/app/controllers/application_controller
 - files/app/lib/auth0_client
 - files/app/controllers/concerns/secured
 - files/app/controllers/public_controller
 - files/app/controllers/private_controller
github:
  path: 01-Authentication-RS256
locale: ja-JP
---

# Ruby on Rails APIに認可を追加する


<p>このチュートリアルでは、カスタム<code>Auth0Client</code>クラス内の<a href="https://github.com/jwt/ruby-jwt" target="_blank" rel="noreferrer noopener"><b>jwt</b></a> Gemを使って、アクセストークンの検証を実施します。<code>Secured</code>と呼ばれるConcernを使って、受信アクセストークンからの認証を必要とするエンドポイントを認可します。</p><p>Auth0 DashboardでAPIをまだ作成していない場合は、対話型のセレクターを使ってAuth0 APIを新規作成します。そうでない場合は、プロジェクトに既存のAPIを選択します。</p><p>Auth0 Dashboardを使って初めてAPIをセットアップする場合には、<a href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis" target="_blank" >使用の開始ガイド</a>を確認してください。</p><p>それぞれのAuth0 APIにはAPI識別子があり、アプリケーションにアクセストークンの検証で使用されます。</p><p><div class="alert-container" severity="default"><p><b>Auth0を初めてご利用ですか？</b><a href="https://auth0.com/docs/overview" target="_blank" >Auth0の仕組み</a>と、OAuth 2.0フレームワークを用いた<a href="https://auth0.com/docs/api-auth" target="_blank" >API認証と認可の実装</a>について説明します。</p></div></p><p></p>

## アクセス許可を定義する


<p>アクセス許可は、ユーザーの代わりに、提供されたアクセストークンを使ってどのようにしてリソースにアクセスできるのかを定義できるようにします。たとえば、ユーザーがマネージャーアクセスレベルを持つ場合には、<code>messages</code>リソースに対して読み出しアクセスを付与し、管理者アクセスレベルを持つ場合には、書き込みアクセスを付与することができます。</p><p>Auth0 Dashboardの<a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">［APIs］</a>セクションにある<b>［Permissions（権限）］</b>ビューで使用可能なアクセス許可を定義することができます。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/acef814282795bef6921535f044f96e9/Quickstarts_API.png" alt="［Auth0 Dashboard］>［Applications（アプリケーション）］>［APIs］>［Specific API（特定のAPI］>［Permissions（権限）］タブ" /><p><div class="alert-container" severity="default"><p>以下の例では<code>read:messages</code>スコープを使用します。</p></div></p>

## 依存関係をインストールする


<p><b>jwt </b>Gemをインストールします。</p><p><pre><code class="language-powershell">gem 'jwt'

    bundle install

</code></pre>

</p><p></p>

## Auth0Clientクラスを作成する {{{ data-action="code" data-code="app/controllers/concerns/secured.rb" }}}


<p><code>Auth0Client</code>と呼ばれるクラスを作成します。このクラスは要求の<code>Authorization</code>ヘッダーから得た受信アクセストークンをデコードし検証します。</p><p><code>Auth0Client</code>クラスはAuth0テナントの公開鍵を取得し、これを使ってアクセストークンの署名を検証します。<code>Token</code>構造体は<code>validate_permissions</code>メソッドを定義し、必要なスコープの配列を指定してアクセストークン内の特定の<code>scope</code>を検索し、トークンのペイロードに存在するかを確認します。</p>

## Secured concernを定義する {{{ data-action="code" data-code="app/controllers/concerns/secured.rb" }}}


<p>受信要求の<code>Authorization</code>ヘッダー内でアクセストークンを検索する<code>Secured</code>と呼ばれるConcernを作成します。</p><p>トークンが存在する場合、<code>Auth0Client.validate_token</code>は<code>jwt</code> Gemを使用してトークンの署名を確認し、トークンのクレームを検証します。</p><p>Concernには、アクセストークンが有効であることを検証するほか、トークンに要求されたリソースにアクセスするのに十分な<b>スコープ</b>があることを確認するためのメカニズムも整備されています。この例では、<code>Auth0Client</code>クラスから<code>Token.validate_permissions</code>メソッドを呼び出すことで、ブロックを受け取りアクセス許可を確認する<code>validate_permissions</code>メソッドを定義します。</p><p><code>/private-scoped</code>ルートでは、定義されたスコープはペイロードに入ってくるスコープと交差され、別の配列から1つ以上の項目が含まれているかを判定します。</p>

## ApplicationControllerにSecure concernを含める {{{ data-action="code" data-code="app/controllers/application_controller.rb" }}}


<p>アプリケーションコントローラーに<code>Secure</code> concernを追加すると、認可を必要とするコントローラーで<code>before_action</code>フィルターのみを使用すればよいことになります。</p>

## パブリックエンドポイントを作成する {{{ data-action="code" data-code="app/controllers/public_controller.rb" }}}


<p>パブリックエンドポイント<code>/api/public</code>を処理するようにコントローラーを作成します。</p><p><code>/public</code>エンドポイントでは認可は必要でないため、<code>before_action</code>は必要ありません。</p>

## プライベートエンドポイントを作成する {{{ data-action="code" data-code="app/controllers/private_controller.rb" }}}


<p><code>/api/private</code>と<code>/api/private-scoped</code>というプライベートエンドポイントを処理するようにコントローラーを作成します。</p><p><code>/api/private</code>は、追加スコープのないアクセストークンを含む認証された要求に使用することができます。</p><p><code>/api/private-scoped</code>は、<code>read:messages</code>スコープが付与されたアクセストークンを含む認証された要求に使用することができます。</p><p>保護されたエンドポイントは<code>Secured</code> concernから<code>authorize</code>メソッドを呼び出す必要があります。そのためには、<code>before_action :authorize</code>を使用します。これによって、<code>Secured.authorize</code>メソッドが<code>PrivateController</code>の各アクションの前に呼び出されます。</p><h3>APIを呼び出す</h3><p>APIを呼び出すにはアクセストークンが必要です。テスト用のアクセストークンは、<a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">API設定</a>の<b>［Test（テスト）］</b>ビューから取得することができます。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/6jeVBuypOGX5qMRXeJn5ow/dd20eb74e1e9079287762ce33dcf8e2d/Quickstart_Example_App_API.png" alt="［Auth0 Dashboard］>［Applications（アプリケーション）］>［API］>［Specific API（特定のAPI］>［Test（テスト）］タブ" /><p>要求の<code>Authorization</code>ヘッダーにアクセストークンを指定します。</p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#c928c3e9629c4ab5a046e898b8e8502d_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#c928c3e9629c4ab5a046e898b8e8502d_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#c928c3e9629c4ab5a046e898b8e8502d_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#c928c3e9629c4ab5a046e898b8e8502d_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#c928c3e9629c4ab5a046e898b8e8502d_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#c928c3e9629c4ab5a046e898b8e8502d_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#c928c3e9629c4ab5a046e898b8e8502d_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#c928c3e9629c4ab5a046e898b8e8502d_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#c928c3e9629c4ab5a046e898b8e8502d_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#c928c3e9629c4ab5a046e898b8e8502d_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="c928c3e9629c4ab5a046e898b8e8502d_shell"><pre><code class="language-text no-lines">curl --request get \

  --url 'http:///${account.namespace}/api_path' \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'</code></pre></div><div role="tabpanel" class="tab-pane " id="c928c3e9629c4ab5a046e898b8e8502d_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;http:///${account.namespace}/api_path&quot;);

var request = new RestRequest(Method.GET);

request.AddHeader(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="c928c3e9629c4ab5a046e898b8e8502d_go"><pre><code class="language-go no-lines">package main



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



}</code></pre></div><div role="tabpanel" class="tab-pane " id="c928c3e9629c4ab5a046e898b8e8502d_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.get(&quot;http:///${account.namespace}/api_path&quot;)

  .header(&quot;authorization&quot;, &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="c928c3e9629c4ab5a046e898b8e8502d_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'get',

  url: 'http:///${account.namespace}/api_path',

  headers: {authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="c928c3e9629c4ab5a046e898b8e8502d_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="c928c3e9629c4ab5a046e898b8e8502d_php"><pre><code class="language-php no-lines">$curl = curl_init();



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

}</code></pre></div><div role="tabpanel" class="tab-pane " id="c928c3e9629c4ab5a046e898b8e8502d_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPConnection(&quot;&quot;)



headers = { 'authorization': &quot;Bearer YOUR_ACCESS_TOKEN_HERE&quot; }



conn.request(&quot;get&quot;, &quot;/${account.namespace}/api_path&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="c928c3e9629c4ab5a046e898b8e8502d_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'



url = URI(&quot;http:///${account.namespace}/api_path&quot;)



http = Net::HTTP.new(url.host, url.port)



request = Net::HTTP::Get.new(url)

request[&quot;authorization&quot;] = 'Bearer YOUR_ACCESS_TOKEN_HERE'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="c928c3e9629c4ab5a046e898b8e8502d_swift"><pre><code class="language-swift no-lines">import Foundation



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



</p><p><div class="checkpoint">Ruby on rails手順7「チェックポイント」 <div class="checkpoint-default"><p>アプリケーションの構成が完了したら、アプリケーションを実行して次の点を確認します：</p><ul><li><p><code>GET /api/public</code>が認証を必要としない要求に使用できる。</p></li><li><p><code>GET /api/private</code>が認証された要求に使用できる。</p></li><li><p><code>GET /api/private-scoped</code>が<code>read:messages</code>スコープが付与されたアクセストークンを含む認証された要求に使用できる。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>アプリケーションが正常に起動しなかった場合は以下を行います。</p><ul><li><p>トークンを<code>Authorization</code>ヘッダーに含めて追加したことを確認します。</p></li><li><p>トークンに正しいスコープがあることを確認します。確認には<a href="https://jwt.io/" target="_blank" rel="noreferrer noopener">jwt.io</a>を使用します。</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>
