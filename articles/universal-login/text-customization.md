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

PUT '/api/v2/prompts/{**prompt**}/custom-texts',
{
 "<**screen**>": {
   "<**text1 id**>": {
     "<**language1 id**>": "text1 in language1",
     "<language2 id>": "text1 in language2"    }
 }
 
To be able to use it, you need to provide the proper values to the prompt, screen, text id, and language id fields. We’ll be introducing these concepts below.

We are calling **prompt** to a specific step in the login flow. The available ones are: 

|  |  |
| ------------- |-------------| 
| [login](text-customization-prompts/login) | [mfa-otp](text-customization-prompts/mfa-otp) |   
| [signup](text-customization-prompts/signup) | [mfa-email](text-customization-prompts/mfa-email) |   
| [email-verification](text-customization-prompts/email-verification) | [mfa-recovery-code](text-customization-prompts/mfa-recovery-code) |   
| [reset-password](text-customization-prompts/reset-password) |  [mfa-sms](text-customization-prompts/mfa-sms) |  
| [consent](text-customization-prompts/consent) | [mfa-push](text-customization-prompts/login) |   
| [mfa-push](text-customization-prompts/mfa-push) | [device-flow](text-customization-prompts/device-flow) |


Each prompt can have more than one screen. For example, Login, has a single one, but [Reset Password](text-customization-prompts/reset-password) has one for [reset-password](text-customization-prompts/reset-password), 
[reset-password](text-customization-prompts/reset-password),
[reset-password-success](text-customization-prompts/reset-password-success),
[reset-password-request](text-customization-prompts/reset-password-request),
[reset-password-email](text-customization-prompts/reset-password-email),
[reset-password-error](text-customization-prompts/reset-password-error).

Each screen has a set of **text ids**. The list of prompts is available [here](text-customization-prompts/index). It links to a page per prompt that has the screens, the text ids, and the English texts for each.

You can find the list of available languages [here](/universal-login/i18n).

You can use the GET and PUT HTTP verbs when calling the API. Note that PUT will replace all customizations for a specific prompt with the new ones.  If you customized one screen and then want to customize another one, you’ll need to send both when updating the texts.

## Available Variables 

Some texts have variables that are replaced in runtime based on context information. The available variables are different per-screen, so it’s not guaranteed that they will work in any text. You can see the variables available for each screen in the [documentation pages](text-customization-prompts/index) that describe the available keys (e.g. [this one](text-customization-prompts/consent) for Consent).


| Variable | Description |
| ------------- |-------------| 
| <%= "${clientName}" %>| Auth0 Application Name | 
| <%= "${connectionName}" %> | Connection Name (e.g. ‘Google’)
| <%= "${companyName}" %>| Auth0 Tenant name| 
| <%= "${userName}" %>| Name of the logged user| 
| <%= "${email}" %> | Email of the logged user| 
| <%= "${appName}" %>| Name of the custom Guardian Push application | 
