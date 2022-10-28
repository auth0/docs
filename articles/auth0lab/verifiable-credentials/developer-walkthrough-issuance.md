---
title: Issuance Walkthrough
editUrl: 'https://github.com/auth0/docs/edit/auth0lab/articles/auth0lab/verifiable-credentials/developer-walkthrough-issuance.md'
breadcrumbs:
  - title: Auth0 Lab
    url: /docs/auth0lab
topics:
  - auth0lab
  - verifiable-credentials
  - verifiable-presentations
contentType: how-to
useCase: auth0lab
---

## Using Auth0 as a Verifiable Credential Issuer - Developer Walkthrough

The content of this article will walk you through the developer experience of generating a new credential type, signed and issued by their Auth0 tenant. It requires you to have an existing Auth0 account. If you do not have one, sign up for it [auth0.com/signup](https://auth0.com/signup). If you get stuck, or have questions, join us at our [Discord server](https://auth0lab.com/chat).

### Adding the Credential Template

This section walks you through how to set up a Credential Template for your new verifiable credential. A credential template stores metadata and branding data about your credential.

1. Navigate to the [Auth0 Lab instance](https://manage.auth0lab.com), and continue with your Auth0 account. You will have to accept the terms if this is your first time at manage.auth0lab.com.
2. Using the left nav and go to Credentials (LAB) > Issuance.
4. Click "+ Add Credential Template" to create a Credential Template.
3. Provide the following values for type and a name:
    - Type: UniversityDegreeCredential. 
	The type will identify the credential to other developers and be included in the credential payload. It's a the string that other entities use to reference this kind of credential.
    - Name: Acme University Degree. 
	The name should be a human-readable string for your Auth0 Lab tenant.

  <img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/image7.png" style="width:6.5in;height:3.41667in" />

4. Add the Credential Template to your tenant by clicking the __"Add Credential Template"__ button.

### Implement the Pre-Credential Issuance Action

To issue a credential to a user, you need to define the claims the credential will have. For that, we will use the Auth0 actions feature, which allows you to write custom code as part of various flows, including credential issuance. We will create an action that takes the user as input and sets the claims to add to the credential.

1. On the left nav, navigate to Actions > Flows, then click __"Verifiable Credential Issuance"__.
2. You will be presented with an Action Flow. On the right hand navigation, add an action by clicking the __"+"__ button, then the __"Build Custom"__ option.
3. Name your action something you’ll remember. This action will contain the claim types for your credential, so you can tie your name to your credential type to make editing both easier in the future. The Trigger should be "Pre Credential Issue", the default for this type of Action Flow. Create your action.

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/image2.png" style="width:6.5in;height:4.61111in" />

4. Provide the following code for the handler that will issue your credential. This code allows you  to define credentials claims and how they'll be populated. The code snippet below sets credential claims from a user's `app_metadata`.

	::: note
	There is an example below of a working action. You can explore changing the claim fields and source data if you'd like.

	You can find examples of actions used for sample issuers [here](https://github.com/auth0-lab/vc-samples/tree/main/sample-issuers).
	:::

	::: note
	The string used in the line `if (event.credential.type !== 'UniversityDegreeCredential') {` must match the credential type you set when creating the credential template.
	:::

	```js
	exports.onExecutePreCredentialIssue = async (event, api) => {
	  if (event.credential.type !== 'UniversityDegreeCredential') {
	    return;
	  }

	  // take credential details from `user.app_metadata`
	  const app_metadata = event.user.app_metadata || {};
	  const degree = app_metadata.degree || {};

	  // add claims to the credential
	  api.credential.setCredentialSubject({
	    referenceId: event.user.user_id,
	    degree: {
	      degreeType: degree.type || 'unknown',
	      degreeName: degree.name || 'unknown'
	    }
	  });
	};
	```

5. Click **Deploy** on the top right of the code editor. This will make the action code available for usage and wait for the action to be deployed.

6. After you set up your action, you will need to add it to the flow. Navigate back to the verifiable credential issuance flow (step 1), and then click on __"Custom"__ under the _Add Action_ window. There you should see your newly created custom action.

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/image5.png" style="width:6.5in;height:2.11111in" />

7.  Click **Apply** in the top-right corner to apply the changes.

8. Configure your tenant to accept OIDC Dynamic Clients:
	- Using the left nav, go to _Settings_. At the top of the page, click the Advanced tab.
	- Scroll down to the Settings panel and enable the "OIDC Dynamic Application Registration" toggle.

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/image6.png" style="width:6.5in;height:2.41667in" />


9. Promote any connections in use in your Auth0 Lab tenant to domain level. By default, you will have a database connection that was created when your tenant was created.
  	- Navigate on the left hand nav to Authentication > Database.
  	- There should be a database connection listed called "Username-Password-Authentication"; click it to head to _Settings_.
  	- Scroll down, and enable the __"Enable for third party clients"__ switch.

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/image1.png" style="width:6.5in;height:0.86111in" />

10. Ensure that the connection you just promoted is enabled for at least one regular application.
  	- Using the left nav and go to Applications > Applications.
  	- Select the Default App.
  	- Go to the connections tab, and ensure that the connection you promoted is toggled on.

11. Finally, add your tenant as an issuer in ID wallet:
  	- Head to [wallet issuers list](https://wallet.verifiablecredentials.dev/settings/issuers)
  	- Add an issuer using the '+' button.
  	- Type in your tenant domain: `TENANT_ID.auth0lab.com`

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/image8.png" style="width:2.00521in;height:3.71287in" />

If everything was configured correctly, you should see your new credentials show up in the ID Wallet request credential page:

  <img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/image3.png" style="width:2.13914in;height:3.95313in" />

### Implement Display and Branding Changes

This section will help you customize how your credential looks in wallets. It will expose claim fields to the user, and provide an on-brand look and feelthx.

1.  Navigate back to your credential template from the beginning of the "Create a Custom Verifiable Credential Type" section above. It should be at Credentials -> Issuance in the left nav button. Click __"Acme University Credential"__ and then click the __"Branding"__ tab.

  	- Set the background color to **#FF4400** and the text color to **#FFFFFF**.
  	- You can optionally add a "Thumbnail URL" and "Hero URL" to give it a fully custom look and feel.

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/screenshot-002.png" />

2. You can also customize which fields that show up in the graphic presentation, how they're described to the user, and metadata about the credential by utilizing the __"Display"__ code box at the bottom of the page. Replace the contents of the **Display** input with the code from the snippet below.
	```json
	{
	  "title": {
	    "text": "Acme University Degree"
	  },
	  "subtitle": {
	    "text": "http://my.acmeu.com/"
	  },
	  "description": {
	    "text": "Credential Description"
	  },
	  "properties": [
	    {
	      "path": [
	        "$.familyName"
	      ],
	      "schema": {
	        "type": "string"
	      },
	      "fallback": "Doe",
	      "label": "Family Name"
	    },
	    {
	      "path": [
	        "$.givenName"
	      ],
	      "schema": {
	        "type": "string"
	      },
	      "fallback": "John",
	      "label": "Given Name"
	    },
	    {
	      "path": [
	        "$.degree.degreeType"
	      ],
	      "schema": {
	        "type": "string"
	      },
	      "fallback": "Invalid Degree",
	      "label": "Degree Type"
	    },
	    {
	      "path": [
	        "$.degree.degreeName"
	      ],
	      "schema": {
	        "type": "string"
	      },
	      "fallback": "Invalid Degree",
	      "label": "Degree Field"
	    }
	  ]
	}
	```

3. Click **Save Changes**.

You can learn more about display descriptors at [https://identity.foundation/credential-manifest/#output-descriptor](https://identity.foundation/credential-manifest/#output-descriptor).


### Create a sample user

We'll now create a sample user that you can use to test the credential. In this lab we use the default [Database Connection](https://auth0.com/docs/authenticate/database-connections) that is created when you set up the tenant **Username-Password-Authentication**, but the Verifiable Credentials features work with all types of connection.

1. Using the left nav and go to User Managemenet > Users.
2. Click the **+ Create User** button in the main view.
3. Provide the following values for each field.
	- **Email:** susan@acme.com
	- **Password:** sus@nsecr3t
	- **Connection**: Username-Password-Authentication

	<img src=https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/screenshot-001.png />

4. Scroll down to the **app_metadata** input and add the following JSON as app_metadata for the user. 

	```json
	{
	  "degree": {
	    "type": "Bachelor of the Arts",
	    "name": "Awesomeness"
	  }
	}
	```

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/image4.png" style="width:6.5in;height:3.06944in" />

5. Click **Save** under the **app_metadata** input to save the changes.

### Verification
In this section we'll verify that the credential is being correctly issued and displayed.

1. Using the left nav and go to Credentials (LAB) > Issuance.
2. Click "Acme University Degree" to open the details for the credential.
3. On the top-right corner click **Try Credential**. This will initiate a credential issuance flow using ID Wallet.
	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/screenshot-8.png"/>
4. Once in ID Wallet, click **Continue** to request a "University Degree Credential".
	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/screenshot-3.png"/>
5. Provide the details for the user created in the previous section. Email should be **susan@acme.com** and password **sus@nsecr3t**.
	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/screenshot-7.png"/>
6. Click **Accept** when prompted with the Auth0 consent dialog.
	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/screenshot-4.png"/>
7. In ID Wallet click **Add credential** to confirm you want to add the credential to your wallet.
	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/screenshot-5.png"/>

Open the credential and you will see that the degree type and degree field are those you set in the user's **app_metadata**.

<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/screenshot-6.png" />

### Next Steps

You've seen how a developer can create a new verifiable credential with Auth0. Let us know how the experience was by leaving us feedback on the [Auth0 Lab Discord](https://auth0lab.com/chat). If you have any issues with any of the steps, you can also bring them up there.

Now you can start experimenting with setting up Auth0 as a [verifier of Verifiable Credentials](/auth0lab/verifiable-credentials/developer-walkthrough-verification).
