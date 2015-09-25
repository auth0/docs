---
public: false
---

Auth0 Lock Passwordless is a professional looking dialog that allows users to log in by receiving a one-time password via email or text message.

After installing [Lock Passwordless](https://github.com/auth0/lock-passwordless) you will have to initialize it with your clientId and domain. You can find this information at your [application settings](${uiAppSettingsURL}).
    

```
<script src="${lock_passwordless_url}"></script>
<script type="text/javascript">
	// Initialize Passwordless Lock instance
  var lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}');
  //...
</script>
<a href="javascript:signin()">Login</a>
```