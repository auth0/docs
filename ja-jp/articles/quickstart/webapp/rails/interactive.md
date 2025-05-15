---
title: Ruby on Railsアプリケーションにログインを追加する
description: このチュートリアルは、Ruby on Railsアプリケーションにユーザーログインを追加する方法について説明します。
interactive:  true
files:
 - files/config/auth0
 - files/auth0
 - files/auth0_controller
 - files/routes
 - files/secured
github:
  path: sample
locale: ja-JP
---

# Ruby on Railsアプリケーションにログインを追加する


<p></p><p></p>

## Auth0を構成する


<p>Auth0のサービスを利用するには、Auth0 Dashboadに設定済みのアプリケーションがある必要があります。Auth0アプリケーションは、開発中のプロジェクトに対してどのように認証が動作して欲しいかを構成する場所です。</p><h3>アプリケーションを構成する</h3><p>対話型のセレクターを使ってAuth0アプリケーションを新規作成するか、統合したいプロジェクトを表す既存のアプリケーションを選択します。Auth0のすべてのアプリケーションには英数字からなる一意のクライアントIDが割り当てられており、アプリケーションのコードがSDKを通じてAuth0 APIを呼び出す際に使用されます。</p><p>このクイックスタートを使って構成されたすべての設定は、<a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>のアプリケーションを自動更新します。今後、アプリケーションの管理もDashboardで行えます。</p><p>完了済みの構成を見てみたい場合は、サンプルアプリケーションをご覧ください。</p><h3>Callback URLを構成する</h3><p>Callback URLとは、Auth0がユーザーを認証後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはログイン後にアプリケーションに戻りません。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000/auth/auth0/callback</code>に設定してください。</p></div></p><h3>ログアウトURLを構成する</h3><p>ログアウトURLとは、Auth0がユーザーをログアウト後にリダイレクトするアプリケーション内URLです。設定されていない場合、ユーザーはアプリケーションからログアウトできず、エラーを受け取ります。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p></div></p><h3>Allowed Web Origins（許可されているWebオリジン）を構成する</h3><p>Allowed Web Origin（許可されているWebオリジン）とは、認証フローへのアクセスを許可されるURLです。これにはプロジェクトのURLが含まれている必要があります。適切に設定されていない場合、プロジェクトが認証トークンを暗黙でリフレッシュできず、ユーザーがアプリケーションを再び訪問した時、またはページを再読み込みした時にログアウトした状態になってしまいます。</p><p><div class="alert-container" severity="default"><p>サンプルプロジェクトに沿って進めている場合は、<code>http://localhost:3000</code>に設定してください。</p></div></p>

## 依存関係を追加する


<p>認証フローをハンドリングするには、カスタム<a href="https://github.com/intridea/omniauth#omniauth-standardized-multi-provider-authentication" target="_blank" rel="noreferrer noopener">OmniAuthストラテジー</a>である<code>omniauth-auth0</code>を使います。</p><p><code>Gemfile</code>に次の依存関係を追加します：</p><p><pre><code class="language-ruby">gem 'omniauth-auth0', '~&gt; 3.0'

gem 'omniauth-rails_csrf_protection', '~&gt; 1.0' # prevents forged authentication requests

</code></pre>

</p><p>gemが追加されたら、<code>bundle install</code>でインストールします。</p>

## SDKを構成する {{{ data-action="code" data-code="config/auth0.yml" }}}


<p>構成ファイル<code>./config/auth0.yml</code>を作成して、Auth0 Dashboardにあるアプリケーションの<b>［Settings（設定）］</b>で確認できるAuth0ドメイン、クライアントID、クライアントシークレットの値を指定します。</p>

## OmniAuthミドルウェアを構成する {{{ data-action="code" data-code="auth0.rb" }}}


<p><code>./config/initializers/auth0.rb</code>という以下のイニシャライザーファイルを作成し、前の手順で作成した構成ファイルで<b>OmniAuth</b>ミドルウェアを<a href="https://github.com/auth0/omniauth-auth0/blob/master/EXAMPLES.md#send-additional-authentication-parameters" target="_blank" rel="noreferrer noopener">構成</a>します。</p><p><code>callback_path</code>がAuth0アプリケーションの［Allowed Callback URLs（許可されているコールバックURL）］にある値と一致することを確認します。</p>

## Auth0コントローラーを追加する {{{ data-action="code" data-code="auth0_controller.rb" }}}


<p>ログアウトURLを構築するために、認証コールバック、<code>logout</code>アクション、メソッドをハンドリングするAuth0コントローラーを作成します。</p><p>次のコマンドを実行します：<code>rails generate controller auth0 callback failure logout --skip-assets --skip-helper --skip-routes --skip-template-engine</code>。</p><p>コールバックメソッドの内部で、（<code>request.env[&#39;omniauth.auth&#39;]</code>として返された）ユーザー情報のハッシュをアクティブセッションに割り当てます。</p><p>ログアウトを構築するため、<code>logout</code>アクションの内部で<code>reset_session</code>メソッドを呼び出し、セッション内に保存されたオブジェクトをすべて消去します。それから、Auth0ログアウトエンドポイントにリダイレクトします。<code>reset_session</code>についての詳細は、<a href="http://api.rubyonrails.org/classes/ActionController/Base.html#M000668" target="_blank" rel="noreferrer noopener">「Ruby on Rails ActionController」ドキュメント</a>をご覧ください。</p>

## ルートを構成する {{{ data-action="code" data-code="routes.rb" }}}


<p>これらのルートを<code>./config/routes.rb</code>ファイルに追加します。</p><p>ルートは所定の位置になければなりません。これにより、RailsはさまざまなAuth0 Callback URLを前の手順で作成したAuth0コントローラーにルートする方法を認識します。</p><p><div class="checkpoint">Ruby on Railsクイックスタート - 手順6「チェックポイント」 <div class="checkpoint-default"><p>アプリケーションを実行して、意図通りに動作し続け、Auth0に関連したエラーを受け取らないことを確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。エラーが起きることなく以前の手順が完了したことをもう一度確認してください。</p><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## アプリケーションにログインを追加する


<p>ユーザーが<code>/auth/auth0</code>エンドポイントを訪れると、アプリケーションにログインできるようになりました。</p><p><div class="alert-container" severity="warning"><p><a href="https://github.com/cookpad/omniauth-rails_csrf_protection" target="_blank" rel="noreferrer noopener">偽の認証要求を防ぐ</a>ためには、<code>link_to</code>または<code>button_to</code>ヘルパーメソッドを<code>:post</code>メソッドと一緒に使います。</p></div></p><p><pre><code class="language-ruby">&lt;!-- Place a login button anywhere on your application --&gt;

\${ "<\%= button_to 'Login', '/auth/auth0', method: :post %>" }

</code></pre>

</p><p><div class="checkpoint">Ruby on Railsクイックスタート - 手順7「チェックポイント」 <div class="checkpoint-default"><p>選択されるとユーザーを<code>/auth/auth0</code>エンドポイントにリダイレクトするボタンを、アプリケーションに追加します。ログインのためAuth0にリダイレクトされ、認証に成功するとアプリに戻されることを確認してください。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。いくつかの点をもう一度確認してください。</p><ul><li><p>クイックスタートの最初の手順で行ったように、Auth0アプリケーションに正しいURLが設定されていることを確認します</p></li><li><p>すべての必要なgemが正しくインストールされていることを確認します</p></li><li><p>経路がセットアップされ、アプリにAuth0の構成がセットアップされていることを確認します</p></li><li><p><a href="https://manage.auth0.com/#/logs" target="_blank" rel="noreferrer noopener">ログを確認</a>して、ログインの動作を妨げているかもしれない他のエラーやメッセージについて調べます</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## アプリケーションにログアウトを追加する


<p>Railsアプリケーションにログインできるようになったら、<a data-contentfulid="FhVnaWoVSOQXM0Uxq1nre-ja-JP">ログアウトする方法</a>が必要です。ユーザーを<code>auth/logout</code>アクションにリダイレクトしてログアウトさせると、ユーザーはAuth0ログアウトエンドポイントへリダイレクトされます。</p><p><div class="alert-container" severity="default"><p>前の手順の後にこの手順をテストするには、セッションを消去して、ユーザーをAuth0ログアウトエンドポイントへリダイレクトしなければならない可能性があります。</p></div></p><p><pre><code class="language-ruby">&lt;!-- Place a logout button anywhere on your application --&gt;

\${"<%= button_to 'Logout', 'auth/logout', method: :get %>"}

</code></pre>

</p><p><div class="checkpoint">Ruby on Railsクイックスタート - 手順8「チェックポイント」 <div class="checkpoint-default"><p>選択されるとユーザーを<code>/auth/logout</code>エンドポイントにリダイレクトするボタンを、アプリケーションに追加します。Auth0にリダイレクトされた後即座にアプリケーションに戻り、ログインした状態ではないことを確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>すみません。いくつかの点をもう一度確認してください。</p><ul><li><p>クイックスタートの最初の手順で行ったように、Auth0クライアントに正しいURLが設定されていることを確認します</p></li><li><p>経路がセットアップされ、アプリにAuth0の構成がセットアップされていることを確認します</p></li><li><p><a href="https://manage.auth0.com/#/logs" target="_blank" rel="noreferrer noopener">ログを確認</a>して、ログインの動作を妨げているかもしれない他のエラーやメッセージについて調べます</p></li></ul><p>まだお困りですか？当社提供の<a href="https://auth0.com/docs" target="_blank" >ドキュメント</a>または<a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">コミュニティページ</a>で詳しい情報を確認してください。</p></div>

  </div></p>

## ユーザープロファイル情報を表示する {{{ data-action="code" data-code="routes.rb" }}}


<p>ユーザーのプロファイルを表示するには、アプリケーションに保護されたルートがなければなりません。ルートへのアクセスは<a href="https://guides.rubyonrails.org/getting_started.html#using-concerns" target="_blank" rel="noreferrer noopener">Concern</a>で管理でき、複数のコントローラーで共有できます。Concernはユーザーが認証されていない場合、自動的にAuth0にリダイレクトしなければなりません。そうでない場合は、Concernは現在のユーザープロファイルを返します。</p><p>Concernができたら、ログインユーザーを必要とするすべてのコントローラーに含めます。その後、次の例のように、<code>session[:userinfo]</code>セッションからユーザーにアクセスできます：</p><p><pre><code class="language-ruby">class DashboardController &lt; ApplicationController

  include Secured



  def show

    @user = session[:userinfo]

  end

end

</code></pre>

</p><p>ユーザーがセッションから読み込まれたら、フロントエンドで情報を表示するために使います：</p><p><pre><code class="language-xml">&lt;div&gt;

  &lt;p&gt;Normalized User Profile:\${"<%= JSON.pretty_generate(@user[:info])%>"}&lt;/p&gt;

  &lt;p&gt;Full User Profile:\${"<%= JSON.pretty_generate(@user[:extra][:raw_info])%>"}&lt;/p&gt;

&lt;/div&gt;

</code></pre>

</p><p><div class="checkpoint">Ruby on Railsクイックスタート - 手順9「チェックポイント」 <div class="checkpoint-default"><p><code>Secured</code> concernをアプリに追加してから、認証されたユーザーがアクセスするために必要なコントローラーに含めます。 認証されたユーザーがこのコントローラー内でアクションにアクセスでき、認証されていないユーザーは認証のためにAuth0にリダイレクトされることを確認します。</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>
