---
title: Laravelアプリケーションにログインを追加する
description: このガイドでは、新規（または既存）のLaravel 9または10アプリケーションにAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/routes/web
github:
  path: sample
locale: ja-JP
---

# Laravelアプリケーションにログインを追加する


<p><a href="https://github.com/auth0/laravel-auth0" target="_blank" rel="noreferrer noopener">Auth0のLaravel SDK</a>を使用すると、Laravelアプリケーションに認証、ユーザープロファイル管理、ルーティングに基づくアクセスコントロールを手軽に追加できます。このガイドでは、新規（または既存）の<a href="https://github.com/auth0/laravel-auth0#support-policy" target="_blank" rel="noreferrer noopener">Laravel 9または10</a>アプリケーションにAuth0を統合する方法を説明します。</p><p></p>

## Laravelをインストールする


<p><b>Laravelアプリケーションをまだセットアップしていない場合</b>には、シェルを開いて、新規プロジェクトに適切なディレクトリに移動し、次のコマンドを実行します：</p><p><pre><code class="language-bash">composer create-project --prefer-dist laravel/laravel auth0-laravel-app ^9.0

</code></pre>

</p><p>このガイドにあるすべてのコマンドは、Laravelプロジェクトディレクトリのルートから実行されていることを前提としています。必ず新規プロジェクトのディレクトリに移動（<code>cd</code>）してください：</p><p><pre><code class="language-bash">cd auth0-laravel-app

</code></pre>

</p>

## SDKをインストールする


<p>プロジェクトディレクトリで次のコマンドを実行して、<a href="https://github.com/auth0/laravel-auth0" target="_blank" rel="noreferrer noopener">Auth0 Laravel SDK</a>をインストールします：</p><p><pre><code class="language-bash">composer require auth0/login:^7.8 --update-with-all-dependencies

</code></pre>

</p><p>そして、アプリケーションにSDK構成ファイルを生成します：</p><p><pre><code class="language-bash">php artisan vendor:publish --tag auth0

</code></pre>

</p>

## SDKを構成する


<p>プロジェクトディレクトリから次のコマンドを実行して、Auth0 CLIをダウンロードします：</p><p><pre><code class="language-bash">curl -sSfL https://raw.githubusercontent.com/auth0/auth0-cli/main/install.sh | sh -s -- -b .

</code></pre>

</p><p>そして、Auth0アカウントを使ってCLIを認証し、プロンプトでユーザーとしてログインすることを選択します：</p><p><pre><code class="language-bash">./auth0 login

</code></pre>

</p><p>次に、Auth0で新しいアプリケーションを作成します：</p><p><pre><code class="language-bash">./auth0 apps create \

  --name &quot;My Laravel Application&quot; \

  --type &quot;regular&quot; \

  --auth-method &quot;post&quot; \

  --callbacks &quot;http://localhost:8000/callback&quot; \

  --logout-urls &quot;http://localhost:8000&quot; \

  --reveal-secrets \

  --no-input \

  --json &gt; .auth0.app.json

</code></pre>

</p><p>また、新しいAPIも作成します：</p><p><pre><code class="language-bash">./auth0 apis create \

  --name &quot;My Laravel Application's API&quot; \

  --identifier &quot;https://github.com/auth0/laravel-auth0&quot; \

  --offline-access \

  --no-input \

  --json &gt; .auth0.api.json

</code></pre>

</p><p>これで、SDKを構成するプロジェクトディレクトリ内に2つのファイルが作成されます。</p><p>これらのファイルには資格情報が保管されているため、機密として扱うことが重要です。必ず、バージョン管理では、これらのファイルをコミットしないようにしてください。Gitを使用している場合は、必ず<code>.gitignore</code>ファイルに追加します：</p><p><pre><code class="language-bash">echo &quot;.auth0.*.json&quot; &gt;&gt; .gitignore

</code></pre>

</p>

## ログイン経路


<p>SDKは、アプリケーションのユーザーを認証するために必要なすべての経路を自動的に登録します。</p><p><div class="tablew"><table class="table"><thead>

<tr>

<th>**経路**</th>

<th>**目的**</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>/login</code></td>

<td>認証フローを開始します。</td>

</tr>

<tr>

<td><code>/logout</code></td>

<td>ユーザーをログアウトさせます。</td>

</tr>

<tr>

<td><code>/callback</code></td>

<td>Auth0からのコールバックを処理します。</td>

</tr>

</tbody>

</table></div></p><p>これらについて細かな制御が必要な場合や、アプリケーションで既存の経路と競合する場合には、SDKのコントローラーを手動で登録することができます。高度な統合について、<a href="https://github.com/auth0/laravel-auth0" target="_blank" rel="noreferrer noopener">SDKのREADME</a>を参照してください。</p>

## アクセス制御 {{{ data-action="code" data-code="routes/web.php#6:12" }}}


<p>Laravelの認証機能は「guards」を使用して、それぞれの要求でユーザーがどのように認証されるのかを定義します。アプリケーションの経路へのアクセスを制約するには、Auth0 SDKの認証ガードを使用することができます。</p><p>経路へのアクセスに先だって、ユーザーの認証を要求するには、Laravelの<code>auth</code>ミドルウェアを使用することができます。</p><p><pre><code class="language-php">Route::get('/private', function () {

  return response('Welcome! You are logged in.');

})-&gt;middleware('auth');

</code></pre>

</p><p>また、これをLaravelの<code>can</code>ミドルウェアと組み合わせると、認証済みのユーザーに特定の<a href="https://auth0.com/docs/manage-users/access-control/rbac" target="_blank" >権限</a>を要求することができます。</p><p><pre><code class="language-php">Route::get('/scope', function () {

    return response('You have `read:messages` permission, and can therefore access this resource.');

})-&gt;middleware('auth')-&gt;can('read:messages');

</code></pre>

</p>

## ユーザー情報 {{{ data-action="code" data-code="routes/web.php#14:24" }}}


<p>認証済みのユーザーについての情報は、Laravelの<code>Auth</code>ファサードまたは<code>auth()</code>ヘルパー関数を介して利用できます。</p><p>以下は、ユーザーの識別子とメールアドレスを取得する例です。</p><p><pre><code class="language-php">Route::get('/', function () {

  if (! auth()-&gt;check()) {

    return response('You are not logged in.');

  }



  $user = auth()-&gt;user();

  $name = $user-&gt;name ?? 'User';

  $email = $user-&gt;email ?? '';



  return response(&quot;Hello {$name}! Your email address is {$email}.&quot;);

});;

</code></pre>

</p>

## ユーザー管理 {{{ data-action="code" data-code="routes/web.php#26:43" }}}


<p>ユーザー情報は、<a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md" target="_blank" rel="noreferrer noopener">Auth0 Management API</a>を使用して更新することができます。管理エンドポイントはすべて、SDKの<code>management()</code>メソッドでアクセスすることができます。</p><p><b>Management APIを呼び出す前に、アプリケーションがManagement APIと通信できるようにしなければなりません。</b>これを実行するには、<a href="%24%7Bmanage_url%7D/#/apis/" target="_blank" rel="noreferrer noopener">Auth0 DashboardのAPIページ</a>で<code>［Auth0 Management API］</code>を選択してから［Machine to Machine Applications（M2Mアプリケーション）］タブを選択します。Laravelアプリケーションを認可してから、下矢印をクリックして、付与したいスコープを選択します。</p><p>以下の例では、ユーザーのメタデータを更新し、好きな色をランダムに割り当てますが、必ず<code>read:users</code>と<code>update:users</code>のスコープを付与するようにします。APIエンドポイントのリストと必要なスコープについては、<a href="https://auth0.com/docs/api/management/v2" target="_blank" >Management APIのドキュメント</a>を参照してください。</p><p><pre><code class="language-php">use Auth0\Laravel\Facade\Auth0;



Route::get('/colors', function () {

  $endpoint = Auth0::management()-&gt;users();



  $colors = ['red', 'blue', 'green', 'black', 'white', 'yellow', 'purple', 'orange', 'pink', 'brown'];



  $endpoint-&gt;update(

    id: auth()-&gt;id(),

    body: [

        'user_metadata' =&gt; [

            'color' =&gt; $colors[random_int(0, count($colors) - 1)]

        ]

    ]

  );



  $metadata = $endpoint-&gt;get(auth()-&gt;id());

  $metadata = Auth0::json($metadata);



  $color = $metadata['user_metadata']['color'] ?? 'unknown';

  $name = auth()-&gt;user()-&gt;name;



  return response(&quot;Hello {$name}! Your favorite color is {$color}.&quot;);

})-&gt;middleware('auth');

</code></pre>

</p><p>SDKにあるManagement APIの全メソッドについては、<a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md" target="_blank" rel="noreferrer noopener">こちら</a>にクイックリファレンスガイドがあります。</p>

## アプリケーションを実行する


<p>Laravelアプリケーションを起動する準備が整いました。要求を受け付けることができます：</p><p><code>php artisan serve</code></p><p><div class="checkpoint">Laravel - 手順8 - アプリケーションを実行する - チェックポイント <div class="checkpoint-default"><p>ブラウザーを開いて、以下の経路にアクセスしてみてください。</p><ul><li><p><a href="http://localhost:8000/" target="_blank" rel="noreferrer noopener">http://localhost:8000</a>（パブリックルートを確認する）</p></li><li><p><a href="http://localhost:8000/private" target="_blank" rel="noreferrer noopener">http://localhost:8000/private</a>（認証を促す）</p></li><li><p><a href="http://localhost:8000/" target="_blank" rel="noreferrer noopener">http://localhost:8000</a>（パブリックルートを確認する、今回は認証済み）</p></li><li><p><a href="http://localhost:8000/scope" target="_blank" rel="noreferrer noopener">http://localhost:8000/scope</a>（<code>read:messages </code><a href="https://auth0.com/docs/manage-users/access-control/rbac" target="_blank" >permission</a>があるかを確認する）</p></li><li><p><a href="http://localhost:8000/update" target="_blank" rel="noreferrer noopener">http://localhost:8000/update</a>（ユーザープロファイルを更新する）</p></li><li><p><a href="http://localhost:8000/logout" target="_blank" rel="noreferrer noopener">http://localhost:8000/logout</a>（ログアウトする）</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p><h3>その他の情報</h3><ul><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Users.md" target="_blank" rel="noreferrer noopener">ユーザーリポジトリとモデル</a>はAuth0 Laravel SDKを拡張して、カスタムのユーザーモデルを使用し、データベースでユーザーの保管や取得を行う方法を指定することができます。</p></li><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Events.md" target="_blank" rel="noreferrer noopener">イベントフック</a>はAuth0 Laravel SDKで発生したイベントを聞く方法を処理して、統合の動作を完全にカスタマイズすることができます。</p></li><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md" target="_blank" rel="noreferrer noopener">Management API</a>対応はAuth0 Laravel SDKに組み込まれているため、LaravelアプリケーションからManagement APIと対話することができます。</p></li></ul><p></p>
