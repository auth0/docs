---
title: Goアプリケーションにログインを追加する
description: このガイドは、新規または既存のGo WebアプリケーションにAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/auth
 - files/callback
 - files/env
 - files/go
 - files/isAuthenticated
 - files/login
 - files/logout
 - files/main
 - files/router
 - files/user
github:
  path: 01-Login
locale: ja-JP
---

# Goアプリケーションにログインを追加する


<p>Auth0を使用すると、アプリケーションに手軽に認証を追加して、ユーザープロファイル情報にアクセスすることができますこのガイドは、新規または既存のGo WebアプリケーションにAuth0を統合する方法を説明します。</p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションがある必要があります。Auth0アプリケーションは、開発中のプロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/dashboard/us/auth0-dsepaid/" target="_blank" rel="noreferrer noopener">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0がユーザーを認証後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはログイン後にアプリケーションに戻りません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code><code>/callback</code>に設定してください。</p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0がユーザーをログアウト後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p></div></p>

## 依存関係をインストールする {{{ data-action="code" data-code="go.mod" }}}


<p><code>go.mod</code>ファイルを作成して、アプリケーションの依存関係をすべてリストします。</p><p>GoアプリケーションでAuth0を統合するには、<code>coreos/go-oidc/v3</code>パッケージと<code>x/oauth2</code>パッケージを追加します。</p><p>OIDCパッケージとOAuth2パッケージに加え、<code>joho/godotenv</code>、<code>gin-gonic/gin</code>、<code>gin-contrib/sessions</code>を追加します。</p><p><div class="alert-container" severity="default"><p>この例ではルーティングに<code>gin</code>を使用しますが、お好きなルーターを使用できます。</p></div></p><p><code>go.mod</code>ファイルを必要な依存関係で保存し、ターミナルで次のコマンドを使ってインストールします：</p><p><code>go mod download</code></p>

## 環境変数を構成する {{{ data-action="code" data-code=".env" }}}


<p>プロジェクトディレクトリのルート内の<code>.env</code>で以下の環境変数を設定してください：</p><ul><li><p><b>AUTH0_DOMAIN</b>：Auth0テナントのドメインです。Auth0 Dashboardにあるアプリケーションの［Settings（設定）］の［Domain（ドメイン）］フィールドで確認してください。<a data-contentfulid="UYjAbgxX33g81azZ6VHWc-ja-JP">カスタムドメイン</a>を使用する場合は、この値をカスタムドメインの値に設定してください。</p></li><li><p><b>AUTH0_CLIENT_ID</b>：このクイックスタートで前にセットアップしたAuth0アプリケーションのIDです。Auth0 Dashboardにあるアプリケーションの［Settings（設定）］の［Client ID（クライアントID）］フィールドで確認してください。</p></li><li><p><b>AUTH0_CLIENT_SECRET</b>：このクイックスタートで前にセットアップしたAuth0アプリケーションのシークレットです。Auth0 Dashboardにあるアプリケーションの［Settings（設定）］の［Client Secret（クライアントシークレット）］フィールドで確認してください。</p></li><li><p><b>AUTH0_CALLBACK_URL</b>：認証成功後にユーザーをリダイレクトするためにAuth0が使用するURLです。</p></li></ul><p></p>

## OAuth2パッケージとOpenID Connectパッケージを構成する {{{ data-action="code" data-code="auth.go" }}}


<p>次にOAuth2パッケージとOpenID Connectパッケージを構成します。</p><p><code>platform/authenticator</code>フォルダーに<code>auth.go</code>という名前のファイルを作成します。このパッケージ内で、<a href="https://godoc.org/golang.org/x/oauth2" target="_blank" rel="noreferrer noopener">OAuth2</a>クライアントと<a href="https://godoc.org/github.com/coreos/go-oidc" target="_blank" rel="noreferrer noopener">OIDC</a>クライアントを構成してリターンするメソッドを作成し、IDトークンを検証するもう1つのメソッドを作成します。</p>

## アプリケーションルートをセットアップする {{{ data-action="code" data-code="router.go" }}}


<p><code>platform/router</code>フォルダーに<code>router.go</code>という名前のファイルを作成します。このパッケージで、<a href="https://github.com/gin-gonic/gin" target="_blank" rel="noreferrer noopener">github.com/gin-gonic/gin</a>を使ってルートを構成、リターンするメソッドを作成します。<code>login</code>ハンドラーと<code>callback</code>ハンドラーで使用するために、<code>Authenticator</code>のインスタンスをメソッドに渡すことになります。</p><p></p>

## アプリケーションにログインを追加する {{{ data-action="code" data-code="login.go" }}}


<p>ユーザーが自分で認証するには、<code>/login</code>ルートを処理するハンドラー関数を作成する必要があります。</p><p><code>web/app/login</code>フォルダーに<code>login.go</code>という名前のファイルを作成し、<code>Handler</code>関数を追加します。ハンドラーの実行時にユーザーはAuth0へリダイレクトされ、資格情報を入力できるようになります。</p><p><code>/login</code>ルートを呼び出すには、<code>web/template</code>ディレクトリにある<code>home.html</code>テンプレートに<code>/login</code>へのリンクを追加します。</p><p></p>

## 認証コールバックを処理する {{{ data-action="code" data-code="callback.go" }}}


<p>ユーザーはAuth0ユニバーサルログインページを使って認証すると、 <code>/callback</code>ルートでアプリに戻ります。</p><p><code>web/app/callback</code>フォルダーに<code>callback.go</code>という名前のファイルを作成し、<code>Handler</code>関数を追加します。</p><p>このハンドラーはAuth0によって提供された<code>code</code>クエリ文字列を受け取り、IDトークンおよびアクセストークンと交換します。</p><p>IDトークンが有効である場合、セッションにプロファイル情報とアクセストークンが保存されます。プロファイル情報はIDトークンに含まれるクレームに基づいています。セッションストレージは、必要に応じてアプリケーションがこの情報にアクセスすることを許可します。</p>

## ユーザープロファイル情報を表示する {{{ data-action="code" data-code="user.go" }}}


<p>ユーザーがログインできるようになったら、認証済みのユーザーに関連付けられた<a data-contentfulid="2ClGWANGeRoTkg5Ax2gOVK-ja-JP">プロファイル情報</a>を取得し、使用できるようにしたいと考えるはずです。</p><p>ニックネームやプロフィール写真といったプロファイル情報は、前のセッションで保存された<code>profile</code>からアクセスできます。</p><p><code>web/app/user/user.go</code>で<code>/user</code>エンドポイント用のハンドラーを作成し、対応するHTMLファイルを返します。<code>profile</code>が<code>ctx.HTML()</code>に渡されているため、同じHTMLファイル内の<code>picture</code>や<code>nickname</code>といったプロファイル情報にアクセスできます。</p><p>このようなHTMLファイルは以下の例のように見えることがありますが、カスタムクレームを含め、いかなるプロファイル情報も取得できます。</p><p></p>

## アプリケーションにログアウトを追加する {{{ data-action="code" data-code="logout.go" }}}


<p>ユーザーをログアウトさせるには、セッションのデータを消去し、ユーザーをAuth0ログアウトエンドポイントにリダイレクトします。詳細は<a href="https://auth0.com/docs/logout" target="_blank" >ログアウトドキュメント</a>をご覧ください。</p><p><code>web/app/logout</code>フォルダーに<code>logout.go</code>という名前のファイルを作成し、ユーザーをAuth0ログアウトエンドポイントにリダイレクトするために<code>Handler</code>関数を追加します。</p><p><code>returnTo</code> URLは、アプリケーションの設定セクションで［Allowed Logout URLs（許可されているログアウトURL）］のリストに載っていなければなりません。詳細は「<a href="https://auth0.com/docs/logout/guides/redirect-users-after-logout" target="_blank" >ログアウト後にユーザーをリダイレクトする</a>」をご覧ください。</p><p><code>web/static/js</code>フォルダーに<code>user.js</code>という名前のファイルを作成し、ログインしたユーザーからクッキーを削除するためのコードを追加します。</p><p></p><p></p>

## ルートを保護する {{{ data-action="code" data-code="isAuthenticated.go" }}}


<p>推奨プラクティスでは、認証されたユーザーだけが特定のルートにアクセスできるようにするべきです。認証されていないユーザーが保護されたルートにアクセスしようとした場合、アプリケーションによってリダイレクトされる必要があります。</p><p>この場合、HTTPの要求に接続するミドルウェアを実装します。ミドルウェアの関数は、要求がエンドポイントハンドラーにルートされるべきか、ブロックされるべきかを決定します。</p><p><code>platform/middleware</code>に<code>isAuthenticated.go</code>という名前のファイルを作成し、<code>profile</code>セッションキーに基づいてユーザーが認証されているかいないかをチェックする関数を追加します。認証されていないユーザーは、ミドルウェアがアプリケーションのルートへリダイレクトします。</p><p>ミドルウェアを作成すると、ルーターに追加することで、認証を必要とするすべてのルートにセットアップできます。</p><p></p>

## アプリケーションを仕上げる {{{ data-action="code" data-code="main.go" }}}


<p>鑑別工具とルーターの構成が完了したら、アプリケーションのエントリーポイントを使って全体を結び付けます。<code>main.go</code>内で、鑑別工具とルーターのインスタンスを作成すると鑑別工具インスタンスが渡されます。</p><p><code>.env</code>ファイルを使用している場合は、<code>main()</code>関数の冒頭で<code>godotenv.Load()</code>を呼び出さなくてはなりません。</p><p>ターミナルで次のコマンドを使いアプリケーションを仕上げます：</p><p><code>go run main.go</code></p>
