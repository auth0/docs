# Installing the AD LDAP Connector on Windows

Connecting with __Active Directory__ or any other __LDAP__ server with Auth0 requires deploying and running a small service on your side.

<div class="platform-selector">

  <div class="installers">
    <ul>
      <li>
        <a class="download-link" href="http://cdn.auth0.com/adldap.msi">
          <img src="//cdn.auth0.com/docs/img/node-windows.png" alt="">
          Auth0 Active Directory/LDAP Connector for Windows
          <small class="download-version"></small>
        </a>
        <span class="hash"></span>
      </li>
    </ul>
  </div>

<a href="@@env.BASE_URL@@/connector/install-other-platforms" class="other-platforms">... or install in other platforms</a>

<script type="text/javascript">
  $.getJSON('https://cdn.auth0.com/connector/windows/latest.json', function (data) {
    $('.download-link').attr('href', data.url);
    $('.download-version').text('Current version: ' + data.version);
    $('.hash').text('Checksum (SHA1): ' + data.checksum);
  })
</script>