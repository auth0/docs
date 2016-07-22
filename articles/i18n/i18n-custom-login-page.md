## Internationalize (i18n) the default login page

Below you will find instruction on how to display the login page using the user's browser preferred language:

1) Turn on the "Customize Login Page" toggle in Login Page section of your auth0 dashboard.

![](/media/articles/i18n/i18n-custom-login-page/i18n-custom-login-page-1.png)

2) In your login page HTML, inside the script tag add following JavsScript snippet (before you initialize Lock) to detect browser language:

```js
// getFirstBrowserLanguage taken 
// from  http://stackoverflow.com/questions/1043339/javascript-for-detecting-browser-language-preference

var getFirstBrowserLanguage = function () {
	var nav = window.navigator,
	browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
	i,
	language;

	// support for HTML 5.1 "navigator.languages"
	if (Array.isArray(nav.languages)) {
	  for (i = 0; i < nav.languages.length; i++) {
	    language = nav.languages[i];
	    if (language && language.length) {
	      return language;
	    }
	  }
	}

	// support for other well known properties in browsers
	for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
	  language = nav[browserLanguagePropertyKeys[i]];
	  if (language && language.length) {
	    return language;
	  }
	}

	return null;
};

var language = getFirstBrowserLanguage();
```

3) Now, if not `undefined` or `null`, pass language variable to the `dict` option while showing Lock like below:


```js
lock.show({
  // icon:            '{YOUR_LOGO_URL}',
  callbackURL:        config.callbackURL,
  responseType:       config.callbackOnLocationHash ? 'token' : 'code',
  dict:               language || config.dict,
  connections:        connection ? [connection] : null,
  rememberLastLogin:  !prompt,
  container:          'widget-container',
  authParams:         config.internalOptions
});
```

Test it customization by setting desired/preferred language in the browser Content setting as below:

![](/media/articles/i18n/i18n-custom-login-page/i18n-custom-login-page-2.png)

View `Login Page` by clicking on Preview tab under `Customize Login Page` toggle:

![](/media/articles/i18n/i18n-custom-login-page/i18n-custom-login-page-3.png)