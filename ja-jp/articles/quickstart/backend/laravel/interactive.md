---
title: Laravelアプリケーションに認可を追加する
description: このガイドでは、新規（または既存）のLaravel 9または10アプリケーションにAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/routes/api
github:
  path: sample
locale: ja-JP
---

# Laravelアプリケーションに認可を追加する


<p><a href="https://github.com/auth0/laravel-auth0" target="_blank" rel="noreferrer noopener">Auth0のLaravel SDK</a>を使用すると、Laravelアプリケーションにトークンベースの認可とルーティングに基づくアクセスコントロールを手軽に追加できます。このガイドでは、新規（または既存）の<a href="https://github.com/auth0/laravel-auth0#support-policy" target="_blank" rel="noreferrer noopener">Laravel 9または10</a>アプリケーションにAuth0を統合する方法を説明します。</p><hr/><p><b>バックエンドアプリケーションが従来のWebアプリケーションと異なるのは、前者がユーザー認証を処理しない、またはユーザーインターフェイスを持っていない点にあります。バックエンドアプリケーションには、他のアプリケーションが対話できるAPIが用意されており、ルートへのアクセス制御を行うために、要求内の</b><b><code>Authorization</code></b><b>ヘッダー</b><b>からの</b><a href="https://auth0.com/docs/secure/tokens/access-tokens" target="_blank" ><b>アクセストークン</b></a>を受け入れます。</p><p>別のフロントエンドアプリケーションは通常、これらのタイプのバックエンドと対話するために構築されます。これには、<a href="https://auth0.com/docs/quickstart/spa" target="_blank" >シングルページアプリケーション</a>や<a href="https://auth0.com/docs/quickstart/native" target="_blank" >ネイティブまたはモバイルアプリ</a>（Auth0はこれらすべてに対しSDKも提供）などさまざまな可能性があります。</p><p>ユーザーがバックエンドアプリケーションと対話する必要がある場合、まず、フロントエンドアプリケーションを使ってAuth0と認証を行います。フロントエンドアプリケーションはAuth0からアクセストークンを取得し、これを使ってユーザーに代わって、バックエンドアプリケーションに要求することができます。</p><p>名前が示唆するように、<a href="https://auth0.com/docs/secure/tokens/access-tokens" target="_blank" >アクセストークン</a>はアクセス制御（認可）の問題に対処するように設計されており、ユーザーに関する情報は含まれていません。<b>バックエンドアプリケーションは、アクセストークンとのみ動作します。</b><a href="https://auth0.com/docs/api/management/v2" target="_blank" >Management API</a>を使ってトークンを作成したユーザーに関する情報を取得することができます。これについては後で説明します。</p><p></p>

## Laravelをインストールする


<p><b>Laravelアプリケーションをまだセットアップしていない場合</b>には、シェルを開いて、新規プロジェクトに適切なディレクトリに移動し、次のコマンドを実行します：</p><p><pre><code class="language-bash">composer create-project --prefer-dist laravel/laravel auth0-laravel-api ^9.0

</code></pre>

</p><p>このガイドにあるすべてのコマンドは、Laravelプロジェクトディレクトリのルートから実行されていることを前提としています。必ず新規プロジェクトのディレクトリに移動（<code>cd</code>）してください：</p><p><pre><code class="language-bash">cd auth0-laravel-api

</code></pre>

</p>

## SDKをインストールする


<p>プロジェクトディレクトリで次のコマンドを実行して、<a href="https://github.com/auth0/laravel-auth0" target="_blank" rel="noreferrer noopener">Auth0 Laravel SDK</a>をインストールします：</p><p><pre><code class="language-bash">composer require auth0/login:^7.8 --update-with-all-dependencies

</code></pre>

</p><p>そして、アプリケーションにSDK構成ファイルを生成します：</p><p><pre><code class="language-bash">php artisan vendor:publish --tag auth0

</code></pre>

</p>

## SDKを構成する


<p>プロジェクトディレクトリから次のコマンドを実行して、<a href="https://github.com/auth0/auth0-cli" target="_blank" rel="noreferrer noopener">Auth0 CLI</a>をダウンロードします：</p><p><pre><code class="language-bash">curl -sSfL https://raw.githubusercontent.com/auth0/auth0-cli/main/install.sh | sh -s -- -b .

</code></pre>

</p><p>そして、Auth0アカウントを使ってCLIを認証し、プロンプトでユーザーとしてログインすることを選択します：</p><p><pre><code class="language-bash">./auth0 login

</code></pre>

</p><p>次に、Auth0で新しいアプリケーションを作成します：</p><p><pre><code class="language-bash">./auth0 apps create \

--name &quot;My Laravel Backend&quot; \

--type &quot;regular&quot; \

--auth-method &quot;post&quot; \

--callbacks &quot;http://localhost:8000/callback&quot; \

--logout-urls &quot;http://localhost:8000&quot; \

--reveal-secrets \

--no-input \

--json &gt; .auth0.app.json

</code></pre>

</p><p>また、新しいAPIも作成します：</p><p><pre><code class="language-bash">./auth0 apis create \

--name &quot;My Laravel Backend API&quot; \

--identifier &quot;https://github.com/auth0/laravel-auth0&quot; \

--offline-access \

--no-input \

--json &gt; .auth0.api.json

</code></pre>

</p><p>これで、SDKを構成するプロジェクトディレクトリ内に2つのファイルが作成されます。</p><p>これらのファイルには資格情報が保管されているため、機密として扱うことが重要です。必ず、バージョン管理では、これらのファイルをコミットしないようにしてください。Gitを使用している場合は、必ず<code>.gitignore</code>ファイルに追加します：</p><p><pre><code class="language-bash">echo &quot;.auth0.*.json&quot; &gt;&gt; .gitignore

</code></pre>

</p>

## アクセス制御 {{{ data-action="code" data-code="routes/api.php#6:16" }}}


<p>SDKは、<code>api</code>ミドルウェアと併用するLaravelアプリケーションで認可ガードを自動的に登録します。Laravelはデフォルトで、アプリケーションの<code>routes/api.php</code>ファイルのすべてのルートに適用します。</p><p><div class="alert-container" severity="warning"><p>構成を追加せずにSDKが期待通りに動作するには、<b><code>routes/api.php</code></b><b>ファイルでルートを定義する必要があります。</b></p></div></p><p>アプリケーションの経路へのアクセスを制約するには、Auth0 SDKの認可ガードを使用することができます。</p><p><code>Authorization</code>ヘッダーで有効なアクセストークンを含まない要求を拒否するには、Laravelの<code>auth</code>ミドルウェアを使用することができます。</p><p><pre><code class="language-php">Route::get('/private', function () {

 return response()-&gt;json([

 'message' \=&gt; 'Your token is valid; you are authorized.',

 ]);

})-&gt;middleware('auth');

</code></pre>

</p><p>また、これをLaravelの<code>can</code>ミドルウェアと組み合わせると、提供されたトークンに特定の<a href="https://auth0.com/docs/manage-users/access-control/rbac" target="_blank" >権限</a>を要求することができます。</p><p><pre><code class="language-php">Route::get('/scope', function () {

 return response()-&gt;json([

 'message' =&gt; 'Your token is valid and has the `read:messages` permission; you are authorized.',

 ]);

})-&gt;middleware('auth')-&gt;can('read:messages');

</code></pre>

</p>

## トークン情報 {{{ data-action="code" data-code="routes/api.php#18:30" }}}


<p>提供されたアクセストークンについての情報は、Laravelの<code>Auth</code>ファサードまたは<code>auth()</code>ヘルパー関数を介して利用できます。</p><p>以下は、ユーザーの識別子とメールアドレスを取得する例です。</p><p><pre><code class="language-php">Route::get('/', function () {

 if (! auth()-&gt;check()) {

 return response()-&gt;json([

 'message' =&gt; 'You did not provide a valid token.',

 ]);

 }



 return response()-&gt;json([

 'message' =&gt; 'Your token is valid; you are authorized.',

 'id' =&gt; auth()-&gt;id(),

 'token' =&gt; auth()?-&gt;user()?-&gt;getAttributes(),

 ]);

});

</code></pre>

</p>

## ユーザー情報を取得する {{{ data-action="code" data-code="routes/api.php#32:51" }}}


<p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md" target="_blank" rel="noreferrer noopener">Auth0 Management API</a>を使って、Auth0からアクセストークンを作成したユーザーについての情報を取得することができます。SDKにはこのAPIに便利なラッパーが備わっており、SDKの<code>management()</code>メソッドからアクセス可能です。</p><p><b>Management APIを呼び出す前に、アプリケーションがManagement APIと通信できるようにしなければなりません。</b>これを実行するには、<a href="https://manage.auth0.com/#/apis/" target="_blank" rel="noreferrer noopener">Auth0 DashboardのAPIページ</a>で<code>［Auth0 Management API］</code>を選択してから［Machine to Machine Applications（M2Mアプリケーション）］タブを選択します。Laravelアプリケーションを認可してから、下矢印をクリックして、付与したいスコープを選択します。</p><p>以下の例では、<code>read:users</code>スコープを付与する必要があります。APIエンドポイントのリストと必要なスコープについては、<a href="https://auth0.com/docs/api/management/v2" target="_blank" >Management APIのドキュメント</a>を参照してください。</p><p><pre><code class="language-php">use Auth0\Laravel\Facade\Auth0;



Route::get('/me', function () {

 $user = auth()-&gt;id();

 $profile = cache()-&gt;get($user);



 if (null === $profile) {

 $endpoint = Auth0::management()-&gt;users();

 $profile = $endpoint-&gt;get($user);

 $profile = Auth0::json($profile);



 cache()-&gt;put($user, $profile, 120);

 }



 $name = $profile['name'] ?? 'Unknown';

 $email = $profile['email'] ?? 'Unknown';



 return response()-&gt;json([

 'name' =&gt; $name,

 'email' =&gt; $email,

 ]);

})-&gt;middleware('auth');

</code></pre>

</p><p><div class="alert-container" severity="default"><p><b>アプリケーションでユーザー情報を短期間キャッシュする必要があります。</b>これによって、アプリケーションがAuth0に対して行う要求数を減らし、パフォーマンスが向上します。ユーザー情報をアプリケーションに長期間保存するとデータが古くなる可能性があるため避けてください。ユーザーの識別子以外のユーザー情報を持続的データベースに保存することも避けてください。</p></div></p>

## アプリケーションを実行する


<p>Laravelアプリケーションを起動する準備が整いました。要求を受け付けることができます：</p><p><pre><code class="language-php">php artisan serve

</code></pre>

</p>

## テストトークンを取得する


<p><a href="https://auth0.com/docs/secure/tokens/access-tokens/get-access-tokens" target="_blank" >アクセストークンの取得については、こちらに</a>詳しく記載されています。ただし、このクイックスタートでは、<a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">API設定の［test（テスト）］ビュー</a>からアクセストークンを簡単に使用することができます。</p><p><div class="alert-container" severity="default"><p>上で作成した<code>/me</code>ルートには関連付けられた実際のユーザーが存在しないため、テストトークンで動作しません。</p></div></p><p><div class="checkpoint">Laravelクイックスタート手順8「チェックポイント」 <div class="checkpoint-default"><p>シェルを開き、アプリケーションに要求を発行するようにします。</p><p>まず、パブリックルートを要求します。</p><p><code>curl --request GET \ --url http://localhost:8000/api \ --header &#39;Accept: application/json&#39;</code></p><p>次に、<code>Authorization</code>ヘッダーでアクセストークンを使用して、保護されたルートを要求します。</p><p><code>curl --request GET \ --url http://localhost:8000/api/private \ --header &#39;Accept: application/json&#39; \ --header &#39;Authorization: Bearer YOUR_ACCESS_TOKEN&#39;</code></p><p>最後に、スコープで保護されたルートを要求するようにします。この要求は、アクセストークンに<code>read:messages</code>スコープが付与されている場合にのみ成功します。</p><p><code>curl --request GET \ --url http://localhost:8000/api/scope \ --header &#39;Accept: application/json&#39; \ --header &#39;Authorization: Bearer YOUR_ACCESS_TOKEN&#39;</code></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>試せることがいくつかあります。</p><ul><li><p><code>php artisan optimize:clear</code>を実行してLaravelのキャッシュを消去してみます。</p></li><li><p><code>.auth0.app.json</code>および<code>.auth0.api.json</code>ファイルがプロジェクトのルートにあることを確認します。</p></li><li><p>Laravelアプリケーションをマシンツーマシンアプリケーションとして有効化し、<a href="https://manage.auth0.com/#/apis/" target="_blank" rel="noreferrer noopener">Auth0 Dashboard</a>を使用して、<code>Auth0 Management API</code>で必要なスコープがすべて付与されていることを確認します。</p></li></ul><p>問題が発生しましたか？SDKの<a href="https://github.com/auth0/laravel-auth0" target="_blank" rel="noreferrer noopener">ドキュメント</a>またはAuth0の<a href="https://auth0.com/docs" target="_blank" >ドキュメンテーションハブ</a>を確認してください。また、<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティ</a>の利用も検討してください。Auth0チームや他のコミュニティメンバーがご質問にお答えします。</p></div>

  </div></p><h3>その他の情報</h3><ul><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Users.md" target="_blank" rel="noreferrer noopener">ユーザーリポジトリとモデル</a>はAuth0 Laravel SDKを拡張して、カスタムのユーザーモデルを使用し、データベースでユーザーの保管や取得を行う方法を指定することができます。</p></li><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Events.md" target="_blank" rel="noreferrer noopener">イベントフック</a>はAuth0 Laravel SDKで発生したイベントをリッスンする方法を処理して、統合の動作を完全にカスタマイズすることができます。</p></li><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md" target="_blank" rel="noreferrer noopener">Management API</a>対応はAuth0 Laravel SDKに組み込まれているため、LaravelアプリケーションからManagement APIと対話することができます。</p></li></ul><p></p>
