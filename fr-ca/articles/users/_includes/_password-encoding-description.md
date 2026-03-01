The encoding of the password used to generate the hash. Must be one of:

* `ascii`
* `utf8`
* `utf16le`
* `ucs2`
* `latin1`
* `binary`

On login, the user-provided password will be transcoded from `password.encoding` before being checked against the provided hash.

For example; if your hash was generated from a `ucs2` encoded string, then you would set:

```json
{
  "password": {
    "encoding": "ucs2"
  }
}
```