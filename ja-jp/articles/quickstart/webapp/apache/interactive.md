---
title: Apache
description: このチュートリアルでは、Webアプリに認証と認可を追加するために、Apacheを構成する方法について説明します。
interactive:  true
files:
 - files/auth_openidc
github:
  path: https://github.com/zmartzone/mod_auth_openidc/releases
locale: ja-JP
---

# Apache


<p>このチュートリアルでは、Webアプリに認証と認可を追加するために、Apacheを構成する方法について説明します。ログインして、アカウント用に構成された例を参考にこのクイックタートに従うことをお勧めします。</p><h2>システム要件</h2><p>このチュートリアルとサンプルプロジェクトは次を使用してテストが完了しています：</p><ul><li><p>Apache 2.4</p></li></ul><p></p>

## mod_auth_openidcモジュールをインストールして有効にする


<p>まず、Apacheに<code>mod_auth_openidc</code>モジュールをインストールする必要があります。</p><p><a href="https://github.com/zmartzone/mod_auth_openidc/releases">GitHub</a>からバイナリを取得して、OSにインストールすることができます。OSがバイナリのどれとも互換でない場合には、<a href="https://github.com/zmartzone/mod_auth_openidc/blob/master/INSTALL">ソースからビルド</a>することができます。</p><p>モジュールをインストールしたら、<code>a2enmod</code>コマンドを実行して、Apacheで有効化します。詳細については、<a href="https://manpages.ubuntu.com/manpages/focal/man8/a2enmod.8.html">Ubuntu Manpageでの2enmod</a>で次を参照してください：</p><p><code>a2enmod auth_openidc</code></p><p><div class="alert-container" severity="default"><p>Windowsについては、<a href="https://github.com/enderandpeter/win-a2enmod#installation">こちらのPowershellスクリプト</a>を使用すると、システム上で<code>a2enmod</code>を動作させることができます。</p></div></p><p></p>

## Auth0アカウント情報でモジュールを構成する {{{ data-action="code" data-code="auth_openidc.conf#1:12" }}}


<p>新しい構成ファイル（<code>auth_openidc.conf</code>）を更新します。このファイルは<code>/etc/apache2/mods-available</code>フォルダーにあります。</p><p><div class="alert-container" severity="default"><p>Windowsでは、<code>/apache/conf/httpd.conf</code>ファイルを使用する必要があります</p></div></p>

## Auth0を構成する


<p>Auth0 Dashboardで以下を行います。</p><ol><li><p><b>［Applications（アプリケーション）］</b> &gt; <b>［Applications（アプリケーション）］</b>に移動し、リストからアプリケーションを選択します。</p></li><li><p><b>［Settings（設定）］</b>ビューに切り替えて、<b>［Application URIs（アプリケーションURL）］</b>セクションを見つけます。</p></li><li><p><code>OIDCRedirectURI</code>の値を<b>［Allowed Callback URLs（許可されているCallback URL）］</b>に追加します。</p></li><li><p>ページ下部の<b>［Advanced Settings（詳細設定）］</b>を見つけます。</p></li><li><p><b>［OAuth］</b>ビューに切り替えます。</p></li><li><p><b>［JSON Web Token (JWT) Signature Algorithm（JSON Web Token（JWT）署名アルゴリズム）］</b>を<code>RS256</code>に設定します。</p></li></ol><p></p>

## 認可 {{{ data-action="code" data-code="auth_openidc.conf#14:18" }}}


<p>Apacheを構成して、ユーザーのIDトークンにあるクレームの値を基に特定の場所を保護することができます。これを行うには、<code>Location</code>ブロックを<code>auth_openidc.conf</code>ファイルに追加します。</p><p>たとえば、ユーザーの<a data-contentfulid="75kXKddeVMg7dRLtpPCOAn-ja-JP">ロール</a>を読み出す<a data-contentfulid="7DxotebjaRuNGHQgMr27ob-ja-JP">アクション</a>を作成して、保護された場所へのアクセスを付与するクレームを追加することができます：</p><p><pre><code class="language-javascript">exports.onExecutePostLogin = async (event, api) =&gt; {

  const roles = event.authorization.roles; // ['user', 'admin']



  if (roles.includes('admin')) {

    api.idToken.setCustomClaim('folder', 'admin');

  }

};

</code></pre>

</p>
