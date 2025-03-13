---
title: Next.jsアプリケーションにログインを追加する
description: このガイドは、新規または既存のNext.jsアプリケーションにAuth0 Next.js SDKを使ってAuth0を統合する方法を説明します。
interactive:  true
files:
 - files/.env
 - files/src/lib/auth0
 - files/src/middleware
 - files/src/app/page
github:
  path: https://github.com/auth0-samples/auth0-nextjs-samples/tree/main/Sample-01
locale: ja-JP
---

# Next.jsアプリケーションにログインを追加する


<p>このガイドは、新規または既存のNext.jsアプリケーションにAuth0 Next.js SDKを使ってAuth0を統合する方法を説明します。アカウント用に構成された例を参考にして、このクイックスタートに従うことをお勧めします。</p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションがある必要があります。Auth0アプリケーションは、開発中のプロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/#/">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>代わりに完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0がユーザーを認証後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはログイン後にアプリケーションに戻されません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000/auth/callback</code>に設定してください。</p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0がユーザーをログアウト後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p><p></p></div></p>

## Auth0 Next.js SDKをインストールする


<p>プロジェクトディレクトリで次のコマンドを実行して、Auth0 Next.js SDKをインストールします：</p><p><code>npm install @auth0/nextjs-auth0</code></p><p>SDKは、Auth0をNext.jsアプリケーションに統合するのに役立つメソッドと変数を公開します。この際、バックエンドでは<a href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers">ルートハンドラー</a>を、フロントエンドでは<a href="https://reactjs.org/docs/hooks-overview.html">Reactフック</a>が付いた<a href="https://reactjs.org/docs/context.html">Reactコンテキスト</a>を使用します。</p>

## SDKを構成する {{{ data-action="code" data-code=".env.local" }}}


<p>プロジェクトのルートディレクトリで、<code>.env.local</code>ファイルを追加し、以下の<a href="https://nextjs.org/docs/basic-features/environment-variables">変数環境</a>を設定します：</p><ul><li><p><code>AUTH0_SECRET</code>：セッションクッキーの暗号化に使用する長いシークレット値です。適した文字列は、コマンドラインの<code>openssl rand -hex 32</code>で生成できます。</p></li><li><p><code>AUTH0_BASE_URL</code>：アプリケーションのベースURLです。</p></li><li><p><code>AUTH0_ISSUER_BASE_URL</code>：Auth0テナントドメインのURLです。<a href="https://auth0.com/docs/custom-domains">Auth0を使用したカスタムドメイン</a>では、この値を［Settings（設定）］タブに反映された値でなく、カスタムドメインの値に設定します。</p></li><li><p><code>AUTH0_CLIENT_ID</code>：Auth0アプリケーションのクライアントIDです。</p></li><li><p><code>AUTH0_CLIENT_SECRET</code>：Auth0アプリケーションのクライアントシークレットです。</p></li></ul><p>SDKは、Node.jsプロセス環境からこれらの値を読み取り、自動構成します。</p>

## 動的ルートハンドラーを追加する {{{ data-action="code" data-code="src/lib/auth0.ts" }}}


<p><div class="alert-container" severity="default"><p>このクイックスタートは、Next.js<a href="https://nextjs.org/docs/app">アプリルーター</a>を取り扱います。<a href="https://nextjs.org/docs/pages">ページルーター</a>を使用している場合は、SDKの<a href="https://github.com/auth0/nextjs-auth0#page-router">README</a>の例を確認してください。</p></div></p><p><code>app/api/auth/[auth0]/route.js</code>でファイルを作成します。これは、<a href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-segments">動的ルートセグメント</a>を持つルートハンドラーです。</p><p>次に、SDKから<code>handleAuth</code>メソッドをインポートし、<code>GET</code>エクスポートから呼び出します。これで、以下のルートが作成されます。</p><ul><li><p><code>/api/auth/login</code>：Auth0でログインを実行するために使用されるルートです。</p></li><li><p><code>/api/auth/logout</code>：ユーザーをログアウトするために使用されるルートです。</p></li><li><p><code>/api/auth/callback</code>：ログインに成功した後、Auth0がユーザーをリダイレクトするルートです。</p></li><li><p><code>/api/auth/me</code>：ユーザープロファイルを取得するためのルートです。</p></li></ul><p></p>

## UserProviderコンポーネントを追加する {{{ data-action="code" data-code="src/middleware.ts" }}}


<p>フロントエンド側では、SDKはReact Contextを使用して、ユーザーの認証状態を管理します。その状態をすべてのページで使用できるようにするには、<a href="https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required">Root Layoutコンポーネント</a>を上書きし、<code>app/layout.jsx</code>ファイルで<code>&lt;body&gt;</code>タグを<code>UserProvider</code>でラップする必要があります。</p><p><code>UserProvider</code>によって公開された認証状態は、<code>useUser()</code>フックを使って任意のクライアントコンポーネントでアクセスすることができます。</p><p><div class="checkpoint">Next.js手順5「チェックポイント」 <div class="checkpoint-default"><p>ルートハンドラーと<code>UserProvider</code>を追加したら、アプリケーションを実行してAuth0に関連したエラーを投入していないか確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>

## アプリケーションにログインを追加する {{{ data-action="code" data-code="src/app/page.tsx" }}}


<p>ユーザーはSDKによって提供された<code>/api/auth/login</code>ルートハンドラーを訪れることで、アプリケーションにログインできるようになりました。<b>アンカータグ</b>を使ってログインルートを指すリンクをクリックします。クリックするとユーザーはAuth0ユニバーサルログインページにリダイレクトされ、そこで、Auth0はユーザーを認証することができます。認証に成功したら、Auth0はユーザーをアプリケーションにリダイレクトで戻します。</p><p><div class="alert-container" severity="default"><p>次のリンティング ルールでは、アンカータグでなく<code>Link</code>コンポーネントを使用することを提案する場合があります。<code>Link</code>コンポーネントは、<a href="https://nextjs.org/docs/api-reference/next/link">クライアント側のページ間の移行</a>を実施するためのものです。リンクはページでなくAPIルートを指すため、アンカータグとして維持する必要があります。</p></div></p><p><div class="checkpoint">Next.js手順6「チェックポイント」 <div class="checkpoint-default"><p>アプリケーションにログインリンクを追加する</p><ul><li><p>ログインリンクをクリックすると、Next.jsアプリケーションによって<a href="https://auth0.com/universal-login">Auth0ユニバーサルログイン</a>ページにリダイレクトされ、ユーザー名とパスワードまたはソーシャルプロバイダーを使ってログインまたはサインアップできるようになったことを確認します。</p></li><li><p>完了したら、Auth0がアプリケーションにリダイレクトで戻されることを確認します。</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p><img src="//images.ctfassets.net/cdy7uua7fh8z/7L6lZ6xCi1L7sJBFZUPb9g/1012d2df62dd58a943f75092452f91d2/Login_Screen_-_Japanese.png" alt="null" /><p><div class="alert-container" severity="default"><p>Auth0は、Googleソーシャルプロバイダーを新しいテナントでデフォルトで有効にし、<a href="https://auth0.com/docs/connections/identity-providers-social">ソーシャルIDプロバイダー</a>でログインテストを実施するための開発者キーを提供します。ただし、これらの開発者キーにはいくつかの制限が設けられており、これによってアプリケーションが異なる動作をする場合があります。この動作の様子と修正方法については、「<a href="https://auth0.com/docs/connections/social/devkeys#limitations-of-developer-keys">Auth0開発者キーを使ってソーシャル接続をテストする</a>」ドキュメントを参照してください。</p></div></p>

## アプリケーションにログアウトを追加する


<p>Next.jsアプリケーションにログインできるようになったら、<a href="https://auth0.com/docs/logout/log-users-out-of-auth0">ログアウトする方法</a>が必要です。<code>/api/auth/logout</code> APIルートを指すリンクを追加します。クリックするとユーザーは、<a href="https://auth0.com/docs/api/authentication?javascript#logout">Auth0ログアウトエンドポイント</a>（<code>https://YOUR_DOMAIN/v2/logout</code>）にリダイレクトされ、即座にアプリケーションにリダイレクトで戻ります。</p><p><div class="checkpoint">Next.js手順7「チェックポイント」 <div class="checkpoint-default"><p>アプリケーションにログアウトリンクを追加します。クリックすると、 Next.jsアプリケーションによって、［Settings（設定）］で［Allowed Logout URLs（許可されているログアウトURL）］の1つに指定されているアドレスへリダイレクトされます。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple of things to double check:</p><ul><li><p>are your environment variables populated correctly?</p></li><li><p>make sure that &quot;Allowed Callback URLs&quot; is configured correctly in your tenant</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
