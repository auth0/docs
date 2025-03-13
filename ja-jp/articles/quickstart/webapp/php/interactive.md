---
title: PHPアプリケーションにログインを追加する
description: このガイドは、PHPアプリケーションにAuth0 PHP SDKを使ってAuth0を統合し、認証の追加とユーザープロファイル情報の表示を行う方法について説明します。
interactive:  true
files:
 - files/index
 - files/login
 - files/logout
 - files/profile
 - files/router
 - files/callback
github:
  path: https://github.com/auth0-samples/auth0-php-web-app/tree/main/app
locale: ja-JP
---

# PHPアプリケーションにログインを追加する


<p>Auth0を使用すると、アプリケーションに手軽に認証を追加することができます。このガイドは、PHPアプリケーションにAuth0 PHP SDKを使ってAuth0を統合し、認証の追加とユーザープロファイル情報の表示を行う方法について説明します。</p><p>このクイックスタートを使用するには、以下の手順に従います：</p><ul><li><p>Auth0の無料アカウントにサインアップするか、Auth0にログインします。</p></li><li><p>統合したいPHPプロジェクトを用意します。または、ログインした後に、サンプルアプリケーションを表示してダウンロードすることもできます。</p></li></ul><p></p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadでセットアップしたアプリケーションが必要です。Auth0アプリケーションは、開発中のプロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>アプリケーションを構成する</h3><p>インタラクティブセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0の全てのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/#/">Dashboard</a>のアプリケーションに自動更新を行います。今後、アプリケーションの管理はDashboardで行えます。</p><p>代わりに完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0がユーザーを認証後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはログイン後にアプリケーションに戻りません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000/callback</code>に設定してください。</p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0がユーザーをログアウト後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p><p></p></div></p><h3>Allowed Web Origins（許可されているWebオリジン）を構成する</h3><p>［Allowed Web Origin（許可されているWebオリジン）］とは、認証フローにアクセスすることを許可して欲しいURLです。これにはプロジェクトのURLが含まれている必要があります。適切に設定されていない場合、プロジェクトが認証トークンを暗黙でリフレッシュできず、ユーザーがアプリケーションを再び訪問した時、またはページを再読み込みした時にログアウトした状態になってしまいます。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p><p></p></div></p>

## Auth0 PHP SDKをインストールする {{{ data-action="code" data-code="index.php" }}}


<p>PHPアプリで、Auth0の認証・認可を手軽に実装できるように、Auth0は<a href="https://github.com/auth0/auth0-PHP">PHP SDK</a>（Auth0-PHP）を提供しています。</p><p>Auth0 PHP SDKでは、ネットワーク要求を管理するために、<a href="https://www.php-fig.org/psr/psr-17/">PSR-17</a>と<a href="https://www.php-fig.org/psr/psr-18/">PSR-18</a>対応HTTPライブラリーをインストールする必要があります。ライブラリーがない場合は、ターミナルで以下のコマンドを実行して、信頼できる選択肢をインストールすることができます：</p><p><pre><code class="language-powershell">cd &lt;your-project-directory&gt;

composer require symfony/http-client nyholm/psr7

</code></pre>

</p><p>ターミナルで以下のコマンドを実行してAuth0 PHP SDKをインストールします：</p><p><pre><code class="language-powershell">composer require auth0/auth0-php

</code></pre>

</p><h3>Auth0 SDKを構成する</h3><p>アプリケーションで<code>index.php</code>と呼ばれる新しいファイルを作成し、<b>index.php</b>タブにある、右のインタラクティブパネルからコードをコピーします。</p><p>SDKが正しく機能するためには、次のプロパティを初期化中にAuth0 SDKで設定しなければなりません：</p><ul><li><p><code>domain</code>：Auth0テナントのドメインです。通常、Auth0 Dashboardにあるアプリケーションの設定の［Domain（ドメイン）］フィールドで確認できます。<a href="https://auth0.com/docs/custom-domains">カスタムドメイン</a>を使用している場合は、その値を代わりに設定してください。</p></li><li><p><code>clientId</code>：このクイックスタートで前にセットアップした、Auth0アプリケーションのIDです。Auth0 Dashboardにあるアプリケーションの［Settings（設定）］の［Client ID（クライアントID）］フィールドで確認できます。</p></li><li><p><code>clientSecret</code>：このクイックスタートで前にセットアップしたAuth0アプリケーションのシークレットです。Auth0 Dashboardにあるアプリケーションの［Settings（設定）］の［Client Secret（クライアントシークレット）］フィールドで確認できます。</p></li><li><p><code>redirectUri</code>：ユーザー認証の後、Auth0にユーザーをリダイレクトするアプリケーション内URLです。このクイックスタートで前にセットアップしたCallback URLと呼応します。Auth0 Dashboardにあるアプリケーションの設定の［Callback URLs（コールバックURL）］フィールドでもこの値を確認できます。コードに入力した値と前にセットアップした値は必ず一致させてください。異なった場合はユーザーにエラーが表示されます。</p></li><li><p><code>cookieSecret</code>：セッションクッキーの暗号化に使用する長いシークレット値です。ターミナルで<code>openssl rand -hex 32</code>を実行すると、適切な文字列を生成することができます。</p></li></ul><p><div class="checkpoint">PHP手順2「チェックポイント」 <div class="checkpoint-default"><p>Auth0 SDKが正しく構成されました。アプリケーションを実行して次の点を確認します：</p><ul><li><p>SDKが正しく初期化している。</p></li><li><p>アプリケーションがAuth0に関連したエラーを投入していない。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>

## ルートを作成する {{{ data-action="code" data-code="router.php" }}}


<p>次に、受信リクエストをアプリケーションにダイレクトするために、ルーティングライブラリーをインストールします。これは必須手順ではありませんが、本クイックスタートの目的上、アプリケーション構造が簡略化されます。</p><p><pre><code class="language-powershell">composer require steampixel/simple-php-router

</code></pre>

</p><p>アプリケーションで<code>router.php</code>と呼ばれる新しいファイルを作成してルートを定義し、右のインタラクティブパネルからコードをコピーします。</p>

## アプリケーションにログインを追加する {{{ data-action="code" data-code="login.php" }}}


<p>Auth0アプリケーションとAuth0 PHP SDKの構成が完了したら、プロジェクトのためにログインをセットアップする必要があります。これを実現するには、SDKの<code>login()</code>メソッドを使用して、ユーザーをAuth0のユニバーサルログインページにリダイレクトするログインボタンを作成します。ユーザーが認証に成功すると、このクイックスタートで前にセットアップしたCallback URLへリダイレクトされます。</p><p>アプリケーションで<code>login.php</code>という名前の新規ファイルを作成し、右のインタラクティブパネルからコードをコピーします。これにはログインに必要なロジックが含まれています。</p><p><div class="checkpoint">Php手順4「チェックポイント」 <div class="checkpoint-default"><p>ユーザー名とパスワードを使ってログインやサインアップができるようになりました。</p><p>ログインリンクをクリックして次の点を確認します：</p><ul><li><p>アプリケーションによってAuth0ユニバーサルログインページにリダイレクトされる。</p></li><li><p>ログインまたはサインアップできる。</p></li><li><p>Auth0が、SDKを構成するために使った<code>redirectUri</code>の値を使用し、アプリケーションへリダイレクトする。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>You configured the correct <code>redirectUri</code>.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## アプリケーションにログアウトを追加する {{{ data-action="code" data-code="logout.php" }}}


<p>プロジェクトにログインしたユーザーには、ログアウトする方法も必要です。SDKの<code>logout()</code>メソッドを使用してログアウトボタンを処理します。ユーザーはログアウトすると、<a href="https://auth0.com/docs/api/authentication?http#logout">Auth0ログアウト</a>エンドポイントにリダイレクトされてから、即座に、このクイックスタートで先ほどセットアップしたログアウトURLへとリダイレクトで戻されます。</p><p>アプリケーションで<code>logout.php</code>という名前の新規ファイルを作成し、インタラクティブパネルからコードをコピーします。これにはログアウトに必要なロジックが含まれています。それから<code>index.php</code>ファイルを更新して新しいログアウトボタンを含めます。</p><p><div class="checkpoint">PHPセクション5「チェックポイント」 <div class="checkpoint-default"><p>アプリケーションを実行してログアウトボタンをクリックし、次の点を確認します：</p><ul><li><p>アプリケーションによって、アプリケーションの設定で［Allowed Logout URLs（許可されているログアウトURL）］の1つに指定されているアドレスへリダイレクトされる。</p></li><li><p>アプリケーションにもうログインしていない。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>You configured the correct Logout URL.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## ユーザープロファイル情報を表示する {{{ data-action="code" data-code="profile.php" }}}


<p>ユーザーがログインやログアウトできるようになったら、認証済のユーザーに関連付けられた<a href="https://auth0.com/docs/users/concepts/overview-user-profile">プロファイル情報</a>を取得できるようにしたいと考えるはずです。たとえば、ログインしたユーザーの名前やプロフィール写真をプロジェクトに表示したいかもしれません。</p><p>Auth0 PHP SDKでは<code>getCredentials()</code>メソッドからユーザー情報が提供されます。インタラクティブパネルで<code>profile.php</code>コードを確認し、使用方法の例をチェックします。</p><p>このメソッドにはユーザーのアイデンティティに関する機密情報が含まれるため、この方法が使用できるかはユーザーの認証ステータスによります。エラーを防ぐため、<code>getCredentials()</code>メソッドが<code>object</code>または<code>null</code>を返すかを必ず確認し、アプリケーションが結果を使用する前に、Auth0がユーザーを認証したかどうか判定します。</p><p><div class="checkpoint">Phpセクション6「チェックポイント」 <div class="checkpoint-default"><p>以下の点を確認します：</p><ul><li><p>ログイン後、<code>nickname</code>やその他のユーザープロパティをすべて正しく表示できる。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>You created the <code>profile.php</code> file and are logged in.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
