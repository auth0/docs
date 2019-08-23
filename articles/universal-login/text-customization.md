---
description: Text Customization for the New Universal Login Experience
topics:
  - universal-login
  - localization
contentType: how-to
toc: true
useCase: customize-hosted-pages
---
# Text Customization for the New Universal Login Experience

The New Universal Login Experience consists of a set of pages that perform several account-related actions such as logging in, enrolling multi-factor authentication factors, or changing their password. The text displayed on those pages is provided by Auth0 in several languages. 

In some cases you might wish to modify the wording on these pages to better match your application's tone or specific needs.

Auth0 provides an API that you can use to customize all the text displayed in the [New Universal Login Experience](/universal-login/new) for every [supported language](/universal-login/i18n).

The API is defined with the following structure:

```
PUT '/api/v2/prompts/PROMPT/custom-text',
{
 "SCREEN": {
   "TEXT1_ID": {
     "<LANGUAGE1_ID>": "text1 in language1",
     "<LANGUAGE2_ID>": "text1 in language2"    }
 }
 ```
 
You need to provide the proper values to the `prompt`, `screen`, `text id`, and `language id` fields.

* The term `prompt` is used to refer to a specific step in the login flow. The available `prompt` values are:
	<%= include('text-customization-prompts/_prompts') %>
* Each `prompt` can have one or more screens. For example, the [Login](/universal-login/text-customization-prompts/login) prompt has a single screen, but the [Reset Password](/universal-login/text-customization-prompts/reset-password) prompt has many screens.
* Each screen has a set of `text id`s. 
* You can find the list of available languages on the [Universal Login Internationalization page](/universal-login/i18n).

## Available variables 

Some screens have variables in the text that are replaced in runtime based on context information. The available variables are different per-screen, so it is not guaranteed that they will work anywhere other than the screens they originally appear in. 

| Variable | Description |
| ------------- |-------------| 
| <%= "${clientName}" %>| Auth0 Application Name | 
| <%= "${connectionName}" %> | Connection Name (e.g. 'Google')
| <%= "${companyName}" %>| Auth0 Tenant name| 
| <%= "${userName}" %>| Name of the logged user| 
| <%= "${email}" %> | Email of the logged user| 
| <%= "${appName}" %>| Name of the custom Guardian Push application | 

## Calling the API

You can use the GET and PUT HTTP verbs when calling the API. Note that PUT will replace all customizations for specific prompts with the new ones. If you customized one screen and then want to customize another one, you will need to send both when updating the prompt's text.

To call the API you need an Access Token that has the `read:prompts` and `update:prompts` scopes. If you are using the API Explorer Machine to Machine application, make sure the scopes are selected.

### Examples

If you want to change the **description** field for the `login` prompt so that it does not say "Log in to <%= "${companyName}" %> to continue to <%= "${clientName}" %>" you can do it with the following  API call:

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/prompts/login/custom-text",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"reset-password-success\": { \"description\": {   \"en\": \"Please enter your credentials\",\"es\": \"Ingrese sus credenciales\"}}}"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

If you want to delete all custom text for the `login` prompt you can send an empty array:

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/prompts/login/custom-text",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{ }"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```
