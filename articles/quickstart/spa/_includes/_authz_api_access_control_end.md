When the user authenticates, their Access Token will contain a `scope` of `read:messages`. This means when they send a request to your API, the endpoint can choose to release the resource only if this `scope` is present.

The downloadable sample linked above demonstrates how to accomplish this fine-grained access control based on the `scope` claim using Node.js and the Express framework. For instructions on how to implement access control for the specific server-side technology you are using, see the [Backend/API quickstart documentation](/quickstart/backend).
