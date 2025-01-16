## How to Troubleshoot Webhooks

If your webhook isn't working, it can be difficult to troubleshoot and determine what is causing the issue. Webhooks are asynchronous, so testing them can involve you triggering the webhook, waiting, and then checking the response (assuming that you did receive a response).

However, there are certainly alternatives to the inefficient process we detailed above. While full details of how to troubleshoot a particular webhook is outside the scope of this article, here are some steps you can take to debug:

1. Check the [Logs](/logs) section of the [Dashboard](${manage_url}/#/logs) for helpful messages.

1. Analyze the requests your webhook is making using a tool like [Mockbin](http://mockbin.org/), [Beeceptor](https://beeceptor.com/), or (self-hosted) [RequestBin](https://github.com/Runscope/requestbin).

1. Mock requests using cURL or [Postman](https://www.getpostman.com/)

1. Test your webhook code locally using something like [localtunnel](https://github.com/localtunnel/localtunnel) or [ngrok](https://ngrok.com/)

1. Use a tool like [Runscope](https://www.runscope.com/) or [Assertible](https://assertible.com/) to watch the whole execution flow