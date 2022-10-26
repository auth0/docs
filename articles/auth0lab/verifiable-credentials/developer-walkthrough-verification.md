---
title: Verifiable Credentials Hands-On Labs
editUrl: 'https://github.com/auth0/docs/edit/auth0lab/articles/auth0lab/verifiable-credentials/developer-walkthrough-verification.md'
breadcrumbs:
  - title: Auth0 Lab
    url: /docs/auth0lab
topics:
  - auth0lab
  - verifiable-credentials
  - verifiable-presentations
contentType: how-to
useCase: auth0lab
interpolate_es: false
---

## Developer Walkthrough - Verification

This article will show you how to configure an Auth0 Lab tenant to act as a verifier for Verifiable Credentials issued by other issuers. If you get stuck, or have questions, join us at [<u>auth0lab.com/chat</u>](http://auth0lab.com/chat).

### Prerequisites

-   Start by cloning the Sample App repo [<u>https://github.com/auth0-lab/hol-verifier-auth0</u>](https://github.com/auth0-lab/hol-verifier-auth0)
-   Install node.js locally. If you do not have Node installed, you can download it here [<u>https://nodejs.org/en/download/</u>](https://nodejs.org/en/download/).
-   Install dependencies with yarn. If you do not have yarn installed, you can use node to install it [<u>https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable</u>](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable).
-   Have a Vaccine Credential in your IDWallet. This was obtained in the [<u>Obtaining a Credential</u>](https://docs.google.com/document/d/1m5dSlyCpWPSojfVQoWTLT1ZS0tXVHUpYe7YytLdXlNE/edit#heading=h.3v12zrszw0lk) section.

### Auth0 Lab Environment setup

In this section you will configure your Auth0 Lab tenant with a new application and a verifiable credential presentation template.

### Application Setup

To create an application within your Auth0 tenant that will receive the verifiable credential API calls from your application follow these steps.

1.  Navigate to the Auth0 Lab instance: [<u>manage.auth0lab.com</u>](http://manage.auth0lab.com), and sign in with your Auth0 account. You will have to accept the terms if this is your first time at manage.auth0lab.com.
2.  In the left menu, go to Applications &gt; Applications.
3.  Click “**+ Create Application**” Button.
4.  Create a [<u>Regular Web Application.</u>](https://auth0.com/docs/get-started/auth0-overview/create-applications)

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-verifier/image8.png" style="width:6.5in;height:3.77778in" />

5.  Navigate to the “**Settings**” tab and note the ClientID, ClientSecret.

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-verifier/image4.png" style="width:6.5in;height:4.02778in" />

### Verification Template

To setup a verification template that asks for a Vaccine Card type verifiable credential follow these steps:

1.  On the left-hand nav, go to Credentials (LAB) &gt; Verification. Click **Add Verification Template**”.

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-verifier/image6.png" style="width:6.5in;height:2.45833in" />

2.  Enter a name (Ask for Vaccine Card) and for Input Descriptors, use the following code to ask for a vaccine card.

	```json
	[
	  {
	    "id": "VaccineCard",
	    "name": "Covid-19 Vaccine Card",
	    "purpose": "We want to check your vaccination status",
	    "constraints": {
	      "fields": [
	        {
	          "path": [
	            "$.type[(@.length-1)]"
	          ],
	          "filter": {
	            "type": "string",
	            "pattern": "VaccineCard"
	          }
	        }
	      ]
	    }
	  }
	]

	```
	::: note
	The code snippet asks for any credential where the last element of the **type** array is **VaccineCard**. The filter parameter helps the user’s wallet application find the specific credential your application is looking for from the user. In a mature Verifiable Credential ecosystem, a user could have many credentials in a single wallet. You can read more about this specification format [<u>here</u>](https://identity.foundation/presentation-exchange/#input-descriptor).
	:::

3.  Click **Save** to save…

4.  Copy the template ID from the Verification Templates page, click “Back to Verification Templates” at the top of the page. Then use the copy button.

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-verifier/image5.png" style="width:6.5in;height:1.25in" />

### Adding Verification to the Sample App

This section will walk you through the code necessary to use Auth0 as a verifier in a Next.js application. We will be adding the code to the Sample App from the pre-requisites: [<u>https://github.com/auth0-lab/hol-verifier-auth0</u>](https://github.com/auth0-lab/hol-verifier-auth0).

#### .env File

Edit the .env.local file, and set the missing values:

::: note
Sometimes “.” files are hidden by your system and you will need to change some settings to see them or open the directory in a code editor
:::

-   `AUTH0_TENANT` is your tenant name
-   `AUTH0_CLIENT_ID` from the application you created above
-   `AUTH0_SECRET` from the application you created above
-   `TEMPLATE_ID` from the template you created above

For example:

<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-verifier/image1.png" style="width:6.5in;height:1.33333in" />

### Start The App

In a terminal, run \`yarn dev\`. This should start the app running on localhost:3000

```
> npm run dev

> hol-verifier@0.1.0 dev
> next dev

ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info  - Loaded env from /Users/alex/projects/auth0/vc/hol-verifier-auth0/.env.local
event - compiled client and server successfully in 423 ms (173 modules)

```

### App Structure

The application in its current state will be a server for a simple UI. The UI has a button that starts the verification process.

<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-verifier/image3.png" style="width:6.5in;height:2.65278in" />

The following steps describe how the application works:

1.  When the “**Start Presentation Flow with Auth0 Verification**” button is clicked, the app starts a verification request by making an API call to Auth0. In this API call, the app sends the “clientid”, “clientsecret” and “templateid” variables to the API. Auth0 will reply with a URL and a “request\_id”.

::: note
The URL is what we’d normally encode into a QR code for a wallet application to scan and start the process. In this demo, we’ll just display this url as a clickable link for simplicity
:::

2.  The request\_id is used to call back to another Auth0 API to check if the user submitted credentials.
3.  Then the application periodically checks Auth0, by making a separate API call, to check if the user has successfully submitted a presentation. Pass the request\_id that was received previously to this API call, and keep doing it until you receive a response indicating the process is complete.

To make this flow work, create two endpoints in our application:

-   `/api/verify/start`
-   `/api/verify/check`

When the user clicks the button to start the flow, a call needs to be made to the local /api/verify/start endpoint, which will then start an interval timer on the UI to call the /api/verify/check endpoint once per second.

The UI is already wired up to handle calling the backend, the different states, loading, error, etc, so just the two endpoints need to be implemented.

### Implement /api/verify/start

This endpoint starts the presentation request by making a call to the Auth0 API. The API returns a URL with the presentation request information for the user’s wallet to consume.

1.  Create a new file in the pages/api/verify folder named ‘start.js’

2.  You will need to make API calls to Auth0. Do that using node-fetch, which you can import with this code:

	```js
	import fetch from "node-fetch";
	```

3.  Next, load the variables from the .env.local file. The framework, Next.js, already parses this file and puts the variables in process.env, so load them and verify they exist.

	```js
	const AUTH0_TENANT = process.env.AUTH0_TENANT;
	const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
	const AUTH0_SECRET = process.env.AUTH0_SECRET;
	const TEMPLATE_ID = process.env.TEMPLATE_ID;

	if (!AUTH0_TENANT) throw new Error("AUTH0_TENANT not set");
	if (!AUTH0_CLIENT_ID) throw new Error("AUTH0_CLIENT_ID not set");
	if (!AUTH0_SECRET) throw new Error("AUTH0_SECRET not set");
	if (!TEMPLATE_ID) throw new Error("TEMPLATE_ID not set");
	```

4.  Add the method to handle the HTTP request. This is mostly Next.js boilerplate, but inside it will call a separate run() method that will do the bulk of the work. Wrap it in some error handling:

	```js
	export default async function handler(req, res) {
	 try {
	   const result = await run();
	   res.status(200).json(result);
	 } catch (err) {
	   res.status(500).send({ error: err.message });
	 }
	}
	```

5.  Define the run() method. This will simply make a fetch request to the Auth0 verification API to start a request, and return the results back to the caller. The results contain the url, which instructs the wallet on how to continue the flow, a request\_id to track this particular flow in case multiple users are using the application at the same time, and expires\_at which dictates how long this request is valid for. In this walkthrough, expires\_at is not used for validation.

	```js
	async function run() {
	 const result = await fetch(`https://${AUTH0_TENANT}/vcs/presentation-request`, {
	   method: "post",
	   headers: {
	     Accept: "application/json",
	     "Content-Type": "application/json",
	   },
	   body: JSON.stringify({
	     client_id: AUTH0_CLIENT_ID,
	     client_secret: AUTH0_SECRET,
	     template_id: TEMPLATE_ID,
	   }),
	 });
	 const { url, request_id, expires_at } = await result.json();

	 // the url is the "QR Code" that a wallet would scan
	 return { url, request_id, expires_at };
	}
	```

### Implement /api/verify/check

This application will need to see if the user finished the presentation request to the Auth0 tenant and get the results data. It does this by calling the check endpoint periodically. This endpoint in turn calls an Auth0 API to check the status of the request. If the presentation was successful, the API will return the JSON from the presentation.

1.  Create a new file in the pages/api/verify folder named check.js

2.  This file will also import the node-fetch library, load the environment variables. These steps are identical to the previous section, so just copy paste them all:

	```js
	import fetch from "node-fetch";

	const AUTH0_TENANT = process.env.AUTH0_TENANT;
	const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
	const AUTH0_SECRET = process.env.AUTH0_SECRET;
	const TEMPLATE_ID = process.env.TEMPLATE_ID;

	if (!AUTH0_TENANT) throw new Error("AUTH0_TENANT not set");
	if (!AUTH0_CLIENT_ID) throw new Error("AUTH0_CLIENT_ID not set");
	if (!AUTH0_SECRET) throw new Error("AUTH0_SECRET not set");
	if (!TEMPLATE_ID) throw new Error("TEMPLATE_ID not set");
	```

3.  The HTTP handler will be very similar to the previous one. However, request\_id must be extracted from the POST body. Then pass the request\_id to the run() method where most of the work will be done:

	```js
	export default async function handler(req, res) {
	 try {
	   const id = req.body.request_id;
	   const result = await run(id);
	   res.status(200).json(result);
	 } catch (err) {
	   res.status(500).send({ error: err.message });
	 }
	}
	```

4.  Now add the run() method. Here an API call is made to Auth0, using request\_id, to retrieve the status of that request. It will then need to return the result.

	```js
	async function run(id) {
	  if (!id) throw new Error("request_id not found");

	  const result = await fetch(
	    `https://${AUTH0_TENANT}/vcs/presentation-request/${id}/status`,
	    {
	      method: "post",
	      headers: {
	        "Content-Type": "application/json",
	      },
	      body: JSON.stringify({
	        client_id: AUTH0_CLIENT_ID,
	        client_secret: AUTH0_SECRET,
	        template_id: TEMPLATE_ID,
	      }),
	    }
	  );

	  const data = await result.json();

	  if (data.presentation) {
	    data.presentation = JSON.parse(data.presentation);
	  }

	  return data;
	}
	```

### Verify it works

That is all that is needed to implement verification through Auth0. To test the flow:

1.  Open the application at [<u>http://localhost:3000/</u>](http://localhost:3000/)

2.  Click the “Start Presentation Flow with Auth0 Verification” button
    <img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-verifier/image12.png" style="width:6.5in;height:4.125in" />

3.  Once ready, click the “HERE” link.
    <img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-verifier/image7.png" style="width:6.5in;height:4.55556in" />

4.  This will open the Wallet in another tab. If you have followed the previous steps in this Hands On Lab, you should already have a VaccineCard credential in your wallet which will be preselected now ready to be presented:

    <img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-verifier/image10.png" style="width:1.96321in;height:3.39693in" />

5.  (Optional) If you switch back to the application page, you should see the status changed from “pending” to “initialized”, indicating that Auth0 has started the flow with the wallet.

    <img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-verifier/image9.png" style="width:6.5in;height:4.52778in" />

6.  Click Present Credential. You can close the tab once you see the success screen:

    <img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-verifier/image11.png" style="width:2.0391in;height:3.66146in" />

7.  Back in our app you will see the JSON contents of the Verifiable Presentation received from the wallet:

    <img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-verifier/image2.png" style="width:6.5in;height:3.52778in" />

### Wrap Up and Next Steps

The full completed code for this lab is available on the ‘endstate’ branch of the repo:
[<u>https://github.com/auth0-lab/hol-verifier-auth0/tree/endstate</u>](https://github.com/auth0-lab/hol-verifier-auth0/tree/endstate)

You have seen how a developer can add verifiable credential verification to their application with Auth0. Let us know how the experience was by leaving us feedback on the Auth0 Lab Discord [<u>https://auth0lab.com/chat</u>](https://auth0lab.com/chat). If you have any issues with any of the steps, you can also bring them up there.

Now you can start experimenting with your own use cases. Let us know what you are building!
