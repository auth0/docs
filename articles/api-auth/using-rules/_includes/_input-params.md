* **client** - `object` - the client asking for the token, including the `client` metadata (a key-value pair that can be set by client)

    ```json
    {
      "tenant":  "tenant_name",
      "id": "tenant_id",
      "name": "test_client",
      "metadata": {
        "some_metadata": "value"
      }
    }
    ```

* **scope** - `string array` - the scopes available on the API that you have defined
* **audience** - `string` - the API identifier available via the API settings page
* **context** - `object` - the contextual information about the request

    ```json
    {
      "ip": "123.123.123.123",
      "userAgent": "...",
      "webtask": {
        "secrets": { "FOO": "bar" }
      }
    }
    ```
