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

The New Universal Login Experience consists of a set of pages that perform several account-related actions, like logging in, enrolling multi-factor authentication factors or changing their password. The text displayed on those pages is provided by Auth0 in several languages. 

In some cases, you could want to adjust the text that Auth0 uses. For example, sometimes the wording can be improved for your specific use case or customer base. In other cases your UX team could have defined a specific tone to communicate with the end-user and you want your login pages to be consistent with the rest of the application’s language.

Auth0 provides an API that you can use to customize all the text, for every supported language, in the pages rendered by the new Universal Login Experience. 

The API has this format:

```
PUT '/api/v2/prompts/{**prompt**}/custom-texts',
{
 "<**screen**>": {
   "<**text1 id**>": {
     "<**language1 id**>": "text1 in language1",
     "<language2 id>": "text1 in language2"    }
 }
 ```
 
To be able to use it, you need to provide the proper values to the prompt, screen, text id, and language id fields. We’ll be introducing these concepts below.

We are calling **prompt** to a specific step in the login flow. The available ones are: 

|  |  |
| ------------- |-------------| 
| [login](/universal-login/text-customization-prompts/login) | [mfa-otp](/universal-login/text-customization-prompts/mfa-otp) |   
| [signup](/universal-login/text-customization-prompts/signup) | [mfa-email](/universal-login/text-customization-prompts/mfa-email) |   
| [email-verification](/universal-login/text-customization-prompts/email-verification) | [mfa-recovery-code](/universal-login/text-customization-prompts/mfa-recovery-code) |   
| [reset-password](/universal-login/text-customization-prompts/reset-password) |  [mfa-sms](/universal-login/text-customization-prompts/mfa-sms) |  
| [consent](/universal-login/text-customization-prompts/consent) | [mfa-push](/universal-login/text-customization-prompts/login) |   
| [mfa-push](/universal-login/text-customization-prompts/mfa-push) | [device-flow](/universal-login/text-customization-prompts/device-flow) |


Each prompt can have more than one screen. For example, Login, has a single one, but [Reset Password](/universal-login/text-customization-prompts/reset-password) has one for [reset-password](/universal-login/text-customization-prompts/reset-password), 
[reset-password](/universal-login/text-customization-prompts/reset-password),
[reset-password-success](/universal-login/text-customization-prompts/reset-password-success),
[reset-password-request](/universal-login/text-customization-prompts/reset-password-request),
[reset-password-email](/universal-login/text-customization-prompts/reset-password-email),
[reset-password-error](/universal-login/text-customization-prompts/reset-password-error).

Each screen has a set of **text ids**. The list of prompts is available [here](/universal-login/text-customization-prompts). It links to a page per prompt that has the screens, the text ids, and the English texts for each.

You can find the list of available languages [here](/universal-login/i18n).

You can use the GET and PUT HTTP verbs when calling the API. Note that PUT will replace all customizations for a specific prompt with the new ones.  If you customized one screen and then want to customize another one, you’ll need to send both when updating the texts.

## Available Variables 

Some texts have variables that are replaced in runtime based on context information. The available variables are different per-screen, so it’s not guaranteed that they will work in any text. You can see the variables available for each screen in the [documentation pages](/universal-login/text-customization-prompts/index) that describe the available keys (e.g. [this one](/universal-login/text-customization-prompts/consent) for Consent).


| Variable | Description |
| ------------- |-------------| 
| <%= "${clientName}" %>| Auth0 Application Name | 
| <%= "${connectionName}" %> | Connection Name (e.g. ‘Google’)
| <%= "${companyName}" %>| Auth0 Tenant name| 
| <%= "${userName}" %>| Name of the logged user| 
| <%= "${email}" %> | Email of the logged user| 
| <%= "${appName}" %>| Name of the custom Guardian Push application | 

## Calling the API

To call the API you need an access token that has the ‘read:prompts’ and ‘update:prompts’ scopes. If you are using the API Explorer Machine to Machine application, make sure the scopes are selected:


### Examples

If you want to change the description field for the `login` prompt, so it does not say 'Log in to <%= "${companyName}" %> to continue to <%= "${clientName}" %>.' you can do it with the following  API call:

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/prompts/login/custom-texts",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"reset-password-success\": { \"description\": {   \"en\": \"Log in to ${companyName}\"}}}"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

Sending an empty Javascript object will delete all custom texts for the `login` prompt to the default ones:
