---
description:
---

# AWS Part 3

LOREM IPSUM

## Configure API Gateway Resources to use the Custom Authorizer

Log in to AWS and navigate to the [API Gateway Console](http://console.aws.amazon.com/apigateway).

![](/media/articles/integrations/aws-api-gateway-2/part-3/pt3-1.png)

::: note
Custom authorizers are set on a method by method basis; if you want to secure multiple methods using a single authorizer, you'll need to repeat the following instructures for each method.
:::

Open the **PetStore** API we created in [part 1](/integrations/aws-api-gateway-2/part-1) of this tutorial. Under the **Resource** tree in the center pane, select the **GET** method under the `/pets` resource.

![](/media/articles/integrations/aws-api-gateway-2/part-3/pt3-2.png)

Select **Method Request**.

![](/media/articles/integrations/aws-api-gateway-2/part-3/pt3-3.png)

Under **Settings**, click the **pencil** icon to the right **Authorization** and choose the `jwt-rsa-custom-authorizer` custom authorizer you created in [part 2](/integrations/aws-api-gateway-2/part-2). 

![](/media/articles/integrations/aws-api-gateway-2/part-3/pt3-4.png)

Click the **checkmark** icon to save you choice of custom authorizer. Make sure the **API Key Required** field is set to `false`.

![](/media/articles/integrations/aws-api-gateway-2/part-3/pt3-5.png)

## Deploy the API

To make your changes public, you'll need to [deploy your API](/integrations/aws-api-gateway-2/part-1#deploy-the-api).

If successful, you'll be redirected to the **Test Stage Editor**. Copy down the **Invoke URL** provided in the blue ribbon at the top, since you'll need this to test your deployment.

![](/media/articles/integrations/aws-api-gateway-2/part-3/pt3-8.png)

https://castdb0qvl.execute-api.us-east-1.amazonaws.com/Test

## Test Your Deployment

You can test your deployment by making a `GET` call to the **Invoke URL** you copied in the previous step.

```har
{
	"method": "POST",
	"url": "https://YOUR_INVOKE_URL/pets",
	"headers": [{
		"name": "Authorization",
		"value": "Bearer TOKEN"
	}]
}
```

eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5qQkdSVEkwUkRrM05qTXpNakk1UVRjME16TTFRa0UwT1RsQk5qZEVOVE01TkRORU5rTkNNQSJ9.eyJpc3MiOiJodHRwczovL2F1dGgwdXNlci5hdXRoMC5jb20vIiwic3ViIjoiQzhucFRFTVZuQnJJTHNCVEk5MU1PaDZkZnVaYlBWQVVAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXV0aDB1c2VyLmF1dGgwLmNvbS9hcGkvdjIvIiwiZXhwIjoxNTAyNDAyNjY1LCJpYXQiOjE1MDIzMTYyNjUsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIn0.h6qOY_i2Qv4BZsCgzyr-XcrWZF00cXMr5ATFOT2jXr9-P51d9s6ib6I33Bl1QKVg6hldIZiui1F0ZjxF2Fo8CoYukkGnZndzrCa3u8a1CAeVVMBzyPJCIkWkaM3QqeKNP22xUEYinb6hcsWC0gEifp0JikNXwvOH5mtRqMLLAAVx1Qj4QfysbuvKnua9EmY20iHzPekREufNwiOX4TnMYw5sHR1NQ6t1SekDTp8zY-lpCkFCITyv9byZujOLSDepL88iVbRSH9VqhNS4PJOB_VmwlsLpgS5vDWUXAGeoO6LYnl6hvMS-X8BPs_BrSxVo6-xTBG16wfgD9kwXDOpMYg

https://castdb0qvl.execute-api.us-east-1.amazonaws.com/Test/pets


<%= include('./_stepnav', {
 prev: ["2. Part 2", "/integrations/aws-api-gateway-2/part-2"]
}) %>