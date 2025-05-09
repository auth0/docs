---
title: デバイス認可フロー
description: このチュートリアルでは、デバイス認可フローを使用して、入力に制約のあるデバイスからAPIを呼び出す方法について説明します。
interactive:  true

locale: ja-JP
---

# デバイス認可フロー


<p>このチュートリアルでは、<a data-contentfulid="5o0Q0sUAtzV8S0YFfXblat-ja-JP">デバイス認可フロー</a>を使用して、入力に制約のあるデバイスからAPIを呼び出す方法について説明します。 ログインして、アカウント用に構成された例を参考にこのクイックタートに従うことをお勧めします。</p><p>対話型のエクスペリエンスには、<a href="https://auth0.github.io/device-flow-playground/" target="_blank" rel="noreferrer noopener">Device Flow Playground</a>を使用することができます。</p><h2>前提条件</h2><ul><li><p><a data-contentfulid="TvuCRosEZ2Kpx1WdFwWJt-ja-JP">ネイティブアプリケーションを登録する</a>。</p></li><li><p><b>OIDC準拠</b>のトグルが有効になっていることを確認する。詳細については、「<a data-contentfulid="5X6PoWErJuO1unXQymQsu3-ja-JP">OIDC準拠の認証</a>」をお読みください。</p></li><li><p>アプリケーションの付与タイプに<b>デバイスコード</b>を追加する。詳細については、「<a data-contentfulid="16N6CjkAtEzcGypwOkPItT-ja-JP">付与タイプを更新する</a>」をお読みください。</p></li><li><p><a data-contentfulid="2qqZWFtyjsJXT1R47diXIM-ja-JP">リフレッシュトークン</a>を有効にしたい場合には、アプリケーションの付与タイプに<b>リフレッシュトークン</b>を追加する。</p></li><li><p>アプリケーションに<a data-contentfulid="1Ye7SV0H0QbFUqZ9SsxJxl-ja-JP">少なくとも1つの接続を構成して有効化</a>する。</p></li><li><p><a data-contentfulid="450QmC9wuUtjlt8UQzRgPd-ja-JP">APIをAuth0に登録する</a>。</p><ul><li><p>リフレッシュトークンを使用している場合には、<b>［Allow Offline Access（オフラインアクセスの許可）］</b>を有効にする。詳細については、「<a data-contentfulid="302dVhVAcFGQAMcUS8ymHS-ja-JP">APIの設定</a>」をお読みください。</p></li></ul></li><li><p><a data-contentfulid="31DLcdiccXFyevXAtvjX5d-ja-JP">デバイスのユーザーコードの設定を構成</a>して、ランダムに生成されたユーザーコードの文字セット、形式、長さを定義する。</p></li></ul><p></p>

## デバイスコードを要求する


<p>ユーザーがデバイスアプリケーションを起動して、それを認可したい場合には、アプリケーションがAuth0 Authentication APIからのデバイスコードを要求して、ユーザーのセッションに関連付けなければなりません。</p><p>デバイスコードを取得するには、アプリケーションがAuthentication APIのデバイス認可フローで<a href="/docs/api/authentication#-post-oauth-device-code-" target="_self" >認証エンドポイント</a>を呼び出す必要があります：</p><p><pre style="display: none;"></pre>

<div class="code-picker">

  <div class="languages-bar"><ul><li class="active"><a href="#3a964580ffbc4acea7857f2a18197a9c_shell" role="tab" data-toggle="tab">cURL</a></li><li class=""><a href="#3a964580ffbc4acea7857f2a18197a9c_csharp" role="tab" data-toggle="tab">C#</a></li><li class=""><a href="#3a964580ffbc4acea7857f2a18197a9c_go" role="tab" data-toggle="tab">Go</a></li><li class=""><a href="#3a964580ffbc4acea7857f2a18197a9c_java" role="tab" data-toggle="tab">Java</a></li><li class=""><a href="#3a964580ffbc4acea7857f2a18197a9c_node" role="tab" data-toggle="tab">Node.JS</a></li><li class=""><a href="#3a964580ffbc4acea7857f2a18197a9c_objc" role="tab" data-toggle="tab">Obj-C</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="more-dots">...</a><ul class="dropdown-menu"><li class=""><a href="#3a964580ffbc4acea7857f2a18197a9c_php" role="tab" data-toggle="tab">PHP</a></li><li class=""><a href="#3a964580ffbc4acea7857f2a18197a9c_python" role="tab" data-toggle="tab">Python</a></li><li class=""><a href="#3a964580ffbc4acea7857f2a18197a9c_ruby" role="tab" data-toggle="tab">Ruby</a></li><li class=""><a href="#3a964580ffbc4acea7857f2a18197a9c_swift" role="tab" data-toggle="tab">Swift</a></li></ul></li></ul></div>



  <!-- Tab panes -->

  <div class="tab-content"><div role="tabpanel" class="tab-pane active" id="3a964580ffbc4acea7857f2a18197a9c_shell"><pre><code class="language-text no-lines">curl --request post \

  --url 'https://${account.namespace}/oauth/device/code' \

  --header 'content-type: application/x-www-form-urlencoded'</code></pre></div><div role="tabpanel" class="tab-pane " id="3a964580ffbc4acea7857f2a18197a9c_csharp"><pre><code class="language-csharp no-lines">var client = new RestClient(&quot;https://${account.namespace}/oauth/device/code&quot;);

var request = new RestRequest(Method.POST);

request.AddHeader(&quot;content-type&quot;, &quot;application/x-www-form-urlencoded&quot;);

IRestResponse response = client.Execute(request);</code></pre></div><div role="tabpanel" class="tab-pane " id="3a964580ffbc4acea7857f2a18197a9c_go"><pre><code class="language-go no-lines">package main



import (

 &quot;fmt&quot;

 &quot;net/http&quot;

 &quot;io/ioutil&quot;

)



func main() {



 url := &quot;https://${account.namespace}/oauth/device/code&quot;



 req, _ := http.NewRequest(&quot;post&quot;, url, nil)



 req.Header.Add(&quot;content-type&quot;, &quot;application/x-www-form-urlencoded&quot;)



 res, _ := http.DefaultClient.Do(req)



 defer res.Body.Close()

 body, _ := ioutil.ReadAll(res.Body)



 fmt.Println(res)

 fmt.Println(string(body))



}</code></pre></div><div role="tabpanel" class="tab-pane " id="3a964580ffbc4acea7857f2a18197a9c_java"><pre><code class="language-java no-lines">HttpResponse&lt;String&gt; response = Unirest.post(&quot;https://${account.namespace}/oauth/device/code&quot;)

  .header(&quot;content-type&quot;, &quot;application/x-www-form-urlencoded&quot;)

  .asString();</code></pre></div><div role="tabpanel" class="tab-pane " id="3a964580ffbc4acea7857f2a18197a9c_node"><pre><code class="language-javascript no-lines">var axios = require(&quot;axios&quot;).default;



var options = {

  method: 'post',

  url: 'https://${account.namespace}/oauth/device/code',

  headers: {'content-type': 'application/x-www-form-urlencoded'}

};



axios.request(options).then(function (response) {

  console.log(response.data);

}).catch(function (error) {

  console.error(error);

});</code></pre></div><div role="tabpanel" class="tab-pane " id="3a964580ffbc4acea7857f2a18197a9c_objc"><pre><code class="language-objective-c no-lines">#import &lt;Foundation/Foundation.h&gt;



NSDictionary *headers = @{ @&quot;content-type&quot;: @&quot;application/x-www-form-urlencoded&quot; };



NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@&quot;https://${account.namespace}/oauth/device/code&quot;]

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

[dataTask resume];</code></pre></div><div role="tabpanel" class="tab-pane " id="3a964580ffbc4acea7857f2a18197a9c_php"><pre><code class="language-php no-lines">$curl = curl_init();



curl_setopt_array($curl, [

  CURLOPT_URL =&gt; &quot;https://${account.namespace}/oauth/device/code&quot;,

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

}</code></pre></div><div role="tabpanel" class="tab-pane " id="3a964580ffbc4acea7857f2a18197a9c_python"><pre><code class="language-python no-lines">import http.client



conn = http.client.HTTPSConnection(&quot;&quot;)



headers = { 'content-type': &quot;application/x-www-form-urlencoded&quot; }



conn.request(&quot;post&quot;, &quot;/${account.namespace}/oauth/device/code&quot;, headers=headers)



res = conn.getresponse()

data = res.read()



print(data.decode(&quot;utf-8&quot;))</code></pre></div><div role="tabpanel" class="tab-pane " id="3a964580ffbc4acea7857f2a18197a9c_ruby"><pre><code class="language-ruby no-lines">require 'uri'

require 'net/http'

require 'openssl'



url = URI(&quot;https://${account.namespace}/oauth/device/code&quot;)



http = Net::HTTP.new(url.host, url.port)

http.use_ssl = true

http.verify_mode = OpenSSL::SSL::VERIFY_NONE



request = Net::HTTP::Post.new(url)

request[&quot;content-type&quot;] = 'application/x-www-form-urlencoded'



response = http.request(request)

puts response.read_body</code></pre></div><div role="tabpanel" class="tab-pane " id="3a964580ffbc4acea7857f2a18197a9c_swift"><pre><code class="language-swift no-lines">import Foundation



let headers = [&quot;content-type&quot;: &quot;application/x-www-form-urlencoded&quot;]



let request = NSMutableURLRequest(url: NSURL(string: &quot;https://${account.namespace}/oauth/device/code&quot;)! as URL,

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



</p>

## デバイスコードを受け取る


<p>デバイスアプリケーションはHTTP 200応答と次のようなペイロードを受け取るはずです：</p><p><pre><code>{

  &quot;device_code&quot;: &quot;GmRh...k9eS&quot;,

  &quot;user_code&quot;: &quot;WDJB-MJHT&quot;,

  &quot;verification_uri&quot;: &quot;https://my-tenant.auth0.com/device&quot;,

  &quot;verification_uri_complete&quot;: &quot;https://my-tenant.auth0.com/device?user_code=WDJB-MJHT&quot;,

  &quot;expires_in&quot;: 900,

  &quot;interval&quot;: 5

}

</code></pre>

</p>

## デバイスのアクティベーションを要求する


<p>デバイスアプリケーションは、<code>device_code</code>と<code>user_code</code>の受信後に、ユーザーに<code>verification_uri</code>で<code>user_code</code>を入力するよう指示する必要があります。</p><img src="//images.ctfassets.net/cdy7uua7fh8z/3Q9q41wocl6SojRoiGefXT/a98582a3c86740aaeb3d957f2dc4afe6/request-device-activation.png" alt="null" /><p><div class="alert-container" severity="warning"><p><code>device_code</code>はユーザーに直接提供するものではないため、ユーザーが混乱しないように、処理中に表示するべきではありません。</p></div></p><p><div class="alert-container" severity="default"><p>CLIをビルドする際は、この手順をスキップし、<code>verification_uri_complete</code>を使って直接ブラウザーを開くことができます。</p></div></p>

## トークンエンドポイントをポーリングする


<p>ユーザーによるアクティベーションを待っている間、デバイスアプリケーションはAuthentication API <a href="/docs/api/authentication#-post-oauth-token-" target="_self" >POST /oauth/tokenエンドポイント</a>を断続的に呼び出して、応答を適切に処理する必要があります。</p><p><div class="alert-container" severity="default"><p>デバイスアプリケーションが確実にその<code>interval</code>（秒単位）または成功応答の受信で長い方の時間を待機して、ネットワーク遅延の問題を回避するようにします。</p></div></p><p><pre><code>curl --request POST \ 

--url 'https://${account.namespace}/oauth/token' \ 

--header 'content-type: application/x-www-form-urlencoded' \ 

--data grant_type=urn:ietf:params:oauth:grant-type:device_code \ 

--data device_code=__AUTH0_SCOPES__ \ 

--data 'client_id=${account.clientId}'

</code></pre>

</p>

## ユーザーの認可


<p>ユーザーはQRコードをスキャンするか、アクティベーションページを開いてユーザーコードを入力します：</p><img src="//images.ctfassets.net/cdy7uua7fh8z/7IwrVX4s5a36CvfY95rKCo/1f0734161a6e1fb6acbefb674896bf74/Device_Activation_-_Japanese.png" alt="null" /><p>確認ページが表示され、ユーザーが正しいデバイスであることを確認します：</p><img src="//images.ctfassets.net/cdy7uua7fh8z/5dwhOyM1HRNwfV3Co4Da2o/41706a37843a99b6c21117d4aebcd881/Device_Confirmation_-_Japanese.png" alt="null" /><p>ユーザーがサインインして、トランザクションが完了します。この手順には、以下の1つ以上のプロセスが含まれます。</p><ul><li><p>ユーザーを認証する</p></li><li><p>認証を行うために、ユーザーをIDプロバイダーへリダイレクトする</p></li><li><p>アクティブなSSOセッションを確認する</p></li><li><p>デバイスに関してユーザーの同意がまだ得られていない場合には、同意を得る</p></li></ul><img src="//images.ctfassets.net/cdy7uua7fh8z/3GqqaNB7sjcAYTQiTnEEsn/26ff7d214f4f02f4a703941908045cd1/Login_screen_-_Japanese.png" alt="null" /><p>認証と同意が成功すると、確認のプロンプトが表示されます：</p><img src="//images.ctfassets.net/cdy7uua7fh8z/2TsQpMa8fzifiojuEXLvDo/2e19d86a58bb4af653307f3086911d87/Success_message_-_Japanese.png" alt="null" /><p>この時点で、ユーザーの認証とデバイスの認可は完了しています。</p>

## トークンを受け取る


<p>ユーザーがデバイスアプリケーションを認可すると、HTTP 200応答と次のペイロードを受け取ります：</p><p><pre><code class="language-json">{

  &quot;access_token&quot;: &quot;eyJz93a...k4laUWw&quot;,

  &quot;refresh_token&quot;: &quot;GEbRxBN...edjnXbL&quot;,

  &quot;id_token&quot;: &quot;eyJ0XAi...4faeEoQ&quot;,

  &quot;token_type&quot;: &quot;Bearer&quot;,

  &quot;expires_in&quot;: 86400

}

</code></pre>

</p><p><div class="alert-container" severity="warning"><p>トークンは検証してから保存します。方法については、「<a data-contentfulid="6DnVGunP9ZOQvZjFZE0EOP-ja-JP"><b>アクセストークンを検証する</b></a>」と「<a data-contentfulid="1O5WNRhzrz1R0n4xFQtM8j-ja-JP"><b>IDトークンを検証する</b></a>」をお読みください。</p></div></p><p><a data-contentfulid="48OqDR4wWZTFo8FZw7tSMj-ja-JP">アクセストークン</a>は、Authentication APIの<a href="/docs/api/authentication#get-user-info" target="_self" >ユーザー情報取得エンドポイント</a>（デバイスアプリケーションが<code>openid</code>スコープを要求した場合）、または<code>audience</code>パラメーターが指定したAPIを呼び出すために使用されます。独自のAPIを呼び出す場合には、デバイスアプリケーションは使用する前に<a data-contentfulid="6DnVGunP9ZOQvZjFZE0EOP-ja-JP">アクセストークンを検証</a>しなければなりません。</p><p><a data-contentfulid="7eGepxAjz89d1F7i1aP4ch-ja-JP">IDトークン</a>には、<a href="/docs/tokens/id-tokens#id-token-payload" target="_self" >デコードと抽出</a>が必要なユーザー情報が含まれています。デバイスアプリケーションが<code>openid</code>スコープを要求した場合には、Authentication APIは<code>id_token</code>のみを返します。</p><p><a data-contentfulid="2qqZWFtyjsJXT1R47diXIM-ja-JP">リフレッシュトークン</a>は、アクセストークンまたはIDトークンの期限が切れたときに、新しいトークンの取得に使用されます。<code>audience</code>パラメーターが指定するAPIに<b>［Allow Offline Access（オフラインアクセスの許可）］</b>設定が有効化されていて、デバイスアプリケーションが<code>offline_access</code>スコープを要求した場合には、Authentication APIは<code>refresh_token</code>のみを返します。</p>

## APIを呼び出す


<p>APIを呼び出すには、デバイスアプリケーションはアクセストークンをベアラートークンとしてHTTP要求の<code>Authorization</code>ヘッダーで渡さなければなりません。</p><p><pre><code>curl --request GET \

  --url https://myapi.com/api \

  --header 'authorization: Bearer __AUTH0_API_ACCESS_TOKEN__' \

  --header 'content-type: application/json'

</code></pre>

</p>

## リフレッシュトークン


<p>ユーザーに新しいアクセストークンを取得するために、デバイスアプリケーションは、<code>refresh_token</code>パラメーターを指定してAuthentication API <a href="/docs/api/authentication#-post-oauth-token-" target="_self" >POST /oauth/tokenエンドポイント</a>を呼び出すことができます。</p><p><pre><code>curl --request POST \

  --url 'https://${account.namespace}/oauth/token' \

  --header 'content-type: application/x-www-form-urlencoded' \

  --data grant_type=refresh_token \

  --data 'client_id=${account.clientId}' \

  --data 'client_secret=${account.clientSecret}' \

  --data refresh_token=__AUTH0_REFRESH_TOKEN__

</code></pre>

</p><p>要求が成功すると、デバイスアプリケーションはHTTP 200応答で次のペイロードを受け取ります：</p><p><pre><code class="language-json">{

  &quot;access_token&quot;: &quot;eyJ...MoQ&quot;,

  &quot;expires_in&quot;: 86400,

  &quot;scope&quot;: &quot;openid offline_access&quot;,

  &quot;id_token&quot;: &quot;eyJ...0NE&quot;,

  &quot;token_type&quot;: &quot;Bearer&quot;

}

</code></pre>

</p><p>リフレッシュトークンの詳細については、「<a href="https://auth0.com/docs/secure/tokens/refresh-tokens" target="_blank" >リフレッシュトークン</a>」をお読みください。</p>

## トラブルシューティング


<p><a data-contentfulid="1rqQVgWhfq0S0rUKL86J1i-ja-JP">テナントログ</a>は実行されるあらゆるやり取りを記録し、問題の解決に利用することができます。</p><p><div class="tablew"><table class="table"><thead>

<tr>

<th>**コード**</th>

<th>**名前**</th>

<th>**説明**</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>fdeaz</code></td>

<td>デバイス認可要求の失敗</td>

<td></td>

</tr>

<tr>

<td><code>fdeac</code></td>

<td>デバイスのアクティベーションに失敗</td>

<td></td>

</tr>

<tr>

<td><code>fdecc</code></td>

<td>ユーザーがデバイス確認をキャンセル</td>

<td></td>

</tr>

<tr>

<td><code>fede</code></td>

<td>交換の失敗</td>

<td>アクセストークンのデバイスコード</td>

</tr>

<tr>

<td><code>sede</code></td>

<td>交換の成功</td>

<td>アクセストークンのデバイスコード</td>

</tr>

</tbody>

</table></div></p><h3>トークンの応答</h3><p>ユーザーによるデバイスの認可を待っている間には、さまざまなHTTP 4xx応答を受け取ります。</p><h4>認可待ち</h4><p>このエラーは、ユーザーの操作を待っている間に表示されます。このチュートリアルの前の手順で推奨されている<code>interval</code>を使ってポーリングを継続してください。</p><p><pre><code>`HTTP 403`



{ 

  &quot;error&quot;: &quot;authorization_pending&quot;, 

  &quot;error_description&quot;: &quot;...&quot; 

}

</code></pre>

</p><h4>減速</h4><p>ポーリングが速すぎます。このチュートリアルの前の手順で推奨されている間隔を使ってポーリングしてください。ネットワーク遅延が原因でこのエラーを受け取ることを避けるには、ポーリング要求の応答を受け取ってから間隔をカウントし始めるようにします。</p><p><pre><code>`HTTP 429`



{

  &quot;error&quot;: &quot;slow_down&quot;,

  &quot;error_description&quot;: &quot;...&quot;

}

</code></pre>

</p><h4>有効期限切れのトークン</h4><p>ユーザーによるデバイスの認可が遅かったため、<code>device_code</code>の期限が切れました。アプリケーションはユーザーにフローの失効を通知して、フローをもう一度始めるように促す必要があります。</p><p><div class="alert-container" severity="default"><p><code>expired_token</code>エラーは一度だけ返されます。それ以降は、エンドポイントが<code>invalid_grant</code>エラーを返します。</p></div></p><p><pre><code>`HTTP 403`



{ 

  &quot;error&quot;: &quot;expired_token&quot;,

  &quot;error_description&quot;: &quot;...&quot;

}

</code></pre>

</p><h4>アクセス拒否</h4><p>アクセスが拒否された場合には、次を受け取ります：</p><p><pre><code>`HTTP 403`



{

  &quot;error&quot;: &quot;access_denied&quot;,

  &quot;error_description&quot;: &quot;...&quot;

}

</code></pre>

</p><p>これは、以下を含むさまざまな原因で発生します。</p><ul><li><p>ユーザーがデバイスの認可を拒否した。</p></li><li><p>認可サーバーがトランザクションを拒否した。</p></li><li><p>構成済みの<a data-contentfulid="43AE9LshgFKVjmxuAVSgPW-ja-JP">アクション</a>がアクセスを拒否した。</p></li></ul><p></p>

## 実装例


<p>以下の例を参考に、このフローを実際のアプリケーションに実装する方法を確認してください。</p><ul><li><p><a href="https://auth0.github.io/device-flow-playground/" target="_blank" rel="noreferrer noopener">Device Authorization Playground</a></p></li><li><p><a href="https://github.com/pushpabrol/auth0-device-flow-appletv" target="_blank" rel="noreferrer noopener">AppleTV（Swift）</a>：AppleTVからのデバイス認可フローにAuth0を使用する方法を示す簡素なアプリケーションです。</p></li><li><p><a href="https://gist.github.com/panva/652c61e7d847e0ed99926c324fa91b36" target="_blank" rel="noreferrer noopener">CLI（Node.js）</a>：認可コードフローではなく、デバイス認可フローを使用するCLIの実装例です。大きな違いは、CLIがWebサーバーのホスティングやポートの待ち受けを必要としないことです。</p></li></ul><p></p>

## 制限事項


<p>デバイス認可フローを使用するには、デバイスアプリケーションに以下が必要です。</p><ul><li><p>Server Name Indication（SNI）に対応している</p></li><li><p><a data-contentfulid="TvuCRosEZ2Kpx1WdFwWJt-ja-JP">ネイティブアプリケーション</a></p></li><li><p><a href="/docs/secure/application-credentials#application-authentication-methods" target="_self" >認証方法</a>が<b>［None（なし）］</b>に設定されている</p></li><li><p><a href="/docs/dashboard/reference/settings-application#oauth" target="_self" >OIDCに準拠</a></p></li><li><p><a data-contentfulid="4j9m9maYJHkXDgcqaijdWZ-ja-JP">動的クライアント登録（Dynamic Client Registration）</a></p></li></ul><p>また、デバイス認可フローには以下を使用できません：</p><ul><li><p><a data-contentfulid="3R5dpsFZe4Hnk90zDjYIoi-ja-JP">Auth0の開発者キー</a>を使用した<a data-contentfulid="3rAo4RBG7KOC6hpe0WLi1u-ja-JP">ソーシャル接続</a>（<a data-contentfulid="E0ZVoNC39TumW12W7LanM-ja-JP">新しいユニバーサルログインエクスペリエンス</a></p></li><li><p>ホストされたログインページやアクションからクエリ文字列パラメーターへのアクセス</p></li></ul><p></p>
