---
title: Use Credentials as a user
editUrl: 'https://github.com/auth0/docs/edit/auth0lab/articles/auth0lab/verifiable-credentials/end-user-experience.md'
breadcrumbs:
  - title: Auth0 Lab
    url: /docs/auth0lab
  - title: Verifiable Credentials
    url: /docs/auth0lab/verifiable-credentials/overview
  - title: End User Experience
    url: /docs/auth0lab/verifiable-credentials/end-user-experience
topics:
  - auth0lab
  - verifiable-credentials
  - verifiable-presentations
contentType: how-to
useCase: auth0lab
navigationIndex: 1
---

In this walkthrough article, you are going to experience verifiable credentials (VCs) from the end user’s perspective. If you get stuck, or have questions, join us on our [Discord server](http://auth0lab.com/chat).

### Obtaining a Credential

In this task, you will add an existing sample credential to your browser wallet. This example shows how a user could request a credential on ID Wallet, the Auth0 Lab’s developer learning wallet. A vaccine card will be used in this example, but a VC could also be an ID, insurance card, employment credential, university degree, professional certification, or membership card.

1.  Browse to [https://wallet.verifiablecredentials.dev/](https://wallet.verifiablecredentials.dev/)

2.  Click the **+ button** (purple circle) to add a credential

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/end-user-experience/image4.png" style="width:2.8654in;height:2.31895in" />

3.  By default, ID Wallet comes with 3 issuers that have 4 credentials. While you could use any of the credential types, select the “**Vaccine Record**” credential for this example.

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/end-user-experience/image3.png" style="width:2.22622in;height:4.14247in" />

4.  At the sign-in prompt, sign-up for a new account.

    ::: note
    No personal data is used in the test. Credentials are issued with fake, hard-coded data.</th>
    :::

5.  At the consent prompt, click "**Accept**" to allow ID Wallet to be issued a credential by the Auth0 tenant.

6.  Add the credential to your wallet.

A credential with a first/last name "Susan Doe" should be displayed there. As we noted at the beginning of this section, credentials used in this lab are populated with fake data for demo purposes.

7.  Inspect your new credential by clicking it. Inspect the payload of your credential by clicking on the “**&lt; &gt;**” code-expand, located in the upper-right corner. This code contains the claims, subject, and issuer information, while the proof is present at the bottom. You can learn more about schemas on the [w3c VCs website](http://www.w3.org/TR/vc-data-model-2.0/).

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/end-user-experience/image1.png" style="width:2.90104in;height:5.3723in" />

::: note
The credentials issued in this walkthrough are stored locally in the browser. You will need to use the same device and browser to have them available in the future.
:::

### Present a Credential

This task simulates presenting a credential to an application. For ease of use, it will start from ID Wallet. As a prerequisite, you must have a vaccine credential in your [https://wallet.verifiablecredentials.dev/](https://wallet.verifiablecredentials.dev/), which you obtained by following the previous section [Obtaining a Credential](#obtaining-a-credential).

1.  Browse to [https://wallet.verifiablecredentials.dev/](https://wallet.verifiablecredentials.dev/)

2.  Click on your vaccine record from the previous section and then click “**Try Presentation Flow.**”

	<img src="https://cdn.auth0.com/docs/auth0lab/vcs/end-user-experience/image2.png" style="width:2.53824in;height:4.72112in" />

3.  This button will take you to the Auth0 Lab Presentation tool at [https://present.verifiablecredentials.dev/](https://present.verifiablecredentials.dev/), and populates a presentation request that asks for a credential with the type **VaccineCard**.

    ::: note
    The "Presentation Request" code asks the wallet to present a credential with the type “VaccineCard”. You can edit that field to request other types of verifiable credentials. You can find out more about examples at: <a href="https://identity.foundation/presentation-exchange/#input-descriptor">https://identity.foundation/presentation-exchange/#input-descriptor</a>.
	  :::

4.  Wait a moment, a QR code will be generated that will request that credential from the wallet; beneath it will be a clickable button with a URL link to continue. If you want, you could set up the vaccine card on your phone, and scan the QR code, but for this walkthrough, just click “**Click here to continue**” to use the credential on this device from the previous section.

5.  ID Wallet should open with a prompt to present the credential. Present it by clicking “**Present credential**”.

6.  Once ID Wallet gives you a "Success" message, head back to the Presentation tool. It should still be open in a previous browser tab. A payload should now be available at the bottom of the page.

By the end of this task, the Presentation tool should have a payload containing the full presentation data from your ID Wallet. The payload is validated via the proofs in the presentation.

It also contains the credential body, which is a portion of the full presentation. You'll need to scroll down in the tool's output to see it:
```json
"verifiableCredential": [
	{
		"credentialSubject": {
			"dateOfApplication":"2022-01-17",
			"familyName":"Doe",
			"givenName":"Susan",
			"lotNumber":"3006322",
			"performer":"Atlantis Hospital",
			"status":"completed",
			"userId":"auth0|63126708c65b7aa0f1b186e0",
			"vaccinationIdentifier":"A3T411Y",
			"vaccine":"SARS Cov-2 mRNA",
			"id":"did:ethr:0x033bd481d1d80dcb748cbd8c136822b6ec5a172c73ae5f493bc258a394395c8930"
		},
		"issuer": {
			"id":"did:web:atlantis-hospital.auth0lab.com"
		},
		"id":"3c013202-9c08-4218-921a-07a6c19d82b4",
		"type": [
			"VerifiableCredential",
			"VaccineCard"
		]
	}
]
```

You can learn more about presentations here: [https://www.w3.org/TR/vc-data-model/#presentations](https://www.w3.org/TR/vc-data-model/#presentations):

### Next Steps

You've seen how a user will interact with verifiable credentials. Let us know how the experience was by leaving us feedback on our [Discord server](http://auth0lab.com/chat). If you have any issues with any of the steps, you can also bring them up there.

Now you can start experimenting with the developer side of Verifiable Credentials by [configuring your own issuer](/auth0lab/verifiable-credentials/issue-credentials), or by [setting up a verifier](/auth0lab/verifiable-credentials/verify-credentials).
