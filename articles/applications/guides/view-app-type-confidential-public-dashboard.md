### Check your application type

Auth0 determines the **Application Type** based on the **Token Endpoint Authentication Method** setting on the application's settings page in the Dashboard.

|Application Type|Token Endpoint Authentication Method|
|-|-|
|Public|**None**|
|Confidential|**Basic**, **Post**, unspecified|

::: panel Token Endpoint Authentication Method
The `Token Endpoint Authentication Method` defines how a Confidential Application authenticates against the [token endpoint](/api/authentication#authorization-code). Its valid values are:

* `None`, for a public application without a client secret
* `Post`, for an application using HTTP POST parameters
* `Basic`, for an application using HTTP Basic parameters 

Additionally, any Application where the Token Endpoint Authentication Method is unspecified is confidential.

You can find this field at the [Application Settings page](${manage_url}/#/applications/${account.clientId}/settings) of the [Auth0 Dashboard](${manage_url}).
:::
