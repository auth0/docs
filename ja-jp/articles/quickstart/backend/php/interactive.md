---
title: PHPアプリケーションに認可を追加する
description: このガイドは、Auth0 PHP SDKを使ってAuth0を統合し、トークンベースの認可の追加とアプリケーションルートの保護を行う方法について説明します。
interactive:  true
files:
 - files/index
 - files/router
github:
  path: https://github.com/auth0-samples/auth0-php-api-samples/tree/main/app
locale: ja-JP
---

# PHPアプリケーションに認可を追加する


<p>Auth0を使用すると、アプリケーションに手軽にトークンベースのエンドポイント認可を追加することができます。このガイドは、Auth0 PHP SDKを使ってAuth0を統合し、トークンベースの認可の追加とアプリケーションルートの保護を行う方法について説明します。</p><p>このクイックスタートを使用するには、以下の手順に従います：</p><ul><li><p>Auth0の無料アカウントにサインアップするか、Auth0にログインします。</p></li><li><p>Auth0に統合したいPHPプロジェクトを用意します。または、ログインした後に、サンプルアプリケーションを表示してダウンロードすることもできます。</p></li></ul><p></p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに登録済みのアプリケーションがある必要があります。Auth0アプリケーションは、プロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/#/">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>代わりに完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>APIを構成する</h3><p>同様に、Auth0 APIを新規作成するか、<a href="https://manage.auth0.com/#/">Dashboard</a>から統合するプロジェクトを表す既存のAPIを使用する必要があります。APIに一意の識別子を選択して記録します。以下のアプリケーションを構成するには、その識別子が必要です。</p>

## Auth0 PHP SDKをインストールする {{{ data-action="code" data-code="index.php" }}}


<p>PHPアプリで、Auth0の認証・認可を手軽に実装できるように、Auth0は<a href="https://github.com/auth0/auth0-PHP">PHP SDK</a>（Auth0-PHP）を提供しています。</p><p>Auth0 PHP SDKでは、ネットワーク要求を管理するために、<a href="https://www.php-fig.org/psr/psr-17/">PSR-17</a>と<a href="https://www.php-fig.org/psr/psr-18/">PSR-18</a>対応HTTPライブラリーをインストールする必要があります。ライブラリーがない場合は、ターミナルで以下のコマンドを実行して、信頼できる選択肢をインストールすることができます：</p><p><pre><code class="language-powershell">cd &lt;your-project-directory&gt;

    composer require symfony/http-client nyholm/psr7

</code></pre>

</p><p>ターミナルで以下のコマンドを実行してAuth0 PHP SDKをインストールします：</p><p><pre><code class="language-powershell">composer require auth0/auth0-php

</code></pre>

</p><h3>Auth0 SDKを構成する</h3><p>SDKが正しく機能するためには、次のプロパティを初期化中にAuth0 SDKで設定しなければなりません：</p><ul><li><p><code>strategy</code>：アプリのユースケースでSDKの動作を導くのに役立ちます。この場合は、以下の定数に設定します。</p><p><code>Auth0\SDK\Configuration\SdkConfiguration::STRATEGY_API</code></p></li><li><p>domain：Auth0テナントのドメインです。通常、Auth0 Dashboardにあるアプリケーションの［Settings（設定）］の［Domain（ドメイン）］フィールドで確認できます。カスタムドメインを使用している場合は、この値をカスタムドメインの値に設定してください。</p></li><li><p>clientId：このクイックスタートで前にセットアップした、Auth0アプリケーションのIDです。Auth0 Dashboardにあるアプリケーションの［Settings（設定）］の［Client ID（クライアントID）］フィールドで確認できます。</p></li><li><p>clientSecret：このクイックスタートで前にセットアップしたAuth0アプリケーションのシークレットです。Auth0 Dashboardにあるアプリケーションの［Settings（設定）］の［Client Secret（クライアントシークレット）］フィールドにあります。</p></li><li><p>audience：上で登録したAuth0 APIの識別子です。配列として指定されている必要があります。</p></li></ul><p><div class="checkpoint">PHP API手順2「チェックポイント」 <div class="checkpoint-default"><p>Auth0 SDKが正しく構成されました。アプリケーションを実行して次の点を確認します：</p><ul><li><p>SDKが正しく初期化している。</p></li><li><p>アプリケーションがAuth0に関連したエラーを投入していない。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>Make sure the correct application is selected.</p></li><li><p>Did you save after entering your URLs?</p></li><li><p>Make sure the domain and client ID imported correctly.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## ベアラートークンをリッスンする {{{ data-action="code" data-code="index.php#20:23" }}}


<p>次に、ベアラートークンを取得し処理するためにアプリケーションを拡張します。ベアラートークンはAPIに提供されるアクセストークンで、ユーザーに代わってクライアントからリクエストされます。アクセストークンは、アプリケーションでルートへのアクセスを承認または拒否します。これは、エンドポイント認可と呼ばれます。</p><p>リクエストからアクセストークンを取得する最も簡単な方法は、PHP SDKの<code>getBearerToken()</code>メソッドを使用するものです。このメソッドは、GETパラメーター、POST本文、リクエストヘッダー、および他のソースからトークンを取得します。この場合、PHP SDKは<code>token</code>パラメーターのGETリクエスト、またはHTTP <code>Authorization</code>ヘッダーから渡されたトークンを処理します。</p>

## ルートを作成・構成する {{{ data-action="code" data-code="router.php" }}}


<p>次に、受信リクエストをアプリケーションにダイレクトするために、ルーティングライブラリーをインストールします。これは必須手順ではありませんが、本クイックスタートの目的上、アプリケーション構造が簡略化されます。</p><p><pre><code class="language-powershell">composer require steampixel/simple-php-router

</code></pre>

</p><p>アプリケーションで<code>router.php</code>と呼ばれる新規ファイルを作成し、ルートを定義します。<b>router.php</b>タブにある、右のインタラクティブパネルからコードをコピーします。</p>

## エンドポイント認可を構成する {{{ data-action="code" data-code="router.php#21:31" }}}


<p>Auth0アプリケーションとAuth0 PHP SDKを構成し、アプリケーションでリクエストからベアラートークンを取得したら、次の手順はプロジェクトにエンドポイント認可をセットアップすることです。上で実装した<code>getBearerToken()</code>メソッドは、リクエストのアクセスに関する詳細を含む<code>Token</code>クラスを返します。</p><p><code>getBearerToken()</code>メソッドは受信リクエストを自動的に検証・確認するため、アプリケーションはメソッドの応答を評価することで、アクセストークンの詳細を判定します。応答がnullの場合、提供される有効なトークンはありません。そうでない場合は、応答の内容を検査し、リクエストの詳細を確認してください。</p><p>右のインタラクティブパネルで、応答がnullであるかどうかをチェックし、<code>/api/private</code>ルートへのアクセスをフィルターすることができます。</p>

## スコープで認可する {{{ data-action="code" data-code="router.php#33:48" }}}


<p>アクセストークンで要求されたスコープに基づいて、特定のルートへのアクセスをフィルターしたい場合もあるでしょう。右のインタラクティブパネルに示すように、<code>getBearerToken()</code>メソッドの応答から&#39;scope&#39;プロパティのコンテンツを評価し、アクセストークンで付与されたスコープをチェックします。</p>
