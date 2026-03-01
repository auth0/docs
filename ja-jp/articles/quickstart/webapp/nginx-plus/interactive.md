---
title: NGINX Plus
description: このチュートリアルでは、nginx-openid-connectモジュールを使用して、NGINXサーバーに認証と認可を追加する方法について説明します。
interactive:  true
files:
 - files/nginx
 - files/openid_connection_configuration
 - files/openid_connect
 - files/frontend
locale: ja-JP
---

# NGINX Plus


<p>このチュートリアルでは、nginx-openid-connectモジュールを使用して、NGINXサーバーに認証と認可を追加する方法について説明します。 ログインして、アカウント用に構成された例を参考にこのクイックタートに従うことをお勧めします。</p><h2>システム要件</h2><p>このチュートリアルとシードプロジェクトは次を使用してテストが完了しています：</p><ul><li><p>NGINX Plus R24</p></li></ul><p></p><p></p>

## nginx-plus-module-njsモジュールをインストールして有効にする {{{ data-action="code" data-code="nginx.conf" }}}


<p>まず、NGINX Plusに<code>nginx-plus-module-njs</code>モジュールをインストールする必要があります。</p><p>動的モジュールのインストールガイドに従って、ホストOSにパッケージをインストールします。</p><p><code>yum</code>パッケージ管理ツールを使用しているLinuxディストリビューションでは、soのようなモジュールをインストールすることができます：</p><p><code>sudo yum install nginx-plus-module-njs jq</code></p><p>インストールしたら、それをNGINXに有効化する必要があります。次の行を<code>/etc/nginx/nginx.conf</code>ファイルの最上部近くに追加してください：</p><p><code>load_module modules/ngx_http_js_module.so;</code></p>

## nginx-openid-connectテンプレートリポジトリを確認する


<p><code>nginx-openid-connect</code>リポジトリをクローンします。このリポジトリにはテンプレート構成があります。</p><p><code>git clone https://github.com/nginxinc/nginx-openid-connect</code></p>

## Auth0アプリケーションの詳細でNGINXを構成する {{{ data-action="code" data-code="openid_connection_configuration.conf" }}}


<p>nginx-openid-connectフォルダーにあるconfigure.shスクリプトを実行して、テンプレートの構成にAuth0アプリケーションの詳細を入力します。</p><p><pre><code>./configure.sh --auth_jwt_key request \

  --client_id ${account.clientId} \

  --pkce_enable \

  https://${account.namespace}/.well-known/openid-configuration

</code></pre>

</p><p>次に、<a href="/docs/api/authentication#auth0-logout" target="_self" >テナントのログアウトURL</a>を<code>openid_connect_configuration.conf</code>ファイルに追加します。</p>

## トークンとJWKSエンドポイントにAccept-Encodingヘッダーを構成する {{{ data-action="code" data-code="openid_connect.server_conf" }}}


<p><code>openid_connect.server_conf</code>ファイルに<code>Accept-Encoding</code>ヘッダーを追加して、 <code>gzip</code>に値を設定します。</p>

## OpenID Connect構成ファイルをコピーする


<p>4つの構成ファイルを<code>conf.d</code>フォルダーにコピーします。</p><p><pre><code>sudo cp openid_connect.js \ 

   frontend.conf \

   openid_connect_configuration.conf \

   openid_connect.server_conf /etc/nginx/conf.d

</code></pre>

</p>

## Auth0のアプリケーション設定を構成する


<p>Auth0 Dashboardで以下を行います。</p><ol><li><p><b>［Applications（アプリケーション）］</b> &gt; <b>［Applications（アプリケーション）］</b>に移動し、リストからアプリケーションを選択します。</p></li><li><p><b>［Settings（設定）］</b>ビューに切り替えます。</p></li><li><p><b>［Application URI（アプリケーションURI）］</b>セクションの<b>［Allowed Callback URLs（許可されているコールバックURL）］</b>にhttps://{yourDomain}/_codexchを追加します。</p></li><li><p><b>［Credentials（資格情報）］</b>ビューに切り替えます。</p></li></ol><p><b>［Application Authentication（アプリケーション認証）］</b>セクションで、<b>認証方法</b>を［None（なし）］に設定します。</p>

## アップストリームアプリケーションにヘッダーを渡す {{{ data-action="code" data-code="frontend.conf" }}}


<p>IDトークン（JWT）からの追加のヘッダーを<code>/etc/nginx/conf.d/frontend.conf</code>ファイルでアップストリームの対象に追加します。</p>
