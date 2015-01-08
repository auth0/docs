# Installing the AD LDAP Connector

Connecting with __Active Directory__ or any other __LDAP__ server with Auth0 requires deploying and running a piece of software on your side.

<div class="platform-selector">

  <div class="installers">
    <ul>
      <li>
        <a class="download-link" href="http://cdn.auth0.com/adldap.msi">
          <img src="//cdn.auth0.com/docs/img/node-windows.png" alt="">
          Auth0 Active Directory Agent for Windows
          <small class="download-version"></small>
        </a>
        <span class="hash"></span>
      </li>
    </ul>
  </div>

<a href="@@env.BASE_URL@@/connector/install-other-platforms" class="other-platforms">... or install in other platforms</a>

When prompted for the ticket url, paste the ticket url provided (if you don't have it handy, you can find it on the dashboard, by clicking on Setup on the connection).

You will need to provide the parameters to connect to your LDAP.

<script type="text/javascript">
  $.getJSON('https://cdn.auth0.com/connector/windows/latest.json', function (data) {
    $('.download-link').attr('href', data.url);
    $('.download-version').text('Current version: ' + data.version);
    $('.hash').text('Checsum (SHA1): ' + data.checksum);
  })
</script>