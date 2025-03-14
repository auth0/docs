---
title: Djangoアプリケーションにログインを追加する
description: このガイドでは、Python DjangoアプリケーションにAuthlib SDKを使ってAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/webappexample/templates/index
 - files/webappexample/settings
 - files/webappexample/urls
 - files/webappexample/views
github:
  path: https://github.com/auth0-samples/auth0-django-web-app/tree/master/01-Login
locale: ja-JP
---

# Djangoアプリケーションにログインを追加する


<p>Auth0を使用すると、アプリケーションに手軽に認証を追加して、ユーザープロファイル情報にアクセスすることができます。このガイドでは、Python <a href="https://www.djangoproject.com/">Django</a>アプリケーションに<a href="https://authlib.org/">Authlib</a> SDKを使ってAuth0を統合する方法を説明します。</p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションがある必要があります。Auth0アプリケーションは、開発中のプロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/dashboard/us/auth0-dsepaid/">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0がユーザーを認証後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはログイン後にアプリケーションに戻りません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code><code>/callback</code>に設定してください。</p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0がユーザーをログアウト後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p></div></p>

## 依存関係をインストールする


<p>この統合では、さまざまなライブラリー依存関係（Authlibなど）を追加します。プロジェクトディレクトリに<code>requirements.txt</code>ファイルを作成し、以下を含めます：</p><p><pre><code>authlib ~= 1.0

django ~= 4.0

python-dotenv ~= 0.19

requests ~= 2.27

</code></pre>

</p><p>シェルから以下のコマンドを実行し、依存関係が利用できるようにします：</p><p><code>pip install -r requirements.txt</code></p>

## .envファイルを構成する


<p>次に、プロジェクトのディレクトリに<code>.env</code>ファイルを作成します。このファイルにはクライアントキーやその他の構成情報が含まれます。</p><p><pre><code>AUTH0_CLIENT_ID=${account.clientId}

AUTH0_CLIENT_SECRET=${account.clientSecret}

AUTH0_DOMAIN=${account.namespace}

</code></pre>

</p>

## アプリケーションを作成する


<p>セットアップ済みのDjangoアプリケーションがある場合は、次の手順へスキップしてください。新しいアプリケーションプロジェクトには、次のコマンドを実行します：</p><p><code>django-admin startproject webappexample</code></p><p>新しいプロジェクトフォルダに変更します：</p><p><code>cd webappexample</code></p>

## settings.pyを更新する {{{ data-action="code" data-code="webappexample/settings.py" }}}


<p><code>webappexample/settings.py</code>ファイルを開いて<code>.env</code>値を確認します。</p><p>ファイルの上部に<code>os</code>インポートと<code>dotenv</code>インポートを追加します。</p><p>次に、<code>BASE_DIR</code>定義の下に<code>TEMPLATE_DIR</code>変数を追加します。</p><p>次に<code>TEMPLATES</code>変数を見付けて<code>DIRS</code>値を更新し、当社の<code>TEMPLATE_DIR</code>ストリングを追加します。これにより、後の手順で作成するテンプレートファイルのパスが定義されます。この配列のすべてのコンテンツは同じにしておいてください。</p><p>ファイルの最後にAuth0の構成を読み込むコードを追加します。</p>

## アプリケーションをセットアップする {{{ data-action="code" data-code="webappexample/views.py#1:18" }}}


<p>アプリケーションの作成を始めるには、IDEで<code>webappexample/views.py</code>ファイルを開きます。</p><p>アプリケーションに必要なすべてのライブラリーをインポートします。</p><p>Auth0でアプリケーションの認証を処理するために、Authlibを構成できるようになりました。</p><p>AuthlibのOAuth<code>register()</code>メソッドで使用できる構成オプションの詳細については、<a href="https://docs.authlib.org/en/latest/client/frameworks.html#using-oauth-2-0-to-log-in">Authlibのドキュメント</a></p>

## ルートハンドラーをセットアップする {{{ data-action="code" data-code="webappexample/views.py#20:52" }}}


<p>この例では、アプリケーションにlogin、callback、logout、indexの4つのルートを追加します。</p><ul><li><p><code>login</code> - アプリへの訪問者は<code>/login</code>ルートを訪ねる時、Auth0に到達して認証フローを開始します。</p></li><li><p><code>callback</code> - ユーザーはAuth0でログインを完了した後、<code>/callback</code>ルートでアプリケーションに戻ります。このルートはユーザーのためにセッションを保存し、戻ってきた時に再度ログインする必要性を回避します。</p></li><li><p><code>logout</code> - <code>/logout</code>ルートは、ユーザーをアプリケーションからサインアウトさせます。アプリのユーザーセッションを消去し、Auth0ログアウトエンドポイントにリダイレクトして、セッションがもう保存されていないことを保証します。その後、アプリケーションは、ユーザーをホームルートにリダイレクトします。</p></li><li><p><code>index</code> - ホームルートは認証されたユーザーの詳細を表示したり、訪問者のサインインを許可したりします。</p></li></ul><p></p>

## ルートを登録する {{{ data-action="code" data-code="webappexample/urls.py" }}}


<p><code>webappexample/urls.py</code>ファイルのコンテンツを右のコードに置き換えて、新規ルートに接続します。</p><p>これにより<code>/login</code>、<code>/callback</code>、<code>/logout</code>、<code>/</code>のルートが正しいハンドラーへルートされます。</p>

## テンプレートを追加する {{{ data-action="code" data-code="webappexample/templates/index.html" }}}


<p>次に、ホームページルートで使用するテンプレートファイルを作成します。</p><p><code>templates</code>と名付けた<code>webappexample</code>フォルダー内に新しいサブディレクトリを作成し、<code>index.html</code>ファイルを作成します。</p><p><code>index.html</code>ファイルにはテンプレートコードが含まれており、ログインした際にユーザー情報を表示したり、ログアウトした際にログインボタンを表示したりします。</p>

## アプリケーションを実行する


<p>アプリケーションを実行する準備ができました。プロジェクトディレクトリからシェルを開き、以下を使用します：</p><p><pre><code>python3 manage.py migrate

python3 manage.py runserver 3000

</code></pre>

</p><p>アプリケーションは、<a href="http://localhost:3000">http://localhost:3000</a>でブラウザーから開けるようになっています。</p><p><div class="checkpoint">Django - 手順10 - アプリケーションを実行する - チェックポイント <div class="checkpoint-default"><p><a href="http://localhost:3000/">http://localhost:3000</a>を訪問して、確認します。ログインのためにAuth0へルートするログインボタンがあり、ログイン後アプリケーションに戻るとプロファイル情報を確認できます。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not start successfully:</p><ul><li><p>Verify any errors in the console.</p></li><li><p>Verify the domain and Client ID imported correctly.</p></li><li><p>Verify your tenant configuration.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
