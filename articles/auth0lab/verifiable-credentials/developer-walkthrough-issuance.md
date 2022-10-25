---
title: Verifiable Credentials Hands-On Labs
description: TBC.
topics:
  - auth0lab
  - verifiable-credentials
  - verifiable-presentations
contentType: how-to
useCase: auth0lab
---

## Developer Walkthrough of Auth0 as an Issuer

The content of this article will walk you through the developer experience of generating a new credential type, signed and issued by their Auth0 tenant. It requires you to have an existing Auth0 account. If you do not have one, sign up for it [auth0.com/signup](https://auth0.com/signup). If you get stuck, or have questions, join us at our [Discord server](https://auth0lab.com/chat).

### Adding the Credential Template

This section walks you through how to set up a Credential Template for your new verifiable credential. A credential template stores metadata and branding data about your credential.

1. Navigate to the [Auth0 Lab instance](https://manage.auth0lab.com), and continue with your Auth0 account. You will have to accept the terms if this is your first time at manage.auth0lab.com.
2. Create a Credential Template using the left nav and go to Credentials (LAB) -> Issuance.
3. Add a type and a name:

    - The type will identify the credential to other developers and be included in the credential payload. It should be the string that other entities use to reference that kind of credential.
    - The name should be a human-readable string for your Auth0 Lab/CIC tenant. For example, a credential type of UniversityDegreeCredential issued by Acme University could be named Acme University Degree.

  <img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/image7.png" style="width:6.5in;height:3.41667in" />

4. Add the Credential Template to your tenant by clicking the __"Add Credential Template"__ button.

### Implement the Pre-Credential Issuance Action

To issue a credential to a user, you need to define the claims the credential will have. For that, we will use the Auth0 actions feature, which allows you to write custom code as part of various flows, including credential issuance. We will create an action that takes the user as input and sets the claims to add to the credential.

1. On the left nav, navigate to Actions > Flows; then click __"Verifiable Credential Issuance"__.
2. You will be presented with an Action Flow. On the right hand navigation, add an action by clicking the __"+"__ button, then the __"Build Custom"__ option.
3. Name your action something you’ll remember. This action will contain the claim types for your credential, so you can tie your name to your credential type to make editing both easier in the future. The Trigger should be "Pre Credential Issue", the default for this type of Action Flow. Create your action.

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/image2.png" style="width:6.5in;height:4.61111in" />

4. Define the handler that will issue your credential. Here you will be able to create your claims, and define where they’ll be populated from. We have two claims pulled from a user's app metadata in this example.

	::: note
	There is an example below of a working action. You can explore changing the claim fields and source data if you'd like.

	You can find examples of actions used for sample issuers [here](https://github.com/auth0-lab/vc-samples/tree/main/sample-issuers).
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

5. We assume that another application or service adds degree information to a user’s app_metadata before issuing a credential. If you would like to test how app_metadata is pulled into the credential, you can [create a user](https://auth0.com/docs/manage-users/user-accounts/create-users) and add the following app_metadata to their profile. Make sure to save your changes.

	```json
	{
	  "degree": {
	    "type": "Bachelor of the Arts",
	    "name": "Awesomeness"
	  }
	}
	```

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/image4.png" style="width:6.5in;height:3.06944in" />


6. After you set up your action, you will need to add it to the flow. Navigate back to the verifiable credential issuance flow (step 1), and then click on __"Custom"__ under the _Add Action_ window. There you should see your newly created custom action. Drag it into the flow, and apply changes.

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/image5.png" style="width:6.5in;height:2.11111in" />


7. Configure your tenant to accept OIDC Dynamic Clients:
  a. Using the left nav, go to _Settings_. At the top of the page, click the Advanced tab.
  b. Scroll down to the Settings panel and enable the "OIDC Dynamic Application Registration" toggle.

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/image6.png" style="width:6.5in;height:2.41667in" />


8. Promote any connections in use in your Auth0 Lab tenant to domain level. By default, you will have a database connection that was created when your tenant was created.
  	- Navigate on the left hand nav to Authentication > Database.
  	- There should be a database connection listed called "Username-Password-Authentication"; click it to head to _Settings_.
  	- Scroll down, and enable the __"Enable for third party clients"__ switch.

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/image1.png" style="width:6.5in;height:0.86111in" />


9. Ensure that the connection you just promoted is enabled for at least one regular application.
  	- Go to Applications > Applications.
  	- Select the Default App.
  	- Go to the connections tab, and ensure that the connection you promoted is toggled on.

10. Finally, add your tenant as an issuer in ID wallet:
  a. Head to [wallet issuers list](https://wallet.verifiablecredentials.dev/settings/issuers)
  b. Add an issuer using the '+' button.
  c. Type in your tenant domain: `TENANT_ID.auth0lab.com`

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/image8.png" style="width:2.00521in;height:3.71287in" />

If everything was configured correctly, you should see your new credentials show up in the ID Wallet request credential page:

  <img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/image3.png" style="width:2.13914in;height:3.95313in" />

### Implement Display and Branding Changes

This section will help you customize how your credential looks in ID Wallet. It will expose claim fields to the user, and create a more professional look and feel to the credential.

1. Add branding to change the look of your credential when it is displayed in wallets. Navigate back to your credential template from the beginning of the "Create a Custom Verifiable Credential Type" section above. It should be at Credentials -> Issuance in the left nav button. Click __"Acme University Credential"__ and then click the __"Branding"__ tab.
  	- Try changing the background color and text by adding hexadecimal values to the fields.
  	- You can optionally add a "Thumbnail URL" and "Hero URL" to give it a fully custom look and feel.

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/image10.png" style="width:6.5in;height:6.15278in" />

2. You can also customize which fields that show up in the graphic presentation, how they’re described to the user, and metadata about the credential by utilizing the __"Display"__ code box at the bottom of the page.
  	- Replace the default __"subtitle"__ value with the code below. It will add a fake dead URL to the credential that we can imagine represents a student portal a user could go to.
  	- Add two paths for the degree fields __"degreeType"__ and __"degreeName"__. A code sample for the entire "Display" box with suggested changes is below.

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

3. Save your changes and now you can see how your credential will look by clicking __"Try Credential"__, which will start the IDWallet credential request process for your new credential. You can learn more about display descriptors at [https://identity.foundation/credential-manifest/#output-descriptor](https://identity.foundation/credential-manifest/#output-descriptor).

Result:

<img src="https://cdn.auth0.com/docs/auth0lab/vcs/developer-walkthrough-issuer/image9.png" style="width:2.84681in;height:4.91995in" />

### Next Steps

You've seen how a developer can create a new verifiable credential with Auth0. Let us know how the experience was by leaving us feedback on the [Auth0 Lab Discord](https://auth0lab.com/chat). If you have any issues with any of the steps, you can also bring them up there.

Now you can start experimenting with setting up Auth0 as a [verifier of other Verifiable Credentials](/auth0lab/verifiable-credentials/developer-walkthrough-verification).
