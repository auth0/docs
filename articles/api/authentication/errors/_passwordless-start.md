# POST /passwordless/start

### HTTP 400

JSON | Description
-----|------------
`{"error": "bad.tenant", "error\_description": "error in tenant - tenant validation failed: invalid\_tenant"}` | Invalid tenant
`{"error": "bad.client\_id", "error\_description": "Missing required property: client_id"}` | Missing client_id
`{"error": "bad.connection", "error_description": "Missing required property: connection"}` | Missing connection
`{"error": "bad.connection", "error_description": "Connection does not exist"}` | Connection does not exist
`{"error": "bad.connection", "error_description": "Connection is disabled"}` | Disabled&nbsp;connection
`{"error": "bad.connection", "error_description": "Invalid connection strategy. It must either be a passwordless connection"}` | Invalid connection
`{"error": "bad.authParams", "error_description": "error in authParams - invalid type: string (expected object)"}` | Invalid authParams
`{"error": "bad.request", "error\_description": "the following properties are not allowed: <INVALID_PARAMETER_VALUE>"}` | Invalid paramaters
`{"error": "bad.phone\_number", "error\_description": "Missing required property: phone_number"}` | Missing phone_number
`{"error": "bad.phone\_number", "error_description": "String does not match pattern: ^\\+[0-9]{1,15}$"}` | Invalid phone_number format
`{"error": "sms\_provider\_error", "error\_description": "<SPECIFIC_PROVIDER_MESSAGE> (Code: <SPECIFIC_PROVIDER_CODE>)"}` | SMS Provider errors
